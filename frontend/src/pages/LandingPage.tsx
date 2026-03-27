import { type FormEvent, type ReactNode, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck,
  FileSpreadsheet,
  FileText,
  MessageSquare,
  Search,
  ShieldCheck,
  Upload,
  Workflow,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, StatusBadge } from '../components/ui';
import { BrandMark } from '../components/public/BrandMark';
import deployedMobilePreview from '../../deployed-login-mobile-after-polish.png';

// B2B AI Platform - Pain Points (Generic business document/workflow issues)
const painPoints = [
  {
    title: '문서 처리에 업무 시간이 과도하게 소모되는 순간',
    description: 'PDF, Excel, 이미지에서 데이터를 수동으로 추출하고 정리하는 작업은 반복적이며 오류가 잦습니다. 시간은 소모되고 핵심 업무는 뒤로 밀립니다.',
  },
  {
    title: '정보가 흩어져 있어 결정이 늦어지는 순간',
    description: '문서, 이메일, 메신저, 클라우드 저장소에 흩어진 정보를 찾느라 의사결정이 지연됩니다. 검색보다 정리가 먼저 필요합니다.',
  },
  {
    title: '업무 흐름이 담당자 개인에게 의존하는 순간',
    description: '승인, 검토, 후속 조치가 개인 메모와 메신저에 남으면 담당자 변경, 휴가, 퇴사 시 업무 공백이 급격히 커집니다.',
  },
  {
    title: 'AI 도입은 했지만 실제 업무에 적용이 안되는 순간',
    description: 'AI 도구는 많지만 기존 문서와 연결되지 않으면孤岛가 되고, 직원들은 결국 기존 방식으로 돌아갑니다.',
  },
];

// B2B AI Platform - Urgency Cards (Generic AI/Automation trends)
const urgencyCards = [
  {
    icon: Zap,
    title: 'AI 자동화 경쟁력',
    description: '문서 추출, 데이터 정리, 검색 업무를 자동화하지 않으면 경쟁사 대비 운영 효율에서 뒤처지기 시작합니다.',
  },
  {
    icon: ShieldCheck,
    title: '데이터 정확성과 컴플라이언스',
    description: '수동 입력의 오류율은 자동화 도구 사용 시보다 10배 이상 높습니다. 검증 가능한 데이터 파이프라인이 필요합니다.',
  },
  {
    icon: Bot,
    title: 'AI 도입의 연결성',
    description: '단독 AI 도구보다 기존 문서, 데이터, 업무 흐름과 연결된 AI가 실제 ROI를 만듭니다. 분리될수록 ROI는 줄어듭니다.',
  },
];

// B2B AI Platform - Solution Cards (Generic AI value props)
const solutionCards = [
  {
    icon: FileText,
    title: '문서 AI 추출',
    description: 'PDF, 이미지, Excel에서 텍스트와 데이터를 자동 추출하여 구조화합니다. 수동 입력 시간을 90% 줄입니다.',
    meta: 'PDF · 이미지 · Excel 추출',
  },
  {
    icon: Search,
    title: '통합 AI 검색',
    description: '흩어진 문서와 데이터를 하나의 검색창에서 자연어로 찾습니다. 위치가 아닌 내용 기반으로 검색합니다.',
    meta: '자연어 검색 · 의미 기반',
  },
  {
    icon: Workflow,
    title: '업무 자동화',
    description: '추출 → 검색 → 승인 → 저장 → 공유까지 업무 흐름을 연결하고 반복 작업을 자동화합니다.',
    meta: '워크플로우 · 알림 · 리마인더',
  },
];

// B2B AI Platform - Report Preview Items
const reportPreviewItems = [
  {
    label: '문서 AI 추출',
    title: '복잡한 문서에서 자동 추출 완료',
    description: '영수증, 계약서, 보고서에서 핵심 데이터를 AI가 추출하고 검증합니다.',
  },
  {
    label: '통합 AI 검색',
    title: '흩어진 정보를 한 번에 찾기',
    description: '문서 내용 기반 검색으로 "지난 분기 매출 보고서 중 A고객 관련 내용"을 바로 찾습니다.',
  },
  {
    label: '업무 자동화',
    title: '승인 흐름과 후속 조치 자동 연결',
    description: '문서 추출 결과를 검토 → 승인 → 저장 → 공유까지 자동으로 연결합니다.',
  },
];

// B2B AI Platform - Trust Cards
const trustCards = [
  {
    label: '문서 추출',
    value: 'PDF · 이미지 · Excel',
    description: '다양한 형식의 문서에서 텍스트, 테이블, 핵심 정보를 AI가 자동 추출합니다.',
  },
  {
    label: 'AI 검색',
    value: '의미 기반 · 자연어',
    description: '키워드 매칭이 아닌 내용 이해 기반 검색으로 정확한 정보를 찾습니다.',
  },
  {
    label: '업무 연결',
    value: '워크플로우 · 자동화',
    description: '추출 → 검색 → 승인 → 저장까지 업무 단계를 연결하고 자동화합니다.',
  },
];

// B2B AI Platform - FAQs
const faqs = [
  {
    question: '기존 시스템과 연동이 가능한가요?',
    answer: '네, LIDER는 기존 ERP, CRM, 클라우드 스토리지와 API 연동을 지원합니다. CSV, Excel 업로드로도 시작 가능합니다.',
  },
  {
    question: 'AI가 모든 문서를 완벽하게 추출하나요?',
    answer: 'AI 추출 + 인간 검증 흐름을 권장합니다. 자동화는 90% 이상 담당하고, 검증은 사람이 맡아 정확성을 보장합니다.',
  },
  {
    question: '어떤 조직에 가장 적합한가요?',
    answer: '문서 처리와 데이터 정리에 많은 시간을 쓰는 중소기업, 에이전시, 컨설팅, 유통, 서비스업에 특히 효과적입니다.',
  },
  {
    question: '무료 진단은 어떤 것을 제공하나요?',
    answer: '현재 문서 처리 흐름을 분석하고, AI 자동화 적용 가능 영역과 예상 ROI를 리포트로 제공합니다.',
  },
];

// B2B AI Platform - Organization Types
const institutionTypes = [
  '중소기업 (50인 이하)',
  '중견기업 (50~300인)',
  '에이전시/컨설팅',
  '유통/물류 기업',
  '서비스/교육 기업',
];

// B2B AI Platform - Data Availability
const dataAvailabilityOptions = [
  '최근 3개월 문서/데이터 업로드 가능',
  '일부 데이터만 정리 가능',
  '데이터 정리는 필요하지만 진단 상담 원함',
];

// B2B AI Platform - Priority Risks
const commonRiskOptions = [
  '문서 추출/데이터 입력 수동 작업',
  '흩어진 정보 검색/정리',
  '승인/검토 워크플로우 지연',
  '담당자 변경 시 인수인계 공백',
];

// B2B AI Platform - Hero Flow Navigation
const heroFlow = [
  { label: '문제 공감', href: '#problem' },
  { label: 'AI 자동화', href: '#why-now' },
  { label: '솔루션', href: '#solution' },
  { label: '리포트 미리보기', href: '#report-preview' },
  { label: '무료 진단 신청', href: '#diagnosis-form' },
];

// B2B AI Platform - Connection Steps
const connectionSteps = [
  {
    title: '문서 AI 추출',
    description: 'PDF, 이미지, Excel에서 텍스트와 데이터를 자동으로 추출합니다.',
  },
  {
    title: '통합 AI 검색',
    description: '흩어진 문서를 자연어 검색으로 한 번에 찾습니다.',
  },
  {
    title: '업무 자동화',
    description: '추출 → 검색 → 승인 → 저장까지 워크플로우를 연결합니다.',
  },
  {
    title: '성과 분석',
    description: '시간 절약, 오류 감소, 업무 속도 향상을 측정합니다.',
  },
];

// B2B AI Platform - Hero Proof Cards
const heroProofCards = [
  {
    title: '기존 시스템 유지',
    description: '교체 없이 CSV·Excel 업로드 또는 API 연동으로 먼저 시작합니다.',
  },
  {
    title: 'AI 추출 + 인간 검증',
    description: 'AI가 90% 자동화하고, 사람은 검증과 의사결정에 집중합니다.',
  },
  {
    title: '무료 진단부터 시작',
    description: '도입 설명보다 실제 적용 가능 영역과 예상 ROI를 먼저 보여드립니다.',
  },
];

// B2B AI Platform - Hero Preview Notes
const heroPreviewNotes = [
  '실제 배포된 모바일 UI 일부를 축소해 보여줍니다.',
  '랜딩 타이포가 설명을 맡고, 스크린샷은 신뢰를 보강하는 역할만 합니다.',
  '실제 앱 구조와 톤을 확인하는 증빙 컷입니다.',
];

// B2B AI Platform - Fit Cards (Target Organizations)
const fitCards = [
  '문서 처리와 데이터 정리에 많은 시간을 쓰는 성장 중인 기업',
  'PDF, Excel, 이미지에서 정보를 수동 추출하는 업무가 반복되는 조직',
  '담당자 변경 시 문서와 데이터 인수인계가 어려운 팀',
  'AI 도입은 했지만 기존 업무와 연결이 안돼 활용하지 못하는 기업',
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
    'LIDER 무료 업무 진단 신청',
    '',
    `회사명: ${diagnosisForm.institutionName || '미입력'}`,
    `회사 규모/유형: ${diagnosisForm.institutionType}`,
    `현재 사용하는 시스템: ${diagnosisForm.currentProgram || '미입력'}`,
    `최근 3개월 데이터 업로드 가능 여부: ${diagnosisForm.dataAvailability}`,
    `가장 개선이 필요한 영역: ${diagnosisForm.priorityRisk}`,
    `연락처: ${diagnosisForm.contact || '미입력'}`,
    '',
    'AI 업무 자동화 진단 리포트 상담을 요청드립니다.',
  ];

  const mailtoHref = `mailto:support@lider.ai?subject=${encodeURIComponent(`[무료 업무 진단] ${diagnosisForm.institutionName || '회사명 미입력'}`)}&body=${encodeURIComponent(emailBodyLines.join('\n'))}`;

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
              <BrandMark caption="AI 업무 오케스트레이션 플랫폼" />
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
                무료 업무 진단 신청
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <main>
          <section className="relative z-10 mx-auto max-w-container-xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:py-18">
            <div className="grid gap-8 lg:grid-cols-hero lg:items-center xl:gap-10">
              <div className="max-w-container-lg lg:pr-6">
                <StatusBadge label="LIDER AI 업무 오케스트레이션" variant="processing" dot={false} className="bg-surface-action-82 text-action-700" />

                <h1
                  className="public-display mt-5 max-w-ch-7 text-5xl font-semibold leading-hero tracking-tight-hero text-brand-900 sm:max-w-ch-9 sm:text-7xl lg:text-8xl xl:text-9xl"
                >
                  문서 추출, AI 검색, 업무 자동화를 하나의 흐름으로.
                </h1>

                <p className="public-copy mt-6 max-w-prose text-base leading-7 sm:text-md sm:leading-8">
                  LIDER는 PDF·이미지에서 데이터를 AI로 추출하고, 흩어진 정보를 통합 검색하며, 
                  승인·저장·공유까지 자동화하는 AI 업무 오케스트레이션 플랫폼입니다.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#diagnosis-form"
                    className="public-cta-primary"
                  >
                    무료 업무 진단 신청
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#report-preview"
                    className="public-cta-secondary"
                  >
                    진단 리포트 예시 보기
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
                      <p className="text-xs uppercase tracking-label text-brand-700">Operations Dashboard</p>
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
                    title="문서 처리에 시간을 쓰다 보면, 핵심 업무가 뒤로 밀립니다."
                    description="수동 데이터 입력, 흩어진 정보 검색, 반복적인 문서 정리는 업무 시간의 40% 이상을 차지합니다. 효율은 떨어지고 오류는 늘어납니다."
                  />

                  <GlassCard className="public-panel mt-8 border-border-brand-12 bg-gradient-dark-card p-6 text-white">
                    <p className="text-xs uppercase tracking-label text-white/62">What Breaks First</p>
                    <p className="mt-3 text-2xl font-semibold">문서는 쌓이는데, 정작 필요할 때는 찾기 어렵습니다.</p>
                    <p className="mt-4 text-sm leading-7 text-white/76">
                      폴더 구조, 파일명 규칙, 검색 키워드에 의존하다 보면 정보는 유실되고 의사결정은 지연됩니다. 
                      AI는 이 지점에서 문서 이해 기반 검색과 자동 추출로 해결책을 제공합니다.
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
                  title="AI 자동화는 이제 경쟁력의 문제입니다."
                  description="문서 추출과 데이터 정리를 자동화하지 않으면 경쟁사 대비 속도에서 밀리게 됩니다. AI 도입은 선택이 아닌 생존의 문제가 되고 있습니다."
                />

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <WhyNowMetric title="시간 절약" value="문서 처리 90% 단축" />
                  <WhyNowMetric title="오류 감소" value="수동 입력 오류 80% 감소" />
                  <WhyNowMetric title="검색 속도" value="정보 탐색 5배 빠르게" />
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
                title="LIDER는 단독 AI 도구가 아니라 업무 오케스트레이션 플랫폼입니다."
                description="추출 → 검색 → 자동화를 분리하지 않고 하나의 흐름으로 연결합니다. 그래서 도입 후에도 실제 업무에 자연스럽게 스며듭니다."
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
                    <h2 className="mt-2 text-2xl font-semibold text-brand-900">문서 추출부터 업무 자동화까지 하나의 흐름으로 연결합니다.</h2>
                  </div>
                  <StatusBadge label="통합 플랫폼" variant="warning" dot={false} />
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
                  먼저 적용 가능 영역을 보여드리고,
                  <br />
                  그다음 도입을 제안합니다.
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/76">
                  LIDER의 진단 리포트는 현재 문서 처리 흐름을 분석하고, AI 자동화 적용 가능 영역과 예상 ROI를 보여드립니다.
                </p>

                <div className="mt-8 space-y-3">
                  <ReportStat label="진단 기준" value="최근 3개월 문서/데이터" tone="dark" />
                  <ReportStat label="리포트 목적" value="AI 적용 가능 영역과 ROI 예측" tone="dark" />
                  <ReportStat label="다음 단계" value="우선순위 정리 및 시범 적용" tone="dark" />
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-5">
                  <p className="text-sm font-semibold text-white">이런 조직에 특히 잘 맞습니다.</p>
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
                    description="공개 API 없이도 바로 신청할 수 있도록 메일 초안 기반으로 구성했습니다. 입력한 내용은 오른쪽 프리뷰에 즉시 반영되고, 제출 버튼을 누르면 support@lider.ai로 보낼 메일 초안이 열립니다."
                  />

                  <div className="mt-8 flex flex-wrap gap-3">
                    <TagPill icon={Upload} text="CSV·Excel 업로드 또는 API 연동" />
                    <TagPill icon={Clock3} text="진단 요청 후 개별 연락으로 우선 적용 영역 정리" />
                    <TagPill icon={MessageSquare} text="메일 초안 기반 신청으로 바로 시작" />
                  </div>

                  <GlassCard className="public-panel mt-8 border-border-brand-12 bg-surface-92 p-6">
                    <form className="grid gap-4" onSubmit={handleDiagnosisSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <DiagnosisField label="회사명">
                          <input
                            required
                            value={diagnosisForm.institutionName}
                            onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, institutionName: event.target.value }))}
                            className="auth-field mt-0"
                            placeholder="예: (주)테크솔루션"
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
                        <DiagnosisField label="회사 규모/유형">
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

                        <DiagnosisField label="가장 개선이 필요한 영역">
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

                      <DiagnosisField label="현재 사용하는 시스템">
                        <input
                          value={diagnosisForm.currentProgram}
                          onChange={(event) => setDiagnosisForm((prev) => ({ ...prev, currentProgram: event.target.value }))}
                          className="auth-field mt-0"
                          placeholder="예: ERP, 그룹웨어, 자체 개발 시스템"
                        />
                      </DiagnosisField>

                      <DiagnosisField label="최근 3개월 데이터 업로드 가능 여부">
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
                          제출 버튼을 누르면 `support@lider.ai`로 보낼 메일 초안이 열립니다.
                        </p>
                        <button type="submit" className="auth-primary-button w-full sm:w-auto">
                          무료 업무 진단 요청하기
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
                        [무료 업무 진단] {diagnosisForm.institutionName || '회사명 미입력'}
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
              <p className="text-sm font-semibold tracking-brand text-brand-900">LIDER</p>
              <p className="mt-1 text-sm text-text-muted">
                AI 업무 오케스트레이션 플랫폼 - 문서 추출, 통합 검색, 업무 자동화를 하나의 흐름으로
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#diagnosis-form"
                className="public-cta-secondary"
              >
                무료 업무 진단 신청
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
            무료 업무 진단 신청
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
