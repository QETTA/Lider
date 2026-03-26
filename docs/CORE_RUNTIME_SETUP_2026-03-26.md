# LIDER Core Runtime Setup

작성일: 2026-03-26

## 1. 목적

이 문서는 LIDER의 로컬 개발 환경과 운영 배포 환경을 하나의 기준으로 고정하기 위한 세팅 문서다.

이 문서의 범위는 아래다.

- backend 실행 세팅
- frontend 실행 세팅
- Worker same-origin 프록시 세팅
- 운영 smoke check
- 장애 판단 규칙

이 문서의 원칙은 아래다.

- `코어 운영 경로`를 메인으로 둔다.
- `same-origin Worker + core backend` 조합을 기본 배포 구조로 둔다.
- `Railway AI fallback` 은 부록/후순위로만 둔다.

## 2. 기준 읽기 순서

다음 세션 또는 새 구현 세션은 아래 순서로 문서를 읽는다.

1. `AI_REFACTORING_MASTER_PLAN_2026-03-26.md`
2. `CORE_RUNTIME_SETUP_2026-03-26.md`
3. `AI_EXECUTION_TICKETS_2026-03-26.md`
4. 필요 시 `RAILWAY_FALLBACK_RUNBOOK.md`

## 3. 로컬 개발 세팅

### 3.1 작업 루트

- 메인 루트: `/mnt/c/Users/uju/lider`
- backend: `/mnt/c/Users/uju/lider/backend`
- frontend: `/mnt/c/Users/uju/lider/frontend`
- worker: `/mnt/c/Users/uju/lider/frontend/worker`
- docs: `/mnt/c/Users/uju/lider/docs`

### 3.2 로컬 부트 순서

반드시 아래 순서로 올린다.

1. DB
2. backend
3. frontend

이 순서를 지키지 않으면 auth, onboarding, 상태판, 문서/상담 저장 흐름에서 거짓 음성이 생길 수 있다.

### 3.3 Backend env

파일:

- `/mnt/c/Users/uju/lider/backend/.env`
- 기준 예시: `/mnt/c/Users/uju/lider/backend/.env.example`

필수:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `HOST`

권장:

- `JWT_EXPIRES_IN`
- `NODE_ENV`
- `CORS_ORIGINS`
- `LOG_LEVEL`
- `PUBLIC_DATA_API_KEY`
- `PUBLIC_DATA_BASE_URL`
- `KIMI_API_KEY`
- `KIMI_BASE_URL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_BASE_URL`
- `ANTHROPIC_MODEL`

로컬 기본:

- `PORT=3001`
- `HOST=0.0.0.0`
- `NODE_ENV=development`

### 3.4 Frontend env

파일:

- `/mnt/c/Users/uju/lider/frontend/.env.example`
- `/mnt/c/Users/uju/lider/frontend/.env.production`

로컬 직접 호출 기준:

- `VITE_API_BASE_URL=http://localhost:3001`
- `VITE_DEMO_SYSTEM_STATUS=false`

운영 same-origin 기준:

- `VITE_API_BASE_URL=`

중요:

- 운영에서는 frontend가 backend를 직접 바라보지 않는다.
- 운영에서는 Worker same-origin 프록시를 기준으로 삼는다.

### 3.5 Worker env

메인 Worker env:

- `CORE_API_BASE_URL`
- `CORE_API_SHARED_SECRET` optional
- `ANTHROPIC_MODEL=claude-sonnet-4-6`

의미:

- `CORE_API_BASE_URL` 이 있으면 auth, onboarding, health, public-data, 이후 core API를 same-origin 으로 프록시한다.
- `CORE_API_BASE_URL` 이 없으면 제한 응답 또는 fallback 경로를 유지한다.

## 4. 운영 배포 세팅

### 4.1 운영 부트 순서

반드시 아래 순서로 배포한다.

1. backend 배포
2. Worker env/secrets 반영
3. frontend asset/Worker 배포

이 순서를 어기면 프론트가 새 빌드를 보더라도 auth/status/onboarding same-origin 경로가 깨질 수 있다.

### 4.2 운영 환경 변수 표

| 레이어 | 필수 env | 설명 |
|------|------|------|
| backend | `DATABASE_URL`, `JWT_SECRET`, `PORT`, `HOST` | 인증과 DB 연결 최소 조건 |
| backend | `PUBLIC_DATA_API_KEY` | 공공데이터 실제 상태판 확인용 |
| backend | `ANTHROPIC_API_KEY`, `KIMI_API_KEY` | AI 관련 기능 활성화용 |
| frontend | `VITE_API_BASE_URL=` | 운영 same-origin 기준 유지 |
| worker | `CORE_API_BASE_URL` | 코어 backend same-origin 프록시 기준 |
| worker | `CORE_API_SHARED_SECRET` optional | shared-secret 프록시가 필요할 때만 사용 |
| worker optional | `AI_PROXY_BASE_URL`, `AI_PROXY_SHARED_SECRET` | 공개 AI fallback 용, 부록/후순위 |

### 4.3 wrangler 기준

파일:

- `/mnt/c/Users/uju/lider/frontend/wrangler.toml`

고정 원칙:

- `CORE_API_BASE_URL` 을 메인으로 설명한다.
- `AI_PROXY_*` 는 코어 세팅과 분리해 적는다.
- `run_worker_first = ["/v1/*"]` 는 유지한다.

실행 주의:

- `/mnt/c/Users/...` 같은 Windows 마운트 경로에서는 `vite build`, `wrangler deploy`, `wrangler deploy --dry-run` 이 비정상적으로 오래 걸리거나 멈출 수 있다.
- 이 경우 frontend 루트를 Linux-native 경로로 복제한 뒤 실행한다.
- 기본 우회 명령은 `/mnt/c/Users/uju/lider/frontend` 에서 `npm run build:tmp`, `npm run deploy:cloudflare:dry-run`, `npm run deploy:cloudflare:tmp` 순으로 사용한다.
- 위 명령은 소스를 `/tmp` 로 복제하고 그 위치에서 `npm ci`, `build`, `wrangler` 를 수행한다.

## 5. Seed 및 로컬 검증 계정

기준 seed:

- manager: `manager@eun-saem.kr / password123`
- worker: `worker@eun-saem.kr / password123`
- admin: `admin@yoyang.kr / password123`

기관 기준:

- 센터명: `은샘노인재가복지센터`

용도:

- auth 세션 검증
- onboarding/setup 저장 검증
- 문서/상담/현장기록 저장 검증

## 6. Smoke Endpoints

운영과 로컬에서 아래 경로를 공통 기준으로 본다.

- `GET /v1/auth/me`
- `GET /v1/auth/onboarding`
- `PUT /v1/auth/onboarding`
- `GET /v1/health`
- `GET /v1/health/detail`
- `GET /v1/public-data/status`

추가 워크플로 검증 경로:

- `POST /v1/auth/login`
- `POST /v1/extract/upload`
- `POST /v1/extract/analyze`
- `GET /v1/extract/completeness/:recipientId`
- `POST /v1/care/consultations`
- `PATCH /v1/care/consultations/:id`
- `POST /v1/mobile/voice-to-draft`

## 7. 로컬 Smoke Check 절차

### 7.1 기본 실행 확인

1. DB 실행
2. backend 실행
3. frontend 실행
4. backend `GET /v1/health`
5. frontend가 same-origin 또는 직접 backend 기준으로 로그인 가능 여부 확인

### 7.2 필수 인증 흐름

1. `manager@eun-saem.kr / password123` 로그인
2. 새로고침 후 세션 유지 확인
3. 로그아웃 후 보호 라우트 리다이렉트 확인
4. onboarding/setup 저장 후 다시 진입해 값 유지 확인

### 7.3 필수 상태판 흐름

1. `GET /v1/health`
2. `GET /v1/public-data/status`
3. public-data가 `unreachable` 이면 프론트가 이를 `실제 실패` 로 해석하는지 확인
4. Worker env 미설정 시 제한 응답과 실응답이 UI에서 구분되는지 확인

## 8. 운영 Smoke Check 절차

### 8.1 same-origin core 경로

1. Worker에 `CORE_API_BASE_URL` 미설정 상태 확인
2. 제한 응답 유지 확인
3. Worker에 `CORE_API_BASE_URL` 설정
4. Worker 재배포
5. `/v1/auth/me`, `/v1/auth/onboarding`, `/v1/health`, `/v1/public-data/status` same-origin 통과 확인

### 8.2 운영 로그인 흐름

1. 운영 도메인에서 로그인
2. 새로고침 후 세션 유지
3. onboarding/setup 복구
4. 상태판이 backend scope 기준으로 표시되는지 확인

## 9. 실패 시 판정 규칙

아래 규칙으로 원인을 먼저 판정한다.

### 9.1 Auth 실패

증상:

- 로그인 401/500
- `/v1/auth/me` 401/404
- 새로고침 후 세션 손실

우선 확인:

- backend 실행 여부
- `JWT_SECRET`
- DB 연결
- Worker `CORE_API_BASE_URL`

### 9.2 DB 실패

증상:

- 로그인 500
- onboarding 저장 실패
- 문서/상담/기록 저장 실패

우선 확인:

- `DATABASE_URL`
- DB 프로세스
- Prisma schema/migration 적용 여부

### 9.3 Public-data unreachable

증상:

- backend는 살아 있으나 public-data 상태만 실패
- 프론트가 이를 `limited` 로 축소 표기할 수 있음

우선 확인:

- `PUBLIC_DATA_API_KEY`
- backend `GET /v1/public-data/status`
- 프론트 `useSystemStatus` 파싱 로직

### 9.4 Worker env 누락

증상:

- 운영 로그인 막힘
- health/status가 공개 제한 응답만 반환

우선 확인:

- `CORE_API_BASE_URL`
- 필요 시 `CORE_API_SHARED_SECRET`
- Worker 재배포 여부

## 10. Appendix: Railway AI Fallback

이 항목은 코어 운영 세팅의 메인이 아니다.

원칙:

- same-origin core 경로가 메인이다.
- Railway AI fallback 은 공개 AI Helper 예외 경로다.
- 코어 운영 경로 실패를 fallback으로 덮지 않는다.

세부 절차:

- `/mnt/c/Users/uju/lider/docs/RAILWAY_FALLBACK_RUNBOOK.md` 를 참고한다.
