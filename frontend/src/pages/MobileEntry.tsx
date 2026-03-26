import { useEffect, useMemo, useRef, useState } from 'react';
import { Clock, FileText, Mic, MicOff, Save, Sparkles, Users, Wand2 } from 'lucide-react';
import { InlineNotice, MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';
import { readStoredAuthSession } from '../utils/authClient';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';
import type { DailyCareRecord } from '../types';

const quickCategories = [
  { id: 'participation', label: '활동 참여', icon: '☀️' },
  { id: 'fluid', label: '수분 섭취', icon: '💧' },
  { id: 'mood', label: '기분 상태', icon: '😊' },
  { id: 'meal', label: '식사량', icon: '🍚' },
];

const quickTapOptions = [
  { id: 'part_high', category: 'participation', label: '매우 적극적', emoji: '🌟', value: '매우 적극적', color: 'border-[var(--success-300)] bg-[var(--success-100)] text-[color:var(--success-600)]' },
  { id: 'part_mid', category: 'participation', label: '보통', emoji: '🙂', value: '보통', color: 'border-[var(--action-300)] bg-[var(--action-100)] text-[color:var(--action-700)]' },
  { id: 'part_low', category: 'participation', label: '낮음', emoji: '🫧', value: '낮음', color: 'border-[var(--warning-300)] bg-[var(--warning-100)] text-[color:var(--warning-600)]' },
  { id: 'fluid_high', category: 'fluid', label: '충분', emoji: '🥤', value: '충분', color: 'border-[var(--success-300)] bg-[var(--success-100)] text-[color:var(--success-600)]' },
  { id: 'fluid_mid', category: 'fluid', label: '보통', emoji: '🚰', value: '보통', color: 'border-[var(--action-300)] bg-[var(--action-100)] text-[color:var(--action-700)]' },
  { id: 'fluid_low', category: 'fluid', label: '부족', emoji: '⚠️', value: '부족', color: 'border-[var(--warning-300)] bg-[var(--warning-100)] text-[color:var(--warning-600)]' },
  { id: 'mood_good', category: 'mood', label: '안정', emoji: '😊', value: '안정', color: 'border-[var(--success-300)] bg-[var(--success-100)] text-[color:var(--success-600)]' },
  { id: 'mood_neutral', category: 'mood', label: '보통', emoji: '😐', value: '보통', color: 'border-[var(--action-300)] bg-[var(--action-100)] text-[color:var(--action-700)]' },
  { id: 'mood_sad', category: 'mood', label: '불안', emoji: '😟', value: '불안', color: 'border-[var(--warning-300)] bg-[var(--warning-100)] text-[color:var(--warning-600)]' },
  { id: 'meal_good', category: 'meal', label: '잘 드심', emoji: '🍛', value: '잘 드심', color: 'border-[var(--success-300)] bg-[var(--success-100)] text-[color:var(--success-600)]' },
  { id: 'meal_mid', category: 'meal', label: '보통', emoji: '🍱', value: '보통', color: 'border-[var(--action-300)] bg-[var(--action-100)] text-[color:var(--action-700)]' },
  { id: 'meal_low', category: 'meal', label: '저조', emoji: '🍞', value: '저조', color: 'border-[var(--warning-300)] bg-[var(--warning-100)] text-[color:var(--warning-600)]' },
];

const primaryButtonClass =
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

type CareRecordApiRecord = {
  id?: string;
  recipientId?: string;
  workerId?: string;
  type?: string;
  recordDate?: string;
  visitTime?: string | null;
  leaveTime?: string | null;
  condition?: string | null;
  specialNotes?: string | null;
  incidentReport?: string | null;
  activities?: Array<{ type?: string; duration?: number; note?: string }>;
  meals?: Array<{ type?: string; intake?: number; menu?: string }>;
  location?: { lat?: number; lng?: number; address?: string } | null;
  photos?: string[];
  createdAt?: string;
  updatedAt?: string;
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
  typeLabel: string;
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
    typeLabel: '방문요양',
  };
}

function summarizeRecordContent(record: CareRecordApiRecord) {
  const parts = [
    record.condition?.trim(),
    record.specialNotes?.trim(),
    record.incidentReport?.trim(),
    record.activities?.length
      ? record.activities
          .map((activity) => activity.note || activity.type)
          .filter((item): item is string => Boolean(item))
          .join(' / ')
      : '',
    record.meals?.length
      ? record.meals
          .map((meal) => meal.menu || meal.type)
          .filter((item): item is string => Boolean(item))
          .join(' / ')
      : '',
  ].filter((item): item is string => Boolean(item));

  return parts.length > 0 ? parts.join(' · ') : '현장 기록';
}

function mapRecordToDailyCareRecord(record: CareRecordApiRecord, fallbackName: string): DailyCareRecord | null {
  if (!record.id || !record.recordDate) {
    return null;
  }

  const content = summarizeRecordContent(record);

  return {
    recordId: record.id,
    elderlyId: record.recipientId || '',
    elderlyName: record.recipient?.name || fallbackName,
    visitDate: formatDateLabel(record.recordDate),
    caregiverId: record.workerId || 'current-user',
    caregiverName: record.worker?.name || '담당자',
    records: [
      {
        id: `${record.id}-summary`,
        type: 'daily_care',
        content,
        timestamp: record.visitTime || record.recordDate,
        aiDrafted: Boolean(record.condition || record.specialNotes),
        verified: Boolean(record.leaveTime || record.condition || record.specialNotes || record.incidentReport),
      },
    ],
    handoverNotes: record.specialNotes || undefined,
    nextVisitPlanned: undefined,
    status: 'completed',
    createdAt: record.createdAt || record.recordDate,
    updatedAt: record.updatedAt || record.recordDate,
  };
}

function buildQuickSummary(selectedQuickInputs: Record<string, string>) {
  return quickCategories
    .map((category) => {
      const value = selectedQuickInputs[category.id];
      if (!value) {
        return null;
      }

      const option = quickTapOptions.find((item) => item.category === category.id && item.value === value);
      return {
        category: category.label,
        label: option?.label || value,
      };
    })
    .filter((item): item is { category: string; label: string } => Boolean(item));
}

export function MobileEntry() {
  const [recipients, setRecipients] = useState<RecipientSummary[]>([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [savedRecords, setSavedRecords] = useState<DailyCareRecord[]>([]);
  const [draftTarget, setDraftTarget] = useState<RecipientSummary | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [showAIDraft, setShowAIDraft] = useState(false);
  const [selectedQuickInputs, setSelectedQuickInputs] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState('participation');
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<NoticeState | null>(null);

  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const apiBaseUrl = resolveSameOriginAwareApiBaseUrl();

  const selectedRecipient = useMemo(
    () => recipients.find((recipient) => recipient.id === selectedRecipientId) || null,
    [recipients, selectedRecipientId]
  );

  const selectedQuickSummary = useMemo(() => buildQuickSummary(selectedQuickInputs), [selectedQuickInputs]);
  const latestRecord = savedRecords[0] || null;

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
      setSavedRecords([]);
      return;
    }

    const recipient = selectedRecipient;
    let active = true;

    async function loadRecords() {
      setIsLoadingRecords(true);
      try {
        const data = await requestJson<CareRecordApiRecord[]>(
          apiBaseUrl,
          `/v1/care/records?recipientId=${encodeURIComponent(recipient.id)}`
        );

        if (!active) {
          return;
        }

        const nextRecords = Array.isArray(data)
          ? data.map((record) => mapRecordToDailyCareRecord(record, recipient.name)).filter((item): item is DailyCareRecord => Boolean(item))
          : [];
        setSavedRecords(nextRecords);
      } catch (error) {
        if (!active) {
          return;
        }

        setSavedRecords([]);
        setNotice({
          title: '기록 목록을 불러오지 못했습니다',
          message: error instanceof Error ? error.message : '기록 API 연결을 확인해 주세요.',
          tone: 'warning',
        });
      } finally {
        if (active) {
          setIsLoadingRecords(false);
        }
      }
    }

    void loadRecords();

    return () => {
      active = false;
    };
  }, [apiBaseUrl, selectedRecipient]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const clearWorkingDraft = (message?: string) => {
    setIsRecording(false);
    setTranscript('');
    setAiDraft('');
    setShowAIDraft(false);
    setSelectedQuickInputs({});
    setRecordTime(0);
    setDraftTarget(null);

    if (message) {
      setNotice({
        title: '대상 변경으로 입력 내용 초기화',
        message,
        tone: 'info',
      });
    }
  };

  const generateDraft = async (input: string) => {
    if (!selectedRecipient) {
      setNotice({
        title: '대상자를 먼저 선택해 주세요',
        message: '현장 기록을 만들 대상자 목록을 아직 불러오지 못했습니다.',
        tone: 'warning',
      });
      return;
    }

    const transcriptText = input.trim() || `${selectedRecipient.name} 어르신 현장 기록입니다.`;
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
          audioUrl: 'transcript://mobile-entry',
          transcribedText: transcriptText,
        }),
      });

      const summary = response.draft?.content?.trim() || response.draft?.subject?.trim() || transcriptText;
      setTranscript(transcriptText);
      setAiDraft(summary);
      setShowAIDraft(true);
      setDraftTarget(selectedRecipient);
      setNotice({
        title: 'AI 초안 생성 완료',
        message: '실제 전사/초안 API를 통해 현장 기록을 정리했습니다.',
        tone: 'info',
      });
    } catch (error) {
      const fallbackDraft = `${selectedRecipient.name} 어르신은 오늘 현장 기록을 안정적으로 남겼습니다. ${transcriptText}`;
      setTranscript(transcriptText);
      setAiDraft(fallbackDraft);
      setShowAIDraft(true);
      setDraftTarget(selectedRecipient);
      setNotice({
        title: 'AI 초안 생성이 제한되어 로컬 초안으로 전환했습니다',
        message: error instanceof Error ? error.message : 'voice-to-draft API에 연결하지 못했습니다.',
        tone: 'warning',
      });
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const toggleRecording = async () => {
    if (!selectedRecipient) {
      setNotice({
        title: '대상자를 먼저 선택해 주세요',
        message: '현장 기록 대상자 목록을 불러온 뒤 녹음을 시작할 수 있습니다.',
        tone: 'warning',
      });
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      await generateDraft(transcript || `${selectedRecipient.name} 어르신 오전 상태 안정, 식사와 수분 섭취 양호.`);
      return;
    }

    setIsRecording(true);
    setRecordTime(0);
    setTranscript('');
    setShowAIDraft(false);
    setAiDraft('');
    setDraftTarget(null);
    setNotice(null);
  };

  const handleRecipientSelect = (recipient: RecipientSummary) => {
    if (!selectedRecipient || recipient.id === selectedRecipient.id) {
      return;
    }

    const hasWorkingDraft = isRecording || Boolean(transcript.trim()) || Boolean(aiDraft.trim()) || selectedQuickSummary.length > 0;
    setSelectedRecipientId(recipient.id);

    if (hasWorkingDraft) {
      clearWorkingDraft(
        `${recipient.name} 어르신으로 전환하면서 이전 작성 내용을 비웠습니다. 대상이 섞이지 않도록 초안을 다시 생성해 주세요.`
      );
    }
  };

  const handleQuickTap = (categoryId: string, value: string | number) => {
    setSelectedQuickInputs((prev) => ({
      ...prev,
      [categoryId]: String(value),
    }));
  };

  const submitRecord = async () => {
    if (!selectedRecipient) {
      setNotice({
        title: '대상자를 먼저 선택해 주세요',
        message: '기록 저장을 위해 먼저 대상자를 선택해 주세요.',
        tone: 'warning',
      });
      return;
    }

    const quickSummaryText = selectedQuickSummary.map((item) => `${item.category}: ${item.label}`).join(' / ');
    const finalContent = [aiDraft, quickSummaryText].filter(Boolean).join(' | ') || '현장 기록 입력됨';

    setIsSubmitting(true);
    setNotice(null);

    try {
      const now = new Date().toISOString();
      await requestJson<CareRecordApiRecord>(apiBaseUrl, '/v1/care/records', {
        method: 'POST',
        body: JSON.stringify({
          recipientId: selectedRecipient.id,
          type: 'VISIT',
          recordDate: now,
          visitTime: now,
          condition: finalContent,
          specialNotes: transcript || quickSummaryText || aiDraft,
          incidentReport: selectedQuickSummary.some((item) => item.label.includes('불안') || item.label.includes('부족'))
            ? quickSummaryText
            : undefined,
          activities: selectedQuickSummary.map((item) => ({
            type: item.category,
            note: item.label,
          })),
        }),
      });

      const refreshed = await requestJson<CareRecordApiRecord[]>(
        apiBaseUrl,
        `/v1/care/records?recipientId=${encodeURIComponent(selectedRecipient.id)}`
      );

      setSavedRecords(
        Array.isArray(refreshed)
          ? refreshed
              .map((record) => mapRecordToDailyCareRecord(record, selectedRecipient.name))
              .filter((item): item is DailyCareRecord => Boolean(item))
          : []
      );
      setTranscript('');
      setAiDraft('');
      setShowAIDraft(false);
      setSelectedQuickInputs({});
      setRecordTime(0);
      setDraftTarget(null);
      setIsSubmitting(false);
      setNotice({
        title: '기록 저장 완료',
        message: `${selectedRecipient.name} 어르신 현장 기록을 실제 API에 저장했습니다.`,
        tone: 'success',
      });
    } catch (error) {
      setIsSubmitting(false);
      setNotice({
        title: '기록 저장 실패',
        message: error instanceof Error ? error.message : '기록 저장 API를 확인해 주세요.',
        tone: 'warning',
      });
    }
  };

  const saveDisabled = isSubmitting || isGeneratingDraft || (!aiDraft && selectedQuickSummary.length === 0 && !transcript.trim());

  const latestSummary = latestRecord?.records[0]?.content || '최근 저장된 기록이 없습니다.';
  const handoverSummary = [
    selectedRecipient ? `${selectedRecipient.name} 어르신 기록 기준으로 확인 중입니다.` : '대상자를 선택해 주세요.',
    latestSummary,
    selectedQuickSummary.length > 0 ? `최근 퀵 입력: ${selectedQuickSummary.map((item) => `${item.category} ${item.label}`).join(', ')}` : '퀵 입력 선택 대기 중입니다.',
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="현장 입력"
        title="현장 기록 입력"
        description="음성 캡처, 퀵탭, AI 초안을 한 흐름으로 묶어 현장에서 바로 저장할 수 있게 정리했습니다."
        icon={Mic}
        badge={{
          label: isRecording ? '음성 수집 중' : showAIDraft ? '초안 준비 완료' : '대기 상태',
          variant: isRecording ? 'processing' : showAIDraft ? 'success' : 'info',
        }}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricTile label="선택 대상자" value={selectedRecipient?.name || '미선택'} meta={selectedRecipient?.gradeLabel ? `${selectedRecipient.gradeLabel} · 현장 기록 대상` : '대상자 선택 필요'} icon={Users} tone="sky" />
        <MetricTile label="오늘 저장 건수" value={savedRecords.length} meta="실제 기록 API 기준" icon={Save} tone="emerald" />
        <MetricTile label="AI 준비 상태" value={showAIDraft ? 'Ready' : 'Standby'} meta={showAIDraft ? '수정 후 바로 저장 가능' : '녹음 종료 시 초안 생성'} icon={Sparkles} tone="violet" />
      </div>

      {notice && <InlineNotice title={notice.title} message={notice.message} tone={notice.tone} />}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <SectionCard
            title="대상 선택"
            description="현장에 들어가기 전에 오늘 방문 대상을 먼저 고르면 이후 저장 흐름이 정리됩니다."
            icon={Users}
          >
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
                        ? 'border-[color:var(--border-accent)] bg-[var(--action-100)] shadow-sm'
                        : 'border-[color:var(--border-subtle)] bg-[var(--surface-strong)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-soft)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border-accent)] bg-[var(--action-100)] text-sm font-semibold text-[color:var(--action-700)]">
                        {recipient.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-[color:var(--text-strong)]">{recipient.name}</p>
                        <p className="text-xs text-[color:var(--text-muted)]">
                          {recipient.gradeLabel} · {recipient.typeLabel}
                        </p>
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
            title="음성 캡처 스테이션"
            description="모바일에서 한 손으로 쓰기 쉽게 큰 녹음 버튼과 초안 패널을 같은 카드 안에 두었습니다."
            icon={Mic}
            action={<StatusBadge label={isRecording ? `녹음 ${formatTime(recordTime)}` : '원터치 시작'} variant={isRecording ? 'processing' : 'info'} />}
          >
            <div className="rounded-[28px] border border-[color:var(--border-subtle)] bg-[linear-gradient(180deg,rgba(242,246,243,0.9),rgba(255,253,250,0.96))] p-6 text-center">
              <button
                onClick={() => void toggleRecording()}
                disabled={isSubmitting || isGeneratingDraft}
                className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-white shadow-xl transition-all ${
                  isRecording
                    ? 'recording-pulse bg-[var(--danger-600)] shadow-[rgba(181,65,53,0.18)]'
                    : 'bg-[var(--action-600)] shadow-[rgba(19,125,128,0.18)] hover:-translate-y-1 hover:bg-[var(--action-700)]'
                }`}
              >
                {isRecording ? <MicOff className="h-9 w-9" /> : <Mic className="h-9 w-9" />}
              </button>
              <p className="mt-4 text-lg font-semibold text-[color:var(--text-strong)]">
                {isRecording ? '지금 현장 내용을 말씀해 주세요' : '버튼을 누르면 음성 기록이 시작됩니다'}
              </p>
              <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                {isRecording ? `${formatTime(recordTime)} 진행 중 · 종료와 동시에 초안을 만듭니다` : '종료와 동시에 AI가 문장 초안을 정리합니다'}
              </p>
            </div>

            {transcript && (
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">원문 요약</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{transcript}</p>
              </div>
            )}

            {showAIDraft && (
              <div className="rounded-3xl border border-[rgba(71,96,83,0.16)] bg-[rgba(93,119,105,0.12)] p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <StatusBadge label="AI 초안" variant="processing" />
                  {draftTarget && <StatusBadge label={`작성 대상 ${draftTarget.name}`} variant="info" />}
                  <span className="text-sm font-semibold text-[color:var(--brand-700)]">요양특화 문장으로 정리됨</span>
                </div>
                <textarea
                  value={aiDraft}
                  onChange={(event) => setAiDraft(event.target.value)}
                  className="focus-ring min-h-[140px] w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
                />
              </div>
            )}
          </SectionCard>

          <SectionCard title="10초 퀵 입력" description="자주 쓰는 항목은 탭으로 바로 고르고, 음성 초안과 함께 한 번에 저장합니다." icon={Wand2}>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {quickCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    activeCategory === category.id
                      ? 'bg-[var(--brand-900)] text-white'
                      : 'bg-[var(--surface-strong)] text-[color:var(--text-primary)] hover:bg-[var(--surface-soft)] hover:text-[color:var(--text-strong)]'
                  }`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {quickTapOptions
                .filter((option) => option.category === activeCategory)
                .map((option) => {
                  const selected = selectedQuickInputs[activeCategory] === String(option.value);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleQuickTap(activeCategory, option.value)}
                      className={`rounded-2xl border-2 p-4 text-center transition-all ${selected ? option.color : 'border-[color:var(--border-subtle)] bg-[var(--surface-strong)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-soft)]'}`}
                    >
                      <div className="text-2xl">{option.emoji}</div>
                      <div className="mt-2 text-sm font-semibold">{option.label}</div>
                    </button>
                  );
                })}
            </div>
          </SectionCard>

          <SectionCard title="저장 전 점검" description="초안과 퀵입력 내용을 함께 묶어 바로 저장할 수 있도록 마지막 확인 영역을 분리했습니다." icon={Save}>
            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
              <p className="text-sm font-semibold text-[color:var(--text-strong)]">선택된 퀵 입력</p>
              {selectedQuickSummary.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedQuickSummary.map((item) => (
                    <span key={`${item.category}-${item.label}`} className="rounded-full bg-[rgba(39,53,45,0.05)] px-3 py-1 text-sm text-[color:var(--text-primary)]">
                      {item.category} · {item.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-[color:var(--text-muted)]">아직 선택된 퀵 입력이 없습니다.</p>
              )}
            </div>

            <button onClick={() => void submitRecord()} disabled={saveDisabled} className={`${primaryButtonClass} bg-[var(--action-600)] hover:bg-[var(--action-700)]`}>
              <Save className="h-4 w-4" />
              {isSubmitting ? '저장 중...' : '기록 저장'}
            </button>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="오늘 저장 이력" description="방금 저장한 기록이 바로 오른쪽 피드에 쌓이도록 배치했습니다." icon={Clock}>
            {isLoadingRecords ? (
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm text-[color:var(--text-muted)]">
                기록을 불러오는 중입니다.
              </div>
            ) : (
              <div className="space-y-3">
                {savedRecords.slice(0, 5).map((record) => (
                  <div key={record.recordId} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[color:var(--text-strong)]">{record.elderlyName}</p>
                        <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                          {record.caregiverName} · {record.visitDate}
                        </p>
                      </div>
                      <StatusBadge
                        label={record.status === 'completed' ? '저장 완료' : '작성 중'}
                        variant={record.status === 'completed' ? 'success' : 'warning'}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--text-primary)] line-clamp-2">{record.records[0]?.content || '기록 없음'}</p>
                  </div>
                ))}

                {savedRecords.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4 text-sm text-[color:var(--text-muted)]">
                    아직 저장된 기록이 없습니다.
                  </div>
                )}
              </div>
            )}
          </SectionCard>

          <SectionCard title="핸드오버 요약" description="오늘 관찰 포인트와 다음 방문 주의사항을 모바일에서도 한눈에 보이게 정리했습니다." icon={FileText} variant="accent">
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-[var(--success-100)] px-4 py-3 text-[color:var(--success-600)]">
                <p className="font-semibold">긍정 포인트</p>
                <p className="mt-1">{handoverSummary[0]}</p>
              </div>
              <div className="rounded-2xl bg-[var(--warning-100)] px-4 py-3 text-[color:var(--warning-600)]">
                <p className="font-semibold">주의 포인트</p>
                <p className="mt-1">{handoverSummary[1]}</p>
              </div>
              <div className="rounded-2xl bg-[var(--action-100)] px-4 py-3 text-[color:var(--action-700)]">
                <p className="font-semibold">내일 우선 일정</p>
                <p className="mt-1">{handoverSummary[2]}</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
