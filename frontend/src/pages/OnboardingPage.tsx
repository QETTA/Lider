import { type FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Briefcase, Building2, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { readAuthFlowDraft, writeAuthFlowDraft } from '../utils/authFlow';
import { useAuthSession } from '../hooks/useAuthSession';

const roles = [
  { value: 'director', label: '센터장 / 원장', description: '운영 우선순위와 상태판을 먼저 보고 싶은 역할' },
  { value: 'ops', label: '운영 / 문서 담당', description: '문서 보완, 후속 상담, 누락 추적이 중요한 역할' },
  { value: 'field-lead', label: '현장 리더', description: '현장 입력과 핸드오버 정리가 중요한 역할' },
];

const centerTypes = [
  { value: 'home-care', label: '방문 서비스 중심', description: '방문 기록과 서류 후속이 많은 센터' },
  { value: 'mixed-care', label: '방문 + 상담 혼합', description: '상담/문서/현장 기록이 함께 움직이는 센터' },
  { value: 'growing-team', label: '확장 중인 신규 팀', description: '기본 운영 문법을 지금 잡아야 하는 팀' },
];

const teamSizes = [
  { value: 'small', label: '5명 이하', description: '대표와 실무가 여러 역할을 함께 맡는 소규모 운영' },
  { value: 'medium', label: '6-15명', description: '역할이 나뉘기 시작해 흐름 정리가 중요한 팀' },
  { value: 'large', label: '16명 이상', description: '핸드오버와 상태 공유 규칙이 더 중요해지는 팀' },
];

const onboardingGoals = [
  { value: '문서 보완 누락 줄이기', description: '평가·지정갱신 준비도를 더 빨리 확인하고 싶은 경우' },
  { value: '현장 기록을 한 화면으로 모으기', description: '흩어진 현장 기록과 핸드오버를 먼저 정리하고 싶은 경우' },
  { value: '상담 후속과 알림 우선순위 정리', description: '상담 이후 액션이 끊기지 않게 후속 기준을 세우고 싶은 경우' },
  { value: '센터 운영 숫자를 더 또렷하게 보기', description: '대시보드에서 오늘 봐야 할 핵심 숫자를 먼저 정리하고 싶은 경우' },
];

interface OnboardingErrors {
  role?: string;
  centerType?: string;
  teamSize?: string;
  onboardingGoals?: string;
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { session, onboardingProfile, isOnboardingLoading, saveOnboardingProfile } = useAuthSession();
  const [draft] = useState(() => readAuthFlowDraft());
  const centerName = session?.user.center?.name || draft.centerName;
  const accountEmail = session?.user.email || draft.email;
  const [form, setForm] = useState(() => ({
    role: onboardingProfile.role || draft.role,
    centerType: onboardingProfile.centerType || draft.centerType,
    teamSize: onboardingProfile.teamSize || draft.teamSize,
    onboardingGoals: onboardingProfile.onboardingGoals.length > 0 ? onboardingProfile.onboardingGoals : draft.onboardingGoals,
  }));
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedRoleMeta = roles.find((role) => role.value === form.role);
  const selectedCenterTypeMeta = centerTypes.find((type) => type.value === form.centerType);
  const selectedTeamSizeMeta = teamSizes.find((size) => size.value === form.teamSize);
  const selectedGoalPreview = onboardingGoals.filter((goal) => form.onboardingGoals.includes(goal.value)).slice(0, 2);

  useEffect(() => {
    setForm({
      role: onboardingProfile.role || draft.role,
      centerType: onboardingProfile.centerType || draft.centerType,
      teamSize: onboardingProfile.teamSize || draft.teamSize,
      onboardingGoals: onboardingProfile.onboardingGoals.length > 0 ? onboardingProfile.onboardingGoals : draft.onboardingGoals,
    });
  }, [
    draft.centerType,
    draft.onboardingGoals,
    draft.role,
    draft.teamSize,
    onboardingProfile.centerType,
    onboardingProfile.onboardingGoals,
    onboardingProfile.role,
    onboardingProfile.teamSize,
  ]);

  const toggleGoal = (goal: string) => {
    setForm((prev) => ({
      ...prev,
      onboardingGoals: prev.onboardingGoals.includes(goal)
        ? prev.onboardingGoals.filter((item) => item !== goal)
        : [...prev.onboardingGoals, goal],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: OnboardingErrors = {};

    if (!form.role) {
      nextErrors.role = '주로 이 화면을 먼저 쓰는 역할을 골라 주세요.';
    }

    if (!form.centerType) {
      nextErrors.centerType = '센터의 현재 운영 결을 골라 주세요.';
    }

    if (!form.teamSize) {
      nextErrors.teamSize = '팀 규모를 선택해 주세요.';
    }

    if (form.onboardingGoals.length === 0) {
      nextErrors.onboardingGoals = '최소 한 가지 목표는 선택해 주세요.';
    }

    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const selectedRole = roles.find((role) => role.value === form.role);

    setIsSubmitting(true);
    try {
      await saveOnboardingProfile({
        role: form.role,
        roleContext: selectedRole?.label || form.role,
        centerType: form.centerType,
        teamSize: form.teamSize,
        onboardingGoals: form.onboardingGoals,
      });
      writeAuthFlowDraft({
        role: form.role,
        centerType: form.centerType,
        teamSize: form.teamSize,
        onboardingGoals: form.onboardingGoals,
      });
      navigate('/setup');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '온보딩 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      step="onboarding"
      eyebrow="Onboarding"
      title="도입 맥락을 먼저 읽고, 실제 화면은 그다음에 맞춥니다"
      description="온보딩은 랜딩처럼 느슨하지 않고, 앱처럼 갑갑하지도 않아야 합니다. 이 단계에서 팀 역할과 목표를 받아야 뒤의 첫 설정이 자연스럽게 개인화됩니다."
      helperTitle="이 단계의 핵심"
      helperDescription="브랜드 톤은 잔잔하게 유지하되, 선택 구조와 우선순위 수집은 빠르게 끝나야 합니다. 그래서 카드형 선택과 짧은 가이드를 중심으로 구성합니다."
      helperPoints={[
        '카드형 선택은 설명을 담되 한눈에 비교가 가능하도록 정리합니다.',
        '팀 역할과 센터 유형을 먼저 잡아야 다음 설정 단계의 추천이 흔들리지 않습니다.',
        '목표 선택은 체크칩으로 가볍게 두고, 실제 복잡한 폼은 첫 설정에서 마무리합니다.',
      ]}
      statCards={[
        { label: '센터', value: centerName || '기관명 미입력' },
        { label: '계정', value: accountEmail || '이메일 미입력' },
        { label: 'Purpose', value: '역할과 목표를 먼저 정렬' },
      ]}
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--brand-700)]">Step 2</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--brand-900)]">온보딩 기본 맥락 수집</h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
            이후 화면에서 보조 문구와 첫 설정 추천을 자연스럽게 맞추기 위해 지금 필요한 맥락만 짧게 받습니다.
          </p>
          {isOnboardingLoading && (
            <p className="mt-2 text-sm text-[color:var(--text-soft)]">저장된 온보딩 정보를 불러오는 중입니다.</p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="auth-mini-stat">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-soft)]">센터 맥락</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{centerName || '기관명 미입력'}</p>
          </div>
          <div className="auth-mini-stat">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-soft)]">담당 계정</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)] break-all">{accountEmail || '이메일 미입력'}</p>
          </div>
        </div>

        <section className="auth-panel-section space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[color:var(--brand-700)]" />
            <p className="auth-section-title">주 역할</p>
          </div>
          <div className="grid gap-3">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: role.value }))}
                className={`auth-option-card text-left ${form.role === role.value ? 'auth-option-card-selected' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--text-strong)]">{role.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{role.description}</p>
                  </div>
                  <BadgeCheck className={`h-5 w-5 shrink-0 ${form.role === role.value ? 'text-[color:var(--action-700)]' : 'text-[color:var(--text-soft)]'}`} />
                </div>
              </button>
            ))}
          </div>
          {errors.role && <p className="auth-error">{errors.role}</p>}
          {selectedRoleMeta && (
            <div className="rounded-[22px] border border-[rgba(19,125,128,0.14)] bg-[rgba(223,244,244,0.44)] px-4 py-3">
              <p className="auth-kicker">Selected Role</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{selectedRoleMeta.label}</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--text-primary)]">{selectedRoleMeta.description}</p>
            </div>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="auth-panel-section space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[color:var(--brand-700)]" />
              <p className="auth-section-title">센터 운영 결</p>
            </div>
            <div className="grid gap-3">
              {centerTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, centerType: type.value }))}
                  className={`auth-option-card text-left ${form.centerType === type.value ? 'auth-option-card-selected' : ''}`}
                >
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">{type.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{type.description}</p>
                </button>
              ))}
            </div>
            {errors.centerType && <p className="auth-error">{errors.centerType}</p>}
            {selectedCenterTypeMeta && (
              <div className="rounded-[22px] border border-[rgba(71,96,83,0.12)] bg-[rgba(255,255,255,0.66)] px-4 py-3">
                <p className="auth-kicker">Current Fit</p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{selectedCenterTypeMeta.label}</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-primary)]">{selectedCenterTypeMeta.description}</p>
              </div>
            )}
          </div>

          <div className="auth-panel-section space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[color:var(--brand-700)]" />
              <p className="auth-section-title">팀 규모</p>
            </div>
            <div className="grid gap-3">
              {teamSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, teamSize: size.value }))}
                  className={`auth-option-card text-left ${form.teamSize === size.value ? 'auth-option-card-selected' : ''}`}
                >
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">{size.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{size.description}</p>
                </button>
              ))}
            </div>
            {errors.teamSize && <p className="auth-error">{errors.teamSize}</p>}
            {selectedTeamSizeMeta && (
              <div className="rounded-[22px] border border-[rgba(71,96,83,0.12)] bg-[rgba(255,255,255,0.66)] px-4 py-3">
                <p className="auth-kicker">Team Lens</p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--brand-900)]">{selectedTeamSizeMeta.label}</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-primary)]">{selectedTeamSizeMeta.description}</p>
              </div>
            )}
          </div>
        </section>

        <section className="auth-panel-section space-y-4">
          <p className="auth-section-title">이번 도입에서 먼저 해결하고 싶은 일</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {onboardingGoals.map((goal) => (
              <button
                key={goal.value}
                type="button"
                onClick={() => toggleGoal(goal.value)}
                className={`auth-chip w-full justify-start text-left ${form.onboardingGoals.includes(goal.value) ? 'auth-chip-selected' : ''}`}
              >
                <span>
                  <span className="block font-semibold text-[color:var(--text-strong)]">{goal.value}</span>
                  <span className="mt-1 block text-sm leading-6 text-[color:var(--text-primary)]">{goal.description}</span>
                </span>
              </button>
            ))}
          </div>
          {errors.onboardingGoals ? (
            <p className="auth-error">{errors.onboardingGoals}</p>
          ) : (
            <p className="auth-hint">복잡한 설정을 지금 모두 묻지 않고, 첫 주에 체감해야 할 목표만 먼저 선택합니다.</p>
          )}
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="rounded-[22px] border border-[rgba(71,96,83,0.12)] bg-[rgba(255,255,255,0.7)] px-4 py-3">
              <p className="auth-kicker">Goals</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--brand-900)]">{form.onboardingGoals.length}개 선택</p>
            </div>
            <div className="rounded-[22px] border border-[rgba(71,96,83,0.12)] bg-[rgba(255,255,255,0.7)] px-4 py-3">
              <p className="auth-kicker">Preview</p>
              <div className="mt-2 space-y-2">
                {selectedGoalPreview.length > 0 ? (
                  selectedGoalPreview.map((goal) => (
                    <p key={goal.value} className="text-sm leading-6 text-[color:var(--text-primary)]">
                      {goal.value}
                    </p>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[color:var(--text-primary)]">첫 주에 가장 먼저 체감할 목표를 선택하면 여기서 바로 요약됩니다.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="auth-helper-card">
          <p className="text-sm font-semibold text-[color:var(--brand-900)]">온보딩은 설명 섹션이 아니라 선택 구조입니다</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
            타이포와 여백은 부드럽게 두되, 실제 액션은 카드와 칩으로 빠르게 끝나게 해서 인증/전환 레이어가 앱 셸과 자연스럽게 이어지도록 했습니다.
          </p>
        </div>

        {submitError && <p className="auth-error">{submitError}</p>}

        <div className="flex flex-col gap-3 border-t border-[color:var(--border-subtle)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--brand-700)] transition hover:text-[color:var(--brand-900)]"
          >
            <ArrowLeft className="h-4 w-4" />
            로그인으로 돌아가기
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isOnboardingLoading}
            className="auth-primary-button sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? '저장 후 이동 중' : '첫 설정으로 계속'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
