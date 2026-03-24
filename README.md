# LIDER AI 업무 오케스트레이션 플랫폼 - 개발 문서

> **문서 버전:** v1.0  
> **작성일:** 2026-03-24  
> **상태:** 개발 착수 준비 완료

---

## 📚 문서 목록

| 문서 | 설명 | 용도 |
|------|------|------|
| [LIDER_DEVELOPMENT_PLAN.md](./LIDER_DEVELOPMENT_PLAN.md) | 종합 개발 계획서 | PM, Tech Lead, 개발팀 전체 |
| [LIDER_ARCHITECTURE.md](./LIDER_ARCHITECTURE.md) | 기술 아키텍처 상세 | Architect, Backend Engineer |
| [LIDER_API_SPEC.md](./LIDER_API_SPEC.md) | REST API 명세 | Frontend, Backend, QA |
| [README.md](./README.md) | 문서 가이드 (현재) | 온보딩, 문서 탐색 |

---

## 🎯 프로젝트 개요

**LIDER**는 문서·검색·업무 액션을 하나의 흐름으로 연결하는 AI 업무 오케스트레이션 SaaS다.

### 핵심 4대 모듈

```
┌─────────────┬─────────────┬─────────────┬─────────────────┐
│   ASSIST    │   EXTRACT   │ACTION PREVIEW│    EVAL & OPS   │
│  통합 검색   │  문서 추출   │  실행 전 검토 │   품질 운영 관리  │
│             │             │             │                 │
│ • 자연어 질의│ • 이미지/PDF │ • 종료/승인   │ • 비용 추적      │
│ • 내부 검색 │ • 필드 추출  │ • 변경/전송   │ • fallback 관리 │
│ • 근거 기반  │ • 구조화 JSON│ • 권한 체크   │ • 품질 개선 루프 │
│   답변 생성 │ • 검수 큐   │ • 영향 안내   │                 │
└─────────────┴─────────────┴─────────────┴─────────────────┘
```

---

## 🏗️ 아키텍처 요약

```
[Client] → [API Gateway] → [Model Router] → [Tool Gateway]
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
                    ▼                         ▼                         ▼
            [kimi-k2-0905]             [kimi-k2-thinking]          [kimi-k2.5]
            (기본 텍스트)                  (툴 오케스트레이션)          (멀티모달)
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              │
                                              ▼
                                    [claude-sonnet-4-6]
                                        (fallback)
                                              │
                                              ▼
                                    [Validator Layer]
                                    [Response Composer]
                                              │
                                              ▼
                                    [Logging / Eval / Replay]
```

---

## ⚡ 빠른 시작 가이드

### 1단계: MVP 핵심 (0-2개월)

| 순서 | 작업 | 담당 | 산출물 |
|------|------|------|--------|
| 1 | AI Provider 어댑터 | AI Engineer | `provider_kimi.py`, `provider_claude.py` |
| 2 | 공통 Envelope/Schema | Backend | `schemas/*.json`, `response envelope` |
| 3 | 모델 라우터 | Backend | `router.py` |
| 4 | 툴 게이트웨이 | Backend | `tool_gateway.py` |
| 5 | `/v1/extract` API | Full-stack | 문서 추출 MVP |
| 6 | `/v1/assist` API | Full-stack | 통합 검색 MVP |
| 7 | `/v1/actions/preview` API | Backend | 안전한 액션 프리뷰 |

### 2단계: 고도화 (2-4개월)

- 고객/티켓/문서 소스 커넥터 확장
- 운영 콘솔 및 Eval 대시보드
- 한국어 응답 품질 개선
- Golden Set 구축 및 회귀 테스트

### 3단계: 엔터프라이즈 (4-6개월)

- 도메인 특화 템플릿
- SSO, 감사 로그, 데이터 마스킹
- Private Deployment 옵션
- 제한적 모델 커스터마이즈

---

## 📊 핵심 KPI

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| `json_valid_rate` | 98%+ | 모든 응답 파싱 검사 |
| `grounded_answer_rate` | 95%+ | 출처 기반 답변 비율 |
| `wrong_tool_rate` | 3% 이하 | 잘못된 툴 선택 |
| `fallback_rate` | 20% 이하 | Sonnet fallback 비율 |
| `extract_field_f1` | use-case별 기준 | 문서 추출 정확도 |

---

## 💰 비용 구조

| 모델 | 입력 | 출력 | 사용처 |
|------|------|------|--------|
| `kimi-k2-0905-preview` | $0.60/MTok | $2.50/MTok | 기본 텍스트 |
| `kimi-k2-thinking` | $0.60/MTok | $2.50/MTok | 툴 오케스트레이션 |
| `kimi-k2.5` | $0.60/MTok | $3.00/MTok | 멀티모달 |
| `claude-sonnet-4-6` | $3.00/MTok | $15.00/MTok | fallback |

---

## 🔒 보안 체크리스트

- [ ] TLS 1.3 적용
- [ ] JWT with short expiry (15 min)
- [ ] PII Redaction Layer
- [ ] RBAC + ABAC 권한 모델
- [ ] Write action은 Backend only
- [ ] Immutable audit logs
- [ ] Zero-retention 옵션 (Enterprise)

---

## 📝 개발자 필수 체크리스트

### Kimi API 사용 시
- [ ] `functions` 대신 `tools` 사용
- [ ] JSON Mode는 top-level object만
- [ ] Thinking 모델은 `reasoning_content` 유지
- [ ] K2.5 thinking + `$web_search`는 분리
- [ ] `max_tokens >= 16000`, `temperature=1.0`

### 코드 리뷰 시
- [ ] write action은 preview만, execute는 backend
- [ ] 권한 체크는 deterministic validator에서
- [ ] 추출 실패 시 guess 금지
- [ ] facts[] 비어 있으면 고위험 답변 금지
- [ ] 모든 출력에 request_id 포함

---

## 🚀 배포 명령어

```bash
# 로컬 개발
cd /home/user/webapp
docker-compose up -d

# API 서버 실행
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# 정적 배포 (deploy/ 폴더)
cd deploy
python -m http.server 3000
# 또는 CDN에 업로드
```

---

## 📞 문의 및 지원

| 역할 | 연락처 | 용도 |
|------|--------|------|
| Tech Lead | tech-lead@lider.ai | 아키텍처, 기술 결정 |
| Product Manager | pm@lider.ai | 기능 우선순위, 요구사항 |
| API Support | api-support@lider.ai | API 통합 문의 |
| Security | security@lider.ai | 보안, 데이터 정책 |

---

## 📅 문서 업데이트 로그

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-03-24 | v1.0 | 초안 작성 완료 |
| 2026-04-07 | v1.1 | 예정 (MVP 1주차 회고 후) |

---

## 🔗 참고 자료

- 원본 비즈니스 플랜: `/home/user/uploaded_files/lider_delivery_bundle/biz/`
- 기술 논의 내역: `/home/user/uploaded_files/lider_delivery_bundle/chat/`
- 정적 배포본: `/home/user/uploaded_files/lider_delivery_bundle/deploy/`

---

**Happy Building! 🚀**
