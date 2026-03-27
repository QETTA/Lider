// LIDER B2B AI 플랫폼 타입 정의

// 사용자 (사회복지사/센터장)
export interface User {
  id: string;
  name: string;
  role: 'care_worker' | 'manager' | 'admin';
  centerId: string;
  avatar?: string;
}

// 어르신 (수급자)
export interface Elderly {
  id: string;
  name: string;
  age: number;
  grade: '1' | '2' | '3' | '4' | '5' | '6'; // 장기요양 등급
  type: 'visit' | 'facility' | 'daycare';
  phone?: string;
  address?: string;
  registrationDate: string;
  nextEvaluationDate?: string;
  status: 'active' | 'inactive' | 'pending';
  caregiverIds: string[];
}

// 평가 문서 완전성
export interface DocumentCompleteness {
  elderlyId: string;
  elderlyName: string;
  evaluationCycle: '3year' | 'annual' | 'change';
  completionRate: number; // 0-100%
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  requiredDocuments: RequiredDocument[];
  missingCritical: string[];
  aiRecommendations: string[];
  dueDate?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  status: 'complete' | 'missing' | 'expired' | 'incomplete' | 'pending_review';
  dueDate?: string;
  lastUpdated?: string;
  updatedBy?: string;
  category: 'evaluation' | 'medical' | 'contract' | 'consent';
}

// 일일 케어 기록 (Mobile Entry)
export interface DailyCareRecord {
  recordId: string;
  elderlyId: string;
  elderlyName: string;
  visitDate: string;
  caregiverId: string;
  caregiverName: string;
  records: CareDetail[];
  handoverNotes?: string;
  nextVisitPlanned?: string;
  status: 'draft' | 'completed' | 'synced';
  createdAt: string;
  updatedAt: string;
}

export interface CareDetail {
  id: string;
  type: 'activity_participation' | 'fluid_intake' | 'daily_care' | 'medication' | 'mood' | 'special_note';
  content: string;
  timestamp: string;
  voiceTranscript?: string;
  aiDrafted: boolean;
  verified: boolean;
  metadata?: {
    participationLevel?: 'low' | 'medium' | 'high';
    fluidCups?: number;
    moodLevel?: 'happy' | 'neutral' | 'sad' | 'anxious';
    duration?: number; // 분 단위
  };
}

// 상담 기록 AI 초안
export interface ConsultationDraft {
  consultationId: string;
  elderlyId: string;
  elderlyName: string;
  socialWorkerId: string;
  socialWorkerName: string;
  consultationDate: string;
  rawInput: {
    voiceTranscript?: string;
    quickNotes?: string;
    photos?: string[];
  };
  aiDraft: {
    summary: string;
    keyIssues: string[];
    recommendedActions: string[];
    followUpNeeded: boolean;
  };
  accuracyScore: number; // 0-100
  domainConfidence: 'high' | 'medium' | 'low';
  correctionsNeeded: string[];
  finalVersion?: string;
  status: 'draft' | 'reviewed' | 'finalized';
}

// 대시보드 통계
export interface DashboardStats {
  totalElderly: number;
  activeToday: number;
  pendingEvaluations: number;
  missingDocuments: number;
  todayVisitsCompleted: number;
  todayVisitsTotal: number;
  aiDraftsGenerated: number;
  aiDraftAccuracy: number;
  workerStats: WorkerStat[];
  recentAlerts: Alert[];
}

export interface WorkerStat {
  workerId: string;
  workerName: string;
  todayVisits: number;
  recordsCompleted: number;
  avgRecordTime: number; // 분 단위
  pendingTasks: number;
  status: 'active' | 'inactive' | 'on_leave';
}

export interface Alert {
  id: string;
  type: 'evaluation_due' | 'document_missing' | 'abnormal_vital' | 'handover_gap' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  elderlyId?: string;
  elderlyName?: string;
  createdAt: string;
  read: boolean;
  actionRequired?: string;
}

// AI 추출 결과
export interface ExtractResult {
  id: string;
  elderlyId?: string;
  docType: 'evaluation_form' | 'diagnosis' | 'medical_opinion' | 'contract' | 'consent' | 'other';
  fields: Record<string, string | number | boolean>;
  warnings: string[];
  needsReview: boolean;
  confidence: number;
  extractedAt: string;
  reviewedAt?: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// 모바일 엔트리 퀵 입력 옵션
export interface QuickTapOption {
  id: string;
  label: string;
  emoji: string;
  value: string | number;
  color: string;
}
