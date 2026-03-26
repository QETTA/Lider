# LIDER UI 디자인 토큰 & 사업 핵심 심층 분석 보고서
**작성일**: 2026-03-26  
**대상**: 요양레이다 (LIDER) 프론트엔드 코드베이스  
**분석 범위**: Business Domain + Design System + Component Architecture

---

## 1. 사업 핵심 분석 (Business Domain Deep Dive)

### 1.1 타겟 시장: 한국 노인장기요양보험 시장

**요양레이다(LIDER)**는 **노인장기요양보험 제도** 하에서 운영되는 재가서비스 기관을 대상으로 합니다.

#### 핵심 타겟 기관 유형
| 유형 | 설명 | 비중 |
|------|------|------|
| **복합 재가기관** | 방문요양+방문목욕+기타 재가서비스 동시 운영 | Primary |
| **방문요양 중심** | 방문요양 서비스 전문 기관 | Secondary |
| **신규/확장 중** | 설립 초기 또는 서비스 확장 중인 기관 | Growth |

#### 산업별 핵심 Pain Points (랜딩페이지 분석)
```typescript
// 4대 운영 누락 시나리오
1. "청구는 했는데 수익이 새는 순간"
   → 청구예외, 가산 누락, 월 한도 미활용
   
2. "평가와 지정갱신 준비가 계속 뒤로 밀리는 순간"
   → 평가/지정갱신 준비 지연
   
3. "상담과 보호자 응대가 담당자 개인 메모에 남는 순간"
   → 상담/보호자 응대 단절
   
4. "담당자 변경 뒤 인수인계가 흐려지는 순간"
   → 인수인계 공백, 퇴사/교대/휴가 후 정보 손실
```

### 1.2 2026년 제도 변화 대응 포인트
- **재가급여 월 한도 변화**: 수급자별 청구 한도 조정에 따른 누락 방지
- **중증 가산**: 중증도에 따른 가산금 청구 누락
- **장기근속장려금**: 근속 장려금 관리
- **통합돌봄 이후 연결성**: 돌봄 통합 후 운영 프로세스 연결

### 1.3 가치 제안 (Value Proposition)
> **"기존 프로그램은 그대로, 운영 누락만 잡으세요"**

- **대체(Replacement)**가 아닌 **보완(Supplement)**
- CSV·Excel 업로드만으로 진단 시작
- 무료 운영 진단 → 유료 전환의 자연스러운 퍼널

---

## 2. 디자인 시스템 심층 분석

### 2.1 디자인 철학: Oatmeal + Catalyst

#### 색상 팔레트 구조
```css
/* 핵심 토큰 - design-system.css */
--canvas: #faf8f4;           /* 따뜻한 오트밀 베이스 */
--brand-900: #27352d;      /* 딥 포레스트 - 신뢰감 */
--action-600: #137d80;     /* 틸 그린 - 액션 컬러 */
--surface: rgba(255,255,255,0.92);  /* 글래스모피즘 */
```

#### 감성 모드 (Emotion Mode) 시스템
```css
[data-emotion-mode='morning']  /* 아침 - 따뜻한 샴페인 골드 */
[data-emotion-mode='focus']    /* 집중 - 틸 액션 컬러 */
[data-emotion-mode='evening']  /* 저녁 - 딥 포레스트 */
[data-emotion-mode='calm']     /* 평온 - 소프트 세이지 */
```

### 2.2 현재 상태 매트릭스

| 구성요소 | 상태 | 심각도 | 비고 |
|----------|------|--------|------|
| `design-system.css` | ✅ 정상 | - | CSS 변수 정의 완벽 |
| `tailwind.config.js` | ✅ 정상 | - | CSS 변수 연결 완료 |
| `GlassCard.tsx` | ✅ 정상 | - | CSS 변수 사용 |
| `AuthShell.tsx` | ✅ 정상 | - | CSS 변수 사용 |
| `index.html` | 🔴 **심각** | CRITICAL | Pretendard 누락, !important 오버라이드 120줄 |
| `LandingPage.tsx` | 🟡 주의 | MEDIUM | Arbitrary values 50+건 |
| CSS Import 순서 | ✅ 정상 | - | index → design-system → accessibility |

---

## 3. CRITICAL ISSUES (즉시 수정 필요)

### 3.1 Issue #1: Pretendard 폰트 누락 (CRITICAL)

**현황**:
```html
<!-- index.html - 현재 (오류) -->
<link href="https://fonts.googleapis.com/css2?family=MaruBuri...&family=Noto+Sans+KR..." />
```

**문제**:
- `design-system.css`의 `--font-sans`는 Pretendard를 1순위로 지정
- 하지만 `index.html`에는 Pretendard CDN이 없음
- 결과: 한국어 타이포그래피 의도와 실제 렌더링 불일치

**해결**:
```html
<!-- 추가 필요 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
```

### 3.2 Issue #2: Inline !important 오버라이드 (CRITICAL)

**현황**: `index.html` 28-146번 라인, ~120줄의 inline `<style>`

**핵심 문제**:
```css
/* index.html 내부 - !important 오남용 */
main > section:first-child > div:first-child > div:first-child > h1 {
  max-width: 9.5ch !important;
  font-size: 4.5rem !important;  /* CSS 변수 무시 */
  line-height: 0.98 !important;
}
```

**영향**:
- CSS 변수(`--text-*`, `--radius-*`) 무시
- 반응형 디자인 토큰 시스템 파괴
- 유지보수 불가능 (디버깅 어려움)

**해결 전략**:
1. 모든 `!important` 제거
2. 디자인 토큰 기반 클래스로 대체
3. 필요시 `design-system.css`에 유틸리티 추가

### 3.3 Issue #3: Shadow 값 불일치

**design-system.css**:
```css
--shadow-card: 0 8px 24px rgba(30, 41, 59, 0.06);
--shadow-card-hover: 0 14px 34px rgba(30, 41, 59, 0.08);
--shadow-float: 0 22px 60px rgba(15, 23, 42, 0.12);
```

**tailwind.config.js**:
```javascript
boxShadow: {
  'card': 'var(--shadow-card)',  // ✅ 일치
  'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',  // ❌ 하드코딩
  'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',  // ❌ 하드코딩
}
```

**권장 수정**:
```javascript
boxShadow: {
  'card': 'var(--shadow-card)',
  'card-hover': 'var(--shadow-card-hover)',
  'float': 'var(--shadow-float)',
  'glass': '0 8px 32px rgba(39, 53, 45, 0.08)',  // 브랜드 컬러 기반
}
```

---

## 4. 중등 이슈 (Phase 2 처리)

### 4.1 LandingPage.tsx Arbitrary Values

**발견 항목** (일부):
```tsx
// text-[2.9rem], text-[4rem], text-[4.5rem], text-[4.9rem]
// max-w-[7.2em], max-w-[35rem], max-w-[28rem]
// max-w-[1240px], max-w-[228px], max-w-[244px], max-w-[252px]
```

**권장**:
```javascript
// tailwind.config.js 확장
spacing: {
  '18': '4.5rem',      // 72px
  '22': '5.5rem',      // 88px  
  '76': '19rem',       // 304px (≈ 7.6em)
}
```

### 4.2 접근성 개선 포인트

**현재 양호**:
- `accessibility.css`가 CSS 변수 사용
- `prefers-reduced-motion` 지원
- `prefers-contrast: high` 지원
- Focus visible 스타일 정의

**개선 가능**:
- Colorblind indicators (이미 구현됨)
- Touch target 44px (이미 구현됨)
- Skip link (이미 구현됨)

---

## 5. 우수 사례 (Best Practices)

### 5.1 GlassCard 컴포넌트 (모범 사례)
```tsx
// CSS 변수 + Tailwind 혼합의 올바른 예시
const variantClasses = {
  default: 'glass-card',  // CSS 클래스
  accent: 'surface-tint border-[color:var(--border-accent)]',  // 변수 사용
  success: 'border-l-[color:var(--success-600)]',  // 시맨틱 컬러
};
```

### 5.2 AuthShell 컴포넌트
- 모든 색상이 CSS 변수 참조
- 반응형 클래스 적절히 사용
- 일관된 spacing 시스템

### 5.3 CSS Import 순서
```tsx
// main.tsx - 올바른 순서
import './styles/index.css'        // 1. Tailwind base
import './styles/design-system.css' // 2. 디자인 토큰
import './styles/accessibility.css' // 3. 접근성 오버라이드
```

---

## 6. 수정 우선순위 로드맵

### Phase 1: Critical (즉시 - 1일)
- [ ] Pretendard CDN 추가 (`index.html`)
- [ ] Inline `<style>` 블록 제거 (`index.html` 28-146라인)
- [ ] Shadow 값 통일 (`tailwind.config.js`)

### Phase 2: High (이번 주)
- [ ] LandingPage.tsx arbitrary values 정리
- [ ] Typography scale 토큰화 (`text-5xl`, `text-6xl` 등)
- [ ] Container max-width 토큰화

### Phase 3: Medium (다음 스프린트)
- [ ] Emotion mode 테스트 (4가지 모드)
- [ ] 고대비 모드 완성도 검증
- [ ] 스크린 리더 테스트

---

## 7. 토큰 매핑 레퍼런스

### 7.1 Color Token → CSS Variable → Tailwind Class

| 의미 | CSS Variable | Tailwind Class |
|------|-------------|----------------|
| 배경 캔버스 | `--canvas` | `bg-canvas` |
| 브랜드 프라이머리 | `--brand-900` | `text-brand-900`, `bg-brand-900` |
| 액션 프라이머리 | `--action-600` | `text-action-600`, `bg-action-600` |
| 텍스트 강조 | `--text-strong` | `text-text-strong` |
| 테두리 서브틀 | `--border-subtle` | `border-border-subtle` |
| 성공 | `--success-600` | `text-success-600` |
| 경고 | `--warning-600` | `text-warning-600` |
| 위험 | `--danger-600` | `text-danger-600` |

### 7.2 Spacing Token

| Token | Value | Tailwind |
|-------|-------|----------|
| `--space-1` | 4px | `p-1`, `m-1`, `gap-1` |
| `--space-2` | 8px | `p-2`, `m-2`, `gap-2` |
| `--space-4` | 16px | `p-4`, `m-4`, `gap-4` |
| `--space-6` | 24px | `p-6`, `m-6`, `gap-6` |
| `--space-8` | 32px | `p-8`, `m-8`, `gap-8` |

### 7.3 Radius Token

| Token | Value | Tailwind |
|-------|-------|----------|
| `--radius-sm` | 10px | `rounded-sm` |
| `--radius-md` | 14px | `rounded-md` |
| `--radius-lg` | 16px | `rounded-lg` |
| `--radius-xl` | 20px | `rounded-xl` |
| `--radius-2xl` | 28px | `rounded-2xl` |

---

## 8. 사업-기술 연결성 평가

### 8.1 적합한 디자인 결정

| 사업 요구사항 | 디자인 구현 | 평가 |
|--------------|------------|------|
| **신뢰감 있는 브랜드** | `--brand-900: #27352d` (딥 포레스트) | ✅ 적합 |
| **따뜻한 감성** | `--canvas: #faf8f4` (오트밀) | ✅ 적합 |
| **깨끗한 UI** | Glass morphism + 적절한 여백 | ✅ 적합 |
| **업무 효율** | Emotion mode (집중/평온 모드) | ✅ 적합 |

### 8.2 개선 필요 영역

| 영역 | 현재 | 권장 |
|------|------|------|
| **모바일 퍼스트** | Desktop 랜딩 중심 | 요양사(종사자) 모바일 우선 |
| **가독성** | Glass 효과 과다 | 고대비 모드 강화 |
| **접근성** | 기본 준수 | WCAG AAA 목표 |

---

## 9. 결론 및 권장사항

### 핵심 요약
1. **사업 이해도**: 요양기관 운영의 4대 Pain Point 정확히 포착 ✅
2. **디자인 시스템**: Oatmeal+Catalyst 철학 일관되게 적용 ✅
3. **기술 부채**: `index.html`의 !important 오버라이드가 최대 리스크 🔴
4. **즉시 조치**: Pretendard 폰트 + inline 스타일 제거하면 80% 해결

### 최우선 액션
```bash
# 1. Pretendard CDN 추가
# 2. index.html inline style 제거
# 3. Shadow 값 통일
# 4. LandingPage.tsx arbitrary values 토큰화
```

---

**보고서 작성**: 2026-03-26  
**분석 범위**: `/frontend/src/**/*.{tsx,css,html}`  
**총 파일 수**: 176개 (PR 기준)  
**핵심 이슈**: 3건 (Critical 2, High 1)  
**예상 수정 시간**: 4-6시간
