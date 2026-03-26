# LIDER Railway Fallback Runbook

## Scope

- This runbook is an appendix, not the primary runtime contract.
- Purpose: keep the same-origin public Worker as the primary path and prepare Railway only as a fallback target.
- User-facing model policy: all public chat and file-analysis responses must stay on `claude-sonnet-4-6`.
- Public file policy: keep `TXT`, `DOCX`, `MD`, `XLSX`, `XLS`, `CSV` enabled and keep `PDF` excluded.

## AI Proxy Runtime

- App directory: `/mnt/c/Users/uju/lider/ai-proxy`
- Start command: `npm run start`
- Build command: `npm run build`
- Port: `8788`
- Host: `0.0.0.0`
- Health check URL: `/healthz`

## Required Env Vars

Set these in Railway for the `ai-proxy` service:

- `PORT=8788`
- `HOST=0.0.0.0`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_BASE_URL=https://api.anthropic.com/v1`
- `ANTHROPIC_MODEL=claude-sonnet-4-6`
- `AI_PROXY_SHARED_SECRET`

Do not set `ANTHROPIC_MODEL` to Opus or Haiku for this public fallback path.

## Worker Secrets

Set these on the Cloudflare Worker:

- Secret name: `AI_PROXY_BASE_URL`
- Secret name: `AI_PROXY_SHARED_SECRET`

`AI_PROXY_SHARED_SECRET` must match Railway `AI_PROXY_SHARED_SECRET`.

## Deployment Steps

### Railway

1. Install Railway CLI if it is not present.
2. Log in to Railway.
3. Create or select the project for `ai-proxy`.
4. Add the env vars listed above.
5. Deploy `/mnt/c/Users/uju/lider/ai-proxy`.
6. Confirm `GET /healthz` returns `200`.
7. Confirm `GET /v1/ai/status` returns `200` when the `x-lider-ai-proxy-secret` header is present.

### Cloudflare Worker

1. Keep the current same-origin Worker deployed as the primary path.
2. Set `AI_PROXY_BASE_URL` to the Railway service base URL.
3. Set `AI_PROXY_SHARED_SECRET` to the same shared secret used in Railway.
4. Redeploy the Worker.
5. Confirm `/v1/ai/status` still reports `direct` when Anthropic direct is healthy.
6. Confirm fallback is only used when direct is unavailable or blocked.

## Direct-to-Fallback Cutover Order

Use this order if the direct Anthropic path fails in production:

1. Check public Worker `/v1/ai/status`.
2. If `direct` is failing, verify Railway `/healthz`.
3. Verify Railway `/v1/ai/status` with the shared-secret header.
4. Ensure Worker secrets `AI_PROXY_BASE_URL` and `AI_PROXY_SHARED_SECRET` are present.
5. Redeploy the Worker only if secrets changed.
6. Re-test public `/v1/ai/chat` and `/v1/ai/analyze-file`.
7. Leave direct enabled. Do not remove the direct path from Worker logic.

## What Is Automated Now

- `ai-proxy` exposes `/healthz` for Railway health checks.
- `ai-proxy` keeps `claude-sonnet-4-6` fixed.
- `ai-proxy` and Worker both use token-aware input limiting, recent-turn chat compaction, and `429` retry-after backoff.
- Worker fallback request signing with `x-lider-ai-proxy-secret` remains in place.

## What Is Still Manual

- Railway CLI installation and login
- Railway project creation and first deploy
- Setting Railway env vars
- Setting Cloudflare Worker secrets
- Worker redeploy after secret changes

## Operations Notes

- Real-time public requests intentionally do not use 1M-context patterns.
- Current multi-turn strategy is `recent N turns + token cap`. A later phase can add summary compaction if longer sessions become common.
- Prompt caching is not enabled by default because the public prompts are short and dynamic.
- For future cost governance, integrate Anthropic Usage or cost exports outside the request path and review them on a schedule.
- For future offline bulk jobs, use the Anthropic Message Batches API only for non-interactive backoffice work. Do not route the public real-time Worker path through batches.
