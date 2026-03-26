# LIDER 다음 단계 지능형 실행계획 v2.0

> **작성일**: 2026-03-26  
> **상태**: 설계 완료 → Phase 1 구현 시작  
> **목표**: DB 스키마 기반 고도화 및 프로덕션 준비

---

## 📊 현재 상태 요약

```
[✅ 완료] VisitSchedule API + Notification Service (Backend)
[✅ 완료] AI Chat UI (Frontend)  
[✅ 완료] ModelRouter + ToolGateway + EvalService
[⚠️ 미완료] Prisma Schema (존재하지 않음)
[⚠️ 미완료] 실제 알림 발송 연동 (Push/Email/SMS Placeholder)
[⚠️ 미완료] Vector Search (Placeholder 상태)
[⚠️ 미완료] TypeScript 타입 안전성 검증
```

---

## 🎯 Phase 1: 데이터 기반 구조화 (Week 1-2)

### 목표
데이터베이스 스키마 정의 → 마이그레이션 → 타입 안전성 확보

### 작업 항목

| 우선순위 | 작업 | 설명 | 예상 소요시간 |
|---------|------|------|-------------|
| P0 | Prisma Schema 작성 | VisitSchedule + Notification + 관계 정의 | 4h |
| P0 | 마이그레이션 실행 | `prisma migrate dev` → DB 스키마 적용 | 1h |
| P0 | 타입 정의 생성 | `prisma generate`로 타입스크립트 타입 생성 | 0.5h |
| P1 | API 테스트 환경 구축 | Postman/Insomnia Collection 생성 | 3h |
| P1 | 통합 테스트 작성 | Jest 기반 VisitSchedule + Notification 테스트 | 4h |
| P2 | 타입 안전성 리팩토링 | `any` → `PrismaTypes`로 변경 | 3h |

### 핵심 산출물
```prisma
// schema.prisma 핵심 모델
model VisitSchedule {
  id              String   @id @default(uuid())
  recipientId     String
  workerId        String
  scheduledDate   DateTime
  scheduledTime   DateTime?
  estimatedDuration Int    @default(60)
  status          VisitStatus @default(SCHEDULED)
  visitType       VisitType @default(REGULAR)
  notes           String?
  actualStartTime DateTime?
  actualEndTime   DateTime?
  cancellationReason String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  recipient       Recipient @relation(fields: [recipientId], references: [id])
  worker          User      @relation(fields: [workerId], references: [id])
  notifications   Notification[]
}

model Notification {
  id                String   @id @default(uuid())
  userId            String
  type              NotificationType
  title             String
  message           String
  priority          Priority @default(NORMAL)
  isRead            Boolean  @default(false)
  readAt            DateTime?
  channels          Json     @default("{}")
  relatedEntityType String?
  relatedEntityId   String?
  scheduledFor      DateTime?
  createdAt         DateTime @default(now())
  
  user              User     @relation(fields: [userId], references: [id])
}
```

---

## 🔔 Phase 2: 알림 시스템 프로덕션화 (Week 3-4)

### 목표
Placeholder → 실제 멀티채널 연동 + 자동화 스케줄링

### 작업 항목

| 우선순위 | 작업 | 기술 스택 | 검증 기준 |
|---------|------|----------|----------|
| P0 | Push 알림 연동 | Firebase Cloud Messaging | Android/iOS 수신 확인 |
| P0 | Email 알림 연동 | SendGrid / AWS SES | 실제 메일 수신 확인 |
| P0 | SMS 알림 연동 | Naver Cloud SMS / Twilio | 실제 SMS 수신 확인 |
| P1 | Cron Scheduler 구축 | node-cron / node-schedule | 1분마다 알림 생성 확인 |
| P1 | 알림 큐 시스템 | Bull (Redis) + Worker | 1000개 동시 발송 테스트 |
| P2 | 알림 템플릿 시스템 | Handlebars / EJS | 다국어 지원 구조 |
| P2 | 발송 실패 재시도 | Exponential Backoff | 최대 3회 재시도 로직 |

### 연동 아키텍처
```
┌─────────────────┐     ┌─────────────┐     ┌─────────────────┐
│  VisitSchedule  │────▶│  Cron Job   │────▶│  Notification   │
│     Service     │     │  (1분 단위)  │     │    Creator      │
└─────────────────┘     └─────────────┘     └────────┬────────┘
                                                     │
                           ┌─────────────────────────┼─────────────────────────┐
                           ▼                         ▼                         ▼
                   ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
                   │ FCM Push     │        │ SendGrid     │        │ Twilio/Naver │
                   │ (실시간)     │        │ (Email)      │        │ (SMS)        │
                   └──────────────┘        └──────────────┘        └──────────────┘
```

### 환경 변수 설정
```bash
# .env
# Push Notifications
FIREBASE_PROJECT_ID=lider-care
FIREBASE_PRIVATE_KEY_PATH=/secrets/firebase.json

# Email
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@lider.ai

# SMS
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+8210xxxx
NAVER_CLOUD_SMS_SERVICE_ID=ncp:sms:kr:xxx
```

---

## 🤖 Phase 3: AI 고도화 - Vector Search 활성화 (Week 5-6)

### 목표
키워드 검색 → 의미 기반 벡터 검색으로 고도화

### 작업 항목

| 단계 | 작업 | 기술 옵션 | 선택 기준 |
|-----|------|----------|----------|
| 1 | Embedding 생성 | OpenAI text-embedding-3-small | 비용 효율 + 한국어 성능 |
| 2 | Vector DB 선택 | Pinecone / pgvector / Weaviate | Postgres 통합 → pgvector 선호 |
| 3 | 문서 임베딩 파이프라인 | 문서 업로드 시 자동 임베딩 | 비동기 큐 처리 |
| 4 | 하이브리드 검색 | Keyword + Vector + Reranking | Elasticsearch + Vector DB |
| 5 | RAG 파이프라인 | 검색 결과 → AI 컨텍스트 | Kimi/Claude 연동 |

### pgvector 구현 (권장)
```sql
-- PostgreSQL Extension
CREATE EXTENSION vector;

-- Embeddings Table
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id),
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 유사도 검색 인덱스
CREATE INDEX ON document_embeddings 
USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- 유사도 검색 쿼리
SELECT 
  document_id,
  content,
  1 - (embedding <=> query_embedding) AS similarity
FROM document_embeddings
WHERE 1 - (embedding <=> query_embedding) > 0.8
ORDER BY similarity DESC
LIMIT 10;
```

### AI Search 통합 흐름
```
User Query → Embedding 생성 → Vector Search → 
Context 조합 → Kimi/Claude RAG → 답변 생성
```

---

## 🎨 Phase 4: UI/UX 디자인 고도화 (Week 7-8)

### 목표
기능 중심 → 사용자 경험 중심 인터페이스 개선

### 작업 항목

| 영역 | 개선 사항 | 기대 효과 |
|-----|----------|----------|
| **알림 센터** | 실시간 토스트 알림 + 알림 히스토리 | 90% 알림 확인율 |
| **방문 일정** | 캘린더 뷰 + 지도 통합 + 일괄 등록 | 50% 등록 시간 단축 |
| **AI 어시스턴트** | 음성 입력 + 컨텍스트 기반 추천 | 40% 문서 처리 시간 단축 |
| **모바일 최적화** | PWA + 오프라인 동기화 | 현장 사용성 향상 |
| **접근성** | WCAG 2.1 AA 준수 | 장애인 접근성 확보 |

### 디자인 시스템 확장
```typescript
// 디자인 토큰 확장
export const semanticTokens = {
  notification: {
    urgent: { bg: 'red.50', border: 'red.500', icon: 'AlertCircle' },
    high: { bg: 'orange.50', border: 'orange.500', icon: 'Bell' },
    normal: { bg: 'blue.50', border: 'blue.500', icon: 'Info' },
    low: { bg: 'gray.50', border: 'gray.500', icon: 'Check' },
  },
  visitStatus: {
    scheduled: { color: 'blue', pulse: true },
    inProgress: { color: 'green', pulse: true },
    completed: { color: 'gray', pulse: false },
    overdue: { color: 'red', pulse: true },
  }
};
```

---

## 📅 통합 실행 타임라인

```
Week 1-2: [Phase 1] DB + 테스트 + 타입 안전성
  ├── Day 1-2: Prisma Schema 설계
  ├── Day 3: 마이그레이션 실행
  ├── Day 4-5: API 테스트 환경 구축
  └── Day 6-10: 통합 테스트 + 타입 리팩토링

Week 3-4: [Phase 2] 알림 프로덕션화
  ├── Day 11-13: FCM Push 연동
  ├── Day 14-16: SendGrid Email 연동
  ├── Day 17-18: SMS 연동
  ├── Day 19-20: Cron 스케줄러 구축
  └── Day 21-24: 알림 큐 + 재시도 로직

Week 5-6: [Phase 3] Vector Search
  ├── Day 25-27: pgvector 설정 + Embedding 파이프라인
  ├── Day 28-30: 하이브리드 검색 구현
  └── Day 31-36: RAG 통합 + 성능 튜닝

Week 7-8: [Phase 4] UI/UX 개선
  ├── Day 37-40: 알림 센터 + 캘린더 개선
  ├── Day 41-44: AI 어시스턴트 고도화
  └── Day 45-48: PWA + 접근성 개선
```

---

## 🚦 리스크 완화 전략

| 리스크 | 확률 | 영향 | 완화 전략 |
|-------|------|------|----------|
| DB 마이그레이션 실패 | 중간 | 높음 | 백업 + 롤백 스크립트 준비 |
| 외부 알림 서비스 장애 | 높음 | 중간 | Circuit Breaker + Fallback |
| Vector Search 성능 이슈 | 중간 | 중간 | Hybrid Search Fallback |
| 모바일 호환성 문제 | 중간 | 중간 | iOS/Android 테스트 매트릭스 |

---

## ✅ 성공 기준 (Definition of Done)

### Phase 1 완료 기준
- [ ] `npx prisma migrate dev` 오류 없이 실행
- [ ] 모든 API 엔드포인트 테스트 통과 (Postman Collection)
- [ ] `any` 타입 사용 0건 (ESLint rule)
- [ ] 코드 커버리지 80% 이상

### Phase 2 완료 기준
- [ ] 실제 Push 알림 수신 확인 (Android + iOS)
- [ ] Email 발송 성공률 95% 이상
- [ ] Cron Job 99.9% 가동률
- [ ] 알림 발송 지연 < 1분

### Phase 3 완료 기준
- [ ] 검색 응답 시간 < 500ms (p95)
- [ ] 의미 유사도 정확도 > 85%
- [ ] RAG 답변 정확도 > 80% (Golden Set)

### Phase 4 완료 기준
- [ ] Lighthouse Performance > 90
- [ ] WCAG 2.1 AA 준수
- [ ] PWA 설치 가능

---

## 🔄 다음 단계 액션

**즉시 실행** (오늘):
1. `schema.prisma` 파일 생성
2. VisitSchedule + Notification 모델 정의
3. Prisma 마이그레이션 실행

**이번 주 내**:
1. API 테스트 Collection 생성
2. 환경 변수 설정 (Firebase, SendGrid, Twilio)
3. Cron Job 스케줄러 구현 시작

**결정 필요**:
1. Vector DB 선택: pgvector vs Pinecone (비용 분석)
2. SMS provider: Naver Cloud vs Twilio (국내 특화 vs 글로벌)
3. PWA 프레임워크: Workbox vs原生 Service Worker

---

**작성**: LIDER 개발팀  
**승인**: Technical Lead  
**다음 검토**: 2026-04-02 (1주 후)
