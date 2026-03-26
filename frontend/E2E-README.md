# 🔍 LIDER 2026 E2E 자동 검수 시스템

Playwright 기반 E2E 자동화 테스트 시스템으로, 모든 페이지를 스크롤하며 스크린샷 캡처 + 디자인 검증을 수행합니다.

## 🚀 빠른 시작

```bash
# 1. 일회성 전체 검수
npm run e2e:audit

# 2. 반복 검수 (5분 간격 무한 반복)
npm run e2e:watch

# 3. 지속적 모니터링 (10회, 1분 간격)
npm run e2e:runner:quick

# 4. 두 실행 결과 비교
npm run e2e:compare -- e2e-reports/2024-01-15/audit-report.json e2e-reports/2024-01-16/audit-report.json
```

## 📁 파일 구조

```
frontend/
├── e2e-screenshot-audit.cjs    # 메인 스크린샷 검수
├── e2e-runner.cjs              # 반복 실행 관리
├── e2e-compare.cjs             # 실행 결과 비교
├── e2e-reports/                # 검수 결과 저장
│   └── 2024-01-15/
│       ├── audit-report.json   # 상세 데이터
│       ├── index.html          # 시각화 리포트
│       └── *.png               # 캡처된 스크린샷
```

## 🎯 검증 항목

### 1. Glassmorphism (유리 효과)
- `backdrop-filter: blur()` 적용 여부
- 반투명 배경 (rgba) 사용 여부

### 2. Bento Grid
- `.bento-grid` 클래스 존재 여부
- 반응형 레이아웃 (4→2→1 컬럼)

### 3. Emotion Mode (시간 기반 테마)
- Morning (06-12h): 오렌지/노랑
- Focus (12-18h): 파랑/회색 (기본)
- Evening (18-22h): 보라/빨강
- Calm (22-06h): 짙은 블루/퍼플

### 4. 반응형 레이아웃
- Desktop (1920x1080)
- Tablet (1024x768)
- Mobile (375x667)

### 5. 애니메이션/마이크로 인터랙션
- `.animated-number` 카운트업 효과
- `.pulse-dot` 녹음 인디케이터
- `.animate-*` 클래스 적용 요소

## 📊 검수 결과

### JSON Report (`audit-report.json`)
```json
{
  "summary": {
    "totalPages": 5,
    "totalViewports": 3,
    "totalScreenshots": 75,
    "duration": "45.2s"
  },
  "results": [{
    "name": "dashboard",
    "viewport": "desktop",
    "screenshots": [...],
    "validations": [{
      "type": "glassmorphism",
      "count": 12,
      "status": "pass"
    }]
  }]
}
```

### HTML Report (`index.html`)
- 스크린샷 갤러리 (모든 뷰포트)
- 검증 결과 시각화
- 디자인 시스템 준수 여부

## 🔧 환경 변수

```bash
# 테스트할 URL 변경
LIDER_URL=http://localhost:5173 npm run e2e:audit

# Slack 알림 설정 (회귀 감지 시)
SLACK_WEBHOOK=https://hooks.slack.com/... npm run e2e:runner

# 검수 간격 설정 (밀리초)
AUDIT_INTERVAL=60000 npm run e2e:watch  # 1분 간격
```

## 📱 모바일 검수

모바일 뷰포트에서 자동으로 확인:
- 터치 타겟 크기 (≥48px)
- 톱니 메뉴 (Sidebar → 햄버거)
- 단일 컬럼 레이아웃
- 폰트 가독성

## 🔄 CI/CD 통합

```yaml
# .github/workflows/e2e.yml
- name: E2E Audit
  run: |
    npm run build
    npm run preview &
    sleep 3
    LIDER_URL=http://localhost:4173 npm run e2e:audit
    
- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: e2e-report
    path: e2e-reports/
```

## 🚨 회귀 감지 (Regression Detection)

`e2e-runner`는 이전 실행과 비교하여:
- 🔴 검증 상태가 pass → warn/error로 변경
- 🔴 스크린샷 수 감소
- 🟢 검증 상태 개선
- ⚪ 중립적인 변경

자동으로 감지하고 Slack/Webhook으로 알림을 전송합니다.

## 💡 팁

1. **디자인 리뷰 전**: `npm run e2e:audit`로 전체 페이지 스크린샷 확보
2. **배포 전**: `npm run e2e:runner:quick`으로 10회 반복 검수
3. **비교 분석**: 두 날짜의 리포트를 비교하여 변경점 파악
4. **모바일 집중**: `viewports` 배열을 `[mobile]`로 설정

## 📝 주요 npm scripts

| 명령어 | 설명 |
|--------|------|
| `npm run e2e:audit` | 전체 검수 1회 실행 |
| `npm run e2e:watch` | 5분 간격 무한 반복 |
| `npm run e2e:runner` | 회귀 감지 모드 실행 |
| `npm run e2e:runner:quick` | 1분 간격 10회 실행 |
| `npm run e2e:compare` | 두 리포트 비교 분석 |
