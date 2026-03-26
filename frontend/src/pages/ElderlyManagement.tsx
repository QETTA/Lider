import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  ClipboardList,
  FileText,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { mockDailyCareRecords, mockDocumentCompleteness, mockElderly } from '../data/mockData';
import type { DailyCareRecord, Elderly } from '../types';
import { InlineNotice, MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';

const controlClass =
  'focus-ring w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)] shadow-sm transition';

const managementTabs = ['overview', 'records', 'documents', 'handover'] as const;

export function ElderlyManagement() {
  const [searchParams] = useSearchParams();
  const requestedElderlyId = searchParams.get('elderlyId') ?? '';
  const requestedTab = searchParams.get('tab');
  const [elderlyList, setElderlyList] = useState<Elderly[]>(() => mockElderly);
  const [careRecords, setCareRecords] = useState<DailyCareRecord[]>(() => mockDailyCareRecords);
  const [selectedElderly, setSelectedElderly] = useState<Elderly | null>(() => mockElderly.find((elderly) => elderly.id === requestedElderlyId) || mockElderly[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'documents' | 'handover'>(
    isManagementTab(requestedTab) ? requestedTab : 'overview'
  );
  const [notice, setNotice] = useState<{ title: string; message: string; tone: 'success' | 'info' } | null>(null);
  const [showRegisterPanel, setShowRegisterPanel] = useState(false);
  const [showHandoverComposer, setShowHandoverComposer] = useState(false);
  const [handoverDraft, setHandoverDraft] = useState('');
  const [registerDraft, setRegisterDraft] = useState<{
    name: string;
    grade: Elderly['grade'];
    status: Elderly['status'];
    phone: string;
    address: string;
  }>({
    name: '',
    grade: '3',
    status: 'active',
    phone: '',
    address: '',
  });

  const filteredElderly = useMemo(
    () =>
      elderlyList.filter((elderly) => {
        const matchesSearch =
          elderly.name.includes(searchQuery) || elderly.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGrade = filterGrade === 'all' || elderly.grade === filterGrade;
        const matchesStatus = filterStatus === 'all' || elderly.status === filterStatus;
        return matchesSearch && matchesGrade && matchesStatus;
      }),
    [elderlyList, filterGrade, filterStatus, searchQuery]
  );

  useEffect(() => {
    if (!selectedElderly) {
      setSelectedElderly(filteredElderly[0] || null);
      return;
    }

    const stillVisible = filteredElderly.some((elderly) => elderly.id === selectedElderly.id);
    if (!stillVisible) {
      setSelectedElderly(filteredElderly[0] || null);
      setActiveTab('overview');
    }
  }, [filteredElderly, selectedElderly]);

  const elderlyRecords = careRecords.filter((record) => record.elderlyId === selectedElderly?.id);
  const elderlyDocuments = mockDocumentCompleteness.find((document) => document.elderlyId === selectedElderly?.id);
  const pendingDocs = elderlyDocuments?.requiredDocuments.filter((document) => document.status !== 'complete').length || 0;
  const overdueRisk = elderlyDocuments?.riskLevel === 'critical' || elderlyDocuments?.riskLevel === 'high';

  const handleRegister = () => {
    const name = registerDraft.name.trim();
    if (!name) {
      return;
    }

    const nextId = `E${String(
      elderlyList.reduce((maxId, elderly) => {
        const numericId = Number.parseInt(elderly.id.replace('E', ''), 10);
        return Number.isNaN(numericId) ? maxId : Math.max(maxId, numericId);
      }, 0) + 1
    ).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const createdElderly: Elderly = {
      id: nextId,
      name,
      age: 80,
      grade: registerDraft.grade,
      type: 'visit',
      phone: registerDraft.phone || undefined,
      address: registerDraft.address || undefined,
      registrationDate: today,
      status: registerDraft.status,
      caregiverIds: [],
    };

    setElderlyList((current) => [createdElderly, ...current]);
    setSelectedElderly(createdElderly);
    setActiveTab('overview');
    setFilterGrade('all');
    setFilterStatus('all');
    setSearchQuery('');
    setShowRegisterPanel(false);
    setRegisterDraft({
      name: '',
      grade: '3',
      status: 'active',
      phone: '',
      address: '',
    });
    setNotice({
      title: '어르신 등록 완료',
      message: `${createdElderly.name} 어르신을 로컬 운영 보드에 추가하고 상세 화면으로 이동했습니다.`,
      tone: 'success',
    });
  };

  const handleCreateHandover = () => {
    if (!selectedElderly || !handoverDraft.trim()) {
      return;
    }

    const now = new Date();
    const nextRecord: DailyCareRecord = {
      recordId: `R${Date.now()}`,
      elderlyId: selectedElderly.id,
      elderlyName: selectedElderly.name,
      visitDate: now.toISOString().split('T')[0],
      caregiverId: 'M001',
      caregiverName: '이순옥',
      records: [
        {
          id: `C${Date.now()}`,
          type: 'special_note',
          content: '핸드오버 메모 작성됨',
          timestamp: now.toISOString(),
          aiDrafted: false,
          verified: true,
        },
      ],
      handoverNotes: handoverDraft.trim(),
      status: 'completed',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    setCareRecords((current) => [nextRecord, ...current]);
    setHandoverDraft('');
    setShowHandoverComposer(false);
    setNotice({
      title: '핸드오버 저장 완료',
      message: `${selectedElderly.name} 어르신 핸드오버 메모를 최근 기록에 추가했습니다.`,
      tone: 'success',
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="수급자 관리"
        title="어르신 관리 및 핸드오버"
        description="목록, 상세, 기록, 문서, 핸드오버를 같은 뷰 안에서 넘길 수 있도록 운영용 워크스페이스 형태로 정리했습니다."
        icon={Users}
        badge={{ label: `${filteredElderly.length}명 조회`, variant: 'info' }}
        actions={
          <button
            onClick={() => {
              setShowRegisterPanel((current) => !current);
              setNotice(null);
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--action-600)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--action-700)]"
          >
            <Plus className="h-4 w-4" />
            {showRegisterPanel ? '등록 패널 닫기' : '어르신 등록'}
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricTile label="전체 수급자" value={elderlyList.length} meta="활성 + 대기 포함" icon={Users} tone="emerald" />
        <MetricTile label="현재 선택" value={selectedElderly?.name || '-'} meta={selectedElderly ? `${selectedElderly.grade}등급` : '선택 없음'} icon={FileText} tone="sky" />
        <MetricTile label="최근 기록" value={elderlyRecords.length} meta="선택 대상 기준" icon={ClipboardList} tone="violet" />
        <MetricTile label="미완료 문서" value={`${pendingDocs}건`} meta={elderlyDocuments ? `완성률 ${elderlyDocuments.completionRate}%` : '문서 정보 없음'} icon={AlertCircle} tone="amber" />
      </div>

      {notice && <InlineNotice title={notice.title} message={notice.message} tone={notice.tone} />}

      {showRegisterPanel && (
        <SectionCard title="어르신 등록 패널" description="새 대상자를 로컬 운영 보드에 추가하고 즉시 상세 화면으로 이동합니다." icon={Plus}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="text"
              value={registerDraft.name}
              onChange={(event) => setRegisterDraft((current) => ({ ...current, name: event.target.value }))}
              placeholder="어르신 이름"
              className={controlClass}
            />
            <input
              type="text"
              value={registerDraft.phone}
              onChange={(event) => setRegisterDraft((current) => ({ ...current, phone: event.target.value }))}
              placeholder="연락처"
              className={controlClass}
            />
            <select
              value={registerDraft.grade}
              onChange={(event) =>
                setRegisterDraft((current) => ({ ...current, grade: event.target.value as Elderly['grade'] }))
              }
              className={controlClass}
            >
              <option value="1">1등급</option>
              <option value="2">2등급</option>
              <option value="3">3등급</option>
              <option value="4">4등급</option>
              <option value="5">5등급</option>
              <option value="6">6등급</option>
            </select>
            <select
              value={registerDraft.status}
              onChange={(event) =>
                setRegisterDraft((current) => ({ ...current, status: event.target.value as Elderly['status'] }))
              }
              className={controlClass}
            >
              <option value="active">이용중</option>
              <option value="pending">대기</option>
              <option value="inactive">퇴소</option>
            </select>
            <input
              type="text"
              value={registerDraft.address}
              onChange={(event) => setRegisterDraft((current) => ({ ...current, address: event.target.value }))}
              placeholder="주소"
              className="focus-ring w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)] shadow-sm transition md:col-span-2"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRegister}
              disabled={!registerDraft.name.trim()}
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--brand-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-800)] disabled:cursor-not-allowed disabled:bg-[rgba(39,53,45,0.16)]"
            >
              <Plus className="h-4 w-4" />
              등록 저장
            </button>
            <button
              onClick={() => setShowRegisterPanel(false)}
              className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:bg-[var(--surface-soft)]"
            >
              닫기
            </button>
          </div>
        </SectionCard>
      )}

      {selectedElderly && overdueRisk && elderlyDocuments && (
        <InlineNotice
          title="문서 보완 우선 대상"
          message={`${selectedElderly.name} 어르신은 현재 ${elderlyDocuments.riskLevel === 'critical' ? '긴급' : '높음'} 위험도로 분류되어 평가 문서 보완을 우선 처리하는 것이 좋습니다.`}
          tone="warning"
        />
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.15fr]">
        <div className="space-y-6">
          <SectionCard title="어르신 목록" description="검색과 필터를 목록 상단에 두고, 선택 카드는 강조 색으로 구분해 빠르게 이동할 수 있게 바꿨습니다." icon={Search}>
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-soft)]" />
                <input
                  type="text"
                  placeholder="이름 또는 ID 검색..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className={`${controlClass} pl-11`}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <select value={filterGrade} onChange={(event) => setFilterGrade(event.target.value)} className={controlClass}>
                  <option value="all">모든 등급</option>
                  <option value="1">1등급</option>
                  <option value="2">2등급</option>
                  <option value="3">3등급</option>
                  <option value="4">4등급</option>
                  <option value="5">5등급</option>
                  <option value="6">6등급</option>
                </select>
                <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className={controlClass}>
                  <option value="all">모든 상태</option>
                  <option value="active">이용중</option>
                  <option value="inactive">퇴소</option>
                  <option value="pending">대기</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredElderly.map((elderly) => (
                <button
                  key={elderly.id}
                  onClick={() => {
                    setSelectedElderly(elderly);
                    setActiveTab('overview');
                  }}
                  className={`w-full rounded-3xl border p-4 text-left transition-all ${
                    selectedElderly?.id === elderly.id
                      ? 'border-[color:var(--border-accent)] bg-[var(--action-100)] shadow-md'
                      : 'border-[color:var(--border-subtle)] bg-[var(--surface-strong)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-soft)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border-accent)] bg-[var(--action-100)] text-sm font-semibold text-[color:var(--action-700)]">
                      {elderly.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-[color:var(--text-strong)]">{elderly.name}</p>
                        <StatusBadge label={`${elderly.grade}등급`} variant="info" />
                        <StatusBadge
                          label={elderly.status === 'active' ? '이용중' : elderly.status === 'pending' ? '대기' : '퇴소'}
                          variant={elderly.status === 'active' ? 'success' : elderly.status === 'pending' ? 'warning' : 'offline'}
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-[color:var(--text-muted)]">
                        <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{elderly.phone || '전화 미등록'}</span>
                        <span>{elderly.id}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {filteredElderly.length === 0 && (
                <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.72)] px-6 py-12 text-center text-sm text-[color:var(--text-muted)]">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          {selectedElderly ? (
            <>
              <SectionCard
                title={selectedElderly.name}
                description="개요, 케어 기록, 문서, 핸드오버를 탭으로 나눠 필요한 정보만 빠르게 읽을 수 있게 했습니다."
                icon={Users}
                action={<StatusBadge label={`${selectedElderly.grade}등급`} variant="success" />}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">연락처</p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">{selectedElderly.phone || '미등록'}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">다음 평가일</p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">{selectedElderly.nextEvaluationDate || '미정'}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">주소</p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">{selectedElderly.address?.split(' ').slice(0, 2).join(' ') || '미등록'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'overview', label: '개요' },
                    { id: 'records', label: '케어 기록' },
                    { id: 'documents', label: '평가 문서' },
                    { id: 'handover', label: '핸드오버' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-[var(--brand-900)] text-white'
                          : 'bg-[var(--surface-strong)] text-[color:var(--text-primary)] hover:bg-[var(--surface-soft)] hover:text-[color:var(--text-strong)]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                      <p className="text-sm font-semibold text-[color:var(--text-strong)]">기본 정보</p>
                      <div className="mt-3 space-y-3 text-sm text-[color:var(--text-primary)]">
                        <div className="flex items-start gap-2">
                          <Calendar className="mt-0.5 h-4 w-4 text-[color:var(--text-soft)]" />
                          <span>등록일 {selectedElderly.registrationDate}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--text-soft)]" />
                          <span>{selectedElderly.address || '주소 미등록'}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="mt-0.5 h-4 w-4 text-[color:var(--text-soft)]" />
                          <span>{selectedElderly.phone || '전화번호 미등록'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                      <p className="text-sm font-semibold text-[color:var(--text-strong)]">최근 활동 요약</p>
                      <div className="mt-3 space-y-3">
                        {elderlyRecords.slice(0, 3).map((record) => (
                          <div key={record.recordId} className="rounded-2xl bg-[var(--surface-soft)] px-4 py-3">
                            <p className="text-sm font-semibold text-[color:var(--text-strong)]">{record.visitDate} · {record.caregiverName}</p>
                            <p className="mt-1 text-sm text-[color:var(--text-primary)] line-clamp-2">{record.records[0]?.content}</p>
                          </div>
                        ))}
                        {elderlyRecords.length === 0 && <p className="text-sm text-[color:var(--text-muted)]">최근 기록이 없습니다.</p>}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'records' && (
                  <div className="space-y-3">
                    {elderlyRecords.map((record) => (
                          <div key={record.recordId} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-[color:var(--text-strong)]">{record.visitDate} · {record.caregiverName}</p>
                          <StatusBadge label={record.status === 'completed' ? '완료' : '작성 중'} variant={record.status === 'completed' ? 'success' : 'warning'} />
                        </div>
                        <div className="mt-3 space-y-2">
                          {record.records.map((detail) => (
                            <div key={detail.id} className="rounded-2xl bg-[var(--surface-soft)] px-4 py-3 text-sm text-[color:var(--text-primary)]">
                              {detail.content}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {elderlyRecords.length === 0 && <p className="text-sm text-[color:var(--text-muted)]">케어 기록이 없습니다.</p>}
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-3">
                    {elderlyDocuments ? (
                      <>
                        <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[color:var(--text-strong)]">문서 완성률</p>
                              <p className="mt-1 text-sm text-[color:var(--text-muted)]">핵심 누락 {elderlyDocuments.missingCritical.length}건</p>
                            </div>
                            <StatusBadge label={`${elderlyDocuments.completionRate}%`} variant={elderlyDocuments.riskLevel === 'low' ? 'success' : elderlyDocuments.riskLevel === 'medium' ? 'info' : 'warning'} />
                          </div>
                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(39,53,45,0.08)]">
                            <div className="h-full rounded-full bg-[var(--success-600)]" style={{ width: `${elderlyDocuments.completionRate}%` }} />
                          </div>
                        </div>
                        {elderlyDocuments.requiredDocuments.map((document) => (
                          <div key={document.id} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p
                                className={`font-semibold ${
                                  document.status === 'complete'
                                    ? 'text-[color:var(--text-strong)]'
                                    : 'text-[color:var(--danger-600)]'
                                }`}
                              >
                                {document.name}
                              </p>
                              <StatusBadge
                                label={
                                  document.status === 'complete'
                                    ? '완료'
                                    : document.status === 'missing'
                                      ? '미보유'
                                      : document.status === 'expired'
                                        ? '만료'
                                        : document.status === 'pending_review'
                                          ? '검수 대기'
                                          : '미완성'
                                }
                                variant={
                                  document.status === 'complete'
                                    ? 'success'
                                    : document.status === 'missing'
                                      ? 'error'
                                      : document.status === 'pending_review'
                                        ? 'info'
                                        : 'warning'
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-sm text-[color:var(--text-muted)]">문서 정보가 없습니다.</p>
                    )}
                  </div>
                )}

                {activeTab === 'handover' && (
                  <div className="space-y-4">
                    <InlineNotice
                      title="핸드오버 체크"
                      message="전일 퇴근자 메모 누락이 있는지 먼저 확인하고, 오늘 특이사항을 이어서 기록하는 흐름으로 정리했습니다."
                      tone="info"
                    />
                    {elderlyRecords.filter((record) => record.handoverNotes).map((record) => (
                      <div key={record.recordId} className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-4">
                        <p className="font-semibold text-[color:var(--text-strong)]">{record.caregiverName}</p>
                        <p className="mt-1 text-xs text-[color:var(--text-muted)]">{record.visitDate}</p>
                        <p className="mt-3 text-sm text-[color:var(--text-primary)]">{record.handoverNotes}</p>
                      </div>
                    ))}
                    {showHandoverComposer ? (
                      <div className="space-y-3 rounded-2xl border border-[rgba(31,122,67,0.16)] bg-[var(--success-100)] p-4">
                        <textarea
                          value={handoverDraft}
                          onChange={(event) => setHandoverDraft(event.target.value)}
                          placeholder="다음 근무자에게 넘길 특이사항을 입력해 주세요."
                          className="focus-ring min-h-[120px] w-full rounded-2xl border border-[rgba(31,122,67,0.16)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
                        />
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={handleCreateHandover}
                            disabled={!handoverDraft.trim()}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--success-600)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-800)] disabled:cursor-not-allowed disabled:bg-[rgba(31,122,67,0.18)]"
                          >
                            <ArrowRight className="h-4 w-4" />
                            핸드오버 저장
                          </button>
                          <button
                            onClick={() => {
                              setShowHandoverComposer(false);
                              setHandoverDraft('');
                            }}
                            className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:bg-[var(--surface-soft)]"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : null}
                    <button
                      onClick={() => {
                        setShowHandoverComposer((current) => !current);
                        setNotice(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(31,122,67,0.16)] bg-[var(--success-100)] px-4 py-3 text-sm font-semibold text-[color:var(--success-600)] transition hover:bg-[rgba(231,245,236,0.92)]"
                    >
                      <ArrowRight className="h-4 w-4" />
                      {showHandoverComposer ? '핸드오버 작성 닫기' : '새 핸드오버 작성'}
                    </button>
                  </div>
                )}
              </SectionCard>
            </>
          ) : (
            <SectionCard title="어르신 상세" description="왼쪽 목록에서 어르신을 선택하면 상세 패널이 표시됩니다." icon={Users}>
              <div className="rounded-3xl border border-dashed border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.65)] px-6 py-14 text-center text-sm text-[color:var(--text-muted)]">
                조회할 어르신을 선택해 주세요.
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}

function isManagementTab(value: string | null): value is 'overview' | 'records' | 'documents' | 'handover' {
  return value !== null && managementTabs.includes(value as (typeof managementTabs)[number]);
}
