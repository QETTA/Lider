# LIDER AI 리팩토링 마스터 플랜

작성일: 2026-03-26

## 1. 이 문서의 목적

이 문서는 LIDER의 AI 기능을 어떤 방향으로 리팩토링해야 하는지, 그리고 최종 개발 설계 목표를 어디에 두어야 하는지를 흔들림 없이 고정하기 위한 기준 문서다.

이번 결정은 아래 세 축의 교차 검수를 바탕으로 한다.

- 사업계획서와 제품 정의 문서
- 현재 저장소의 실제 구현 상태
- 실제 사용자 실패 사례와 오동작 패턴

이 문서는 단순 아이디어 정리가 아니라 다음 세션과 이후 구현에서 그대로 따를 실행 기준이다.

함께 읽는 보조 문서:

- `CORE_RUNTIME_SETUP_2026-03-26.md`: 로컬/운영 세팅, env, smoke check
- `AI_EXECUTION_TICKETS_2026-03-26.md`: P0/P1/P2 실행 티켓
- `RAILWAY_FALLBACK_RUNBOOK.md`: 공개 AI fallback 부록

## 2. 최종 결론

LIDER의 핵심은 `범용 AI 비서`가 아니다.

LIDER의 제품 핵심은 아래다.

- 업로드된 데이터와 기록에서 운영 누락을 찾아낸다.
- 평가, 청구, 상담, 보호자 응대, 현장기록을 한 흐름으로 연결한다.
- 알림에서 끝나지 않고 담당자 확인, 처리 이력, 증빙 상태, 후속 일정까지 이어지게 만든다.

LIDER의 핵심 AI는 아래 3개다.

- `문서·기록 구조화 AI`
- `상담·현장기록 초안 AI`
- `운영 우선순위 브리핑 AI`

즉 제품의 중심은 `운영 누락 탐지 엔진`이고, AI는 그 위에서 `구조화`, `초안화`, `설명`, `브리핑`을 담당하는 보조 계층이다.

## 3. 교차 검수 근거

### 3.1 사업 문서 기준

사업계획서와 아키텍처 문서는 일관되게 아래를 약속한다.

- 기존 프로그램을 교체하지 않고 CSV/Excel 업로드 기반으로 운영 리스크를 점검한다.
- 청구예외, 가산 누락, 월 한도 미활용을 탐지한다.
- 평가, 지정갱신, 필수 증빙 누락을 관리한다.
- 상담 이력, 보호자 응대, 현장 기록 상태를 일정과 체크리스트로 연결한다.
- 범용 AI를 그대로 쓰지 않고 장기요양 문서 형식에 맞춘 초안 보조와 사용자 검수 흐름을 설계한다.

따라서 사업 문서가 말하는 AI의 역할은 `판정 주체`가 아니라 `특화된 보조 계층`이다.

### 3.2 현재 코드 기준

현재 저장소의 AI 구조는 아래에 가깝다.

- `/v1/ai/chat`: 범용 운영 질문 채팅
- `/v1/ai/analyze-file`: 첨부 파일 분석
- `/v1/ai/extract`: 문서 필드 추출
- `/v1/ai/consultation-draft`: 상담 초안 생성
- `/v1/ai/search`: 아직 mock 수준

문제는 실제 프론트 UX가 이 기능들을 `업무 플로우`로 묶지 못하고 있다는 점이다.

- `frontend/src/pages/AiAssistantPage.tsx` 는 첨부가 있으면 거의 바로 파일 분석으로 보낸다.
- `frontend/src/pages/Consultation.tsx` 는 실제 API보다 목업 초안 생성 비중이 크다.
- `frontend/src/pages/MobileEntry.tsx` 도 목업 AI 초안 흐름이 강하다.
- `frontend/src/pages/DocumentExtract.tsx` 와 `frontend/src/pages/Dashboard2026.tsx` 는 아직 실데이터보다 목업 데이터 비중이 크다.

즉 현재 구현은 `운영 AI`가 아니라 `범용 채팅 + 파일 분석 도우미`에 더 가깝다.

### 3.3 사용자 실패 사례 기준

실제 실패 사례는 다음 결론을 강화한다.

- 첨부 파일 변환 요청이 분석 응답으로 오분류됐다.
- 사용자는 산출물을 원했는데 긴 텍스트 분석이 반환됐다.
- 첨부 기반 분석에서 grounding, masking, 결과물 계약이 약했다.

이는 모델 품질보다 `의도 라우팅`, `실행 파이프라인`, `산출물 계약`의 문제다.

## 4. 방향 오류를 막기 위한 핵심 판단

### 4.1 제품 핵심과 AI 핵심을 분리한다

제품 핵심:

- 운영 누락 탐지
- 규칙 기반 판정
- 체크리스트와 후속조치 연결

AI 핵심:

- 문서와 기록을 구조화
- 장기요양 문맥에 맞는 초안 작성
- 규칙 결과를 실무 문장으로 설명

이 둘을 섞으면 제품이 `AI 채팅 앱`으로 흐르고, 실제 현장가치가 약해진다.

### 4.2 AI보다 먼저 실데이터 파이프라인을 세운다

다음 항목이 실데이터로 이어지지 않으면 AI 리팩토링은 반쪽짜리다.

- 문서 업로드 저장
- 문서 분석 결과 저장
- 문서 완전성 체크 결과 반영
- 상담 기록 생성 및 수정
- 현장 기록 저장
- 대시보드와 알림의 실제 데이터 연동

즉 이번 AI 리팩토링은 `대화 품질 개선`이 아니라 `운영 데이터 흐름 + 업무별 AI 삽입`으로 봐야 한다.

### 4.3 범용 어시스턴트는 보조 콘솔로 낮춘다

`/assistant` 페이지는 유지할 수 있지만 제품 중심축이 되어서는 안 된다.

우선순위는 아래와 같다.

- `Documents` 안의 문서 구조화/검수 AI
- `Consultation` 안의 상담 초안 AI
- `Mobile Entry` 안의 기록 초안 AI
- `Dashboard/Alerts` 안의 우선순위 브리핑 AI
- 마지막에만 `AI Helper` 보조 콘솔

## 5. 핵심 AI 기능 정의

### 5.1 문서·기록 구조화 AI

목적:

- 문서와 기록을 화면과 규칙 엔진이 바로 쓸 수 있는 구조로 바꾼다.

해야 할 일:

- DOCX, PDF, TXT, MD, 음성 전사본에서 필드 추출
- 추출 실패 필드와 누락 필드 표시
- 문서 타입별 검수 포인트 반환
- `confidence`, `missingFields`, `validationErrors`, `needsReview` 반환

운영 메모:

- 코어 문서 추출 워크플로에서는 PDF 지원을 목표로 한다.
- 다만 공개 `AI Helper` 첨부 정책은 same-origin 코어 추출 파이프라인이 안정화될 때까지 DOCX/TXT/MD 중심으로 제한할 수 있다.

출력 원칙:

- 자유문장만 반환하지 않는다.
- 반드시 구조화된 JSON을 반환한다.
- 근거가 약하면 `추정` 또는 `검수 필요`로 명시한다.

### 5.2 상담·현장기록 초안 AI

목적:

- 상담 메모, 음성 입력, 현장 빠른 입력을 장기요양 문맥에 맞는 초안으로 정리한다.

해야 할 일:

- 상담 요약
- 핵심 이슈 추출
- 권장 후속조치 제안
- 가족 관련 메모 분리
- 위기/후속 필요 여부 표시

출력 원칙:

- `summary`, `keyIssues`, `recommendedActions`, `followUpNeeded`, `riskFactors` 구조 유지
- 초안과 최종본을 구분 저장
- 사람이 수정했는지 `aiEdited` 또는 동등 필드로 추적

### 5.3 운영 우선순위 브리핑 AI

목적:

- 규칙 기반으로 잡힌 운영 리스크를 기관장과 실무자가 바로 이해할 수 있게 문장화한다.

해야 할 일:

- 오늘 가장 급한 3건 요약
- 이번 주 처리 건 브리핑
- 문서 누락, 평가 임박, 재계약 임박, 핸드오버 공백을 우선순위 순으로 정리
- 기관장 보고용 한 줄 버전과 실무자 액션 버전을 구분

출력 원칙:

- AI가 위험을 새로 판정하지 않는다.
- 규칙 엔진 또는 저장된 상태 결과를 입력으로 받는다.
- `왜 이 순서인지`를 짧게 설명한다.

### 5.4 아티팩트 변환 AI

이 기능은 필요하지만 핵심 1순위는 아니다.

역할:

- DOCX -> 구조화 표
- 표 -> XLSX
- 웹 미리보기 생성

주의:

- 첨부 파일 변환 요청을 분석 응답으로 오분류하지 않는다.
- 변환 작업은 자유 채팅이 아니라 실행 파이프라인으로 처리한다.

## 6. 리팩토링 제외 범위

아래는 지금 단계의 핵심 리팩토링 범위에서 제외한다.

- 범용 자유대화형 챗봇 고도화
- Vector DB 기반 통합검색 우선 개발
- 의료 판단형 AI
- 법률 확정 해석형 AI
- 자율 에이전트형 장기 실행 AI
- 디자인 리뉴얼 중심 작업

위 항목들은 나중에 붙일 수 있으나, 현재 제품 정의와 파일럿 성공 가능성 기준으로는 우선순위가 아니다.

## 6.1 코어 운영 AI와 공개 AI Helper의 경계

코어 운영 AI:

- 로그인 이후 운영 영역에서 사용한다.
- `Documents`, `Consultation`, `Mobile Entry`, `Dashboard/Alerts` 안에서 작동한다.
- 실데이터, 규칙 기반 판정, 검수 흐름을 전제로 한다.

공개 AI Helper:

- 유지할 수 있다.
- 다만 제품 중심축이 아니며 이번 리팩토링의 blocker도 아니다.
- 공개 채팅과 첨부 분석은 `legacy/public-assistant surface` 로 분류한다.
- 코어 운영 P0/P1 완료 전 공개 AI Helper 최적화를 우선하지 않는다.

핵심 원칙:

- 코어 운영 설계를 공개 AI Helper의 현재 API 모양에 끌려가게 두지 않는다.
- 공개 AI Helper는 후순위로 남기고, 인증된 운영 AI를 먼저 완성한다.

## 7. 최종 목표 아키텍처

최종 목표는 아래 구조다.

### 7.1 Layer 0. 데이터 입력과 저장

- 문서 업로드 저장
- CSV/Excel 업로드 저장
- 상담 기록 저장
- 현장 기록 저장
- 사용자/센터/수급자 단위 연관성 유지

### 7.2 Layer 1. 규칙 기반 운영 판정

- 청구예외
- 가산 누락
- 월 한도 미활용
- 평가/증빙 누락
- 재계약 임박
- 핸드오버 공백
- 후속 상담 지연

이 레이어가 LIDER의 제품 핵심이다.

### 7.3 Layer 2. 장기요양 특화 AI 보조

- 문서 구조화
- 상담/기록 초안
- 운영 우선순위 브리핑
- 보고용 문장 생성

이 레이어는 Layer 1 위에서만 작동해야 한다.

### 7.4 Layer 3. 업무 화면 통합

- `Documents`: 구조화, 완전성 체크, 검수
- `Consultation`: 초안 생성, 수정, 저장
- `Mobile Entry`: 음성/퀵탭 기반 기록 초안
- `Dashboard/Alerts`: 우선순위 브리핑과 실행 링크

### 7.5 Layer 4. 보조 콘솔

- `/assistant`
- 자유 질문
- 문장 다듬기
- 맥락 요약

이 레이어는 메인 진입점이 아니라 보조 진입점이다.

## 8. 최종 개발 설계 목표

이번 리팩토링의 최종 목표는 아래 6개를 만족하는 것이다.

1. 문서, 상담, 현장기록, 알림이 모두 실데이터로 저장된다.
2. 규칙 기반 판정 결과가 실제 대시보드와 알림에 반영된다.
3. AI 결과가 모든 화면에서 구조화된 출력으로 일관되게 제공된다.
4. AI 결과는 항상 검수 흐름과 함께 사용된다.
5. `/assistant` 없이도 핵심 업무 화면만으로 제품 가치가 드러난다.
6. 파일럿 기관 기준으로 “누락을 먼저 찾고 바로 조치한다”는 경험이 제품에서 확인된다.

## 9. 단계별 리팩토링 범위

### 9.1 P0. 운영 데이터 파이프라인 고정

목표:

- AI보다 먼저 실데이터와 실업무 흐름을 고정한다.

범위:

- `backend/src/routes/extract.ts`
- `backend/src/services/extractService.ts`
- `backend/src/routes/care.ts`
- `backend/src/routes/mobile.ts`
- `backend/prisma/schema.prisma`
- `frontend/src/pages/DocumentExtract.tsx`
- `frontend/src/pages/Consultation.tsx`
- `frontend/src/pages/MobileEntry.tsx`
- `frontend/src/pages/Dashboard2026.tsx`

해야 할 일:

- 문서 업로드 임시 응답 제거
- 문서 저장과 분석 결과 저장 연결
- 상담 생성/수정 실API 연결
- 모바일 기록 저장 실API 연결
- 대시보드와 알림을 목업에서 실제 API 기반으로 전환

### 9.2 P1. 업무별 AI 구조화

목표:

- AI를 자유 채팅이 아니라 업무별 구조화 결과로 전환한다.

범위:

- `backend/src/routes/ai.ts`
- `backend/src/services/aiService.ts`
- `frontend/src/pages/Consultation.tsx`
- `frontend/src/pages/DocumentExtract.tsx`
- `frontend/src/pages/MobileEntry.tsx`
- `frontend/src/pages/Dashboard2026.tsx`

해야 할 일:

- `chat`와 `analyze-file`를 넓은 자유응답 API로 두지 않는다.
- 태스크 성격별 typed response를 도입한다.
- 화면별 AI 요청 함수를 분리한다.
- `evidence`, `confidence`, `needsReview` 필드를 공통으로 둔다.

### 9.3 P2. 보조 AI Helper 정리

목표:

- `/assistant`를 제품 중심이 아니라 보조 콘솔로 재정리한다.

범위:

- `frontend/src/pages/AiAssistantPage.tsx`
- 필요 시 `worker/index.ts`

해야 할 일:

- 의도 라우팅 추가
- 첨부 분석과 변환 요청 분리
- 실패 시 분석으로 새지 않도록 계약 정리

## 10. API 설계 기준

### 10.0 책임 분리 원칙

- `/v1/extract/*` 는 `문서 저장`, `문서 추출`, `완전성 체크` 전용이다.
- `/v1/care/*` 는 `상담 기록`, `현장 기록`, `수정/조회` 전용이다.
- `/v1/mobile/*` 은 `현장 입력`, `음성 -> 초안`, `모바일 저장 흐름` 전용이다.
- `/v1/ai/*` 는 `초안 생성`, `브리핑`, `보조 생성` 전용이다.

중요:

- `/v1/ai/*` 는 제품 핵심 데이터 저장 API를 대신하지 않는다.
- 저장은 `extract`, `care`, `mobile` 계열에서 수행하고, AI는 그 위에 구조화/초안/설명을 덧붙인다.

### 10.1 유지 또는 강화할 API

- `POST /v1/ai/extract`
- `POST /v1/ai/consultation-draft`
- `GET /v1/extract/completeness/:recipientId`
- `POST /v1/mobile/voice-to-draft`

### 10.2 재설계 대상 API

- `POST /v1/ai/chat`
- `POST /v1/ai/analyze-file`

재설계 방향:

- 화면 맥락 없는 범용 요청을 줄인다.
- `taskType` 또는 태스크별 명시 엔드포인트를 도입한다.
- 응답은 아래 공통 구조를 우선한다.

```json
{
  "summary": "",
  "issues": [],
  "actions": [],
  "evidence": [],
  "confidence": 0,
  "needsReview": true,
  "artifacts": []
}
```

### 10.3 코어 응답 계약

문서 구조화:

```json
{
  "summary": "",
  "issues": [],
  "actions": [],
  "evidence": [],
  "confidence": 0,
  "needsReview": true,
  "artifacts": [],
  "documentType": "",
  "missingFields": [],
  "validationErrors": []
}
```

상담/현장기록 초안:

```json
{
  "summary": "",
  "issues": [],
  "actions": [],
  "evidence": [],
  "confidence": 0,
  "needsReview": true,
  "artifacts": [],
  "keyIssues": [],
  "recommendedActions": [],
  "followUpNeeded": false,
  "riskFactors": []
}
```

운영 브리핑:

```json
{
  "summary": "",
  "issues": [],
  "actions": [],
  "evidence": [],
  "confidence": 0,
  "needsReview": false,
  "artifacts": [],
  "priorityItems": [],
  "managerBrief": "",
  "operatorActions": []
}
```

## 11. 데이터 모델 설계 기준

### 11.1 유지 방향

- `Document`
- `Consultation`
- `CareRecord`
- `Evaluation`

이 모델들은 AI 기능의 부속 모델이 아니라 제품 핵심 모델이다.

### 11.2 추가 또는 보강 필요 항목

- 문서/초안별 `reviewStatus`
- AI 결과 근거 저장 필드 또는 별도 `evidence` 구조
- 브리핑 결과 저장이 필요하면 lightweight 캐시 모델 또는 계산형 응답 우선
- 알림과 액션아이템 연동 강화

### 11.3 중요한 원칙

- AI 결과는 가능하면 본문 전체를 덮어쓰지 않는다.
- 원문, AI 초안, 최종 수정본을 구분한다.
- 누가 승인했는지와 언제 수정했는지를 남긴다.

## 12. 세팅과 환경 변수

### 12.1 Backend

필수:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `HOST`

실운영 권장:

- `JWT_EXPIRES_IN`
- `CORS_ORIGINS`
- `LOG_LEVEL`
- `PUBLIC_DATA_API_KEY`
- `PUBLIC_DATA_BASE_URL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_BASE_URL`
- `ANTHROPIC_MODEL`
- `KIMI_API_KEY`
- `KIMI_BASE_URL`
- `NODE_ENV`

### 12.2 Frontend

로컬 개발:

- `VITE_API_BASE_URL=http://localhost:3001`
- `VITE_DEMO_SYSTEM_STATUS=false`

운영 배포:

- `VITE_API_BASE_URL=` 비워 same-origin Worker 기준으로 사용

### 12.3 Worker

코어 API same-origin 프록시용:

- `CORE_API_BASE_URL`
- `CORE_API_SHARED_SECRET` optional

공개 AI fallback 유지 시:

- `AI_PROXY_BASE_URL`
- `AI_PROXY_SHARED_SECRET`
- `ANTHROPIC_MODEL=claude-sonnet-4-6`

### 12.4 세팅 원칙

- 인증, 상태판, 온보딩, 문서, 상담, 모바일 API는 같은 origin으로 접근 가능해야 한다.
- 운영에서 `VITE_API_BASE_URL` 대신 Worker 프록시를 기준으로 삼는다.
- AI fallback 세팅과 코어 API 프록시 세팅을 혼동하지 않는다.

## 13. 검증 기준

### 13.1 제품 검증

- 문서 업로드 후 저장 ID가 실제 DB 기준으로 반환된다.
- 문서 분석 결과와 검수 상태가 새로고침 후 유지된다.
- 상담 초안 생성 후 수정본과 최종본이 분리 저장된다.
- 모바일 기록 저장 후 대시보드와 대상자 상세에 반영된다.
- 규칙 기반 누락 결과가 문서 보드와 알림에 일관되게 나타난다.

### 13.2 AI 검증

- 문서 구조화 AI가 자유문장만 반환하지 않는다.
- 상담 AI가 장기요양 문맥의 핵심 이슈와 후속조치를 반환한다.
- 브리핑 AI가 규칙 엔진 결과를 바탕으로 우선순위를 설명한다.
- 불확실한 경우 `추정` 또는 `검수 필요`를 명시한다.

### 13.3 운영 검증

- `backend`: `npm run typecheck`, `npm run build`, `npm run db:generate`
- `frontend`: `npm run typecheck`, `npm run build`
- 가능하면 로그인 -> 온보딩 -> 문서 -> 상담 -> 대시보드까지 수동 플로우 검증

## 13.4 Acceptance Matrix

| 기준 문장 | 실제 확인 방법 | 통과 기준 |
|------|------|------|
| 운영 누락 탐지 엔진이 중심이다 | 대시보드/문서 보드/알림이 실데이터와 규칙 결과로 채워지는지 확인 | 목업 없이 위험 항목과 후속 액션이 연결됨 |
| 문서·기록 구조화 AI가 코어다 | 문서 업로드 후 구조화 응답이 자유문장만이 아닌지 확인 | `documentType`, `missingFields`, `validationErrors`, `confidence` 반환 |
| 상담·현장기록 초안 AI가 코어다 | 상담/모바일 입력 후 초안과 수정본 저장 여부 확인 | `summary`, `keyIssues`, `recommendedActions`, `followUpNeeded` 반환 및 저장 |
| 운영 브리핑 AI가 코어다 | 규칙 결과 기반 브리핑 생성 확인 | `priorityItems`, `managerBrief`, `operatorActions` 반환 |
| 공개 AI Helper는 후순위다 | 코어 운영 플로우가 `/assistant` 없이도 동작하는지 확인 | 문서/상담/모바일/대시보드만으로 제품 가치 확인 가능 |
| Railway fallback은 부록이다 | same-origin 코어 경로가 fallback 없이도 동작하는지 확인 | core API proxy 정상, fallback은 별도 예외 경로로만 유지 |

## 14. 방향 오류 방지 체크리스트

다음 항목 중 하나라도 어긋나면 방향이 잘못된 것이다.

- AI 채팅 품질 개선이 실데이터 연결보다 우선순위가 높아졌다.
- `/assistant` 가 실제 제품의 중심 화면처럼 취급된다.
- AI가 위험을 임의 판정하고 규칙 기반 결과를 덮어쓴다.
- 문서, 상담, 기록 결과가 저장되지 않거나 검수 흐름이 빠진다.
- 변환 요청에 분석문을 반환한다.
- 근거 없는 세부 판단이나 민감정보 재노출이 생긴다.

## 15. 다음 세션 실행 원칙

다음 세션은 아래 순서로 움직이는 것이 맞다.

1. 이 문서를 먼저 읽는다.
2. `P0 운영 데이터 파이프라인`을 먼저 고친다.
3. 그 위에 `P1 업무별 AI 구조화`를 붙인다.
4. 마지막에만 `P2 보조 AI Helper`를 다듬는다.

이번 리팩토링의 성공 기준은 `AI가 더 똑똑해 보이는가`가 아니다.

성공 기준은 아래다.

- 운영 누락이 실제로 먼저 보이는가
- 실무자가 바로 조치할 수 있는가
- AI가 그 흐름을 더 빠르고 정확하게 돕는가

이 세 가지를 만족하면 방향이 맞다.
