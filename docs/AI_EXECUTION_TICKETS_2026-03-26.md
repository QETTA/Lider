# LIDER AI 실행 티켓

작성일: 2026-03-26

## 사용 원칙

이 문서는 구현자가 바로 실행에 들어갈 수 있도록 P0/P1/P2 작업을 decision-complete 형태로 쪼갠 실행 티켓이다.

각 티켓은 아래를 반드시 가진다.

- 입력
- 출력
- 해야 할 일
- 완료 기준
- 비완료 조건

## P0. 운영 데이터 파이프라인 고정

### P0-1. 문서 업로드/저장 실연동

입력:

- 문서 파일
- recipient 연결 정보
- 업로드 사용자 정보

출력:

- 실제 `documentId`
- 저장된 `fileUrl`
- 저장 상태

해야 할 일:

- `/v1/extract/upload` 의 임시 응답 제거
- 문서 메타데이터 DB 저장
- 업로드 후 실제 `documentId` 반환
- 추후 분석 가능한 상태로 `Document` 레코드 생성

완료 기준:

- 업로드 후 temp-id 가 아니라 실제 DB id 반환
- 새로고침 후 문서 목록에서 조회 가능

비완료 조건:

- temp-id 유지
- 파일은 올라갔지만 문서 목록에 없음

### P0-2. 문서 분석/완전성 체크 저장

입력:

- `documentId`
- 추출 대상 문서 타입

출력:

- `extractedData`
- `confidence`
- `missingFields`
- `validationErrors`
- 수급자 완전성 결과

해야 할 일:

- `/v1/extract/analyze` 와 `extractService` 저장 흐름 고정
- 추출 결과를 문서 레코드에 반영
- 완전성 체크를 문서 보드에서 실제 데이터로 보여주기

완료 기준:

- 분석 후 문서 상세에서 추출/검증 결과 조회 가능
- 문서 보드가 목업이 아니라 실제 completeness API 기반으로 렌더링

비완료 조건:

- 추출 결과는 성공했지만 보드에 반영되지 않음
- completeness 가 여전히 목업 데이터 기반

### P0-3. 상담 기록 실연동

입력:

- 대상자
- 상담 메모 또는 AI 초안
- 최종 수정본

출력:

- 생성된 consultation id
- `aiDraft`
- `aiEdited`
- 최종 content

해야 할 일:

- `Consultation` 화면의 목업 초안 생성을 실API 호출로 교체
- 저장과 수정이 `/v1/care/consultations` 기반으로 동작하도록 연결
- 초안, 수정본, 최종본 구분 유지

완료 기준:

- 저장 후 재조회 가능
- 최종 저장된 내용이 새로고침 후 유지

비완료 조건:

- 화면에서는 저장된 것처럼 보이나 backend 데이터가 없음

### P0-4. 모바일 기록 실연동

입력:

- 대상자
- 음성 전사본 또는 quick tap
- AI 초안

출력:

- 생성된 record id
- 기록 본문
- 상태

해야 할 일:

- `Mobile Entry` 의 로컬 저장 흐름을 실API 기반으로 전환
- `voice-to-draft` 와 record 저장 흐름을 분리하되 연결 유지
- 저장 후 대상자 상세/대시보드에서 조회 가능하게 연결

완료 기준:

- 모바일 기록 저장 후 records API에서 재조회 가능
- 대시보드/대상자 상세에 반영

비완료 조건:

- 초안만 보이고 실제 record 저장이 안 됨

### P0-5. 대시보드/알림 실데이터 전환

입력:

- 문서 completeness 결과
- 상담/현장기록 저장 결과
- recipient alert API 결과

출력:

- 실제 위험도 카드
- 실제 알림 목록
- 실제 상태판 해석

해야 할 일:

- `Dashboard2026` 와 관련 알림 화면의 핵심 데이터 소스를 mock에서 API로 전환
- `unreachable` public-data 상태를 실제 실패로 해석

완료 기준:

- 문서 위험도, 알림, 상태판이 실API 기준으로 반영

비완료 조건:

- mock 수치와 실수치가 섞여 있음

## P1. 업무별 AI 구조화

### P1-1. 문서 구조화 응답 계약 도입

입력:

- 업로드 문서
- 문서 타입

출력:

- `summary`
- `issues`
- `actions`
- `evidence`
- `confidence`
- `needsReview`
- `documentType`
- `missingFields`
- `validationErrors`

해야 할 일:

- 코어 문서 구조화 응답을 자유문장에서 typed payload 로 고정
- `DocumentExtract` 에서 이 구조를 직접 렌더링

완료 기준:

- 자유문장만으로는 성공 처리하지 않음
- 화면이 구조화 필드를 기반으로 검수 UI 구성

비완료 조건:

- 응답은 문자열인데 화면에서 임의 파싱

### P1-2. 상담/현장기록 초안 응답 계약 도입

입력:

- 상담 메모, 음성 기록, quick tap

출력:

- `summary`
- `keyIssues`
- `recommendedActions`
- `followUpNeeded`
- `riskFactors`

해야 할 일:

- 상담과 모바일 초안 생성 응답을 공통 구조로 맞춤
- 저장 시 초안과 최종본을 구분

완료 기준:

- 상담과 모바일 초안이 같은 구조 규칙을 따름

비완료 조건:

- 화면마다 서로 다른 임시 shape 사용

### P1-3. 운영 브리핑 응답 도입

입력:

- 규칙 기반 위험 항목

출력:

- `priorityItems`
- `managerBrief`
- `operatorActions`

해야 할 일:

- 브리핑은 규칙 엔진 결과를 입력으로 사용
- 기관장용 문장과 실무자 액션을 분리

완료 기준:

- 대시보드/알림에서 바로 쓸 수 있는 브리핑 응답 존재

비완료 조건:

- AI가 규칙 결과 없이 임의 우선순위를 생성

## P2. 공개 AI Helper 정리

### P2-1. `/assistant` 의 역할 축소

입력:

- 자유 질문
- 공개 첨부 파일

출력:

- 후순위 보조 응답

해야 할 일:

- `/assistant` 를 제품 중심이 아니라 보조 콘솔로 명시
- `legacy/public-assistant surface` 라는 문서 기준 반영

완료 기준:

- 코어 운영 플로우와 `/assistant` 가 분리돼도 제품 가치가 유지

비완료 조건:

- 문서나 프롬프트가 `/assistant` 를 제품 핵심처럼 취급

### P2-2. 공개 첨부 분석/변환 경계 정리

입력:

- 공개 첨부 파일
- 사용자 요청 문장

출력:

- 분석 응답 또는 변환 결과물

해야 할 일:

- 변환 요청과 분석 요청 분리
- 변환 요청에 분석문을 반환하지 않음
- 필요 시 아티팩트 응답에 `artifacts` 사용

완료 기준:

- DOCX -> XLSX 류 요청이 분석 응답으로 새지 않음

비완료 조건:

- 파일 작업 요청이 여전히 장문 분석으로 대체됨

## 공통 검증 티켓

### T-1. 문서 검증

해야 할 일:

- 전략 문서, 세팅 문서, 실행 티켓 문서 상호 참조 확인
- 코어 vs 공개 AI, same-origin vs fallback, P0/P1/P2 경계가 모두 문서에 있는지 확인

완료 기준:

- 구현자가 문서만 읽고도 우선순위와 세팅을 결정할 수 있음

### T-2. 로컬 시나리오 검증

해야 할 일:

- 로그인
- 세션 유지
- onboarding/setup 저장 유지
- 문서/상담/현장기록 저장 후 재조회
- public-data unreachable 해석 확인

완료 기준:

- 핵심 운영 흐름이 로컬에서 실제 데이터로 검증됨

### T-3. 운영 smoke check

해야 할 일:

- Worker `CORE_API_BASE_URL` 없음 -> 제한 응답
- Worker `CORE_API_BASE_URL` 있음 -> same-origin core 응답
- Railway fallback 독립 검증

완료 기준:

- 코어 운영 경로가 fallback 없이도 동작
