#!/bin/bash
# ArgoCD 설치 및 설정 스크립트
# Usage: ./install-argocd.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}
ARGOCD_VERSION="v2.9.0"
ROLLOUTS_VERSION="v1.6.0"

echo "=== LIDER GitOps Infrastructure Installer ==="
echo "Environment: $ENVIRONMENT"
echo "ArgoCD Version: $ARGOCD_VERSION"
echo ""

# ═════════════════════════════════════════════════════════════════
# 1. ArgoCD 설치
# ═════════════════════════════════════════════════════════════════
install_argocd() {
    echo "[1/6] Installing ArgoCD..."
    
    kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
    
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/${ARGOCD_VERSION}/manifests/install.yaml
    
    # CLI 설치
    if ! command -v argocd &> /dev/null; then
        curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/download/${ARGOCD_VERSION}/argocd-linux-amd64
        sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
        rm argocd-linux-amd64
    fi
    
    # Ingress 설정 (선택)
    cat > /tmp/argocd-ingress.yaml <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argocd-server-ingress
  namespace: argocd
  annotations:
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/ssl-passthrough: "true"
spec:
  ingressClassName: nginx
  rules:
    - host: argocd.lider.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: argocd-server
                port:
                  name: https
  tls:
    - hosts:
        - argocd.lider.ai
      secretName: argocd-tls
EOF
    kubectl apply -f /tmp/argocd-ingress.yaml
    
    # 초기 비밀번호 출력
    echo "⏳ Waiting for ArgoCD to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
    
    ARGO_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
    echo ""
    echo "✅ ArgoCD installed successfully!"
    echo "URL: https://argocd.lider.ai"
    echo "Username: admin"
    echo "Password: $ARGO_PASSWORD"
    echo ""
}

# ═════════════════════════════════════════════════════════════════
# 2. Argo Rollouts 설치
# ═════════════════════════════════════════════════════════════════
install_rollouts() {
    echo "[2/6] Installing Argo Rollouts..."
    
    kubectl create namespace argo-rollouts --dry-run=client -o yaml | kubectl apply -f -
    
    kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/download/${ROLLOUTS_VERSION}/install.yaml
    
    # kubectl 플러그인 설치
    if ! kubectl argo rollouts version &> /dev/null; then
        curl -LO https://github.com/argoproj/argo-rollouts/releases/download/${ROLLOUTS_VERSION}/kubectl-argo-rollouts-linux-amd64
        chmod +x ./kubectl-argo-rollouts-linux-amd64
        sudo mv ./kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts
    fi
    
    echo "✅ Argo Rollouts installed"
}

# ═════════════════════════════════════════════════════════════════
# 3. Sealed Secrets 설치
# ═════════════════════════════════════════════════════════════════
install_sealed_secrets() {
    echo "[3/6] Installing Sealed Secrets..."
    
    helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
    helm repo update
    
    helm upgrade --install sealed-secrets-controller sealed-secrets/sealed-secrets \
        --namespace kube-system \
        --set fullnameOverride=sealed-secrets-controller \
        --wait
    
    # kubeseal CLI 확인
    if ! command -v kubeseal &> /dev/null; then
        echo "⚠️  Please install kubeseal CLI:"
        echo "   brew install kubeseal  # macOS"
        echo "   # or download from GitHub releases"
    fi
    
    echo "✅ Sealed Secrets installed"
}

# ═════════════════════════════════════════════════════════════════
# 4. ArgoCD 프로젝트 및 애플리케이션 생성
# ═════════════════════════════════════════════════════════════════
configure_argocd() {
    echo "[4/6] Configuring ArgoCD Projects and Applications..."
    
    # Admin 비밀번호 변경 (선택)
    read -p "Change ArgoCD admin password? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -s -p "Enter new admin password: " NEW_PASSWORD
        echo
        argocd account update-password --current-password $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d) --new-password "$NEW_PASSWORD"
    fi
    
    # 프로젝트 및 애플리케이션 적용
    kubectl apply -f gitops/argocd/
    
    echo "✅ ArgoCD configured"
}

# ═════════════════════════════════════════════════════════════════
# 5. 네임스페이스 생성
# ═════════════════════════════════════════════════════════════════
create_namespaces() {
    echo "[5/6] Creating namespaces..."
    
    kubectl create namespace lider-staging --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace lider-production --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    
    # 레이블 추가
    kubectl label namespace lider-staging environment=staging --overwrite
    kubectl label namespace lider-production environment=production --overwrite
    kubectl label namespace monitoring environment=monitoring --overwrite
    
    echo "✅ Namespaces created"
}

# ═════════════════════════════════════════════════════════════════
# 6. 검증
# ═════════════════════════════════════════════════════════════════
verify_installation() {
    echo "[6/6] Verifying installation..."
    
    echo ""
    echo "📊 ArgoCD Status:"
    kubectl get pods -n argocd
    
    echo ""
    echo "📊 Argo Rollouts Status:"
    kubectl get pods -n argo-rollouts
    
    echo ""
    echo "📊 ArgoCD Applications:"
    argocd app list
    
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "Next steps:"
    echo "1. Login to ArgoCD: argocd login argocd.lider.ai"
    echo "2. Sync staging: argocd app sync lider-staging"
    echo "3. Check rollouts: kubectl argo rollouts list -n lider-production"
}

# ═════════════════════════════════════════════════════════════════
# 메인 실행
# ═════════════════════════════════════════════════════════════════
main() {
    echo "Prerequisites check..."
    command -v kubectl >/dev/null 2>&1 || { echo "kubectl is required"; exit 1; }
    command -v helm >/dev/null 2>&1 || { echo "helm is required"; exit 1; }
    
    install_argocd
    install_rollouts
    install_sealed_secrets
    create_namespaces
    configure_argocd
    verify_installation
}

main "$@"
