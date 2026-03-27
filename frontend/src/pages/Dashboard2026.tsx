import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileCheck,
  AlertTriangle,
  Smartphone,
  Brain,
  Clock,
  ChevronRight,
  Bell,
  Sparkles,
  Activity,
  ArrowUpRight,
  Heart,
  Zap,
  Server,
  Database,
  Cloud,
  ShieldAlert,
  AlertCircle,
  BadgeCheck,
  Info,
} from 'lucide-react';
import type { Alert, DocumentCompleteness, RequiredDocument, WorkerStat } from '../types';
import { 
  GlassCard, 
  BentoGrid, 
  BentoItem, 
  StatusBadge,
  AnimatedNumber,
  PageHeader,
  InlineNotice,
} from '../components/ui';
import { useSystemStatus, type SystemStatus } from '../hooks/useSystemStatus';
import { readStoredAuthSession } from '../utils/authClient';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';
import { getUnreadAlertCount } from '../utils/alerts';
import { buildDocumentsPath, getAlertTarget } from '../utils/routes';

// 알림 심각도별 색상 - 2026 감성 개선
const severityColors = {
  critical: 'border-l-[color:var(--danger-600)] bg-[var(--danger-100)]',
  high: 'border-l-[color:var(--warning-600)] bg-[var(--warning-100)]',
  medium: 'border-l-[color:var(--info-600)] bg-[var(--info-100)]',
  low: 'border-l-[color:var(--success-600)] bg-[var(--success-100)]',
};

// 알림 타입별 아이콘/라벨
const alertTypeConfig = {
  evaluation_due: { icon: FileCheck, label: '평가 만료', color: 'text-[color:var(--info-600)]' },
  document_missing: { icon: AlertTriangle, label: '서류 미비', color: 'text-[color:var(--danger-600)]' },
  abnormal_vital: { icon: Activity, label: '건강 이상', color: 'text-[color:var(--warning-600)]' },
  handover_gap: { icon: Clock, label: '핸드오버', color: 'text-[color:var(--warning-600)]' },
  system: { icon: Bell, label: '시스템', color: 'text-[color:var(--text-primary)]' },
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
  centerId?: string | null;
  longTermCareId?: string | null;
  careGrade?: string | null;
  nextEvalDate?: string | null;
  contractEndDate?: string | null;
  daysUntilRenewal?: number | null;
  daysUntilExpiry?: number | null;
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

type CareRecordApiRecord = {
  id?: string;
  recipientId?: string | null;
  workerId?: string | null;
  recordDate?: string;
  visitTime?: string | null;
  leaveTime?: string | null;
  createdAt?: string;
  updatedAt?: string;
  condition?: string | null;
  specialNotes?: string | null;
  incidentReport?: string | null;
  worker?: {
    id?: string;
    name?: string | null;
  } | null;
  recipient?: {
    id?: string;
    name?: string | null;
  } | null;
};

type ConsultationApiRecord = {
  id?: string;
  recipientId?: string | null;
  workerId?: string | null;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  aiDraft?: string | null;
  aiEdited?: boolean | null;
  subject?: string | null;
  content?: string | null;
  result?: string | null;
  worker?: {
    id?: string;
    name?: string | null;
  } | null;
  recipient?: {
    id?: string;
    name?: string | null;
  } | null;
};

type DashboardDocumentBoard = DocumentCompleteness & {
  dueDate?: string;
  longTermCareId: string | null;
  contractEndDate: string | null;
  nextEvalDate: string | null;
  gradeLabel: string;
  sourceStatus: 'api' | 'degraded';
};

type DashboardSnapshot = {
  totalElderly: number;
  activeToday: number;
  pendingEvaluations: number;
  missingDocuments: number;
  todayVisitsCompleted: number;
  todayVisitsTotal: number;
  aiDraftsGenerated: number;
  aiDraftCoverage: number;
  workerStats: WorkerStat[];
  alerts: Alert[];
  criticalDocs: DashboardDocumentBoard[];
  partialFailure: boolean;
  notice: string | null;
  updatedAt: string | null;
};

type DashboardLoadState = {
  loading: boolean;
  snapshot: DashboardSnapshot | null;
  notice: string | null;
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

function isSameLocalDay(value?: string | null) {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function parseDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateKey(value?: string | null) {
  const date = parseDate(value);
  return date ? date.toISOString().slice(0, 10) : null;
}

function daysUntil(value?: string | null) {
  const date = parseDate(value);
  if (!date) {
    return null;
  }

  const diff = date.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
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

function normalizeRequiredDocumentStatus(status?: string, has?: boolean): RequiredDocument['status'] {
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

function buildDocumentBoard(
  recipient: RecipientApiRecord,
  completeness: CompletenessApiRecord | null,
  sourceStatus: DashboardDocumentBoard['sourceStatus']
): DashboardDocumentBoard {
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
  const completionRate =
    typeof completeness?.completionRate === 'number'
      ? completeness.completionRate
      : Math.round((completedCount / totalCount) * 100);

  const missingCritical = mappedDocuments
    .filter((document) => document.status === 'missing' || document.status === 'expired' || document.status === 'incomplete')
    .map((document) => document.name);

  const dueDate = completeness?.contractEndDate || completeness?.nextEvalDate || recipient.contractEndDate || recipient.nextEvalDate || undefined;
  const needsRenewal = Boolean(completeness?.needsRenewal);
  const overallStatus = (completeness?.overallStatus || '').toUpperCase();
  const riskLevel =
    sourceStatus === 'degraded'
      ? 'critical'
      : overallStatus === 'COMPLETE'
        ? 'low'
        : overallStatus === 'CRITICAL' || (needsRenewal && missingCritical.length > 0)
          ? 'critical'
          : missingCritical.length >= 2 || completionRate < 60
            ? 'high'
            : missingCritical.length >= 1 || completionRate < 85
              ? 'medium'
              : 'low';

  const recommendations =
    sourceStatus === 'degraded'
      ? ['완전성 데이터를 불러오지 못했습니다.']
      : missingCritical.length > 0
        ? [
            riskLevel === 'critical'
              ? '즉시 보완이 필요한 상태입니다.'
              : '이번 주 안에 보완 일정을 잡는 것이 좋습니다.',
            ...missingCritical.map((missing) => `${missing} 보완 필요`),
          ]
        : ['문서 상태가 안정적입니다.'];

  return {
    elderlyId: recipient.id || completeness?.recipientId || '',
    elderlyName: completeness?.recipientName || recipient.name || '대상자',
    evaluationCycle: needsRenewal ? '3year' : 'annual',
    completionRate,
    riskLevel,
    requiredDocuments: sourceStatus === 'degraded' ? [] : mappedDocuments,
    missingCritical: sourceStatus === 'degraded' ? ['완전성 데이터를 불러오지 못했습니다'] : missingCritical,
    aiRecommendations: recommendations,
    dueDate,
    gradeLabel: normalizeCareGradeLabel(recipient.careGrade),
    longTermCareId: recipient.longTermCareId || completeness?.longTermCareId || null,
    contractEndDate: recipient.contractEndDate || completeness?.contractEndDate || null,
    nextEvalDate: recipient.nextEvalDate || completeness?.nextEvalDate || null,
    sourceStatus,
  };
}

function buildAlert({
  type,
  severity,
  title,
  message,
  elderlyId,
  elderlyName,
  actionRequired,
  createdAt,
}: {
  type: Alert['type'];
  severity: Alert['severity'];
  title: string;
  message: string;
  elderlyId?: string;
  elderlyName?: string;
  actionRequired?: string;
  createdAt?: string;
}): Alert {
  return {
    id: `${type}-${elderlyId ?? 'system'}-${createdAt ?? new Date().toISOString()}`,
    type,
    severity,
    title,
    message,
    elderlyId,
    elderlyName,
    createdAt: createdAt ?? new Date().toISOString(),
    read: false,
    actionRequired,
  };
}

function buildAlertFromRecipient(
  kind: 'contract-renewal' | 'evaluation-expiry',
  recipient: RecipientApiRecord & { daysUntil?: number | null }
): Alert {
  const isContractRenewal = kind === 'contract-renewal';
  const dueDate = isContractRenewal ? recipient.contractEndDate : recipient.nextEvalDate;
  const days =
    recipient.daysUntil ??
    recipient.daysUntilRenewal ??
    recipient.daysUntilExpiry ??
    daysUntil(dueDate) ??
    0;
  const severity = days <= 7 ? 'critical' : days <= 21 ? 'high' : 'medium';
  const title = isContractRenewal
    ? `${recipient.name || '대상자'} 어르신 재계약 ${Math.max(days, 0)}일 남음`
    : `${recipient.name || '대상자'} 어르신 평가 ${Math.max(days, 0)}일 남음`;
  const message = isContractRenewal
    ? `계약 종료일 ${formatDateKey(dueDate) || '미확인'} 기준으로 재계약 준비가 필요합니다.`
    : `다음 평가 예정일 ${formatDateKey(dueDate) || '미확인'} 기준으로 문서와 일정을 다시 확인해 주세요.`;

  return buildAlert({
    type: 'evaluation_due',
    severity,
    title,
    message,
    elderlyId: recipient.id,
    elderlyName: recipient.name,
    actionRequired: isContractRenewal ? '재계약 서류를 준비해 주세요.' : '평가 일정을 확인해 주세요.',
  });
}

function buildSystemAlert(status: SystemStatus, partialFailure: boolean): Alert | null {
  if (status.publicDataReachable === false) {
    return buildAlert({
      type: 'system',
      severity: 'critical',
      title: '공공데이터 실연동 실패',
      message: status.note || 'public-data 상태가 unreachable 입니다.',
      actionRequired: '백엔드/Worker 연동과 공공데이터 상태를 확인해 주세요.',
      createdAt: status.checkedAt || undefined,
    });
  }

  if (partialFailure) {
    return buildAlert({
      type: 'system',
      severity: 'high',
      title: '대시보드 일부 API 실패',
      message: '일부 실데이터를 불러오지 못해 보수적으로 표시합니다.',
      actionRequired: '대시보드 원본 API 응답을 다시 확인해 주세요.',
      createdAt: status.checkedAt || undefined,
    });
  }

  return null;
}

function buildWorkerStats(records: CareRecordApiRecord[], consultations: ConsultationApiRecord[]): WorkerStat[] {
  const workerMap = new Map<
    string,
    {
      workerId: string;
      workerName: string;
      todayVisits: number;
      recordsCompleted: number;
      avgRecordTime: number;
      pendingTasks: number;
      totalDuration: number;
      durationCount: number;
      pendingConsultations: number;
    }
  >();

  for (const record of records) {
    if (!isSameLocalDay(record.recordDate || record.createdAt)) {
      continue;
    }

    const workerId = record.workerId || record.worker?.id || 'unknown';
    const workerName = record.worker?.name || '미상';
    const existing = workerMap.get(workerId) || {
      workerId,
      workerName,
      todayVisits: 0,
      recordsCompleted: 0,
      avgRecordTime: 0,
      pendingTasks: 0,
      totalDuration: 0,
      durationCount: 0,
      pendingConsultations: 0,
    };

    existing.todayVisits += 1;
    existing.recordsCompleted += 1;

    if (record.visitTime && record.leaveTime) {
      const duration = Math.max(0, Math.round((new Date(record.leaveTime).getTime() - new Date(record.visitTime).getTime()) / (1000 * 60)));
      existing.totalDuration += duration;
      existing.durationCount += 1;
    }

    workerMap.set(workerId, existing);
  }

  for (const consultation of consultations) {
    if (!isSameLocalDay(consultation.date || consultation.createdAt)) {
      continue;
    }

    if (!consultation.workerId && !consultation.worker?.id) {
      continue;
    }

    const workerId = consultation.workerId || consultation.worker?.id || 'unknown';
    const workerName = consultation.worker?.name || workerMap.get(workerId)?.workerName || '미상';
    const existing = workerMap.get(workerId) || {
      workerId,
      workerName,
      todayVisits: 0,
      recordsCompleted: 0,
      avgRecordTime: 0,
      pendingTasks: 0,
      totalDuration: 0,
      durationCount: 0,
      pendingConsultations: 0,
    };

    if (consultation.aiDraft && consultation.aiEdited !== true) {
      existing.pendingConsultations += 1;
    }

    workerMap.set(workerId, existing);
  }

  return Array.from(workerMap.values())
    .map((worker) => ({
      workerId: worker.workerId,
      workerName: worker.workerName,
      todayVisits: worker.todayVisits,
      recordsCompleted: worker.recordsCompleted,
      avgRecordTime: worker.durationCount > 0 ? Math.round(worker.totalDuration / worker.durationCount) : 0,
      pendingTasks: worker.pendingConsultations,
      status: (worker.todayVisits > 0 ? 'active' : 'inactive') as WorkerStat['status'],
    }))
    .sort((left, right) => right.todayVisits - left.todayVisits || left.workerName.localeCompare(right.workerName));
}

function buildDashboardMetrics(
  recipients: RecipientApiRecord[],
  completenessBoards: DashboardDocumentBoard[],
  records: CareRecordApiRecord[],
  consultations: ConsultationApiRecord[],
  contractRenewals: RecipientApiRecord[],
  evaluationExpiries: RecipientApiRecord[]
): Pick<
  DashboardSnapshot,
  | 'totalElderly'
  | 'activeToday'
  | 'pendingEvaluations'
  | 'missingDocuments'
  | 'todayVisitsCompleted'
  | 'todayVisitsTotal'
  | 'aiDraftsGenerated'
  | 'aiDraftCoverage'
  | 'workerStats'
> {
  const activeRecipients = recipients.filter((recipient) => recipient.id);
  const todayRecipients = new Set(
    records
      .filter((record) => isSameLocalDay(record.recordDate || record.createdAt))
      .map((record) => record.recipientId || record.recipient?.id)
      .filter((value): value is string => Boolean(value))
  );
  const todayRecords = records.filter((record) => isSameLocalDay(record.recordDate || record.createdAt));
  const aiDraftConsultations = consultations.filter((consultation) => Boolean(consultation.aiDraft));
  const completedAiDrafts = aiDraftConsultations.filter((consultation) => consultation.aiEdited !== true).length;
  const uniquePendingRecipientIds = new Set(
    [...contractRenewals, ...evaluationExpiries].map((recipient) => recipient.id).filter((value): value is string => Boolean(value))
  );
  const missingDocuments = completenessBoards.reduce(
    (sum, board) => sum + board.missingCritical.length,
    0
  );

  return {
    totalElderly: activeRecipients.length,
    activeToday: todayRecipients.size,
    pendingEvaluations: uniquePendingRecipientIds.size,
    missingDocuments,
    todayVisitsCompleted: todayRecipients.size,
    todayVisitsTotal: Math.max(activeRecipients.length, todayRecipients.size),
    aiDraftsGenerated: aiDraftConsultations.length,
    aiDraftCoverage: aiDraftConsultations.length > 0 ? Math.round((completedAiDrafts / aiDraftConsultations.length) * 100) : 0,
    workerStats: buildWorkerStats(todayRecords, consultations),
  };
}

async function loadDashboardSnapshot(apiBaseUrl: string): Promise<DashboardSnapshot> {
  const activeFilters = new URLSearchParams();
  activeFilters.set('status', 'active');

  const session = readStoredAuthSession();
  if (session?.user.center?.id) {
    activeFilters.set('centerId', session.user.center.id);
  }

  const results = await Promise.allSettled([
    requestJson<RecipientApiRecord[]>(apiBaseUrl, `/v1/recipients?${activeFilters.toString()}`),
    requestJson<CareRecordApiRecord[]>(apiBaseUrl, '/v1/care/records'),
    requestJson<ConsultationApiRecord[]>(apiBaseUrl, '/v1/care/consultations'),
    requestJson<RecipientApiRecord[]>(apiBaseUrl, '/v1/recipients/alerts/contract-renewal'),
    requestJson<RecipientApiRecord[]>(apiBaseUrl, '/v1/recipients/alerts/evaluation-expiry'),
  ]);

  const notices: string[] = [];
  const partialFailure = results.some((result) => result.status === 'rejected');

  const recipients = results[0].status === 'fulfilled' ? results[0].value ?? [] : [];
  const records = results[1].status === 'fulfilled' ? results[1].value ?? [] : [];
  const consultations = results[2].status === 'fulfilled' ? results[2].value ?? [] : [];
  const contractRenewals = results[3].status === 'fulfilled' ? results[3].value ?? [] : [];
  const evaluationExpiries = results[4].status === 'fulfilled' ? results[4].value ?? [] : [];

  if (results[0].status === 'rejected') {
    notices.push('수급자 목록을 불러오지 못했습니다.');
  }
  if (results[1].status === 'rejected') {
    notices.push('상담/기록 데이터를 불러오지 못했습니다.');
  }
  if (results[2].status === 'rejected') {
    notices.push('상담 초안 데이터를 불러오지 못했습니다.');
  }
  if (results[3].status === 'rejected') {
    notices.push('재계약 알림을 불러오지 못했습니다.');
  }
  if (results[4].status === 'rejected') {
    notices.push('평가 만료 알림을 불러오지 못했습니다.');
  }

  const completenessResults = await Promise.allSettled(
    recipients.map((recipient) =>
      recipient.id
        ? requestJson<CompletenessApiRecord>(apiBaseUrl, `/v1/extract/completeness/${recipient.id}`)
        : Promise.resolve(null)
    )
  );

  const completenessBoards: DashboardDocumentBoard[] = [];
  completenessResults.forEach((result, index) => {
    const recipient = recipients[index];
    if (!recipient) {
      return;
    }

    if (result.status === 'fulfilled') {
      completenessBoards.push(buildDocumentBoard(recipient, result.value, 'api'));
      return;
    }

    notices.push(`${recipient.name || '대상자'} 문서 완전성 데이터를 불러오지 못했습니다.`);
    completenessBoards.push(buildDocumentBoard(recipient, null, 'degraded'));
  });

  const metrics = buildDashboardMetrics(
    recipients,
    completenessBoards,
    records,
    consultations,
    contractRenewals,
    evaluationExpiries
  );

  const alerts = [
    ...contractRenewals.map((recipient) => buildAlertFromRecipient('contract-renewal', recipient)),
    ...evaluationExpiries.map((recipient) => buildAlertFromRecipient('evaluation-expiry', recipient)),
  ];

  const criticalDocs = completenessBoards
    .filter((board) => board.riskLevel === 'critical' || board.riskLevel === 'high')
    .sort((left, right) => compareRiskLevel(left.riskLevel, right.riskLevel));

  return {
    ...metrics,
    alerts,
    criticalDocs,
    partialFailure,
    notice: notices.length > 0 ? notices.join(' ') : null,
    updatedAt: new Date().toISOString(),
  };
}

export function Dashboard2026() {
  const apiBaseUrl = useMemo(() => resolveSameOriginAwareApiBaseUrl(), []);
  const { status: systemStatus } = useSystemStatus();
  const [dashboardState, setDashboardState] = useState<DashboardLoadState>({
    loading: true,
    snapshot: null,
    notice: '실데이터를 불러오는 중입니다.',
  });

  useEffect(() => {
    let cancelled = false;

    setDashboardState((current) => ({
      ...current,
      loading: true,
      notice: current.snapshot ? current.notice : '실데이터를 불러오는 중입니다.',
    }));

    loadDashboardSnapshot(apiBaseUrl)
      .then((snapshot) => {
        if (cancelled) {
          return;
        }

        setDashboardState({
          loading: false,
          snapshot,
          notice: snapshot.notice,
        });
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        setDashboardState({
          loading: false,
          snapshot: null,
          notice: error instanceof Error ? error.message : '대시보드 데이터를 불러오지 못했습니다.',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  const snapshot = dashboardState.snapshot;
  const systemAlert = useMemo(
    () => buildSystemAlert(systemStatus, Boolean(snapshot?.partialFailure)),
    [systemStatus, snapshot?.partialFailure]
  );

  const recentAlerts = useMemo(() => {
    const alerts = [...(snapshot?.alerts || [])];
    if (systemAlert) {
      alerts.push(systemAlert);
    }
    return alerts.sort(compareAlertsByPriority);
  }, [snapshot?.alerts, systemAlert]);

  const unreadAlertCount = getUnreadAlertCount(recentAlerts);
  const statusBadge = getDashboardBadge(systemStatus, Boolean(snapshot?.partialFailure));
  const checkedAtLabel = formatCheckedAt(systemStatus.checkedAt);
  const criticalAlertCount = recentAlerts.filter((alert) => alert.severity === 'critical').length;
  const highAlertCount = recentAlerts.filter((alert) => alert.severity === 'high').length;
  const criticalDocs = snapshot?.criticalDocs || [];
  const totalElderly = snapshot?.totalElderly ?? 0;
  const activeToday = snapshot?.activeToday ?? 0;
  const pendingEvaluations = snapshot?.pendingEvaluations ?? 0;
  const missingDocuments = snapshot?.missingDocuments ?? 0;
  const todayVisitsCompleted = snapshot?.todayVisitsCompleted ?? 0;
  const todayVisitsTotal = snapshot?.todayVisitsTotal ?? 0;
  const aiDraftsGenerated = snapshot?.aiDraftsGenerated ?? 0;
  const aiDraftCoverage = snapshot?.aiDraftCoverage ?? 0;
  const workerStats = snapshot?.workerStats ?? [];
  const visitCompletionRate = todayVisitsTotal > 0 ? (todayVisitsCompleted / todayVisitsTotal) * 100 : 0;
  const bannerMessage =
    dashboardState.notice ||
    (systemStatus.publicDataReachable === false
      ? '공공데이터 실연동이 실패했습니다.'
      : dashboardState.loading
        ? '실데이터를 불러오는 중입니다.'
        : null);

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="센터 운영"
        title="센터 현황 대시보드"
        description="센터 운영 지표, 문서 위험도, 시스템 연결 상태를 한 화면에서 확인합니다."
        icon={Activity}
        badge={statusBadge}
        actions={
          <span className="glass inline-flex rounded-2xl px-3 py-2 text-xs text-[color:var(--text-muted)] sm:text-sm">
            <Clock className="mr-1 inline h-4 w-4" />
            {checkedAtLabel}
          </span>
        }
      />

      {bannerMessage && (
        <InlineNotice
          title={dashboardState.loading ? '대시보드 로딩 중' : '실데이터 확인'}
          message={bannerMessage}
          tone={dashboardState.loading ? 'info' : 'warning'}
        />
      )}

      <GlassCard variant="default" className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[color:var(--text-strong)]">시스템 연결 상태</p>
            <p className="mt-1 text-sm text-[color:var(--text-muted)]">{systemStatus.note}</p>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
            <IntegrationStatusPill
              icon={Server}
              title="백엔드"
              value={getBackendPillValue(systemStatus)}
              variant={getBackendPillVariant(systemStatus)}
              meta={systemStatus.responseTimeMs !== null ? `${systemStatus.responseTimeMs}ms` : '응답 대기'}
            />
            <IntegrationStatusPill
              icon={Database}
              title="DB"
              value={getDatabasePillValue(systemStatus)}
              variant={getDatabasePillVariant(systemStatus)}
              meta={systemStatus.apiVersion ? `API v${systemStatus.apiVersion}` : '버전 미확인'}
            />
            <IntegrationStatusPill
              icon={Cloud}
              title="공공데이터"
              value={getPublicDataPillValue(systemStatus)}
              variant={getPublicDataPillVariant(systemStatus)}
              meta={checkedAtLabel}
            />
          </div>
        </div>
      </GlassCard>

      <BentoGrid columns={4} gap="md" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <BentoItem size="normal" variant="accent">
          <StatContent
            title="등록 어르신"
            value={dashboardState.loading ? '불러오는 중' : `${totalElderly}명`}
            subtitle={`오늘 활동 ${activeToday}명 · 실데이터 기준`}
            icon={Users}
            accentColor="text-[color:var(--action-700)]"
            hintLabel="센터"
            statusLabel="센터 등록 인원"
            tooltip="센터에 등록된 전체 어르신 수를 표시합니다."
          />
        </BentoItem>

        <BentoItem size="normal" variant="default">
          <StatContent
            title="오늘 방문 완료"
            value={dashboardState.loading ? '불러오는 중' : `${todayVisitsCompleted}/${todayVisitsTotal}`}
            subtitle={`오늘 기록이 있는 어르신 ${todayVisitsCompleted}명`}
            icon={Smartphone}
            progress={visitCompletionRate}
            accentColor="text-[color:var(--success-600)]"
            hintLabel="오늘"
            statusLabel={getProgressStatusLabel(visitCompletionRate)}
            tooltip="오늘 실제로 기록이 반영된 방문 수를 표시합니다."
          />
        </BentoItem>

        <BentoItem size="normal" variant={missingDocuments > 0 ? 'accent' : 'default'}>
          <StatContent
            title="평가 문서 미비"
            value={dashboardState.loading ? '불러오는 중' : `${missingDocuments}건`}
            subtitle={`평가 예정 ${pendingEvaluations}건 · 문서 보완 필요`}
            icon={FileCheck}
            alert={missingDocuments > 10}
            accentColor="text-[color:var(--warning-600)]"
            hintLabel="누적"
            statusLabel={missingDocuments > 0 ? '실제 누락 문서 반영' : '문서 상태 안정'}
            tooltip="실제 완전성 API를 기준으로 누락, 만료, 미완성 문서 수를 합산합니다."
          />
        </BentoItem>

        <BentoItem size="normal" variant="accent">
          <StatContent
            title="AI 초안 생성"
            value={dashboardState.loading ? '불러오는 중' : `${aiDraftsGenerated}건`}
            subtitle={`초안 유지율 ${aiDraftCoverage}% · 실 상담 저장 기준`}
            icon={Brain}
            accentColor="text-[color:var(--brand-700)]"
            aiBadge
            hintLabel="누적"
            statusLabel="상담/기록 초안"
            tooltip="실제 상담 저장 데이터에서 AI 초안이 포함된 건수를 표시합니다."
          />
        </BentoItem>
      </BentoGrid>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard variant="default" className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text-strong)]">
              <div className="rounded-lg bg-[var(--action-100)] p-2 text-[color:var(--action-700)]">
                <Bell className="h-5 w-5" />
              </div>
              주요 알림
            </h2>
            <div className="flex items-center gap-2">
              {unreadAlertCount > 0 && (
                <span className="rounded-full bg-[var(--danger-100)] px-2.5 py-1 text-xs font-semibold text-[color:var(--danger-600)]">
                  {unreadAlertCount}개 미확인
                </span>
              )}
              <Link to="/alerts" className="flex items-center gap-1 text-sm font-medium text-[color:var(--action-700)] hover:text-[color:var(--action-600)]">
                전체보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <PriorityPill
              priority="P0"
              label={`${criticalAlertCount}건 즉시 조치`}
              description="가장 시급한 알림이 상단에 고정됩니다."
              tone="critical"
            />
            <PriorityPill
              priority="P1"
              label={`${highAlertCount}건 당일 확인`}
              description="당일 안에 정리해야 할 알림입니다."
              tone="high"
            />
            <PriorityPill
              priority="INFO"
              label="우선순위 순 정렬"
              description="읽지 않은 알림과 심각도를 함께 반영합니다."
              tone="info"
            />
          </div>

          <div className="space-y-3">
            {recentAlerts.slice(0, 4).map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>

          {recentAlerts.length === 0 && (
            <div className="py-8 text-center text-[color:var(--text-soft)]">
              <Bell className="mx-auto mb-2 h-12 w-12 opacity-30" />
              <p>새로운 알림이 없습니다</p>
            </div>
          )}
        </GlassCard>

        <GlassCard variant="default" className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text-strong)]">
              <div className="rounded-lg bg-[var(--danger-100)] p-2 text-[color:var(--danger-600)]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              긴급 문서 보충 필요
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label={`P0 ${criticalDocs.filter((doc) => doc.riskLevel === 'critical').length}건`} variant="error" dot={false} />
              <StatusBadge label={`P1 ${criticalDocs.filter((doc) => doc.riskLevel === 'high').length}건`} variant="warning" dot={false} />
            </div>
          </div>

          <div className="space-y-3">
            {criticalDocs.slice(0, 5).map((doc) => (
              <Link
                to={buildDocumentsPath(doc.elderlyId)}
                key={doc.elderlyId}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-[rgba(181,65,53,0.16)] bg-[rgba(253,235,234,0.65)] p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      doc.riskLevel === 'critical'
                        ? 'bg-[var(--danger-100)] text-[color:var(--danger-600)] ring-2 ring-[rgba(181,65,53,0.12)]'
                        : 'bg-[var(--warning-100)] text-[color:var(--warning-600)] ring-2 ring-[rgba(183,121,31,0.12)]'
                    }`}
                  >
                    <AnimatedNumber value={doc.completionRate} suffix="%" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[color:var(--text-strong)]">{doc.elderlyName} 어르신</p>
                      <StatusBadge
                        label={doc.riskLevel === 'critical' ? 'P0 즉시 보완' : 'P1 당일 점검'}
                        variant={doc.riskLevel === 'critical' ? 'error' : 'warning'}
                        dot={false}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-[color:var(--text-muted)]">
                      {doc.missingCritical.length}개 문서 누락 · 평가일 {doc.dueDate || '-'} · 완성률 {doc.completionRate}%
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[color:var(--text-soft)] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--danger-600)]" />
              </Link>
            ))}
            {criticalDocs.length === 0 && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success-100)]">
                  <FileCheck className="h-8 w-8 text-[color:var(--success-600)]" />
                </div>
                <p className="font-medium text-[color:var(--success-600)]">모든 문서가 완료되었습니다</p>
                <p className="mt-1 text-sm text-[color:var(--text-muted)]">긴급 문서 보충 필요 없음</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard variant="large" className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text-strong)]">
            <div className="rounded-lg border border-[rgba(71,96,83,0.12)] bg-[rgba(93,119,105,0.12)] p-2 text-[color:var(--brand-700)]">
              <Heart className="h-5 w-5" />
            </div>
            오늘의 직원 활동
          </h2>
          <Link to="/elderly" className="text-sm font-medium text-[color:var(--action-700)] hover:text-[color:var(--action-600)]">
            전체 보기
          </Link>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[color:var(--border-subtle)]">
                <th className="px-4 py-3 text-left text-sm font-semibold text-[color:var(--text-muted)]">직원</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[color:var(--text-muted)]">방문 수</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[color:var(--text-muted)]">기록 완료</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[color:var(--text-muted)]">평균 시간</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[color:var(--text-muted)]">미완료</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[color:var(--text-muted)]">상태</th>
              </tr>
            </thead>
            <tbody>
              {workerStats.map((worker, idx) => (
                <tr
                  key={worker.workerId}
                  className="group border-b border-[color:var(--border-subtle)] transition-colors hover:bg-[rgba(255,255,255,0.5)]"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-accent)] bg-[var(--action-100)] text-sm font-medium text-[color:var(--action-700)] shadow-sm">
                        {worker.workerName[0]}
                      </div>
                      <span className="font-medium text-[color:var(--text-strong)]">{worker.workerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-[color:var(--text-primary)]">{worker.todayVisits}</td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold text-[color:var(--success-600)]">{worker.recordsCompleted}</span>
                      <span className="text-[color:var(--text-soft)]">/{worker.todayVisits}</span>
                    </div>
                    <div className="mx-auto mt-1 h-1 w-16 overflow-hidden rounded-full bg-[rgba(39,53,45,0.08)]">
                      <div
                        className="h-full rounded-full bg-[var(--action-600)] transition-all"
                        style={{ width: `${worker.todayVisits > 0 ? (worker.recordsCompleted / worker.todayVisits) * 100 : 0}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-[color:var(--text-primary)]">{worker.avgRecordTime}분</td>
                  <td className="text-center py-3 px-4">
                    {worker.pendingTasks > 0 ? (
                      <span className="rounded-full bg-[var(--warning-100)] px-2.5 py-1 text-sm font-medium text-[color:var(--warning-600)]">
                        {worker.pendingTasks}건
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1 font-medium text-[color:var(--success-600)]">
                        <Zap className="h-4 w-4" /> 완료
                      </span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    <WorkerStatusBadge status={worker.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {workerStats.map((worker) => (
            <WorkerActivityMobileCard key={worker.workerId} worker={worker} />
          ))}
        </div>
      </GlassCard>

      <BentoGrid columns={4} gap="md" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <QuickActionButton label="현장 기록 입력" path="/mobile-entry" color="sky" icon={Smartphone} />
        <QuickActionButton label="AI 상담 초안" path="/consultation" color="violet" icon={Sparkles} />
        <QuickActionButton label="평가 문서 확인" path="/documents" color="amber" icon={FileCheck} />
        <QuickActionButton label="어르신 관리" path="/elderly" color="emerald" icon={Users} />
      </BentoGrid>
    </div>
  );
}

// 서브 컴포넌트들
interface StatContentProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  alert?: boolean;
  progress?: number;
  accentColor: string;
  aiBadge?: boolean;
  hintLabel?: string;
  statusLabel?: string;
  tooltip?: string;
}

function StatContent({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  alert, 
  progress,
  accentColor,
  aiBadge,
  hintLabel,
  statusLabel,
  tooltip,
}: StatContentProps) {
  return (
    <div className="flex h-full flex-col" title={tooltip}>
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`rounded-xl border border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.8)] p-2.5 ${accentColor}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {aiBadge && (
          <span className="flex items-center gap-1 rounded-full bg-[rgba(93,119,105,0.12)] px-2 py-0.5 text-[10px] font-bold text-[color:var(--brand-700)]">
            <Sparkles className="h-3 w-3" /> AI
          </span>
        )}
        {alert && (
          <span className="h-2 w-2 rounded-full bg-[var(--danger-600)] animate-pulse" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <p className="text-sm text-[color:var(--text-muted)]">{title}</p>
          {hintLabel && (
            <span className="rounded-full border border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.82)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              {hintLabel}
            </span>
          )}
        </div>
        <p className={`text-2xl font-bold ${alert ? 'text-[color:var(--danger-600)]' : 'text-[color:var(--text-strong)]'}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="mt-1 text-xs text-[color:var(--text-muted)]">{subtitle}</p>
        {statusLabel && (
          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[color:var(--text-primary)]">
            <Info className="h-3.5 w-3.5 text-[color:var(--text-soft)]" />
            {statusLabel}
          </p>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(39,53,45,0.08)]">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                progress >= 80 ? 'bg-[var(--success-600)]' : progress >= 50 ? 'bg-[var(--warning-600)]' : 'bg-[var(--danger-600)]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AlertItem({ alert }: { alert: Alert }) {
  const config = alertTypeConfig[alert.type];
  const Icon = config.icon;
  const priority = getAlertPriority(alert.severity);
  const severityLabel = getSeverityLabel(alert.severity);

  return (
    <Link
      to={getAlertTarget(alert)}
      className={`flex cursor-pointer items-start gap-3 rounded-xl border border-l-4 p-4 transition-all hover:shadow-md ${severityColors[alert.severity]} ${
        alert.read ? 'opacity-60' : 'shadow-sm'
      }`}
    >
      <div className={`rounded-lg bg-[rgba(255,253,250,0.82)] p-2 ${config.color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <StatusBadge
            label={priority}
            variant={alert.severity === 'critical' ? 'error' : alert.severity === 'high' ? 'warning' : 'info'}
            dot={false}
            size="sm"
          />
          <span className="rounded bg-[rgba(255,253,250,0.82)] px-2 py-0.5 text-xs font-semibold text-[color:var(--text-primary)]">
            {config.label}
          </span>
          <span className="text-xs font-medium text-[color:var(--text-muted)]">{severityLabel}</span>
          <span className="text-xs text-[color:var(--text-soft)]">
            {new Date(alert.createdAt).toLocaleTimeString('ko-KR')}
          </span>
        </div>
        <p className="text-sm font-semibold text-[color:var(--text-strong)]">{alert.title}</p>
        <p className="line-clamp-2 text-sm text-[color:var(--text-primary)]">{alert.message}</p>
        {alert.actionRequired && (
          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[color:var(--warning-600)]">
            <Zap className="h-3 w-3" /> {alert.actionRequired}
          </p>
        )}
      </div>
      {!alert.read && (
        <span className="h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full bg-[var(--danger-600)] shadow-sm" />
      )}
    </Link>
  );
}

function WorkerStatusBadge({ status }: { status: WorkerStat['status'] }) {
  const configs = {
    active: { variant: 'success' as const, label: '근무중' },
    inactive: { variant: 'default' as const, label: '퇴근' },
    on_leave: { variant: 'warning' as const, label: '휴가' },
  };
  const config = configs[status];

  return <StatusBadge variant={config.variant} label={config.label} dot size="sm" />;
}

function QuickActionButton({ 
  label, 
  path, 
  color, 
  icon: Icon 
}: { 
  label: string; 
  path: string; 
  color: 'sky' | 'violet' | 'amber' | 'emerald';
  icon: ComponentType<{ className?: string }>;
}) {
  const colorClasses = {
    sky: 'border-[color:var(--border-accent)] bg-[var(--action-100)] text-[color:var(--action-700)] hover:bg-[rgba(223,244,244,0.95)]',
    violet: 'border-[rgba(71,96,83,0.16)] bg-[rgba(93,119,105,0.12)] text-[color:var(--brand-700)] hover:bg-[rgba(93,119,105,0.16)]',
    amber: 'border-transparent bg-[var(--warning-100)] text-[color:var(--warning-600)] hover:bg-[rgba(255,244,223,0.95)]',
    emerald: 'border-transparent bg-[var(--success-100)] text-[color:var(--success-600)] hover:bg-[rgba(231,245,236,0.95)]',
  };

  return (
    <Link
      to={path}
      className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border px-5 py-4 text-center font-semibold
        transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-md ${colorClasses[color]}
        flex flex-col items-center gap-2`}
    >
      <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.84)] p-2 transition-transform group-hover:scale-110">
        <Icon className="w-6 h-6" />
      </div>
      <span>{label}</span>
      <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </Link>
  );
}

function IntegrationStatusPill({
  icon: Icon,
  title,
  value,
  variant,
  meta,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  meta: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.84)] px-4 py-3 shadow-sm sm:min-w-[180px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] p-2 text-[color:var(--brand-700)]">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[color:var(--text-muted)]">{title}</p>
            <p className="text-sm font-semibold text-[color:var(--text-strong)]">{value}</p>
          </div>
        </div>
        <StatusBadge variant={variant} label={value} size="sm" />
      </div>
      <p className="mt-2 text-xs text-[color:var(--text-muted)]">{meta}</p>
    </div>
  );
}

function WorkerActivityMobileCard({ worker }: { worker: WorkerStat }) {
  const completionRate = worker.todayVisits > 0 ? (worker.recordsCompleted / worker.todayVisits) * 100 : 0;

  return (
    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.9)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-accent)] bg-[var(--action-100)] text-sm font-medium text-[color:var(--action-700)]">
            {worker.workerName[0]}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[color:var(--text-strong)]">{worker.workerName}</p>
            <p className="mt-1 text-xs text-[color:var(--text-muted)]">평균 기록 {worker.avgRecordTime}분</p>
          </div>
        </div>
        <WorkerStatusBadge status={worker.status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-[rgba(39,53,45,0.03)] p-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-soft)]">방문</p>
          <p className="mt-1 text-base font-semibold text-[color:var(--text-strong)]">{worker.todayVisits}건</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-soft)]">기록</p>
          <p className="mt-1 text-base font-semibold text-[color:var(--success-600)]">
            {worker.recordsCompleted}
            <span className="ml-1 text-sm font-medium text-[color:var(--text-soft)]">/ {worker.todayVisits}</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-soft)]">미완료</p>
          <p className="mt-1 text-base font-semibold text-[color:var(--warning-600)]">{worker.pendingTasks}건</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between text-xs text-[color:var(--text-muted)]">
          <span>기록 완료율</span>
          <span>{Math.round(completionRate)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(39,53,45,0.08)]">
          <div
            className="h-full rounded-full bg-[var(--action-600)]"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function getDashboardBadge(status: SystemStatus, partialFailure = false) {
  if (partialFailure) {
    return { label: '일부 API 실패', variant: 'warning' as const };
  }

  if (status.freshness === 'cached') {
    return { label: '최근 상태 기준', variant: 'info' as const };
  }

  switch (status.overall) {
    case 'healthy':
      return { label: '실연동 정상', variant: 'success' as const };
    case 'loading':
      return { label: '상태 수집 중', variant: 'info' as const };
    case 'limited':
      return { label: '제한적 확인', variant: 'warning' as const };
    case 'degraded':
      return { label: '상태 점검 필요', variant: 'warning' as const };
    case 'offline':
      return { label: '오프라인', variant: 'error' as const };
  }
}

function getBackendPillValue(status: SystemStatus) {
  if (status.freshness === 'cached') {
    return '최근 상태 기준';
  }

  if (status.overall === 'loading') {
    return '확인 중';
  }

  if (status.statusScope === 'public-worker') {
    return 'Worker 응답';
  }

  return status.backendOnline ? '연결됨' : '연결 안 됨';
}

function getAlertPriority(severity: Alert['severity']) {
  switch (severity) {
    case 'critical':
      return 'P0';
    case 'high':
      return 'P1';
    case 'medium':
      return 'P2';
    case 'low':
      return 'P3';
  }
}

function getSeverityLabel(severity: Alert['severity']) {
  switch (severity) {
    case 'critical':
      return '즉시 조치';
    case 'high':
      return '당일 확인';
    case 'medium':
      return '이번 주 점검';
    case 'low':
      return '정기 확인';
  }
}

function compareAlertsByPriority(left: Alert, right: Alert) {
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const severityGap = severityOrder[left.severity] - severityOrder[right.severity];
  if (severityGap !== 0) {
    return severityGap;
  }

  if (left.read !== right.read) {
    return left.read ? 1 : -1;
  }

  return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
}

function compareRiskLevel(left: 'critical' | 'high' | 'medium' | 'low', right: 'critical' | 'high' | 'medium' | 'low') {
  const riskOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return riskOrder[left] - riskOrder[right];
}

function getProgressStatusLabel(progress: number) {
  if (progress >= 80) {
    return '안정 구간';
  }
  if (progress >= 50) {
    return '주의 구간';
  }
  return '즉시 확인 필요';
}

function PriorityPill({
  priority,
  label,
  description,
  tone,
}: {
  priority: string;
  label: string;
  description: string;
  tone: 'critical' | 'high' | 'info';
}) {
  const toneClasses = {
    critical: 'border-[rgba(181,65,53,0.16)] bg-[rgba(253,235,234,0.72)] text-[color:var(--danger-600)]',
    high: 'border-[rgba(183,121,31,0.16)] bg-[rgba(255,244,223,0.88)] text-[color:var(--warning-600)]',
    info: 'border-[color:var(--border-accent)] bg-[var(--action-100)] text-[color:var(--action-700)]',
  };
  const toneIcon = {
    critical: ShieldAlert,
    high: AlertCircle,
    info: BadgeCheck,
  };
  const Icon = toneIcon[tone];

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneClasses[tone]}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-[0.18em]">{priority}</span>
      </div>
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-xs opacity-80">{description}</p>
    </div>
  );
}

function getBackendPillVariant(status: SystemStatus) {
  if (status.freshness === 'cached') {
    return 'info' as const;
  }

  if (status.overall === 'loading') {
    return 'info' as const;
  }

  if (status.statusScope === 'public-worker') {
    return 'info' as const;
  }

  return status.backendOnline ? 'success' as const : 'error' as const;
}

function getDatabasePillValue(status: SystemStatus) {
  if (status.databaseConnected === null) {
    return status.statusScope === 'public-worker' ? '미확인' : '확인 중';
  }

  if (status.freshness === 'cached') {
    return status.databaseConnected ? '최근 정상' : '최근 점검 필요';
  }

  return status.databaseConnected ? '정상' : '점검 필요';
}

function getDatabasePillVariant(status: SystemStatus) {
  if (status.databaseConnected === null) {
    return status.statusScope === 'public-worker' ? 'warning' as const : 'info' as const;
  }

  if (status.freshness === 'cached') {
    return 'info' as const;
  }

  return status.databaseConnected ? 'success' as const : 'warning' as const;
}

function getPublicDataPillValue(status: SystemStatus) {
  if (status.publicDataApiKeyConfigured === false) {
    return '키 미설정';
  }

  if (status.publicDataReachable === null) {
    return status.statusScope === 'public-worker' ? '미확인' : '확인 중';
  }

  if (status.freshness === 'cached') {
    return status.publicDataReachable ? '최근 정상' : '최근 실패';
  }

  return status.publicDataReachable ? '연결 가능' : '연결 실패';
}

function getPublicDataPillVariant(status: SystemStatus) {
  if (status.publicDataApiKeyConfigured === false) {
    return 'warning' as const;
  }

  if (status.publicDataReachable === null) {
    return status.statusScope === 'public-worker' ? 'warning' as const : 'info' as const;
  }

  if (status.freshness === 'cached') {
    return 'info' as const;
  }

  return status.publicDataReachable ? 'success' as const : 'error' as const;
}

function formatCheckedAt(checkedAt: string | null) {
  if (!checkedAt) {
    return '점검 대기';
  }

  return `최근 점검 ${new Date(checkedAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
