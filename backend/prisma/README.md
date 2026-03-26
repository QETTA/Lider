# LIDER Prisma Database Schema

## 🗄️ 데이터베이스 구조

이 디렉토리는 LIDER 플랫폼의 데이터베이스 스키마를 관리합니다.

## 🚀 시작하기

### 1. 환경 변수 설정

```bash
cp ../.env.example ../.env
# .env 파일에 DATABASE_URL 설정
```

### 2. 의존성 설치

```bash
npm install prisma @prisma/client
npm install -D @types/node
```

### 3. 데이터베이스 마이그레이션

```bash
# 개발 환경 - 마이그레이션 생성 및 적용
npx prisma migrate dev --name init

# 프로덕션 - 마이그레이션 적용만
npx prisma migrate deploy
```

### 4. Prisma Client 생성

```bash
npx prisma generate
```

### 5. 데이터베이스 탐색 (선택)

```bash
npx prisma studio
```

## 📊 스키마 구조

### 핵심 모델

```
User
├── VisitSchedule[] (방문 일정)
├── Notification[] (알림)
└── CareRecord[] (케어 기록)

Recipient (어르신/수급자)
├── VisitSchedule[]
├── CareRecord[]
└── Document[]

VisitSchedule (방문 일정) [신규]
├── recipient: Recipient
├── worker: User
├── notifications: Notification[]
└── careRecord?: CareRecord

Notification (알림) [신규]
├── user: User
└── visitSchedule?: VisitSchedule
```

## 🔍 인덱스 전략

성능 최적화를 위한 주요 인덱스:

| 테이블 | 인덱스 | 용도 |
|--------|--------|------|
| visit_schedules | `[scheduledDate, status]` | 대시보드 조회 |
| visit_schedules | `[workerId, scheduledDate]` | 근무자 일정 조회 |
| notifications | `[userId, isRead]` | 읽지 않은 알림 카운트 |
| notifications | `[scheduledFor]` | 예약 발송 쿼리 |
| care_records | `[recipientId, recordDate]` | 어르신 기록 조회 |

## 🔄 마이그레이션 워크플로우

### 개발 환경

```bash
# 스키마 수정 후
npx prisma migrate dev --name descriptive_name
npx prisma generate
```

### 프로덕션 환경

```bash
# CI/CD 파이프라인에서
npx prisma migrate deploy
npx prisma generate
```

### 데이터베이스 리셋 (주의!)

```bash
# 개발 환경에서만 사용
npx prisma migrate reset
```

## 🧪 시드 데이터

```bash
# 시드 스크립트 실행
npx prisma db seed
```

## 📝 pgvector 확장 (Phase 3)

Vector Search 활성화 시 PostgreSQL pgvector 확장 필요:

```sql
-- 마이그레이션 SQL에 추가
CREATE EXTENSION IF NOT EXISTS vector;

-- 벡터 인덱스 생성
CREATE INDEX ON document_embeddings 
USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);
```

## 📚 Prisma Client 사용 예시

```typescript
import { PrismaClient, NotificationType, VisitStatus } from './generated/client';

const prisma = new PrismaClient();

// 방문 일정 조회
const visits = await prisma.visitSchedule.findMany({
  where: {
    workerId: 'user-id',
    status: 'SCHEDULED' as VisitStatus,
    scheduledDate: {
      gte: new Date(),
    },
  },
  include: {
    recipient: true,
  },
});

// 알림 생성
const notification = await prisma.notification.create({
  data: {
    userId: 'user-id',
    type: 'VISIT_REMINDER' as NotificationType,
    title: '방문 예정',
    message: '30분 후 방문이 예정되어 있습니다.',
    priority: 'NORMAL',
  },
});
```

## 🐛 트러블슈팅

### 마이그레이션 충돌

```bash
# 마이그레이션 상태 확인
npx prisma migrate status

# 마이그레이션 해결
npx prisma migrate resolve --applied <migration-name>
```

### 타입 생성 실패

```bash
# client 강제 재생성
npx prisma generate --force
```

## 📖 참고 문서

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
