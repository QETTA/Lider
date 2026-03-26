import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

interface Env {
  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;
  AI_PROXY_BASE_URL?: string;
  AI_PROXY_SHARED_SECRET?: string;
  CORE_API_BASE_URL?: string;
  CORE_API_SHARED_SECRET?: string;
  ASSETS: Fetcher;
}

interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantContext {
  route?: string;
  centerName?: string;
  mode?: string;
}

type AssistantUpstreamMode = 'direct' | 'proxy' | 'unavailable';
type AssistantStatusState = 'operational' | 'warning' | 'error';

type AssistantResult = {
  reply: string;
  model: string;
  provider: 'anthropic';
  stopReason: string | null;
  usage: unknown;
  upstream: {
    mode: Exclude<AssistantUpstreamMode, 'unavailable'>;
    target: 'anthropic' | 'railway-proxy';
    fallbackUsed: boolean;
  };
};

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
    pageCount?: number;
    extractedCharacters: number;
    truncated: boolean;
  };
};

const DEFAULT_MODEL = 'claude-sonnet-4-6';
const PROXY_SECRET_HEADER = 'x-lider-ai-proxy-secret';
const CORE_SECRET_HEADER = 'x-lider-core-secret';
const ANTHROPIC_BASE_URL = 'https://api.anthropic.com/v1';
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

type AssistantStatusPayload = {
  status: AssistantStatusState;
  provider: 'anthropic';
  apiKeyConfigured: boolean;
  availableModels: string[];
  activeModel: string;
  upstreamMode: AssistantUpstreamMode;
  proxyConfigured: boolean;
  message: string;
  lastCheckedAt: string;
  direct: {
    status: AssistantStatusState;
    model: string;
    message: string;
  };
  proxy: {
    configured: boolean;
    status: AssistantStatusState;
    model: string | null;
    message: string;
  };
  providers: {
    anthropic: {
      configured: boolean;
      model: string;
      status: AssistantStatusState;
    };
    proxy: {
      configured: boolean;
      model: string | null;
      status: AssistantStatusState;
    };
  };
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

const runtimeSignals: {
  direct: RuntimeSignal;
  proxy: RuntimeSignal;
} = {
  direct: {
    lastSuccessAt: 0,
    lastFailureAt: 0,
    lastFailureStatus: null,
    lastFailureMessage: null,
    lastProbeAt: 0,
    lastProbeSuccessAt: 0,
    lastProbeMessage: null,
    consecutiveProbeFailures: 0,
  },
  proxy: {
    lastSuccessAt: 0,
    lastFailureAt: 0,
    lastFailureStatus: null,
    lastFailureMessage: null,
    lastProbeAt: 0,
    lastProbeSuccessAt: 0,
    lastProbeMessage: null,
    consecutiveProbeFailures: 0,
  },
};

let assistantStatusCache:
  | {
      cachedAt: number;
      payload: AssistantStatusPayload;
    }
  | null = null;
let assistantStatusInFlight: Promise<AssistantStatusPayload> | null = null;

class UpstreamRequestError extends Error {
  status: number;
  source: 'anthropic' | 'proxy';
  payload: unknown;

  constructor(source: 'anthropic' | 'proxy', status: number, message: string, payload: unknown) {
    super(message);
    this.name = 'UpstreamRequestError';
    this.status = status;
    this.source = source;
    this.payload = payload;
  }
}

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'no-store');
  return new Response(JSON.stringify(data), { ...init, headers });
}

function errorJson(status: number, code: string, message: string) {
  return json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}

function getFileExtension(filename: string) {
  const match = filename.toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match?.[1] || '';
}

function getResolvedModel(env: Env) {
  return env.ANTHROPIC_MODEL || DEFAULT_MODEL;
}

function isCoreApiConfigured(env: Env) {
  return Boolean(env.CORE_API_BASE_URL);
}

function getCoreHeaders(env: Env, sourceHeaders?: Headers) {
  const headers = new Headers(sourceHeaders);
  headers.delete('host');
  if (!headers.has('accept')) {
    headers.set('accept', 'application/json');
  }
  if (env.CORE_API_SHARED_SECRET) {
    headers.set(CORE_SECRET_HEADER, env.CORE_API_SHARED_SECRET);
  }
  return headers;
}

async function proxyCoreRequest(request: Request, env: Env) {
  const currentUrl = new URL(request.url);
  const upstreamUrl = `${sanitizeBaseUrl(env.CORE_API_BASE_URL!)}${currentUrl.pathname}${currentUrl.search}`;
  return fetch(upstreamUrl, {
    method: request.method,
    headers: getCoreHeaders(env, request.headers),
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
    redirect: 'follow',
  });
}

function sanitizeBaseUrl(url: string) {
  return url.trim().replace(/\/+$/, '');
}

function isProxyConfigured(env: Env) {
  return Boolean(env.AI_PROXY_BASE_URL?.trim() && env.AI_PROXY_SHARED_SECRET?.trim());
}

function getProxyHeaders(env: Env, headers: HeadersInit = {}) {
  const nextHeaders = new Headers(headers);
  if (env.AI_PROXY_SHARED_SECRET?.trim()) {
    nextHeaders.set(PROXY_SECRET_HEADER, env.AI_PROXY_SHARED_SECRET.trim());
  }
  return nextHeaders;
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
  assistantStatusCache = null;
}

function markSignalSuccess(signal: RuntimeSignal, message: string) {
  const now = Date.now();
  signal.lastSuccessAt = now;
  signal.lastFailureAt = 0;
  signal.lastFailureStatus = null;
  signal.lastFailureMessage = null;
  signal.lastProbeAt = now;
  signal.lastProbeSuccessAt = now;
  signal.lastProbeMessage = message;
  signal.consecutiveProbeFailures = 0;
  invalidateStatusCache();
}

function markSignalFailure(signal: RuntimeSignal, status: number | null, message: string, actualRequest: boolean) {
  const now = Date.now();
  if (actualRequest) {
    signal.lastFailureAt = now;
    signal.lastFailureStatus = status;
    signal.lastFailureMessage = message;
  } else {
    signal.lastProbeAt = now;
    signal.lastProbeMessage = message;
    signal.consecutiveProbeFailures += 1;
  }
  invalidateStatusCache();
}

function markSignalProbeSuccess(signal: RuntimeSignal, message: string) {
  const now = Date.now();
  signal.lastProbeAt = now;
  signal.lastProbeSuccessAt = now;
  signal.lastProbeMessage = message;
  signal.consecutiveProbeFailures = 0;
  invalidateStatusCache();
}

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  return (await response.json().catch(() => null)) as T | null;
}

async function fetchAnthropicJson<T>(
  env: Env,
  path: string,
  init: RequestInit
): Promise<{ response: Response; payload: T | null }> {
  if (!env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const headers = new Headers(init.headers);
  headers.set('x-api-key', env.ANTHROPIC_API_KEY);
  headers.set('anthropic-version', '2023-06-01');

  let attempt = 0;
  while (true) {
    let response: Response;

    try {
      response = await fetch(`${ANTHROPIC_BASE_URL}${path}`, {
        ...init,
        headers,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Anthropic 요청 전송에 실패했습니다.';
      throw new UpstreamRequestError('anthropic', 502, message, null);
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

function buildAnthropicPayload(
  env: Env,
  system: string,
  messages: AssistantMessage[],
  options: {
    temperature: number;
    maxTokens: number;
  }
): AnthropicPayload {
  return {
    model: getResolvedModel(env),
    max_tokens: options.maxTokens,
    temperature: options.temperature,
    system,
    messages: toAnthropicMessages(messages),
  };
}

async function countAnthropicInputTokens(env: Env, system: string, messages: AssistantMessage[]) {
  const { response, payload } = await fetchAnthropicJson<{
    input_tokens?: number;
    error?: { message?: string };
  }>(env, '/messages/count_tokens', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: getResolvedModel(env),
      system,
      messages: toAnthropicMessages(messages),
    }),
  });

  if (!response.ok || typeof payload?.input_tokens !== 'number') {
    throw new UpstreamRequestError(
      'anthropic',
      response.status,
      payload?.error?.message || `Anthropic token count failed with status ${response.status}`,
      payload
    );
  }

  return payload.input_tokens;
}

function formatCellValue(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value).replace(/\s+/g, ' ').trim().slice(0, 80) || '-';
}

function isSpreadsheetFile(filename: string, mimeType: string) {
  const extension = getFileExtension(filename);
  return (
    ['.xlsx', '.xls', '.csv'].includes(extension) ||
    mimeType === 'text/csv' ||
    mimeType === 'application/vnd.ms-excel' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

function isDocumentFile(filename: string, mimeType: string) {
  const extension = getFileExtension(filename);
  return (
    ['.docx', '.txt', '.md'].includes(extension) ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType.startsWith('text/')
  );
}

async function parseSpreadsheetFile(file: File): Promise<ParsedFile> {
  const extension = getFileExtension(file.name);
  if (extension === '.csv' || file.type === 'text/csv') {
    const rows = (await file.text())
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
      `파일명: ${file.name}`,
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
    const normalizedContext = normalizeModelText(context);

    return {
      kind: 'spreadsheet',
      promptContext: normalizedContext,
      meta: {
        name: file.name,
        mimeType: file.type || 'text/csv',
        size: file.size,
        kind: 'spreadsheet',
        skillPackage: 'excel',
        sheetNames: ['CSV'],
        sheetCount: 1,
        previewRowCount: previewRowLimit,
        extractedCharacters: normalizedContext.length,
        truncated: false,
      },
    };
  }

  const workbook = XLSX.read(await file.arrayBuffer(), {
    type: 'array',
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
    `파일명: ${file.name}`,
    '활성 스킬 패키지: 엑셀 스킬 패키지',
    `시트 수: ${sheetNames.length}`,
    sheetNames.length > previewSheetNames.length
      ? `미리보기 시트: ${previewSheetNames.join(', ')} 외 ${sheetNames.length - previewSheetNames.length}개`
      : `시트명: ${sheetNames.join(', ')}`,
    '',
    '[시트 미리보기]',
    summaries.join('\n\n'),
  ].join('\n');
  const normalizedContext = normalizeModelText(context);

  return {
    kind: 'spreadsheet',
    promptContext: normalizedContext,
    meta: {
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      kind: 'spreadsheet',
      skillPackage: 'excel',
      sheetNames,
      sheetCount: sheetNames.length,
      previewRowCount: previewRowLimit,
      extractedCharacters: normalizedContext.length,
      truncated: false,
    },
  };
}

async function parseDocumentFile(file: File): Promise<ParsedFile> {
  const extension = getFileExtension(file.name);
  let rawText = '';

  if (
    extension === '.docx' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    rawText = result.value || '';
  } else if (extension === '.txt' || extension === '.md' || file.type.startsWith('text/')) {
    rawText = await file.text();
  } else {
    throw new Error('지원하지 않는 문서 형식입니다. DOCX, TXT, MD 파일을 사용해 주세요.');
  }

  const promptContext = normalizeModelText(
    [
      `파일명: ${file.name}`,
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
      name: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      kind: 'document',
      skillPackage: 'document',
      extractedCharacters: promptContext.length,
      truncated: false,
    },
  };
}

async function parseAssistantFile(file: File): Promise<ParsedFile> {
  if (isSpreadsheetFile(file.name, file.type)) {
    return parseSpreadsheetFile(file);
  }

  if (isDocumentFile(file.name, file.type)) {
    return parseDocumentFile(file);
  }

  throw new Error('지원하지 않는 첨부 형식입니다. 엑셀은 XLSX/XLS/CSV, 문서는 DOCX/TXT/MD를 사용해 주세요.');
}

function normalizeAssistantResult(
  env: Env,
  data: Partial<AssistantResult>,
  upstream: AssistantResult['upstream']
): AssistantResult {
  return {
    reply: typeof data.reply === 'string' ? data.reply : '',
    model: typeof data.model === 'string' && data.model ? data.model : getResolvedModel(env),
    provider: 'anthropic',
    stopReason:
      typeof data.stopReason === 'string' || data.stopReason === null ? data.stopReason ?? null : null,
    usage: data.usage ?? null,
    upstream,
  };
}

function markDirectFailureFromError(error: unknown, actualRequest: boolean) {
  if (error instanceof UpstreamRequestError && error.source === 'anthropic') {
    markSignalFailure(runtimeSignals.direct, error.status, error.message, actualRequest);
    return;
  }

  if (error instanceof Error && /ANTHROPIC_API_KEY is not configured/i.test(error.message)) {
    markSignalFailure(runtimeSignals.direct, null, error.message, actualRequest);
  }
}

async function callAnthropic(
  env: Env,
  system: string,
  messages: AssistantMessage[],
  options: {
    temperature: number;
    maxTokens: number;
  }
): Promise<AssistantResult> {
  try {
    const { response, payload } = await fetchAnthropicJson<{
      content?: Array<{ type?: string; text?: string }>;
      model?: string;
      usage?: unknown;
      stop_reason?: string | null;
      error?: { message?: string };
    }>(env, '/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(buildAnthropicPayload(env, system, messages, options)),
    });

    if (!response.ok) {
      throw new UpstreamRequestError(
        'anthropic',
        response.status,
        payload?.error?.message || `Anthropic request failed with status ${response.status}`,
        payload
      );
    }

    const reply = Array.isArray(payload?.content)
      ? payload.content
          .filter((item) => item.type === 'text' && typeof item.text === 'string')
          .map((item) => item.text as string)
          .join('\n')
          .trim()
      : '';

    markSignalSuccess(runtimeSignals.direct, '최근 공개 AI 요청이 직접 Anthropic 경로에서 성공했습니다.');

    return normalizeAssistantResult(
      env,
      {
        reply,
        model: payload?.model || getResolvedModel(env),
        stopReason: payload?.stop_reason || null,
        usage: payload?.usage || null,
      },
      {
        mode: 'direct',
        target: 'anthropic',
        fallbackUsed: false,
      }
    );
  } catch (error) {
    markDirectFailureFromError(error, true);
    throw error;
  }
}

function shouldUseProxyFallback(env: Env, error: unknown) {
  if (!isProxyConfigured(env)) {
    return false;
  }

  if (error instanceof UpstreamRequestError && error.source === 'anthropic') {
    return (
      error.status === 401 ||
      (error.status === 403 && /request not allowed/i.test(error.message)) ||
      error.status === 429 ||
      error.status >= 500
    );
  }

  return error instanceof Error && /ANTHROPIC_API_KEY is not configured/i.test(error.message);
}

async function callProxyChat(
  env: Env,
  body: {
    messages: AssistantMessage[];
    context?: AssistantContext;
  }
): Promise<AssistantResult> {
  if (!isProxyConfigured(env)) {
    throw new Error('AI proxy fallback is not configured');
  }

  let response: Response;

  try {
    response = await fetch(`${sanitizeBaseUrl(env.AI_PROXY_BASE_URL!)}/v1/ai/chat`, {
      method: 'POST',
      headers: getProxyHeaders(env, {
        'content-type': 'application/json',
        accept: 'application/json',
      }),
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new UpstreamRequestError(
      'proxy',
      502,
      error instanceof Error ? error.message : 'AI proxy 요청 전송에 실패했습니다.',
      null
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | {
        success?: boolean;
        data?: Partial<AssistantResult>;
        error?: { message?: string };
      }
    | null;

  if (!response.ok || !payload?.success || !payload?.data?.reply) {
    throw new UpstreamRequestError(
      'proxy',
      response.status,
      payload?.error?.message || `AI proxy request failed with status ${response.status}`,
      payload
    );
  }

  markSignalSuccess(runtimeSignals.proxy, '최근 Railway fallback 요청이 성공했습니다.');

  return normalizeAssistantResult(env, payload.data, {
    mode: 'proxy',
    target: 'railway-proxy',
    fallbackUsed: true,
  });
}

async function callProxyAnalyzeFile(
  env: Env,
  args: {
    file: File;
    prompt: string;
    route: string;
    centerName: string;
    mode: string;
  }
): Promise<AssistantResult & { file?: ParsedFile['meta'] }> {
  if (!isProxyConfigured(env)) {
    throw new Error('AI proxy fallback is not configured');
  }

  const formData = new FormData();
  formData.append('file', args.file);
  if (args.prompt) {
    formData.append('prompt', args.prompt);
  }
  formData.append('route', args.route);
  formData.append('centerName', args.centerName);
  formData.append('mode', args.mode);

  let response: Response;

  try {
    response = await fetch(`${sanitizeBaseUrl(env.AI_PROXY_BASE_URL!)}/v1/ai/analyze-file`, {
      method: 'POST',
      headers: getProxyHeaders(env),
      body: formData,
    });
  } catch (error) {
    throw new UpstreamRequestError(
      'proxy',
      502,
      error instanceof Error ? error.message : 'AI proxy 요청 전송에 실패했습니다.',
      null
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | {
        success?: boolean;
        data?: Partial<AssistantResult> & { file?: ParsedFile['meta'] };
        error?: { message?: string };
      }
    | null;

  if (!response.ok || !payload?.success || !payload?.data?.reply) {
    throw new UpstreamRequestError(
      'proxy',
      response.status,
      payload?.error?.message || `AI proxy request failed with status ${response.status}`,
      payload
    );
  }

  markSignalSuccess(runtimeSignals.proxy, '최근 Railway fallback 파일 분석 요청이 성공했습니다.');

  return {
    ...normalizeAssistantResult(env, payload.data, {
      mode: 'proxy',
      target: 'railway-proxy',
      fallbackUsed: true,
    }),
    file: payload.data.file,
  };
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

function buildAnalyzeSystemPrompt(parsed: ParsedFile, context: AssistantContext) {
  return [
    '당신은 LIDER의 AI 도우미입니다.',
    '반드시 한국어로 답하세요.',
    parsed.kind === 'spreadsheet'
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

async function prepareChatMessages(env: Env, system: string, messages: AssistantMessage[]) {
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
  let inputTokens = await countAnthropicInputTokens(env, system, candidateMessages);
  let truncated = normalizedMessages.length > candidateMessages.length;

  while (candidateMessages.length > 2 && inputTokens > CHAT_TOKEN_BUDGET.targetInputTokens) {
    candidateMessages = candidateMessages.slice(1);
    truncated = true;
    inputTokens = await countAnthropicInputTokens(env, system, candidateMessages);
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
      truncated = true;
      inputTokens = await countAnthropicInputTokens(env, system, candidateMessages);
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

  return {
    messages: candidateMessages,
    inputTokens,
    truncated,
  };
}

function buildFileUserMessage(parsed: ParsedFile, requestedPrompt: string, promptContext: string) {
  return [
    `사용자 요청:\n${requestedPrompt}`,
    '',
    '[업로드 파일 정보]',
    `파일명: ${parsed.meta.name}`,
    `파일 종류: ${parsed.kind === 'spreadsheet' ? '엑셀/스프레드시트' : '문서'}`,
    `활성 스킬 패키지: ${parsed.meta.skillPackage === 'excel' ? '엑셀 스킬 패키지' : '문서 스킬 패키지'}`,
    '',
    promptContext,
  ].join('\n');
}

async function prepareFileAnalysisMessage(
  env: Env,
  system: string,
  parsed: ParsedFile,
  requestedPrompt: string
) {
  const baseContext = normalizeModelText(parsed.promptContext);
  let promptContext = baseContext;
  let userMessage = buildFileUserMessage(parsed, requestedPrompt, promptContext);
  let inputTokens = await countAnthropicInputTokens(env, system, [
    {
      role: 'user',
      content: userMessage,
    },
  ]);
  let truncated = parsed.meta.truncated;
  let contextTokenBudget = Math.max(
    4_000,
    FILE_TOKEN_BUDGET.targetInputTokens - estimateTokens(system) - estimateTokens(requestedPrompt) - 1_200
  );

  if (inputTokens > FILE_TOKEN_BUDGET.targetInputTokens) {
    const clipped = clipTextToApproximateTokens(baseContext, contextTokenBudget);
    promptContext = clipped.value;
    truncated = truncated || clipped.truncated;
    userMessage = buildFileUserMessage(parsed, requestedPrompt, promptContext);
    inputTokens = await countAnthropicInputTokens(env, system, [
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
    userMessage = buildFileUserMessage(parsed, requestedPrompt, promptContext);
    inputTokens = await countAnthropicInputTokens(env, system, [
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
      ...parsed.meta,
      extractedCharacters: promptContext.length,
      truncated,
    },
    inputTokens,
  };
}

async function probeAnthropicStatus(env: Env): Promise<{
  status: AssistantStatusState;
  model: string;
  message: string;
}> {
  const model = getResolvedModel(env);
  if (!env.ANTHROPIC_API_KEY) {
    return {
      status: 'warning',
      model,
      message: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.',
    };
  }

  if (runtimeSignals.direct.lastSuccessAt > 0 && Date.now() - runtimeSignals.direct.lastSuccessAt <= RECENT_SUCCESS_WINDOW_MS) {
    return {
      status: 'operational',
      model,
      message: '최근 공개 AI 요청이 직접 Anthropic 경로에서 성공했습니다.',
    };
  }

  if (runtimeSignals.direct.lastFailureAt > 0 && Date.now() - runtimeSignals.direct.lastFailureAt <= RECENT_FAILURE_WINDOW_MS) {
    return {
      status: 'error',
      model,
      message: runtimeSignals.direct.lastFailureMessage || '최근 직접 Anthropic 요청이 실패했습니다.',
    };
  }

  if (
    runtimeSignals.direct.lastProbeSuccessAt > 0 &&
    Date.now() - runtimeSignals.direct.lastProbeSuccessAt <= STATUS_CACHE_TTL_MS
  ) {
    return {
      status: 'operational',
      model,
      message: runtimeSignals.direct.lastProbeMessage || '가벼운 토큰 probe로 직접 연결을 확인했습니다.',
    };
  }

  if (
    runtimeSignals.direct.consecutiveProbeFailures >= MAX_PROBE_FAILURES_BEFORE_ERROR &&
    runtimeSignals.direct.lastProbeAt > 0 &&
    Date.now() - runtimeSignals.direct.lastProbeAt <= PROBE_FAILURE_WINDOW_MS
  ) {
    return {
      status: 'error',
      model,
      message: runtimeSignals.direct.lastProbeMessage || '직접 Anthropic 상태 확인이 연속 실패했습니다.',
    };
  }

  try {
    await countAnthropicInputTokens(env, '', [
      {
        role: 'user',
        content: 'ping',
      },
    ]);
    markSignalProbeSuccess(runtimeSignals.direct, '가벼운 토큰 probe로 직접 연결을 확인했습니다.');
    return {
      status: 'operational',
      model,
      message: '가벼운 토큰 probe로 직접 연결을 확인했습니다.',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Anthropic 상태 확인에 실패했습니다.';
    markSignalFailure(
      runtimeSignals.direct,
      error instanceof UpstreamRequestError ? error.status : null,
      message,
      false
    );
    return {
      status:
        runtimeSignals.direct.consecutiveProbeFailures >= MAX_PROBE_FAILURES_BEFORE_ERROR ? 'error' : 'warning',
      model,
      message,
    };
  }
}

async function probeProxyStatus(env: Env): Promise<{
  configured: boolean;
  status: AssistantStatusState;
  message: string;
  model: string | null;
}> {
  if (!isProxyConfigured(env)) {
    return {
      configured: false,
      status: 'warning',
      message: '프록시 fallback이 아직 설정되지 않았습니다.',
      model: null,
    };
  }

  if (runtimeSignals.proxy.lastSuccessAt > 0 && Date.now() - runtimeSignals.proxy.lastSuccessAt <= RECENT_SUCCESS_WINDOW_MS) {
    return {
      configured: true,
      status: 'operational',
      message: '최근 Railway fallback 요청이 성공했습니다.',
      model: getResolvedModel(env),
    };
  }

  if (runtimeSignals.proxy.lastFailureAt > 0 && Date.now() - runtimeSignals.proxy.lastFailureAt <= RECENT_FAILURE_WINDOW_MS) {
    return {
      configured: true,
      status: 'error',
      message: runtimeSignals.proxy.lastFailureMessage || '최근 Railway fallback 요청이 실패했습니다.',
      model: null,
    };
  }

  try {
    const response = await fetch(`${sanitizeBaseUrl(env.AI_PROXY_BASE_URL!)}/v1/ai/status`, {
      method: 'GET',
      headers: getProxyHeaders(env, {
        accept: 'application/json',
      }),
    });

    const payload = (await response.json().catch(() => null)) as
      | {
          success?: boolean;
          data?: {
            status?: AssistantStatusState;
            activeModel?: string;
            model?: string;
            message?: string;
          };
          error?: { message?: string };
        }
      | null;

    if (!response.ok || !payload?.success || !payload?.data) {
      const message = payload?.error?.message || `AI proxy status probe failed with status ${response.status}`;
      markSignalFailure(runtimeSignals.proxy, response.status, message, false);
      return {
        configured: true,
        status: 'error',
        message,
        model: null,
      };
    }

    const nextStatus = payload.data.status;
    const message = payload.data.message || 'AI proxy fallback 상태를 확인했습니다.';
    const model =
      (typeof payload.data.activeModel === 'string' && payload.data.activeModel) ||
      (typeof payload.data.model === 'string' && payload.data.model) ||
      null;

    if (nextStatus === 'operational') {
      markSignalProbeSuccess(runtimeSignals.proxy, message);
    } else {
      markSignalFailure(runtimeSignals.proxy, response.status, message, false);
    }

    return {
      configured: true,
      status: nextStatus === 'operational' || nextStatus === 'warning' ? nextStatus : 'error',
      message,
      model,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI proxy 상태 확인에 실패했습니다.';
    markSignalFailure(runtimeSignals.proxy, null, message, false);
    return {
      configured: true,
      status: 'error',
      message,
      model: null,
    };
  }
}

async function resolveChatWithFallback(
  env: Env,
  body: {
    messages: AssistantMessage[];
    context?: AssistantContext;
  }
): Promise<AssistantResult> {
  const systemPrompt = buildChatSystemPrompt(body.context);

  try {
    const prepared = await prepareChatMessages(env, systemPrompt, body.messages);
    return await callAnthropic(env, systemPrompt, prepared.messages, {
      temperature: 0.4,
      maxTokens: CHAT_TOKEN_BUDGET.maxOutputTokens,
    });
  } catch (error) {
    markDirectFailureFromError(error, true);
    if (shouldUseProxyFallback(env, error)) {
      try {
        return await callProxyChat(env, body);
      } catch (proxyError) {
        if (proxyError instanceof UpstreamRequestError && proxyError.source === 'proxy') {
          markSignalFailure(runtimeSignals.proxy, proxyError.status, proxyError.message, true);
        }
        throw proxyError;
      }
    }

    throw error;
  }
}

async function resolveFileAnalysisWithFallback(
  env: Env,
  args: {
    file: File;
    prompt: string;
    route: string;
    centerName: string;
    mode: string;
  }
): Promise<AssistantResult & { file: ParsedFile['meta'] }> {
  const parsed = await parseAssistantFile(args.file);
  const requestedPrompt =
    args.prompt ||
    (parsed.kind === 'spreadsheet'
      ? '이 엑셀의 구조를 요약하고 바로 확인할 항목 3개를 정리해줘.'
      : '이 문서를 요약하고 보완할 점과 다음 액션을 정리해줘.');
  const systemPrompt = buildAnalyzeSystemPrompt(parsed, {
    route: args.route,
    centerName: args.centerName,
    mode: args.mode,
  });

  try {
    const prepared = await prepareFileAnalysisMessage(env, systemPrompt, parsed, requestedPrompt);
    const result = await callAnthropic(env, systemPrompt, [prepared.message], {
      temperature: 0.2,
      maxTokens: FILE_TOKEN_BUDGET.maxOutputTokens,
    });

    return {
      ...result,
      file: prepared.meta,
    };
  } catch (error) {
    markDirectFailureFromError(error, true);
    if (shouldUseProxyFallback(env, error)) {
      try {
        const proxied = await callProxyAnalyzeFile(env, args);
        return {
          ...proxied,
          file: proxied.file || parsed.meta,
        };
      } catch (proxyError) {
        if (proxyError instanceof UpstreamRequestError && proxyError.source === 'proxy') {
          markSignalFailure(runtimeSignals.proxy, proxyError.status, proxyError.message, true);
        }
        throw proxyError;
      }
    }

    throw error;
  }
}

async function handleChat(request: Request, env: Env) {
  const body = (await request.json().catch(() => null)) as
    | {
        messages?: AssistantMessage[];
        context?: AssistantContext;
      }
    | null;

  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return errorJson(400, 'INVALID_MESSAGES', '대화 메시지가 비어 있습니다.');
  }

  try {
    const result = await resolveChatWithFallback(env, body);
    return json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return errorJson(500, 'AI_CHAT_FAILED', error instanceof Error ? error.message : 'AI 채팅에 실패했습니다.');
  }
}

async function handleAnalyzeFile(request: Request, env: Env) {
  const formData = await request.formData();
  const file = formData.get('file');
  const prompt = String(formData.get('prompt') || '').trim();
  const route = String(formData.get('route') || '');
  const centerName = String(formData.get('centerName') || '');
  const mode = String(formData.get('mode') || '');

  if (!(file instanceof File)) {
    return errorJson(400, 'NO_FILE', '분석할 파일이 없습니다.');
  }

  const extension = getFileExtension(file.name);
  if (extension === '.pdf' || file.type === 'application/pdf') {
    return errorJson(
      400,
      'UNSUPPORTED_FILE',
      'PDF 분석은 현재 공개 배포본에서 지원하지 않습니다. DOCX, TXT, MD 파일로 변환해 다시 업로드해 주세요.'
    );
  }

  try {
    const result = await resolveFileAnalysisWithFallback(env, {
      file,
      prompt,
      route,
      centerName,
      mode,
    });

    return json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorJson(500, 'AI_FILE_ANALYSIS_FAILED', error instanceof Error ? error.message : '파일 분석에 실패했습니다.');
  }
}

function buildAssistantStatusPayload(
  env: Env,
  direct: Awaited<ReturnType<typeof probeAnthropicStatus>>,
  proxy: Awaited<ReturnType<typeof probeProxyStatus>>
): AssistantStatusPayload {
  let status: AssistantStatusState;
  let upstreamMode: AssistantUpstreamMode;
  let message: string;

  if (direct.status === 'operational') {
    status = 'operational';
    upstreamMode = 'direct';
    message = direct.message;
  } else if (proxy.configured && proxy.status === 'operational') {
    status = 'warning';
    upstreamMode = 'proxy';
    message = `직접 Anthropic 경로를 최근 확인하지 못해 Railway fallback 준비 경로로 운영 중입니다. ${direct.message}`;
  } else if (direct.status === 'warning') {
    status = 'warning';
    upstreamMode = 'unavailable';
    message = direct.message;
  } else {
    status = 'error';
    upstreamMode = 'unavailable';
    message = direct.message || proxy.message;
  }

  const activeModel =
    upstreamMode === 'proxy' ? proxy.model || direct.model : direct.model || proxy.model || getResolvedModel(env);

  return {
    status,
    provider: 'anthropic',
    apiKeyConfigured: Boolean(env.ANTHROPIC_API_KEY),
    availableModels: activeModel ? [activeModel] : [],
    activeModel,
    upstreamMode,
    proxyConfigured: proxy.configured,
    message,
    lastCheckedAt: new Date().toISOString(),
    direct: {
      status: direct.status,
      model: direct.model,
      message: direct.message,
    },
    proxy: {
      configured: proxy.configured,
      status: proxy.status,
      model: proxy.model,
      message: proxy.message,
    },
    providers: {
      anthropic: {
        configured: Boolean(env.ANTHROPIC_API_KEY),
        model: direct.model,
        status: direct.status,
      },
      proxy: {
        configured: proxy.configured,
        model: proxy.model,
        status: proxy.status,
      },
    },
  };
}

async function getAssistantStatusPayload(env: Env) {
  if (assistantStatusCache && Date.now() - assistantStatusCache.cachedAt <= STATUS_CACHE_TTL_MS) {
    return assistantStatusCache.payload;
  }

  if (assistantStatusInFlight) {
    return assistantStatusInFlight;
  }

  assistantStatusInFlight = (async () => {
    const direct = await probeAnthropicStatus(env);
    const proxy = direct.status === 'operational'
      ? {
          configured: isProxyConfigured(env),
          status: isProxyConfigured(env) ? ('warning' as const) : ('warning' as const),
          message: isProxyConfigured(env)
            ? '프록시 fallback은 대기 상태이며 direct 장애 시에만 사용합니다.'
            : '프록시 fallback이 아직 설정되지 않았습니다.',
          model: isProxyConfigured(env) ? getResolvedModel(env) : null,
        }
      : await probeProxyStatus(env);
    const payload = buildAssistantStatusPayload(env, direct, proxy);
    assistantStatusCache = {
      cachedAt: Date.now(),
      payload,
    };
    return payload;
  })();

  try {
    return await assistantStatusInFlight;
  } finally {
    assistantStatusInFlight = null;
  }
}

async function handleAiStatus(env: Env) {
  const payload = await getAssistantStatusPayload(env);
  return json({
    success: true,
    data: payload,
  });
}

async function handleHealth(request: Request, env: Env) {
  if (isCoreApiConfigured(env)) {
    try {
      return await proxyCoreRequest(request, env);
    } catch {
      return json(
        {
          success: false,
          data: {
            service: 'lider-core-api',
            status: 'unreachable',
            scope: 'backend',
            timestamp: new Date().toISOString(),
            note: '백엔드 상태 응답을 가져오지 못했습니다.',
          },
        },
        { status: 503 }
      );
    }
  }

  return json({
    success: true,
    data: {
      service: 'lider-frontend-worker',
      status: 'limited',
      version: 'workers-ai',
      timestamp: new Date().toISOString(),
      scope: 'public-worker',
      note: '공개 Worker 라우트 응답만 확인하며 DB나 내부 서비스 상태는 판별하지 않습니다.',
    },
  });
}

async function handleHealthDetail(request: Request, env: Env) {
  if (isCoreApiConfigured(env)) {
    try {
      return await proxyCoreRequest(request, env);
    } catch {
      return json(
        {
          success: false,
          data: {
            status: 'unreachable',
            scope: 'backend',
            checks: {
              worker: false,
              database: null,
              timestamp: new Date().toISOString(),
            },
            note: '백엔드 상세 상태 응답을 가져오지 못했습니다.',
          },
        },
        { status: 503 }
      );
    }
  }

  return json({
    success: true,
    data: {
      status: 'limited',
      scope: 'public-worker',
      checks: {
        worker: true,
        database: null,
        timestamp: new Date().toISOString(),
      },
      note: '공개 Worker 배포에서는 DB 연결 상태를 확정할 수 없습니다.',
    },
  });
}

async function handlePublicDataStatus(request: Request, env: Env) {
  if (isCoreApiConfigured(env)) {
    try {
      return await proxyCoreRequest(request, env);
    } catch {
      return json(
        {
          success: false,
          data: {
            status: 'unreachable',
            apiKeyConfigured: null,
            note: '백엔드 공공데이터 상태 응답을 가져오지 못했습니다.',
          },
        },
        { status: 503 }
      );
    }
  }

  return json({
    success: true,
    data: {
      status: 'unknown',
      apiKeyConfigured: null,
      note: '공개 Worker 배포에서는 공공데이터 연동의 실제 운영 상태를 검증하지 않습니다.',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/v1/')) {
      return new Response(null, {
        headers: {
          'access-control-allow-origin': request.headers.get('origin') || '*',
          'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
          'access-control-allow-headers': 'authorization,content-type',
        },
      });
    }

    if (url.pathname === '/v1/ai/status' && request.method === 'GET') {
      return handleAiStatus(env);
    }

    if (url.pathname === '/v1/ai/chat' && request.method === 'POST') {
      return handleChat(request, env);
    }

    if (url.pathname === '/v1/ai/analyze-file' && request.method === 'POST') {
      return handleAnalyzeFile(request, env);
    }

    if (url.pathname === '/v1/health' && request.method === 'GET') {
      return handleHealth(request, env);
    }

    if (url.pathname === '/v1/health/detail' && request.method === 'GET') {
      return handleHealthDetail(request, env);
    }

    if (url.pathname === '/v1/public-data/status' && request.method === 'GET') {
      return handlePublicDataStatus(request, env);
    }

    if (
      isCoreApiConfigured(env) &&
      ((url.pathname === '/v1/auth/login' && request.method === 'POST') ||
        (url.pathname === '/v1/auth/me' && request.method === 'GET') ||
        (url.pathname === '/v1/auth/logout' && request.method === 'POST') ||
        (url.pathname === '/v1/auth/onboarding' && (request.method === 'GET' || request.method === 'PUT')))
    ) {
      return proxyCoreRequest(request, env);
    }

    if (
      !isCoreApiConfigured(env) &&
      (
        url.pathname === '/v1/auth/login' ||
        url.pathname === '/v1/auth/me' ||
        url.pathname === '/v1/auth/logout' ||
        url.pathname === '/v1/auth/onboarding'
      )
    ) {
      return errorJson(503, 'CORE_API_NOT_CONFIGURED', '백엔드 인증 API 연결이 아직 설정되지 않았습니다.');
    }

    return env.ASSETS.fetch(request);
  },
};
