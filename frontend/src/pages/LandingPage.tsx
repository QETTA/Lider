import { type FormEvent, type ReactNode, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck,
  FileSpreadsheet,
  MessageSquare,
  Search,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, StatusBadge } from '../components/ui';
import { BrandMark } from '../components/public/BrandMark';
import deployedMobilePreview from '../../deployed-login-mobile-after-polish.png';

const painPoints = [
  {
    title: '청구는 했는데 수익이 새는 순간',
    description: '청구예외, 가산 누락, 월 한도 미활용은 늦게 발견될수록 손실이 커지고 복구는 더 어려워집니다.',
  },
  {
    title: '평가와 지정갱신 준비가 계속 뒤로 밀리는 순간',
    description: '기록은 있는데 준비 상태가 보이지 않으면, 막판에는 누락 확인보다 일정 수습이 더 큰 일이 됩니다.',
  },
  {
    title: '상담과 보호자 응대가 담당자 개인 메모에 남는 순간',
    description: '상담 후속, 계약 전환, 보호자 응대가 흩어지면 누가 이어서 마무리해야 하는지 바로 끊깁니다.',
  },
  {
    title: '담당자 변경 뒤 인수인계가 흐려지는 순간',
    description: '현장 기록과 운영 판단이 분리되어 있으면 퇴사, 교대, 휴가 이후 공백이 급격히 커집니다.',
  },
];

const urgencyCards = [
  {
    icon: FileSpreadsheet,
    title: '2026 제도 변화 대응',
    description: '재가급여 월 한도, 중증 가산, 장기근속장려금 변화는 기록보다 누락 없는 반영이 더 중요합니다.',
  },
  {
    icon: ShieldCheck,
    title: '지정갱신과 평가 준비',
    description: '문서 보관이 아니라 일정, 증빙, 보완 상태를 같이 보는 기관이 대응 속도에서 앞서기 시작했습니다.',
  },
  {
    icon: Users,
    title: '통합돌봄 이후 운영 연결성',
    description: '상담, 보호자 응대, 현장 기록, 후속 조치가 분리될수록 운영 리스크는 더 자주 반복됩니다.',
  },
];

const solutionCards = [
  {
    icon: Search,
    title: '운영 손실 점검',
    description: '청구예외, 가산 누락, 월 한도 미활용처럼 실제 손실로 이어질 가능성이 큰 항목부터 먼저 찾습니다.',
    meta: '청구예외 · 가산 누락 · 월 한도',
  },
  {
    icon: FileCheck,
    title: '평가·지정갱신 대응',
    description: '필수 증빙, 평가 준비, 지정갱신 일정과 보완 상태를 한 운영 화면 안에서 함께 점검합니다.',
    meta: '증빙 상태 · 일정 관리 · 준비도',
  },
  {
    icon: MessageSquare,
    title: '상담·보호자·기록 연결',
    description: '상담 이력, 보호자 응대, 계약 전환, 현장 기록을 분리하지 않고 후속 조치까지 이어서 봅니다.',
    meta: '상담 흐름 · 보호자 응대 · 기록 후속',
  },
];

const reportPreviewItems = [
  {
    label: '운영 손실 후보',
    title: '가산 누락 가능 수급자 2명',
    description: '방문요양 중증 가산 검토가 필요한 대상자를 우선순위로 표시합니다.',
  },
  {
    label: '평가·지정갱신',
    title: '증빙 누락과 일정 지연 한 화면 정리',
    description: '문서 존재 여부가 아니라 실제 준비 상태 기준으로 체크리스트를 제공합니다.',
  },
  {
    label: '상담·응대·기록',
    title: '후속 상담과 보호자 응대 지연 신호',
    description: '현장 기록과 상담 이력 사이의 끊긴 지점을 찾아 담당자 액션으로 묶습니다.',
  },
];

const trustCards = [
  {
    label: '운영 손실',
    value: '청구예외 · 가산 누락',
    description: '놓치고 나서 정산하는 일이 아니라, 손실이 커지기 전에 먼저 확인할 항목을 보여줍니다.',
  },
  {
    label: '평가·지정갱신',
    value: '증빙 · 일정 · 보완 상태',
    description: '문서가 있는지보다 지금 무엇이 비어 있고 무엇을 먼저 보완해야 하는지 기준으로 정리합니다.',
  },
  {
    label: '상담·기록 연결',
    value: '후속 공백 · 인수인계 방지',
    description: '상담, 보호자 응대, 현장 기록, 담당자 후속을 한 흐름으로 묶어 공백이 남지 않게 합니다.',
  },
];

const faqs = [
  {
    question: '기존 프로그램을 바꿔야 하나요?',
    answer: '아닙니다. 요양레이다는 현재 사용 중인 프로그램을 대체하는 서비스가 아니라 CSV·Excel 데이터 기반으로 운영 누락을 점검하는 보완형 서비스입니다.',
  },
  {
    question: 'AI가 기록을 자동으로 전부 작성해 주는 서비스인가요?',
    answer: '핵심은 자동작성보다 점검과 검수 흐름입니다. 문서 초안 보조는 제공하되, 실제 가치는 누락 방지와 운영 후속 연결에 둡니다.',
  },
  {
    question: '어떤 기관에 가장 먼저 적합한가요?',
    answer: '초기에는 방문요양, 방문목욕, 기타 재가서비스를 함께 운영하는 복합 재가기관에 가장 잘 맞습니다.',
  },
  {
    question: '지금 바로 결제해서 쓰는 서비스인가요?',
    answer: '아직 결제부터 시작하는 구조보다는 무료 운영 진단으로 누락 가능 항목과 보완 우선순위를 먼저 확인하는 방식이 더 자연스럽습니다.',
  },
];

const institutionTypes = [
  '복합 재가기관',
  '방문요양 중심',
  '방문목욕 포함',
  '신규/확장 중 기관',
];

const dataAvailabilityOptions = [
  '최근 2~3개월 데이터 업로드 가능',
  '일부 데이터만 정리 가능',
  '데이터 정리는 필요하지만 진단 상담 원함',
];

const commonRiskOptions = [
  '청구예외 / 가산 누락',
  '평가 / 지정갱신 준비',
  '상담 / 보호자 응대 지연',
  '현장 기록 / 인수인계 공백',
];

const heroFlow = [
  { label: '문제 공감', href: '#problem' },
  { label: '왜 지금', href: '#why-now' },
  { label: '운영 연결', href: '#solution' },
  { label: '진단 리포트', href: '#report-preview' },
  { label: '무료 진단 신청', href: '#diagnosis-form' },
];

const connectionSteps = [
  {
    title: '운영 손실',
    description: '청구예외, 가산 누락, 월 한도 미활용을 먼저 찾습니다.',
  },
  {
    title: '평가·지정갱신',
    description: '증빙과 일정, 보완 상태를 같은 판단 흐름으로 연결합니다.',
  },
  {
    title: '상담·보호자',
    description: '후속 상담, 보호자 응대, 계약 전환 신호를 놓치지 않습니다.',
  },
  {
    title: '기록·인수인계',
    description: '현장 기록과 운영 판단을 이어 담당자 변경에도 공백을 줄입니다.',
  },
];

const heroProofCards = [
  {
    title: '기존 프로그램 유지',
    description: '교체 없이 CSV·Excel 업로드만으로 먼저 진단을 시작합니다.',
  },
  {
    title: '운영 누락 우선 점검',
    description: '청구, 평가, 상담, 기록의 끊긴 지점을 먼저 찾습니다.',
  },
  {
    title: '무료 진단부터 시작',
    description: '도입 설명보다 실제 누락 가능 항목과 우선순위를 먼저 보여드립니다.',
  },
];

const heroPreviewNotes = [
  '가공 목업이 아니라 실제 배포 모바일 UI 일부를 축소해 보여줍니다.',
  '내부 텍스트를 읽게 하는 용도보다 앱 톤과 실제 구조를 확인하는 증빙 컷입니다.',
  '세부 설명은 랜딩 타이포가 맡고, 스크린샷은 신뢰를 보강하는 역할만 하도록 줄였습니다.',
];

const fitCards = [
  '방문요양, 방문목욕, 기타 재가서비스를 함께 운영하는 복합 재가기관',
  '청구와 평가 대응을 대표나 실무자가 직접 챙겨야 하는 기관',
  '담당자 변경 시 기록 공백과 인수인계 부담이 큰 기관',
  '보호자 상담·응대와 계약 전환 흐름까지 함께 관리하고 싶은 기관',
];

interface DiagnosisFormState {
  institutionName: string;
  institutionType: string;
  currentProgram: string;
  dataAvailability: string;
  priorityRisk: string;
  contact: string;
}

const defaultDiagnosisForm: DiagnosisFormState = {
  institutionName: '',
  institutionType: institutionTypes[0],
  currentProgram: '',
  dataAvailability: dataAvailabilityOptions[0],
  priorityRisk: commonRiskOptions[0],
  contact: '',
};

export function LandingPage() {
  const [diagnosisForm, setDiagnosisForm] = useState<DiagnosisFormState>(defaultDiagnosisForm);

  const emailBodyLines = [
    '무료 운영 진단 신청',
    '',
    `기관명: ${diagnosisForm.institutionName || '미입력'}`,
    `기관 유형: ${diagnosisForm.institutionType}`,
    `현재 사용하는 프로그램: ${diagnosisForm.currentProgram || '미입력'}`,
    `최근 2~3개월 데이터 업로드 가능 여부: ${diagnosisForm.dataAvailability}`,
    `가장 자주 놓치는 항목: ${diagnosisForm.priorityRisk}`,
    `연락처: ${diagnosisForm.contact || '미입력'}`,
    '',
    '운영 진단 리포트 상담을 요청드립니다.',
  ];

  const mailtoHref = `mailto:support@yoyang-radar.kr?subject=${encodeURIComponent(`[무료 운영 진단] ${diagnosisForm.institutionName || '기관명 미입력'}`)}&body=${encodeURIComponent(emailBodyLines.join('\n'))}`;

  const handleDiagnosisSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof window !== 'undefined') {
      window.location.href = mailtoHref;
    }
  };

  return (
    <div data-emotion-mode="calm" className="public-canvas min-h-screen pb-24 text-text-strong sm:pb-0">
      <div className="public-grain relative isolate min-h-screen overflow-hidden">
        <header className="relative z-20 border-b border-border-subtle bg-surface-70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-container-xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
            <Link to="/">
              <BrandMark caption="요양레이다 운영관리 서비스" />
            </Link>

            <div className="hidden items-center gap-3 text-sm text-text-primary lg:flex">
              {heroFlow.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="public-nav-pill"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="public-cta-secondary hidden sm:inline-flex"
              >
                기존 고객 로그인
              </Link>
              <a
                href="#diagnosis-form"
                className="public-cta-primary"
              >
                무료 운영 진단 신청
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <main>
          <section className="relative z-10 mx-auto max-w-container-xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:py-18">
            <div className="grid gap-8 lg:grid-cols-hero lg:items-center xl:gap-10">
              <div className="max-w-container-lg lg:pr-6">
                <StatusBadge label="2026 운영 누락 진단 랜딩" variant="processing" dot={false} className="bg-surface-action-82 text-action-700" />

                <h1
                  className="public-display mt-5 max-w-ch-7 text-5xl font-semibold leading-hero tracking-tight-hero text-brand-900 sm:max-w-ch-9 sm:text-7xl lg:text-8xl xl:text-9xl"
                >
                  기존 프로그램은 그대로, 운영 누락만 잡으세요.
                </h1>

                <p className="public-copy mt-6 max-w-prose text-base leading-7 sm:text-md sm:leading-8">
                  요양레이다는 기존 프로그램을 바꾸지 않고도 CSV·Excel 업로드만으로 운영 손실,
                  평가·지정갱신 준비, 상담·보호자 응대, 현장 기록 누락을 점검하는 보완형 운영관리
                  서비스입니다.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#diagnosis-form"
                    className="public-cta-primary"
                  >
                    무료 운영 진단 신청
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#report-preview"
                    className="public-cta-secondary"
                  >
                    운영 진단 리포트 예시 보기
                  </a>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {heroProofCards.map((item) => (
                    <GlassCard
                      key={item.title}
                      className="public-panel border-border-brand-10 bg-surface-80 p-4 shadow-card"
                    >
                      <p className="text-sm font-semibold text-brand-900">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>

              <div className="relative lg:justify-self-end">
                <GlassCard className="public-panel overflow-hidden border-border-brand-12 bg-gradient-hero-glass p-4 shadow-float sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-label text-brand-700">Operations Diagnosis Board</p>
                      <p className="mt-2 text-xl font-semibold text-brand-900 sm:text-2xl">실제 모바일 화면으로 먼저 확인하세요</p>
                      <p className="mt-3 max-w-prose-narrow text-sm leading-6 text-text-muted">
                        히어로의 설명은 랜딩 타이포가 맡고, 실제 화면은 과장 없이 증빙 컷으로만 보여드립니다.
                      </p>
                    </div>
                    <StatusBadge label="실제 모바일 화면" variant="info" dot={false} />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-hero-sidebar md:items-center">
                    <MobilePreviewShell />

                    <div className="grid gap-3">
                      {heroPreviewNotes.map((note) => (
                        <div
                          key={note}
                          className="rounded-2xl border border-border-brand-10 bg-surface-78 px-4 py-3 text-sm leading-6 text-text-primary"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          <section id="problem" className="relative z-10 scroll-mt-28 border-y border-border-subtle bg-surface-56">
            <div className="mx-auto max-w-container-xl px-5 py-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-problem lg:items-start">
                <div className="max-w-container-md">
                  <SectionIntro
                    eyebrow="Problem"
                    title="입력보다 더 큰 문제는, 운영 누락이 늦게 보인다는 점입니다."
                    description="장기요양기관 운영의 핵심은 기록을 남기는 일보다 누락을 빨리 발견하고 후속 조치까지 연결하는 일입니다. 손실은 늘 입력 직후가 아니라, 나중에 정산과 평가, 상담 후속에서 드러납니다."
                  />

                  <GlassCard className="public-panel mt-8 border-border-brand-12 bg-gradient-dark-card p-6 text-white">
                    <p className="text-xs uppercase tracking-label text-white/62">What Breaks First</p>
                    <p className="mt-3 text-2xl font-semibold">누락은 보통 한 부서에서 시작되지 않습니다.</p>
                    <p className="mt-4 text-sm leading-7 text-white/76">
                      청구, 평가, 상담, 기록이 따로 움직이는 순간 작은 공백이 운영 손실로 커집니다. 그래서
                      랜딩도 기능 나열 대신 기관의 실제 끊김 지점을 먼저 보여주도록 구성했습니다.
                    </p>
                  </GlassCard>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {painPoints.map((item) => (
                    <GlassCard
                      key={item.title}
                      className="public-panel landing-sheen h-full border-border-brand-12 bg-surface-90 p-6"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-brand-14 bg-warning-10 text-[color:var(--warning-600)]">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <h2 className="mt-5 text-xl font-semibold text-brand-900">{item.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-text-primary">{item.description}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="why-now" className="relative z-10 scroll-mt-28 mx-auto max-w-container-xl px-5 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-why-now">
              <GlassCard className="public-panel border-border-brand-12 bg-gradient-why-now p-7">
                <SectionIntro
                  eyebrow="Why Now"
                  title="2026년에는 운영과 제도 대응을 따로 볼 수 없습니다."
                  description="기록만 잘하는 기관보다 누락 없이 대응하는 기관이 더 유리해졌습니다. 장기요양 제도 변화, 지정갱신 대응, 통합돌봄 이후 운영 연결성까지 한 번에 보는 시점입니다."
                />

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <WhyNowMetric title="제도 변화" value="가산·한도·장려금" />
                  <WhyNowMetric title="운영 압력" value="평가·지정갱신 동시 대응" />
                  <WhyNowMetric title="현장 리듬" value="상담·기록·후속 연결" />
                </div>
              </GlassCard>

              <div className="grid gap-5">
                {urgencyCards.map((item) => (
                  <GlassCard key={item.title} className="public-panel border-border-brand-12 bg-surface-88 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border-brand-14 bg-surface-action-72 text-action-700">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-brand-900">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-text-primary">{item.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          <section id="solution" className="relative z-10 scroll-mt-28 border-y border-border-subtle bg-surface-70">
            <div className="mx-auto max-w-container-xl px-5 py-20 sm:px-6 lg:px-8">
              <SectionIntro
                eyebrow="Solution"
                title="요양레이다는 업무 처리 도구가 아니라 운영 누락 방지 도구입니다."
                description="대체보다 보완, 자동작성보다 점검과 검수, 도입보다 운영 진단을 먼저 제안합니다. 그래서 공개 페이지도 기능 설명보다 운영 리스크가 어떻게 연결되는지 먼저 보여줍니다."
              />

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {solutionCards.map((item) => (
                  <GlassCard key={item.title} className="public-panel landing-sheen h-full border-border-brand-12 bg-surface-92 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-brand-14 bg-brand-12 text-brand-700">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-brand-900">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-text-primary">{item.description}</p>
                    <p className="mt-5 text-sm font-medium text-brand-700">{item.meta}</p>
                  </GlassCard>
                ))}
              </div>

              <GlassCard className="public-panel mt-8 border-border-brand-12 bg-gradient-light-card p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-label text-brand-700">Linked Operations</p>
                    <h2 className="mt-2 text-2xl font-semibold text-brand-900">운영 손실부터 기록 보완까지 하나의 흐름으로 연결합니다.</h2>
                  </div>
                  <StatusBadge label="누락 방지 중심" variant="warning" dot={false} />
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-4">
                  {connectionSteps.map((step, index) => (
                    <div key={step.title} className="relative">
                      <div className="rounded-2xl border border-border-brand-12 bg-surface-82 px-5 py-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs uppercase tracking-step text-[color:var(--text-soft)]">Step {index + 1}</span>
                          <CheckCircle2 className="h-4 w-4 text-brand-700" />
                        </div>
                        <p className="mt-4 text-lg font-semibold text-brand-900">{step.title}</p>
                        <p className="mt-3 text-sm leading-7 text-text-primary">{step.description}</p>
                      </div>

                      {index < connectionSteps.length - 1 && (
                        <div className="hidden lg:block">
                          <div className="absolute right-[-14px] top-1/2 h-px w-7 -translate-y-1/2 bg-border-brand-16" />
                          <ArrowRight className="absolute right-[-18px] top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--brand-600)]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </section>

          <section id="report-preview" className="relative z-10 scroll-mt-28 mx-auto max-w-container-xl px-5 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-report">
              <GlassCard className="public-panel border-border-brand-12 bg-gradient-report p-7 text-white">
                <p className="text-xs uppercase tracking-kicker text-white/62">Report Preview</p>
                <h2
                  className="mt-4 text-4xl leading-section tracking-tight-section"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  먼저 문제를 보여드리고,
                  <br />
                  그다음 도입을 제안합니다.
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/76">
                  초기 영업도 제품 가입보다 운영 진단 리포트가 먼저입니다. 그래서 랜딩의 핵심 CTA도 회원가입이 아니라
                  무료 운영 진단 신청으로 바꿨습니다.
                </p>

                <div className="mt-8 space-y-3">
                  <ReportStat label="진단 기준" value="최근 2~3개월 데이터" tone="dark" />
                  <ReportStat label="리포트 목적" value="누락 가능 항목과 우선순위 정리" tone="dark" />
                  <ReportStat label="다음 단계" value="보완 우선순위와 후속 조치 정리" tone="dark" />
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-5">
                  <p className="text-sm font-semibold text-white">이런 기관에 특히 잘 맞습니다.</p>
                  <div className="mt-4 grid gap-3">
                    {fitCards.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-white/78">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-white/78" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              <div className="grid gap-4">
                {reportPreviewItems.map((item) => (
                  <GlassCard key={item.title} className="public-panel landing-sheen border-border-brand-12 bg-surface-90 p-6">
                    <p className="text-xs uppercase tracking-card text-brand-700">{item.label}</p>
                    <h3 className="mt-3 text-xl font-semibold text-brand-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-text-primary">{item.description}</p>
                  </GlassCard>
                ))}

                <div className="grid gap-4 sm:grid-cols-3">
                  {trustCards.map((item) => (
                    <GlassCard key={item.label} className="public-panel border-border-brand-12 bg-canvas-soft/96 p-5">
                      <p className="text-xs uppercase tracking-card text-[color:var(--text-soft)]">{item.label}</p>
                      <p className="mt-3 text-xl font-semibold text-brand-900">{item.value}</p>
                      <p className="mt-3 text-sm leading-7 text-text-primary">{item.description}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="diagnosis-form" className="relative z-10 scroll-mt-28 border-t border-border-subtle bg-surface-56/62">
            <div className="mx-auto max-w-container-xl px-5 py-20 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-why-now lg:items-start">
                <div>
                  <SectionIntro
                    eyebrow="Free Diagnosis"
                    title="신청은 가볍게, 진단은 밀도 있게 받으세요."
                    description="공개 API 없이도 바로 신청할 수 있도록 메일 초안 기반으로 구성했습니다. 입력한 내용은 오른쪽 프리뷰에 즉시 반영되고, 제출 버튼을 누르면 support@yoyang-radar.kr로 보낼 메일 초안이 열립니다."
                  />

                  <div className="mt-8 flex flex-wrap gap-3">
                    <TagPill icon={Upload} text="CSV·Excel 업로드 가능 여부만 먼저 확인" />
                    <TagPill icon={Clock3} text="진단 요청 후 개별 연락으로 우선 보완 항목 정리" />
                    <TagPill icon={MessageSquare} text="메일 초안 기반 신청으로 바로 시작" />
                  </div>

                  <GlassCard className="public-panel mt-8 border-border-brand-12 bg-surface-92 p-6">
                    <form className="grid gap-4" onSubmit={handleDiagnosisSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <DiagnosisField label="기관명">
                          <input
                            required
                            value={diagnosisForm.institutionName}
                            onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, institutionName: event.target.value }))}
                            className="auth-field mt-0"
                            placeholder="예: 은샘노인재가복지센터"
                          />
                        </DiagnosisField>

                        <DiagnosisField label="연락처">
                          <input
                            required
                            value={diagnosisForm.contact}
                            onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, contact: event.target.value }))}
                            className="auth-field mt-0"
                            placeholder="이메일 또는 휴대전화"
                          />
                        </DiagnosisField>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <DiagnosisField label="기관 유형">
                          <select
                            value={diagnosisForm.institutionType}
                            onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, institutionType: event.target.value }))}
                            className="auth-field mt-0"
                          >
                            {institutionTypes.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </DiagnosisField>

                        <DiagnosisField label="가장 자주 놓치는 항목">
                          <select
                            value={diagnosisForm.priorityRisk}
                            onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, priorityRisk: event.target.value }))}
                            className="auth-field mt-0"
                          >
                            {commonRiskOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </DiagnosisField>
                      </div>

                      <DiagnosisField label="현재 사용하는 프로그램">
                        <input
                          value={diagnosisForm.currentProgram}
                          onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, currentProgram: event.target.value }))}
                          className="auth-field mt-0"
                          placeholder="예: 케어포, 자체 엑셀, 사내 프로그램"
                        />
                      </DiagnosisField>

                      <DiagnosisField label="최근 2~3개월 데이터 업로드 가능 여부">
                        <select
                          value={diagnosisForm.dataAvailability}
                          onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, dataAvailability: event.target.value }))}
                          className="auth-field mt-0"
                        >
                          {dataAvailabilityOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </DiagnosisField>

                      <div className="grid gap-3 pt-2 sm:grid-cols-form-submit sm:items-center">
                        <p className="text-sm leading-6 text-text-muted">
                          제출 버튼을 누르면 `support@yoyang-radar.kr`로 보낼 메일 초안이 열립니다.
                        </p>
                        <button type="submit" className="auth-primary-button w-full sm:w-auto">
                          무료 운영 진단 요청하기
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </form>
                  </GlassCard>
                </div>

                <div className="grid gap-5 lg:sticky lg:top-28">
                  <GlassCard className="public-panel landing-sheen border-border-brand-12 bg-gradient-dark-card p-6 text-white">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-label text-white/62">Mail Draft Preview</p>
                        <p className="mt-2 text-xl font-semibold">입력 내용이 메일 초안으로 바로 정리됩니다.</p>
                      </div>
                      <StatusBadge label="공개 URL 없이 신청 가능" variant="success" dot={false} />
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/6 p-5">
                      <p className="text-xs uppercase tracking-badge text-white/56">Subject</p>
                      <p className="mt-2 text-sm font-medium text-white/88">
                        [무료 운영 진단] {diagnosisForm.institutionName || '기관명 미입력'}
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-5">
                      <p className="text-xs uppercase tracking-badge text-white/56">Body</p>
                      <div className="mt-3 space-y-2 text-sm leading-7 text-white/82">
                        {emailBodyLines.map((line, index) => (
                          <p key={`${line}-${index}`} className={line ? '' : 'h-3'}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <a
                      href={mailtoHref}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/84 transition hover:text-white"
                    >
                      메일 앱에서 바로 열기
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </GlassCard>

                  <GlassCard className="public-panel border-border-brand-12 bg-surface-92 p-6">
                    <p className="text-xs uppercase tracking-label text-brand-700">FAQ</p>
                    <div className="mt-4 grid gap-3">
                      {faqs.map((faq) => (
                        <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-border-subtle bg-canvas-soft/82">
          <div className="mx-auto flex max-w-container-xl flex-col gap-6 px-5 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-sm font-semibold tracking-brand text-brand-900">LIDER 요양레이다</p>
              <p className="mt-1 text-sm text-text-muted">
                기존 요양 프로그램은 그대로 두고, 운영 누락 방지와 운영 진단부터 시작하는 보완형 서비스
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#diagnosis-form"
                className="public-cta-secondary"
              >
                무료 운영 진단 신청
              </a>
              <Link
                to="/login"
                className="public-cta-primary"
              >
                기존 고객 로그인
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </footer>

        <div className="fixed inset-x-0 bottom-4 z-30 px-4 sm:hidden">
          <a
            href="#diagnosis-form"
            className="public-floating-cta"
          >
            무료 운영 진단 신청
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-container-lg">
      <p className="public-kicker">{eyebrow}</p>
      <h2
        className="public-heading mt-4 text-3xl font-semibold leading-heading tracking-tight-heading text-brand-900 sm:text-6xl"
      >
        {title}
      </h2>
      <p className="public-copy mt-5 text-base leading-8">{description}</p>
    </div>
  );
}

function WhyNowMetric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="public-metric-card">
      <p className="text-xs uppercase tracking-card text-[color:var(--text-soft)]">{title}</p>
      <p className="mt-2 text-sm font-semibold text-brand-900">{value}</p>
    </div>
  );
}

function MobilePreviewShell() {
  return (
    <div className="mx-auto w-full max-w-[228px] rounded-2xl border border-dark-surface-12 bg-gradient-mobile-shell p-3 shadow-[0_18px_42px_rgba(39,53,45,0.18)] sm:max-w-[244px] lg:max-w-[252px]">
      <div className="rounded-2xl bg-gradient-mobile-bg p-3 sm:p-4">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-dark-surface-12 sm:mb-4" />

        <div className="relative h-[286px] overflow-hidden rounded-2xl border border-dark-surface-10 bg-white shadow-[0_16px_32px_rgba(39,53,45,0.1)] sm:h-[316px] lg:h-[342px]">
          <img
            src={deployedMobilePreview}
            alt="실제 배포 모바일 화면 예시"
            className="block h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-white-fade" />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-3 sm:px-4 sm:pt-4">
            <span className="rounded-full bg-surface-90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-mobile text-brand-700 sm:px-3 sm:text-[10px] sm:tracking-badge">
              Real Mobile UI
            </span>
            <span className="rounded-full bg-dark-surface-92 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-min text-white sm:px-3 sm:text-[10px] sm:tracking-tiny">
              Live App Shot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportStat({
  label,
  value,
  tone = 'light',
}: {
  label: string;
  value: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div
      className={
        tone === 'dark'
          ? 'flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/6 px-4 py-3'
          : 'flex items-center justify-between gap-4 rounded-xl border border-border-brand-12 bg-surface-78 px-4 py-3'
      }
    >
      <p className={tone === 'dark' ? 'text-sm text-white/62' : 'text-sm text-text-muted'}>{label}</p>
      <p className={tone === 'dark' ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-brand-900'}>
        {value}
      </p>
    </div>
  );
}

function TagPill({
  icon: Icon,
  text,
}: {
  icon: typeof Upload;
  text: string;
}) {
  return (
    <div className="public-tag-pill">
      <Icon className="h-4 w-4 text-brand-700" />
      <span>{text}</span>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="public-faq-item group px-5 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
        <span className="text-base font-semibold text-brand-900">{question}</span>
        <span className="text-brand-700 transition group-open:rotate-45">
          <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
        </span>
      </summary>
      <p className="mt-3 text-sm leading-7 text-text-primary">{answer}</p>
    </details>
  );
}

function DiagnosisField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <p className="public-field-label">{label}</p>
      {children}
    </label>
  );
}
