# LIDER Platform - 대규모 리팩토링 계획

## 🎯 리팩토링 목표

Clean Architecture 적용으로 유지보수성, 테스트 용이성, 확장성 향상

---

## 📋 식별된 레거시 문제점

### 1. 아키텍처 레벨
| 문제 | 영향도 | 설명 |
|------|--------|------|
| SRP 위반 | 높음 | database.py에 모델+DB설정+연결관리가 혼재 |
| Fat Controller | 높음 | routes/assist.py 200+ 라인, 비즈니스 로직 포함 |
| 설정 하드코딩 | 중간 | model_router.py에 비용/레이턴시 매트릭스 하드코딩 |
| 의존성 혼란 | 중간 | 순환 의존성 가능성, 명확한 레이어 분리 없음 |

### 2. 코드 품질
| 문제 | 위치 | 심각도 |
|------|------|--------|
| 에러 처리 불일치 | 전체 | 각 라우트마다 다른 에러 처리 방식 |
| 로깅 불일치 | 전체 | 일부는 structlog, 일부는 print |
| 타입 힌트 누락 | 일부 함수 | mypy strict 모드 실패 |
| 중복 코드 | routes/* | 공통 응답 포맷팅 중복 |

---

## 🏗️ 리팩토링 전략 (Clean Architecture)

### 새로운 디렉토리 구조
```
apps/api/
├── app/                    # 애플리케이션 레이어
│   ├── __init__.py
│   ├── main.py            # FastAPI 앱 진입점
│   ├── dependencies.py    # DI 컨테이너
│   └── lifespan.py        # lifespan 관리
├── domain/                # 도메인 레이어 (순수 비즈니스)
│   ├── __init__.py
│   ├── models/            # 도메인 모델 (Pydantic)
│   │   ├── session.py
│   │   ├── extraction.py
│   │   └── action.py
│   ├── services/          # 도메인 서비스
│   │   ├── ai_orchestrator.py
│   │   └── validation_service.py
│   └── exceptions.py      # 도메인 예외
├── infrastructure/         # 인프라 레이어
│   ├── __init__.py
│   ├── database/          # DB 관련
│   │   ├── __init__.py
│   │   ├── engine.py      # 엔진/세션 관리
│   │   └── models/        # SQLAlchemy ORM 모델
│   │       ├── base.py
│   │       ├── session.py
│   │       ├── request_log.py
│   │       └── ...
│   ├── cache/             # Redis 캐시
│   │   ├── __init__.py
│   │   └── redis_client.py
│   ├── ai_providers/      # AI 공급자 구현
│   │   ├── __init__.py
│   │   ├── base.py        # 추상 베이스
│   │   ├── moonshot.py
│   │   └── anthropic.py
│   └── config/            # 설정 관리
│       ├── __init__.py
│       ├── settings.py    # Pydantic Settings
│       └── model_config.py # 모델 설정
├── interface/             # 인터페이스 레이어 (API)
│   ├── __init__.py
│   ├── api/               # REST API
│   │   ├── __init__.py
│   │   ├── routes/        # 라우트 (얇게 유지)
│   │   │   ├── health.py
│   │   │   ├── sessions.py
│   │   │   └── ...
│   │   ├── schemas/       # Pydantic 스키마
│   │   └── dependencies.py # API 의존성
│   └── middleware/        # 미들웨어
│       ├── cors.py
│       ├── rate_limit.py
│       └── logging.py
├── core/                  # 공유 유틸리티 (유지하되 정리)
│   ├── exceptions.py      # 공통 예외
│   ├── logging.py         # 로깅 설정
│   └── utils/             # 순수 함수 유틸
├── tests/                 # 테스트
│   ├── unit/              # 단위 테스트
│   ├── integration/       # 통합 테스트
│   └── e2e/               # E2E 테스트
└── alembic/               # 마이그레이션 (유지)
```

---

## 📅 리팩토링 단계

### Phase 1: 인프라 레이어 분리 (Day 1-2)
- [x] 데이터베이스 모델 분리 (models/ 디렉토리)
- [x] 설정 관리 개선 (config/ 모듈화)
- [x] AI 공급자 추상화 (strategy pattern)
- [x] 캐시 클라이언트 리팩토링

### Phase 2: 도메인 레이어 구축 (Day 3-4)
- [x] 도메인 모델 정의 (Pydantic)
- [x] AI 오케스트레이터 서비스
- [x] 검증 서비스 추상화
- [x] 도메인 예외 정의

### Phase 3: 인터페이스 레이어 정리 (Day 5-6)
- [x] 라우트 슬림화 (비즈니스 로직 제거)
- [x] 공통 응답/에러 핸들러
- [x] 미들웨어 모듈화
- [x] 의존성 주입 개선

### Phase 4: 테스트 개선 (Day 7)
- [x] 단위 테스트 재작성
- [x] 통합 테스트 보강
- [x] Mock/Fixture 개선

---

## ✅ 성공 기준

1. **테스트 커버리지 80%+**
2. **mypy strict 모드 통과**
3. **ruff/pylint A등급**
4. **API 응답 시간 유지 또는 개선**
5. **모든 기존 테스트 통과**

---

## 🚀 실행 계획

각 Phase는 독립적이며, 단계별로 commit 및 PR 생성
