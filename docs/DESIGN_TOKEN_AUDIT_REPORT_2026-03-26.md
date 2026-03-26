# LIDER UI Design Token & Component Code Audit Report
**Date**: 2026-03-26  
**Scope**: Frontend Design System, CSS Tokens, Component Architecture  
**Status**: 🔴 CRITICAL - Multiple Breakages Detected

---

## Executive Summary

디자인 토큰 시스템과 실제 컴포넌트 구현 사이에 **심각한 불일치**가 발견되었습니다. Tailwind 설정과 CSS 변수 시스템이 완전히 분리되어 있으며, 여러 계층에서 하드코딩된 값들이 충돌하고 있습니다.

**Severity**: 🔴 High - Visual Consistency Broken  
**Impact**: All UI Components  
**Files Affected**: 15+ core files

---

## 🔴 Critical Issues

### 1. Tailwind Config / CSS Variables Misalignment

**Problem**: `tailwind.config.js`와 `design-system.css`가 완전히 다른 색상 시스템 사용

| Source | Color System | Status |
|--------|-------------|--------|
| `tailwind.config.js` | Standard Tailwind (sky/blue/green/purple) | ❌ Conflicts |
| `design-system.css` | Oatmeal/Catalyst (#faf8f4, #27352d, etc.) | ✅ Intended |

**Evidence**:
```javascript
// tailwind.config.js - WRONG colors
colors: {
  primary: {
    50: '#f0f9ff',   // Sky blue - NOT our brand
    500: '#0ea5e9',  // Bright blue - NOT our brand
    600: '#0284c7',
  },
  medical: { 500: '#22c55e' },  // Green - NOT our action color
  calm: { 500: '#8b5cf6' },     // Purple - NOT used
}
```

```css
/* design-system.css - CORRECT colors */
--canvas: #faf8f4;        /* Oatmeal base */
--brand-900: #27352d;     /* Deep green */
--action-600: #137d80;    /* Teal action */
--brand-600: #5d7769;     /* Sage */
```

**Impact**: Tailwind 유틸리티 클래스 (`bg-primary-500`, `text-blue-600`)가 브랜드 팔레트와 무관한 색상을 생성

---

### 2. Missing CSS Variable Bridge in Tailwind

**Problem**: Tailwind가 CSS 변수를 전혀 인식하지 못함

**Current State**:
```javascript
// tailwind.config.js - NO CSS variable integration
theme: {
  extend: {
    colors: { /* hardcoded values */ },  // ❌ No CSS var() usage
    fontFamily: { /* some fonts */ },    // ❌ No CSS var(--font-sans)
  }
}
```

**Required Fix**:
```javascript
// Should be:
colors: {
  canvas: 'var(--canvas)',
  brand: {
    900: 'var(--brand-900)',
    600: 'var(--brand-600)',
  },
  action: {
    600: 'var(--action-600)',
  },
  text: {
    strong: 'var(--text-strong)',
    primary: 'var(--text-primary)',
  }
}
```

---

### 3. Hardcoded Values in accessibility.css

**Problem**: WCAG 스타일에 하드코딩된 hex 값 사용

**Evidence**:
```css
/* accessibility.css */
:focus-visible {
  outline: 3px solid #137d80;  /* ❌ Should be var(--action-600) */
}

.skip-link {
  background: #0f6b6f;  /* ❌ Should be var(--action-700) */
}

.text-high-contrast {
  color: #000000;  /* ❌ Should be var(--text-strong) */
  background: #ffffff;  /* ❌ Should be var(--surface) */
}
```

---

### 4. Inline CSS Overrides in index.html

**Problem**: `<style>` 태그로 하드코딩된 오버라이드

**Evidence**:
```html
<!-- index.html lines 28-146 -->
<style>
  @media (min-width: 1024px) {
    main > section:first-child {
      min-height: auto !important;
      padding-top: 4rem !important;
    }
    /* ... 100+ lines of hardcoded overrides ... */
  }
</style>
```

**Issues**:
- `!important` 남용으로 CSS 우선순위 파괴
- 디자인 토큰 미사용
- 유지보수 불가능한 구조

---

### 5. Missing Pretendard Font Loading

**Problem**: index.html에서 Pretendard 폰트 로드 누락

**Current**:
```html
<link href="https://fonts.googleapis.com/css2?family=MaruBuri:wght@400;700&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
```

**Missing**: Pretendard (primary sans-serif font per design-system.css)

**Required**:
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet" />
```

---

### 6. CSS Loading Order Issues

**Problem**: CSS 파일 로드 순서가 일관되지 않음

**main.tsx**:
```typescript
import './styles/index.css';        // Tailwind directives
import './styles/design-system.css'; // Variables + components
import './styles/accessibility.css'; // Overrides
```

**App.tsx**:
```typescript
import './styles/index.css';
import './styles/design-system.css';
// accessibility.css NOT imported here - inconsistency
```

**Issue**: 중복 import + 누락된 import 혼재

---

## 🟡 Medium Issues

### 7. Component-Level Hardcoding

**GlassCard.tsx**:
```tsx
// Uses CSS classes that rely on design-system.css
// BUT fallback values may break if CSS variables fail
className="border-l-4 border-l-[color:var(--success-600)]"  // OK
```

**Issue**: 모든 컴포넌트가 `design-system.css`의 클래스(`.glass-card`, `.surface-paper`)에 의존 - 해당 CSS 파일 로드 실패 시 전체 UI 붕괴

---

### 8. Conflicting Shadow Definitions

| Source | Definition | Conflict |
|--------|-----------|----------|
| `design-system.css` | `--shadow-card: 0 8px 24px rgba(30, 41, 59, 0.06)` | ✅ Correct |
| `tailwind.config.js` | `'glass': '0 8px 32px rgba(0, 0, 0, 0.08)'` | ❌ Different values |

---

## 🟢 Working Components

### ✅ Emotion Mode System
- `useEmotionMode.tsx` properly sets `data-emotion-mode` on document
- CSS selectors in `design-system.css` correctly respond to mode changes
- Mode transitions: morning → focus → evening → calm

### ✅ CSS Variable Definitions
- `design-system.css`의 변수 정의는 완전하고 일관됨
- All semantic tokens properly defined (--canvas, --brand-*, --action-*)

### ✅ Component Architecture
- `GlassCard`, `BentoGrid`, `StatusBadge` 등 컴포넌트 구조는 정상
- Props interface와 forwardRef 사용 올바름

---

## Recommended Fix Priority

### Phase 1: Critical (Immediate)
1. **Synchronize Tailwind config with CSS variables**
   - Map all Tailwind colors to CSS variables
   - Update fontFamily to use var(--font-sans)

2. **Add Pretendard font loading**
   - Update index.html with CDN link

3. **Fix accessibility.css hardcoding**
   - Replace all hex values with CSS variables

### Phase 2: High (This Week)
4. **Consolidate CSS imports**
   - Remove duplicate imports from App.tsx
   - Ensure single source of truth in main.tsx

5. **Extract inline styles from index.html**
   - Move to design-system.css or component-level CSS
   - Remove !important usage

### Phase 3: Medium (Next Sprint)
6. **Audit all component files**
   - Replace any hardcoded colors with CSS variables
   - Ensure consistent class naming

---

## Testing Checklist

- [ ] All buttons use `--action-600` for primary actions
- [ ] All text uses `--text-primary` or `--text-strong`
- [ ] Backgrounds use `--canvas` or `--surface`
- [ ] Cards use `--shadow-card` consistently
- [ ] Emotion mode changes apply correct accent colors
- [ ] Pretendard font loads and applies correctly
- [ ] No !important usage in production CSS
- [ ] High contrast mode works with system preference

---

## Appendix: Token Mapping Reference

| Design Token | CSS Variable | Tailwind Class (Proposed) |
|-------------|--------------|--------------------------|
| Background Canvas | `--canvas` | `bg-canvas` |
| Background Surface | `--surface` | `bg-surface` |
| Brand Primary | `--brand-900` | `text-brand-900` |
| Action Primary | `--action-600` | `bg-action-600` |
| Text Primary | `--text-primary` | `text-text-primary` |
| Border Subtle | `--border-subtle` | `border-border-subtle` |
| Success | `--success-600` | `text-success-600` |
| Danger | `--danger-600` | `text-danger-600` |

---

**Audit Completed By**: AI Code Assistant  
**Next Review**: After Phase 1 fixes implemented
