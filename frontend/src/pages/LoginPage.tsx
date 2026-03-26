import { type FormEvent, useEffect, useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { readAuthFlowDraft, writeAuthFlowDraft } from '../utils/authFlow';
import { useAuthSession } from '../hooks/useAuthSession';

interface LoginErrors {
  centerName?: string;
  email?: string;
  password?: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isOnboardingLoading, login, onboardingProfile } = useAuthSession();
  const draft = readAuthFlowDraft();
  const [form, setForm] = useState({
    centerName: draft.centerName,
    email: draft.email,
    password: '',
    rememberCenter: true,
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isOnboardingLoading) {
      navigate(onboardingProfile.completedAt ? '/dashboard' : '/onboarding', { replace: true });
    }
  }, [isAuthenticated, isOnboardingLoading, navigate, onboardingProfile.completedAt]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!form.centerName.trim()) {
      nextErrors.centerName = '센터 또는 기관 이름을 입력해 주세요.';
    }

    if (!form.email.trim()) {
      nextErrors.email = '로그인용 이메일을 입력해 주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = '이메일 형식을 다시 확인해 주세요.';
    }

    if (!form.password.trim()) {
      nextErrors.password = '비밀번호를 입력해 주세요.';
    } else if (form.password.length < 8) {
      nextErrors.password = '비밀번호는 8자 이상으로 준비해 주세요.';
    }

    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await login(form.email.trim(), form.password);
      writeAuthFlowDraft({
        centerName: form.rememberCenter
          ? session.user.center?.name || form.centerName.trim()
          : '',
        email: session.user.email,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      step="login"
      eyebrow="Auth Layer"
      title="브랜드의 첫인상과 실제 운영 진입을 같은 톤으로 잇습니다"
      description="랜딩에서 바로 대시보드로 튀지 않고, 먼저 센터와 계정 맥락을 확인하는 차분한 진입 레이어를 둡니다. 헤드라인은 부드럽게, 입력과 검증은 또렷하게 가져갑니다."
      helperTitle="첫 단계에서 정리하는 것"
      helperDescription="로그인 화면은 단순한 자격 증명 입력창이 아니라, 어느 센터가 어떤 톤으로 진입하는지 확인하는 첫 장면입니다."
      helperPoints={[
        '센터 이름과 계정 정보를 함께 받아 이후 온보딩 문맥에 바로 이어집니다.',
        '검증 메시지는 짧고 분명하게 두어 한국어 읽기 흐름을 지키도록 했습니다.',
        '보안/도입 안내는 입력 바깥쪽에 분리해 폼 자체는 가볍게 유지합니다.',
      ]}
      statCards={[
        { label: 'Tone', value: 'Oatmeal 45 / Catalyst 55' },
        { label: 'Entry', value: '공개 소개 뒤 첫 운영 진입' },
        { label: 'Mobile', value: '한 손 입력 폭 기준으로 정돈' },
      ]}
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--brand-700)]">Step 1</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--brand-900)]">센터 계정 확인</h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
            센터 맥락과 계정 검증을 함께 묶어, 공개 랜딩에서 실제 운영 세션으로 자연스럽게 넘어가도록 연결합니다.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <label className="block">
            <span className="auth-label">센터 또는 기관 이름</span>
            <input
              id="center-name"
              name="centerName"
              type="text"
              value={form.centerName}
              onChange={(event) => setForm((prev) => ({ ...prev, centerName: event.target.value }))}
              className="auth-field"
              placeholder="예: 은샘노인재가복지센터"
              autoComplete="organization"
              aria-invalid={Boolean(errors.centerName)}
            />
            {errors.centerName && <p className="auth-error">{errors.centerName}</p>}
          </label>

          <label className="block">
            <span className="auth-label">업무용 이메일</span>
            <input
              id="work-email"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="auth-field"
              placeholder="manager@lider.kr"
              autoComplete="username"
              inputMode="email"
              autoCapitalize="none"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <p className="auth-error">{errors.email}</p>
            ) : (
              <p className="auth-hint">로그인 후 온보딩 화면과 첫 설정 화면에 동일한 담당자 맥락을 이어서 보여줍니다.</p>
            )}
          </label>

          <label className="block">
            <span className="auth-label">비밀번호</span>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-soft)]" />
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="auth-field pl-11"
                placeholder="8자 이상 입력"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
              />
            </div>
            {errors.password ? (
              <p className="auth-error">{errors.password}</p>
            ) : (
              <p className="auth-hint">로그인 성공 후 같은 세션을 유지한 채 온보딩과 첫 설정으로 이어집니다.</p>
            )}
          </label>

          {submitError && <p className="auth-error">{submitError}</p>}

          <label className="auth-checkbox">
            <input
              name="rememberCenter"
              type="checkbox"
              checked={form.rememberCenter}
              onChange={(event) => setForm((prev) => ({ ...prev, rememberCenter: event.target.checked }))}
            />
            <span>다음 온보딩 단계에서도 센터 이름을 이어서 사용</span>
          </label>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <button type="submit" disabled={isSubmitting} className="auth-primary-button disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? '로그인 확인 중' : '온보딩으로 계속'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled
              className="auth-secondary-button disabled:cursor-not-allowed disabled:border-[color:var(--border-subtle)] disabled:bg-[rgba(39,53,45,0.04)] disabled:text-[color:var(--text-soft)]"
            >
              SSO 연동 준비 중
            </button>
          </div>
        </form>

        <div className="auth-helper-card">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(71,96,83,0.14)] bg-[rgba(223,244,244,0.7)] text-[color:var(--action-700)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[color:var(--brand-900)]">보안과 도입 안내를 한 화면에서</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">
                첫 로그인 단계에서는 “무엇이 보호되는지”, “다음 단계에서 어떤 정보를 이어받는지”를 함께 보여줘야 불안감 없이 넘어갑니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-subtle)] pt-5">
          <Link to="/" className="text-sm font-medium text-[color:var(--brand-700)] transition hover:text-[color:var(--brand-900)]">
            공개 랜딩으로 돌아가기
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-[color:var(--action-700)] transition hover:text-[color:var(--action-600)]"
          >
            앱 구조 먼저 보기
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
