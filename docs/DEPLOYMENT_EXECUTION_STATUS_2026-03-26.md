# LIDER 배포 실행 상태

작성 시각: 2026-03-26

## 1. 이번 세션에서 실제 완료된 작업

- `/mnt/c/Users/uju/lider/docs/NEXT_DEPLOYMENT_EXECUTION_PROMPT_2026-03-26.md` 기준으로 배포 실행 경로를 점검했다.
- `/mnt/c/Users/uju/lider/docs/NEXT_SESSION_MASTER_PROMPT_2026-03-26.md` 는 현재 저장소에 존재하지 않음을 확인했다.
- backend 빌드 확인:
  - 작업 디렉터리: `/mnt/c/Users/uju/lider/backend`
  - 명령: `npm run build`
  - 결과: 성공
- frontend Linux-native 우회 빌드 확인:
  - 작업 디렉터리: `/mnt/c/Users/uju/lider/frontend`
  - 명령: `npm run build:tmp`
  - 결과: 성공
- frontend Cloudflare Worker 실배포 실행:
  - 작업 디렉터리: `/mnt/c/Users/uju/lider/frontend`
  - 명령: `npm run deploy:cloudflare:tmp`
  - 결과: 성공
  - 배포 URL: `https://lider-frontend.lider-yohan.workers.dev`
  - 초기 Version ID: `b163737a-e76a-4091-b03d-7397ad446d57`
- Cloudflare 배포 이력 조회:
  - 명령: `npx wrangler deployments list`
  - 결과: 성공
  - 확인된 작성자: `qetta.ai@gmail.com`
- Worker secret 실조작 검증:
  - `CORE_API_BASE_URL` secret put 성공
  - `CORE_API_BASE_URL` secret delete 성공

## 1.1 추가 실험 결과

- 후보 1 적용:
  - `CORE_API_BASE_URL=https://api.yoyang-radar.kr`
  - Worker 재배포 후 결과: `530`
  - 세부 원인: `Cloudflare Error 1016 / Origin DNS error`
- 후보 2 적용:
  - `CORE_API_BASE_URL=https://api.lider.ai`
  - Worker 재배포 후 결과: `530`
  - 세부 원인: `Cloudflare Error 1016 / Origin DNS error`
- 안전 복구:
  - `CORE_API_BASE_URL` secret 삭제
  - Worker 재배포 완료
  - 복구 후 Version ID: `55419ef8-1e60-497c-8151-e8dd989c617d`

## 1.2 임시 tunnel 기반 same-origin 실검증

운영용 origin 을 찾지 못한 상태에서, 연결 경로 자체를 검증하기 위해 아래 임시 검증을 수행했다.

- 로컬 backend 실행:
  - `http://127.0.0.1:3001`
  - `GET /v1/health` 성공
  - `GET /v1/health/detail` 성공
  - `POST /v1/auth/login` 성공
- 로컬 DB 상태:
  - Docker 컨테이너 `yoyang-db-local` 실행 중
  - `users`, `user_onboarding_profiles` 포함 스키마 준비 확인
  - seed 계정 존재 확인
- 임시 공개 터널:
  - `https://vast-apes-cry.loca.lt`
  - tunnel 경유 `GET /v1/health` 성공
  - tunnel 경유 `POST /v1/auth/login` 성공
- Worker에 임시로 `CORE_API_BASE_URL=https://vast-apes-cry.loca.lt` 적용 후 재배포:
  - Version ID: `2b893a52-2386-4cd8-8bd3-454e8fd2d94f`
  - `GET /v1/health` 결과: `200`, `scope: backend`
  - `GET /v1/health/detail` 결과: `200`, `database: true`
  - `POST /v1/auth/login` 결과: `200`
  - `GET /v1/auth/me` 결과: `200`
  - `GET /v1/auth/onboarding` 결과: `200`
  - `PUT /v1/auth/onboarding` 후 재조회 결과: 저장값 유지 확인
  - `GET /v1/public-data/status` 결과: `200`, `status: operational`

중요:

- 위 검증은 “Worker same-origin 프록시 구조가 실제로 작동한다”는 점을 증명한다.
- 하지만 이 tunnel URL 은 임시 세션 기반이므로 운영 origin 으로 사용할 수 없다.
- 따라서 검증 후에는 다시 안전 상태로 복구해야 한다.

## 1.3 임시 검증 종료 후 안전 복구 재확인

- 임시 `CORE_API_BASE_URL=https://vast-apes-cry.loca.lt` 설정 삭제 완료
- Worker 재배포 완료
- 최신 안전 복구 Version ID: `52986f4e-0b15-4a59-9d8f-6913fbaca6e0`
- 현재 Worker secret 목록 재확인 결과:
  - `ANTHROPIC_API_KEY` 만 남아 있음
- live 재검증 결과:
  - `GET /v1/health` 결과: `200`, `scope: public-worker`, `status: limited`
  - `GET /v1/auth/me` 결과: `503`, `CORE_API_NOT_CONFIGURED`
- 해석:
  - 임시 tunnel 기반 검증은 종료되었고
  - 현재 운영 노출 상태는 다시 문서 기준의 안전한 `limited` 모드로 복구되었다

## 2. 실배포 후 확인 결과

- `GET /v1/health`
  - URL: `https://lider-frontend.lider-yohan.workers.dev/v1/health`
  - 결과: `200 OK`
  - 상태: `limited`
- `GET /v1/auth/me`
  - URL: `https://lider-frontend.lider-yohan.workers.dev/v1/auth/me`
  - 결과: `503`
  - 에러 코드: `CORE_API_NOT_CONFIGURED`
  - 의미: Worker에 `CORE_API_BASE_URL` 이 아직 설정되지 않아 same-origin core backend 프록시가 활성화되지 않음

## 2.1 후보 origin 검증 결과

- `https://api.yoyang-radar.kr`
  - Worker same-origin 요청 결과: `530`
  - Cloudflare 에러: `1016 Origin DNS error`
  - 해석: 현재 public backend origin 으로 사용할 수 없음
- `https://api.lider.ai`
  - Worker same-origin 요청 결과: `530`
  - Cloudflare 에러: `1016 Origin DNS error`
  - 해석: 현재 public backend origin 으로 사용할 수 없음

## 3. 현재 정확한 차단 지점

- backend deploy credentials missing
  - 현재 세션에 `kubectl`, `aws`, `argocd`, `kustomize` 가 없다.
  - AWS/EKS/ArgoCD 접근 자격 증명도 현재 세션 환경변수에서 확인되지 않았다.
- missing backend host
  - Worker에 넣어야 할 `CORE_API_BASE_URL` 값을 아직 확정할 수 없다.
  - 저장소에는 Kubernetes/ArgoCD 배포 흔적이 있지만, 현재 세션만으로는 실제 운영 backend base URL 을 확인할 수 없다.
  - 실검증 결과 `https://api.yoyang-radar.kr`, `https://api.lider.ai` 둘 다 Cloudflare `1016 Origin DNS error` 로 실패했다.
  - 2026-03-26 현재 외부 조회 기준 `api.yoyang-radar.kr`, `yoyang-radar.kr`, `api.lider.ai`, `lider.ai` 모두 이 환경에서 DNS 해석에 실패했다.
  - 공용 DNS JSON API(`https://dns.google/resolve`) 기준 재확인:
    - `api.lider.ai` -> `Status: 3 (NXDOMAIN)`
    - `yoyang-radar.kr` -> `Status: 3 (NXDOMAIN)`
    - `api.yoyang-radar.kr` -> `Status: 3 (NXDOMAIN)`
    - `lider.ai` -> `Status: 0 (NOERROR)` 이지만 `A` / `AAAA` answer 없음
  - 저장소 내부 기준도 일관되지 않다:
    - Kubernetes ingress / backend swagger / configmap: `api.yoyang-radar.kr`, `yoyang-radar.kr`
    - GitOps frontend rollout: `https://api.lider.ai`
    - GitHub Actions production health check: `https://lider.ai/api/health/ready`
    - Kubernetes frontend nginx config: `location /api/` -> `yoyang-radar-backend-service:3001`
  - 따라서 `https://api.lider.ai` 외에 `https://lider.ai/api` 도 실제 backend public base URL 후보로 봐야 한다.
  - Worker 구현은 `CORE_API_BASE_URL + current pathname` 그대로 upstream 으로 호출하므로, 운영 ingress 가 `https://lider.ai/api/* -> backend /*` 구조라면 `CORE_API_BASE_URL=https://lider.ai/api` 로 동작 가능하다.
  - 다만 현재 세션 환경에서는 `curl https://lider.ai/api/v1/health` 자체가 `Could not resolve host: lider.ai` 로 막혀, 이 후보도 여기서 직접 확정할 수는 없었다.
- missing Worker secret/env value
  - `CORE_API_BASE_URL` 미설정이 실제 응답으로 확인됐다.
- GitOps execution context incomplete
  - 현재 작업본은 Git 저장소가 아니어서 바로 `git push` 기반 GitOps 경로를 수행할 수 없다.

## 4. 현재 기준 운영 배포 해석

- browser QA 완료 여부:
  - 이전 세션 기준 완료로 문서화되어 있음
- local build/deploy toolchain 검증:
  - 이번 세션에서 backend build 성공
  - frontend temp-copy build 성공
  - frontend Cloudflare Worker 실배포 성공
- actual production completion:
  - frontend Worker 배포는 완료
  - core backend 연결은 미완료
  - same-origin auth/onboarding/health/public-data 는 아직 core backend 미연결 상태

## 5. backend 호스팅에 대해 현재 확인된 사실

- primary runtime 문서는 `same-origin Worker + core backend` 구조를 요구한다.
- backend 는 Cloudflare Worker 가 아니라 별도 컨테이너 호스트가 필요하다.
- 저장소의 실제 배포 흔적은 Kubernetes/ArgoCD/EKS 쪽에 가깝다.
  - `/mnt/c/Users/uju/lider/.github/workflows/ci-cd-pipeline.yml`
  - `/mnt/c/Users/uju/lider/gitops/argocd/03-application-production.yaml`
  - `/mnt/c/Users/uju/lider/k8s/base/04-backend.yaml`
- 다만 커스텀 도메인 기준은 문서 사이에 일관성이 없다.
  - GitHub Actions: `https://lider.ai`
  - Kubernetes ingress: `https://yoyang-radar.kr`, `https://api.yoyang-radar.kr`
  - GitHub Actions production health check 는 `https://lider.ai/api/health/ready` 를 사용한다.
  - Kubernetes frontend nginx 는 `/api/` 를 backend service 로 reverse proxy 하도록 정의돼 있다.
- 따라서 운영자가 실제 사용 중인 backend public base URL 을 최종 확인한 뒤 `CORE_API_BASE_URL` 로 넣어야 한다.

## 6. Worker에 필요한 값

필수:

- `CORE_API_BASE_URL`

선택:

- `CORE_API_SHARED_SECRET`

유지:

- `/mnt/c/Users/uju/lider/frontend/.env.production` 의 `VITE_API_BASE_URL=` 는 빈 값 유지

## 7. 운영자 원샷 실행 순서

아래 순서는 실제 접근 권한이 있는 운영 환경에서 그대로 수행하면 된다.

### 7.1 backend 먼저

GitHub Actions 경로를 쓸 경우:

1. 실제 Git 저장소 clone 또는 정상 Git 작업본에서 작업한다.
2. backend 이미지를 빌드/푸시한다.
3. production 이미지 태그를 `k8s/overlays/production/kustomization.yaml` 에 반영한다.
4. ArgoCD sync 로 production backend 를 먼저 반영한다.
5. backend public URL 을 확인한다.

참고 이미지 경로:

- backend 현재 매니페스트 이름: `yoyangradar/backend`
- frontend 현재 매니페스트 이름: `yoyangradar/frontend`
- GitHub Actions 푸시 대상은 `ghcr.io/qetta/lider-backend`, `ghcr.io/qetta/lider-frontend` 로 보인다.

주의:

- CI 워크플로의 `kustomize edit set image backend=... frontend=...` 는 실제 매니페스트 이미지명과 다를 수 있으니 운영 실행 전에 한 번 맞춰 확인해야 한다.

직접 명령 예시:

```bash
cd /path/to/real/git/repo

docker buildx build \
  --platform linux/amd64 \
  -t ghcr.io/qetta/lider-backend:2026-03-26 \
  ./backend \
  --push

docker buildx build \
  --platform linux/amd64 \
  -t ghcr.io/qetta/lider-frontend:2026-03-26 \
  ./frontend \
  --push

aws eks update-kubeconfig --name lider-production --region ap-northeast-2

argocd login "$ARGOCD_SERVER" \
  --username "$ARGOCD_USERNAME" \
  --password "$ARGOCD_PASSWORD" \
  --grpc-web

cd k8s/overlays/production
kustomize edit set image yoyangradar/backend=ghcr.io/qetta/lider-backend:2026-03-26
kustomize edit set image yoyangradar/frontend=ghcr.io/qetta/lider-frontend:2026-03-26

git add kustomization.yaml
git commit -m "chore: deploy 2026-03-26"
git push

argocd app sync lider-production --force --retry-limit 5 --timeout 600
kubectl argo rollouts status lider-backend -n lider-production --timeout 15m
```

### 7.2 Worker env/secrets 적용

backend public base URL 확정 후:

```bash
cd /mnt/c/Users/uju/lider/frontend

printf '%s' 'https://YOUR_BACKEND_BASE_URL' | npx wrangler secret put CORE_API_BASE_URL

# optional
printf '%s' 'YOUR_SHARED_SECRET' | npx wrangler secret put CORE_API_SHARED_SECRET
```

### 7.3 frontend Worker 재배포

```bash
cd /mnt/c/Users/uju/lider/frontend
npm run deploy:cloudflare:tmp
```

## 8. 배포 후 스모크 체크

```bash
curl -i https://lider-frontend.lider-yohan.workers.dev/v1/health
curl -i https://lider-frontend.lider-yohan.workers.dev/v1/auth/me
curl -i https://lider-frontend.lider-yohan.workers.dev/v1/auth/onboarding
curl -i https://lider-frontend.lider-yohan.workers.dev/v1/public-data/status
```

브라우저 확인 항목:

- 로그인
- 새로고침 후 세션 유지
- 세션 제거 후 보호 라우트 리다이렉트
- `Dashboard`
- `Consultation`
- `MobileEntry`

## 9. 다음 운영자 한 줄 액션

가장 다음 액션은 이것이다:

1. 실제 backend public URL 을 확인한다.
2. 그 URL 이 Cloudflare `1016` 없이 직접 해석되는지 먼저 확인한다.
3. `CORE_API_BASE_URL` 을 Worker secret 으로 넣는다.
4. `npm run deploy:cloudflare:tmp` 를 다시 실행한다.
5. same-origin `/v1/auth/me` 가 `503 CORE_API_NOT_CONFIGURED` 에서 정상 응답으로 바뀌는지 확인한다.
