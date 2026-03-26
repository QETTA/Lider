# LIDER 다음 배포 실행 프롬프트

아래 프롬프트를 새 세션 첫 메시지로 그대로 붙여 넣는다.

```text
You are continuing deployment execution work on the LIDER project at:
/mnt/c/Users/uju/lider

Work directly in this workspace.
Communicate in Korean.
Be concise, decisive, and execution-oriented.
Give short progress updates while working.

This is not an exploration-only session.
Do not redesign the product.
Do not spend time re-auditing already-verified frontend behavior unless a regression appears.

Read these docs first, in this order:
1. /mnt/c/Users/uju/lider/docs/CORE_RUNTIME_SETUP_2026-03-26.md
2. /mnt/c/Users/uju/lider/docs/AI_REFACTORING_MASTER_PLAN_2026-03-26.md
3. /mnt/c/Users/uju/lider/docs/AI_EXECUTION_TICKETS_2026-03-26.md
4. /mnt/c/Users/uju/lider/docs/NEXT_SESSION_MASTER_PROMPT_2026-03-26.md
5. /mnt/c/Users/uju/lider/docs/RAILWAY_FALLBACK_RUNBOOK.md

Current verified reality as of 2026-03-26:
- Browser QA already reached the core path successfully.
- Login with `manager@eun-saem.kr / password123` worked.
- `Dashboard`, `Consultation`, `MobileEntry` all rendered for real after login.
- Refresh on `/mobile-entry` preserved the session.
- Clearing the saved session and re-entering `/dashboard` redirected to `/login`.
- `Consultation` completed recipient/record loading and AI draft generation.
- `MobileEntry` completed quick-entry save.

- Frontend deployment target is Cloudflare Worker.
- Source files:
  - `/mnt/c/Users/uju/lider/frontend/wrangler.toml`
  - `/mnt/c/Users/uju/lider/frontend/worker/index.ts`
- Production frontend rule:
  - keep `VITE_API_BASE_URL=` blank in `/mnt/c/Users/uju/lider/frontend/.env.production`
  - Worker must proxy backend same-origin using `CORE_API_BASE_URL`

- Backend deployment target is NOT Cloudflare.
- Backend runtime is Node/Fastify + Prisma + PostgreSQL and needs a separate container host.
- Relevant backend files:
  - `/mnt/c/Users/uju/lider/backend/Dockerfile`
  - `/mnt/c/Users/uju/lider/backend/prisma/schema.prisma`

- Required deployment order is fixed:
  1. backend deploy
  2. Worker env/secrets apply
  3. frontend Worker deploy

- A mounted-drive tooling issue was confirmed:
  - on `/mnt/c/Users/...`, `vite build`, `wrangler deploy`, and `wrangler deploy --dry-run` can stall or run abnormally long
  - this is most visible in the frontend build/deploy toolchain

- A safe workaround is already implemented in the frontend source:
  - `/mnt/c/Users/uju/lider/frontend/scripts/cloudflare-tmp-run.sh`
  - npm scripts:
    - `npm run build:tmp`
    - `npm run deploy:cloudflare:dry-run`
    - `npm run deploy:cloudflare:tmp`
  - these commands copy the frontend source to `/tmp`, run `npm ci`, `npm run build`, and then run Wrangler from the Linux-native temp path

- The workaround has already been verified:
  - `npm ci` succeeded in the temp copy
  - `npm run build` succeeded in the temp copy
  - `npx wrangler deploy --dry-run` succeeded in the temp copy
  - `npm run deploy:cloudflare:dry-run` also succeeded when launched from `/mnt/c/Users/uju/lider/frontend`

Primary mission for this session:
Finish the real deployment path as far as credentials, environment access, and hosting allow.
Do not stop at configuration review.
Push through actual backend deploy preparation, Worker env wiring, frontend Worker deploy, and smoke verification whenever access is available.

Priority order:
1. Confirm backend hosting target and runtime truth
   - inspect backend Docker/runtime files
   - confirm required env vars for backend
   - confirm where the backend should be deployed
   - if deploy credentials or host context already exist locally, use them
2. Confirm Worker env/secrets requirements
   - `CORE_API_BASE_URL` is the primary required runtime variable
   - `CORE_API_SHARED_SECRET` is optional
   - keep `AI_PROXY_*` as optional fallback only
3. Deploy backend first if deployment access is possible
4. Apply Worker env/secrets next
5. Deploy frontend Worker using:
   - `npm run deploy:cloudflare:tmp`
6. Run post-deploy smoke checks
   - login
   - refresh session persistence
   - protected-route redirect when session is cleared
   - `Dashboard`
   - `Consultation`
   - `MobileEntry`
   - same-origin `/v1/auth/me`, `/v1/auth/onboarding`, `/v1/health`, `/v1/public-data/status`

Hard constraints:
- Do not point production frontend directly at backend with `VITE_API_BASE_URL`
- Do not try to deploy the backend onto Cloudflare Worker
- Do not replace the same-origin Worker + core backend structure
- Do not reintroduce Railway AI fallback as the main runtime path
- Do not change the frontend design unless a deploy fix strictly requires it

Files most likely to matter:
- /mnt/c/Users/uju/lider/docs/CORE_RUNTIME_SETUP_2026-03-26.md
- /mnt/c/Users/uju/lider/frontend/.env.production
- /mnt/c/Users/uju/lider/frontend/wrangler.toml
- /mnt/c/Users/uju/lider/frontend/worker/index.ts
- /mnt/c/Users/uju/lider/frontend/package.json
- /mnt/c/Users/uju/lider/frontend/scripts/cloudflare-tmp-run.sh
- /mnt/c/Users/uju/lider/backend/Dockerfile
- /mnt/c/Users/uju/lider/backend/prisma/schema.prisma

Verification requirements:
- If staying on the mounted Windows path, do not trust direct `npm run build` or `npx wrangler deploy`
- Prefer the temp-copy path via:
  - `npm run build:tmp`
  - `npm run deploy:cloudflare:dry-run`
  - `npm run deploy:cloudflare:tmp`
- If backend deploy is blocked, still finish:
  - exact env checklist
  - exact deploy commands
  - exact blocker
  - exact next operator step
- Distinguish clearly between:
  - browser QA already verified
  - local build/deploy tooling verified through temp-copy workaround
  - actual production deploy completed or blocked

If blocked:
- Report the blocker precisely.
- Include whether the blocker is:
  - missing deploy credentials
  - missing backend host
  - missing Cloudflare auth
  - missing Worker secret/env value
  - runtime failure after deploy
- Do not give a vague “deployment pending” summary.
- Leave the workspace with the most executable next step possible.

Start now by:
1. Reading the docs in order.
2. Checking frontend/package deploy scripts and Worker config.
3. Checking backend Docker/runtime deploy readiness.
4. Determining whether actual deploy credentials are available in this environment.
5. If deployment access exists, executing the deployment order end-to-end.
6. If deployment access is missing, preparing the exact one-shot command sequence and environment checklist for the operator.
```

## 현재 세션 반영 메모

- 2026-03-26 기준 브라우저 QA 핵심 경로는 완료 상태다.
- 운영 배포 구조는 `backend container -> Worker env/secrets -> frontend Worker deploy` 로 고정됐다.
- `/mnt/c/Users/...` 경로에서의 프런트 빌드/배포 정지 문제는 재현됐다.
- `/tmp` Linux-native 복제본에서는 `npm ci`, `npm run build`, `wrangler deploy --dry-run` 이 정상 통과했다.
- `/mnt/c/Users/uju/lider/frontend` 에서 `npm run deploy:cloudflare:dry-run` 도 새 우회 스크립트로 정상 통과했다.
