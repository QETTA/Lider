import multipart from '@fastify/multipart';
import Fastify from 'fastify';
import dotenv from 'dotenv';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

dotenv.config();

interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantContext {
  route?: string;
  centerName?: string;
  mode?: string;
}

type AssistantStatusState = 'operational' | 'warning' | 'error';

type ParsedFile = {
  kind: 'spreadsheet' | 'document';
  promptContext: string;
  meta: {
    name: string;
    mimeType: string;
    size: number;
    kind: 'spreadsheet' | 'document';
    skillPackage: 'excel' | 'document';
    sheetNames?: string[];
    sheetCount?: number;
    previewRowCount?: number;
    extractedCharacters: number;
    truncated: boolean;
  };
};

type AnthropicMessageParam = {
  role: AssistantMessage['role'];
  content: Array<{
    type: 'text';
    text: string;
  }>;
};

type AnthropicPayload = {
  model: string;
  max_tokens: number;
  temperature: number;
  system: string;
  messages: AnthropicMessageParam[];
};

type RuntimeSignal = {
  lastSuccessAt: number;
  lastFailureAt: number;
  lastFailureStatus: number | null;
  lastFailureMessage: string | null;
  lastProbeAt: number;
  lastProbeSuccessAt: number;
  lastProbeMessage: string | null;
  consecutiveProbeFailures: number;
};

type AssistantStatusPayload = {
  status: AssistantStatusState;
  provider: 'anthropic';
  activeModel: string;
  model: string;
  upstreamMode: 'direct' | 'unavailable';
  proxyConfigured: false;
  message: string;
  lastCheckedAt: string;
  providers: {
    anthropic: {
      configured: boolean;
      model: string;
      status: AssistantStatusState;
    };
  };
};

const DEFAULT_MODEL = 'claude-sonnet-4-6';
const PROXY_SECRET_HEADER = 'x-lider-ai-proxy-secret';
const TEXT_TRUNCATION_NOTICE = '\n\n[...중략: 토큰 한도를 맞추기 위해 일부 내용만 Claude에 전달했습니다.]';
const AVERAGE_CHARS_PER_TOKEN = 4;
const STATUS_CACHE_TTL_MS = 45_000;
const RECENT_SUCCESS_WINDOW_MS = 5 * 60_000;
const RECENT_FAILURE_WINDOW_MS = 5 * 60_000;
const PROBE_FAILURE_WINDOW_MS = 2 * 60_000;
const MAX_PROBE_FAILURES_BEFORE_ERROR = 2;
const MAX_RATE_LIMIT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 1_500;

const CHAT_TOKEN_BUDGET = {
  targetInputTokens: 6_000,
  hardCapInputTokens: 11_000,
  maxOutputTokens: 600,
  recentMessageLimit: 10,
};

const FILE_TOKEN_BUDGET = {
  targetInputTokens: 14_000,
  hardCapInputTokens: 26_000,
  maxOutputTokens: 1_200,
};

const runtimeSignal: RuntimeSignal = {
  lastSuccessAt: 0,
  lastFailureAt: 0,
  lastFailureStatus: null,
  lastFailureMessage: null,
  lastProbeAt: 0,
  lastProbeSuccessAt: 0,
  lastProbeMessage: null,
  consecutiveProbeFailures: 0,
};

let statusCache:
  | {
      cachedAt: number;
      payload: AssistantStatusPayload;
    }
  | null = null;
let statusInFlight: Promise<AssistantStatusPayload> | null = null;

function getAnthropicApiKey() {
  return process.env.ANTHROPIC_API_KEY || '';
}

function getAnthropicBaseUrl() {
  return (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1').replace(/\/+$/, '');
}

function getAnthropicModel() {
  return process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
}

function getProxySharedSecret() {
  return process.env.AI_PROXY_SHARED_SECRET || '';
}

function jsonSuccess(data: unknown) {
  return {
    success: true,
    data,
  };
}

function jsonError(code: string, message: string) {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}

function getFileExtension(filename: string) {
  const match = filename.toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match?.[1] || '';
}

function normalizeModelText(text: string) {
  return text.replace(/\r\n/g, '\n').trim();
}

function toAnthropicMessages(messages: AssistantMessage[]): AnthropicMessageParam[] {
  return messages.map((message) => ({
    role: message.role,
    content: [{ type: 'text', text: message.content }],
  }));
}

function estimateTokens(text: string) {
  return Math.ceil(normalizeModelText(text).length / AVERAGE_CHARS_PER_TOKEN);
}

function clipTextToApproximateTokens(text: string, tokenLimit: number) {
  const normalized = normalizeModelText(text);
  if (!normalized) {
    return { value: normalized, truncated: false };
  }

  const maxCharacters = Math.max(600, Math.floor(tokenLimit * AVERAGE_CHARS_PER_TOKEN));
  if (normalized.length <= maxCharacters) {
    return { value: normalized, truncated: false };
  }

  const clipped = normalized
    .slice(0, Math.max(0, maxCharacters - TEXT_TRUNCATION_NOTICE.length))
    .trimEnd();

  return {
    value: `${clipped}${TEXT_TRUNCATION_NOTICE}`,
    truncated: true,
  };
}

function parseRetryAfterMs(value: string | null) {
  if (!value) {
    return null;
  }

  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1_000;
  }

  const retryAt = Date.parse(value);
  if (!Number.isNaN(retryAt)) {
    return Math.max(retryAt - Date.now(), 0);
  }

  return null;
}

function invalidateStatusCache() {
  statusCache = null;
}

function markSignalSuccess(message: string) {
  const now = Date.now();
  runtimeSignal.lastSuccessAt = now;
  runtimeSignal.lastFailureAt = 0;
  runtimeSignal.lastFailureStatus = null;
  runtimeSignal.lastFailureMessage = null;
  runtimeSignal.lastProbeAt = now;
  runtimeSignal.lastProbeSuccessAt = now;
  runtimeSignal.lastProbeMessage = message;
  runtimeSignal.consecutiveProbeFailures = 0;
  invalidateStatusCache();
}

function markSignalFailure(status: number | null, message: string, actualRequest: boolean) {
  const now = Date.now();
  if (actualRequest) {
    runtimeSignal.lastFailureAt = now;
    runtimeSignal.lastFailureStatus = status;
    runtimeSignal.lastFailureMessage = message;
  } else {
    runtimeSignal.lastProbeAt = now;
    runtimeSignal.lastProbeMessage = message;
    runtimeSignal.consecutiveProbeFailures += 1;
  }
  invalidateStatusCache();
}

function markSignalProbeSuccess(message: string) {
  const now = Date.now();
  runtimeSignal.lastProbeAt = now;
  runtimeSignal.lastProbeSuccessAt = now;
  runtimeSignal.lastProbeMessage = message;
  runtimeSignal.consecutiveProbeFailures = 0;
  invalidateStatusCache();
}

function formatCellValue(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value).replace(/\s+/g, ' ').trim().slice(0, 80) || '-';
}

function isSpreadsheetFile(filename: string, mimeType = '') {
  const extension = getFileExtension(filename);
  return (
    ['.xlsx', '.xls', '.csv'].includes(extension) ||
    mimeType === 'text/csv' ||
    mimeType === 'application/vnd.ms-excel' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

function isDocumentFile(filename: string, mimeType = '') {
  const extension = getFileExtension(filename);
  return (
    ['.docx', '.txt', '.md'].includes(extension) ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType.startsWith('text/')
  );
}

function buildChatSystemPrompt(context?: AssistantContext) {
  return [
    '당신은 LIDER의 AI 도우미입니다.',
    '반드시 한국어로 답하세요.',
    '장기요양기관 운영, 문서 보완, 현장 기록, 상담 후속, 알림 우선순위 정리를 돕는 역할입니다.',
    '답변은 실무자가 바로 실행할 수 있게 짧고 명확하게 정리하세요.',
    '사실이 불확실하면 추정이라고 분명히 말하세요.',
    '의학적 진단이나 법률 확정 판단은 하지 말고, 필요 시 확인이 필요한 점으로 표현하세요.',
    context?.centerName ? `현재 센터명: ${context.centerName}` : null,
    context?.route ? `사용자가 보고 있는 화면 경로: ${context.route}` : null,
    context?.mode ? `현재 사용 맥락: ${context.mode}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function buildAnalyzeSystemPrompt(parsedFile: ParsedFile, context: AssistantContext) {
  return [
    '당신은 LIDER의 AI 도우미입니다.',
    '반드시 한국어로 답하세요.',
    parsedFile.kind === 'spreadsheet'
      ? '현재 엑셀 스킬 패키지가 활성화되었습니다. 시트 구조, 주요 패턴, 누락 가능성, 운영상 바로 볼 포인트를 정리하세요.'
      : '현재 문서 스킬 패키지가 활성화되었습니다. 문서 핵심 요약, 빠진 내용, 수정 포인트, 후속 액션을 정리하세요.',
    '답변은 실무자가 바로 사용할 수 있게 짧고 명확하게 정리하세요.',
    '출력 순서는 핵심 요약, 바로 확인할 점, 다음 액션 순으로 유지하세요.',
    '추정이 섞이면 추정이라고 분명히 말하세요.',
    context.centerName ? `현재 센터명: ${context.centerName}` : null,
    context.route ? `사용자가 보고 있는 화면 경로: ${context.route}` : null,
    context.mode ? `현재 사용 맥락: ${context.mode}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  return (await response.json().catch(() => null)) as T | null;
}

async function fetchAnthropicJson<T>(path: string, init: RequestInit): Promise<{ response: Response; payload: T | null }> {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const headers = new Headers(init.headers);
  headers.set('x-api-key', apiKey);
  headers.set('anthropic-version', '2023-06-01');

  let attempt = 0;
  while (true) {
    let response: Response;

    try {
      response = await fetch(`${getAnthropicBaseUrl()}${path}`, {
        ...init,
        headers,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Anthropic 요청 전송에 실패했습니다.';
      throw new Error(message);
    }

    const payload = await parseJsonSafe<T>(response);
    if (response.status !== 429 || attempt >= MAX_RATE_LIMIT_RETRIES) {
      return { response, payload };
    }

    const retryDelay =
      parseRetryAfterMs(response.headers.get('retry-after')) || DEFAULT_RETRY_DELAY_MS * (attempt + 1);
    await new Promise((resolve) => setTimeout(resolve, Math.min(retryDelay, 5_000)));
    attempt += 1;
  }
}

function buildAnthropicPayload(system: string, messages: AssistantMessage[], options: {
  temperature: number;
  maxTokens: number;
}): AnthropicPayload {
  return {
    model: getAnthropicModel(),
    max_tokens: options.maxTokens,
    temperature: options.temperature,
    system,
    messages: toAnthropicMessages(messages),
  };
}

async function countAnthropicInputTokens(system: string, messages: AssistantMessage[]) {
  const { response, payload } = await fetchAnthropicJson<{
    input_tokens?: number;
    error?: { message?: string };
  }>('/messages/count_tokens', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: getAnthropicModel(),
      system,
      messages: toAnthropicMessages(messages),
    }),
  });

  if (!response.ok || typeof payload?.input_tokens !== 'number') {
    throw new Error(payload?.error?.message || `Anthropic token count failed with status ${response.status}`);
  }

  return payload.input_tokens;
}

function parseSpreadsheetBuffer(file: {
  filename: string;
  mimetype?: string;
  buffer: Buffer;
  size: number;
}): ParsedFile {
  const extension = getFileExtension(file.filename);
  if (extension === '.csv' || file.mimetype === 'text/csv') {
    const rows = file.buffer
      .toString('utf-8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split(',').map((cell) => cell.trim()));
    const previewRowLimit = 6;
    const previewRows = rows.slice(0, previewRowLimit).map((row, index) => {
      const rowLabel = index === 0 ? '헤더' : `행 ${index}`;
      return `${rowLabel}: ${row.slice(0, 8).map(formatCellValue).join(' | ')}`;
    });
    const context = [
      `파일명: ${file.filename}`,
      '활성 스킬 패키지: 엑셀 스킬 패키지',
      '시트 수: 1',
      '시트명: CSV',
      '',
      '[시트 미리보기]',
      '[시트 CSV]',
      `행 수: ${rows.length}`,
      `열 수(최대): ${rows.reduce((max, row) => Math.max(max, row.length), 0)}`,
      previewRows.length > 0 ? previewRows.join('\n') : '미리보기 데이터 없음',
    ].join('\n');
    const promptContext = normalizeModelText(context);

    return {
      kind: 'spreadsheet',
      promptContext,
      meta: {
        name: file.filename,
        mimeType: file.mimetype || 'text/csv',
        size: file.size,
        kind: 'spreadsheet',
        skillPackage: 'excel',
        sheetNames: ['CSV'],
        sheetCount: 1,
        previewRowCount: previewRowLimit,
        extractedCharacters: promptContext.length,
        truncated: false,
      },
    };
  }

  const workbook = XLSX.read(file.buffer, {
    type: 'buffer',
    cellDates: true,
  });
  const sheetNames = workbook.SheetNames;
  const previewSheetNames = sheetNames.slice(0, 3);
  const previewRowLimit = 6;
  const summaries = previewSheetNames.map((sheetName) => {
    const rows = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[sheetName], {
      header: 1,
      raw: false,
      defval: '',
      blankrows: false,
    }) as unknown[][];
    const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
    const previewRows = rows.slice(0, previewRowLimit).map((row, index) => {
      const rowLabel = index === 0 ? '헤더' : `행 ${index}`;
      return `${rowLabel}: ${row.slice(0, 8).map(formatCellValue).join(' | ')}`;
    });

    return [
      `[시트 ${sheetName}]`,
      `행 수: ${rows.length}`,
      `열 수(최대): ${maxColumns}`,
      previewRows.length > 0 ? previewRows.join('\n') : '미리보기 데이터 없음',
    ].join('\n');
  });

  const context = [
    `파일명: ${file.filename}`,
    '활성 스킬 패키지: 엑셀 스킬 패키지',
    `시트 수: ${sheetNames.length}`,
    sheetNames.length > previewSheetNames.length
      ? `미리보기 시트: ${previewSheetNames.join(', ')} 외 ${sheetNames.length - previewSheetNames.length}개`
      : `시트명: ${sheetNames.join(', ')}`,
    '',
    '[시트 미리보기]',
    summaries.join('\n\n'),
  ].join('\n');
  const promptContext = normalizeModelText(context);

  return {
    kind: 'spreadsheet',
    promptContext,
    meta: {
      name: file.filename,
      mimeType: file.mimetype || 'application/octet-stream',
      size: file.size,
      kind: 'spreadsheet',
      skillPackage: 'excel',
      sheetNames,
      sheetCount: sheetNames.length,
      previewRowCount: previewRowLimit,
      extractedCharacters: promptContext.length,
      truncated: false,
    },
  };
}

async function parseDocumentBuffer(file: {
  filename: string;
  mimetype?: string;
  buffer: Buffer;
  size: number;
}): Promise<ParsedFile> {
  const extension = getFileExtension(file.filename);
  let rawText = '';

  if (
    extension === '.docx' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    rawText = result.value || '';
  } else if (extension === '.txt' || extension === '.md' || file.mimetype?.startsWith('text/')) {
    rawText = file.buffer.toString('utf-8');
  } else {
    throw new Error('지원하지 않는 문서 형식입니다. DOCX, TXT, MD 파일을 사용해 주세요.');
  }

  const promptContext = normalizeModelText(
    [
      `파일명: ${file.filename}`,
      '활성 스킬 패키지: 문서 스킬 패키지',
      '',
      '[문서 본문]',
      rawText || '본문을 추출하지 못했습니다.',
    ]
      .filter(Boolean)
      .join('\n')
  );

  return {
    kind: 'document',
    promptContext,
    meta: {
      name: file.filename,
      mimeType: file.mimetype || 'application/octet-stream',
      size: file.size,
      kind: 'document',
      skillPackage: 'document',
      extractedCharacters: promptContext.length,
      truncated: false,
    },
  };
}

async function parseAssistantFile(file: {
  filename: string;
  mimetype?: string;
  buffer: Buffer;
  size: number;
}): Promise<ParsedFile> {
  if (isSpreadsheetFile(file.filename, file.mimetype)) {
    return parseSpreadsheetBuffer(file);
  }

  if (isDocumentFile(file.filename, file.mimetype)) {
    return parseDocumentBuffer(file);
  }

  throw new Error('지원하지 않는 첨부 형식입니다. 엑셀은 XLSX/XLS/CSV, 문서는 DOCX/TXT/MD를 사용해 주세요.');
}

async function callAnthropic(system: string, messages: AssistantMessage[], options: {
  temperature: number;
  maxTokens: number;
}) {
  const { response, payload } = await fetchAnthropicJson<{
    content?: Array<{ type?: string; text?: string }>;
    model?: string;
    usage?: unknown;
    stop_reason?: string | null;
    error?: { message?: string };
  }>('/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(buildAnthropicPayload(system, messages, options)),
  });

  if (!response.ok) {
    const message = payload?.error?.message || `Anthropic request failed with status ${response.status}`;
    markSignalFailure(response.status, message, true);
    throw new Error(message);
  }

  const reply = Array.isArray(payload?.content)
    ? payload.content
        .filter((item) => item.type === 'text' && typeof item.text === 'string')
        .map((item) => item.text as string)
        .join('\n')
        .trim()
    : '';

  markSignalSuccess('최근 Railway proxy 요청이 Sonnet 4.6 직접 경로에서 성공했습니다.');

  return {
    reply,
    model: payload?.model || getAnthropicModel(),
    provider: 'anthropic' as const,
    stopReason: payload?.stop_reason || null,
    usage: payload?.usage || null,
    upstream: {
      mode: 'direct' as const,
      target: 'anthropic' as const,
      fallbackUsed: false,
    },
  };
}

async function prepareChatMessages(system: string, messages: AssistantMessage[]) {
  const normalizedMessages = messages
    .map((message) => ({
      role: message.role,
      content: normalizeModelText(message.content),
    }))
    .filter((message) => Boolean(message.content));

  if (!normalizedMessages.length) {
    throw new Error('대화 메시지가 비어 있습니다.');
  }

  let candidateMessages = normalizedMessages.slice(-CHAT_TOKEN_BUDGET.recentMessageLimit);
  let inputTokens = await countAnthropicInputTokens(system, candidateMessages);

  while (candidateMessages.length > 2 && inputTokens > CHAT_TOKEN_BUDGET.targetInputTokens) {
    candidateMessages = candidateMessages.slice(1);
    inputTokens = await countAnthropicInputTokens(system, candidateMessages);
  }

  if (inputTokens > CHAT_TOKEN_BUDGET.hardCapInputTokens) {
    const lastMessage = candidateMessages[candidateMessages.length - 1];
    let textTokenBudget = Math.max(
      1_200,
      CHAT_TOKEN_BUDGET.hardCapInputTokens - estimateTokens(system) - 1_000
    );
    let clipped = clipTextToApproximateTokens(lastMessage.content, textTokenBudget);

    while (clipped.truncated) {
      candidateMessages = [
        ...candidateMessages.slice(0, -1),
        {
          ...lastMessage,
          content: clipped.value,
        },
      ];
      inputTokens = await countAnthropicInputTokens(system, candidateMessages);
      if (inputTokens <= CHAT_TOKEN_BUDGET.hardCapInputTokens || textTokenBudget <= 600) {
        break;
      }
      textTokenBudget = Math.max(600, Math.floor(textTokenBudget * 0.8));
      clipped = clipTextToApproximateTokens(lastMessage.content, textTokenBudget);
    }
  }

  if (inputTokens > CHAT_TOKEN_BUDGET.hardCapInputTokens) {
    throw new Error('대화 맥락이 너무 길어 최근 대화만으로도 입력 한도를 넘습니다. 새 대화로 다시 시도해 주세요.');
  }

  return candidateMessages;
}

function buildFileUserMessage(parsedFile: ParsedFile, requestedPrompt: string, promptContext: string) {
  return [
    `사용자 요청:\n${requestedPrompt}`,
    '',
    '[업로드 파일 정보]',
    `파일명: ${parsedFile.meta.name}`,
    `파일 종류: ${parsedFile.kind === 'spreadsheet' ? '엑셀/스프레드시트' : '문서'}`,
    `활성 스킬 패키지: ${parsedFile.meta.skillPackage === 'excel' ? '엑셀 스킬 패키지' : '문서 스킬 패키지'}`,
    '',
    promptContext,
  ].join('\n');
}

async function prepareFileAnalysisMessage(system: string, parsedFile: ParsedFile, requestedPrompt: string) {
  const baseContext = normalizeModelText(parsedFile.promptContext);
  let promptContext = baseContext;
  let userMessage = buildFileUserMessage(parsedFile, requestedPrompt, promptContext);
  let inputTokens = await countAnthropicInputTokens(system, [
    {
      role: 'user',
      content: userMessage,
    },
  ]);
  let truncated = parsedFile.meta.truncated;
  let contextTokenBudget = Math.max(
    4_000,
    FILE_TOKEN_BUDGET.targetInputTokens - estimateTokens(system) - estimateTokens(requestedPrompt) - 1_200
  );

  if (inputTokens > FILE_TOKEN_BUDGET.targetInputTokens) {
    const clipped = clipTextToApproximateTokens(baseContext, contextTokenBudget);
    promptContext = clipped.value;
    truncated = truncated || clipped.truncated;
    userMessage = buildFileUserMessage(parsedFile, requestedPrompt, promptContext);
    inputTokens = await countAnthropicInputTokens(system, [
      {
        role: 'user',
        content: userMessage,
      },
    ]);
  }

  while (inputTokens > FILE_TOKEN_BUDGET.hardCapInputTokens && contextTokenBudget > 1_200) {
    contextTokenBudget = Math.max(1_200, Math.floor(contextTokenBudget * 0.8));
    const clipped = clipTextToApproximateTokens(baseContext, contextTokenBudget);
    promptContext = clipped.value;
    truncated = truncated || clipped.truncated;
    userMessage = buildFileUserMessage(parsedFile, requestedPrompt, promptContext);
    inputTokens = await countAnthropicInputTokens(system, [
      {
        role: 'user',
        content: userMessage,
      },
    ]);
  }

  if (inputTokens > FILE_TOKEN_BUDGET.hardCapInputTokens) {
    throw new Error('파일 내용이 너무 길어 입력 한도를 넘습니다. 더 작은 파일이나 요약본으로 다시 시도해 주세요.');
  }

  return {
    message: {
      role: 'user' as const,
      content: userMessage,
    },
    meta: {
      ...parsedFile.meta,
      extractedCharacters: promptContext.length,
      truncated,
    },
  };
}

async function probeAnthropicStatus(): Promise<{
  status: AssistantStatusState;
  model: string;
  message: string;
}> {
  const model = getAnthropicModel();
  if (!getAnthropicApiKey()) {
    return {
      status: 'warning',
      model,
      message: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.',
    };
  }

  if (runtimeSignal.lastSuccessAt > 0 && Date.now() - runtimeSignal.lastSuccessAt <= RECENT_SUCCESS_WINDOW_MS) {
    return {
      status: 'operational',
      model,
      message: '최근 Railway proxy 요청이 Sonnet 4.6 직접 경로에서 성공했습니다.',
    };
  }

  if (runtimeSignal.lastFailureAt > 0 && Date.now() - runtimeSignal.lastFailureAt <= RECENT_FAILURE_WINDOW_MS) {
    return {
      status: 'error',
      model,
      message: runtimeSignal.lastFailureMessage || '최근 Anthropic 요청이 실패했습니다.',
    };
  }

  if (runtimeSignal.lastProbeSuccessAt > 0 && Date.now() - runtimeSignal.lastProbeSuccessAt <= STATUS_CACHE_TTL_MS) {
    return {
      status: 'operational',
      model,
      message: runtimeSignal.lastProbeMessage || '가벼운 토큰 probe로 Anthropic 연결을 확인했습니다.',
    };
  }

  if (
    runtimeSignal.consecutiveProbeFailures >= MAX_PROBE_FAILURES_BEFORE_ERROR &&
    runtimeSignal.lastProbeAt > 0 &&
    Date.now() - runtimeSignal.lastProbeAt <= PROBE_FAILURE_WINDOW_MS
  ) {
    return {
      status: 'error',
      model,
      message: runtimeSignal.lastProbeMessage || 'Anthropic 상태 확인이 연속 실패했습니다.',
    };
  }

  try {
    await countAnthropicInputTokens('', [
      {
        role: 'user',
        content: 'ping',
      },
    ]);
    markSignalProbeSuccess('가벼운 토큰 probe로 Anthropic 연결을 확인했습니다.');
    return {
      status: 'operational',
      model,
      message: '가벼운 토큰 probe로 Anthropic 연결을 확인했습니다.',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Anthropic 상태 확인에 실패했습니다.';
    markSignalFailure(null, message, false);
    return {
      status: runtimeSignal.consecutiveProbeFailures >= MAX_PROBE_FAILURES_BEFORE_ERROR ? 'error' : 'warning',
      model,
      message,
    };
  }
}

function buildStatusPayload(direct: Awaited<ReturnType<typeof probeAnthropicStatus>>): AssistantStatusPayload {
  return {
    status: direct.status,
    provider: 'anthropic',
    activeModel: direct.model,
    model: direct.model,
    upstreamMode: direct.status === 'operational' ? 'direct' : 'unavailable',
    proxyConfigured: false,
    message: direct.message,
    lastCheckedAt: new Date().toISOString(),
    providers: {
      anthropic: {
        configured: Boolean(getAnthropicApiKey()),
        model: direct.model,
        status: direct.status,
      },
    },
  };
}

async function getStatusPayload() {
  if (statusCache && Date.now() - statusCache.cachedAt <= STATUS_CACHE_TTL_MS) {
    return statusCache.payload;
  }

  if (statusInFlight) {
    return statusInFlight;
  }

  statusInFlight = (async () => {
    const direct = await probeAnthropicStatus();
    const payload = buildStatusPayload(direct);
    statusCache = {
      cachedAt: Date.now(),
      payload,
    };
    return payload;
  })();

  try {
    return await statusInFlight;
  } finally {
    statusInFlight = null;
  }
}

const app = Fastify({
  logger: true,
});

await app.register(multipart, {
  limits: {
    fileSize: 15 * 1024 * 1024,
    files: 1,
  },
});

app.get('/healthz', async () => ({
  success: true,
  data: {
    service: 'lider-ai-proxy',
    status: 'ok',
    model: getAnthropicModel(),
    timestamp: new Date().toISOString(),
  },
}));

app.addHook('onRequest', async (request, reply) => {
  if (!request.url.startsWith('/v1/ai/')) {
    return;
  }

  const sharedSecret = getProxySharedSecret();
  if (!sharedSecret) {
    await reply.status(500).send(jsonError('PROXY_SECRET_NOT_CONFIGURED', 'AI proxy shared secret is not configured.'));
    return reply;
  }

  const received = request.headers[PROXY_SECRET_HEADER];
  const token = Array.isArray(received) ? received[0] : received;

  if (!token || token !== sharedSecret) {
    await reply.status(401).send(jsonError('UNAUTHORIZED_PROXY_ACCESS', 'AI proxy shared secret mismatch.'));
    return reply;
  }
});

app.get('/v1/ai/status', async (_request, reply) => {
  const payload = await getStatusPayload();
  return reply.send(jsonSuccess(payload));
});

app.post('/v1/ai/chat', async (request, reply) => {
  const body = (request.body || {}) as {
    messages?: AssistantMessage[];
    context?: AssistantContext;
  };

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return reply.status(400).send(jsonError('INVALID_MESSAGES', '대화 메시지가 비어 있습니다.'));
  }

  try {
    const preparedMessages = await prepareChatMessages(buildChatSystemPrompt(body.context), body.messages);
    const result = await callAnthropic(buildChatSystemPrompt(body.context), preparedMessages, {
      temperature: 0.4,
      maxTokens: CHAT_TOKEN_BUDGET.maxOutputTokens,
    });
    return reply.status(201).send(jsonSuccess(result));
  } catch (error) {
    request.log.error({ err: error }, 'AI proxy chat failed');
    return reply
      .status(500)
      .send(jsonError('AI_CHAT_FAILED', error instanceof Error ? error.message : 'AI 채팅에 실패했습니다.'));
  }
});

app.post('/v1/ai/analyze-file', async (request, reply) => {
  const parts = request.parts();
  const fields: Record<string, string> = {};
  let upload:
    | {
        filename: string;
        mimetype?: string;
        buffer: Buffer;
        size: number;
      }
    | null = null;

  for await (const part of parts) {
    if (part.type === 'file') {
      const buffer = await part.toBuffer();
      upload = {
        filename: part.filename || 'upload',
        mimetype: part.mimetype,
        buffer,
        size: buffer.byteLength,
      };
      continue;
    }

    fields[part.fieldname] = typeof part.value === 'string' ? part.value : String(part.value ?? '');
  }

  if (!upload) {
    return reply.status(400).send(jsonError('NO_FILE', '분석할 파일이 없습니다.'));
  }

  const extension = getFileExtension(upload.filename);
  if (extension === '.pdf' || upload.mimetype === 'application/pdf') {
    return reply
      .status(400)
      .send(
        jsonError(
          'UNSUPPORTED_FILE',
          'PDF 분석은 현재 공개 배포본에서 지원하지 않습니다. DOCX, TXT, MD 파일로 변환해 다시 업로드해 주세요.'
        )
      );
  }

  try {
    const parsedFile = await parseAssistantFile(upload);
    const requestedPrompt =
      fields.prompt?.trim() ||
      (parsedFile.kind === 'spreadsheet'
        ? '이 엑셀의 구조를 요약하고 바로 확인할 항목 3개를 정리해줘.'
        : '이 문서를 요약하고 보완할 점과 다음 액션을 정리해줘.');
    const systemPrompt = buildAnalyzeSystemPrompt(parsedFile, {
      route: fields.route,
      centerName: fields.centerName,
      mode: fields.mode,
    });
    const prepared = await prepareFileAnalysisMessage(systemPrompt, parsedFile, requestedPrompt);
    const result = await callAnthropic(systemPrompt, [prepared.message], {
      temperature: 0.2,
      maxTokens: FILE_TOKEN_BUDGET.maxOutputTokens,
    });

    return reply.status(201).send(
      jsonSuccess({
        ...result,
        file: prepared.meta,
      })
    );
  } catch (error) {
    request.log.error({ err: error, filename: upload.filename }, 'AI proxy file analysis failed');
    return reply
      .status(500)
      .send(jsonError('AI_FILE_ANALYSIS_FAILED', error instanceof Error ? error.message : '파일 분석에 실패했습니다.'));
  }
});

const port = Number.parseInt(process.env.PORT || '8788', 10);
const host = process.env.HOST || '0.0.0.0';

app.listen({ port, host }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
