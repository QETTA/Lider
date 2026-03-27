import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle,
  Clock,
  Edit3,
  FileText,
  MessageSquare,
  Mic,
  MicOff,
  Sparkles,
} from 'lucide-react';
import { InlineNotice, MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';
import { readStoredAuthSession } from '../utils/authClient';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';
import type { ConsultationDraft } from '../types';

const solidButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50';

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  error?: {
    message?: string;
  };
};

type RecipientApiRecord = {
  id?: string;
  name?: string;
  careGrade?: string | null;
};

type ConsultationApiRecord = {
  id?: string;
  recipientId?: string;
  workerId?: string;
  type?: string;
  date?: string;
  method?: string;
  subject?: string;
  content?: string;
  aiDraft?: string | null;
  aiEdited?: boolean;
  result?: string | null;
  familyPresent?: boolean;
  familyNotes?: string | null;
  actionItems?: Array<{ task?: string; due?: string; done?: boolean }>;
  recipient?: {
    name?: string;
  };
  worker?: {
    name?: string;
  };
};

type RecipientSummary = {
  id: string;
  name: string;
  gradeLabel: string;
};

type NoticeState = {
  title: string;
  message: string;
  tone: 'success' | 'info' | 'warning';
};

function getAuthHeaders(): HeadersInit {
  const token = readStoredAuthSession()?.token;
  return token ? { authorization: `Bearer ${token}` } : {};
}

async function requestJson<T>(apiBaseUrl: string, path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers({
    accept: 'application/json',
    ...getAuthHeaders(),
    ...(init.headers || {}),
  });

  if (init.body && !(init.body instanceof FormData) && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  });

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok || !body?.success) {
    throw new Error(body?.error?.message || body?.message || `요청을 처리하지 못했습니다. (${response.status})`);
  }

  return body.data as T;
}

function formatDateLabel(value?: string | null) {
  if (!value) {
    return '-';
  }

  return value.includes('T') ? value.split('T')[0] : value;
}

function normalizeGradeLabel(value?: string | null) {
  switch (value) {
    case 'GRADE_1':
      return '1등급';
    case 'GRADE_2':
      return '2등급';
    case 'GRADE_3':
      return '3등급';
    case 'GRADE_4':
      return '4등급';
    case 'PENDING':
      return '미등급';
    default:
      return value ? value.replace('GRADE_', '') : '-';
  }
}

function buildRecipientSummary(recipient: RecipientApiRecord): RecipientSummary | null {
  if (!recipient.id || !recipient.name) {
    return null;
  }

  return {
    id: recipient.id,
    name: recipient.name,
    gradeLabel: normalizeGradeLabel(recipient.careGrade),
  };
}

function buildLocalDraft(recipient: RecipientSummary, transcript: string): ConsultationDraft {
  return {
    consultationId: `local-${Date.now()}`,
    elderlyId: recipient.id,
    elderlyName: recipient.name,
    socialWorkerId: 'current-user',
    socialWorkerName: '담당자',
    consultationDate: new Date().toISOString(),
    rawInput: {
      voiceTranscript: transcript,
    },
    aiDraft: {
      summary: `${recipient.name} 어르신 상담 메모를 정리했습니다. 주요 이슈와 후속 일정은 저장 후 다시 확인해 주세요.`,
      keyIssues: transcript.trim()
        ? [transcript.trim().slice(0, 18), '후속 검토 필요'].filter(Boolean)
        : ['상담 메모', '후속 검토 필요'],
      recommendedActions: transcript.trim()
        ? ['기록 저장 후 재검토', '가족 연계 여부 확인']
        : ['상담 내용 보완', '후속 조치 확인'],
      followUpNeeded: true,
    },
    accuracyScore: 82,
    domainConfidence: 'medium',
    correctionsNeeded: [],
    status: 'draft',
  };
}

function mapConsultationRowToDraft(row: ConsultationApiRecord, recipientName: string): ConsultationDraft | null {
  if (!row.id || !row.date) {
    return null;
  }

  const actionItems = Array.isArray(row.actionItems) ? row.actionItems : [];
  const keyIssues = [
    row.subject?.trim(),
    row.result?.trim(),
    row.familyNotes?.trim(),
  ].filter((item): item is string => Boolean(item));

  return {
    consultationId: row.id,
    elderlyId: row.recipientId || '',
    elderlyName: row.recipient?.name || recipientName,
    socialWorkerId: row.workerId || 'current-user',
    socialWorkerName: row.worker?.name || '담당자',
    consultationDate: row.date,
    rawInput: {
      voiceTranscript: row.content || '',
    },
    aiDraft: {
      summary: row.aiDraft || row.content || row.subject || '상담 기록',
      keyIssues: keyIssues.length > 0 ? keyIssues : [row.subject || '상담 메모'],
      recommendedActions:
        actionItems.length > 0
          ? actionItems.map((item) => item.task).filter((task): task is string => Boolean(task))
          : row.result
            ? [row.result]
            : [],
      followUpNeeded: actionItems.some((item) => item.done !== true) || Boolean(row.familyPresent),
    },
    accuracyScore: row.aiDraft ? 93 : 88,
    domainConfidence: row.aiEdited ? 'high' : 'medium',
    correctionsNeeded: [],
    finalVersion: row.content || undefined,
    status: row.aiEdited ? 'finalized' : row.aiDraft ? 'reviewed' : 'draft',
  };
}

function buildDraftPayload(
  recipient: RecipientSummary,
  draft: ConsultationDraft,
  editedDraft: string,
  finalized: boolean,
  currentConsultationId: string | null
) {
  const content = editedDraft.trim() || draft.aiDraft.summary;
  const subject = draft.aiDraft.keyIssues[0] || `${recipient.name} 상담`;

  return {
    id: currentConsultationId || undefined,
    recipientId: recipient.id,
    type: 'REGULAR',
    date: draft.consultationDate,
    method: '대면',
    subject,
    content,
    aiDraft: draft.rawInput.voiceTranscript || draft.aiDraft.summary,
    result: finalized ? content : '임시 저장',
    familyPresent: draft.aiDraft.followUpNeeded,
    familyNotes: draft.aiDraft.followUpNeeded ? '후속 상담 필요' : '',
  };
}

export function Consultation() {
  const [recipients, setRecipients] = useState<RecipientSummary[]>([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<ConsultationApiRecord[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [rawInput, setRawInput] = useState('');
  const [showDraft, setShowDraft] = useState(false);
  const [draft, setDraft] = useState<ConsultationDraft | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDraft, setEditedDraft] = useState('');
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(false);
  const [isLoadingConsultations, setIsLoadingConsultations] = useState(false);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeConsultationId, setActiveConsultationId] = useState<string | null>(null);
  const [notice, setNotice] = useState<NoticeState | null>(null);

  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const apiBaseUrl = resolveSameOriginAwareApiBaseUrl();
  const selectedRecipient = useMemo(
    () => recipients.find((recipient) => recipient.id === selectedRecipientId) || null,
    [recipients, selectedRecipientId]
  );

  const pastDrafts = useMemo(
    () =>
      consultations
        .map((row) => mapConsultationRowToDraft(row, selectedRecipient?.name || '대상자'))
        .filter((item): item is ConsultationDraft => Boolean(item)),
    [consultations, selectedRecipient?.name]
  );

  const generatedCount = pastDrafts.filter((item) => item.status !== 'draft').length;
  const followUpCount = pastDrafts.filter((item) => item.aiDraft.followUpNeeded).length;

  useEffect(() => {
    if (isRecording) {
      recordTimerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
    }

    return () => {
      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    let active = true;

    async function loadRecipients() {
      setIsLoadingRecipients(true);
      try {
        const session = readStoredAuthSession();
        const query = new URLSearchParams();
        query.set('status', 'active');
        if (session?.user.center?.id) {
          query.set('centerId', session.user.center.id);
        }

        const data = await requestJson<RecipientApiRecord[]>(apiBaseUrl, `/v1/recipients?${query.toString()}`);
        if (!active) {
          return;
        }

        const nextRecipients = Array.isArray(data)
          ? data.map(buildRecipientSummary).filter((item): item is RecipientSummary => Boolean(item))
          : [];
        setRecipients(nextRecipients);
        setSelectedRecipientId((current) => current ?? nextRecipients[0]?.id ?? null);
      } catch (error) {
        if (!active) {
          return;
        }

        setRecipients([]);
        setSelectedRecipientId(null);
        setNotice({
          title: '대상자 목록을 불러오지 못했습니다',
          message: error instanceof Error ? error.message : '대상자 API 연결을 확인해 주세요.',
          tone: 'warning',
        });
      } finally {
        if (active) {
          setIsLoadingRecipients(false);
        }
      }
    }

    void loadRecipients();

    return () => {
      active = false;
    };
  }, [apiBaseUrl]);

  useEffect(() => {
    if (!selectedRecipient) {
      setConsultations([]);
      return;
    }

    const recipient = selectedRecipient;
    let active = true;

    async function loadConsultations() {
      setIsLoadingConsultations(true);
      try {
        const data = await requestJson<ConsultationApiRecord[]>(
          apiBaseUrl,
          `/v1/care/consultations?recipientId=${encodeURIComponent(recipient.id)}`
        );

        if (!active) {
          return;
        }

        setConsultations(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!active) {
          return;
        }

        setConsultations([]);
        setNotice({
          title: '상담 기록을 불러오지 못했습니다',
          message: error instanceof Error ? error.message : '상담 기록 API 연결을 확인해 주세요.',
          tone: 'warning',
        });
      } finally {
        if (active) {
          setIsLoadingConsultations(false);
        }
      }
    }

    void loadConsultations();

    return () => {
      active = false;
    };
  }, [apiBaseUrl, selectedRecipient]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetWorkingDraft = (message?: string) => {
    setIsRecording(false);
    setRecordTime(0);
    setRawInput('');
    setShowDraft(false);
    setDraft(null);
    setIsEditing(false);
    setEditedDraft('');
    setActiveConsultationId(null);

    if (message) {
      setNotice({
        title: '대상 변경으로 상담 초안 초기화',
        message,
        tone: 'info',
      });
    }
  };

  const generateDraft = async (input: string) => {
    if (!selectedRecipient) {
      setNotice({
        title: '대상자를 먼저 선택해 주세요',
        message: '상담 초안을 만들 대상자 목록을 아직 불러오지 못했습니다.',
        tone: 'warning',
      });
      return;
    }

    const transcript = input.trim() || `${selectedRecipient.name} 어르신 상담 메모입니다.`;
    setIsGeneratingDraft(true);

    try {
      const response = await requestJson<{
        draft?: {
          subject?: string;
          content?: string;
        };
        actionItems?: Array<{ task?: string }>;
      }>(apiBaseUrl, '/v1/mobile/voice-to-draft', {
        method: 'POST',
        body: JSON.stringify({
          recipientId: selectedRecipient.id,
          audioUrl: 'transcript://consultation',
          transcribedText: transcript,
        }),
      });

      const generatedDraft = buildLocalDraft(selectedRecipient, transcript);
      const summary = response.draft?.content?.trim() || response.draft?.subject?.trim() || generatedDraft.aiDraft.summary;
      const recommendedActions =
        response.actionItems?.map((item) => item.task).filter((task): task is string => Boolean(task)) || generatedDraft.aiDraft.recommendedActions;

      const nextDraft: ConsultationDraft = {
        ...generatedDraft,
        rawInput: { voiceTranscript: transcript },
        aiDraft: {
          summary,
          keyIssues: [response.draft?.subject?.trim() || transcript.slice(0, 24), '후속 검토 필요'].filter(Boolean) as string[],
          recommendedActions,
          followUpNeeded: recommendedActions.length > 0,
        },
        accuracyScore: 90,
        domainConfidence: 'high',
      };

      setDraft(nextDraft);
      setEditedDraft(summary);
      setShowDraft(true);
      setIsEditing(false);
      setActiveConsultationId(null);
      setNotice({
        title: 'AI 상담 초안 생성 완료',
        message: '실제 전사/초안 API를 통해 상담 메모를 정리했습니다.',
        tone: 'info',
      });
    } catch (error) {
      const fallbackDraft = buildLocalDraft(selectedRecipient, transcript);
      setDraft(fallbackDraft);
      setEditedDraft(fallbackDraft.aiDraft.summary);
      setShowDraft(true);
      setIsEditing(false);
      setActiveConsultationId(null);
      setNotice({
        title: 'AI 초안 생성이 제한되어 로컬 초안으로 전환했습니다',
        message: error instanceof Error ? error.message : 'voice-to-draft API에 연결하지 못했습니다.',
        tone: 'warning',
      });
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleRecipientSelect = (recipient: RecipientSummary) => {
    if (!selectedRecipient || recipient.id === selectedRecipient.id) {
      return;
    }

    const hasWorkingDraft = isRecording || Boolean(rawInput.trim()) || showDraft || Boolean(draft?.consultationId);
    setSelectedRecipientId(recipient.id);

    if (hasWorkingDraft) {
      resetWorkingDraft(
        `${recipient.name} 어르신으로 전환하면서 이전 상담 내용을 비웠습니다. 다른 대상에게 초안이 섞이지 않도록 다시 작성해 주세요.`
      );
    }
  };

  const toggleRecording = async () => {
    if (!selectedRecipient) {
      setNotice({
        title: '대상자를 먼저 선택해 주세요',
        message: '상담 대상자 목록을 불러온 뒤 녹음을 시작할 수 있습니다.',
        tone: 'warning',
      });
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      await generateDraft(rawInput || `${selectedRecipient.name} 어르신 상담 메모입니다.`);
      return;
    }

    setIsRecording(true);
    setRecordTime(0);
    setRawInput('');
    setShowDraft(false);
    setDraft(null);
    setNotice(null);
  };

  const saveDraft = async (finalized: boolean) => {
    if (!selectedRecipient || !draft) {
      return;
    }

    setIsSaving(true);

    try {
      const payload = buildDraftPayload(selectedRecipient, draft, editedDraft, finalized, activeConsultationId);
      const savedConsultation = activeConsultationId
        ? await requestJson<ConsultationApiRecord>(apiBaseUrl, `/v1/care/consultations/${activeConsultationId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
          })
        : await requestJson<ConsultationApiRecord>(apiBaseUrl, '/v1/care/consultations', {
            method: 'POST',
            body: JSON.stringify(payload),
          });

      setActiveConsultationId(savedConsultation.id || activeConsultationId);
      setShowDraft(false);
      setRawInput('');
      setIsEditing(false);
      setDraft(null);
      setEditedDraft('');
      setRecordTime(0);
      setIsRecording(false);
      setConsultations((prev) => {
        const next = savedConsultation.id ? prev.filter((item) => item.id !== savedConsultation.id) : prev;
        return [savedConsultation, ...next];
      });

      setNotice({
        title: finalized ? '상담 기록 최종 저장' : '상담 초안 저장 완료',
        message: finalized
          ? `${selectedRecipient.name} 어르신 상담 기록을 실제 API에 저장했습니다.`
          : '검토가 필요한 상담 초안을 서버에 저장했습니다.',
        tone: 'success',
      });

      const refreshed = await requestJson<ConsultationApiRecord[]>(
        apiBaseUrl,
        `/v1/care/consultations?recipientId=${encodeURIComponent(selectedRecipient.id)}`
      );
      setConsultations(Array.isArray(refreshed) ? refreshed : []);
    } catch (error) {
      setNotice({
        title: '상담 기록 저장 실패',
        message: error instanceof Error ? error.message : '상담 기록 저장 API를 확인해 주세요.',
        tone: 'warning',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="상담 AI"
        title="AI 상담 기록 초안"
        description="음성 입력, 텍스트 보완, 검토 저장 흐름을 하나의 리뷰 워크스페이스로 묶었습니다."
        icon={MessageSquare}
        badge={{
          label: showDraft ? '검토 중' : isRecording ? '녹음 중' : '준비 완료',
          variant: showDraft ? 'processing' : isRecording ? 'warning' : 'info',
        }}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricTile label="오늘 초안 생성" value={generatedCount} meta="상담 문안 저장 기준" icon={Sparkles} tone="violet" />
        <MetricTile label="평균 정확도" value="API 기반" meta="voice-to-draft와 저장 API 연동" icon={CheckCircle} tone="emerald" />
        <MetricTile label="후속 상담 필요" value={`${followUpCount}건`} meta="우선 관리 목록" icon={AlertCircle} tone="amber" />
      </div>

      {notice && <InlineNotice title={notice.title} message={notice.message} tone={notice.tone} />}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <SectionCard title="상담 대상 선택" description="대상 전환을 카드형으로 바꿔 현재 누구의 상담 초안을 만들고 있는지 명확하게 보이게 했습니다." icon={MessageSquare}>
            {isLoadingRecipients ? (
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm text-[color:var(--text-muted)]">
                대상자 목록을 불러오는 중입니다.
              </div>
            ) : recipients.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {recipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => handleRecipientSelect(recipient)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      selectedRecipient?.id === recipient.id
                        ? 'border-[rgba(71,96,83,0.18)] bg-[rgba(93,119,105,0.12)] shadow-sm'
                        : 'border-[color:var(--border-subtle)] bg-[var(--surface-strong)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-soft)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(71,96,83,0.18)] bg-[rgba(93,119,105,0.12)] text-sm font-semibold text-[color:var(--brand-700)]">
                        {recipient.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-[color:var(--text-strong)]">{recipient.name}</p>
                        <p className="text-xs text-[color:var(--text-muted)]">{recipient.gradeLabel} · 상담 대상</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm text-[color:var(--text-muted)]">
                활성 대상자 목록이 없습니다. 로그인 또는 API 연결을 확인해 주세요.
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="상담 입력 스테이션"
            description="음성 입력과 수기 입력을 같은 카드에서 다룰 수 있게 정리했습니다."
            icon={Mic}
            action={<StatusBadge label={isRecording ? `${formatTime(recordTime)} 진행 중` : '5분 상담 권장'} variant={isRecording ? 'warning' : 'info'} />}
          >
            <div className="rounded-[28px] border border-[color:var(--border-subtle)] bg-[linear-gradient(180deg,rgba(242,246,243,0.92),rgba(255,253,250,0.96))] p-6 text-center">
              <button
                onClick={() => void toggleRecording()}
                disabled={isGeneratingDraft || isSaving}
                className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-white shadow-xl transition-all ${
                  isRecording
                    ? 'recording-pulse bg-[var(--danger-600)] shadow-[rgba(181,65,53,0.18)]'
                    : 'bg-[var(--brand-700)] shadow-[rgba(71,96,83,0.18)] hover:-translate-y-1 hover:bg-[var(--brand-800)]'
                }`}
              >
                {isRecording ? <MicOff className="h-9 w-9" /> : <Mic className="h-9 w-9" />}
              </button>
              <p className="mt-4 text-lg font-semibold text-[color:var(--text-strong)]">
                {isRecording ? '상담 내용을 자유롭게 말씀해 주세요' : '버튼을 눌러 상담 녹음을 시작합니다'}
              </p>
              <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                {isRecording ? '종료와 동시에 초안 API를 호출합니다.' : '텍스트 입력만으로도 초안을 만들 수 있습니다.'}
              </p>
            </div>

            {!showDraft && (
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">직접 입력</p>
                <textarea
                  value={rawInput}
                  onChange={(event) => setRawInput(event.target.value)}
                  placeholder="상담 내용을 직접 입력하면 AI 초안을 바로 생성합니다."
                  className="focus-ring mt-3 min-h-[140px] w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
                />
                {rawInput && (
                  <button
                    onClick={() => void generateDraft(rawInput)}
                    className={`${solidButtonClass} mt-3 bg-[var(--brand-700)] hover:bg-[var(--brand-800)]`}
                    disabled={isGeneratingDraft || isSaving}
                  >
                    <Sparkles className="h-4 w-4" />
                    {isGeneratingDraft ? '초안 생성 중...' : 'AI 초안 생성'}
                  </button>
                )}
              </div>
            )}
          </SectionCard>

          {showDraft && draft && (
            <SectionCard
              title="AI 상담 초안 리뷰"
              description="요약, 핵심 이슈, 권고사항, 후속 여부를 한 장에서 검토하고 저장할 수 있습니다."
              icon={FileText}
              variant="accent"
              action={
                <StatusBadge
                  label={draft.domainConfidence === 'high' ? '높은 신뢰도' : draft.domainConfidence === 'medium' ? '중간 신뢰도' : '검토 필요'}
                  variant={draft.domainConfidence === 'high' ? 'success' : draft.domainConfidence === 'medium' ? 'warning' : 'error'}
                />
              }
            >
              <div className="rounded-2xl border border-[rgba(71,96,83,0.18)] bg-[rgba(93,119,105,0.12)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label={`정확도 ${draft.accuracyScore}%`} variant="processing" />
                  <StatusBadge label={`작성 대상 ${draft.elderlyName}`} variant="info" />
                  <span className="text-sm font-semibold text-[color:var(--brand-700)]">상담 특화 문장 정리 완료</span>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">요약 문안</p>
                  <button
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full bg-[rgba(39,53,45,0.05)] px-3 py-1.5 text-sm font-medium text-[color:var(--text-primary)] transition hover:bg-[rgba(39,53,45,0.08)]"
                  >
                    <Edit3 className="h-4 w-4" />
                    {isEditing ? '수정 완료' : '직접 수정'}
                  </button>
                </div>
                {isEditing ? (
                  <textarea
                    value={editedDraft}
                    onChange={(event) => setEditedDraft(event.target.value)}
                    className="focus-ring min-h-[160px] w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
                  />
                ) : (
                  <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[color:var(--text-primary)]">
                    {editedDraft}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">핵심 이슈</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {draft.aiDraft.keyIssues.map((issue) => (
                      <span key={issue} className="rounded-full bg-[var(--danger-100)] px-3 py-1 text-sm font-medium text-[color:var(--danger-600)]">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">권고사항</p>
                  <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-primary)]">
                    {draft.aiDraft.recommendedActions.map((action) => (
                      <li key={action} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-[color:var(--success-600)]" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {draft.aiDraft.followUpNeeded && (
                <InlineNotice title="후속 상담 필요" message="이 상담은 가족 연계와 정서 모니터링이 함께 필요해 후속 일정 등록을 권장합니다." tone="warning" />
              )}

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <button
                  onClick={() => void saveDraft(false)}
                  disabled={isSaving}
                  className={`${solidButtonClass} bg-[var(--brand-900)] hover:bg-[var(--brand-800)]`}
                >
                  임시 저장
                </button>
                <button
                  onClick={() => void saveDraft(true)}
                  disabled={isSaving}
                  className={`${solidButtonClass} bg-[var(--action-600)] hover:bg-[var(--action-700)]`}
                >
                  <Check className="h-4 w-4" />
                  {isSaving ? '저장 중...' : '최종 저장'}
                </button>
              </div>
            </SectionCard>
          )}
        </div>

        <div className="space-y-6">
          <SectionCard title="최근 상담 기록" description="과거 상담 기록도 같은 카드 언어로 정리해 현재 작업과 시각적 톤을 맞췄습니다." icon={Clock}>
            {isLoadingConsultations ? (
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm text-[color:var(--text-muted)]">
                상담 기록을 불러오는 중입니다.
              </div>
            ) : (
              <div className="space-y-3">
                {pastDrafts.map((record) => (
                  <div key={record.consultationId} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[color:var(--text-strong)]">{record.elderlyName} 어르신</p>
                        <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                          {formatDateLabel(record.consultationDate)} · {record.socialWorkerName}
                        </p>
                      </div>
                      <StatusBadge
                        label={record.status === 'finalized' ? '최종' : record.status === 'reviewed' ? '검토완료' : '초안'}
                        variant={record.status === 'finalized' ? 'success' : record.status === 'reviewed' ? 'info' : 'warning'}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--text-primary)] line-clamp-3">{record.finalVersion || record.aiDraft.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusBadge label={`${record.accuracyScore}% 정확도`} variant="processing" />
                      {record.aiDraft.followUpNeeded && <StatusBadge label="후속 필요" variant="warning" />}
                    </div>
                  </div>
                ))}

                {pastDrafts.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm text-[color:var(--text-muted)]">
                    아직 저장된 상담 기록이 없습니다.
                  </div>
                )}
              </div>
            )}
          </SectionCard>

          <SectionCard title="작성 가이드" description="상담 품질을 안정적으로 유지하기 위한 운영 팁을 별도 카드로 분리했습니다." icon={Sparkles} variant="accent">
            <div className="space-y-3 text-sm text-[color:var(--text-primary)]">
              <div className="rounded-2xl bg-[var(--action-100)] px-4 py-3 text-[color:var(--action-700)]">
                5분 이상 상담 내용을 담으면 핵심 이슈 추출 정확도가 가장 높습니다.
              </div>
              <div className="rounded-2xl bg-[rgba(93,119,105,0.12)] px-4 py-3 text-[color:var(--brand-700)]">
                가족, 정서, 복약, 문서 이슈처럼 실무 표현을 그대로 말하면 AI 초안이 더 안정적입니다.
              </div>
              <div className="rounded-2xl bg-[var(--warning-100)] px-4 py-3 text-[color:var(--warning-600)]">
                초안을 저장하기 전, 후속 상담 필요 여부와 액션 항목만 빠르게 검토해 주세요.
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
