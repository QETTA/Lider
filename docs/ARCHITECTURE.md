# 요양레이다 (Yoyang Radar) 시스템 아키텍처

> **프로젝트**: 요양레이다 - 장기요양기관 운영·평가 통합 관리 SaaS  
> **버전**: v1.0  
> **작성일**: 2026-03-26  
> **기준**: 현재 저장소 구현 상태 기준으로 갱신

---

## 1. 개요

요양레이다는 장기요양기관이 문서 추출, 모바일 기록, 상담 초안, 공공데이터 조회, EMR 연동을 한 화면에서 다루도록 설계된 운영·평가 통합 플랫폼입니다. 현재 저장소는 `frontend`와 `backend`가 분리된 TypeScript 기반 모노레포 구조이며, 초기 MVP 단계에서는 일부 화면이 목업 데이터와 실제 API 연동을 함께 사용합니다.

---

## 2. 핵심 설계 원칙

| 원칙 | 설명 |
|------|------|
| **Non-replacement** | 기존 업무 흐름을 전면 교체하지 않고, 보완형 운영 도구로 사용 |
| **Zero-install** | 웹 기반, 별도 설치 없이 브라우저에서 사용 |
| **Hybrid automation** | 규칙 기반 운영 로직과 Kimi AI 보조 기능을 함께 사용 |
| **Integration-ready** | 공공데이터, EMR, 파일 업로드 등 외부 연동을 점진적으로 연결 |
| **Audit-friendly** | 처리 이력 추적, 문서 상태 관리, 운영 점검에 유리한 구조 유지 |

---

## 3. 시스템 아키텍처

```
┌───────────────────────────────────────────────────────────────┐
│                         Frontend (Vite + React)              │
│  - Dashboard2026 / Mobile Entry / Documents / Consultation   │
│  - Tailwind 기반 UI + 일부 목업 데이터 + 상태 표시 위젯       │
└──────────────────────────────┬────────────────────────────────┘
                               │ HTTP / JSON
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                     Backend API (Fastify)                    │
│  - /v1/health            : 헬스/레디니스 체크                 │
│  - /v1/extract           : 문서 업로드/AI 추출               │
│  - /v1/public-data       : 공공데이터 조회                    │
│  - /v1/ai                : Kimi 기반 초안/추출               │
│  - /v1/emr               : FHIR/HL7 EMR 연동                 │
└──────────────────────────────┬────────────────────────────────┘
                               │ Prisma
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                    PostgreSQL + File Storage                 │
│  - 수급자 / 문서 / 평가 / 기록 / 상담 / 캐시                  │
│  - 업로드 파일은 로컬 uploads 또는 외부 스토리지로 확장 가능  │
└───────────────────────────────────────────────────────────────┘
```

---

## 4. 기술 스택

### 백엔드
| 구성요소 | 기술 | 버전 | 용도 |
|----------|------|------|------|
| Framework | Fastify | 4.28+ | API 서버 |
| Runtime | Node.js | 18+ | 실행 환경 |
| Language | TypeScript | 5.6+ | 타입 안정성 |
| Database | PostgreSQL | 15+ | 메인 데이터베이스 |
| ORM | Prisma | 5.20+ | 스키마/DB 접근 |
| Auth | JWT (@fastify/jwt) | 8+ | 인증/인가 |
| Docs | Swagger / OpenAPI | 8+ / 4+ | API 문서 |
| Upload | @fastify/multipart | 8+ | 문서 업로드 |

### 프론트엔드
| 구성요소 | 기술 | 버전 | 용도 |
|----------|------|------|------|
| Framework | React | 18+ | UI 라이브러리 |
| Language | TypeScript | 5.3+ | 타입 안정성 |
| Build Tool | Vite | 5+ | 빌드 도구 |
| Styling | TailwindCSS | 3.4+ | 스타일링 |
| Icons | lucide-react | 0.294+ | 아이콘 시스템 |
| Charts | Recharts | 2.10+ | 시각화 |
| Router | react-router-dom | 6.20+ | 페이지 라우팅 |

### 인프라
| 구성요소 | 기술 | 용도 |
|----------|------|------|
| Container | Docker | 컨테이너화 |
| Orchestration | Docker Compose | 로컬 개발/배포 |
| Reverse Proxy | 프론트 컨테이너 내 정적 서빙 | 선택적 배포 |
| External APIs | 공공데이터 / Kimi / EMR | 대외 연동 |

---

## 5. 핵심 데이터 모델

### 기관 (Institution)
```python
class Institution:
    id: UUID
    name: str                    # 기관명
    code: str                    # 요양기관번호
    type: InstitutionType        # [VISITING_CARE, DAY_CARE, VISITING_NURSING, ...]
    address: str
    phone: str
    manager_name: str          # 담당자명
    manager_contact: str
    created_at: datetime
    updated_at: datetime
```

### 업로드 데이터 (UploadedData)
```python
class UploadedData:
    id: UUID
    institution_id: UUID
    upload_type: UploadType    # [RECIPIENT, CLAIM, SCHEDULE, ...]
    file_name: str
    file_size: int
    row_count: int
    mapping_config: JSON       # 컬럼 매핑 정보
    raw_data: JSON             # 파싱된 원본 데이터
    processed_at: datetime
    status: ProcessingStatus   # [PENDING, PROCESSING, COMPLETED, ERROR]
```

### 분석 결과 (AnalysisResult)
```python
class AnalysisResult:
    id: UUID
    institution_id: UUID
    analysis_type: AnalysisType  # [MISSING_CLAIM, ALLOWANCE, EVALUATION, ...]
    result_data: JSON            # 분석 결과 상세
    severity: Severity           # [INFO, WARNING, CRITICAL]
    detected_at: datetime
    resolved_at: datetime        # null if unresolved
    notes: str                   # 조치 내용
```

---

## 6. 핵심 서비스 로직

### 6.1 데이터 업로드 파이프라인
```
[CSV/Excel 업로드] → [파싱] → [컬럼 매핑] → [데이터 검증]
                              ↓
                    [규칙 엔진] → [이상 탐지] → [알림 생성]
                              ↓
                    [대시보드 반영] → [보고서 생성]
```

### 6.2 청구누락 탐지 규칙 예시
```python
rules = [
    {
        "name": "월 한도 미활용",
        "condition": "monthly_limit - used_amount > threshold",
        "severity": "WARNING"
    },
    {
        "name": "가산 누락",
        "condition": "eligible_allowance == True AND applied == False",
        "severity": "CRITICAL"
    },
    {
        "name": "청구 예외",
        "condition": "exception_code IS NOT NULL AND processed == False",
        "severity": "WARNING"
    }
]
```

---

## 7. MVP 범위 (예비창업패키지 1단계)

### 개발 일정 (2026.06 ~ 2027.01)

| 단계 | 기간 | 산출물 |
|------|------|--------|
| **1단계: 설계** | 6월 ~ 7월 | 데이터 구조, 기능 정의, UI 설계 |
| **2단계: MVP 개발** | 7월 ~ 9월 | 업로드, 청구누락, 평가, 일정 관리 기능 |
| **3단계: 파일럿** | 10월 ~ 12월 | 2개 기관 시범운영, 피드백 반영 |
| **4단계: 검증** | 2027.01 | 보고서 정리, 유료 전환 가능성 검증 |

### MVP 기능 목록
- [x] 기관 등록/관리
- [x] CSV/Excel 업로드 (데이터 매핑 UI)
- [x] 홈 대시보드 (위험도 요약)
- [x] 청구누락 점검 (월한도, 가산, 예외)
- [x] 평가 체크리스트 (지정갱신 대응)
- [x] 운영 일정 관리 (상담, 보호자응대)
- [x] 관리 보고서 자동 생성
- [x] 사용자 권한 관리 (기관장/실무자)

---

## 8. 보안 및 개인정보 설계

### 데이터 보호
- 업로드 파일 암호화 저장 (AES-256)
- 데이터베이스 필드별 암호화 (민감정보)
- HTTPS/TLS 1.3 적용

### 접근 제어
- RBAC (Role-Based Access Control)
- 기관별 데이터 격리
- 접근 로그 감사

### 개인정보 처리
- 개인정보 처리방침 명시
- 위수탁 계약 템플릿 제공
- 데이터 보유기간 설정 기능

---

## 9. 배포 아키텍처

### 개발 환경
```yaml
# docker-compose.dev.yml
services:
  api:
    build: ./backend
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    
  web:
    build: ./frontend
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"
      
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: yoyangradar
      
  redis:
    image: redis:7
```

### 프로덕션 환경
- ECS/Fargate 또는 EKS (컨테이너 오케스트레이션)
- RDS PostgreSQL (관리형 데이터베이스)
- ElastiCache Redis (캐시)
- S3 (파일 저장)
- CloudFront (CDN)

---

## 10. 성공 지표 (KPI)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 파일럿 성공률 | 100% (2/2) | 기관 운영 개선 확인 |
| 데이터 업로드 성공률 | 95%+ | 업로드 오류 < 5% |
| 탐지 정확도 | 90%+ | FP/FN 비율 |
| 사용자 만족도 | 4.0/5.0+ | 설문조사 |
| 유료 전환 의향 | 50%+ | 인터뷰/설문 |

---

**다음 단계**: 기술 스택 선정 및 MVP 개발 시작
