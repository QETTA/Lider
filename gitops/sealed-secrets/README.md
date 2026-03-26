# Sealed Secrets 사용 가이드

## 개요

Sealed Secrets는 GitOps 환경에서 Kubernetes Secret을 안전하게 관리하기 위한 도구입니다.
Secret을 공개 키로 암호화하여 Git에 저장할 수 있으며, 클러스터 내에서만 복호화됩니다.

## 설치

### 1. Sealed Secrets Controller 설치

```bash
# Helm으로 설치
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm repo update

helm install sealed-secrets-controller sealed-secrets/sealed-secrets \
  --namespace kube-system \
  --set fullnameOverride=sealed-secrets-controller
```

### 2. kubeseal CLI 설치

```bash
# macOS
brew install kubeseal

# Linux
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/kubeseal-0.24.0-linux-amd64.tar.gz
tar -xzf kubeseal-0.24.0-linux-amd64.tar.gz
sudo install -m 755 kubeseal /usr/local/bin/
```

## 사용법

### 1. Secret 생성 및 암호화

```bash
# 1. 일반 Secret YAML 생성
cat > secret.yaml <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
  namespace: lider-production
stringData:
  password: my-secret-password
  api-key: my-api-key-value
EOF

# 2. kubeseal로 암호화
kubeseal --controller-namespace=kube-system \
  --controller-name=sealed-secrets-controller \
  -f secret.yaml \
  -w sealed-secret.yaml

# 3. Git에 암호화된 Secret 저장
git add sealed-secret.yaml
git commit -m "Add sealed secret for my-secret"

# 4. 원본 Secret 삭제
rm secret.yaml
```

### 2. 클러스터 전체 범위 Secret

여러 네임스페이스에서 사용 가능한 Secret:

```bash
kubeseal --scope cluster-wide \
  -f secret.yaml \
  -w sealed-secret.yaml
```

### 3. 배치 암호화

```bash
# 모든 secret 파일을 한번에 암호화
for file in secrets/*.yaml; do
  kubeseal -f "$file" -w "sealed-$(basename $file)"
done
```

## ArgoCD와 통합

### 1. Secret 생성 스크립트

```bash
#!/bin/bash
# create-sealed-secret.sh

NAMESPACE=${1:-lider-production}
SECRET_NAME=$2
KEY=${3:-password}
VALUE=$4

kubectl create secret generic "$SECRET_NAME" \
  --namespace "$NAMESPACE" \
  --from-literal="$KEY=$VALUE" \
  --dry-run=client -o yaml | \
  kubeseal --controller-namespace=kube-system -o yaml
```

### 2. CI/CD에서 자동화

```yaml
# .github/workflows/seal-secrets.yml
name: Seal Secrets
on:
  workflow_dispatch:
    inputs:
      secret_name:
        required: true
      namespace:
        default: lider-production

jobs:
  seal:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install kubeseal
        run: |
          wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/kubeseal-0.24.0-linux-amd64.tar.gz
          tar -xzf kubeseal-0.24.0-linux-amd64.tar.gz
          sudo install -m 755 kubeseal /usr/local/bin/
      
      - name: Seal Secret
        run: |
          echo "${{ secrets.SECRET_VALUE }}" | \
          kubectl create secret generic ${{ github.event.inputs.secret_name }} \
            --namespace ${{ github.event.inputs.namespace }} \
            --from-file=password=/dev/stdin \
            --dry-run=client -o yaml | \
          kubeseal --controller-namespace=kube-system -o yaml > \
            gitops/sealed-secrets/${{ github.event.inputs.secret_name }}.yaml
```

## 보안 고려사항

### 1. 인증서 백업

```bash
# 인증서 백업 (반드시 안전한 곳에 저장)
kubectl get secret -n kube-system sealed-secrets-key -o yaml > sealed-secrets-key.backup.yaml
```

### 2. 인증서 복구

```bash
# 인증서 복구
kubectl apply -f sealed-secrets-key.backup.yaml
kubectl rollout restart deployment/sealed-secrets-controller -n kube-system
```

### 3. 인증서 교체

```bash
# 새 인증서 생성 및 점진적 마이그레션
kubectl delete secret -n kube-system sealed-secrets-key
kubectl rollout restart deployment/sealed-secrets-controller -n kube-system
# 모든 sealed secret 재암호화 필요
```

## 디버깅

```bash
# Controller 로그 확인
kubectl logs -n kube-system -l app.kubernetes.io/name=sealed-secrets-controller

# Sealed Secret 상태 확인
kubectl get sealedsecrets -A

# 복호화된 Secret 확인
kubectl get secret my-secret -o yaml

# kubeseal 연결 테스트
kubeseal --controller-namespace=kube-system --fetch-cert > pub-cert.pem
```

## 참고 자료

- [Sealed Secrets GitHub](https://github.com/bitnami-labs/sealed-secrets)
- [ArgoCD Best Practices](https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/)
