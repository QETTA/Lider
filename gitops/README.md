# 🚀 LIDER GitOps Infrastructure

ArgoCD 기반 GitOps 인프라 설정으로 자동화된 배포와 Canary/Blue-Green 전략을 구현합니다.

## 📁 디렉토리 구조

```
gitops/
├── argocd/                    # ArgoCD 설정
│   ├── 01-project.yaml        # 프로젝트 및 RBAC
│   ├── 02-application-staging.yaml
│   ├── 03-application-production.yaml
│   └── 04-applicationset.yaml
├── rollouts/                  # Argo Rollouts 설정
│   ├── 01-backend-rollout.yaml   # Canary 배포
│   ├── 02-analysis-templates.yaml # 분석 템플릿
│   └── 03-frontend-rollout.yaml  # Blue/Green 배포
├── sealed-secrets/            # 암호화된 Secret
│   ├── 01-sealed-secrets-controller.yaml
│   ├── 02-example-secrets.yaml
│   └── README.md
├── install-argocd.sh         # 설치 스크립트
└── README.md                 # 이 파일
```

## 🚀 빠른 시작

### 1. ArgoCD 설치

```bash
# 설치 스크립트 실행
./install-argocd.sh

# 또는 수동 설치
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 2. Argo Rollouts 설치

```bash
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

### 3. GitOps 설정 적용

```bash
# 프로젝트 및 애플리케이션 생성
kubectl apply -f gitops/argocd/

# Canary 설정 적용 (Production)
kubectl apply -f gitops/rollouts/ -n lider-production
```

### 4. ArgoCD CLI 로그인

```bash
# 초기 비밀번호 가져오기
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# 로그인
argocd login argocd.lider.ai --username admin

# 비밀번호 변경
argocd account update-password
```

## 📊 배포 전략

### Backend: Canary Deployment

```
10% → 5분 대기 → Smoke Test → 25% → 5분 대기 → 50% → 
10분 대기 → Load Test → 75% → 5분 대기 → 100%
```

각 단계에서 자동 분석:
- HTTP Availability > 95%
- Response Time < 500ms
- Error Rate < 5%

### Frontend: Blue/Green Deployment

```
Green 배포 → E2E 테스트 → 수동 승인 → Blue로 전환
```

## 🔧 주요 명령어

### ArgoCD

```bash
# 애플리케이션 동기화
argocd app sync lider-staging

# 상태 확인
argocd app get lider-production

# 히스토리 확인
argocd app history lider-production

# 롤백
argocd app rollback lider-production 3
```

### Argo Rollouts

```bash
# Rollout 상태 확인
kubectl argo rollouts get rollout lider-backend -n lider-production --watch

# 프로모션 승인
kubectl argo rollouts promote lider-backend -n lider-production

# 롤백
kubectl argo rollouts abort lider-backend -n lider-production

# 다시 시작
kubectl argo rollouts retry lider-backend -n lider-production
```

## 🔒 보안

### Sealed Secrets

```bash
# Secret 암호화
kubeseal --controller-namespace=kube-system -f secret.yaml -w sealed-secret.yaml

# 암호화된 Secret 적용
kubectl apply -f sealed-secret.yaml
```

### RBAC

- **admin**: 모든 권한
- **developer**: staging 동기화 권한
- **operator**: production 읽기 + 롤백 권한

## 📈 모니터링

### ArgoCD 대시보드
- URL: https://argocd.lider.ai
- 동기화 상태, 드리프트, 히스토리 확인

### Rollout 대시보드
```bash
# CLI로 실시간 모니터링
kubectl argo rollouts dashboard -n lider-production
```

### Prometheus 메트릭
```
argocd_app_info
argocd_app_sync_status
argocd_app_health_status
argo_rollouts_analysis_run_metric_result
```

## 🔄 CI/CD 통합

GitHub Actions에서 ArgoCD와 연동:

```yaml
- name: Deploy to Production
  run: |
    argocd app sync lider-production --force
    kubectl argo rollouts status lider-backend -n lider-production
```

## 🛠️ 문제 해결

### 동기화 실패
```bash
# 로그 확인
kubectl logs -n argocd deployment/argocd-application-controller

# 수동 동기화
argocd app sync lider-staging --force
```

### Canary 분석 실패
```bash
# AnalysisRun 확인
kubectl get analysisruns -n lider-production

# 로그 확인
kubectl logs -n lider-production -l app=lider-backend --tail=100
```

### Secret 복호화 실패
```bash
# Sealed Secrets 로그
kubectl logs -n kube-system -l app.kubernetes.io/name=sealed-secrets-controller
```

## 📚 참고 자료

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Argo Rollouts Documentation](https://argoproj.github.io/argo-rollouts/)
- [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets)
- [GitOps Best Practices](https://codefresh.io/gitops/)
