# LIDER AI Platform - Design & UX/UI Principles
## 2026 Design Trends Alignment

> **핵심 규칙**: 모든 디자인과 UX/UI는 사업기획에 밀접하게 정렬되며, 2026년 최신 디자인 트렌드를 반영해야 합니다.

---

## 1. 2026 UX/UI Design Trends

### 🎨 Visual Design Trends

#### Glassmorphism 2.0 & Neumorphism Hybrid
- **적용 영역**: 대시보드 카드, 모달 창, 네비게이션
- **특징**: 
  - 미세한 입체감과 투명도 결합
  - `backdrop-filter: blur(20px)` + 부드러운 그림자
  - 다크/라이트 모드 모두 지원

#### Immersive Gradients & Aurora Effects
- **적용 영역**: 헤더, 히어로 섹션, 로딩 상태
- **특징**:
  - 유동적인 애니메이션 그라데이션
  - CSS `@property` 기반 컬러 트랜지션
  - 브랜드 컬러의 유기적 변화

#### Dark Mode First Design
- **원칙**: 모든 컴포넌트를 다크 모드 기준으로 설계
- **라이트 모드**: 다크 모드의 반전이 아닌 별도 디자인
- **컬러 팔레트**:
  ```
  Primary: #6366F1 (Indigo)
  Secondary: #8B5CF6 (Purple)
  Accent: #06B6D4 (Cyan)
  Background Dark: #0F172A
  Background Light: #F8FAFC
  ```

### 🤖 AI-Native Interface Patterns

#### Contextual Intelligence UI
- **특징**: AI가 사용자 행동을 예측하여 제안
- **패턴**:
  - Predictive chips (예측 칩)
  - Smart suggestions (스마트 제안)
  - Progressive disclosure (점진적 정보 공개)

#### Conversational Interface Elements
- **챗봇 UI**: 
  - 버블 메시지 디자인
  - 타이핑 인디케이터
  - 빠른 reply 버튼
- **Voice Interface**: 
  - 음성 파형 시각화
  - 실시간 트랜스크립션

### ⚡ Micro-Interactions & Motion

#### Purposeful Animation
- **원칙**: 모든 애니메이션은 의도가 있어야 함
- **지속 시간**: 200-300ms (Doherty Threshold 준수)
- **easing**: `cubic-bezier(0.4, 0, 0.2, 1)`

#### Scroll-Triggered Animations
- **적용**: 콘텐츠 공개, 카운터 애니메이션, 차트 진입
- **라이브러리**: Framer Motion, GSAP ScrollTrigger

#### Haptic Feedback Simulation (Web)
- **적용**: 버튼 클릭, 토글 스위치, 드래그 앤 드롭
- **기술**: CSS animation + Web Vibration API

### 📱 Responsive & Adaptive Design

#### Container Queries Over Media Queries
- **접근 방식**: 컴포넌트 기반 반응형 디자인
- **장점**: 재사용성, 유지보수 용이성

#### Foldable & Multi-Screen Support
- **고려사항**: 화면 접힘 영역 처리
- **레이아웃**: Flex/Grid 기반 적응형 레이아웃

---

## 2. 사업기획 정렬 원칙

### 🎯 비즈니스 목표 연결

| 사업 목표 | UX/UI 적용 |
|-----------|-----------|
| **업무 효율성 향상** | 원클릭 액션, 키보드 숏컷, 자동화 워크플로우 |
| **데이터 기반 의사결정** | 실시간 대시보드, 인터랙티브 차트, AI 인사이트 |
| **팀 협업 강화** | 공유 기능, 실시간 코멘트, 버전 히스토리 |
| **보안 & 신뢰** | 권한 시각화, 감사 로그, 투명한 AI 의사결정 |

### 👤 사용자 세그먼트별 설계

#### Power Users (관리자/파워유저)
- **특징**: 키보드 중심, 고급 기능 접근, 커스터마이징
- **UI**: 
  - 커맨드 팔레트 (Cmd+K)
  - 고급 필터/정렬
  - 대량 작업 지원

#### Occasional Users (일반 사용자)
- **특징**: 가이드 중심, 단순 워크플로우
- **UI**:
  - 온보딩 투어
  - 컨텍스트 헬프
  - 스마트 기본값

#### Mobile Users
- **특징**: 간결함, 터치 최적화, 오프라인 지원
- **UI**:
  - 하단 시트 네비게이션
  - 풀스크린 모달
  - 제스처 지원

---

## 3. LIDER 특화 디자인 시스템

### 🎨 Color System

```css
/* Primary Palette */
--color-primary-50: #EEF2FF;
--color-primary-100: #E0E7FF;
--color-primary-500: #6366F1;
--color-primary-600: #4F46E5;
--color-primary-900: #312E81;

/* Semantic Colors */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;

/* AI Accent */
--color-ai-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%);
```

### 🔤 Typography

```css
/* Font Stack */
--font-sans: 'Inter', 'Pretendard', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

### 🧩 Component Patterns

#### AI-Assisted Inputs
```
┌─────────────────────────────────────┐
│ 🔍 검색어 입력...          AI ✨   │
├─────────────────────────────────────┤
│ 💡 자동완성: "Q3 매출 보고서"       │
│ 💡 최근 검색: "고객 이탈 분석"      │
└─────────────────────────────────────┘
```

#### Confidence Indicators
```
┌─────────────────────────────────────┐
│ 추출 결과                     94%   │
│ ━━━━━━━━━━━━━━━━━━━━●────  신뢰도  │
│                                     │
│ 금액: ₩1,234,000                   │
│ 날짜: 2024-03-15      [확인됨] ✓    │
└─────────────────────────────────────┘
```

#### Action Preview Cards
```
┌─────────────────────────────────────┐
│ ⚠️ 실행 전 확인 필요               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                     │
│ 🎯 Zendesk 티켓 #1234 종료        │
│                                     │
│ 영향: 1개 티켓, 0명 담당자          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ [검토하기]  [수정]  [✓ 실행]       │
└─────────────────────────────────────┘
```

---

## 4. Accessibility & Inclusive Design

### ♿ WCAG 2.2 AA 준수

- **Color Contrast**: 4.5:1 (본문), 3:1 (UI 컴포넌트)
- **Focus Indicators**: 2px solid outline, offset 2px
- **Reduced Motion**: `@media (prefers-reduced-motion)` 지원
- **Screen Reader**: ARIA labels, live regions

### 🌍 Localization Ready

- **RTL Support**: 아랍어, 히브리어 레이아웃
- **Text Scaling**: 200%까지 UI 유지
- **Cultural Adaptation**: 컬러, 아이콘, 날짜 포맷

---

## 5. Implementation Guidelines

### Tech Stack

```javascript
// UI Framework
- React 18+ with TypeScript
- Tailwind CSS 3.4+
- Radix UI (Headless Components)
- Framer Motion (Animation)

// Visualization
- D3.js / Recharts (Charts)
- React-Virtualized (Large Lists)
- React-PDF (Document Preview)

// State Management
- TanStack Query (Server State)
- Zustand (Client State)
```

### Design Tokens Integration

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          900: 'var(--color-primary-900)',
        },
        ai: {
          gradient: 'var(--color-ai-gradient)',
        }
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    }
  }
}
```

---

## 6. 성공 Metrics

### UX Metrics
- **Task Success Rate**: > 90%
- **Time on Task**: 기존 대비 50% 감소
- **System Usability Scale (SUS)**: > 80점
- **Net Promoter Score (NPS)**: > 50

### Design Quality Gates
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s

---

## 7. Reference & Inspiration

### 2026 Trend Resources
- [UX Design Trends 2026 - UX Collective](https://uxdesign.cc)
- [Awwwards - Site of the Day](https://www.awwwards.com)
- [Mobbin - Mobile Design Patterns](https://mobbin.com)

### AI Interface Patterns
- [Anthropic Claude Interface](https://claude.ai)
- [Notion AI Integration](https://notion.so)
- [Linear.app UX](https://linear.app)

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-03-24  
**담당**: UX/UI Team + Product Strategy
