# LIDER AI Platform v1.0

> **L**inked **I**ntelligence & **D**eterministic **E**xecution **R**untime  
> AI 업무 오케스트레이션 플랫폼 - 문서 추출, 통합 검색, 실행 전 검토를 하나의 워크플로우로

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://python.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis)](https://redis.io)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 핵심 기능 (Phase 1 MVP)

| 기능 | 설명 | 상태 |
|------|------|------|
| `/v1/assist` | AI 업무 어시스턴트 - 대화형 질의응답, 멀티툴 호출 | ✅ 완료 |
| `/v1/extract` | 문서/이미지 정보 추출 - OCR + 구조화 | ✅ 완료 |
| `/v1/actions/preview` | 실행 전 액션 영향 분석 및 리스크 평가 | ✅ 완료 |
| `/v1/actions/execute` | 승인된 액션 실행 (미리보기 기반) | ✅ 완료 |
| `/v1/sessions` | 대화 세션 관리 (2시간 TTL) | ✅ 완료 |
| `/v1/files/upload` | 파일 업로드 및 관리 | ✅ 완료 |

## 🏗️ 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│                    (SPA / Mobile / SDK)                         │
└────────────────────┬──────────────────────────────────────────┘
                     │
┌────────────────────▼──────────────────────────────────────────┐
│                     API Gateway (FastAPI)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Rate Limit   │  │ PII Redaction│  │ JWT Auth     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└────────────────────┬──────────────────────────────────────────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
┌──────▼──────┐ ┌───▼────┐ ┌──────▼──────┐
│   /v1/assist │ │/v1/ex │ │ /v1/actions │
│              │ │ tract  │ │             │
└──────┬───────┘ └───┬────┘ └──────┬──────┘
       │             │            │
       └─────────────┴────────────┘
                     │
          ┌──────────▼──────────┐
          │   Model Router      │
          │  (kimi-k2-0905,    │
          │   kimi-k2-thinking, │
          │   kimi-k2.5,        │
          │   claude-sonnet-4-6)│
          └──────────┬──────────┘
                     │
       ┌─────────────┴─────────────┐
       │                           │
┌──────▼───────┐          ┌───────▼────────┐
│ AI Provider  │          │  Tool Gateway  │
│ - Moonshot   │          │ - internal_search│
│ - Anthropic  │          │ - crm_lookup   │
└──────────────┘          │ - ticket_read  │
                          │ - doc_fetch    │
                          └────────────────┘
```

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# 저장소 클론
git clone https://github.com/QETTA/Lider.git
cd lider/lider-platform/apps/api

# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.sample .env
# .env 파일을 편집하여 API 키 설정
```

### 2. Docker로 실행

```bash
# 모든 서비스 실행 (PostgreSQL, Redis, API, Nginx)
docker-compose up -d

# 로그 확인
docker-compose logs -f api

# 헬스체크
curl http://localhost:8000/health
```

### 3. 로컬 개발 모드

```bash
# PostgreSQL, Redis 직접 설치 후
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# 문서 보기
open http://localhost:8000/docs
```

## 📡 API 사용 예시

### Assist - AI 어시스턴스

```bash
curl -X POST http://localhost:8000/v1/assist \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "user_id": "user_12345",
    "org_id": "org_67890",
    "message": {"text": "지난 달 매출 보고서를 분석해줘"},
    "locale": "ko-KR",
    "allowed_tools": ["internal_search", "crm_lookup"]
  }'
```

### Extract - 문서 추출

```bash
curl -X POST http://localhost:8000/v1/extract \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "user_id": "user_12345",
    "file_url": "https://storage.example.com/invoice.pdf",
    "file_type": "pdf",
    "output_schema": [
      {
        "field_name": "invoice_number",
        "field_type": "string",
        "description": "청구서 번호",
        "required": true
      },
      {
        "field_name": "total_amount",
        "field_type": "number",
        "description": "총 금액",
        "required": true
      }
    ]
  }'
```

### Action Preview - 실행 전 검토

```bash
curl -X POST http://localhost:8000/v1/actions/preview \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "user_id": "user_12345",
    "action_type": "ticket_close",
    "target_system": "zendesk",
    "parameters": {
      "ticket_id": "12345",
      "resolution": "문제 해결됨"
    }
  }'
```

## 📁 프로젝트 구조

```
lider-platform/
├── apps/
│   └── api/
│       ├── core/                 # 핵심 인프라
│       │   ├── config.py         # 설정 관리
│       │   ├── database.py       # PostgreSQL 모델 및 연결
│       │   ├── middleware.py     # Rate Limit, PII Redaction, Logging
│       │   └── redis_cache.py    # Redis 캐싱 전략
│       ├── routes/               # API 엔드포인트
│       │   ├── assist.py         # /v1/assist
│       │   ├── extract.py        # /v1/extract
│       │   ├── action_preview.py # /v1/actions/*
│       │   ├── sessions.py       # 세션 관리
│       │   ├── files.py          # 파일 업로드
│       │   └── health.py         # 헬스체크
│       ├── schemas/              # Pydantic 스키마
│       │   ├── common.py         # 공통 응답 봉투
│       │   ├── assist.py         # Assist 요청/응답
│       │   ├── extract.py        # Extract 요청/응답
│       │   ├── action.py         # Action 요청/응답
│       │   └── session.py        # Session 요청/응답
│       ├── services/             # 비즈니스 로직
│       │   ├── model_router.py   # AI 모델 라우팅
│       │   ├── providers.py      # Moonshot/Anthropic 어댑터
│       │   ├── tool_gateway.py   # 내부 도구 통합
│       │   ├── validator.py      # 검증 파이프라인
│       │   └── evaluator.py      # 응답 품질 평가
│       ├── prompts/              # LLM 프롬프트 (선택적)
│       ├── tests/                # 테스트 코드
│       ├── main.py               # FastAPI 앱 진입점
│       ├── requirements.txt      # Python 의존성
│       ├── docker-compose.yml    # 인프라 구성
│       ├── Dockerfile            # API 컨테이너
│       └── .env.sample           # 환경변수 템플릿
└── docs/                         # 문서
    ├── LIDER_DEVELOPMENT_PLAN.md # 개발 계획 v2.0
    ├── LIDER_ARCHITECTURE.md     # 아키텍처 문서
    └── LIDER_API_SPEC.md         # API 명세 v2.0
```

## 🧠 AI 모델 라우팅

```python
# 라우팅 로직 예시
route_decision = await model_router.route(
    task_type=TaskType.EXTRACT,
    has_attachments=True,
    required_vision=True
)
# → Selected: kimi-k2.5 (Vision 모델)

route_decision = await model_router.route(
    task_type=TaskType.ASSIST,
    needs_multi_tool=True,
    customer_facing=True
)
# → Selected: kimi-k2-thinking (멀티툴 + 추론)
```

### 모델명 규칙

| 내부 축약형 | API 공식 명칭 | 특징 |
|------------|--------------|------|
| `kimi-k2-0905` | `kimi-k2-0905-preview` | 빠른 응답, 실시간 |
| `kimi-k2-thinking` | `kimi-k2-thinking` | 복잡한 추론, 멀티툴 |
| `kimi-k2.5` | `kimi-k2.5` | Vision, 문서 추출 |
| `claude-sonnet-4-6` | `claude-sonnet-4-6` | Fallback, 안정성 |

## 🔧 핵심 기술 스택

| 구성요소 | 기술 | 버전 |
|---------|------|------|
| 프레임워크 | FastAPI | 0.109.0 |
| ORM | SQLAlchemy | 2.0.25 |
| 데이터베이스 | PostgreSQL | 16 |
| 캐시 | Redis | 7 |
| HTTP 클라이언트 | httpx | 0.26.0 |
| 검증 | Pydantic | 2.6.0 |
| 로깅 | structlog | 24.1.0 |
| 재시도 | tenacity | 8.2.3 |
| 테스트 | pytest | 8.0.0 |

## 📊 모니터링

```bash
# Prometheus 메트릭
curl http://localhost:8000/metrics

# Grafana 대시보드 (기본 로그인: admin/admin)
open http://localhost:3000

# 상세 헬스체크
curl http://localhost:8000/health/detailed
```

## 🧪 테스트

```bash
# 단위 테스트
pytest tests/ -v

# 커버리지
pytest tests/ --cov=app --cov-report=html

# 특정 테스트
pytest tests/test_assist.py -v
```

## 📖 문서

- [개발 계획 v2.0](./docs/LIDER_DEVELOPMENT_PLAN.md) - 3회 교차검수 완료
- [아키텍처 설계](./docs/LIDER_ARCHITECTURE.md) - 시스템 구성요소 상세
- [API 명세 v2.0](./docs/LIDER_API_SPEC.md) - 엔드포인트 정의

## 🛣️ 로드맵

### Phase 1: MVP Core (현재)
- ✅ 핵심 API 엔드포인트 3개
- ✅ 모델 라우터 + Fallback
- ✅ 툴 게이트웨이
- ✅ 검증 파이프라인

### Phase 2: Expansion (예정)
- 🔄 커넥터 확장 (Salesforce, Jira, Notion)
- 🔄 운영 콘솔
- 🔄 평가 대시보드

### Phase 3: Enterprise (예정)
- 🔄 Private Cloud 배포
- 🔄 도메인 특화 파인튜닝
- 🔄 고급 보안 기능

## 🤝 기여

1. Fork 저장소
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 연락처

- **이슈/버그**: https://github.com/QETTA/Lider/issues
- **API 지원**: api-support@lider.ai

---

**Built with ❤️ by LIDER Team**