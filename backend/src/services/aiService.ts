import axios from 'axios';
import mammoth from 'mammoth';
import path from 'node:path';
import { PDFParse } from 'pdf-parse';
import * as XLSX from 'xlsx';
import { loggers } from '../utils/logger';

const logger = loggers.ai;

function getKimiBaseUrl() {
  return process.env.KIMI_BASE_URL || 'https://api.moonshot.cn/v1';
}

function getKimiApiKey() {
  return process.env.KIMI_API_KEY || '';
}

function getAnthropicBaseUrl() {
  return process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1';
}

function getAnthropicApiKey() {
  return process.env.ANTHROPIC_API_KEY || '';
}

function getAnthropicModel() {
  return process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
}

function createKimiClient() {
  return axios.create({
    baseURL: getKimiBaseUrl(),
    headers: {
      Authorization: `Bearer ${getKimiApiKey()}`,
      'Content-Type': 'application/json',
    },
    timeout: 120000,
  });
}

function createAnthropicClient() {
  return axios.create({
    baseURL: getAnthropicBaseUrl(),
    headers: {
      'x-api-key': getAnthropicApiKey(),
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    timeout: 120000,
  });
}

interface AssistantChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantChatContext {
  route?: string;
  centerName?: string;
  mode?: string;
}

interface AssistantFileInput {
  filename: string;
  mimetype?: string;
  buffer: Buffer;
  size: number;
  prompt?: string;
}

interface AssistantFileMeta {
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
}

interface ParsedAssistantFile {
  kind: 'spreadsheet' | 'document';
  promptContext: string;
  meta: AssistantFileMeta;
  extractedText?: string;
}

function getFileExtension(filename: string) {
  return path.extname(filename).toLowerCase();
}

function truncateContent(text: string, maxLength = 14_000) {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (normalized.length <= maxLength) {
    return { value: normalized, truncated: false };
  }

  return {
    value: `${normalized.slice(0, maxLength)}\n\n[...중략: 길이가 길어 앞부분만 Claude에 전달했습니다.]`,
    truncated: true,
  };
}

function formatCellValue(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value).replace(/\s+/g, ' ').trim().slice(0, 80) || '-';
}

function isSpreadsheetFile(filename: string, mimetype?: string) {
  const extension = getFileExtension(filename);
  return (
    ['.xlsx', '.xls', '.csv'].includes(extension) ||
    mimetype === 'text/csv' ||
    mimetype === 'application/vnd.ms-excel' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

function isDocumentFile(filename: string, mimetype?: string) {
  const extension = getFileExtension(filename);
  return (
    ['.pdf', '.docx', '.txt', '.md'].includes(extension) ||
    mimetype === 'application/pdf' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    !!mimetype?.startsWith('text/')
  );
}

function parseSpreadsheetBuffer(file: AssistantFileInput): ParsedAssistantFile {
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
    const truncated = truncateContent(context);

    return {
      kind: 'spreadsheet',
      promptContext: truncated.value,
      meta: {
        name: file.filename,
        mimeType: file.mimetype || 'text/csv',
        size: file.size,
        kind: 'spreadsheet',
        skillPackage: 'excel',
        sheetNames: ['CSV'],
        sheetCount: 1,
        previewRowCount: previewRowLimit,
        extractedCharacters: truncated.value.length,
        truncated: truncated.truncated,
      },
      extractedText: rows.map((row) => row.join(', ')).join('\n'),
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
    `활성 스킬 패키지: 엑셀 스킬 패키지`,
    `시트 수: ${sheetNames.length}`,
    sheetNames.length > previewSheetNames.length
      ? `미리보기 시트: ${previewSheetNames.join(', ')} 외 ${sheetNames.length - previewSheetNames.length}개`
      : `시트명: ${sheetNames.join(', ')}`,
    '',
    '[시트 미리보기]',
    summaries.join('\n\n'),
  ].join('\n');

  const truncated = truncateContent(context);

  return {
    kind: 'spreadsheet',
    promptContext: truncated.value,
    meta: {
      name: file.filename,
      mimeType: file.mimetype || 'application/octet-stream',
      size: file.size,
      kind: 'spreadsheet',
      skillPackage: 'excel',
      sheetNames,
      sheetCount: sheetNames.length,
      previewRowCount: previewRowLimit,
      extractedCharacters: truncated.value.length,
      truncated: truncated.truncated,
    },
    extractedText: summaries.join('\n\n'),
  };
}

async function parseDocumentBuffer(file: AssistantFileInput): Promise<ParsedAssistantFile> {
  const extension = getFileExtension(file.filename);
  let rawText = '';
  let pageCount: number | undefined;

  if (extension === '.pdf' || file.mimetype === 'application/pdf') {
    const parser = new PDFParse({ data: file.buffer });
    try {
      const parsed = await parser.getText();
      rawText = parsed.text || '';
      pageCount = parsed.total;
    } finally {
      await parser.destroy();
    }
  } else if (
    extension === '.docx' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    rawText = parsed.value || '';
  } else if (extension === '.doc') {
    throw new Error('기존 .doc 형식은 바로 분석할 수 없습니다. .docx 또는 PDF로 저장한 뒤 다시 업로드해 주세요.');
  } else if (extension === '.txt' || extension === '.md' || file.mimetype?.startsWith('text/')) {
    rawText = file.buffer.toString('utf-8');
  } else {
    throw new Error('지원하지 않는 문서 형식입니다. PDF, DOCX, TXT, MD 파일을 사용해 주세요.');
  }

  const truncated = truncateContent([
    `파일명: ${file.filename}`,
    '활성 스킬 패키지: 문서 스킬 패키지',
    pageCount ? `페이지 수: ${pageCount}` : null,
    '',
    '[문서 본문]',
    rawText || '본문을 추출하지 못했습니다.',
  ].filter(Boolean).join('\n'));

  return {
    kind: 'document',
    promptContext: truncated.value,
    meta: {
      name: file.filename,
      mimeType: file.mimetype || 'application/octet-stream',
      size: file.size,
      kind: 'document',
      skillPackage: 'document',
      pageCount,
      extractedCharacters: truncated.value.length,
      truncated: truncated.truncated,
    },
    extractedText: rawText,
  };
}

async function parseAssistantFile(file: AssistantFileInput): Promise<ParsedAssistantFile> {
  if (isSpreadsheetFile(file.filename, file.mimetype)) {
    return parseSpreadsheetBuffer(file);
  }

  if (isDocumentFile(file.filename, file.mimetype)) {
    return parseDocumentBuffer(file);
  }

  throw new Error('지원하지 않는 첨부 형식입니다. 엑셀은 XLSX/XLS/CSV, 문서는 PDF/DOCX/TXT/MD를 사용해 주세요.');
}

async function createAnthropicResponse(
  messages: AssistantChatMessage[],
  systemPrompt: string,
  temperature = 0.4
) {
  const anthropicApiKey = getAnthropicApiKey();
  const anthropicModel = getAnthropicModel();
  const anthropicClient = createAnthropicClient();

  if (!anthropicApiKey) {
    const error = new Error('ANTHROPIC_API_KEY is not configured');
    logger.error(error, 'Anthropic chat is unavailable');
    throw error;
  }

  const response = await anthropicClient.post('/messages', {
    model: anthropicModel,
    max_tokens: 1400,
    temperature,
    system: systemPrompt,
    messages: messages.map((message) => ({
      role: message.role,
      content: [
        {
          type: 'text',
          text: message.content,
        },
      ],
    })),
  });

  const content = Array.isArray(response.data.content)
    ? response.data.content
        .filter((item: { type?: string; text?: string }) => item.type === 'text' && typeof item.text === 'string')
        .map((item: { text: string }) => item.text)
        .join('\n')
        .trim()
    : '';

  return {
    reply: content,
    model: response.data.model || anthropicModel,
    provider: 'anthropic' as const,
    stopReason: response.data.stop_reason || null,
    usage: response.data.usage || null,
  };
}

function getDocumentTypePrompt(documentType: string) {
  const documentTypePrompts: Record<string, string> = {
    EVAL_FORM: '장기요양 기능평가표에서 ADL/IADL 점수, 인지기능, 치매등급 등을 추출해주세요.',
    DOCTOR_NOTE: '의사소견서에서 진단명, 질병코드(KCD), 치료사항, 특이사항을 추출해주세요.',
    DIAGNOSIS: '진단서에서 진단명, 진단코드, 발병일, 치료기간을 추출해주세요.',
    CONTRACT: '재계약신청서에서 수급자번호, 재계약기간, 서비스 유형을 추출해주세요.',
    CARE_PLAN: '돌봄계획서에서 중점관리영역, 서비스 목표, 주요중재를 추출해주세요.',
  };

  return documentTypePrompts[documentType] || '문서에서 주요 정보를 추출해주세요.';
}

function buildFallbackConsultationDraft(transcribedText: string) {
  const normalized = transcribedText.replace(/\s+/g, ' ').trim();
  const summary = normalized.slice(0, 220) || '상담 메모가 비어 있어 기본 초안을 생성했습니다.';
  const keywordMap = [
    ['가족', '가족 소통 확인'],
    ['보호자', '보호자 응대 확인'],
    ['복약', '복약 상태 점검'],
    ['식사', '식사 상태 확인'],
    ['정서', '정서 상태 관찰'],
    ['불안', '정서 불안 관찰'],
    ['문서', '문서 보완 필요'],
    ['평가', '평가 일정 확인'],
  ] as const;

  const keyIssues = keywordMap
    .filter(([keyword]) => normalized.includes(keyword))
    .map(([, label]) => label)
    .slice(0, 3);

  const recommendedActions = [
    keyIssues[0] ? `${keyIssues[0]} 관련 후속 확인` : '상담 메모를 검토해 후속 조치를 확정해 주세요.',
    '최종 저장 전에 표현과 일정 정보를 다시 확인해 주세요.',
  ].filter(Boolean);

  const riskFactors = ['검수 필요'];
  if (normalized.includes('불안') || normalized.includes('통증') || normalized.includes('이상')) {
    riskFactors.unshift('현장 상태 재확인 필요');
  }

  return {
    subject: keyIssues[0] || '음성 기록 상담',
    content: summary,
    summary,
    keyIssues: keyIssues.length > 0 ? keyIssues : ['상담 메모 검토 필요'],
    recommendedActions,
    followUpNeeded: keyIssues.length > 0 || normalized.length > 0,
    riskFactors,
    actionItems: recommendedActions.map((task) => ({
      task,
      priority: 'medium',
      due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    })),
  };
}

function buildFallbackDocumentExtraction(parsedText: string, documentType: string) {
  const normalized = parsedText.replace(/\s+/g, ' ').trim();
  const summary = normalized.slice(0, 300);

  return {
    documentType,
    shortSummary: summary || '본문을 추출했지만 AI 구조화는 수행하지 못했습니다.',
    extractedAt: new Date().toISOString(),
    needsReview: true,
    warnings: ['Kimi AI 응답을 받지 못해 로컬 fallback 추출 결과를 사용했습니다.'],
    evidence: summary ? [summary.slice(0, 160)] : [],
    issues: ['AI 구조화 미완료'],
    actions: ['AI 키 또는 외부 추출 연동 상태를 확인해 주세요.'],
    rawTextSnippet: summary,
  };
}

async function requestStructuredDocumentExtraction(promptSource: string, documentType: string) {
  const kimiClient = createKimiClient();
  const response = await kimiClient.post('/chat/completions', {
    model: 'kimi-k2.5',
    messages: [
      {
        role: 'system',
        content: [
          '당신은 요양/재가복지 전문가입니다.',
          '반드시 JSON 형식으로만 응답하세요.',
          '문서 원문에 없는 값은 추정하지 말고 null 또는 빈 배열로 남기세요.',
          '반환 JSON에는 가능한 경우 핵심 필드와 함께 shortSummary, warnings 배열을 포함하세요.',
        ].join(' '),
      },
      {
        role: 'user',
        content: [
          `문서 유형: ${documentType}`,
          `추출 목표: ${getDocumentTypePrompt(documentType)}`,
          '',
          '[문서 내용]',
          promptSource,
        ].join('\n'),
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1,
  });

  return JSON.parse(response.data.choices[0].message.content);
}

export const aiService = {
  // 문서 추출 (Extract)
  async extractDocument(documentUrl: string, documentType: string, recipientId?: string) {
    const kimiClient = createKimiClient();
    const prompt = getDocumentTypePrompt(documentType);

    try {
      const response = await kimiClient.post('/chat/completions', {
        model: 'kimi-k2.5',
        messages: [
          {
            role: 'system',
            content: `당신은 요양/재가복지 전문가입니다. 문서에서 요양 관련 정보를 정확하게 추출하세요. JSON 형식으로 응답하세요.`,
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: documentUrl } },
            ],
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.1, // 정확성 우선
      });

      const content = response.data.choices[0].message.content;
      const extracted = JSON.parse(content);

      logger.info({ documentType, fields: Object.keys(extracted) }, 'Document extracted');

      return {
        documentType,
        extractedData: extracted,
        extractedText: null,
        pageCount: null,
        confidence: this.calculateConfidence(extracted),
        model: 'kimi-k2.5',
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      logger.error({ err, documentUrl, documentType }, 'Document extraction failed');
      throw err;
    }
  },

  async extractDocumentFromFile(file: AssistantFileInput, documentType: string, recipientId?: string) {
    const parsedFile = await parseDocumentBuffer(file);
    let extracted;

    try {
      extracted = await requestStructuredDocumentExtraction(parsedFile.promptContext, documentType);
    } catch (err) {
      logger.warn(
        {
          err,
          documentType,
          fileName: file.filename,
          recipientId,
        },
        'Falling back to local document extraction'
      );
      extracted = buildFallbackDocumentExtraction(parsedFile.extractedText || '', documentType);
    }

    logger.info(
      {
        documentType,
        fileName: file.filename,
        recipientId,
        fields: Object.keys(extracted),
      },
      'Document extracted from stored file'
    );

    return {
      documentType,
      extractedData: extracted,
      extractedText: parsedFile.extractedText || null,
      pageCount: parsedFile.meta.pageCount ?? null,
      confidence: this.calculateConfidence(extracted),
      model: 'kimi-k2.5',
      timestamp: new Date().toISOString(),
    };
  },

  // 상담 초안 생성
  async generateConsultationDraft(transcribedText: string) {
    const kimiClient = createKimiClient();
    try {
      const response = await kimiClient.post('/chat/completions', {
        model: 'kimi-k2-0905-preview',
        messages: [
          {
            role: 'system',
            content: `당신은 사회복지사의 상담 기록을 작성하는 전문가입니다. 
음성 기록을 바탕으로 전문적이고 객관적인 상담 일지를 작성하세요.
핵심 내용을 bullet point로 정리하고, 필요시 후속 조치를 제안하세요.`,
          },
          {
            role: 'user',
            content: `다음 음성 기록을 상담 일지 형식으로 정리해주세요:\n\n${transcribedText}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (err) {
      logger.error(err, 'Consultation draft generation failed');
      return buildFallbackConsultationDraft(transcribedText);
    }
  },

  // 케어 기록 기반 상담 초안
  async generateConsultationDraftFromRecords(
    careRecords: any[],
    previousConsultations?: string[],
    subject?: string,
    familyContext?: string
  ) {
    const kimiClient = createKimiClient();
    const recordsContext = careRecords.map(r => 
      `[${r.date}] ${r.content}${r.activities ? ` (활동: ${r.activities.join(', ')})` : ''}`
    ).join('\n');

    const prompt = `다음 케어 기록을 바탕으로 상담 일지 초안을 작성해주세요.

${subject ? `상담 주제: ${subject}` : ''}
${familyContext ? `가족 상황: ${familyContext}` : ''}

[케어 기록]
${recordsContext}

${previousConsultations ? `\n[이전 상담 내역]\n${previousConsultations.join('\n')}` : ''}

다음 JSON 형식으로 응답해주세요:
{
  "subject": "상담 주제",
  "content": "상담 내용 (전문적 작성)",
  "keyPoints": ["핵심 내용 1", "핵심 내용 2"],
  "actionItems": [
    { "task": "후속 조치", "priority": "high/medium/low", "due": "YYYY-MM-DD" }
  ],
  "familyNotes": "가족 관련 특이사항",
  "riskFactors": ["주의사항1"]
}`;

    try {
      const response = await kimiClient.post('/chat/completions', {
        model: 'kimi-k2-0905-preview',
        messages: [
          { role: 'system', content: '당신은 사회복지 전문가입니다.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (err) {
      logger.error(err, 'Consultation draft from records failed');
      throw err;
    }
  },

  async chatWithAssistant(messages: AssistantChatMessage[], context?: AssistantChatContext) {
    const systemPrompt = [
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

    try {
      const result = await createAnthropicResponse(messages, systemPrompt, 0.4);

      logger.info(
        {
          model: result.model,
          usage: result.usage,
        },
        'Anthropic assistant response created'
      );

      return result;
    } catch (err) {
      logger.error({ err }, 'Anthropic assistant chat failed');
      throw err;
    }
  },

  async analyzeFileWithAssistant(file: AssistantFileInput, context?: AssistantChatContext) {
    const parsedFile = await parseAssistantFile(file);
    const requestedPrompt =
      file.prompt?.trim() ||
      (parsedFile.kind === 'spreadsheet'
        ? '이 엑셀의 구조를 요약하고 바로 확인할 항목 3개를 정리해줘.'
        : '이 문서를 요약하고 보완할 점과 다음 액션을 정리해줘.');

    const systemPrompt = [
      '당신은 LIDER의 AI 도우미입니다.',
      '반드시 한국어로 답하세요.',
      parsedFile.kind === 'spreadsheet'
        ? '현재 엑셀 스킬 패키지가 활성화되었습니다. 시트 구조, 주요 패턴, 누락 가능성, 운영상 바로 볼 포인트를 정리하세요.'
        : '현재 문서 스킬 패키지가 활성화되었습니다. 문서 핵심 요약, 빠진 내용, 수정 포인트, 후속 액션을 정리하세요.',
      '답변은 실무자가 바로 사용할 수 있게 짧고 명확하게 정리하세요.',
      '출력 순서는 핵심 요약, 바로 확인할 점, 다음 액션 순으로 유지하세요.',
      '추정이 섞이면 추정이라고 분명히 말하세요.',
      context?.centerName ? `현재 센터명: ${context.centerName}` : null,
      context?.route ? `사용자가 보고 있는 화면 경로: ${context.route}` : null,
      context?.mode ? `현재 사용 맥락: ${context.mode}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const result = await createAnthropicResponse(
        [
          {
            role: 'user',
            content: [
              `사용자 요청:\n${requestedPrompt}`,
              '',
              '[업로드 파일 정보]',
              `파일명: ${parsedFile.meta.name}`,
              `파일 종류: ${parsedFile.kind === 'spreadsheet' ? '엑셀/스프레드시트' : '문서'}`,
              `활성 스킬 패키지: ${parsedFile.meta.skillPackage === 'excel' ? '엑셀 스킬 패키지' : '문서 스킬 패키지'}`,
              '',
              parsedFile.promptContext,
            ].join('\n'),
          },
        ],
        systemPrompt,
        0.2
      );

      logger.info(
        {
          fileName: parsedFile.meta.name,
          fileKind: parsedFile.meta.kind,
          skillPackage: parsedFile.meta.skillPackage,
          model: result.model,
        },
        'Anthropic assistant file analysis created'
      );

      return {
        ...result,
        file: parsedFile.meta,
      };
    } catch (err) {
      logger.error(
        {
          err,
          fileName: file.filename,
          fileKind: parsedFile.kind,
        },
        'Anthropic assistant file analysis failed'
      );
      throw err;
    }
  },

  // 통합 검색 (Vector Search + Hybrid Search)
  async intelligentSearch(
    query: string,
    context?: { recipientId?: string; workerId?: string; centerId?: string },
    filters?: { type?: string; dateRange?: { from?: string; to?: string } }
  ) {
    const startTime = Date.now();
    const hasVectorProvider = !!process.env.VECTOR_DB_PROVIDER;

    // Phase 1: Vector Search (Semantic) - if configured
    if (hasVectorProvider) {
      try {
        const vectorResults = await this.performVectorSearch(query, context, filters);
        return {
          success: true,
          query,
          strategy: 'vector',
          results: vectorResults.hits,
          total: vectorResults.total,
          summary: vectorResults.summary,
          executionTimeMs: Date.now() - startTime,
        };
      } catch (err) {
        logger.warn({ err }, 'Vector search failed, falling back to keyword search');
      }
    }

    // Phase 2: Hybrid Search (Keyword + Partial Vector) - current implementation
    const keywordResults = await this.performKeywordSearch(query, context, filters);

    return {
      success: true,
      query,
      strategy: 'keyword',
      results: keywordResults,
      total: keywordResults.length,
      summary: keywordResults.length > 0
        ? `${keywordResults.length}개의 관련 결과를 찾았습니다`
        : '검색 결과가 없습니다. 다른 키워드를 시도해보세요.',
      executionTimeMs: Date.now() - startTime,
      meta: {
        vectorSearchAvailable: hasVectorProvider,
        filters: filters || null,
        context: context || null,
      },
    };
  },

  // Vector Search placeholder (for Pinecone/Weaviate integration)
  private async performVectorSearch(
    query: string,
    context?: { recipientId?: string; workerId?: string; centerId?: string },
    filters?: { type?: string; dateRange?: { from?: string; to?: string } }
  ): Promise<{ hits: any[]; total: number; summary: string }> {
    const provider = process.env.VECTOR_DB_PROVIDER; // 'pinecone' | 'weaviate' | 'pgvector'
    const embeddingModel = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';

    // Step 1: Generate query embedding
    const queryEmbedding = await this.generateEmbedding(query, embeddingModel);

    // Step 2: Vector similarity search
    let hits: any[] = [];
    switch (provider) {
      case 'pinecone':
        hits = await this.queryPinecone(queryEmbedding, context, filters);
        break;
      case 'weaviate':
        hits = await this.queryWeaviate(queryEmbedding, context, filters);
        break;
      case 'pgvector':
        hits = await this.queryPgVector(queryEmbedding, context, filters);
        break;
      default:
        throw new Error(`Unsupported vector provider: ${provider}`);
    }

    // Step 3: Rerank with cross-encoder (optional)
    const rerankedHits = process.env.ENABLE_RERANK === 'true'
      ? await this.rerankResults(query, hits)
      : hits;

    // Step 4: Generate LLM summary
    const summary = await this.generateSearchSummary(query, rerankedHits);

    return {
      hits: rerankedHits.slice(0, 20),
      total: rerankedHits.length,
      summary,
    };
  },

  // Keyword-based search (current production fallback)
  private async performKeywordSearch(
    query: string,
    context?: { recipientId?: string; workerId?: string; centerId?: string },
    filters?: { type?: string; dateRange?: { from?: string; to?: string } }
  ): Promise<any[]> {
    const prisma = new (await import('@prisma/client')).PrismaClient();
    const searchTerms = query.split(/\s+/).filter(t => t.length >= 2);
    const orConditions = searchTerms.map(term => ({
      OR: [
        { name: { contains: term, mode: 'insensitive' as const } },
        { address: { contains: term, mode: 'insensitive' as const } },
        { phone: { contains: term } },
        { longTermCareId: { contains: term } },
      ],
    }));

    // Search Recipients
    const recipients = await prisma.recipient.findMany({
      where: {
        AND: [
          ...orConditions,
          ...(context?.centerId ? [{ centerId: context.centerId }] : []),
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        careGrade: true,
        _count: {
          select: { records: true, documents: true },
        },
      },
    });

    // Search CareRecords (if recipient context provided)
    let records: any[] = [];
    if (context?.recipientId) {
      records = await prisma.careRecord.findMany({
        where: {
          recipientId: context.recipientId,
          OR: [
            { condition: { contains: query, mode: 'insensitive' } },
            { specialNotes: { contains: query, mode: 'insensitive' } },
          ],
          ...(filters?.dateRange?.from && filters?.dateRange?.to
            ? { recordDate: { gte: new Date(filters.dateRange.from), lte: new Date(filters.dateRange.to) } }
            : {}),
        },
        take: 10,
        orderBy: { recordDate: 'desc' },
        include: {
          recipient: { select: { name: true } },
        },
      });
    }

    await prisma.$disconnect();

    return [
      ...recipients.map(r => ({
        type: 'recipient',
        title: r.name,
        subtitle: `${r.address || '주소 미등록'} | ${r.careGrade || '등급 미정'}`,
        id: r.id,
        meta: { recordCount: r._count.records, documentCount: r._count.documents },
      })),
      ...records.map(r => ({
        type: 'care_record',
        title: `${r.recipient.name} 케어 기록`,
        subtitle: `${r.recordDate.toISOString().slice(0, 10)} | ${r.condition?.slice(0, 30) || ''}`,
        id: r.id,
        meta: { date: r.recordDate, hasPhotos: r.photos.length > 0 },
      })),
    ];
  },

  // Embedding generation (placeholder for OpenAI/Local embedding)
  private async generateEmbedding(text: string, model: string): Promise<number[]> {
    // TODO: Implement actual embedding generation
    // Options: 1) OpenAI API, 2) Local Ollama, 3) HuggingFace Inference
    throw new Error('Embedding generation not yet implemented');
  },

  // Vector DB query implementations (placeholders)
  private async queryPinecone(embedding: number[], context?: any, filters?: any): Promise<any[]> {
    throw new Error('Pinecone integration not yet implemented');
  },
  private async queryWeaviate(embedding: number[], context?: any, filters?: any): Promise<any[]> {
    throw new Error('Weaviate integration not yet implemented');
  },
  private async queryPgVector(embedding: number[], context?: any, filters?: any): Promise<any[]> {
    throw new Error('pgvector integration not yet implemented');
  },

  // Reranking (placeholder)
  private async rerankResults(query: string, hits: any[]): Promise<any[]> {
    // TODO: Implement cross-encoder reranking (Cohere/CrossEncoder)
    return hits;
  },

  // Search summary generation (placeholder)
  private async generateSearchSummary(query: string, hits: any[]): Promise<string> {
    if (hits.length === 0) return '검색 결과가 없습니다.';
    return `${hits.length}개의 결과를 찾았습니다. 주요 내용: ${hits.slice(0, 3).map(h => h.title).join(', ')}`;
  },

  // AI 상태 확인
  async checkStatus() {
    const anthropicApiKey = getAnthropicApiKey();
    const anthropicModel = getAnthropicModel();
    const anthropicClient = createAnthropicClient();
    const kimiApiKey = getKimiApiKey();
    const providers = {
      anthropic: {
        configured: !!anthropicApiKey,
        model: anthropicModel,
      },
      kimi: {
        configured: !!kimiApiKey,
        model: 'kimi-k2.5',
      },
    };

    if (!anthropicApiKey) {
      return {
        status: 'warning',
        provider: 'anthropic',
        apiKeyConfigured: false,
        availableModels: [],
        providers,
      };
    }

    try {
      const startTime = Date.now();
      await anthropicClient.get('/models');

      return {
        status: 'operational',
        provider: 'anthropic',
        responseTime: Date.now() - startTime,
        apiKeyConfigured: true,
        availableModels: [anthropicModel],
        providers,
      };
    } catch (err) {
      return {
        status: 'error',
        provider: 'anthropic',
        apiKeyConfigured: true,
        availableModels: [anthropicModel],
        providers,
        error: (err as Error).message,
      };
    }
  },

  // 신뢰도 계산 (추출 필드 기반)
  calculateConfidence(extracted: any): number {
    const hasFields = Object.values(extracted).filter(v => v !== null && v !== undefined && v !== '').length;
    const totalFields = Object.keys(extracted).length;
    return totalFields > 0 ? Math.round((hasFields / totalFields) * 100) : 0;
  },
};
