# LIDER 기술 아키텍처 문서 v1.0

> AI 업무 오케스트레이션 플랫폼 아키텍처 설계

---

## 목차

1. [아키텍처 개요](#1-아키텍처-개요)
2. [시스템 컴포넌트](#2-시스템-컴포넌트)
3. [데이터 흐름](#3-데이터-흐름)
4. [모델 라우팅 상세](#4-모델-라우팅-상세)
5. [보안 및 권한](#5-보안-및-권한)
6. [배포 아키텍처](#6-배포-아키텍처)
7. [모니터링 및 관찰성](#7-모니터링-및-관찰성)

---

## 1. 아키텍처 개요

### 1.1 핵심 원칙

| 원칙 | 설명 |
|------|------|
| **Separation of Concerns** | 모델은 설명/오케스트레이션, DB/규칙은 진실의 원천 |
| **Deterministic Validation** | 모든 AI 출력은 스키마 검증을 통과해야 함 |
| **Graceful Degradation** | 모델 실패 시 fallback 체인으로 자동 복구 |
| **Auditability** | 모든 결정 추적 가능한 로그 체계 |
| **Cost Efficiency** | 모델 라우팅으로 고비용 모델 사용 최소화 |

### 1.2 아키텍처 다이어그램

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT LAYER                                   │
│   React/Vue/Svelte SPA  ←→  Static Deployment (CDN)                          │
│         │                           │                                        │
│         └──────────────┬────────────┘                                        │
│                        │ API Calls                                           │
└────────────────────────┼──────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              API GATEWAY                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   Rate Limiter  │  │   Auth (JWT)    │  │   PII Redaction Layer       │  │
│  │   (Redis)       │  │   (OAuth2/OIDC) │  │   (Regex + NLP)             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  /v1/assist  │ │ /v1/extract  │ │/v1/actions/  │
│              │ │              │ │   preview    │
└──────────────┘ └──────────────┘ └──────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              MODEL ROUTER                                     │
│                                                                               │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│   │ kimi-k2-0905    │    │ kimi-k2-thinking│    │   kimi-k2.5     │    │claude-sonnet-4-6│   │
│   │ (default)       │───→│  (planner)      │───→│  (vision)       │───→│ (fallback)      │   │
│   │ $0.6/$2.5       │    │ $0.6/$2.5       │    │ $0.6/$3.0       │    │ $3.0/$15.0      │   │
│   │ API: kimi-k2-0905-preview      │    │ API: kimi-k2-thinking          │    │ API: kimi-k2.5                 │    │ API: claude-sonnet-4-6       │   
   └─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘   │
│                                                                               │
│   Routing Logic:                                                              │
│   - 첨부파일 있음 → kimi-k2.5                                                 │
│   - 멀티툴 필요 → kimi-k2-thinking                                            │
│   - 긴 문맥/프리미엄 → claude-sonnet-4-6                                      │
│   - 기본 → kimi-k2-0905                                                       
   > 명명 규칙: 문서 내 축약형(kimi-k2-0905), API 호출 시 공식 명칭(kimi-k2-0905-preview) 사용│
└──────────────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              TOOL GATEWAY                                     │
│                                                                               │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│   │internal_search│ │  crm_lookup  │ │ ticket_read  │ │  doc_fetch   │        │
│   │   (RAG)       │ │  (Salesforce)│ │  (Zendesk)   │ │  (Notion)    │        │
│   └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                                               │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                         │
│   │web_search    │ │   kb_search   │ │ permission_check                        │
│   │ ($0.005/call)│ │   (Internal) │ │ (Policy DB)                             │
│   └──────────────┘ └──────────────┘ └──────────────┘                         │
│                                                                               │
│   Write Tools (Backend Only):                                                 │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                         │
│   │ticket_close  │ │refund_process│ │customer_modify                           │
│   └──────────────┘ └──────────────┘ └──────────────┘                         │
└──────────────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           VALIDATOR LAYER                                     │
│                                                                               │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│   │ JSON Schema  │  │ Business     │  │ Permission   │  │ Freshness    │    │
│   │ Validator    │  │ Rules Engine │  │ Checker      │  │ Checker      │    │
│   │              │  │              │  │              │  │              │    │
│   │ - Required   │  │ - Date fmt   │  │ - Owner      │  │ - Data age   │    │
│   │   fields     │  │ - Currency   │  │ - Admin      │  │ - Cache ttl  │    │
│   │ - Type check │  │ - Phone fmt  │  │ - Role       │  │ - Staleness  │    │
│   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         RESPONSE COMPOSER                                     │
│   - Facts/Answer 분리                                                         │
│   - Source attribution                                                          │
│   - Uncertainty 표시                                                          │
└──────────────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                       │
│                                                                               │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐            │
│   │   PostgreSQL     │  │     Redis        │  │   Object Store   │            │
│   │   (Main DB)      │  │   (Cache/Queue)  │  │   (Files/Logs)   │            │
│   │                  │  │                  │  │                  │            │
│   │ - Users          │  │ - Sessions       │  │ - Uploads        │            │
│   │ - Sessions       │  │ - Rate limits    │  │ - Extract results│            │
│   │ - Audit logs     │  │ - Tool results   │  │ - Snapshots      │            │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘            │
│                                                                               │
│   ┌──────────────────┐  ┌──────────────────┐                                   │
│   │  Elasticsearch   │  │   Vector DB      │                                   │
│   │   (Search Index) │  │   (Embeddings)   │                                   │
│   └──────────────────┘  └──────────────────┘                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 시스템 컴포넌트

### 2.1 API Gateway

```python
# FastAPI 기반 구조 예시
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LIDER API", version="1.0.0")

# 미들웨어 체인
app.add_middleware(CORSMiddleware, ...)
app.add_middleware(RateLimitMiddleware, ...)
app.add_middleware(PIIRedactionMiddleware, ...)

# 라우터 등록
app.include_router(assist_router, prefix="/v1")
app.include_router(extract_router, prefix="/v1")
app.include_router(action_router, prefix="/v1")
```

### 2.2 Model Router

```python
class ModelRouter:
    """
    태스크 특성에 따라 최적의 모델을 선택하는 라우터
    """
    
    def __init__(self):
        self.providers = {
            "kimi-k2-0905-preview": KimiProvider(),
            "kimi-k2-thinking": KimiProvider(),
            "kimi-k2.5": KimiProvider(),
            "claude-sonnet-4-6": ClaudeProvider()
        }
    
    async def route(self, task: Task) -> ModelResponse:
        # 1차 모델 선택
        primary = self._select_primary(task)
        
        try:
            response = await self.providers[primary].call(task)
            
            # 성공 검증
            if self._validate_response(response):
                return response
                
        except (TimeoutError, ValidationError) as e:
            logger.warning(f"Primary model {primary} failed: {e}")
        
        # Fallback
        fallback = self._select_fallback(task)
        if fallback:
            response = await self.providers[fallback].call(task)
            response.meta.fallback_used = True
            return response
            
        raise ModelUnavailableError()
    
    # 모델 명명 규칙: 축약형(내부) → 공식 명칭(API)
    MODEL_NAME_MAP = {
        "kimi-k2-0905": "kimi-k2-0905-preview",
        "kimi-k2-thinking": "kimi-k2-thinking",
        "kimi-k2.5": "kimi-k2.5",
        "claude-sonnet-4-6": "claude-sonnet-4-6"
    }
    
    def _select_primary(self, task: Task) -> str:
        """축약형 모델명 반환 (API 호출 시 _to_api_name() 변환 필요)"""
        if task.kind == "extract" and task.has_attachment:
            return "kimi-k2.5"
        if task.needs_multi_tool:
            return "kimi-k2-thinking"
        if task.customer_facing and task.context_tokens > 180_000:
            return "claude-sonnet-4-6"
        return "kimi-k2-0905"
    
    def _to_api_name(self, short_name: str) -> str:
        """축약형 → 공식 API 명칭 변환"""
        return self.MODEL_NAME_MAP.get(short_name, short_name)
```

### 2.3 Tool Gateway

```python
class ToolGateway:
    """
    툴 접근 제어 및 실행 게이트웨이
    """
    
    TOOL_REGISTRY = {
        # Read tools (AI가 호출 가능)
        "internal_search": InternalSearchTool(),
        "crm_lookup": CRMLookupTool(),
        "ticket_read": TicketReadTool(),
        "doc_fetch": DocFetchTool(),
        "kb_search": KBSearchTool(),
        "permission_check": PermissionCheckTool(),
        
        # Write tools (Backend only)
        "ticket_close": TicketCloseTool(backend_only=True),
        "refund_process": RefundProcessTool(backend_only=True),
    }
    
    async def execute(self, tool_name: str, args: dict, context: Context) -> ToolResult:
        tool = self.TOOL_REGISTRY.get(tool_name)
        
        if not tool:
            raise UnknownToolError(tool_name)
        
        # 권한 체크
        if tool.backend_only and context.source == "llm":
            raise PermissionError(f"Tool {tool_name} is backend-only")
        
        # 실행
        start_time = time.time()
        try:
            result = await tool.execute(args, context)
            result.latency_ms = (time.time() - start_time) * 1000
            return result
        except Exception as e:
            logger.error(f"Tool {tool_name} failed: {e}")
            raise ToolExecutionError(tool_name, str(e))
```

### 2.4 Validator Layer

```python
class ValidatorPipeline:
    """
    다단계 검증 파이프라인
    """
    
    def __init__(self):
        self.validators = [
            JSONSchemaValidator(),
            BusinessRuleValidator(),
            PermissionValidator(),
            FreshnessValidator()
        ]
    
    async def validate(self, payload: dict, context: ValidationContext) -> ValidationResult:
        all_warnings = []
        
        for validator in self.validators:
            result = await validator.validate(payload, context)
            if not result.passed:
                return ValidationResult(passed=False, errors=result.errors)
            all_warnings.extend(result.warnings)
        
        return ValidationResult(
            passed=True, 
            warnings=all_warnings,
            needs_review=len(all_warnings) > 0
        )
```

---

## 3. 데이터 흐름

### 3.1 Assist 흐름

```
[User Input]
    │
    ▼
[PII Redaction] ──→ 민감 정보 마스킹
    │
    ▼
[Intent Classification] ──→ k2-0905
    │
    ▼
[Tool Planning] ──→ k2-thinking (if multi-tool needed)
    │
    ├──→ [internal_search] ──→ Elasticsearch
    ├──→ [crm_lookup] ──→ Salesforce API
    └──→ [ticket_read] ──→ Zendesk API
    │
    ▼
[Result Aggregation]
    │
    ▼
[Answer Composition] ──→ k2-0905 or sonnet
    │
    ▼
[Validation] ──→ Schema + Rules
    │
    ▼
[Response] ──→ facts[], answer, citations[], meta{}
```

### 3.2 Extract 흐름

```
[File Upload]
    │
    ▼
[File Validation] ──→ 타입, 크기, 바이러스 검사
    │
    ▼
[Vision Parsing] ──→ k2.5
    │
    ▼
[JSON Extraction]
    │
    ├──→ fields{}
    ├──→ doc_type
    └──→ warnings[]
    │
    ▼
[Validator] ──→ 날짜/금액/전화번호 형식 검사
    │
    ▼
[Needs Review?] ──→ Yes → Human Review Queue
    │ No
    ▼
[Finalizer] ──→ k2-0905
    │
    ▼
[Response]
```

### 3.3 Action Preview 흐름

```
[Action Request]
    │
    ▼
[Intent Parsing] ──→ k2-0905
    │
    ▼
[Permission Check] ──→ Policy DB
    │
    ▼
[Impact Analysis]
    │
    ├──→ 관련 데이터 조회
    ├──→ 정책 위반 검사
    └──→ 롤백 가능성 평가
    │
    ▼
[Preview Generation] ──→ k2-0905
    │
    ▼
[allowed: false] ──→ missing_checks[], impact_summary
    │
    ▼
[Human Confirmation Required]
    │
    ▼
[User Confirm] ──→ /v1/actions/execute (Backend Service)
```

---

## 4. 모델 라우팅 상세

### 4.1 Decision Tree

```
                    [Task Start]
                         │
            ┌────────────┴────────────┐
            │                         │
    [has_attachment?]           [action_preview?]
            │                         │
      ┌─────┴─────┐                   │
      │ Yes      No│                  ▼
      │            │           [k2-0905-preview]
      ▼            │           (preview only)
  [k2.5]           │
  (extract)        │
      │            │
      ▼            │
  [validator]      │
      │            │
      ▼            ▼
  [needs_multi_tool?]
      │
  ┌───┴───┐
  │ Yes  No│
  │       │
  ▼       ▼
[k2-    [customer_facing?]
thinking]      │
  │       ┌────┴────┐
  │       │ Yes    No│
  │       │         │
  │   ┌───┴───┐     │
  │   │long   │short│
  │   │context│     │
  │   ▼       ▼     ▼
  │ [sonnet] [k2-0905]
  │   │       │
  │   │       │
  └───┴───────┘
         │
         ▼
    [Fallback?]
         │
         ▼
    [Response]
```

### 4.2 Cost Optimization Matrix

| Scenario | Primary | Fallback | Avg Cost/req | Strategy |
|----------|---------|----------|--------------|----------|
| Simple FAQ | k2-0905 | None | $0.001 | 캐싱 우선 |
| Multi-tool search | k2-thinking | k2-0905 | $0.005 | planner/finalizer 분리 |
| Document extract | k2.5 | k2-0905 | $0.008 | vision → text pipeline |
| Premium final answer | k2-0905 | sonnet | $0.015 | quality threshold 기반 fallback |
| Emergency fallback | sonnet | None | $0.05 | critical cases only |

### 4.3 Latency Budget

| 단계 | 목표 Latency | 최대 Latency |
|------|-------------|--------------|
| PII Redaction | < 50ms | 100ms |
| Routing Decision | < 10ms | 50ms |
| Model Call (k2-0905) | < 2000ms | 5000ms |
| Model Call (k2-thinking) | < 5000ms | 10000ms |
| Tool Execution (each) | < 1000ms | 3000ms |
| Validation | < 100ms | 500ms |
| **Total Budget** | **< 8000ms** | **< 15000ms** |

---

## 5. 보안 및 권한

### 5.1 보안 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                         │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Transport                                            │
│  - TLS 1.3 only                                               │
│  - Certificate pinning (mobile)                              │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2: Authentication                                       │
│  - JWT with short expiry (15 min)                             │
│  - Refresh token rotation                                     │
│  - SSO (SAML/OIDC) for Enterprise                             │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3: Authorization                                        │
│  - RBAC (Role-Based Access Control)                           │
│  - ABAC (Attribute-Based) for fine-grained                    │
│  - Tool-level permissions                                     │
├─────────────────────────────────────────────────────────────────┤
│  Layer 4: Data Protection                                      │
│  - PII redaction pre-processing                               │
│  - Field-level encryption                                     │
│  - Zero-retention option for sensitive data                   │
├─────────────────────────────────────────────────────────────────┤
│  Layer 5: Audit                                                │
│  - Immutable logs (append-only)                               │
│  - Request/response hashing                                   │
│  - Anomaly detection                                          │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 권한 모델

```python
class PermissionChecker:
    """
    LIDER 권한 체크 시스템
    """
    
    PERMISSION_MATRIX = {
        "ticket_read": ["agent", "manager", "admin"],
        "ticket_close": ["owner", "admin"],
        "ticket_delete": ["admin"],
        "crm_modify": ["manager", "admin"],
        "refund_approve": ["finance", "admin"],
        "export_data": ["manager", "admin"],
    }
    
    async def check(
        self, 
        user: User, 
        action: str, 
        resource: Resource,
        context: dict = None
    ) -> PermissionResult:
        """
        권한 체크 로직
        """
        # 1. Role-based check
        required_roles = self.PERMISSION_MATRIX.get(action, [])
        if user.role not in required_roles:
            return PermissionResult(allowed=False, reason="Insufficient role")
        
        # 2. Ownership check (if applicable)
        if action in ["ticket_close", "ticket_modify"]:
            if resource.owner_id != user.id and user.role != "admin":
                return PermissionResult(
                    allowed=False, 
                    reason="Not owner or admin",
                    missing_checks=["permission.owner_or_admin"]
                )
        
        # 3. Policy check
        policy_violations = await self._check_policies(action, resource, context)
        if policy_violations:
            return PermissionResult(
                allowed=False,
                reason="Policy violations detected",
                missing_checks=policy_violations
            )
        
        return PermissionResult(allowed=True)
```

### 5.3 데이터 마스킹

```python
class PIIRedactor:
    """
    PII 데이터 마스킹 처리
    """
    
    PATTERNS = {
        "phone": r"(\d{3})[-.]?(\d{4})[-.]?(\d{4})",
        "email": r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
        "ssn": r"\d{6}[-.]?\d{7}",
        "credit_card": r"\d{4}[-.]?\d{4}[-.]?\d{4}[-.]?\d{4}",
    }
    
    def redact(self, text: str, preserve_for_roles: list = None) -> str:
        """
        PII 마스킹 적용
        """
        result = text
        for pii_type, pattern in self.PATTERNS.items():
            result = re.sub(pattern, f"[{pii_type}_REDACTED]", result)
        return result
```

---

## 6. 배포 아키텍처

### 6.1 컨테이너 구성

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: ./apps/api
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://...
      - MOONSHOT_API_KEY=${MOONSHOT_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    depends_on:
      - postgres
      - redis
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 2G

  worker:
    build: ./apps/api
    command: celery worker
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://...
    depends_on:
      - redis
      - postgres

  postgres:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=lider

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./deploy:/usr/share/nginx/html/static
```

### 6.2 환경 구성

| 환경 | 특징 | 배포 전략 |
|------|------|----------|
| **Development** | Local Docker | Hot reload, mock providers |
| **Staging** | Cloud (k8s) | 실제 API 연동, 테스트 데이터 |
| **Production** | Multi-region | Blue/green, 자동 롤백 |

### 6.3 확장 전략

```
Horizontal Scaling:
- API 서버: 3 → 10+ replicas (CPU 기반 오토스케일)
- Worker: 2 → 20+ replicas (Queue depth 기반)
- Redis: Cluster mode
- PostgreSQL: Read replicas

Vertical Scaling:
- Model calls: 라우팅 최적화로 비용 대비 효율
- Caching: Tool 결과 캐싱으로 API 호출 감소
```

### 6.4 배포 아키텝처 및 CI/CD

```
├─── CI/CD Pipeline (GitHub Actions/GitLab CI)────────────────────┐
│                                                     │
│  [Push/PR] ─── [Lint/Type Check] ─── [Unit Test]   │
│                             │                        │
│                             ▼                        │
│                     [Integration Test]                 │
│                             │                        │
│                             ▼                        │
│                     [Security Scan]                  │
│                             │                        │
│                             ▼                        │
│  [Merge] ──────────────── [Build Image] ─────────────┬──┤
│                                                      │ │
│                             ┐                        │ │
│  [Staging Deploy] ───────┼──────────────────┴───────┤
│                             │                         │
│                             ▼                         │
│                     [E2E Test/Golden Set]              │
│                             │                         │
│                             ▼                         │
│  [Manual Gate] ─────────── [Production Deploy] ───────┴
│                                                      │
└───────────────────────────────────────────────────────────────────────┘
```

| 스테이지 | 지속 시간 | 자동 화이트 기준 |
|--------|----------|------------------|
| Build | 3-5분 | - |
| Unit Test | 2-3분 | 80% 코드 커버리 믹니머 |
| Integration | 5-8분 | Golden set 100% 통과 |
| E2E | 10-15분 | Critical path 실패 시 블락 |

---

## 7. 데이터베이스 스키마 및 캐싱 전략

### 7.1 PostgreSQL 스키마 정의

```sql
-- 핵심 테이블: 사용자 세션
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) NOT NULL,
    org_id VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    context_tokens INTEGER DEFAULT 0,
    metadata JSONB,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'terminated'))
);

CREATE INDEX idx_sessions_user ON sessions(user_id, created_at DESC);
CREATE INDEX idx_sessions_expires ON sessions(expires_at) WHERE status = 'active';

-- 핵심 테이블: 요청/응답 로그
CREATE TABLE request_logs (
    request_id VARCHAR(64) PRIMARY KEY,
    session_id UUID REFERENCES sessions(id),
    user_id VARCHAR(64) NOT NULL,
    endpoint VARCHAR(64) NOT NULL,
    model_used VARCHAR(64),
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    latency_ms INTEGER,
    fallback_used BOOLEAN DEFAULT FALSE,
    schema_valid BOOLEAN,
    tool_count INTEGER DEFAULT 0,
    estimated_cost_usd DECIMAL(10,6),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    trace_id VARCHAR(64)
);

CREATE INDEX idx_logs_user_time ON request_logs(user_id, created_at DESC);
CREATE INDEX idx_logs_session ON request_logs(session_id);
CREATE INDEX idx_logs_trace ON request_logs(trace_id);

-- 핵심 테이블: 추출 결과
CREATE TABLE extractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(64) REFERENCES request_logs(request_id),
    file_id VARCHAR(128) NOT NULL,
    doc_type VARCHAR(32) CHECK (doc_type IN ('poster', 'invoice', 'form', 'screen', 'generic')),
    fields JSONB NOT NULL,
    confidence_scores JSONB,
    warnings JSONB,
    needs_review BOOLEAN DEFAULT FALSE,
    review_status VARCHAR(20) CHECK (review_status IN ('pending', 'approved', 'rejected', 'not_needed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_extractions_review ON extractions(needs_review, created_at) WHERE needs_review = TRUE;

-- 핵심 테이블: 액션 프리뷰/실행
CREATE TABLE action_previews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(64) REFERENCES request_logs(request_id),
    action_type VARCHAR(64) NOT NULL,
    target_type VARCHAR(32),
    target_id VARCHAR(128),
    payload JSONB,
    allowed BOOLEAN,
    missing_checks JSONB,
    impact_summary JSONB,
    human_confirmation_required BOOLEAN,
    preview_token VARCHAR(256) UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_previews_token ON action_previews(preview_token) WHERE preview_token IS NOT NULL;

CREATE TABLE action_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    preview_id UUID REFERENCES action_previews(id),
    executed_by VARCHAR(64) NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmation_method VARCHAR(32),
    result JSONB,
    audit_trail JSONB
);

-- Badcase 큐 (품질 개선을 위한 실패 사례 저장)
CREATE TABLE badcases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(64) REFERENCES request_logs(request_id),
    category VARCHAR(64) NOT NULL,  -- 'json_invalid', 'hallucination', 'wrong_tool', 'extraction_fail'
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT,
    input_snapshot JSONB,
    expected_output JSONB,
    actual_output JSONB,
    root_cause_analysis TEXT,
    fix_status VARCHAR(20) DEFAULT 'open' CHECK (fix_status IN ('open', 'in_progress', 'fixed', 'wont_fix')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_badcases_category ON badcases(category, severity) WHERE fix_status = 'open';
CREATE INDEX idx_badcases_status ON badcases(fix_status, created_at);

-- 사용자 및 조직
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    org_id VARCHAR(64) NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL,
    role VARCHAR(32) CHECK (role IN ('agent', 'manager', 'admin', 'super_admin')),
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_org ON users(org_id, role);
```

### 7.2 Redis 캐싱 전략

```python
# 캐싱 키 네임스패이 전략
CACHE_KEYS = {
    # 세션 캐시 (TTL: 2시간)
    "session": "session:{session_id}",
    
    # 사용자 권한 캐시 (TTL: 15분)
    "user_permissions": "perms:{user_id}",
    
    # 툴 결과 캐시 (TTL: 5분 - 최신성 데이터 요구)
    "tool_result": "tool:{tool_name}:{hash(args)}",
    
    # 모델 응답 캐시 (TTL: 1시간 - 동일 요청 충봉 방지)
    "model_response": "llm:{model}:{hash(prompt)}",
    
    # Rate limit 카운터 (TTL: 1분)
    "rate_limit": "ratelimit:{user_id}:{endpoint}",
    
    # 옵션 캐시 (구성 변경 시 무효화 필요)
    "org_settings": "settings:{org_id}"
}

# 캐싱 절약 정책
CACHE_POLICIES = {
    "session": {"ttl": 7200, "invalidate_on": ["logout", "password_change"]},
    "user_permissions": {"ttl": 900, "invalidate_on": ["role_change"]},
    "tool_result": {"ttl": 300, "invalidate_on": ["data_update"]},
    "model_response": {"ttl": 3600, "invalidate_on": ["model_version_change"]},
    "org_settings": {"ttl": 1800, "invalidate_on": ["admin_update"]},
}
```

| 캐시 유형 | TTL | 저장 공간 | 무효화 조건 | 비고를 조전 |
|----------|-----|----------|-------------|--------------|
| 세션 | 2h | 10MB/1K 세션 | 로그아웃, 비밀번호 변경 | 사용자 요청 시 |
| 권한 | 15m | 5MB/10K 사용자 | 역할 변경 | Redis Pub/Sub |
| 툴 결과 | 5m | 50MB | 소스 데이터 변경 | 키 패턴 매칭 |
| 모델 응답 | 1h | 100MB | 모델 버전 변경 | 해싱 기반 들어쓴 |
| Rate Limit | 1m | 1MB | 매분 초기화 | 자동 만뢨 |

---

## 8. 백업 및 재해 복구 전략

### 8.1 데이터 백업 계획

| 대상 | 빈도 | 유형 | 보관 주기 | RPO | RTO |
|------|------|------|----------|-----|-----|
| PostgreSQL | 증분 | 실시간 | 7일 | 5분 | 30분 |
| Redis | 증분 | RDB + AOF | 1일 | 5분 | 15분 |
| Object Store | 증분 | 지역 복제 | 1일 | 0 | 1시간 |
| AI Provider 설정 | 정적 | 콘피그 | 30일 | - | 5분 |

### 8.2 재해 복구 시나리오

```
[Disaster Detected]
       │
       ▼
[Assessment] ──────────────────────────────┤
       │                                    │
       ▼                                    ▼
[Severity: Critical]              [Severity: Major]
       │                                    │
       ▼                                    ▼
[Failover Triggered]            [Degraded Mode]
       │                                    │
       ▼                                    ▼
[Standby Region Active]         [Circuit Breaker Open]
       │                                    │
       ▼                                    ▼
[DNS Switch]                    [Queue Buffering]
       │                                    │
       ▼                                    ▼
[Validation]                    [Partial Recovery]
       │                                    │
       └──────────────────────────────┴──────────────────┸
                                   │
                                   ▼
                          [Post-Incident Review]
```

### 8.3 비사 조치 체크리스트

- [ ] 연립 시스템 상태 확인 (PagerDuty/Opsgenie)
- [ ] 전용 커뮤니케이션 채널 통보 (#incident-response)
- [ ] 사용자 응대 공지 준비 (Status Page 업데이트)
- [ ] 백업 정상 여부 확인 (마지막 성공 백업 시점)
- [ ] Failover 실행 또는 서비스 부하 조치
- [ ] 전원 복귀 시 데이터 정합성 검증

---

## 9. 모니터링 및 관찰성

### 7.1 메트릭 수집

```python
class MetricsCollector:
    """
    LIDER 메트릭 수집
    """
    
    def record_request(self, request: Request, response: Response):
        metrics = {
            # 기본 메트릭
            "request_id": request.id,
            "endpoint": request.endpoint,
            "latency_ms": response.latency_ms,
            
            # 모델 메트릭
            "model_id": response.meta.model_used,
            "prompt_tokens": response.usage.prompt_tokens,
            "completion_tokens": response.usage.completion_tokens,
            "fallback_used": response.meta.fallback_used,
            
            # 품질 메트릭
            "tool_count": len(response.tool_calls),
            "schema_valid": response.validation.passed,
            
            # 비용
            "estimated_cost": self._calculate_cost(response)
        }
        
        self._send_to_prometheus(metrics)
```

### 7.2 대시보드 구성

| 대시보드 | 목적 | 주요 지표 |
|----------|------|----------|
| **API Health** | 시스템 상태 | latency, error rate, throughput |
| **Model Performance** | 모델 품질 | fallback rate, JSON valid rate, tool accuracy |
| **Cost Tracking** | 비용 관리 | cost per request, daily spend, by model |
| **Business** | 비즈니스 | MAU, feature usage, conversion |

### 7.3 알람 설정

```yaml
alerts:
  - name: high_fallback_rate
    condition: fallback_rate > 0.3
    severity: warning
    channel: slack-engineering
    
  - name: high_latency
    condition: p99_latency > 10000ms
    severity: critical
    channel: pagerduty
    
  - name: json_validation_failure
    condition: json_valid_rate < 0.95
    severity: critical
    channel: pagerduty
    
  - name: daily_cost_spike
    condition: daily_cost > 1.5 * avg_daily_cost
    severity: warning
    channel: slack-finance
```

### 7.4 로그 구조

```json
{
  "timestamp": "2026-03-24T10:30:00Z",
  "level": "INFO",
  "request_id": "req_abc123",
  "user_id": "usr_42",
  "trace_id": "trace_xyz789",
  "service": "api",
  "event": "assist_completed",
  "duration_ms": 2450,
  "model_used": "kimi-k2-thinking",
  "fallback_used": false,
  "tools_called": ["internal_search", "crm_lookup"],
  "tokens": {
    "prompt": 1250,
    "completion": 450
  },
  "validation": {
    "passed": true,
    "warnings": 0
  }
}
```

---

## 부록: Infrastructure as Code 예시

### Terraform 예시 (AWS)

```hcl
# EKS Cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "lider-production"
  cluster_version = "1.28"

  cluster_addons = {
    coredns    = { most_recent = true }
    kube-proxy = { most_recent = true }
    vpc-cni    = { most_recent = true }
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    api = {
      name = "api-node-group"
      
      instance_types = ["m6i.xlarge"]
      
      min_size     = 3
      max_size     = 10
      desired_size = 3

      labels = {
        workload = "api"
      }
    }
  }
}
```

---

**문서 버전:** v2.0  
**최종 업데이트:** 2026-03-24  
**다음 검토:** 2026-04-07  
**검수 상태:** 3회 교차검수 완료 (LIDER_DEVELOPMENT_PLAN.md v2.0 기준)
