import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileCheck,
  FileText,
  Search,
  Sparkles,
  Upload,
  XCircle,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { readStoredAuthSession } from '../utils/authClient';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';
import type { DocumentCompleteness, RequiredDocument } from '../types';
import { InlineNotice, MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';

const controlClass =
  'focus-ring w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)] shadow-sm transition';

type DocumentPanelState =
  | { mode: 'idle' }
  | { mode: 'upload' | 'detail'; elderlyId: string; documentId: string; docName: string };

type DocumentBoard = DocumentCompleteness & {
  gradeLabel: string;
  longTermCareId: string | null;
  contractEndDate: string | null;
  nextEvalDate: string | null;
  sourceStatus: 'api' | 'degraded';
};

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
  longTermCareId?: string | null;
  careGrade?: string | null;
  nextEvalDate?: string | null;
  contractEndDate?: string | null;
};

type CompletenessApiDocument = {
  type?: string;
  name?: string;
  status?: string;
  has?: boolean;
  date?: string | null;
  urgency?: string;
  daysRemaining?: number | null;
};

type CompletenessApiRecord = {
  recipientId?: string;
  recipientName?: string;
  longTermCareId?: string | null;
  contractEndDate?: string | null;
  nextEvalDate?: string | null;
  needsRenewal?: boolean;
  requiredDocuments?: CompletenessApiDocument[];
  missingDocuments?: CompletenessApiDocument[];
  overallStatus?: string;
  completionRate?: number;
};

type UploadApiResponse = {
  documentId?: string;
  id?: string;
  fileUrl?: string;
  status?: string;
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

function normalizeDocumentType(document: RequiredDocument) {
  const name = document.name.toLowerCase();

  if (name.includes('소견') || name.includes('진단')) {
    return name.includes('진단') ? 'DIAGNOSIS' : 'DOCTOR_NOTE';
  }

  if (name.includes('계약') || name.includes('신청')) {
    return 'CONTRACT';
  }

  if (name.includes('계획') || name.includes('평가')) {
    return 'EVAL_FORM';
  }

  if (document.category === 'medical') {
    return 'DOCTOR_NOTE';
  }

  if (document.category === 'contract') {
    return 'CONTRACT';
  }

  if (document.category === 'evaluation') {
    return 'CARE_PLAN';
  }

  return 'GENERAL';
}

function normalizeCareGradeLabel(value?: string | null) {
  switch (value) {
    case 'GRADE_1':
      return '1';
    case 'GRADE_2':
      return '2';
    case 'GRADE_3':
      return '3';
    case 'GRADE_4':
      return '4';
    case 'PENDING':
      return '미등급';
    default:
      return value?.replace('GRADE_', '') || '-';
  }
}

function formatGradeDisplay(value: string) {
  if (value === '미등급' || value === '-') {
    return value;
  }

  return `${value}등급`;
}

function normalizeRequiredDocumentStatus(
  status?: string,
  has?: boolean
): RequiredDocument['status'] {
  const normalized = (status || '').toUpperCase();

  switch (normalized) {
    case 'COMPLETE':
    case 'VALIDATED':
    case 'DONE':
      return 'complete';
    case 'PENDING_REVIEW':
    case 'PROCESSING':
      return 'pending_review';
    case 'EXPIRED':
      return 'expired';
    case 'INCOMPLETE':
      return 'incomplete';
    case 'MISSING':
    case 'NOT_FOUND':
      return has ? 'complete' : 'missing';
    default:
      return has ? 'complete' : 'missing';
  }
}

function mapRequiredDocumentCategory(type?: string): RequiredDocument['category'] {
  switch (type) {
    case 'EVAL_FORM':
    case 'CARE_PLAN':
      return 'evaluation';
    case 'DOCTOR_NOTE':
    case 'DIAGNOSIS':
      return 'medical';
    case 'CONTRACT':
      return 'contract';
    case 'GENERAL':
    default:
      return 'consent';
  }
}

function buildRecommendations(board: DocumentBoard) {
  const recommendations = board.missingCritical.map((missing) => `${missing} 보완 필요`);
  if (board.riskLevel === 'critical') {
    recommendations.unshift('즉시 보완이 필요한 상태입니다.');
  } else if (board.riskLevel === 'high') {
    recommendations.unshift('이번 주 안에 보완 일정을 잡는 것이 좋습니다.');
  }

  if (board.sourceStatus === 'degraded') {
    recommendations.unshift('완전성 데이터를 불러오지 못해 보수적으로 표시했습니다.');
  }

  return recommendations.length > 0 ? recommendations : ['문서 상태가 안정적입니다.'];
}

function buildBoardFromCompleteness(
  recipient: RecipientApiRecord,
  completeness: CompletenessApiRecord | null,
  fallbackMessage?: string
): DocumentBoard {
  const requiredDocuments = Array.isArray(completeness?.requiredDocuments) ? completeness.requiredDocuments : [];
  const mappedDocuments: RequiredDocument[] = requiredDocuments.map((document, index) => ({
    id: `${recipient.id ?? 'recipient'}-${index}`,
    name: document.name || document.type || `문서 ${index + 1}`,
    status: normalizeRequiredDocumentStatus(document.status, document.has),
    dueDate: document.date || undefined,
    lastUpdated: document.date || undefined,
    updatedBy: document.status && document.status.toUpperCase() === 'COMPLETE' ? '시스템' : undefined,
    category: mapRequiredDocumentCategory(document.type),
  }));

  const completedCount = mappedDocuments.filter((document) => document.status === 'complete').length;
  const totalCount = mappedDocuments.length || 1;
  const derivedCompletionRate =
    typeof completeness?.completionRate === 'number'
      ? completeness.completionRate
      : Math.round((completedCount / totalCount) * 100);

  const missingCritical = mappedDocuments
    .filter((document) => document.status === 'missing' || document.status === 'expired' || document.status === 'incomplete')
    .map((document) => document.name);

  const needsRenewal = Boolean(completeness?.needsRenewal);
  const overallStatus = (completeness?.overallStatus || '').toUpperCase();
  const riskLevel =
    fallbackMessage
      ? 'critical'
      : overallStatus === 'COMPLETE'
        ? 'low'
        : overallStatus === 'CRITICAL' || (needsRenewal && missingCritical.length > 0)
          ? 'critical'
          : missingCritical.length >= 2 || derivedCompletionRate < 60
            ? 'high'
            : missingCritical.length >= 1 || derivedCompletionRate < 85
              ? 'medium'
              : 'low';

  const dueDate = completeness?.contractEndDate || completeness?.nextEvalDate || recipient.contractEndDate || recipient.nextEvalDate || undefined;

  const board: DocumentBoard = {
    elderlyId: recipient.id || completeness?.recipientId || '',
    elderlyName: completeness?.recipientName || recipient.name || '대상자',
    evaluationCycle: needsRenewal ? '3year' : 'annual',
    completionRate: fallbackMessage ? 0 : derivedCompletionRate,
    riskLevel,
    requiredDocuments: fallbackMessage
      ? []
      : mappedDocuments,
    missingCritical: fallbackMessage ? ['완전성 데이터를 불러오지 못했습니다'] : missingCritical,
    aiRecommendations: fallbackMessage ? [fallbackMessage] : [],
    dueDate,
    gradeLabel: normalizeCareGradeLabel(recipient.careGrade),
    longTermCareId: recipient.longTermCareId || completeness?.longTermCareId || null,
    contractEndDate: recipient.contractEndDate || completeness?.contractEndDate || null,
    nextEvalDate: recipient.nextEvalDate || completeness?.nextEvalDate || null,
    sourceStatus: fallbackMessage ? 'degraded' : 'api',
  };

  if (!fallbackMessage) {
    board.aiRecommendations = buildRecommendations(board);
  }

  return board;
}

async function fetchDocumentBoards(apiBaseUrl: string): Promise<{ boards: DocumentBoard[]; warningMessage: string | null }> {
  const session = readStoredAuthSession();
  const query = new URLSearchParams();
  query.set('status', 'active');
  if (session?.user.center?.id) {
    query.set('centerId', session.user.center.id);
  }

  const recipientsResponse = await requestJson<RecipientApiRecord[]>(apiBaseUrl, `/v1/recipients?${query.toString()}`);
  const recipients = Array.isArray(recipientsResponse) ? recipientsResponse : [];

  const results = await Promise.allSettled(
    recipients.map(async (recipient) => {
      if (!recipient.id) {
        throw new Error('수급자 식별자가 없습니다.');
      }

      const completeness = await requestJson<CompletenessApiRecord>(apiBaseUrl, `/v1/extract/completeness/${recipient.id}`);
      return buildBoardFromCompleteness(recipient, completeness);
    })
  );

  const boards: DocumentBoard[] = [];
  const degradedMessages: string[] = [];

  results.forEach((result, index) => {
    const recipient = recipients[index];

    if (result.status === 'fulfilled') {
      boards.push(result.value);
      return;
    }

    const fallbackBoard = buildBoardFromCompleteness(
      recipient,
      null,
      result.reason instanceof Error ? result.reason.message : '완전성 정보를 불러오지 못했습니다.'
    );
    boards.push(fallbackBoard);
    degradedMessages.push(
      `${fallbackBoard.elderlyName}(${fallbackBoard.elderlyId}) 완전성 조회 실패`
    );
  });

  return {
    boards,
    warningMessage: degradedMessages.length > 0
      ? `${degradedMessages.length}건의 완전성 정보를 불러오지 못했습니다. 일부 보드는 보수적으로 표시했습니다.`
      : null,
  };
}

async function uploadDocumentAndAnalyze(
  apiBaseUrl: string,
  file: File,
  recipientId: string,
  type: string
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('recipientId', recipientId);
  formData.append('type', type);

  const uploadResult = await requestJson<UploadApiResponse>(apiBaseUrl, '/v1/extract/upload', {
    method: 'POST',
    body: formData,
  });

  const documentId = uploadResult.documentId || uploadResult.id;
  if (!documentId) {
    throw new Error('업로드 응답에서 문서 ID를 찾지 못했습니다.');
  }

  await requestJson(apiBaseUrl, '/v1/extract/analyze', {
    method: 'POST',
    body: JSON.stringify({ documentId }),
  });

  return { documentId, uploadResult };
}

export function DocumentExtract() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedElderlyId = searchParams.get('elderlyId') ?? '';
  const apiBaseUrl = resolveSameOriginAwareApiBaseUrl();
  const [documentBoards, setDocumentBoards] = useState<DocumentBoard[]>([]);
  const [selectedDocId, setSelectedDocId] = useState(requestedElderlyId);
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [panelState, setPanelState] = useState<DocumentPanelState>({ mode: 'idle' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoadingBoards, setIsLoadingBoards] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState<{ title: string; message: string; tone: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  const filteredDocs = useMemo(
    () =>
      documentBoards.filter((doc) => {
        const matchesRisk = filterRisk === 'all' || doc.riskLevel === filterRisk;
        const normalizedSearch = searchQuery.trim().toLowerCase();
        const matchesSearch =
          normalizedSearch.length === 0 ||
          doc.elderlyName.toLowerCase().includes(normalizedSearch) ||
          (doc.longTermCareId || '').toLowerCase().includes(normalizedSearch);
        return matchesRisk && matchesSearch;
      }),
    [documentBoards, filterRisk, searchQuery]
  );

  const selectedDoc = filteredDocs.find((doc) => doc.elderlyId === selectedDocId) || filteredDocs[0] || null;
  const primaryUploadDocument =
    selectedDoc?.requiredDocuments.find((document) => requiresUpload(document.status)) || null;
  const panelDocument =
    panelState.mode !== 'idle' && selectedDoc?.elderlyId === panelState.elderlyId
      ? selectedDoc.requiredDocuments.find((document) => document.id === panelState.documentId) || null
      : null;
  const selectedGradeLabel = selectedDoc?.gradeLabel || '-';

  const riskStats = {
    critical: documentBoards.filter((doc) => doc.riskLevel === 'critical').length,
    high: documentBoards.filter((doc) => doc.riskLevel === 'high').length,
    medium: documentBoards.filter((doc) => doc.riskLevel === 'medium').length,
    low: documentBoards.filter((doc) => doc.riskLevel === 'low').length,
  };

  const averageCompletion = documentBoards.length > 0
    ? Math.round(documentBoards.reduce((sum, doc) => sum + doc.completionRate, 0) / documentBoards.length)
    : 0;

  const refreshBoards = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      setIsLoadingBoards(true);

      try {
        const result = await fetchDocumentBoards(apiBaseUrl);
        setDocumentBoards(result.boards);

        if (!silent && result.warningMessage) {
          setNotice({
            title: '문서 보드 일부 동기화 필요',
            message: result.warningMessage,
            tone: 'warning',
          });
        }

        return result;
      } catch (error) {
        if (!silent) {
          setNotice({
            title: '문서 보드를 불러오지 못했습니다',
            message: error instanceof Error ? error.message : '문서 파이프라인 연결에 실패했습니다.',
            tone: 'error',
          });
        }

        throw error;
      } finally {
        setIsLoadingBoards(false);
      }
    },
    [apiBaseUrl]
  );

  const handleUploadSubmit = useCallback(async () => {
    if (!selectedDoc || !panelDocument || panelState.mode !== 'upload') {
      return;
    }

    if (!selectedFile) {
      setNotice({
        title: '파일을 먼저 선택해 주세요',
        message: '업로드할 원본 파일이 필요합니다.',
        tone: 'warning',
      });
      return;
    }

    setIsUploading(true);

    try {
      await uploadDocumentAndAnalyze(apiBaseUrl, selectedFile, selectedDoc.elderlyId, normalizeDocumentType(panelDocument));
      const refreshResult = await refreshBoards({ silent: true });

      setSelectedFile(null);
      setPanelState({ mode: 'idle' });
      setNotice({
        title: '업로드 및 분석 완료',
        message: refreshResult.warningMessage
          ? `${selectedDoc.elderlyName} 어르신의 ${panelDocument.name} 파일을 등록하고 분석했습니다. ${refreshResult.warningMessage}`
          : `${selectedDoc.elderlyName} 어르신의 ${panelDocument.name} 파일을 등록하고 분석했습니다.`,
        tone: refreshResult.warningMessage ? 'warning' : 'success',
      });
    } catch (error) {
      setNotice({
        title: '문서 업로드 또는 분석 실패',
        message: error instanceof Error ? error.message : '문서 업로드 처리에 실패했습니다.',
        tone: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  }, [apiBaseUrl, panelDocument, panelState.mode, refreshBoards, selectedDoc, selectedFile]);

  useEffect(() => {
    void refreshBoards().catch(() => undefined);
  }, [refreshBoards]);

  useEffect(() => {
    if (!requestedElderlyId) {
      return;
    }

    if (requestedElderlyId !== selectedDocId && filteredDocs.some((doc) => doc.elderlyId === requestedElderlyId)) {
      setSelectedDocId(requestedElderlyId);
      setPanelState({ mode: 'idle' });
    }
  }, [filteredDocs, requestedElderlyId, selectedDocId]);

  useEffect(() => {
    if (isLoadingBoards) {
      return;
    }

    if (filteredDocs.length === 0) {
      if (selectedDocId !== '') {
        setSelectedDocId('');
      }
      setPanelState((current) => (current.mode === 'idle' ? current : { mode: 'idle' }));
      return;
    }

    if (!filteredDocs.some((doc) => doc.elderlyId === selectedDocId)) {
      setSelectedDocId(filteredDocs[0].elderlyId);
    }
  }, [filteredDocs, isLoadingBoards, selectedDocId]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (selectedDocId) {
      nextParams.set('elderlyId', selectedDocId);
    } else {
      nextParams.delete('elderlyId');
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, selectedDocId, setSearchParams]);

  useEffect(() => {
    if (!selectedDoc) {
      setPanelState((current) => (current.mode === 'idle' ? current : { mode: 'idle' }));
      return;
    }

    setPanelState((current) => {
      if (current.mode === 'idle') {
        return current;
      }

      return current.elderlyId === selectedDoc.elderlyId ? current : { mode: 'idle' };
    });
  }, [selectedDoc]);

  const openUploadPanel = (elderlyId: string, document: RequiredDocument) => {
    setPanelState({ mode: 'upload', elderlyId, documentId: document.id, docName: document.name });
    setSelectedFile(null);
    setNotice({
      title: '업로드 슬롯 준비 완료',
      message: `${document.name} 업로드 슬롯을 열었습니다. 오른쪽 패널에서 접수 흐름을 완료할 수 있습니다.`,
      tone: 'info',
    });
  };

  const openDetailPanel = (elderlyId: string, document: RequiredDocument) => {
    setPanelState({ mode: 'detail', elderlyId, documentId: document.id, docName: document.name });
    setSelectedFile(null);
  };

  const closePanel = () => {
    setPanelState({ mode: 'idle' });
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="문서 관리"
        title="평가 문서 완전성 관리"
        description="검색, 위험도 분류, 업로드 접수 패널을 같은 화면 안에 모아 문서 보완 흐름이 끊기지 않도록 바꿨습니다."
        icon={FileCheck}
        badge={{ label: `${riskStats.critical + riskStats.high}건 우선 조치`, variant: 'warning' }}
        actions={
          <button
            onClick={() => {
              if (selectedDoc && primaryUploadDocument) {
                openUploadPanel(selectedDoc.elderlyId, primaryUploadDocument);
              }
            }}
            disabled={!selectedDoc || !primaryUploadDocument}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
              selectedDoc && primaryUploadDocument
                ? 'bg-[var(--action-600)] text-white shadow-sm hover:bg-[var(--action-700)] hover:-translate-y-0.5'
                : 'cursor-not-allowed bg-[rgba(39,53,45,0.08)] text-[color:var(--text-soft)] shadow-none'
            }`}
          >
            <Upload className="h-4 w-4" />
            문서 업로드 접수
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        <MetricTile label="긴급 보완" value={`${riskStats.critical}건`} meta="즉시 보완 필요" icon={AlertTriangle} tone="rose" />
        <MetricTile label="높음 위험" value={`${riskStats.high}건`} meta="이번 주 우선 대응" icon={Clock} tone="amber" />
        <MetricTile label="보통 위험" value={`${riskStats.medium}건`} meta="스케줄 조정 가능" icon={Calendar} tone="sky" />
        <MetricTile label="안정 대상" value={`${riskStats.low}건`} meta="정상 운영 구간" icon={CheckCircle} tone="emerald" />
        <MetricTile label="평균 완성률" value={`${averageCompletion}%`} meta="전체 문서 보드 기준" icon={FileCheck} tone="violet" />
      </div>

      {notice && <InlineNotice title={notice.title} message={notice.message} tone={notice.tone} />}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SectionCard title="문서 수집 인박스" description="어르신별 위험도와 완성률을 빠르게 훑고 바로 상세 패널로 넘어갈 수 있습니다." icon={Search}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-soft)]" />
                <input
                  type="text"
                  placeholder="어르신 이름 검색..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className={`${controlClass} pl-11`}
                />
              </div>
              <select value={filterRisk} onChange={(event) => setFilterRisk(event.target.value)} className={controlClass}>
                <option value="all">모든 위험도</option>
                <option value="critical">긴급</option>
                <option value="high">높음</option>
                <option value="medium">보통</option>
                <option value="low">낮음</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <button
                  key={doc.elderlyId}
                  onClick={() => setSelectedDocId(doc.elderlyId)}
                  className={`w-full rounded-3xl border p-5 text-left transition-all ${
                    selectedDoc?.elderlyId === doc.elderlyId
                      ? 'border-[color:var(--border-accent)] bg-[var(--action-100)] shadow-md'
                      : 'border-[color:var(--border-subtle)] bg-[var(--surface-strong)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-soft)]'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-[color:var(--text-strong)]">{doc.elderlyName}</p>
                        <StatusBadge label={riskLabel(doc.riskLevel)} variant={riskVariant(doc.riskLevel)} />
                      </div>
                      <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                        {formatGradeDisplay(doc.gradeLabel)} · 평가일 {doc.dueDate || '미정'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.82)] px-3 py-2 text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-soft)]">완성률</p>
                      <p className="text-lg font-semibold text-[color:var(--text-strong)]">{doc.completionRate}%</p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(39,53,45,0.08)]">
                    <div className={`h-full rounded-full ${progressBarClass(doc.completionRate)}`} style={{ width: `${doc.completionRate}%` }} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {doc.missingCritical.slice(0, 3).map((missing) => (
                      <span key={missing} className="rounded-full bg-[var(--danger-100)] px-3 py-1 text-xs font-medium text-[color:var(--danger-600)]">
                        {missing}
                      </span>
                    ))}
                    {doc.missingCritical.length === 0 && (
                      <span className="rounded-full bg-[var(--success-100)] px-3 py-1 text-xs font-medium text-[color:var(--success-600)]">핵심 누락 없음</span>
                    )}
                  </div>
                </button>
              ))}

              {filteredDocs.length === 0 && (
                <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.72)] px-6 py-12 text-center">
                  <FileCheck className="mx-auto h-10 w-10 text-[color:var(--text-soft)] opacity-50" />
                  <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                    {isLoadingBoards ? '문서 보드를 불러오는 중입니다.' : '조건에 맞는 문서 보드가 없습니다.'}
                  </p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          {selectedDoc ? (
            <SectionCard
              title={`${selectedDoc.elderlyName} 문서 보드`}
              description="문서 상태와 액션 버튼을 세로 카드 구조로 바꿔 모바일에서도 읽기 쉽게 만들었습니다."
              icon={FileCheck}
              action={<StatusBadge label={`완성률 ${selectedDoc.completionRate}%`} variant={riskVariant(selectedDoc.riskLevel)} />}
            >
              {selectedDoc.aiRecommendations.length > 0 && (
                <div className="rounded-2xl border border-[rgba(71,96,83,0.16)] bg-[rgba(93,119,105,0.12)] p-4">
                  <div className="flex items-center gap-2 text-[color:var(--brand-700)]">
                    <Sparkles className="h-4 w-4" />
                    <p className="text-sm font-semibold">AI 추천</p>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-primary)]">
                    {selectedDoc.aiRecommendations.map((recommendation) => (
                      <li key={recommendation} className="flex gap-2">
                        <span className="text-[color:var(--brand-500)]">•</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                {selectedDoc.requiredDocuments.map((document) => (
                  <div key={document.id} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {statusIcon(document.status)}
                          <p
                            className={`font-semibold ${
                              document.status === 'missing'
                                ? 'text-[color:var(--danger-600)]'
                                : 'text-[color:var(--text-strong)]'
                            }`}
                          >
                            {document.name}
                          </p>
                          <StatusBadge label={statusText(document.status)} variant={statusVariant(document.status)} />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-[color:var(--text-muted)]">
                          <span>마감일 {document.dueDate || '-'}</span>
                          <span>최종 수정 {document.lastUpdated || '미등록'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {document.status === 'complete' || document.status === 'pending_review' ? (
                          <button
                            onClick={() => openDetailPanel(selectedDoc.elderlyId, document)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] px-3 py-2 text-sm font-medium text-[color:var(--text-primary)] transition hover:bg-[var(--surface-soft)]"
                          >
                            <FileText className="h-4 w-4" />
                            상세
                          </button>
                        ) : (
                          <button
                            onClick={() => openUploadPanel(selectedDoc.elderlyId, document)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--action-600)] px-3 py-2 text-sm font-medium text-white transition hover:bg-[var(--action-700)]"
                          >
                            <Upload className="h-4 w-4" />
                            업로드
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          ) : (
            <SectionCard
              title="문서 보드"
              description={
                isLoadingBoards
                  ? '실제 backend 문서 보드를 불러오는 중입니다.'
                  : filteredDocs.length === 0
                    ? '현재 필터에 맞는 문서 보드가 없습니다.'
                    : '왼쪽 목록에서 어르신을 선택하면 상세 상태가 표시됩니다.'
              }
              icon={FileCheck}
            >
              <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.72)] px-6 py-14 text-center text-sm text-[color:var(--text-muted)]">
                {isLoadingBoards
                  ? '문서 보드 동기화가 끝나면 세부 문서 상태가 표시됩니다.'
                  : filteredDocs.length === 0
                    ? '검색 결과를 다시 조정해 주세요.'
                    : '상세 문서 보드를 선택해 주세요.'}
              </div>
            </SectionCard>
          )}

            <SectionCard
              title="문서 작업 패널"
              description="현재 어떤 어르신의 어떤 문서를 다루는지 맥락을 유지한 채 후속 작업을 이어갑니다."
              icon={panelState.mode === 'detail' ? FileText : Upload}
              variant="accent"
            action={
              panelState.mode !== 'idle' && panelDocument && selectedDoc ? (
                <>
                  <StatusBadge
                    label={panelState.mode === 'upload' ? '2/3 단계 · 업로드 접수' : '2/2 단계 · 상세 확인'}
                    variant={panelState.mode === 'upload' ? 'processing' : 'info'}
                    dot={false}
                  />
                  <button
                    type="button"
                    onClick={closePanel}
                    className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--text-primary)] transition hover:bg-[var(--surface-soft)]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    뒤로가기
                  </button>
                </>
              ) : undefined
            }
          >
            {!selectedDoc ? (
              <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.65)] px-5 py-8 text-center text-sm text-[color:var(--text-muted)]">
                검색 결과에 맞는 문서 보드를 선택하면 이 패널에서 후속 작업이 표시됩니다.
              </div>
            ) : panelState.mode === 'upload' && panelDocument ? (
              <div className="space-y-4">
                <DocumentWorkflowHeader
                  stepLabel="1. 대상 확인"
                  title={`${selectedDoc.elderlyName} · ${panelDocument.name}`}
                  subtitle={`${formatGradeDisplay(selectedGradeLabel)} · ${documentCategoryLabel(panelDocument.category)}`}
                  meta={[
                    `현재 상태 ${statusText(panelDocument.status)}`,
                    `마감일 ${panelDocument.dueDate || '-'}`,
                    `누락 핵심 문서 ${selectedDoc.missingCritical.length}건`,
                  ]}
                />
                <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.72)] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
                    <Upload className="h-4 w-4 text-[color:var(--action-700)]" />
                    2. 파일 접수
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                    파일을 선택하면 업로드 후 자동으로 분석까지 이어집니다. 문서 원본이 올라가야 서버에서 추출과 검수 상태 갱신이 가능합니다.
                  </p>
                  <div className="mt-4 space-y-3">
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt,.md"
                      onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                      className={`${controlClass} cursor-pointer py-2 file:mr-4 file:rounded-full file:border-0 file:bg-[var(--action-600)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[var(--action-700)]`}
                    />
                    {selectedFile ? (
                      <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[color:var(--text-primary)]">
                        선택된 파일: <span className="font-semibold">{selectedFile.name}</span>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.65)] px-4 py-3 text-sm text-[color:var(--text-muted)]">
                        업로드할 파일을 선택해 주세요.
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => void handleUploadSubmit()}
                  disabled={!selectedFile || isUploading}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 ${
                    !selectedFile || isUploading
                      ? 'cursor-not-allowed bg-[rgba(39,53,45,0.25)] shadow-none'
                      : 'bg-[var(--action-600)] hover:bg-[var(--action-700)]'
                  }`}
                >
                  <Upload className={`h-4 w-4 ${isUploading ? 'animate-pulse' : ''}`} />
                  {isUploading ? '업로드 및 분석 중...' : '3. 업로드 후 분석 실행'}
                </button>
              </div>
            ) : panelState.mode === 'detail' && panelDocument ? (
              <div className="space-y-4">
                <DocumentWorkflowHeader
                  stepLabel="1. 문서 상세 맥락"
                  title={`${selectedDoc.elderlyName} · ${panelDocument.name}`}
                  subtitle={`${formatGradeDisplay(selectedGradeLabel)} · ${documentCategoryLabel(panelDocument.category)}`}
                  meta={[
                    `현재 상태 ${statusText(panelDocument.status)}`,
                    `마감일 ${panelDocument.dueDate || '-'}`,
                    `최종 수정 ${panelDocument.lastUpdated || '미등록'}`,
                  ]}
                />

                <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">2. 읽기 전용 상세</p>
                      <p className="mt-2 text-base font-semibold text-[color:var(--text-strong)]">{panelDocument.name}</p>
                      <p className="mt-1 text-sm text-[color:var(--text-muted)]">{selectedDoc.elderlyName} 어르신 문서</p>
                    </div>
                    <StatusBadge label={statusText(panelDocument.status)} variant={statusVariant(panelDocument.status)} />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <DetailMeta label="문서 분류" value={documentCategoryLabel(panelDocument.category)} />
                    <DetailMeta label="대상 어르신" value={selectedDoc.elderlyName} />
                    <DetailMeta label="마감일" value={panelDocument.dueDate || '-'} />
                    <DetailMeta label="최종 수정일" value={panelDocument.lastUpdated || '미등록'} />
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.65)] px-5 py-4 text-sm text-[color:var(--text-muted)]">
                  원본 파일 미리보기는 아직 연결되지 않았습니다. 현재는 서버에 저장된 문서 메타정보와 상태만 확인할 수 있습니다.
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.65)] px-5 py-8 text-center text-sm text-[color:var(--text-muted)]">
                상세 문서 카드의 업로드 또는 상세 버튼을 누르면 이 패널에서 어르신 이름, 문서명, 단계 정보와 함께 후속 작업이 이어집니다.
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function statusIcon(status: RequiredDocument['status']) {
  switch (status) {
    case 'complete':
      return <CheckCircle className="h-4 w-4 text-[color:var(--success-600)]" />;
    case 'pending_review':
      return <Clock className="h-4 w-4 text-[color:var(--info-600)]" />;
    case 'missing':
      return <XCircle className="h-4 w-4 text-[color:var(--danger-600)]" />;
    case 'expired':
      return <Clock className="h-4 w-4 text-[color:var(--warning-600)]" />;
    case 'incomplete':
      return <AlertTriangle className="h-4 w-4 text-[color:var(--warning-600)]" />;
  }
}

function statusText(status: RequiredDocument['status']) {
  switch (status) {
    case 'complete':
      return '완료';
    case 'pending_review':
      return '검수 대기';
    case 'missing':
      return '미보유';
    case 'expired':
      return '만료';
    case 'incomplete':
      return '미완성';
  }
}

function statusVariant(status: RequiredDocument['status']) {
  switch (status) {
    case 'complete':
      return 'success';
    case 'pending_review':
      return 'info';
    case 'missing':
      return 'error';
    case 'expired':
      return 'warning';
    case 'incomplete':
      return 'warning';
  }
}

function requiresUpload(status: RequiredDocument['status']) {
  return status === 'missing' || status === 'expired' || status === 'incomplete';
}

function riskLabel(risk: DocumentCompleteness['riskLevel']) {
  switch (risk) {
    case 'critical':
      return '긴급';
    case 'high':
      return '높음';
    case 'medium':
      return '보통';
    case 'low':
      return '낮음';
  }
}

function riskVariant(risk: DocumentCompleteness['riskLevel']) {
  switch (risk) {
    case 'critical':
      return 'error';
    case 'high':
      return 'warning';
    case 'medium':
      return 'info';
    case 'low':
      return 'success';
  }
}

function progressBarClass(completionRate: number) {
  if (completionRate >= 90) {
    return 'bg-[var(--success-600)]';
  }

  if (completionRate >= 70) {
    return 'bg-[var(--action-600)]';
  }

  if (completionRate >= 50) {
    return 'bg-[var(--warning-600)]';
  }

  return 'bg-[var(--danger-600)]';
}

function documentCategoryLabel(category: RequiredDocument['category']) {
  switch (category) {
    case 'evaluation':
      return '평가 문서';
    case 'medical':
      return '의료 문서';
    case 'contract':
      return '계약 문서';
    case 'consent':
      return '동의 문서';
  }
}

function DetailMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--surface-soft)] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">{value}</p>
    </div>
  );
}

function DocumentWorkflowHeader({
  stepLabel,
  title,
  subtitle,
  meta,
}: {
  stepLabel: string;
  title: string;
  subtitle: string;
  meta: string[];
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">{stepLabel}</p>
      <p className="mt-2 text-base font-semibold text-[color:var(--text-strong)]">{title}</p>
      <p className="mt-1 text-sm text-[color:var(--text-muted)]">{subtitle}</p>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-[color:var(--text-muted)]">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
