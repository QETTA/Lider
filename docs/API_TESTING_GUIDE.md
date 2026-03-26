# LIDER API Testing Guide

> **버전**: 1.0  
> **작성일**: 2026-03-26  
> **목적**: VisitSchedule + Notification API 검증

## 🧪 테스트 환경 구성

### Postman / Insomnia Collection

#### 1. 환경 변수 설정

```json
{
  "baseUrl": "http://localhost:3001/v1",
  "authToken": "your-jwt-token",
  "userId": "test-user-id",
  "recipientId": "test-recipient-id"
}
```

#### 2. 인증 헤더

```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

---

## 📋 VisitSchedule API Tests

### 1. 방문 일정 생성 (POST /care/visits)

**Request:**
```json
POST {{baseUrl}}/care/visits
{
  "recipientId": "{{recipientId}}",
  "scheduledDate": "2026-03-27T10:00:00Z",
  "scheduledTime": "2026-03-27T10:00:00Z",
  "estimatedDuration": 60,
  "visitType": "REGULAR",
  "notes": "정기 방문 - 건강 상태 확인"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "recipientId": "{{recipientId}}",
    "workerId": "{{userId}}",
    "scheduledDate": "2026-03-27T10:00:00Z",
    "status": "SCHEDULED",
    "visitType": "REGULAR",
    "createdAt": "2026-03-26T..."
  }
}
```

**Test Script:**
```javascript
// Response validation
pm.test("Status code is 201", () => {
  pm.response.to.have.status(201);
});

pm.test("Response has correct structure", () => {
  const json = pm.response.json();
  pm.expect(json.success).to.be.true;
  pm.expect(json.data).to.have.property('id');
  pm.expect(json.data.status).to.equal('SCHEDULED');
});

// Save visit ID for subsequent tests
const visitId = pm.response.json().data.id;
pm.environment.set("visitId", visitId);
```

### 2. 방문 일정 목록 조회 (GET /care/visits)

**Query Parameters:**
```
GET {{baseUrl}}/care/visits?status=SCHEDULED&from=2026-03-27&to=2026-03-28
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "visits": [...],
    "total": 10,
    "page": 1,
    "limit": 20
  }
}
```

### 3. 방문 상세 조회 (GET /care/visits/:id)

```
GET {{baseUrl}}/care/visits/{{visitId}}
```

### 4. 방문 수정 (PATCH /care/visits/:id)

```json
PATCH {{baseUrl}}/care/visits/{{visitId}}
{
  "notes": "Updated notes",
  "estimatedDuration": 90
}
```

### 5. 방문 시작 (POST /care/visits/:id/start)

```json
POST {{baseUrl}}/care/visits/{{visitId}}/start
{
  "actualStartTime": "2026-03-27T10:05:00Z",
  "latitude": 37.5665,
  "longitude": 126.9780
}
```

**Expected Status Change:**
- `SCHEDULED` → `IN_PROGRESS`

### 6. 방문 완료 (POST /care/visits/:id/complete)

```json
POST {{baseUrl}}/care/visits/{{visitId}}/complete
{
  "actualEndTime": "2026-03-27T11:00:00Z",
  "latitude": 37.5665,
  "longitude": 126.9780,
  "careRecord": {
    "condition": "건강 상태 양호",
    "activities": ["식사", "복약"],
    "specialNotes": "특이사항 없음"
  }
}
```

### 7. 방문 취소 (POST /care/visits/:id/cancel)

```json
POST {{baseUrl}}/care/visits/{{visitId}}/cancel
{
  "reason": "어르신 부재"
}
```

### 8. 방문 삭제 (DELETE /care/visits/:id)

```
DELETE {{baseUrl}}/care/visits/{{visitId}}
```

---

## 📬 Notification API Tests

### 1. 알림 목록 조회 (GET /notifications)

```
GET {{baseUrl}}/notifications?unreadOnly=true&limit=10
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "VISIT_REMINDER",
        "title": "방문 예정 알림",
        "message": "...",
        "isRead": false,
        "priority": "NORMAL",
        "createdAt": "2026-03-26T..."
      }
    ],
    "unreadCount": 3,
    "hasMore": false
  }
}
```

### 2. 읽지 않은 알림 개수 (GET /notifications/unread-count)

```
GET {{baseUrl}}/notifications/unread-count
```

### 3. 알림 읽음 처리 (PATCH /notifications/:id/read)

```
PATCH {{baseUrl}}/notifications/{{notificationId}}/read
```

### 4. 모두 읽음 처리 (POST /notifications/read-all)

```
POST {{baseUrl}}/notifications/read-all
```

### 5. 알림 삭제 (DELETE /notifications/:id)

```
DELETE {{baseUrl}}/notifications/{{notificationId}}
```

### 6. 수동 알림 생성 (POST /notifications - Admin only)

```json
POST {{baseUrl}}/notifications
{
  "userId": "{{userId}}",
  "type": "SYSTEM_NOTICE",
  "title": "시스템 점검 안내",
  "message": "3월 28일 02:00-04:00 시스템 점검이 예정되어 있습니다.",
  "priority": "HIGH"
}
```

---

## 🔄 통합 테스트 시나리오

### 시나리오 1: 완전한 방문 흐름

```
1. POST /care/visits → 방문 생성
2. GET /care/visits/:id → 생성 확인
3. POST /care/visits/:id/start → 방문 시작
4. GET /care/visits/:id → 상태 IN_PROGRESS 확인
5. POST /care/visits/:id/complete → 방문 완료
6. GET /notifications → 완료 알림 확인
```

### 시나리오 2: 알림 생성 및 확인

```
1. POST /care/visits → 35분 내 시작 예정 방문 생성
2. GET /notifications → VISIT_REMINDER 알림 자동 생성 확인
3. PATCH /notifications/:id/read → 알림 읽음 처리
4. GET /notifications/unread-count → 카운트 감소 확인
```

### 시나리오 3: 방문 지연 알림

```
1. POST /care/visits → 35분 전 이미 지난 시간으로 방문 생성
2. GET /notifications → VISIT_OVERDUE 알림 생성 확인
3. 알림 우선순위 HIGH 확인
```

---

## 🧪 자동화 테스트 스크립트 (Jest)

```typescript
// tests/integration/visitSchedule.test.ts
import request from 'supertest';
import { app } from '../../src/server';

describe('VisitSchedule API', () => {
  let authToken: string;
  let visitId: string;
  let recipientId: string;

  beforeAll(async () => {
    // Login and get token
    const login = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    authToken = login.body.data.token;
    recipientId = 'test-recipient-id';
  });

  describe('POST /v1/care/visits', () => {
    it('should create a new visit schedule', async () => {
      const res = await request(app)
        .post('/v1/care/visits')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          recipientId,
          scheduledDate: new Date(Date.now() + 3600000).toISOString(),
          visitType: 'REGULAR',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('SCHEDULED');
      visitId = res.body.data.id;
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/v1/care/visits')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe('POST /v1/care/visits/:id/start', () => {
    it('should start a visit', async () => {
      const res = await request(app)
        .post(`/v1/care/visits/${visitId}/start`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          latitude: 37.5665,
          longitude: 126.9780,
        });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('IN_PROGRESS');
    });
  });

  describe('Notification Integration', () => {
    it('should create reminder notification', async () => {
      // Create visit 30 minutes from now
      const futureVisit = await request(app)
        .post('/v1/care/visits')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          recipientId,
          scheduledDate: new Date(Date.now() + 30 * 60000).toISOString(),
        });

      // Trigger reminder job manually or wait for cron
      // Then check notifications
      const notifications = await request(app)
        .get('/v1/notifications?unreadOnly=true')
        .set('Authorization', `Bearer ${authToken}`);

      expect(notifications.body.data.notifications).toContainEqual(
        expect.objectContaining({
          type: 'VISIT_REMINDER',
        })
      );
    });
  });
});
```

---

## 🔍 에러 케이스 테스트

| 케이스 | 요청 | 예상 응답 |
|--------|------|----------|
| 인증 없음 | Any | 401 Unauthorized |
| 권한 없음 | DELETE others' visit | 403 Forbidden |
| 존재하지 않음 | GET /visits/invalid-id | 404 Not Found |
| 유효성 실패 | POST /visits (no date) | 400 Bad Request |
| 중복 시작 | POST /visits/:id/start twice | 409 Conflict |
| 이미 완료 | POST /visits/:id/complete on completed | 409 Conflict |

---

## 📊 성능 테스트 (k6)

```javascript
// tests/performance/visit-api.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // Ramp up
    { duration: '3m', target: 100 }, // Stay at 100
    { duration: '1m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% < 200ms
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/v1/care/visits`, {
    headers: {
      Authorization: `Bearer ${__ENV.AUTH_TOKEN}`,
    },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

실행:
```bash
k6 run -e BASE_URL=http://localhost:3001 -e AUTH_TOKEN=xxx tests/performance/visit-api.js
```

---

## ✅ 체크리스트

### Phase 1 API 테스트 완료 기준

- [ ] VisitSchedule CRUD 모든 엔드포인트 테스트 통과
- [ ] Notification 목록/읽음/삭제 테스트 통과
- [ ] start/complete 상태 전환 테스트 통과
- [ ] 오류 케이스 테스트 통과
- [ ] 인증/권한 검증 테스트 통과
- [ ] 성능 테스트 (p95 < 200ms) 통과
- [ ] 동시성 테스트 (동일 자원 동시 수정) 통과
