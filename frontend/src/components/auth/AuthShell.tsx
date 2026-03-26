import type { ReactNode } from 'react';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';
import { authFlowSteps, type AuthFlowStepId } from '../../utils/authFlow';
import { BrandMark } from '../public/BrandMark';

interface AuthShellProps {
  step: AuthFlowStepId;
  eyebrow: string;
  title: string;
  description: string;
  helperTitle: string;
  helperDescription: string;
  helperPoints: string[];
  statCards: Array<{
    label: string;
    value: string;
  }>;
  children: ReactNode;
}

export function AuthShell({
  step,
  eyebrow,
  title,
  description,
  helperTitle,
  helperDescription,
  helperPoints,
  statCards,
  children,
}: AuthShellProps) {
  const currentStepIndex = authFlowSteps.findIndex((item) => item.id === step);
  const currentStep = authFlowSteps[currentStepIndex] ?? authFlowSteps[0];

  return (
    <div className="auth-canvas min-h-screen text-[color:var(--text-strong)]">
      <div className="relative isolate min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_16%_0%,rgba(118,145,129,0.22),transparent_26%),radial-gradient(circle_at_82%_8%,rgba(223,244,244,0.92),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-[-12%] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(93,119,105,0.13),transparent_66%)] blur-3xl" />

        <header className="relative z-10 border-b border-[color:var(--border-subtle)] bg-[rgba(250,248,244,0.7)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <Link to="/">
              <BrandMark
                caption="공개 소개에서 운영 화면으로 이어지는 전환 레이어"
                mobileCaption="공개 소개에서 운영으로 넘어가는 전환 레이어"
              />
            </Link>

            <div className="flex w-full items-center gap-3 text-sm sm:w-auto">
              <Link
                to="/"
                className="public-cta-secondary flex-1 text-center sm:flex-none"
              >
                랜딩으로
              </Link>
              <Link
                to="/dashboard"
                className="public-cta-primary flex-1 sm:flex-none"
              >
                앱 미리보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-[1200px] px-5 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:gap-8">
            <section className="order-2 hidden space-y-6 sm:block lg:order-1 lg:sticky lg:top-8 lg:self-start">
              <div className="max-w-[560px]">
                <div className="public-kicker">
                  <span>{eyebrow}</span>
                  <span className="h-1 w-1 rounded-full bg-[color:var(--brand-600)]" />
                  <span>
                    Step {currentStepIndex + 1} / {authFlowSteps.length}
                  </span>
                </div>
                <h1
                  className="public-display mt-4 text-[2.1rem] leading-[1.08] tracking-[-0.04em] text-[color:var(--brand-900)] sm:mt-5 sm:text-[3.2rem]"
                >
                  {title}
                </h1>
                <p className="public-copy mt-4 max-w-[520px] text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8">
                  {description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {statCards.map((card) => (
                  <GlassCard
                    key={card.label}
                    className="public-panel border-[rgba(71,96,83,0.12)] bg-[rgba(255,253,250,0.9)] p-4 shadow-[0_18px_45px_rgba(39,53,45,0.08)]"
                    hover="none"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-soft)]">{card.label}</p>
                    <p className="mt-3 text-lg font-semibold text-[color:var(--brand-900)]">{card.value}</p>
                  </GlassCard>
                ))}
              </div>

              <GlassCard className="public-panel border-[rgba(71,96,83,0.12)] bg-[linear-gradient(180deg,rgba(255,253,250,0.94),rgba(242,246,243,0.9))] p-6 shadow-[0_24px_60px_rgba(39,53,45,0.1)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--brand-700)]">Transition Notes</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[color:var(--brand-900)]">{helperTitle}</h2>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-primary)]">{helperDescription}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(71,96,83,0.14)] bg-[rgba(255,255,255,0.74)] text-[color:var(--brand-700)]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {helperPoints.map((item, index) => (
                    <li
                      key={item}
                      className={cn(
                        'flex items-start gap-3 text-sm leading-6 text-[color:var(--text-primary)]',
                        index > 1 && 'hidden sm:flex'
                      )}
                    >
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-600)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </section>

            <section className="order-1 lg:order-2">
              <GlassCard className="public-panel border-[rgba(71,96,83,0.12)] bg-[rgba(255,253,250,0.94)] p-5 shadow-[0_30px_70px_rgba(39,53,45,0.12)] sm:p-6 lg:p-8 xl:p-9">
                <div className="mb-6 sm:hidden">
                  <div>
                    <div className="public-kicker">{eyebrow}</div>
                    <h1
                      className="public-display mt-3 text-[1.95rem] leading-[1.08] tracking-[-0.04em] text-[color:var(--brand-900)]"
                    >
                      {title}
                    </h1>
                    <p className="public-copy mt-3 text-sm leading-7">{description}</p>
                  </div>

                  <div className="mt-5 rounded-[28px] border border-[rgba(71,96,83,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(242,246,243,0.92))] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--brand-700)]">
                          Step {currentStepIndex + 1} of {authFlowSteps.length}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[color:var(--brand-900)]">{currentStep.label}</p>
                        <p className="mt-1 text-sm leading-6 text-[color:var(--text-primary)]">{currentStep.description}</p>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(71,96,83,0.14)] bg-[rgba(255,253,250,0.86)] text-sm font-semibold text-[color:var(--brand-700)]">
                        {currentStepIndex + 1}/{authFlowSteps.length}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {authFlowSteps.map((item, index) => {
                        const isCurrent = item.id === step;
                        const isComplete = currentStepIndex > index;

                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            className={cn(
                              'rounded-2xl border px-2 py-2.5 text-center text-xs font-semibold transition',
                              isCurrent &&
                                'border-[color:var(--border-accent)] bg-[rgba(223,244,244,0.8)] text-[color:var(--action-700)]',
                              isComplete &&
                                'border-[rgba(71,96,83,0.16)] bg-[rgba(242,246,243,0.92)] text-[color:var(--brand-700)]',
                              !isCurrent &&
                                !isComplete &&
                                'border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.78)] text-[color:var(--text-muted)]'
                            )}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="auth-stepper hidden sm:grid">
                  {authFlowSteps.map((item, index) => {
                    const isCurrent = item.id === step;
                    const isComplete = currentStepIndex > index;

                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        className={cn(
                          'auth-step',
                          isCurrent && 'auth-step-current',
                          isComplete && 'auth-step-complete'
                        )}
                      >
                        <span className="auth-step-icon">
                          {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">{item.label}</span>
                          <span className="mt-1 block text-xs text-[color:var(--text-muted)]">{item.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 sm:mt-8">{children}</div>
              </GlassCard>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
