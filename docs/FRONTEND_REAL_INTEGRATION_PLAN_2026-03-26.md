# LIDER Frontend Real Integration Plan

작성일: 2026-03-26

## 1. 목표

현재 LIDER는 UI 완성도는 높지만 인증과 운영 상태판이 아직 데모/제한 응답에 머물러 있다. 다음 단계의 목표는 아래 두 가지를 실제 운영 경로로 전환하는 것이다.

- `login/onboarding/setup` 을 실인증 + 실세션 흐름으로 연결
- `/dashboard` 상태판을 실제 백엔드 상태와 연결

그 이후에 랜딩, 접근성, 반응형 마감을 진행한다.

## 1.1 현재까지 반영 완료

이번 배치에서 아래 항목은 코드에 반영됐다.

- 백엔드 `POST /v1/auth/login`
- 백엔드 `GET /v1/auth/me`
- 백엔드 `POST /v1/auth/logout`
- 프론트 `AuthSessionProvider`
- 프론트 `ProtectedRoute`
- `LoginPage` 실로그인 연결
- Worker `auth/health/public-data` same-origin 프록시 코드 추가

아직 남은 것은 아래다.

- 온보딩/첫 설정 서버 저장
- 배포 환경 `CORE_API_BASE_URL` 연결
- 운영 배포에서 실제 상태판 전환 확인

## 2. 우선순위

1. 저장소 기준선 고정
2. 온보딩/첫 설정 영속화
3. 배포 상태판 실연동
4. 랜딩/접근성/반응형 마감

## 3. 1단계: 저장소 기준선 고정

### 현재 상태

- 실제 작업 폴더는 `/mnt/c/Users/uju/lider`
- 라이브와 일치하는 프론트 산출물은 `/mnt/c/Users/uju/lider/frontend/dist`
- 하지만 `.git` 디렉터리가 없다

### 해야 할 일

- 원래 원격 저장소 URL 확인
- `.git` 복구 또는 새 저장소 초기화
- `frontend/dist` 는 빌드 산출물로 취급하고 소스 변경 기준은 `src` 와 `worker` 로 고정
- 이후 작업 브랜치 규칙 정의

### 완료 기준

- 정식 원격과 기본 브랜치 확인
- 작업 브랜치 전략 확정
- 배포본과 소스 간 기준선 문서화 완료

## 4. 2단계: 온보딩/첫 설정 영속화

### 현재 상태

프론트:

- `/login` 은 실제 로그인 API 호출로 전환됨
- `/onboarding`, `/setup` 은 여전히 로컬 드래프트 저장

백엔드:

- `User` 모델 존재
- `password` 해시 구조 존재
- JWT 플러그인 등록됨
- seed 계정 존재
- 기본 auth API 는 추가 완료

### 권장 구현

#### 백엔드

추가 라우트:

- `GET /v1/auth/onboarding`
- `PUT /v1/auth/onboarding`

추가 동작:

- 현재 로그인 세션 기준 온보딩 상태 조회
- 온보딩 상태와 첫 설정값 저장

권장 저장 모델:

- 새 Prisma 모델 `UserOnboardingProfile`
- `userId` unique
- `roleContext`
- `centerType`
- `teamSize`
- `onboardingGoals` string[]
- `setupPriorities` string[]
- `communicationChannel`
- `handoverNote`
- `completedAt`

#### 프론트

추가 파일:

- `frontend/src/utils/authClient.ts`
- `frontend/src/hooks/useAuthSession.tsx`
- `frontend/src/components/auth/ProtectedRoute.tsx`

수정 파일:

- `frontend/src/pages/LoginPage.tsx`
- `frontend/src/pages/OnboardingPage.tsx`
- `frontend/src/pages/FirstRunSetupPage.tsx`
- `frontend/src/utils/authFlow.ts`
- `frontend/src/App.tsx`

구현 원칙:

- `authFlow.ts` 는 임시 폼 초안 저장 용도로만 유지
- 온보딩/첫 설정은 서버 저장이 기준
- `/dashboard` 이하 앱 셸 보호는 유지

### 완료 기준

- 온보딩/첫 설정 저장 후 다시 열어도 유지
- 로그인 후 새로고침해도 온보딩 진행 상태가 복구됨
- 세션 없을 때 앱 셸 보호 유지

## 5. 3단계: 배포 상태판 실연동

### 현재 상태

`useSystemStatus.tsx` 는 same-origin `/v1/health*`, `/v1/public-data/status` 를 조회한다.

현재 Worker 코드는 실제 백엔드 프록시를 지원하지만, 운영 배포에 `CORE_API_BASE_URL` 연결이 아직 필요하다.

### 권장 구현

#### Worker

`/mnt/c/Users/uju/lider/frontend/worker/index.ts`

추가 env:

- `CORE_API_BASE_URL`
- 필요 시 `CORE_API_SHARED_SECRET`

프록시 대상:

- `GET /v1/health`
- `GET /v1/health/detail`
- `GET /v1/public-data/status`
- 이후 `GET /v1/auth/me`, `POST /v1/auth/login`, `PUT /v1/auth/onboarding` 도 같은 방식으로 same-origin 프록시

fallback 정책:

- `CORE_API_BASE_URL` 이 비어 있으면 현재 `limited` 공개 Worker 응답 유지
- 운영 연결 성공 시 `scope: backend` 로 명시
- 운영 연결 실패 시 503 기반 백엔드 장애 상태를 그대로 노출

#### 프론트

`useSystemStatus.tsx`

- `statusScope === 'backend'` 인 경우를 정상 운영 기준으로 사용
- 제한 응답과 실응답을 UI에서 더 분명히 구분

### 완료 기준

- 대시보드 상태판이 실제 DB 상태를 반영
- 공공데이터 API 키 상태가 실제 값으로 표시
- 공개 제한 응답과 실운영 응답 구분 가능

## 6. 4단계: 랜딩/접근성/반응형 마감

### 접근성

- 모든 입력 필드에 `id` 또는 `name` 보장
- 상태 표현을 색상 + 텍스트 + 아이콘 조합으로 통일
- focus ring 과 키보드 탐색 점검

### 랜딩

- 실도입 CTA 정리
- 보안/개인정보/운영 신뢰 요소 추가
- 데모 안내와 실서비스 진입 안내 분리

### 반응형

- `/dashboard`, `/documents`, `/login`, `/onboarding`, `/setup` 모바일 점검
- 카드, 표, 사이드 패널 축소 규칙 정리

## 7. 우선 파일 목록

백엔드:

- `/mnt/c/Users/uju/lider/backend/src/server.ts`
- `/mnt/c/Users/uju/lider/backend/src/routes/api.ts`
- `/mnt/c/Users/uju/lider/backend/src/routes/auth.ts`
- `/mnt/c/Users/uju/lider/backend/prisma/schema.prisma`
- `/mnt/c/Users/uju/lider/backend/scripts/seed.ts`

프론트:

- `/mnt/c/Users/uju/lider/frontend/src/App.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/pages/OnboardingPage.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/pages/FirstRunSetupPage.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/utils/authFlow.ts`
- `/mnt/c/Users/uju/lider/frontend/src/hooks/useAuthSession.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/hooks/useSystemStatus.tsx`
- `/mnt/c/Users/uju/lider/frontend/worker/index.ts`

## 8. 검증 기준

필수 시나리오:

- `manager@eun-saem.kr / password123` 로그인 성공
- 로그인 후 `/dashboard` 접근 가능
- 로그아웃 후 `/dashboard` 접근 차단
- 온보딩/첫 설정 저장 후 재조회 가능
- 상태판이 `public-worker` 가 아니라 `backend` 범위로 전환

필수 명령:

- `npm run typecheck` in `frontend`
- `npm run build` in `frontend`
- `npm run build` in `backend`
- 인증/상태판 E2E 스모크 테스트

## 9. 현재 판단

지금 바로 가장 가치가 큰 작업은 새 페이지를 더 만드는 것이 아니라, 이미 붙인 로그인/세션 슬라이스 위에 온보딩 영속화와 실제 배포 연결을 마무리하는 것이다.
