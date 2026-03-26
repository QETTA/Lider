# LIDER Frontend Source Audit

작성일: 2026-03-26

## 1. 결론

2026-03-26 현재 LIDER의 실제 프론트 소스는 아래 경로에 존재한다.

- `/mnt/c/Users/uju/lider/frontend`
- `/mnt/c/Users/uju/lider/frontend/worker`
- `/mnt/c/Users/uju/lider/backend`

이 저장소의 `frontend/dist` 산출물은 라이브 배포본 `https://lider-frontend.lider-yohan.workers.dev` 와 해시 기준으로 일치했다. 따라서 현재 작업 기준선은 더 이상 sourcemap 복구본이 아니라 `/mnt/c/Users/uju/lider/frontend` 이다.

다만 다음 문제는 그대로 남아 있다.

- 이 경로에는 `.git` 메타데이터가 없다.
- 온보딩/첫 설정은 아직 로컬 드래프트 기반이다.
- 공개 Worker 는 AI와 제한적 상태판만 프록시하지만, 코어 API base URL 이 설정되면 auth/health/public-data 를 same-origin 프록시하도록 코드가 준비됐다.
- 실제 로그인/세션 API 는 추가됐지만, 운영 배포에 붙이려면 백엔드 DB와 Worker 환경변수 구성이 필요하다.

## 2. 확인 근거

### 2.1 라이브 배포와 로컬 산출물 일치

아래 해시는 로컬 `frontend/dist` 와 라이브 asset 을 각각 계산해 비교한 값이다.

| 항목 | 로컬 경로/라이브 URL | SHA256 |
|---|---|---|
| JS bundle | `frontend/dist/assets/index-2s7P9h6L.js` / `/assets/index-2s7P9h6L.js` | `918b7d5cb0ef708ceafbece009303625515edebca6377a90ead1e9d32091d52c` |
| CSS bundle | `frontend/dist/assets/index-DOn1A-t1.css` / `/assets/index-DOn1A-t1.css` | `5e50bfb06c955b141f4b576b56d0ce404ab9b828ae35ab80e8306ee0c18fda3c` |
| HTML | `frontend/dist/index.html` / `/` | `5612e587d5249ed7def67ef8dfcb7dc6d174db491d2a712661879df8bd421e32` |

이 결과는 현재 `/mnt/c/Users/uju/lider/frontend` 가 실제 배포본과 직접 연결된 작업 폴더임을 의미한다.

### 2.2 프론트 스택

`/mnt/c/Users/uju/lider/frontend/package.json`

- Vite
- React 18
- React Router 6
- Tailwind CSS 3
- Lucide React
- Wrangler deploy

`/mnt/c/Users/uju/lider/frontend/wrangler.toml`

- Worker name: `lider-frontend`
- asset binding: `ASSETS`
- SPA fallback 구성
- `/v1/*` 는 Worker 가 먼저 받도록 설정

### 2.3 공개 Worker 의 현재 역할

`/mnt/c/Users/uju/lider/frontend/worker/index.ts`

현재 Worker 가 직접 처리하는 경로:

- `GET /v1/ai/status`
- `POST /v1/ai/chat`
- `POST /v1/ai/analyze-file`
- `GET /v1/health`
- `GET /v1/health/detail`
- `GET /v1/public-data/status`

즉 공개 배포는 정적 프론트 + AI 프록시 + 제한적 상태판 조합이다. 일반 업무 API 전체를 same-origin 으로 프록시하는 구조는 아직 아니다.

## 3. 현재 개발 상태

### 3.1 프론트

실제 페이지 소스가 존재한다.

- `/mnt/c/Users/uju/lider/frontend/src/pages/LandingPage.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/pages/LoginPage.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/pages/OnboardingPage.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/pages/FirstRunSetupPage.tsx`
- `/mnt/c/Users/uju/lider/frontend/src/pages/Dashboard2026.tsx`

현재 인증 전환 레이어는 부분적으로 실제 연동으로 전환됐다.

- `LoginPage.tsx` 는 `/v1/auth/login` 을 호출해 실제 JWT 세션을 발급받는다.
- `ProtectedRoute` 가 `/onboarding`, `/setup`, `/dashboard` 이하 운영 라우트를 보호한다.
- `OnboardingPage.tsx`, `FirstRunSetupPage.tsx` 는 인증 세션 위에서 동작하지만, 선택값 저장은 아직 `localStorage` 에 남아 있다.
- `authFlow.ts` 는 전체 세션 저장소가 아니라 폼 드래프트 저장소로 축소됐다.

### 3.2 상태판

`useSystemStatus.tsx` 는 다음 경로를 조회한다.

- `/v1/health`
- `/v1/health/detail`
- `/v1/public-data/status`

현재 공개 Worker 는 기본적으로 `public-worker` 범위의 제한적 상태를 제공한다. 다만 `CORE_API_BASE_URL` 이 설정되면 실제 백엔드 `health` 와 `public-data/status` 를 same-origin 으로 프록시하도록 준비됐다.

### 3.3 백엔드

`/mnt/c/Users/uju/lider/backend` 는 Fastify + Prisma + PostgreSQL 구조다.

확인된 준비 요소:

- `@fastify/jwt` 등록
- Prisma `User`, `Center` 모델 존재
- `password` 해시 필드 존재
- `scripts/seed.ts` 에 샘플 계정 생성 로직 존재

현재 인증 라우트는 코드상 추가됐다.

- `/v1/auth/login` 추가됨
- `/v1/auth/me` 추가됨
- `/v1/auth/logout` 추가됨
- 온보딩/첫 설정 저장 API 없음

즉 백엔드는 이제 “기본 로그인/세션은 가능하지만 온보딩/첫 설정 영속화는 아직 없는 상태”다.

## 4. 정확한 현재 판정

이제 기준 문장은 아래처럼 바뀌어야 한다.

- 틀린 표현: 로컬에 실제 프론트 소스가 없다.
- 맞는 표현: 실제 프론트 소스는 `/mnt/c/Users/uju/lider/frontend` 에 있고, 라이브 배포와 일치한다. 다만 git 메타데이터가 없고, 온보딩/첫 설정 영속화 및 배포 환경 연결이 아직 남아 있다.

## 5. 바로 이어갈 우선순위

1. `/mnt/c/Users/uju/lider` 를 정식 저장소로 복구하거나 원격 git 연결을 되살린다.
2. 온보딩/첫 설정 값을 백엔드에 저장하는 `auth/onboarding` API 를 추가한다.
3. 배포 환경에서 Worker `CORE_API_BASE_URL` 을 연결해 실제 백엔드 `health/public-data` 프록시를 활성화한다.
4. 그다음 랜딩/접근성/반응형 마감을 진행한다.
