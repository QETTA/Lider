# LIDER AI 업무 오케스트레이션 플랫폼 - 개발 계획서 v2.0

> 작성일: 2026-03-24  
> 버전: v2.0 (3회 교차검수 완료)  
> 상태: 개발 착수 준비 완료  
> 검수 이력: 1차(명명규칙) → 2차(기술스펙) → 3차(리스크/배포) ✓

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [핵심 기술 아키텍처](#2-핵심-기술-아키텍처)
3. [API 명세](#3-api-명세)
4. [모델 라우팅 전략](#4-모델-라우팅-전략)
5. [개발 로드맵 (6개월)](#5-개발-로드맵-6개월)
6. [품질 관리 및 평가 체계](#6-품질-관리-및-평가-체계)
7. [팀 구성 권장사항](#7-팀-구성-권장사항)
8. [리스크 관리](#8-리스크-관리)
9. [부록: 프롬프트 팩](#9-부록-프롬프트-팩)

---

## 1. 프로젝트 개요

### 1.1 제품 정의

**LIDER는 문서·검색·업무 액션을 하나의 흐름으로 연결하는 AI 업무 오케스트레이션 SaaS**다.

사용자는 단순히 질문하는 것이 아니라, 파일을 올리고, 내부 데이터를 찾고, 액션 실행 전 영향을 검토하고, 최종 의사결정까지 이어지는 업무 흐름을 한 화면에서 처리한다.

### 1.2 핵심 가치 제안

| 구분 | 설명 |
|------|------|
| **통합 탐색** | 한 질문으로 여러 소스에서 근거를 모으고, 결과를 사람 언어로 정리 |
| **문서 이해 자동화** | 이미지/PDF/캡처를 구조화 JSON으로 변환해 실제 업무 데이터로 사용 |
| **실행 전 AI Preview** | 실행 버튼을 바로 누르게 하지 않고, 영향·권한·누락 체크를 먼저 보여줌 |
| **안전한 AI 도입 구조** | 모델은 설명과 오케스트레이션을 맡고, 진실의 원천은 DB/검색/정책엔진이 맡는 구조 |

### 1.3 4대 핵심 모듈

```
┌─────────────────────────────────────────────────────────────┐
│                        LIDER PLATFORM                        │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│   ASSIST    │   EXTRACT   │ACTION PREVIEW│   EVAL & OPS      │
│  통합 검색   │  문서 추출   │  실행 전 검토 │  품질 관리 및 운영  │
├─────────────┼─────────────┼─────────────┼───────────────────┤
│ • 자연어 질의│ • 이미지/PDF │ • 종료/승인   │ • 비용 추적        │
│ • 내부 검색 │ • 필드 추출  │ • 변경/전송   │ • fallback 관리   │
│ • 근거 기반  │ • 구조화 JSON│ • 권한 체크   │ • bad case 리플레이│
│   답변 생성 │ • 검수 큐   │ • 영향 안내   │ • 품질 개선 루프   │
└─────────────┴─────────────┴─────────────┴───────────────────┘
```

### 1.4 타겟 고객

**1차 타깃**
- 고객지원 조직 (CS/Support)
- 운영/CS 팀
- 세일즈 오퍼레이션
- 문서 처리 비중이 높은 중소·중견 SaaS 팀
- 내부 툴이 많지만 통합 UX가 약한 스타트업

**이상적 ICP (Ideal Customer Profile)**
- 20~300명 규모
- 여러 SaaS를 이미 쓰고 있음
- 고객 대응 속도와 정확도가 매출/이탈에 직접 영향
- 내부 문서와 운영 데이터가 많은 팀

---

## 2. 핵심 기술 아키텍처

### 2.1 시스템 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Overview   │  │Search Assist│  │Doc Extract  │  │   Action Preview    │  │
│  │  Dashboard  │  │   통합 검색  │  │  문서 추출   │  │    실행 전 검토      │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY + AUTH                                 │
│                    (Auth / Permission / PII Redaction)                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MODEL ROUTER                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌─────────────┐ │
│  │kimik2-0905     │  │kimik2-thinking │  │kimik2.5        │  │claude-sonnet│ │
│  │(기본 텍스트)    │  │(툴 오케스트레이션)│  │(멀티모달)       │  │(fallback)   │ │
│  └────────────────┘  └────────────────┘  └────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            TOOL GATEWAY                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │internal_search│ │  crm_lookup  │ │ ticket_read  │ │  doc_fetch   │          │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                         │
│  │web_search    │ │   kb_search   │ │ permission_check                          │
│  └──────────────┘ └──────────────┘ └──────────────┘                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DETERMINISTIC VALIDATOR                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ JSON Schema  │  │Business Rules│  │Permission Chk│  │ Freshness Check  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RESPONSE COMPOSER                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LOGGING / EVAL / REPLAY / BADCASE QUEUE                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 레포지토리 구조

```
/lider-platform
├── /apps
│   └── /api
│       ├── /routes
│       │   ├── assist.py              # /v1/assist API
│       │   ├── extract.py             # /v1/extract API
│       │   └── action_preview.py      # /v1/actions/preview API
│       ├── /schemas
│       │   ├── assist_response_v1.json
│       │   ├── extract_response_v1.json
│       │   └── action_preview_v1.json
│       ├── /services
│       │   ├── router.py              # 모델 라우팅 로직
│       │   ├── provider_kimi.py       # Moonshot Kimi 어댑터
│       │   ├── provider_claude.py     # Anthropic Claude 어댑터
│       │   ├── tool_gateway.py        # 툴 게이트웨이
│       │   ├── validator.py           # 출력 검증기
│       │   └── evaluator.py           # 품질 평가
│       ├── /prompts
│       │   ├── planner.txt            # 툴 계획 프롬프트
│       │   ├── extractor.txt          # 문서 추출 프롬프트
│       │   ├── finalizer.txt          # 최종 답변 프롬프트
│       │   └── action_preview.txt     # 액션 프리뷰 프롬프트
│       └── /tests
│           └── /golden
│               ├── /assist
│               ├── /extract
│               └── /action_preview
├── /deploy
│   ├── index.html                     # 정적 배포본
│   ├── styles.css
│   ├── app.js
│   └── favicon.svg
├── /docs
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   └── MODEL_ROUTING.md
└── docker-compose.yml
```

### 2.3 핵심 설계 원칙

| 원칙 | 설명 |
|------|------|
| **"모델은 설명기, DB/규칙이 진실의 원천"** | 최신 상태값, 권한, 가격, 재고, 승인 상태는 모델 기억에 맡기지 않음 |
| **"JSON Object Envelope"** | 모든 출력은 top-level object로 통일 (array 금지) |
| **"Planner/Finalizer 분리"** | 툴 선정은 K2 Thinking, 답변 정리는 K2-0905 |
| **"Vision/Search 분리"** | K2.5 thinking + built-in web search는 같이 쓰지 않음 |
| **"Write Action 분리"** | LLM은 preview만, 실행은 backend service |

---

## 3. API 명세

### 3.1 공통 응답 Envelope

```json
{
  "task_type": "assist|extract|plan|act_preview",
  "route": {
    "primary_model": "kimi-k2-thinking",
    "fallback_model": "claude-sonnet-4-6",
    "reason": "multi_tool_and_recent"
  },
  "input": {
    "text": "질의 내용",
    "attachments": [],
    "locale": "ko-KR"
  },
  "tool_policy": {
    "allowed_tools": ["search", "crm_read", "ticket_read"],
    "write_tools_allowed": false
  },
  "output_contract": {
    "mode": "json",
    "schema_name": "assist_response_v1"
  },
  "safety": {
    "risk_tier": "medium",
    "pii_redacted": true
  }
}
```

### 3.2 `/v1/assist` - 통합 검색/대화

**Request:**
```json
{
  "session_id": "sess_123",
  "user_id": "usr_42",
  "locale": "ko-KR",
  "message": {
    "text": "지난주 상담 로그 요약해줘"
  },
  "attachments": [],
  "allowed_tools": ["search", "crm_read", "ticket_read"],
  "response_mode": "answer",
  "risk_tier": "medium",
  "debug": false
}
```

**Response:**
```json
{
  "request_id": "req_abc",
  "answer": {
    "text": "요약 결과입니다...",
    "format": "plain"
  },
  "facts": [
    {"key": "ticket_count", "value": 12, "source": "ticket_db"}
  ],
  "citations": [
    {"source_id": "ticket_db:2026-03-24:1"}
  ],
  "action_preview": null,
  "meta": {
    "fallback_used": false,
    "confidence": 0.87,
    "model_used": "kimi-k2-thinking",
    "latency_ms": 1250
  }
}
```

### 3.3 `/v1/extract` - 문서 추출

**Request:**
```json
{
  "session_id": "sess_123",
  "user_id": "usr_42",
  "attachments": [
    {
      "type": "image",
      "file_id": "file_001"
    }
  ],
  "extract_type": "form|invoice|poster|screen|generic",
  "output_schema": {
    "type": "object",
    "required": ["doc_type", "fields"],
    "properties": {
      "doc_type": {"type": "string"},
      "fields": {"type": "object"},
      "warnings": {"type": "array"}
    }
  }
}
```

**Response:**
```json
{
  "request_id": "req_xyz",
  "doc_type": "poster",
  "fields": {
    "title": "고객 세미나",
    "date": "2026-03-28",
    "location": "서울 강남"
  },
  "warnings": ["장소 문구 일부가 흐림"],
  "needs_review": true,
  "meta": {
    "model_used": "kimi-k2.5",
    "confidence": 0.91
  }
}
```

### 3.4 `/v1/actions/preview` - 실행 전 검토

**Request:**
```json
{
  "session_id": "sess_123",
  "user_id": "usr_42",
  "intent": "close_ticket",
  "payload": {
    "ticket_id": "T-1001",
    "reason": "중복 문의"
  }
}
```

**Response:**
```json
{
  "request_id": "req_pv1",
  "allowed": false,
  "reason": "owner 권한 확인 필요",
  "missing_checks": ["permission.owner_or_admin"],
  "impact_summary": "이 작업은 티켓 T-1001을 종료 상태로 변경합니다.",
  "human_readable_preview": "이 요청은 티켓을 종료하려고 하지만 현재 사용자 권한이 확인되지 않았습니다.",
  "human_confirmation_required": true,
  "recommended_next_step": "관리자 승인 요청"
}
```

**중요:** `/v1/actions/execute`는 별도의 backend service에서 처리 (LLM 미사용)

---

## 4. 모델 라우팅 전략

### 4.1 모델 역할 분리

| 모델 | 역할 | 특징 | 가격 (입력/출력) | 공식 명칭 |
|------|------|------|----------------|----------|
| `kimi-k2-0905` | 기본 텍스트 응답, JSON 태깅, 요약 | 256K 컨텍스트, 빠름 | $0.60 / $2.50 | `kimi-k2-0905-preview` |
| `kimi-k2-thinking` | 멀티툴 planner, 복합 추론 | thinking 모드, tool orchestration | $0.60 / $2.50 | `kimi-k2-thinking` |
| `kimi-k2.5` | 멀티모달 파서 (이미지/PDF) | 256K, vision native | $0.60 / $3.00 | `kimi-k2.5` |
| `claude-sonnet-4-6` | 고가치 fallback | 1M 컨텍스트, 한국어 품질 | $3.00 / $15.00 | `claude-sonnet-4-6` |

> **명명 규칙:** 문서 내에서는 축약형(`kimi-k2-0905`) 사용, API 호출 시 공식 명칭(`kimi-k2-0905-preview`) 사용

### 4.2 라우팅 규칙

```python
@dataclass
class Task:
    kind: str                 # assist | extract | action_preview
    has_attachment: bool
    needs_multi_tool: bool
    needs_recent_data: bool
    customer_facing: bool
    expected_context_tokens: int
    high_risk: bool

def route(task: Task) -> dict:
    """
    LIDER Model Router - 공식 라우팅 로직
    
    Returns:
        dict: {
            "primary": "kimi-k2-0905" | "kimi-k2-thinking" | "kimi-k2.5" | "claude-sonnet-4-6",
            "mode": "extract" | "planner" | "preview_only" | "final_answer" | "finalizer",
            "fallback": str | None,
            "api_model_name": str  # 실제 API 호출용 공식 명칭
        }
    """
    # 1. 문서 추출 (첨부파일 있음)
    if task.kind == "extract" and task.has_attachment:
        return {
            "primary": "kimi-k2.5",
            "api_model_name": "kimi-k2.5",
            "mode": "extract",
            "fallback": "claude-sonnet-4-6",
            "fallback_api_name": "claude-sonnet-4-6"
        }
    
    # 2. 액션 프리뷰 (단순 설명용)
    if task.kind == "action_preview":
        return {
            "primary": "kimi-k2-0905",
            "api_model_name": "kimi-k2-0905-preview",
            "mode": "preview_only",
            "fallback": None,
            "fallback_api_name": None
        }
    
    # 3. 멀티툴/최신성 필요
    if task.needs_multi_tool or task.needs_recent_data:
        return {
            "primary": "kimi-k2-thinking",
            "api_model_name": "kimi-k2-thinking",
            "mode": "planner",
            "fallback": "claude-sonnet-4-6",
            "fallback_api_name": "claude-sonnet-4-6"
        }
    
    # 4. 긴 문맥/프리미엄 최종안
    if task.customer_facing and task.expected_context_tokens > 180_000:
        return {
            "primary": "claude-sonnet-4-6",
            "api_model_name": "claude-sonnet-4-6",
            "mode": "final_answer",
            "fallback": None,
            "fallback_api_name": None
        }
    
    # 5. 기본 (짧은 텍스트/요약/JSON)
    return {
        "primary": "kimi-k2-0905",
        "api_model_name": "kimi-k2-0905-preview",
        "mode": "finalizer",
        "fallback": "claude-sonnet-4-6" if task.customer_facing else None,
        "fallback_api_name": "claude-sonnet-4-6" if task.customer_facing else None
    }
```

### 4.3 화면별 모델 배치

| 화면 | 1차 모델 | 후속 단계 | LLM에 맡길 일 | LLM에 맡기면 안 되는 일 |
|------|---------|----------|--------------|----------------------|
| 홈 대시보드 | `kimi-k2-0905` | 필요 시 Sonnet | KPI 설명, 변화 요약 | KPI 계산, 권한별 숫자 노출 |
| 통합 검색 | `kimi-k2-thinking` | `kimi-k2-0905` | 질의 재작성, 툴 계획 | 검색 결과 없는 답 추정 |
| 고객 상세 | `kimi-k2-0905` | 긴 문맥 시 Sonnet | 1페이지 브리프 | field 수정, 점수 계산 |
| 티켓 상세 | `kimi-k2-thinking` | 첨부 있으면 `kimi-k2.5` | 조사 플랜, 답변 초안 | 티켓 종료/승인 같은 write action |
| 문서 업로드 | `kimi-k2.5` | validator → `kimi-k2-0905` | 이미지/PDF에서 필드 추출 | 추출 실패값 지어내기 |
| 액션 모달 | `kimi-k2-0905` | backend executor | 영향 설명 | 실제 실행 판단 |

> **참고:** API 호출 시 `kimi-k2-0905-preview` 등 공식 명칭 사용

### 4.4 툴 네이밍 규칙

```
읽기 전용:    *_read, *_lookup, *_search
쓰기 전용:    *_execute
프리뷰:        *_preview

예시:
- internal_search
- crm_lookup
- ticket_read
- doc_fetch
- permission_check
- impact_estimator
```

---

## 5. 개발 로드맵 (6개월)

### 5.1 Phase 1: MVP 핵심 (0-2개월)

**Epic 1: AI Core Platform**

| 티켓 | 우선순위 | 설명 | 완료 조건 |
|------|---------|------|----------|
| LDR-AI-001 | P0 | AI Provider 공통 어댑터 | Moonshot/Anthropic 통일 인터페이스, latency/usage 수집 |
| LDR-AI-002 | P0 | 공통 Response Envelope + Schema Registry | `assist_response_v1`, `extract_response_v1` 등 스키마 등록 |
| LDR-AI-003 | P0 | 모델 라우터 구현 | 첨부파일/멀티툴/텍스트 자동 분기 |
| LDR-AI-004 | P0 | Retry/Repair/Fallback 정책 | JSON 깨짐, timeout, tool 실패 시 자동 복구 |

**Epic 2: Tool Gateway**

| 티켓 | 우선순위 | 설명 | 완료 조건 |
|------|---------|------|----------|
| LDR-AI-005 | P0 | Tool Registry + Permission Layer | `*_read`, `*_preview`, `*_execute` 네이밍 규칙, 화이트리스트 |
| LDR-AI-006 | P0 | Search/CRM/Ticket/Doc 어댑터 | `internal_search`, `crm_lookup`, `ticket_read`, `doc_fetch` |
| LDR-AI-007 | P0 | Write Action 분리 실행 | LLM은 preview만, `/execute`는 backend only |

**Epic 3: Document Extract MVP**

| 티켓 | 우선순위 | 설명 | 완료 조건 |
|------|---------|------|----------|
| LDR-AI-008 | P0 | `/v1/extract` API 구현 | `form/invoice/poster/screen/generic` 타입 지원 |
| LDR-AI-009 | P0 | Extraction Validator/Normalizer | 날짜/금액/전화번호 normalize, 누락 감지 |
| LDR-AI-010 | P1 | 문서 검수 큐 | 원본 미리보기, 수정 UI, gold dataset 저장 |

**Epic 4: Assist/Search MVP**

| 티켓 | 우선순위 | 설명 | 완료 조건 |
|------|---------|------|----------|
| LDR-AI-011 | P0 | `/v1/assist` API 구현 | text+attachment 혼합, session 기반 multi-turn |
| LDR-AI-012 | P0 | Search Planner | 질의 재작성, 툴 계획 생성, no-result 시 추정 답변 금지 |
| LDR-AI-013 | P0 | Final Answer Composer | facts/answer 분리, source 없는 문장 최소화 |

**Epic 5: Safe Action MVP**

| 티켓 | 우선순위 | 설명 | 완료 조건 |
|------|---------|------|----------|
| LDR-AI-014 | P0 | `/v1/actions/preview` API | `allowed`, `missing_checks`, `impact_summary` 필드 |
| LDR-AI-015 | P0 | Permission/Policy Adapter | owner/admin 권한 체크, irreversible action 식별 |

### 5.2 Phase 2: 고도화 (2-4개월)

| 영역 | 주요 작업 |
|------|----------|
| **커넥터 확장** | 고객/티켓/문서 소스 커넥터 추가 (Zendesk, Salesforce, Notion 등) |
| **운영 콘솔** | 품질 로그 대시보드, 비용 추적, fallback rate 모니터링 |
| **한국어 품질** | 응답 톤 개선, 브랜드 가이드 적용 |
| **Eval 대시보드** | Golden set 구축, 모델 버전별 회귀 테스트 |

### 5.3 Phase 3: 엔터프라이즈 (4-6개월)

| 영역 | 주요 작업 |
|------|----------|
| **도메인 특화 템플릿** | 업종별 extraction schema, 산업별 액션 프리뷰 템플릿 |
| **엔터프라이즈 보안** | SSO, 감사 로그, 데이터 마스킹, zero-retention 옵션 |
| **Private Deployment** | 온프레미스 배포 옵션, VPC 격리 |
| **제한적 모델 커스터마이즈** | Fireworks 기반 domain-specific fine-tuning 검토 |

### 5.4 MVP 출시 기준

```
✅ extract 성공률이 사람 기준으로 쓸 만할 것
✅ assist가 source 없는 단정 답변을 거의 안 할 것
✅ action은 execute와 preview가 완전히 분리될 것
✅ fallback 사유가 전부 로그에 남을 것
✅ json_valid_rate >= 98%
✅ grounded_answer_rate >= 95%
```

---

## 6. 품질 관리 및 평가 체계

### 6.0 테스트 커버리지 기준 및 전략

| 테스트 유형 | 대상 | 목표 커버리지 | 도구 | 실행 시점 |
|-------------|------|--------------|------|----------|
| **단위 테스트** | 핵심 비즈니스 로직, 유틸리티 | 80%+ | pytest | 매 커밋 |
| **통합 테스트** | API 엔드포인트, DB 연동 | 70%+ | pytest + TestClient | PR 생성 시 |
| **E2E 테스트** | Critical Path (Assist → Extract → Action) | 100% 흐름 커버 | Playwright | Staging 배포 후 |
| **Golden Set** | AI 응답 품질 회귀 테스트 | 95%+ 통과율 | 커스텀 평가기 | Pre-release |
| **성능 테스트** | Latency, Throughput, Fallback 체인 | SLI 기준 | k6/locust | 주간 |
| **보안 테스트** | 인증, 권한, PII 처리 | 100% Path | OWASP ZAP | 월간 |

**테스트 피라미드 구조:**
```
        /\
       /  \     E2E (10%) - Critical 사용자 시나리오
      /____\
     /      \   통합 (30%) - API 계약 검증
    /________\
   /          \ 단위 (60%) - 함수/클래스 단위
  /____________\
```

**필수 테스트 시나리오:**
1. `test_assist_multi_tool_flow` - 멀티툴 호출 → 결과 조합 → 응답 생성
2. `test_extract_document_types` - 5가지 doc_type별 추출 검증
3. `test_action_preview_permission_denied` - 권한 거부 시 적절한 거절 응답
4. `test_model_fallback_chain` - 1차 실패 → 2차 시도 → 성공/최종 실패
5. `test_json_schema_validation_failure` - 스키마 위반 시 재시도 로직
6. `test_rate_limit_enforcement` - 과도한 요청 시 제한 적용
7. `test_session_expiration` - 만료된 세션 접근 시 거부
8. `test_pii_redaction` - 민감 정보 마스킹 검증

### 6.1 핵심 KPI

**제품 KPI**

| 지표 | 의미 | 목표 |
|------|------|------|
| `json_valid_rate` | 파싱 가능한 object 비율 | 98%+ |
| `extract_field_f1` | 추출 정답률 | use-case별 기준 |
| `wrong_tool_rate` | 틀린 툴 선택 비율 | 3% 이하 |
| `grounded_answer_rate` | 소스 기반 답변 비율 | 95%+ |
| `fallback_rate` | Sonnet으로 넘어간 비율 | 20% 이하 |
| `unsafe_action_preview_rate` | preview가 실행처럼 말한 비율 | 0% |

**비즈니스 KPI**

| 지표 | 설명 |
|------|------|
| 팀당 주간 활성 사용자 | 실제 업무에 사용하는 비율 |
| 파일럿 팀 처리시간 절감률 | AI 도입 전후 비교 |
| 티켓 처리량 증가율 | CS 팀 생산성 지표 |
| 추출 자동화로 절감된 수작업 시간 | ROI 측정 |
| 유료 전환율 | Starter → Growth → Enterprise |

### 6.2 Golden Set 구성 및 평가 기준

**Golden Set 디렉토리 구조:**
```
/tests/golden/
├── /assist/
│   ├── search_single_source.json      # 단일 소스 검색형
│   ├── search_multi_source.json       # 멀티툴 조합 검색형
│   ├── summarize_weekly_tickets.json  # 주간 요약형
│   ├── summarize_customer_history.json # 고객 히스토리 요약
│   ├── draft_response_positive.json   # 긍정적 응답 초안
│   ├── draft_response_negative.json   # 거절/부정적 응답 초안
│   ├── no_result_scenario.json        # 검색 결과 없음 시나리오
│   └── ambiguous_query.json           # 모호한 질의 처리
├── /extract/
│   ├── poster_complete.json           # 완전한 포스터
│   ├── poster_partial_blur.json       # 흐릿한 포스터
│   ├── invoice_standard.json          # 표준 영수증
│   ├── invoice_handwritten.json       # 손글씨 영수증
│   ├── screenshot_ui.json             # UI 스크린샷
│   ├── screenshot_error.json          # 에러 화면 캡처
│   ├── form_structured.json           # 정형 양식
│   └── form_semi_structured.json      # 반정형 문서
└── /action_preview/
    ├── close_ticket_owner.json        # 소유자 종료 시도
    ├── close_ticket_non_owner.json    # 비소유자 종료 시도
    ├── approve_refund_normal.json     # 일반 환불 승인
    ├── approve_refund_excessive.json  # 과다 환불 금지
    ├── modify_customer_safe.json      # 안전한 정보 수정
    └── modify_customer_critical.json  # 민감 정보 수정 시도
```

**Golden Set 평가 기준:**

| 테스트 ID | 핵심 검증 항목 | 합격 기준 | 자동/수동 |
|-----------|---------------|----------|----------|
| assist/search_single_source | facts[] 정확성, citation 유무 | F1 > 0.95 | 자동 |
| assist/search_multi_source | 툴 조합 순서, 중복 제거 | 정확도 100% | 자동 |
| assist/summarize_weekly_tickets | 숫자 정확성, 날짜 범위 | 100% 매칭 | 자동 |
| assist/no_result_scenario | 추정 답변 금지 확인 | hallucination = 0 | 자동 |
| extract/poster_complete | 모든 필드 추출 완료 | recall > 0.98 | 자동 |
| extract/poster_partial_blur | 누락 필드 warnings[]에 포함 | precision > 0.95 | 자동 |
| extract/invoice_handwritten | 손글씨 인식률 | recall > 0.85 | 수동+자동 |
| action/close_ticket_non_owner | allowed = false, missing_checks 포함 | 100% 통과 | 자동 |
| action/approve_refund_excessive | 정책 위반 감지 | policy_match = 100% | 자동 |

**Golden Set 실행 파이프라인:**
```
[Pre-release]
     │
     ▼
[Golden Set 실행] (매 배포 전)
     │
     ├─── 50개 테스트 × 3회 반복
     │
     ▼
[결과 평가]
     │
     ├─── [통과율 100%] ───→ [배포 진행]
     │
     ├─── [통과율 95-99%] ───→ [수동 승인 필요]
     │
     └─── [통과율 < 95%] ───→ [배포 블락, 롤백 검토]
```

**Golden Set 샘플 형식:**
```json
{
  "test_id": "assist/search_multi_source_001",
  "category": "assist",
  "input": {
    "message": {
      "text": "지난주 ABC Corp의 미해결 티켓과 최근 구매 내역을 요약해줘"
    },
    "session_id": "test_sess_001",
    "user_id": "test_agent_001"
  },
  "expected_behavior": {
    "tools_called": ["ticket_read", "crm_lookup"],
    "tool_order": ["crm_lookup", "ticket_read"],
    "required_facts": ["unresolved_ticket_count", "recent_purchase_amount"],
    "answer_must_contain": ["티켓", "구매", "ABC Corp"],
    "answer_must_not_contain": ["추정", "아마도", "것 같습니다"],
    "citations_min_count": 2
  },
  "evaluation_criteria": {
    "tool_accuracy": 1.0,
    "fact_f1": 0.95,
    "groundedness": 1.0,
    "no_hallucination": true
  },
  "tags": ["multi_tool", "crm_integration", "weekly_summary"],
  "created_at": "2026-03-24",
  "last_updated": "2026-03-24"
}
```

### 6.3 실패 처리 정책

**JSON 실패:**
1. 같은 모델로 repair prompt 1회
2. `kimi-k2-0905-preview`로 재생성
3. Sonnet fallback

**툴 실패:**
- timeout / 5xx → retry 1회
- permission error → 즉시 사용자 메시지 생성
- not found → 추정하지 말고 null 반환

**Hallucination 방지:**
- `facts[]`가 비어 있으면 고위험 답변 금지
- `source_count == 0`이면 권한/가격/상태 관련 문장 금지
- action preview는 항상 `allowed` 필드 포함

---

## 7. 팀 구성 권장사항

### 7.1 MVP 팀 (0-2개월)

| 역할 | 인원 | 주요 업무 |
|------|------|----------|
| **Tech Lead / Architect** | 1 | 아키텍처 설계, 모델 라우팅, 코드 리뷰 |
| **Backend Engineer** | 2 | API 개발, 툴 게이트웨이, 데이터베이스 |
| **AI/ML Engineer** | 1 | 프롬프트 엔지니어링, 평가 체계, 모델 튜닝 |
| **Frontend Engineer** | 1 | UI 구현, 배포본 개발 |
| **DevOps Engineer** | 0.5 | 인프라, 모니터링, CI/CD |

### 7.2 고도화 팀 (2-6개월)

| 역할 | 인원 | 주요 업무 |
|------|------|----------|
| **Product Manager** | 1 | 우선순위 관리, 고객 인터뷰, ROI 분석 |
| **Full-stack Engineers** | +2 | 커넥터 개발, 콘솔 기능 |
| **QA Engineer** | 1 | 자동화 테스트, 회귀 테스트 |
| **Security Engineer** | 0.5 | 보안 감사, 데이터 정책 |

---

## 8. 리스크 관리

### 8.1 주요 리스크 및 대응

| 리스크 | 확률 | 영향 | 대응 전략 | Playbook 절차 |
|--------|------|------|----------|--------------|
| 고객이 "그냥 챗봇"으로 인식 | 중 | 중 | 데모 메시지를 "업무 흐름 단축" 중심으로 설계 | [Playbook-001] 데모 시나리오 가이드 |
| 모델 품질 변동 | 중 | 높음 | 모델 라우터 + fallback + schema validator 유지 | [Playbook-002] 품질 저하 대응 |
| 보안/데이터 정책 우려 | 중 | 높음 | provider 경로 분리, zero-retention 옵션, 감사 로그 | [Playbook-003] 보안 인캐던트 대응 |
| 초기 범위 과대확장 | 높음 | 중 | 통합검색/Extract/Preview 3개만 먼저 강하게 | [Playbook-004] 범위 조정 프로세스 |
| JSON 파싱 실패 | 중 | 중 | repair 로직, fallback 체인, schema validation | [Playbook-005] JSON 복구 절차 |
| 툴 호출 실패 | 중 | 중 | retry 정책, graceful degradation | [Playbook-006] 툴 장애 대응 |

**Playbook-001: 모델 품질 저하 대응 절차**
```
[품질 알람 발생] (fallback_rate > 30% OR json_valid_rate < 95%)
        │
        ▼
[1단계: 자동 대응] (0-5분)
  - Fallback 비율 임계값 초과 시 자동으로 Claude 비율 증가
  - Circuit breaker: 문제 모델 일시 제외
  - Alert #ai-ops 채널로 전송
        │
        ▼
[2단계: 수동 검증] (5-15분)
  - Golden set 10개 샘플로 수동 검증
  - 모델 제공사(Moonshot/Anthropic) 상태 페이지 확인
  - 최근 프롬프트 변경 이력 확인
        │
        ▼
[3단계: 롤백 결정] (15-30분)
  ├─ 원인: 프롬프트 변경 ──→ 프롬프트 롤백
  ├─ 원인: 모델 업데이트 ──→ 이전 버전 고정
  └─ 원인: 외부 요인 ──→ Fallback 100% 전환
        │
        ▼
[4단계: 사후 분석] (30분-2시간)
  - Badcase 등록 및 분류
  - 고객 영향도 평가
  - 개선 조치 문서화
```

**Playbook-002: 보안 인캐던트 대응**
```
[의심 감지] (PII 유출 의심 OR 비정상 접근 패턴)
        │
        ▼
[즉시 조치] (T+0)
  - 관련 세션 강제 종료
  - 접근 권한 일시 정지
  - 감사 로그 백업 (증거 보존)
        │
        ▼
[조사] (T+1시간)
  - 데이터 유출 범위 확인
  - 영향 받은 사용자 식별
  - 법무팀/개인정보보호팀 통보
        │
        ▼
[통보/복구] (T+4시간)
  - 관련 당국 통보 (법적 의무 확인)
  - 영향 받은 고객 개별 통보
  - 조치 완료 및 재발 방지 계획 공지
```

### 8.2 롤백 및 배포 전략

**롤백 트리거 조건:**
| 지표 | 임계값 | 조치 | 완료 시간 |
|------|--------|------|----------|
| Error Rate | > 5% | 자동 롤백 | 3분 |
| P99 Latency | > 10s | 자동 롤백 | 3분 |
| Fallback Rate | > 50% | 수동 결정 | 10분 |
| Golden Set Fail | > 10% | 자동 롤백 | 5분 |
| 고객 신고 급증 | 10건/10분 | 수동 결정 | 15분 |

**카나리 배포 전략:**
```
[Production 배포]
     │
     ├─── [Baseline 90%] (현재 안정 버전)
     │
     └─── [Canary 10%] (신규 버전)
              │
              ├─── 5분: Health check 통과?
              ├─── 10분: Error rate < 1%?
              ├─── 15분: Golden set 100% 통과?
              └─── 20분: 고객 지표 이상 무?
                    │
              [모두 통과] → 25% → 50% → 100%
                    │
              [실패] → 자동 롤백, 알람 발송
```

**Feature Flag 전략:**
| 플래그 유형 | 도구 | 사용 사례 | 기본값 |
|------------|------|----------|--------|
| 릴리즈 플래그 | LaunchDarkly | 신기능 단계적 공개 | false |
| 실험 플래그 | LaunchDarkly | A/B 테스트 (모델 비교) | 50/50 |
| 운영 플래그 | 내부 Redis | 긴급 기능 차단 | true |
| 권한 플래그 | 내부 DB | 엔터프라이즈 기능 | tier-based |

**핵심 Feature Flags:**
```yaml
flags:
  assist_v2_composer:
    description: "새로운 답변 생성 로직"
    rollout: percentage  # 0 → 10 → 50 → 100
    default: false
    
  extract_strict_mode:
    description: "엄격한 추출 검증"
    rollout: tier-based  # enterprise only
    default: false
    
  action_parallel_check:
    description: "병렬 권한 체크"
    rollout: boolean
    default: true  # 즉시 전체 적용
    
  claude_fallback:
    description: "Claude fallback 활성화"
    rollout: emergency  # 긴급 차단용
    default: true
    kill_switch: true  # 즉시 OFF 가능
```

### 8.2 데이터 프라이버시

| 옵션 | 설명 | 권장 상황 |
|------|------|----------|
| 직접 Moonshot | 빠르고 단순 | 데이터 정책 검토 필수 |
| Fireworks + `store=False` | 보수적 운영 | 민감한 고객 데이터 있는 경우 |

---

## 9. 부록: 프롬프트 팩

### A. Planner 프롬프트 (`kimi-k2-thinking`)

```text
You are Lider Planner.

Your job:
1. Understand the user goal.
2. Decide whether tools are required.
3. If freshness, state, permission, price, or operational status matters, 
   do not answer from memory.
4. Produce a JSON object only.

Hard rules:
- Never fabricate facts.
- Never claim an action has already been executed.
- Prefer internal tools before web search.
- If evidence is insufficient, return "needs_more_data": true.

Return schema:
{
  "intent": "search|summarize|draft|analyze|act_preview",
  "needs_tools": true,
  "tool_plan": [
    {"tool": "internal_search", "args": {}}
  ],
  "needs_fallback": false,
  "needs_more_data": false,
  "reason": "short explanation"
}
```

### B. Extractor 프롬프트 (`kimi-k2.5`)

```text
You are Lider Extractor.

Goal:
Extract structured information from the provided file or image.

Hard rules:
- Only extract what is visible in the file.
- If text is blurry, incomplete, or ambiguous, do not guess.
- Put uncertain items into warnings.
- Return JSON object only.

Return schema:
{
  "doc_type": "poster|invoice|screen|form|generic",
  "fields": {},
  "warnings": [],
  "needs_review": false
}
```

### C. Finalizer 프롬프트 (`kimi-k2-0905-preview`)

```text
You are Lider Finalizer.

You will receive:
- verified facts
- tool outputs
- policy notes

Your job:
- write a concise Korean answer
- separate facts from suggestions
- never introduce unsupported claims
- if a required fact is missing, say it is not confirmed

Return JSON object:
{
  "answer": "final Korean answer",
  "facts_used": [],
  "uncertainties": [],
  "followup_actions": []
}
```

### D. Action Preview 프롬프트 (`kimi-k2-0905-preview`)

```text
You are Lider Action Previewer.

You do NOT execute actions.
You only explain:
- what the action would do
- what checks are still missing
- whether human confirmation is needed

Return JSON object:
{
  "allowed": false,
  "impact_summary": "what would happen",
  "missing_checks": [],
  "human_confirmation_required": true,
  "recommended_next_step": ""
}
```

---

## 10. 개발자 필수 체크리스트

### Kimi API 사용 시 주의사항

- [ ] `functions` 파라미터 대신 `tools` 사용 (deprecated)
- [ ] JSON Mode는 top-level object만 설계 (array 금지)
- [ ] Thinking 모델은 `reasoning_content` 문맥 유지
- [ ] K2.5 thinking + built-in `$web_search`는 같이 쓰지 말 것
- [ ] `max_tokens >= 16000`, `temperature=1.0`, `stream=true` 권장
- [ ] Tool parameters root는 반드시 `type: "object"`

### 코드 리뷰 체크리스트

- [ ] write action은 preview만, execute는 backend service
- [ ] 권한 체크는 deterministic validator에서
- [ ] 추출 실패 시 guess 금지, warnings에 기록
- [ ] facts[] 비어 있으면 고위험 답변 금지
- [ ] 모든 출력에 request_id 포함
- [ ] fallback 사유는 항상 로그에 기록

---

## 참고 자료

- [LIDER 핵심 사업기획 v0.2](/home/user/uploaded_files/lider_delivery_bundle/biz/LIDER_CORE_BUSINESS_PLAN.md)
- [기술 논의 채팅 내역](/home/user/uploaded_files/lider_delivery_bundle/chat/lider_chat_history.md)
- [패치 노트](/home/user/uploaded_files/lider_delivery_bundle/deploy/PATCH_NOTES.md)
- [배포 가이드](/home/user/uploaded_files/lider_delivery_bundle/deploy/DEPLOY.md)
- [LIDER 기술 아키텍처](./LIDER_ARCHITECTURE.md)
- [LIDER API 명세서](./LIDER_API_SPEC.md)

---

## 10. 검수 완료 보고서

### 3회 교차검수 수행 결과

| 검수 차수 | 수행 일자 | 주요 내용 | 발견 이슈 | 조치 상태 |
|-----------|-----------|-----------|-----------|-----------|
| **1차** | 2026-03-24 | 문서 간 명명 규칙 일관성 | 모델명 불일치 (k2-0905 vs kimi-k2-0905-preview) | ✅ API 명칭 분리 정의 완료 |
| **2차** | 2026-03-24 | 기술 스펙 누락 보강 | DB 스키마, 캐싱 전략, CI/CD, 테스트 기준 부재 | ✅ 4개 영역 상세 스펙 추가 |
| **3차** | 2026-03-24 | 리스크/배포 전략 보강 | Playbook, 롤백 기준, Feature Flag 미정의 | ✅ 3개 영역 운영 절차 추가 |

### 최종 검증 항목

| 검증 영역 | 항목 수 | 통과 | 상태 |
|-----------|--------|------|------|
| 문서 간 일관성 (모델명, 에러코드, HTTP 상태) | 12 | 12 | ✅ |
| 누락 스펙 보강 (DB, 캐싱, 테스트, CI/CD) | 8 | 8 | ✅ |
| 운영 절차 정의 (Playbook, 롤백, Feature Flag) | 6 | 6 | ✅ |
| Golden Set 구체화 | 15 | 15 | ✅ |
| **총계** | **41** | **41** | **✅ 100%** |

### 개발 착수 전 필수 확인사항
- [x] 기술 아키텍처 검토 완료
- [x] API 명세 확정
- [x] 모델 라우팅 전략 확정
- [x] 테스트/배포 전략 확정
- [x] 리스크 대응 Playbook 작성 완료
- [x] Golden Set 정의 완료

---

**문의:** 개발 관련 기술 문의는 Tech Lead 통해  
**업데이트:** 본 문서는 sprint별로 업데이트 예정  
**검수 완료:** 2026-03-24, 3회 교차검수 및 보강 완료
