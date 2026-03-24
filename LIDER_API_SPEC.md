# LIDER API 명세서 v1.0

> AI 업무 오케스트레이션 플랫폼 REST API 명세

---

## 목차

1. [개요](#1-개요)
2. [인증](#2-인증)
3. [공통 응답 형식](#3-공통-응답-형식)
4. [Assist API](#4-assist-api)
5. [Extract API](#5-extract-api)
6. [Action Preview API](#6-action-preview-api)
7. [Action Execute API](#7-action-execute-api)
8. [Session Management](#8-session-management)
9. [Error Handling](#9-error-handling)
10. [Webhook Events](#10-webhook-events)

---

## 1. 개요

### 1.1 Base URL

| 환경 | Base URL |
|------|----------|
| Production | `https://api.lider.ai/v1` |
| Staging | `https://api.staging.lider.ai/v1` |

### 1.2 API Versioning

- URL 기반 버저닝: `/v1/...`
- 하위 호환성 보장 (마이너 업데이트)
- 메이저 버전 변경 시 6개월 전 공지

### 1.3 Content-Type

```
Content-Type: application/json
Accept: application/json
```

### 1.4 Rate Limits

| 티어 | Requests/분 | Burst |
|------|--------------|-------|
| Starter | 60 | 10 |
| Growth | 300 | 50 |
| Enterprise | 1000 | 200 |

헤더 정보:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
```

---

## 2. 인증

### 2.1 Bearer Token (JWT)

```
Authorization: Bearer <jwt_token>
```

### 2.2 토큰 구조

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "usr_42",
    "org": "org_123",
    "role": "agent",
    "iat": 1640995200,
    "exp": 1640996100
  }
}
```

### 2.3 SSO 연동 (Enterprise)

```http
POST /v1/auth/sso/saml
POST /v1/auth/sso/oidc
```

---

## 3. 공통 응답 형식

### 3.1 성공 응답

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-03-24T10:30:00Z",
    "latency_ms": 2450
  }
}
```

### 3.2 오류 응답

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "요청 데이터가 유효하지 않습니다.",
    "details": [
      {
        "field": "message.text",
        "code": "required",
        "message": "text 필드는 필수입니다."
      }
    ]
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-03-24T10:30:00Z"
  }
}
```

### 3.3 오류 코드

| 코드 | HTTP Status | 설명 |
|------|-------------|------|
| `UNAUTHORIZED` | 401 | 인증 실패 |
| `FORBIDDEN` | 403 | 권한 부족 |
| `NOT_FOUND` | 404 | 리소스 없음 |
| `VALIDATION_ERROR` | 422 | 데이터 검증 실패 |
| `RATE_LIMITED` | 429 | 요청 한도 초과 |
| `MODEL_UNAVAILABLE` | 503 | AI 모델 응답 불가 |
| `TIMEOUT` | 504 | 처리 시간 초과 |

---

## 4. Assist API

### 4.1 POST /v1/assist

통합 검색 및 대화 API

**Request:**

```json
{
  "session_id": "sess_abc123",
  "user_id": "usr_42",
  "locale": "ko-KR",
  "timezone": "Asia/Seoul",
  "message": {
    "text": "지난주 고객 이슈를 요약하고, 아직 미해결 티켓이 있으면 알려줘"
  },
  "attachments": [],
  "context": {
    "previous_turns": 3,
    "customer_id": "cust_xyz789"
  },
  "options": {
    "allowed_tools": ["internal_search", "crm_lookup", "ticket_read"],
    "response_mode": "detailed",
    "risk_tier": "medium",
    "stream": false
  },
  "debug": false
}
```

**Request Fields:**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `session_id` | string | Yes | 세션 식별자 |
| `user_id` | string | Yes | 사용자 ID |
| `locale` | string | No | 응답 언어 (기본: ko-KR) |
| `message.text` | string | Yes | 사용자 질의 |
| `attachments` | array | No | 첨부파일 목록 |
| `allowed_tools` | array | No | 허용된 툴 목록 |
| `response_mode` | string | No | `concise`/`detailed` (기본: detailed) |
| `risk_tier` | string | No | `low`/`medium`/`high` (기본: medium) |
| `stream` | boolean | No | SSE 스트리밍 여부 |

**Response:**

```json
{
  "success": true,
  "data": {
    "answer": {
      "text": "지난주(3월 17일~23일) 총 24건의 고객 문의가 접수되었습니다...",
      "format": "markdown",
      "sections": [
        {
          "type": "summary",
          "content": "..."
        },
        {
          "type": "list",
          "items": [...]
        }
      ]
    },
    "facts": [
      {
        "key": "weekly_ticket_count",
        "value": 24,
        "source": "ticket_db",
        "confidence": 0.98
      },
      {
        "key": "unresolved_count",
        "value": 3,
        "source": "ticket_db",
        "confidence": 0.98
      }
    ],
    "citations": [
      {
        "source_id": "ticket:T-202503-001",
        "source_type": "ticket",
        "title": "결제 오류 문의",
        "url": "https://..."
      },
      {
        "source_id": "crm:cust_xyz789",
        "source_type": "crm",
        "title": "ABC Corp",
        "snippet": "..."
      }
    ],
    "tool_calls": [
      {
        "tool": "internal_search",
        "args": {"query": "지난주 고객 문의", "time_range": "7d"},
        "result_summary": "24건 발견"
      },
      {
        "tool": "ticket_read",
        "args": {"status": "open", "created_after": "2026-03-17"},
        "result_summary": "3건 미해결"
      }
    ],
    "uncertainties": [
      {
        "field": "priority_assessment",
        "reason": "우선순위 판단에 주관적 요소 포함"
      }
    ],
    "suggested_actions": [
      {
        "type": "view_tickets",
        "label": "미해결 티켓 보기",
        "params": {"filter": "unresolved"}
      }
    ]
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-03-24T10:30:02Z",
    "latency_ms": 2450,
    "model_used": "kimi-k2-thinking",
    "fallback_used": false,
    "token_usage": {
      "prompt": 1250,
      "completion": 450,
      "total": 1700
    },
    "estimated_cost_usd": 0.0042
  }
}
```

**Error Responses:**

```json
// 422 - Validation Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "message.text",
        "code": "required",
        "message": "text is required"
      }
    ]
  }
}

// 429 - Rate Limited
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later.",
    "retry_after": 60
  }
}

// 503 - Model Unavailable
{
  "success": false,
  "error": {
    "code": "MODEL_UNAVAILABLE",
    "message": "AI model temporarily unavailable. Retrying with fallback...",
    "fallback_used": true
  }
}
```

### 4.2 Streaming Response (SSE)

`stream: true` 설정 시 Server-Sent Events 반환

```
Content-Type: text/event-stream

event: start
data: {"request_id": "req_abc123", "timestamp": "..."}

event: tool_call
data: {"tool": "internal_search", "status": "started"}

event: tool_result
data: {"tool": "internal_search", "status": "completed", "found": 24}

event: progress
data: {"step": "generating_answer", "progress": 0.3}

event: content
data: {"delta": "지난주 총", "finished": false}

event: content
data: {"delta": " 24건의", "finished": false}

event: content
data: {"delta": " 문의가...", "finished": true}

event: complete
data: {"final_meta": {...}}
```

---

## 5. Extract API

### 5.1 POST /v1/extract

문서/이미지에서 구조화된 데이터 추출

**Request:**

```json
{
  "session_id": "sess_def456",
  "user_id": "usr_42",
  "attachments": [
    {
      "type": "image",
      "file_id": "file_img789",
      "mime_type": "image/jpeg"
    }
  ],
  "extract_type": "poster",
  "output_schema": {
    "type": "object",
    "required": ["event_name", "date", "location"],
    "properties": {
      "event_name": {"type": "string"},
      "date": {"type": "string", "format": "date"},
      "location": {"type": "string"},
      "organizer": {"type": "string"},
      "contact": {"type": "string"}
    }
  },
  "options": {
    "confidence_threshold": 0.8,
    "language_hint": "ko",
    "handwriting_mode": false
  }
}
```

**Extract Types:**

| 타입 | 설명 | 예시 |
|------|------|------|
| `poster` | 포스터/전단지 | 행사, 세미나 |
| `invoice` | 청구서/영수증 | 결제 내역 |
| `form` | 신청서/양식 | 가입, 주문 |
| `screen` | 스크린샷 | UI, 대화 |
| `generic` | 일반 문서 | 계약서, 보고서 |

**Response:**

```json
{
  "success": true,
  "data": {
    "doc_type": "poster",
    "fields": {
      "event_name": "2026 AI 컨퍼런스",
      "date": "2026-04-15",
      "location": "서울 코엑스",
      "organizer": "AI 연합회",
      "contact": "contact@ai-conf.kr"
    },
    "raw_text": "2026 AI 컨퍼런스...",
    "confidence_scores": {
      "event_name": 0.97,
      "date": 0.95,
      "location": 0.92
    },
    "warnings": [
      {
        "field": "contact",
        "type": "partial_recognition",
        "message": "이메일 주소 일부가 흐릿하여 추정됨"
      }
    ],
    "needs_review": true,
    "extraction_metadata": {
      "ocr_engine": "kimi-k2.5",
      "processing_time_ms": 3200,
      "image_dimensions": [1920, 1080]
    }
  },
  "meta": {
    "request_id": "req_def456",
    "timestamp": "2026-03-24T10:35:00Z",
    "model_used": "kimi-k2.5",
    "token_usage": {
      "input_tokens": 2048
    }
  }
}
```

### 5.2 File Upload

**POST /v1/files**

```http
POST /v1/files
Content-Type: multipart/form-data

file: [binary data]
purpose: extract
```

**Response:**

```json
{
  "success": true,
  "data": {
    "file_id": "file_img789",
    "filename": "event_poster.jpg",
    "mime_type": "image/jpeg",
    "size_bytes": 245760,
    "created_at": "2026-03-24T10:30:00Z",
    "expires_at": "2026-03-25T10:30:00Z"
  }
}
```

**Supported Formats:**

| 타입 | 포맷 | 최대 크기 |
|------|------|----------|
| 이미지 | JPEG, PNG, GIF, WebP, BMP | 20MB |
| 문서 | PDF | 50MB |
| Office | DOCX, XLSX, PPTX | 30MB |

---

## 6. Action Preview API

### 6.1 POST /v1/actions/preview

위험 액션 실행 전 검토 및 영향 분석

**Request:**

```json
{
  "session_id": "sess_ghi789",
  "user_id": "usr_42",
  "action_type": "close_ticket",
  "target": {
    "type": "ticket",
    "id": "T-1001"
  },
  "payload": {
    "reason": "중복 문의",
    "resolution_code": "duplicate",
    "notify_customer": true
  },
  "context": {
    "user_role": "agent",
    "session_start": "2026-03-24T09:00:00Z"
  }
}
```

**Action Types:**

| 타입 | 설명 | 위험도 |
|------|------|--------|
| `close_ticket` | 티켓 종료 | medium |
| `approve_refund` | 환불 승인 | high |
| `modify_customer` | 고객 정보 수정 | high |
| `delete_record` | 레코드 삭제 | critical |
| `send_notification` | 알림 전송 | low |
| `change_status` | 상태 변경 | medium |

**Response:**

```json
{
  "success": true,
  "data": {
    "allowed": false,
    "status": "pending_confirmation",
    "impact_summary": {
      "description": "티켓 T-1001을 '종료' 상태로 변경합니다.",
      "affected_entities": [
        {
          "type": "ticket",
          "id": "T-1001",
          "changes": [
            {"field": "status", "from": "open", "to": "closed"},
            {"field": "closed_at", "from": null, "to": "2026-03-24T10:40:00Z"}
          ]
        },
        {
          "type": "customer",
          "id": "cust_xyz789",
          "side_effects": ["종료 알림 이메일 발송"]
        }
      ],
      "reversibility": "reversible_with_admin",
      "estimated_time": "즉시 적용"
    },
    "checks": {
      "passed": ["ticket_exists", "user_has_read_access"],
      "failed": ["user_has_close_permission"],
      "missing": ["manager_approval"]
    },
    "missing_checks": [
      {
        "check": "permission.owner_or_admin",
        "required": true,
        "current_value": false,
        "description": "티켓 종료 권한이 필요합니다."
      },
      {
        "check": "policy.duplicate_verification",
        "required": true,
        "current_value": null,
        "description": "중복 확인이 필요합니다."
      }
    ],
    "risks": [
      {
        "level": "medium",
        "category": "customer_satisfaction",
        "description": "고객이 아직 대기 중인데 종료할 경우 불만 발생 가능"
      }
    ],
    "recommendations": [
      {
        "type": "alternative_action",
        "action": "escalate_to_manager",
        "label": "관리자에게 에스컬레이션"
      },
      {
        "type": "additional_check",
        "action": "verify_duplicate_with_customer",
        "label": "고객에게 중복 여부 확인"
      }
    ],
    "human_confirmation_required": true,
    "human_readable_preview": "이 작업은 티켓 T-1001을 종료하려고 합니다. 현재 사용자는 종료 권한이 없어 관리자 승인이 필요합니다."
  },
  "meta": {
    "request_id": "req_ghi789",
    "timestamp": "2026-03-24T10:40:00Z",
    "model_used": "kimi-k2-0905-preview",
    "policy_version": "v2.3"
  }
}
```

---

## 7. Action Execute API

### 7.1 POST /v1/actions/execute

⚠️ **주의**: 이 API는 LLM을 거치지 않고 백엔드 서비스에서 직접 처리됩니다.

**Request:**

```json
{
  "preview_token": "pv_token_abc123",
  "confirmed": true,
  "user_confirmation": {
    "confirmed_at": "2026-03-24T10:45:00Z",
    "confirmation_method": "password",
    "confirmation_value": "[hashed_password]"
  },
  "audit_context": {
    "ip_address": "203.0.113.1",
    "user_agent": "Mozilla/5.0...",
    "session_id": "sess_ghi789"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "execution_id": "exec_jkl012",
    "status": "completed",
    "action_type": "close_ticket",
    "target": {
      "type": "ticket",
      "id": "T-1001"
    },
    "result": {
      "ticket_status": "closed",
      "closed_at": "2026-03-24T10:45:05Z",
      "closed_by": "usr_42",
      "notifications_sent": 1
    },
    "audit_trail": {
      "preview_request_id": "req_ghi789",
      "executed_by": "usr_42",
      "executed_at": "2026-03-24T10:45:05Z",
      "confirmation_verified": true
    }
  }
}
```

### 7.2 Batch Execute (Enterprise)

**POST /v1/actions/batch**

```json
{
  "actions": [
    {"preview_token": "pv_token_1", "confirmed": true},
    {"preview_token": "pv_token_2", "confirmed": true}
  ],
  "atomic": true
}
```

---

## 8. Session Management

### 8.1 POST /v1/sessions

새 세션 생성

```json
// Request
{
  "user_id": "usr_42",
  "metadata": {
    "source": "web_dashboard",
    "customer_context": "cust_xyz789"
  }
}

// Response
{
  "success": true,
  "data": {
    "session_id": "sess_new123",
    "created_at": "2026-03-24T10:00:00Z",
    "expires_at": "2026-03-24T12:00:00Z",
    "context": {
      "turns": 0,
      "accumulated_tokens": 0
    }
  }
}
```

### 8.2 GET /v1/sessions/{session_id}

세션 정보 조회

```json
{
  "success": true,
  "data": {
    "session_id": "sess_new123",
    "status": "active",
    "created_at": "2026-03-24T10:00:00Z",
    "expires_at": "2026-03-24T12:00:00Z",
    "turns": [
      {
        "turn": 1,
        "request_id": "req_001",
        "timestamp": "2026-03-24T10:05:00Z",
        "summary": "고객 문의 요약"
      }
    ]
  }
}
```

### 8.3 DELETE /v1/sessions/{session_id}

세션 종료 및 데이터 삭제

```json
{
  "success": true,
  "data": {
    "session_id": "sess_new123",
    "status": "terminated",
    "data_retention_until": "2026-03-31T00:00:00Z"
  }
}
```

---

## 9. Error Handling

### 9.1 에러 응답 형식

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자용 메시지",
    "debug_message": "개발자용 상세 (debug=true 시에만)",
    "details": [...],
    "suggested_action": "사용자가 취할 수 있는 조치"
  },
  "meta": {...}
}
```

### 9.2 에러 코드 상세

| 코드 | HTTP | 설명 | 사용자 메시지 | 조치 | 비고 |
|------|------|------|--------------|------|------|
| `UNAUTHORIZED` | 401 | 인증 실패 | 로그인이 필요합니다 | 재로그인 | - |
| `SESSION_EXPIRED` | 401 | 세션 만료 | 세션이 만료되었습니다 | 재로그인 | 토큰 만료 |
| `FORBIDDEN` | 403 | 권한 부족 | 접근 권한이 없습니다 | 관리자 문의 | 툴 수준 권한 |
| `NOT_FOUND` | 404 | 리소스 없음 | 요청한 정보를 찾을 수 없습니다 | 요청 확인 | 티켓/고객 ID 오류 |
| `RATE_LIMITED` | 429 | 요청 한도 초과 | 잠시 후 다시 시도해주세요 | 1분 후 재시도 | 헤더에 reset time 포함 |
| `VALIDATION_ERROR` | 422 | 데이터 검증 실패 | 요청 데이터를 확인해주세요 | 스키마 확인 | 필드 누락/타입 오류 |
| `INVALID_FILE` | 422 | 파일 오류 | 업로드한 파일을 확인해주세요 | 파일 재업로드 | 포맷/크기 위반 |
| `EXTRACTION_FAILED` | 422 | 추출 실패 | 문서에서 정보를 추출할 수 없습니다 | 수동 입력 | OCR 실패 |
| `SCHEMA_VIOLATION` | 422 | 스키마 위반 | 응답 형식 오류 | 재시도 또는 문의 | AI 출력 검증 실패 |
| `MODEL_UNAVAILABLE` | 503 | AI 모델 응답 불가 | 일시적으로 응답할 수 없습니다 | 잠시 후 재시도 | fallback 자동 실행 |
| `MODEL_TIMEOUT` | 504 | AI 응답 시간 초과 | 응답 생성에 시간이 걸립니다 | 간단한 질의로 재시도 | 15초 초과 |
| `TIMEOUT` | 504 | 처리 시간 초과 | 요청 처리 시간이 초과되었습니다 | 재시도 | 전체 파이프라인 |

**에러 코드 확장 규칙:**
- 새로운 비즈니스 로직 에러: `xxx_YYY` 형식 (카테고리_상세)
  - 예: `TICKET_ALREADY_CLOSED`, `REFUND_AMOUNT_EXCEEDED`
- 시스템 레벨 에러: 기존 HTTP Status 활용 + 상세 코드
  - 예: `503_MODEL_DEGRADED`, `504_TOOL_TIMEOUT`

**에러 응답 예시 (확장):**
```json
{
  "success": false,
  "error": {
    "code": "SCHEMA_VIOLATION",
    "message": "응답 형식 오류",
    "debug_message": "JSON Schema validation failed: missing required field 'answer'",
    "details": {
      "validation_errors": [
        {"field": "answer", "issue": "required", "severity": "critical"}
      ],
      "schema_version": "assist_response_v1",
      "fallback_attempted": true
    },
    "suggested_action": "재시도 또는 지원팀 문의",
    "request_id": "req_abc123",
    "timestamp": "2026-03-24T10:30:00Z"
  },
  "meta": {
    "request_id": "req_abc123"
  }
}
```

### 9.3 Retry 전략

```python
# 클라이언트 권장 retry 로직
retry_strategy = {
    "429": {"max_retries": 3, "backoff": "exponential", "base_delay": 1},
    "503": {"max_retries": 3, "backoff": "exponential", "base_delay": 2},
    "504": {"max_retries": 2, "backoff": "fixed", "delay": 5},
    "5xx": {"max_retries": 3, "backoff": "exponential", "base_delay": 1}
}
```

---

## 10. Webhook Events

### 10.1 Event Types

| 이벤트 | 설명 | 페이로드 |
|--------|------|----------|
| `extract.completed` | 문서 추출 완료 | 추출 결과 + 메타데이터 |
| `extract.failed` | 문서 추출 실패 | 오류 정보 |
| `action.preview_ready` | 액션 프리뷰 준비됨 | preview 데이터 |
| `action.executed` | 액션 실행 완료 | 실행 결과 |
| `session.expiring` | 세션 만료 임박 | 만료 시간 |
| `rate_limit.warning` | 요청 한도 임박 | 잔여 quota |

### 10.2 Webhook Payload

```json
{
  "event_id": "evt_mno345",
  "event_type": "extract.completed",
  "timestamp": "2026-03-24T10:30:00Z",
  "webhook_id": "whk_pqr678",
  "data": {
    "request_id": "req_def456",
    "session_id": "sess_def456",
    "user_id": "usr_42",
    "result": {...}
  },
  "signature": "sha256=abc123..."
}
```

### 10.3 Signature Verification

```python
import hmac
import hashlib

def verify_webhook(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

---

## 부록: SDK 예시

### Python

```python
import lider

client = lider.Client(api_key="your_api_key")

# Assist
response = client.assist.create(
    session_id="sess_123",
    message={"text": "고객 문의 요약해줘"},
    allowed_tools=["ticket_read"]
)
print(response.answer.text)

# Extract
file = client.files.upload("invoice.pdf")
result = client.extract.create(
    file_id=file.id,
    extract_type="invoice"
)
print(result.fields)

# Action Preview
preview = client.actions.preview(
    action_type="close_ticket",
    target={"type": "ticket", "id": "T-1001"}
)
if preview.allowed:
    client.actions.execute(preview_token=preview.token)
```

### JavaScript/TypeScript

```typescript
import { LiderClient } from '@lider/sdk';

const client = new LiderClient({ apiKey: 'your_api_key' });

// Streaming Assist
const stream = await client.assist.create({
  sessionId: 'sess_123',
  message: { text: '고객 문의 요약해줘' },
  stream: true
});

for await (const chunk of stream) {
  if (chunk.type === 'content') {
    process.stdout.write(chunk.delta);
  }
}
```

---

**문서 버전:** v2.0  
**API 버전:** v1  
**최종 업데이트:** 2026-03-24  
**검수 상태:** 3회 교차검수 완료 (에러 코드 통일, 응답 형식 검증)  
**문의:** api-support@lider.ai
