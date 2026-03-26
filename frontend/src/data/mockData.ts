// LIDER MVP 목업 데이터
import type {
  Elderly,
  DocumentCompleteness,
  DailyCareRecord,
  ConsultationDraft,
  DashboardStats,
  Alert,
  QuickTapOption,
} from '../types';

// 어르신 목업 데이터
export const mockElderly: Elderly[] = [
  {
    id: 'E001',
    name: '김순자',
    age: 78,
    grade: '2',
    type: 'visit',
    phone: '010-1234-5678',
    address: '의정부시 가능동 123-45',
    registrationDate: '2023-01-15',
    nextEvaluationDate: '2026-05-20',
    status: 'active',
    caregiverIds: ['W001', 'W002'],
  },
  {
    id: 'E002',
    name: '박영호',
    age: 82,
    grade: '3',
    type: 'visit',
    phone: '010-2345-6789',
    address: '의정부시 의정부동 456-78',
    registrationDate: '2022-08-20',
    nextEvaluationDate: '2025-08-20',
    status: 'active',
    caregiverIds: ['W001'],
  },
  {
    id: 'E003',
    name: '이춘자',
    age: 75,
    grade: '1',
    type: 'daycare',
    phone: '010-3456-7890',
    address: '경북 구미시 원평동 789-12',
    registrationDate: '2024-02-10',
    nextEvaluationDate: '2027-02-10',
    status: 'active',
    caregiverIds: ['W003'],
  },
  {
    id: 'E004',
    name: '최금순',
    age: 85,
    grade: '4',
    type: 'visit',
    phone: '010-4567-8901',
    address: '경북 구미시 형곡동 234-56',
    registrationDate: '2021-06-01',
    nextEvaluationDate: '2024-06-01',
    status: 'active',
    caregiverIds: ['W002', 'W003'],
  },
  {
    id: 'E005',
    name: '정옥자',
    age: 80,
    grade: '2',
    type: 'visit',
    phone: '010-5678-9012',
    address: '의정부시 신곡동 567-89',
    registrationDate: '2023-09-12',
    nextEvaluationDate: '2026-09-12',
    status: 'active',
    caregiverIds: ['W001'],
  },
];

// 평가 문서 완전성 데이터
export const mockDocumentCompleteness: DocumentCompleteness[] = [
  {
    elderlyId: 'E004',
    elderlyName: '최금순',
    evaluationCycle: '3year',
    completionRate: 45,
    riskLevel: 'critical',
    requiredDocuments: [
      { id: 'D001', name: '장기요양 인정신청서', status: 'complete', category: 'evaluation', lastUpdated: '2024-01-10' },
      { id: 'D002', name: '의사소견서', status: 'expired', category: 'medical', dueDate: '2024-03-01' },
      { id: 'D003', name: '수급자 신분증 사본', status: 'complete', category: 'contract' },
      { id: 'D004', name: '가족관계증명서', status: 'missing', category: 'contract', dueDate: '2024-03-15' },
      { id: 'D005', name: '건강검진결과서', status: 'incomplete', category: 'medical', dueDate: '2024-03-20' },
    ],
    missingCritical: ['가족관계증명서', '건강검진결과서', '의사소견서'],
    aiRecommendations: ['의사소견서 유효기간 만료 임박 (3일)', '가족관계증명서 발급 필요'],
    dueDate: '2024-06-01',
  },
  {
    elderlyId: 'E002',
    elderlyName: '박영호',
    evaluationCycle: 'annual',
    completionRate: 78,
    riskLevel: 'medium',
    requiredDocuments: [
      { id: 'D006', name: '방문요양 계획서', status: 'complete', category: 'evaluation' },
      { id: 'D007', name: '욕창예방 교육이수증', status: 'missing', category: 'consent', dueDate: '2024-04-01' },
      { id: 'D008', name: '개인정보 수집동의서', status: 'complete', category: 'consent' },
    ],
    missingCritical: ['욕창예방 교육이수증'],
    aiRecommendations: ['욕창예방 교육 4월 1일까지 완료 필요'],
    dueDate: '2024-08-20',
  },
  {
    elderlyId: 'E001',
    elderlyName: '김순자',
    evaluationCycle: 'annual',
    completionRate: 95,
    riskLevel: 'low',
    requiredDocuments: [
      { id: 'D009', name: '방문요양 계획서', status: 'complete', category: 'evaluation', lastUpdated: '2024-01-15' },
      { id: 'D010', name: '의사소견서', status: 'complete', category: 'medical', lastUpdated: '2024-01-10' },
      { id: 'D011', name: '수급자 신분증', status: 'complete', category: 'contract' },
    ],
    missingCritical: [],
    aiRecommendations: ['모든 필수 문서 완료. 다음 평가일: 2026-05-20'],
    dueDate: '2026-05-20',
  },
];

// 일일 케어 기록
export const mockDailyCareRecords: DailyCareRecord[] = [
  {
    recordId: 'R001',
    elderlyId: 'E001',
    elderlyName: '김순자',
    visitDate: '2024-03-25',
    caregiverId: 'W001',
    caregiverName: '박미영',
    records: [
      {
        id: 'C001',
        type: 'activity_participation',
        content: '오전 체조 프로그램 참여도 높음. 미술 활동에서 색칠하기 완성.',
        timestamp: '2024-03-25T10:30:00',
        aiDrafted: true,
        verified: true,
        metadata: { participationLevel: 'high', duration: 45 },
      },
      {
        id: 'C002',
        type: 'fluid_intake',
        content: '물 4컵, 주스 1컵 섭취. 평소보다 수분 섭취량 증가.',
        timestamp: '2024-03-25T11:00:00',
        aiDrafted: false,
        verified: true,
        metadata: { fluidCups: 5 },
      },
    ],
    handoverNotes: '내일 가족 면회 예정. 기분 좋은 상태로 보임.',
    nextVisitPlanned: '2024-03-26',
    status: 'completed',
    createdAt: '2024-03-25T09:00:00',
    updatedAt: '2024-03-25T17:00:00',
  },
  {
    recordId: 'R002',
    elderlyId: 'E004',
    elderlyName: '최금순',
    visitDate: '2024-03-25',
    caregiverId: 'W002',
    caregiverName: '김수진',
    records: [
      {
        id: 'C003',
        type: 'daily_care',
        content: '목욕 보조 완료. 피부 상태 양호.',
        timestamp: '2024-03-25T14:00:00',
        aiDrafted: true,
        verified: true,
      },
      {
        id: 'C004',
        type: 'mood',
        content: '오후부터 불안감 호소. 가족에게 전화하고 싶어함.',
        timestamp: '2024-03-25T15:30:00',
        aiDrafted: false,
        verified: false,
        metadata: { moodLevel: 'anxious' },
      },
    ],
    handoverNotes: '불안 상태 지속 시 사회복지사 상담 필요',
    status: 'draft',
    createdAt: '2024-03-25T13:00:00',
    updatedAt: '2024-03-25T16:00:00',
  },
];

// 상담 AI 초안
export const mockConsultationDrafts: ConsultationDraft[] = [
  {
    consultationId: 'CON001',
    elderlyId: 'E001',
    elderlyName: '김순자',
    socialWorkerId: 'S001',
    socialWorkerName: '이지영',
    consultationDate: '2024-03-25',
    rawInput: {
      voiceTranscript: '어르신이 요즘 밤에 잠을 잘 못 주무시고 자주 깨신대요. 낮에는 잠을 자시고 밤에는 계속 뒤척이신다고 하셔서 걱정이에요. 식사는 잘 하시는데 수면 패턴이 많이 깨졌어요.',
    },
    aiDraft: {
      summary: '김순자 어르신 수면 장애 호소. 낮잠 증가로 밤 수면 질 저하.',
      keyIssues: ['수면-각성 주기 변화', '야간 불면', '낮 과다수면'],
      recommendedActions: ['수면 일지 작성 권유', '가족 상담: 수면 환경 조성', '필요시 의료기관 연계'],
      followUpNeeded: true,
    },
    accuracyScore: 92,
    domainConfidence: 'high',
    correctionsNeeded: [],
    status: 'reviewed',
  },
  {
    consultationId: 'CON002',
    elderlyId: 'E004',
    elderlyName: '최금순',
    socialWorkerId: 'S001',
    socialWorkerName: '이지영',
    consultationDate: '2024-03-24',
    rawInput: {
      voiceTranscript: '최금순 어르신이 평가 서류 준비하라고 계속 말씀하시는데 아직 의사소견서랑 가족증명서 못 가져오셨어요. 딸분이랑 통화했는데 이번 주에는 바빠서 다음 주에 가져오신다고 하셨어요.',
    },
    aiDraft: {
      summary: '최금순 어르신 평가 서류 미비. 의사소견서 및 가족관계증명서 수령 지연.',
      keyIssues: ['평가 문서 미비', '가족 협조 지연'],
      recommendedActions: ['딸과 재통화하여 구체적 수령일 확정', '미수령 시 대체 서류 안내', '평가일 조정 검토'],
      followUpNeeded: true,
    },
    accuracyScore: 88,
    domainConfidence: 'high',
    correctionsNeeded: ['딸 → 딸(가족)으로 수정 필요'],
    status: 'draft',
  },
];

// 대시보드 통계
export const mockDashboardStats: DashboardStats = {
  totalElderly: 33,
  activeToday: 28,
  pendingEvaluations: 5,
  missingDocuments: 12,
  todayVisitsCompleted: 18,
  todayVisitsTotal: 28,
  aiDraftsGenerated: 45,
  aiDraftAccuracy: 91,
  workerStats: [
    { workerId: 'W001', workerName: '박미영', todayVisits: 4, recordsCompleted: 4, avgRecordTime: 8, pendingTasks: 0, status: 'active' },
    { workerId: 'W002', workerName: '김수진', todayVisits: 5, recordsCompleted: 3, avgRecordTime: 12, pendingTasks: 2, status: 'active' },
    { workerId: 'W003', workerName: '이정희', todayVisits: 3, recordsCompleted: 3, avgRecordTime: 7, pendingTasks: 0, status: 'active' },
    { workerId: 'W004', workerName: '최영수', todayVisits: 6, recordsCompleted: 5, avgRecordTime: 9, pendingTasks: 1, status: 'active' },
    { workerId: 'W005', workerName: '한미숙', todayVisits: 0, recordsCompleted: 0, avgRecordTime: 0, pendingTasks: 0, status: 'on_leave' },
  ],
  recentAlerts: [
    {
      id: 'A001',
      type: 'evaluation_due',
      severity: 'critical',
      title: '최금순 어르신 평가 만료 임박',
      message: '3년 재계약 평가일이 70일 남았습니다. 누락된 문서 3건이 있습니다.',
      elderlyId: 'E004',
      elderlyName: '최금순',
      createdAt: '2024-03-25T08:00:00',
      read: false,
      actionRequired: '문서 보충 필요',
    },
    {
      id: 'A002',
      type: 'document_missing',
      severity: 'high',
      title: '박영호 어르신 서류 미비',
      message: '욕창예방 교육이수증이 누락되었습니다.',
      elderlyId: 'E002',
      elderlyName: '박영호',
      createdAt: '2024-03-24T14:30:00',
      read: false,
      actionRequired: '교육 일정 등록',
    },
    {
      id: 'A003',
      type: 'handover_gap',
      severity: 'medium',
      title: '핸드오버 누락 알림',
      message: '어제 퇴근한 김수진 요양보호사의 핸드오버 노트가 미작성되었습니다.',
      createdAt: '2024-03-25T09:00:00',
      read: true,
    },
  ],
};

// 알림 데이터
export const mockAlerts: Alert[] = mockDashboardStats.recentAlerts;

// 모바일 퀵 입력 옵션
export const quickTapOptions: QuickTapOption[] = [
  // 활동 참여도
  { id: 'part_high', label: '적극 참여', emoji: '☀️', value: 'high', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 'part_med', label: '보통 참여', emoji: '⛅', value: 'medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { id: 'part_low', label: '소극적', emoji: '☁️', value: 'low', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  // 수분 섭취
  { id: 'fluid_5', label: '5컵 이상', emoji: '💧💧💧', value: 5, color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'fluid_3', label: '3-4컵', emoji: '💧💧', value: 3, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'fluid_1', label: '1-2컵', emoji: '💧', value: 1, color: 'bg-orange-100 text-orange-700 border-orange-300' },
  // 기분 상태
  { id: 'mood_happy', label: '좋음', emoji: '😊', value: 'happy', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 'mood_neutral', label: '보통', emoji: '😐', value: 'neutral', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { id: 'mood_sad', label: '우울', emoji: '😢', value: 'sad', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'mood_anxious', label: '불안', emoji: '😰', value: 'anxious', color: 'bg-red-100 text-red-700 border-red-300' },
  // 식사
  { id: 'meal_full', label: '다 먹음', emoji: '🍚', value: 'full', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 'meal_half', label: '반만 먹음', emoji: '🍙', value: 'half', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { id: 'meal_little', label: '조금', emoji: '🥄', value: 'little', color: 'bg-orange-100 text-orange-700 border-orange-300' },
];
