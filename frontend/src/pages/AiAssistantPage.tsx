import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Bot, ClipboardList, Loader2, MessageSquare, Paperclip, RefreshCcw, Send, Sparkles, Table2, FileText, X } from 'lucide-react';
import { InlineNotice, MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';

type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type AssistantAttachmentKind = 'spreadsheet' | 'document';

type AssistantAttachment = {
  file: File;
  kind: AssistantAttachmentKind;
};

type AssistantServiceStatus = {
  status: 'operational' | 'warning' | 'error';
  activeModel: string | null;
  upstreamMode: 'direct' | 'proxy' | 'unavailable';
  proxyConfigured: boolean;
  message: string;
  lastCheckedAt: string | null;
};

type AssistantApiResult = {
  model?: string;
  upstream?: {
    mode?: 'direct' | 'proxy';
  };
};

const STATUS_REFRESH_INTERVAL_MS = 90_000;
const STATUS_MIN_FETCH_INTERVAL_MS = 45_000;

const suggestedPrompts = [
  '오늘 알림 우선순위를 3개만 먼저 정리해줘.',
  '문서 보완이 밀린 대상자를 점검 순서로 나눠줘.',
  '상담 후속 문장을 더 차분하고 짧게 다듬어줘.',
  '현장 기록에서 빠지기 쉬운 체크포인트를 알려줘.',
];

function detectAttachmentKind(file: File): AssistantAttachmentKind | null {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
    return 'spreadsheet';
  }

  if (fileName.endsWith('.docx') || fileName.endsWith('.txt') || fileName.endsWith('.md')) {
    return 'document';
  }

  return null;
}

function buildUserMessageContent(prompt: string, attachment: AssistantAttachment | null) {
  if (!attachment) {
    return prompt;
  }

  const defaultPrompt =
    attachment.kind === 'spreadsheet'
      ? '첨부한 엑셀 파일을 분석해줘.'
      : '첨부한 문서를 분석해줘.';

  const resolvedPrompt = prompt || defaultPrompt;
  return `[첨부 파일: ${attachment.file.name}]\n${resolvedPrompt}`;
}

function formatAssistantModel(model: string | null) {
  if (!model) {
    return '확인 중';
  }

  return model === 'claude-sonnet-4-6' ? 'Sonnet 4.6' : model;
}

function getAssistantPathLabel(status: AssistantServiceStatus | null) {
  if (!status) {
    return '상태 확인 중';
  }

  if (status.upstreamMode === 'direct') {
    return '직접 Anthropic';
  }

  if (status.upstreamMode === 'proxy') {
    return '프록시 fallback';
  }

  return '연결 점검 필요';
}

function getAssistantPathBadge(status: AssistantServiceStatus | null) {
  if (!status) {
    return { label: '상태 확인 중', variant: 'processing' as const };
  }

  if (status.upstreamMode === 'direct') {
    return { label: '직접 Anthropic', variant: 'success' as const };
  }

  if (status.upstreamMode === 'proxy') {
    return { label: '프록시 fallback', variant: 'warning' as const };
  }

  return { label: '연결 점검 필요', variant: 'error' as const };
}

function getAssistantHealthLabel(status: AssistantServiceStatus | null) {
  if (!status) {
    return '확인 중';
  }

  if (status.status === 'operational') {
    return '정상';
  }

  if (status.status === 'warning') {
    return '주의';
  }

  return '오류';
}

function formatLastCheckedAt(timestamp: string | null) {
  if (!timestamp) {
    return '최근 확인 없음';
  }

  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) {
    return '최근 확인 없음';
  }

  return `${parsed.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })} 기준`;
}

function readAssistantStatus(data: any): AssistantServiceStatus {
  return {
    status:
      data?.status === 'operational' || data?.status === 'warning'
        ? data.status
        : 'error',
    activeModel: typeof data?.activeModel === 'string' ? data.activeModel : null,
    upstreamMode:
      data?.upstreamMode === 'direct' || data?.upstreamMode === 'proxy'
        ? data.upstreamMode
        : 'unavailable',
    proxyConfigured: Boolean(data?.proxyConfigured),
    message:
      typeof data?.message === 'string' && data.message
        ? data.message
        : 'AI 연결 상태를 아직 확인하지 못했습니다.',
    lastCheckedAt: typeof data?.lastCheckedAt === 'string' ? data.lastCheckedAt : null,
  };
}

function deriveAssistantStatusFromResult(result: AssistantApiResult | null | undefined): AssistantServiceStatus | null {
  const upstreamMode =
    result?.upstream?.mode === 'direct' || result?.upstream?.mode === 'proxy'
      ? result.upstream.mode
      : null;

  if (!upstreamMode) {
    return null;
  }

  return {
    status: upstreamMode === 'direct' ? 'operational' : 'warning',
    activeModel: typeof result?.model === 'string' ? result.model : null,
    upstreamMode,
    proxyConfigured: upstreamMode === 'proxy',
    message:
      upstreamMode === 'direct'
        ? '최근 요청이 직접 Anthropic 경로에서 성공했습니다.'
        : '직접 경로를 최근 확인하지 못해 Railway fallback 준비 경로로 처리했습니다.',
    lastCheckedAt: new Date().toISOString(),
  };
}

export function AiAssistantPage() {
  const apiBaseUrl = useMemo(() => resolveSameOriginAwareApiBaseUrl(), []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastStatusLoadAtRef = useRef(0);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'assistant-welcome',
      role: 'assistant',
      content:
        '센터 운영, 문서 보완, 상담 후속, 현장 기록 정리를 도와드릴게요. 지금 막히는 일을 한 문장으로 적어 주세요.',
    },
  ]);
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState<AssistantAttachment | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(true);
  const [assistantStatus, setAssistantStatus] = useState<AssistantServiceStatus | null>(null);
  const [notice, setNotice] = useState<{ title: string; message: string; tone: 'info' | 'error' | 'success' } | null>(null);

  const loadAssistantStatus = async ({ silent = false, force = false }: { silent?: boolean; force?: boolean } = {}) => {
    if (!force && Date.now() - lastStatusLoadAtRef.current < STATUS_MIN_FETCH_INTERVAL_MS) {
      return;
    }

    if (!silent) {
      setIsStatusLoading(true);
    }

    try {
      lastStatusLoadAtRef.current = Date.now();
      const response = await fetch(`${apiBaseUrl}/v1/ai/status`, {
        headers: {
          Accept: 'application/json',
        },
      });
      const payload = await response.json().catch(() => null);
      const data = payload?.data;
      if (!response.ok || !payload?.success || !data) {
        throw new Error(payload?.error?.message || 'AI 연결 상태를 불러오지 못했습니다.');
      }

      setAssistantStatus(readAssistantStatus(data));
    } catch {
      setAssistantStatus({
        status: 'error',
        activeModel: null,
        upstreamMode: 'unavailable',
        proxyConfigured: false,
        message: 'AI 연결 상태 조회에 실패했습니다. 잠시 후 다시 확인해 주세요.',
        lastCheckedAt: null,
      });
    } finally {
      setIsStatusLoading(false);
    }
  };

  useEffect(() => {
    void loadAssistantStatus({ force: true });
    const intervalId = window.setInterval(() => {
      void loadAssistantStatus({ silent: true, force: true });
    }, STATUS_REFRESH_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void loadAssistantStatus({ silent: true });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [apiBaseUrl]);

  const clearAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'assistant-welcome',
        role: 'assistant',
        content:
          '대화를 새로 시작했습니다. 지금 필요한 운영 질문이나 문장 다듬기 요청을 보내 주세요.',
      },
    ]);
    setInput('');
    clearAttachment();
    setNotice({
      title: '대화 초기화 완료',
      message: '이전 맥락을 비우고 새 질문부터 다시 받을 준비가 됐습니다.',
      tone: 'success',
    });
  };

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (!nextFile) {
      return;
    }

    const nextKind = detectAttachmentKind(nextFile);
    if (!nextKind) {
      clearAttachment();
      setNotice({
        title: '지원 형식 확인 필요',
        message: '엑셀은 XLSX/XLS/CSV, 문서는 DOCX/TXT/MD 파일만 첨부할 수 있습니다.',
        tone: 'error',
      });
      return;
    }

    setAttachment({ file: nextFile, kind: nextKind });
    setNotice({
      title: nextKind === 'spreadsheet' ? '엑셀 스킬 패키지 준비 완료' : '문서 스킬 패키지 준비 완료',
      message: `${nextFile.name} 파일을 Claude 도우미 분석 대상으로 올렸습니다.`,
      tone: 'info',
    });
  };

  const sendMessage = async (rawText?: string) => {
    const nextText = (rawText ?? input).trim();
    const activeAttachment = attachment;

    if ((!nextText && !activeAttachment) || isSending) {
      return;
    }

    const nextUserMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: buildUserMessageContent(nextText, activeAttachment),
    };

    const nextConversation = [...messages, nextUserMessage];
    setMessages(nextConversation);
    setInput('');
    setIsSending(true);
    setNotice(null);

    try {
      const response = activeAttachment
        ? await fetch(`${apiBaseUrl}/v1/ai/analyze-file`, {
            method: 'POST',
            body: (() => {
              const formData = new FormData();
              formData.append('file', activeAttachment.file);
              if (nextText) {
                formData.append('prompt', nextText);
              }
              formData.append('route', '/assistant');
              formData.append('centerName', 'LIDER');
              formData.append('mode', activeAttachment.kind === 'spreadsheet' ? 'excel-skill-package' : 'document-skill-package');
              return formData;
            })(),
          })
        : await fetch(`${apiBaseUrl}/v1/ai/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              messages: nextConversation.map((message) => ({
                role: message.role,
                content: message.content,
              })),
              context: {
                route: '/assistant',
                centerName: 'LIDER',
                mode: 'operations-chat',
              },
            }),
          });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success || !payload?.data?.reply) {
        const message =
          payload?.error?.message ||
          payload?.message ||
          'AI 도우미 응답을 가져오지 못했습니다. 백엔드와 API 키 설정을 확인해 주세요.';
        throw new Error(message);
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: payload.data.reply,
        },
      ]);

      const nextStatus = deriveAssistantStatusFromResult(payload.data);
      if (nextStatus) {
        setAssistantStatus(nextStatus);
      }

      if (activeAttachment) {
        clearAttachment();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'AI 도우미 응답 요청에 실패했습니다.';
      setNotice({
        title: 'AI 도우미 연결 실패',
        message,
        tone: 'error',
      });
      void loadAssistantStatus({ silent: true, force: true });
    } finally {
      setIsSending(false);
    }
  };

  const assistantPathBadge = getAssistantPathBadge(assistantStatus);
  const shouldShowStatusNotice =
    assistantStatus !== null &&
    (assistantStatus.upstreamMode === 'proxy' || assistantStatus.status !== 'operational');

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="AI Helper"
        title="AI 도우미 채팅"
        description="센터 운영 질문뿐 아니라 엑셀 스킬 패키지와 문서 스킬 패키지까지 Claude 기반 도우미에 함께 연결했습니다."
        icon={Bot}
        badge={{ label: 'Claude + File Skills', variant: 'processing' }}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label="운영 지원 채팅" variant="info" dot={false} />
            <StatusBadge
              label={assistantPathBadge.label}
              variant={assistantPathBadge.variant}
              dot={false}
            />
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] transition hover:bg-[var(--surface-soft)]"
            >
              <RefreshCcw className="h-4 w-4" />
              새 대화
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricTile
          label="연결 모델"
          value={formatAssistantModel(assistantStatus?.activeModel ?? null)}
          meta={isStatusLoading ? 'AI 연결 상태 확인 중' : 'Anthropic Claude Sonnet 4.6'}
          icon={Sparkles}
          tone="violet"
        />
        <MetricTile
          label="연결 경로"
          value={getAssistantPathLabel(assistantStatus)}
          meta={
            isStatusLoading
              ? '실제 공개 경로를 점검하는 중'
              : `${formatLastCheckedAt(assistantStatus?.lastCheckedAt ?? null)}`
          }
          icon={ClipboardList}
          tone="sky"
        />
        <MetricTile
          label="응답 상태"
          value={getAssistantHealthLabel(assistantStatus)}
          meta={assistantStatus?.message || '짧고 실행 가능한 실무형 답변'}
          icon={MessageSquare}
          tone="emerald"
        />
      </div>

      {notice && <InlineNotice title={notice.title} message={notice.message} tone={notice.tone} />}
      {shouldShowStatusNotice && (
        <InlineNotice
          title={assistantStatus.upstreamMode === 'proxy' ? '프록시 fallback 운영 중' : 'AI 연결 점검 필요'}
          message={assistantStatus.message}
          tone={assistantStatus.upstreamMode === 'proxy' ? 'warning' : 'error'}
        />
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <SectionCard
          title="대화 워크스페이스"
          description="현재 운영 맥락을 기준으로 질문을 이어서 던질 수 있습니다."
          icon={MessageSquare}
          className="min-h-[620px]"
          contentClassName="flex h-full min-h-[500px] flex-col"
        >
          <div className="flex-1 space-y-3 rounded-[28px] border border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.76)] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[92%] rounded-[24px] px-4 py-3 text-sm leading-7 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-[var(--brand-900)] text-white'
                      : 'border border-[rgba(71,96,83,0.12)] bg-white text-[color:var(--text-primary)]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-[24px] border border-[rgba(71,96,83,0.12)] bg-white px-4 py-3 text-sm text-[color:var(--text-muted)] shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  답변을 정리하는 중입니다.
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 border-t border-[color:var(--border-subtle)] pt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv,.docx,.txt,.md"
              onChange={handleAttachmentChange}
              className="hidden"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-white px-4 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] transition hover:bg-[var(--surface-soft)]"
              >
                <Paperclip className="h-4 w-4" />
                파일 첨부
              </button>
              <span className="text-xs text-[color:var(--text-muted)]">XLSX · XLS · CSV · DOCX · TXT · MD</span>
            </div>

            {attachment && (
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[color:var(--text-primary)]">
                  {attachment.kind === 'spreadsheet' ? <Table2 className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                  {attachment.kind === 'spreadsheet' ? '엑셀 스킬 패키지' : '문서 스킬 패키지'}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-[color:var(--text-primary)]">{attachment.file.name}</span>
                <button
                  type="button"
                  onClick={clearAttachment}
                  className="rounded-full p-1 text-[color:var(--text-muted)] transition hover:bg-white hover:text-[color:var(--text-primary)]"
                  aria-label="첨부 파일 제거"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              placeholder="예: 오늘 문서 보완 우선순위를 센터장 보고용 문장으로 정리해줘."
              className="focus-ring min-h-[120px] w-full rounded-[24px] border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[color:var(--text-muted)]">
                `Shift + Enter` 줄바꿈, `Enter` 전송, 파일만 올리고 바로 분석 요청도 가능합니다.
              </p>
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={isSending || (!input.trim() && !attachment)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--action-600)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--action-700)] disabled:cursor-not-allowed disabled:bg-[rgba(39,53,45,0.16)]"
              >
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                질문 보내기
              </button>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="빠른 질문"
            description="실무에서 바로 던지기 좋은 질문을 준비해 두었습니다."
            icon={Sparkles}
            variant="accent"
          >
            <div className="grid gap-3">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={isSending}
                  className="rounded-2xl border border-[rgba(71,96,83,0.12)] bg-[rgba(255,253,250,0.88)] px-4 py-3 text-left text-sm font-medium text-[color:var(--text-primary)] transition hover:border-[color:var(--border-strong)] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="스킬 패키지"
            description="Claude 도우미에 같이 묶은 파일 작업 범위입니다."
            icon={ClipboardList}
          >
            <div className="space-y-3 text-sm text-[color:var(--text-primary)]">
              <div className="rounded-2xl border border-[color:var(--border-accent)] bg-[var(--action-100)] px-4 py-3">
                엑셀 스킬 패키지: 시트 구조, 헤더, 미리보기 행을 읽고 이상값 의심 구간과 우선 확인 포인트를 정리합니다.
              </div>
              <div className="rounded-2xl border border-[rgba(71,96,83,0.12)] bg-[var(--surface-strong)] px-4 py-3">
                문서 스킬 패키지: DOCX, TXT, MD 본문을 추출해 요약, 누락 포인트, 후속 액션을 바로 적어줍니다.
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="도우미 사용 기준"
            description="실무 답변이 더 정확해지도록 현재 버전에 맞는 사용 범위를 분리했습니다."
            icon={ClipboardList}
          >
            <div className="space-y-3 text-sm text-[color:var(--text-primary)]">
              <div className="rounded-2xl border border-[color:var(--border-accent)] bg-[var(--action-100)] px-4 py-3">
                문장 다듬기, 알림 우선순위 정리, 상담 후속 액션 분리는 가장 잘 도와줍니다.
              </div>
              <div className="rounded-2xl border border-[rgba(71,96,83,0.12)] bg-[var(--surface-strong)] px-4 py-3">
                실제 환자 진단이나 법적 확정 해석은 하지 않고, 확인이 필요한 실무 포인트로 안내합니다.
              </div>
              <div className="rounded-2xl border border-transparent bg-[var(--warning-100)] px-4 py-3 text-[color:var(--warning-600)]">
                공개 배포본에서는 같은 주소의 `/v1/ai/status` 결과를 기준으로 직접 Anthropic 연결인지, 프록시 fallback인지, 점검이 필요한 상태인지 바로 확인할 수 있습니다.
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
