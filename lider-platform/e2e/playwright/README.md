# LIDER Playwright Visual Audit Navigator

**나노단위 스크롤 페이지 검수 도구** - Playwright를 사용하여 페이지를 50-100px 단위로 스크롤하며 스크린샷을 캡처하고 UI 요소를 검출합니다.

## 🎯 주요 기능

- **나노단위 스크롤**: 50px, 100px 등 작은 단위로 페이지 전체를 스크롤
- **전체 페이지 캡처**: 페이지 끝까지 모든 영역을 스크린샷으로 저장
- **UI 요소 검출**: 버튼, 카드, 입력 필드 등 주요 UI 요소 자동 감지
- **겹침 감지**: 요소 간 겹침 문제 자동 탐지
- **리포트 생성**: JSON 및 마크다운 형식의 상세 검수 리포트

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
cd /home/user/webapp/lider-platform/e2e/playwright
npm install
```

### 2. Playwright 브라우저 설치

```bash
npx playwright install chromium
```

### 3. 검수 실행

```bash
# 기본 검수 (100px 스크롤 단위)
TEST_URL=http://localhost:3000 npm test

# 50px 나노 검수
SCROLL_STEP=50 TEST_URL=http://localhost:3000 npm test

# 특정 테스트만 실행
npx playwright test visual-audit.spec.ts --grep "50px"
```

## ⚙️ 환경 변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `TEST_URL` | `http://localhost:3000` | 검수 대상 URL |
| `SCROLL_STEP` | `100` | 스크롤 단위 (px) - 50, 100 권장 |
| `VIEWPORT_HEIGHT` | `1080` | 뷰포트 높이 |
| `VIEWPORT_WIDTH` | `1920` | 뷰포트 너비 |
| `WAIT_AFTER_SCROLL` | `500` | 스크롤 후 대기 시간 (ms) |
| `MAX_SCREENSHOTS` | - | 최대 스크린샷 수 |
| `HEADLESS` | `true` | 헤드리스 모드 |

## 📁 출력 구조

```
audit-results/
├── audit-report.json       # 상세 JSON 리포트
├── audit-summary.md        # 읽기 쉬운 마크다운 요약
└── screenshots/
    ├── screenshot_0000_y0px_2024-...png
    ├── screenshot_0001_y100px_2024-...png
    ├── screenshot_0002_y200px_2024-...png
    └── ...
```

## 📊 리포트 예시

### JSON 리포트
```json
{
  "url": "http://localhost:3000",
  "pageInfo": {
    "totalHeight": 5000,
    "scrollSteps": 41
  },
  "screenshots": [
    {
      "index": 1,
      "scrollY": 0,
      "detectedElements": [
        { "type": "button", "text": "Submit", "inViewport": true }
      ]
    }
  ],
  "summary": {
    "totalScreenshots": 41,
    "uniqueElements": 156,
    "elementsByType": {
      "button": 24,
      "input": 12,
      "card": 8
    }
  }
}
```

## 🔧 고급 사용법

### 프로그래밍 방식 사용

```typescript
import { VisualAuditNavigator } from './visual-audit';

const auditor = new VisualAuditNavigator(page, {
  scrollStep: 50,           // 50px 나노 스크롤
  viewportHeight: 1080,
  viewportWidth: 1920,
  waitAfterScroll: 500,
  detectElements: true,
  elementSelectors: [
    'button', 'input', 'a', '.card'
  ]
});

await auditor.initialize();
await auditor.navigate('http://localhost:3000');
await auditor.performNanoAudit();
const report = await auditor.generateReport();
```

### 여러 페이지 동시 검수

```bash
# 병렬 실행
TEST_URL=http://localhost:3000 npx playwright test --workers=3
```

### 특정 UI 요소만 검출

```typescript
const auditor = new VisualAuditNavigator(page, {
  elementSelectors: [
    'button',              // 모든 버튼
    'input[type="text"]',  // 텍스트 입력
    '.dashboard-card',      // 대시보드 카드
    '[data-testid]'        // 테스트 ID가 있는 요소
  ]
});
```

## 🧪 테스트 시나리오

| 테스트 | 설명 |
|--------|------|
| `50px scroll step` | 가장 세밀한 검수 |
| `100px scroll step` | 기본 나노 검수 |
| `element detection` | UI 요소 자동 감지 |
| `overlapping detection` | 요소 겹침 문제 탐지 |
| `lazy loading` | 지연 로딩 콘텐츠 처리 |

## 📝 주의사항

1. **스크롤 단위**: 50px는 매우 세밀하지만 스크린샷 수가 많아집니다. 일반적으로 100px 권장
2. **대기 시간**: `waitAfterScroll`을 충분히 설정하여 지연 로딩 콘텐츠를 캡처
3. **디스크 공간**: 긴 페이지는 스크린샷이 많아져 디스크 공간을 확인
4. **메모리**: 요소 검출은 메모리를 사용하므로 대규모 페이지는 `maxScreenshots` 설정

## 🔍 문제 해결

### 스크린샷이 너무 많을 때
```bash
# 최대 20개로 제한
MAX_SCREENSHOTS=20 npm test
```

### 요소가 감지되지 않을 때
```bash
# 대기 시간 증가
WAIT_AFTER_SCROLL=2000 npm test
```

### 브라우저 실행 실패
```bash
# 브라우저 재설치
npx playwright install --force
```

## 📦 프로젝트 구조

```
e2e/playwright/
├── visual-audit.ts       # 핵심 검수 클래스
├── visual-audit.spec.ts  # 테스트 스위트
├── playwright.config.ts  # Playwright 설정
├── package.json          # 의존성
└── README.md            # 이 파일
```
