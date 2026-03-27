import { type FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CircleDashed, Settings2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { readAuthFlowDraft, writeAuthFlowDraft } from '../utils/authFlow';
import { useAuthSession } from '../hooks/useAuthSession';

const setupPriorities = [
  {
    value: '문서 보완 대기 먼저 보기',
    description: '평가·지정갱신 전 필요한 문서 보완 항목을 상단에서 먼저 확인',
  },
  {
    value: '현장 기록 핸드오버를 더 선명하게 보기',
    description: '담당자 변경과 현장 후속이 끊기지 않게 기록 연결을 우선 배치',
  },
  {
    value: '상담 후속 누락을 줄이는 알림부터 보기',
    description: '상담 이후 액션이 멈추지 않게 우선순위 알림을 먼저 노출',
  },
  {
    value: '오늘 운영 숫자를 먼저 보는 대시보드 시작',
    description: '당일 운영 상태와 핵심 지표를 첫 화면에서 바로 확인',
  },
];

const communicationChannels = [
  { value: 'kakao', label: '카카오톡/메신저 중심', description: '빠른 확인과 짧은 후속 메시지가 중심인 팀' },
  { value: 'phone', label: '전화/문자 중심', description: '담당자 통화와 즉시 연락이 운영의 중심인 팀' },
  { value: 'internal-note', label: '센터 내부 메모 중심', description: '내부 메모와 인수인계 정리가 우선인 팀' },
];

const roleLabels: Record<string, string> = {
  director: '센터장 / 원장',
  ops: '운영 / 문서 담당',
  'field-lead': '현장 리더',
};

const centerTypeLabels: Record<string, string> = {
  'home-care': '방문 서비스 중심',
  'mixed-care': '방문 + 상담 혼합',
  'growing-team': '확장 중인 신규 팀',
};

interface SetupErrors {
  setupPriorities?: string;
  communicationChannel?: string;
}

export function FirstRunSetupPage() {
  const { onboardingProfile, isOnboardingLoading, saveOnboardingProfile } = useAuthSession();
  const [draft] = useState(() => readAuthFlowDraft());
  const selectedRole = onboardingProfile.role || draft.role;
  const selectedCenterType = onboardingProfile.centerType || draft.centerType;
  const selectedGoals = onboardingProfile.onboardingGoals.length > 0 ? onboardingProfile.onboardingGoals : draft.onboardingGoals;
  const selectedRoleLabel = roleLabels[selectedRole] || '역할 미선택';
  const selectedCenterTypeLabel = centerTypeLabels[selectedCenterType] || '운영 결 미선택';
  const [form, setForm] = useState(() => ({
    setupPriorities: onboardingProfile.setupPriorities.length > 0 ? onboardingProfile.setupPriorities : draft.setupPriorities,
    communicationChannel: onboardingProfile.communicationChannel || draft.communicationChannel,
    handoverNote: onboardingProfile.handoverNote || draft.handoverNote,
  }));
  const [errors, setErrors] = useState<SetupErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(Boolean(onboardingProfile.completedAt));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedPriorityPreview = setupPriorities.filter((priority) => form.setupPriorities.includes(priority.value)).slice(0, 2);
  const selectedChannelMeta = communicationChannels.find((channel) => channel.value === form.communicationChannel);

  useEffect(() => {
    setForm({
      setupPriorities: onboardingProfile.setupPriorities.length > 0 ? onboardingProfile.setupPriorities : draft.setupPriorities,
      communicationChannel: onboardingProfile.communicationChannel || draft.communicationChannel,
      handoverNote: onboardingProfile.handoverNote || draft.handoverNote,
    });
    setIsComplete(Boolean(onboardingProfile.completedAt));
  }, [
    draft.communicationChannel,
    draft.handoverNote,
    draft.setupPriorities,
    onboardingProfile.communicationChannel,
    onboardingProfile.completedAt,
    onboardingProfile.handoverNote,
    onboardingProfile.setupPriorities,
  ]);

  const togglePriority = (priority: string) => {
    setForm((prev) => ({
      ...prev,
      setupPriorities: prev.setupPriorities.includes(priority)
        ? prev.setupPriorities.filter((item) => item !== priority)
        : [...prev.setupPriorities, priority],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: SetupErrors = {};

    if (form.setupPriorities.length === 0) {
      nextErrors.setupPriorities = '첫 주에 가장 먼저 보고 싶은 항목을 선택해 주세요.';
    }

    if (!form.communicationChannel) {
      nextErrors.communicationChannel = '기본 소통 채널을 하나 골라 주세요.';
    }

    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      setIsComplete(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const nextProfile = await saveOnboardingProfile({
        setupPriorities: form.setupPriorities,
        communicationChannel: form.communicationChannel,
        handoverNote: form.handoverNote.trim(),
        completedAt: new Date().toISOString(),
      });
      writeAuthFlowDraft({
        setupPriorities: form.setupPriorities,
        communicationChannel: form.communicationChannel,
        handoverNote: form.handoverNote.trim(),
      });
      setIsComplete(Boolean(nextProfile.completedAt));
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '첫 설정을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsComplete(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      step="setup"
      eyebrow="First Run Setup"
      title="첫 주의 기본 화면과 커뮤니케이션 맥락을 정리합니다"
      description="마지막 단계에서는 사용자가 가장 먼저 보고 싶은 상태와 실제 현장 소통 채널을 연결합니다. 앱 셸로 넘어가기 전에 ‘무엇을 먼저 보여줘야 하는지’를 정하는 전환 마감 레이어입니다."
      helperTitle="첫 설정에서 끝내야 하는 것"
      helperDescription="이 단계는 복잡한 관리자 설정이 아니라, 처음 대시보드가 어떤 우선순위로 읽혀야 하는지 가볍게 합의하는 자리입니다."
      helperPoints={[
        '첫 주 우선순위를 받아 대시보드와 문서/알림 흐름의 기대치를 맞춥니다.',
        '아직 연결되지 않은 채널은 빈 상태로 보여주고, 무엇을 준비 중인지 설명합니다.',
        '설정 완료 뒤 바로 앱 셸로 이동할 수 있게 연결해 전환의 끝을 분명히 남깁니다.',
      ]}
      statCards={[
        { label: '역할', value: selectedRoleLabel },
        { label: '센터 유형', value: selectedCenterTypeLabel },
        { label: 'Outcome', value: '앱 첫 진입의 우선순위 확정' },
      ]}
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--brand-700)]">Step 3</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--brand-900)]">첫 실행 기본값</h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
            센터별로 중요한 시작점이 다르기 때문에, 어떤 카드와 안내가 먼저 보여야 하는지 마지막으로 짧게 맞춥니다.
          </p>
          {isOnboardingLoading && (
            <p className="mt-2 text-sm text-[color:var(--text-soft)]">저장된 첫 설정 정보를 불러오는 중입니다.</p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="auth-mini-stat">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-soft)]">역할</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{selectedRoleLabel}</p>
          </div>
          <div className="auth-mini-stat">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-soft)]">센터 유형</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{selectedCenterTypeLabel}</p>
          </div>
          <div className="auth-mini-stat">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-soft)]">도입 목표</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">
              {selectedGoals.length > 0 ? `${selectedGoals.length}개 선택됨` : '아직 선택 없음'}
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <section className="auth-panel-section space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[color:var(--brand-700)]" />
              <p className="auth-section-title">첫 주 우선순위</p>
            </div>
            <div className="grid gap-3">
              {setupPriorities.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => togglePriority(priority.value)}
                  className={`auth-option-card text-left ${form.setupPriorities.includes(priority.value) ? 'auth-option-card-selected' : ''}`}
                >
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">{priority.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{priority.description}</p>
                </button>
              ))}
            </div>
            {errors.setupPriorities ? (
              <p className="auth-error">{errors.setupPriorities}</p>
            ) : (
              <p className="auth-hint">복수 선택이 가능하지만, 첫 주엔 1-2개만 먼저 잡는 편이 실제 도입 전환에 더 좋습니다.</p>
            )}
            <div className="rounded-[22px] border border-[rgba(71,96,83,0.12)] bg-[rgba(255,255,255,0.68)] px-4 py-3">
              <p className="auth-kicker">Dashboard Preview</p>
              <div className="mt-2 space-y-2">
                {selectedPriorityPreview.length > 0 ? (
                  selectedPriorityPreview.map((priority) => (
                    <p key={priority.value} className="text-sm leading-6 text-[color:var(--text-primary)]">{priority.value}</p>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[color:var(--text-primary)]">무엇을 가장 먼저 상단에 보여줄지 정하면 이 영역에 바로 반영됩니다.</p>
                )}
              </div>
            </div>
          </section>

          <section className="auth-panel-section space-y-4">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-[color:var(--brand-700)]" />
              <p className="auth-section-title">기본 소통 채널</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {communicationChannels.map((channel) => (
                <button
                  key={channel.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, communicationChannel: channel.value }))}
                  className={`auth-option-card text-left ${form.communicationChannel === channel.value ? 'auth-option-card-selected' : ''}`}
                >
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">{channel.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{channel.description}</p>
                </button>
              ))}
            </div>
            {errors.communicationChannel ? (
              <p className="auth-error">{errors.communicationChannel}</p>
            ) : (
              <p className="auth-hint">후속 상담과 핸드오버 안내 문구는 이 채널을 기준으로 톤을 맞춥니다.</p>
            )}
            {selectedChannelMeta && (
              <div className="rounded-[22px] border border-[rgba(71,96,83,0.12)] bg-[rgba(255,255,255,0.68)] px-4 py-3">
                <p className="auth-kicker">Channel Tone</p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{selectedChannelMeta.label}</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-primary)]">{selectedChannelMeta.description}</p>
              </div>
            )}
          </section>

          <section className="auth-panel-section space-y-3">
            <p className="auth-section-title">핸드오버 메모 톤</p>
            <textarea
              value={form.handoverNote}
              onChange={(event) => setForm((prev) => ({ ...prev, handoverNote: event.target.value }))}
              className="auth-textarea"
              rows={4}
              placeholder="예: 가족 문의는 오전에 먼저 확인하고, 방문 직후 기록은 2시간 안에 정리"
            />
            <p className="auth-hint">선택 사항입니다. 첫 대시보드와 설정 화면에서 보여줄 도입 메모로 이어집니다.</p>
          </section>

          <div className="auth-panel-section border-dashed border-[rgba(71,96,83,0.22)] bg-[rgba(255,253,250,0.74)]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(71,96,83,0.14)] bg-[rgba(242,246,243,0.82)] text-[color:var(--brand-700)]">
                <CircleDashed className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--brand-900)]">아직 연결된 채널 없음</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
                  실제 메시지 채널 연동은 다음 단계로 남겨 두고, 첫 주에는 어떤 업무가 먼저 보여야 하는지부터 맞춰도 충분합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <button
              type="submit"
              disabled={isSubmitting || isOnboardingLoading}
              className="auth-primary-button disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? '첫 설정 저장 중' : '첫 설정 저장'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              className="auth-secondary-button disabled:cursor-not-allowed disabled:border-[color:var(--border-subtle)] disabled:bg-[rgba(39,53,45,0.04)] disabled:text-[color:var(--text-soft)]"
            >
              외부 연동 준비 중
            </button>
          </div>
        </form>

        {submitError && <p className="auth-error">{submitError}</p>}

        {isComplete && (
          <div className="auth-helper-card border-[rgba(19,125,128,0.2)] bg-[linear-gradient(180deg,rgba(223,244,244,0.8),rgba(255,253,250,0.95))]">
            <p className="text-sm font-semibold text-[color:var(--brand-900)]">전환 레이어 설정이 완료되었습니다</p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
              이제 랜딩의 차분한 톤에서 앱 셸의 운영 구조로 자연스럽게 넘어갈 준비가 끝났습니다. 다음 화면에서는 선택한 우선순위를 기준으로 내부 운영 흐름을 이어갈 수 있습니다.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link to="/dashboard" className="auth-primary-button w-full sm:w-auto">
                운영 대시보드로 이동
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/settings" className="auth-secondary-button w-full sm:w-auto">
                설정 화면 먼저 보기
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-[color:var(--border-subtle)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--brand-700)] transition hover:text-[color:var(--brand-900)]"
          >
            <ArrowLeft className="h-4 w-4" />
            온보딩으로 돌아가기
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-[color:var(--action-700)] transition hover:text-[color:var(--action-600)]"
          >
            앱 셸만 먼저 보기
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
