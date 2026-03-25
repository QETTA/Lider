# Lider 관련 채팅 전체 내역

> 생성 시각: 2026-03-24 (Asia/Seoul)
> 범위: 이 대화에서 사용자와 어시스턴트가 주고받은 **가시 채팅 내역**만 포함  
> 참고: 시스템/개발자 메시지 및 내부 추론은 포함하지 않음

---

## [1] User

lider 프로젝트는 아래처럼 kimi k2 도입 어떻개 생각해 ?결론부터 말하면, **도토리에 Kimi 2.5를 넣는 건 가능**합니다. 그리고 **“도토리에 맞게 모델을 더 커스터마이즈하고 싶다”**는 관점만 보면, 오히려 **Claude Sonnet 4.6보다 Kimi 쪽이 더 현실적**입니다. 이유는 Kimi 2.5가 공식적으로 **멀티모달, thinking, ToolCalls, JSON Mode, 웹 검색, 256K 컨텍스트, OpenAI 호환 API**를 지원하고, K2.5 계열 커스터마이즈 경로로는 Fireworks의 **full-parameter RL tuning private preview**가 공개돼 있기 때문입니다. 반대로 Anthropic 공식 문서는 **현재 API에서 공개 파인튜닝을 제공하지 않는다**고 적고 있습니다. ([Moonshot][1])

다만 **“파인튜닝한 Kimi 2.5로 Claude Sonnet 4.6을 바로 완전 대체”**는 조금 다르게 봐야 합니다. 공식 Anthropic 문서상 **Claude Sonnet 4.6은 실제 모델명으로 존재**하고, **1M 컨텍스트**, **adaptive thinking**, **멀티링구얼 지원**을 내세우고 있습니다. Moonshot 쪽은 Kimi 2.5를 **코딩·에이전트·비전** 중심으로 강하게 밀고 있고, 제가 확인한 공개 자료에서는 Moonshot이 Anthropic처럼 **다국어/Korean 품질을 전면에 내세운 문서**는 찾지 못했습니다. 그래서 **한국어 육아맘 톤, 지역 커뮤니티 맥락, 민감한 표현 안정성**은 실제 도토리 데이터로 반드시 별도 평가가 필요합니다. ([Claude API Docs][2])

도토리 기준으로 더 중요한 판단은 이겁니다. **LLM을 바꾸는 것**과 **도토리의 핵심 엔진을 바꾸는 것**은 다릅니다. 도토리의 본질은 이미 당신이 정리한 대로 **AI 생활권 육아 지도 + 의사결정 엔진 + 오프라인 참여 연결 플랫폼**이고, 여기서 **사실·거리·입소가능성·운영현황·지역성**은 모델의 기억으로 맞히면 안 됩니다. Kimi 공식 문서도 **모델 지식은 학습 데이터에 기반하며, 시의성 있는 정보는 도구/검색으로 보완해야 한다**고 설명합니다. 즉 도토리의 핵심은 **파인튜닝 모델**이 아니라, **공식 데이터/시설 SaaS 입력/검증된 UGC/지도·시간·거리 로직** 위에 모델을 얹는 구조여야 합니다. ([Moonshot][3])

그래서 실무적으로는 이렇게 판단하는 게 맞습니다.
**Kimi 2.5로 바로 대체해도 되는 영역**은 꽤 많습니다. 예를 들면 시설·프로그램 소개 요약, 전단지/포스터/시간표 이미지 읽기, 지도 결과에 대한 자연어 설명, 맘 후기 묶음 요약, 상담 초안 작성, 공급자용 SaaS 입력 보조, 구조화 JSON 생성 같은 부분입니다. Kimi 2.5는 **비전 입력**과 **ToolCalls/JSON Mode**를 공식 지원하므로 이 축과 잘 맞습니다. ([Moonshot][1])

반대로 **파인튜닝으로 해결하면 안 되는 영역**도 분명합니다. 입소 가능성 예측, 생활권 이동 가능성, 오늘 참여 가능한 프로그램, 공석 여부, 운영시간, 비용, 반 정보, 지역 행사 최신성은 **모델 성향 튜닝으로 해결하는 문제가 아니라 데이터·규칙·도구 호출 문제**입니다. 이건 Kimi든 Claude든 같습니다. 도토리에서 LLM은 **설명기·오케스트레이터·정리기**가 되어야지, **진실의 원천**이 되면 안 됩니다. ([Moonshot][3])

비용 면에서는 Kimi 2.5가 꽤 매력적입니다. Moonshot 공식 플랫폼은 **Kimi 2.5를 입력 $0.60/MTok, 출력 $3.00/MTok**로 제시하고 있고, Anthropic 공식 가격은 **Claude Sonnet 4.6이 입력 $3/MTok, 출력 $15/MTok**입니다. 단순 단가만 보면 Kimi 2.5가 약 **5배 저렴한 축**이라, 육아맘 대상 B2C에서 질의량이 많아질수록 의미가 큽니다. ([Moonshot][4])

다만 파인튜닝 경로는 차이가 있습니다. 제가 확인한 Moonshot 공개 문서는 **추론, 툴 사용, 프롬프팅, 에이전트 세팅, 가격** 중심이고, **K2.5 public self-serve fine-tuning guide**는 찾지 못했습니다. 반면 Fireworks는 **Kimi K2 계열 튜닝**을 공개적으로 지원하고, **Kimi K2.5는 full-parameter RL tuning private preview**를 열어둔 상태입니다. 그래서 **“지금 당장 클릭 몇 번으로 K2.5를 셀프 파인튜닝”**보다는, **우선 Kimi 2.5 base로 서비스 설계 → 이후 Fireworks 경로로 제한적 튜닝 검토**가 더 현실적입니다. ([Fireworks AI][5])

또 하나 중요한 건 데이터 처리입니다. 도토리는 부모·아이·지역 생활권·커뮤니티 텍스트가 얽힐 수 있어서 프라이버시 감각이 중요합니다. Moonshot OpenPlatform 개인정보정책은 서비스 개선 과정에서 **기본 기술/모델을 training and refining**할 수 있다고 적고 있습니다. 반면 Fireworks는 **오픈모델에 대해 zero data retention이 기본**이라고 명시합니다. 그래서 도토리처럼 민감성이 있는 서비스라면, **직접 Moonshot에 바로 넣기보다 Fireworks 같은 보수적 데이터 경로를 우선 검토**하는 쪽이 더 낫습니다. ([Moonshot][6])

제 판단을 한 줄로 줄이면 이렇습니다.
**가능하다. 하지만 “도토리를 Kimi 2.5로 파인튜닝해서 만든다”가 아니라, “도토리의 구조화된 의사결정 엔진 위에 Kimi 2.5를 메인 언어/멀티모달/에이전트 레이어로 올리고, 파인튜닝은 나중에 좁은 업무에만 쓴다”가 맞다.**
그리고 **Claude Sonnet 4.6 완전 대체는 가능성은 높지만, 한국어 육아맘 UX와 민감 표현 안정성 검증 전에는 100% 단일 모델 전환보다 단계적 전환이 안전**합니다. ([Claude API Docs][2])

도토리라면 저는 이렇게 갑니다.

1. **1차 출시:** Kimi 2.5 base + tool calling + RAG + 규칙 엔진 + JSON schema  
2. **고위험 판단:** 입소예측/노출랭킹/운영현황은 별도 로직이 책임  
3. **2차 고도화:** 후기 요약 톤, 추천 사유 문장, 공급자 입력 정규화, 커뮤니티 분류/모더레이션만 제한적으로 튜닝  
4. **교체 전략:** 초반엔 Claude fallback을 남겨 두고, 도토리 실데이터 평가 통과 후 Kimi 단일화

원하시면 바로 다음 답변에서 **도토리용 Kimi 2.5 아키텍처**
- 어떤 기능을 Kimi에 맡기고  
- 어떤 기능은 규칙/DB/예측모델에 남기고  
- 파인튜닝 데이터셋은 무엇부터 쌓아야 하는지  
  까지 실서비스 기준으로 정리해드리겠습니다.

[1]: https://platform.moonshot.ai/docs/pricing/chat "Model Inference Pricing Explanation - Kimi API Platform"  
[2]: https://docs.anthropic.com/en/docs/about-claude/models/overview "Models overview - Claude API Docs"  
[3]: https://platform.moonshot.ai/docs/guide/use-kimi-api-to-complete-tool-calls?utm_source=chatgpt.com "Use Kimi API for Tool Calls"  
[4]: https://platform.moonshot.ai/?utm_source=chatgpt.com "Kimi API Platform"  
[5]: https://fireworks.ai/blog/kimi-k2p5 "Kimi K2.5 Is Live on Fireworks: Vibe Coding, Agents, and Full-Parameter RFT"  
[6]: https://platform.moonshot.ai/docs/agreement/userprivacy?utm_source=chatgpt.com "Kimi OpenPlatform Privacy Policy"

---

## [2] Assistant

제 생각은 **Lider에 Kimi K2 계열 도입은 찬성**입니다. 다만 **“도입”과 “전면 교체”는 분리해서** 봐야 합니다. Moonshot은 K2.5를 멀티모달 agent 모델로, K2 0905/K2 Thinking을 텍스트 중심 agent 모델로 내놓고 있고, OpenAI 호환 API, Tool Calls, JSON 중심 워크플로, 256K 컨텍스트를 공식 문서에서 밀고 있습니다. 가격도 K2.5가 입력 **$0.60/MTok**, 출력 **$3.00/MTok**, K2 0905/K2 Thinking이 입력 **$0.60/MTok**, 출력 **$2.50/MTok**이고, Claude Sonnet 4.6은 입력 **$3/MTok**, 출력 **$15/MTok**입니다. 비용 민감하고 툴 호출·정형 출력·자동화 비중이 큰 서비스라면 매력도가 높습니다.

오히려 Lider에서는 **K2냐 K2.5냐**를 먼저 나누는 게 중요합니다. **이미지/PDF/스크린샷 이해가 핵심이면 K2.5**, **텍스트 기반 에이전트·코딩·툴 오케스트레이션이 중심이면 K2 0905나 K2 Thinking**이 더 합리적입니다. Moonshot 문서도 K2를 **순수 텍스트 모델**, K2.5를 **비주얼+텍스트 멀티모달 모델**로 설명합니다.

붙여주신 문안은 큰 방향은 맞지만, 한 군데는 보정이 필요합니다. **Anthropic API 자체는** 현재 fine-tuning을 제공하지 않는다고 공식 glossary에 적혀 있습니다. 다만 **Amazon Bedrock 경로로는 Claude 3 Haiku fine-tuning 문서와 GA 공지**가 공개돼 있습니다. 반대로 Kimi 쪽은 **Fireworks에서 K2.5 full-parameter RL tuning private preview**를 열어놨습니다. 그래서 “Claude는 아예 튜닝 불가”보다는, **“Sonnet 4.6 급 공개 커스터마이즈 경로는 약하고, Kimi 쪽이 현재 더 적극적”**이라고 보는 편이 더 정확합니다.

하지만 **Lider의 핵심 KPI가 한국어 대화 품질, 브랜드 톤, 긴 문맥 유지**라면 저는 당장 단일 모델 전환까지는 안 갑니다. Anthropic은 Sonnet 4.6에 대해 **multilingual**, **adaptive thinking**, **1M context**를 공식 지원한다고 명시하고 있습니다. 반면 제가 확인한 Kimi 공식 자료는 강점 포지셔닝이 **agent / code / vision** 쪽에 더 치우쳐 있습니다. 그래서 Kimi가 안 된다는 뜻이 아니라, **한국어 UX 품질은 Lider 실데이터로 A/B 평가 후 fallback을 걷어내는 게 안전**하다는 뜻입니다.

운영 관점에서도 현실 체크가 필요합니다. Moonshot은 K2.5에서 **thinking 모드와 내장 `$web_search`가 일시적으로 호환되지 않는다**고 적고 있고, **multi-step tool calling에서는 `reasoning_content`를 계속 문맥에 유지**해야 하며, **공식 API 사용, `stream=true`, retry 로직**을 권장합니다. 또 **일부 서드파티 엔드포인트는 정확도 드리프트가 있을 수 있다**고 경고합니다. 그래서 Fireworks를 프라이버시 때문에 고려하더라도, **정확도 A/B는 필수**입니다.

데이터 민감성도 봐야 합니다. Moonshot 공개 프라이버시 정책은 사용자 콘텐츠를 **서비스 개선과 모델/알고리즘 refinement**에 활용할 수 있다고 적고 있습니다. Fireworks는 **오픈모델 inference에 zero data retention이 기본**이지만, **Response API는 `store=True`가 기본**이라 30일 보관이 될 수 있고 `store=False`로 꺼야 합니다. Lider에 개인/회사 민감 데이터가 많다면 이 부분은 모델 성능만큼 중요합니다.

그래서 제 결론은 이겁니다. **Lider에는 Kimi 도입 찬성, Kimi 전면 교체는 보류**입니다. 제가 하겠다면 **1차는 K2 Thinking/K2 0905를 JSON 추출·툴 오케스트레이션·문서/로그 요약에 넣고, 이미지/PDF 흐름에만 K2.5를 붙이고, 사용자-facing 한국어 최종 응답은 Sonnet fallback을 남겨 둡니다.** 그 다음 Lider 실데이터 평가를 통과하면 단일화 여부를 결정하는 순서가 가장 안전합니다.

다음 단계로는 **Lider 기능별로 “Kimi에 맡길 것 / 룰·DB에 남길 것 / fallback 유지할 것”**을 쪼개는 설계가 가장 좋습니다.

---

## [3] User

ㄱ

---

## [4] Assistant

좋습니다. 그럼 **Lider 기준**으로 바로 실서비스형으로 쪼개보겠습니다.  
전제 하나만 두겠습니다. **Lider의 정확한 vertical은 아직 모르니**, 아래 설계는 **문서·검색·업무자동화·대화형 UI가 섞인 SaaS** 기준입니다.

핵심 결론부터 말하면, **Lider는 “Kimi 단일 모델”보다 “Kimi 라우터 구조”가 맞습니다.**  
제가 잡는 기본 배치는 이겁니다.

- **`kimi-k2-0905-preview`**: 기본 텍스트 응답, 분류, 태깅, JSON 출력, 짧은 에이전트 작업
- **`kimi-k2-thinking`**: 멀티스텝 tool orchestration, 깊은 추론, 검색 계획 수립
- **`kimi-k2.5`**: 이미지/PDF/스크린샷/전단/차트 같은 멀티모달 입력 해석
- **`claude-sonnet-4-6`**: 고가치 최종 응답 fallback, 긴 문맥/한국어 UX 안전판

이렇게 두는 이유는 Moonshot이 현재 **K2.5를 멀티모달 256K 모델**, **K2 0905·K2 Thinking을 텍스트 중심 에이전트/추론 모델**로 포지셔닝하고 있고, K2 계열은 ToolCalls·JSON Mode·웹검색을 지원하며 가격도 입력 **$0.60/MTok**, 출력 **$2.50~$3.00/MTok**입니다. 반면 Claude Sonnet 4.6은 **1M context**, **adaptive thinking**, **multilingual**을 지원하지만 가격은 입력 **$3/MTok**, 출력 **$15/MTok**입니다. Moonshot API는 또 **대부분 OpenAI SDK와 호환**돼서 붙이기도 쉽습니다.

아키텍처는 이렇게 잡으면 됩니다.

```text
Client
  -> API Gateway
  -> Auth / Permission / PII Redaction
  -> Model Router
       -> K2 0905      (default text + JSON)
       -> K2 Thinking  (planner + multi-tool)
       -> K2.5         (vision / PDF / screenshot parser)
       -> Sonnet 4.6   (fallback for premium final answer)
  -> Tool Gateway
       -> Internal Search / RAG
       -> SQL / CRM / Workflow APIs
       -> Web Search
       -> File Parser / OCR / Code Runner
  -> Deterministic Validator
       -> JSON Schema
       -> Business Rules
       -> Permission Check
       -> Freshness Check
  -> Response Composer
  -> Logging / Eval / Replay / Badcase Queue
```

여기서 가장 중요한 원칙은 하나입니다. **모델은 설명기이고, DB/규칙/툴이 진실의 원천**이어야 합니다.  
Moonshot도 최신성 있는 정보는 웹 검색 같은 툴로 보강하는 흐름을 전제로 문서를 쓰고 있고, 플랫폼 메인 페이지에서도 web search와 여러 official tools를 같이 밀고 있습니다. 그래서 Lider에서 최신 상태값, 권한, 가격, 재고, 승인 상태, 워크플로 단계 같은 것은 **절대 모델 기억에 맡기면 안 됩니다.**

### 1) Kimi에 맡길 기능

Lider에서 Kimi에 맡겨도 되는 건 이런 축입니다.

- 유저 의도 분류
- 검색 질의 재작성
- 문서/회의록/티켓/후기 요약
- 첨부파일·이미지·스크린샷 파싱
- 여러 툴을 어떤 순서로 부를지 계획 세우기
- 사람이 읽기 쉬운 설명문/메일/상담 초안 작성
- 내부 시스템으로 넘길 **정형 JSON 생성**

특히 **K2.5는 멀티모달**, **K2 Thinking은 긴 추론과 멀티스텝 tool calling**에 강하게 포지셔닝돼 있으니, “읽기/정리/오케스트레이션” 레이어는 Kimi 쪽이 꽤 잘 맞습니다. K2 Thinking은 Moonshot이 공식 페이지에서 **최대 300-step tool calling**까지 사례로 내세우고 있습니다.

### 2) 규칙/DB/예측모델에 남길 기능

반대로 이건 모델에 맡기면 안 됩니다.

- 권한 판정
- 가격/할인/정산 계산
- 최신 상태값
- 승인/거절 같은 irreversible action
- 노출 순위 공식
- SLA/정책/컴플라이언스 판정
- 리스크 점수, fraud, churn, lead score 같은 예측값

이 영역은 **규칙 엔진 + DB + 별도 예측모델**이 책임지고, LLM은 그 결과를 **해석해서 보여주는 역할**만 해야 합니다.  
한 줄로 줄이면, **“판단 로직은 deterministic, 표현만 generative”**가 맞습니다.

### 3) 라우팅 규칙

실제로는 이렇게 라우팅하면 됩니다.

- **텍스트만 있고 응답이 짧다** → `kimi-k2-0905-preview`
- **툴을 여러 번 불러야 하거나 추론이 길다** → `kimi-k2-thinking`
- **이미지/PDF/스크린샷이 들어온다** → 먼저 `kimi-k2.5`
- **한국어 톤 품질이 매우 중요하거나 긴 문맥/고객-facing 최종안이다** → `claude-sonnet-4-6` fallback

특히 하나 주의할 점이 있습니다. Moonshot 문서상 **K2.5의 thinking 모드와 내장 `$web_search`는 일시적으로 호환되지 않습니다.** 또 멀티스텝 툴 호출에서는 `reasoning_content`를 유지해야 합니다. 그래서 **“이미지 해석 + 최신 정보 검색 + 최종 판단”**을 한 번에 한 모델 호출로 처리하려 하지 말고,  
**1차: K2.5로 이미지/PDF를 구조화 JSON으로 추출 → 2차: K2 Thinking이 DB/검색 툴 호출 → 3차: 최종 응답 생성**  
이 2~3단 분리 파이프라인이 훨씬 안정적입니다.

### 4) JSON 계약은 처음부터 빡세게

Kimi를 넣을 때는 **프롬프트보다 출력 계약이 더 중요**합니다.  
Moonshot JSON Mode는 `response_format={"type":"json_object"}`를 지원하지만, 문서상 **top-level JSON object만 보장**합니다. 또 tool parameters의 root도 **object**여야 합니다. 그래서 Lider의 내부 표준 응답은 처음부터 아래처럼 **object envelope**로 고정하는 게 맞습니다.

```json
{
  "intent": "search|summarize|draft|analyze|act",
  "needs_tools": true,
  "tool_plan": [
    {"tool": "internal_search", "args": {...}},
    {"tool": "crm_lookup", "args": {...}}
  ],
  "facts": [
    {"key": "owner_name", "value": "..." }
  ],
  "final_answer": "...",
  "confidence": 0.84,
  "fallback_recommended": false
}
```

이렇게 해야 나중에 모델을 바꿔도 **오케스트레이터는 그대로** 갑니다.

### 5) 파인튜닝은 초반에 하지 말고, 데이터부터 쌓기

Lider에서 초반에 가장 먼저 쌓아야 할 데이터는 네 종류입니다.

1. **tool trace 데이터**  
   유저 입력 → 선택된 툴 → 툴 인자 → 툴 결과 → 최종 답변

2. **멀티모달 추출 gold set**  
   PDF/이미지/스크린샷 → 사람이 검수한 정답 JSON

3. **브랜드 톤 데이터**  
   초안 답변 → 운영자가 수정한 최종 답변

4. **실패 케이스 데이터**  
   환각, 잘못된 툴 선택, 잘못된 인자, 과도한 자신감, 금칙 표현

그리고 파인튜닝은 나중에 **좁은 업무**에만 거는 게 맞습니다. 예를 들면 **답변 톤**, **분류/모더레이션**, **문서 정규화**, **폼 자동입력** 같은 곳입니다. Fireworks는 현재 **Kimi K2.5 full-parameter RL tuning private preview**를 공개적으로 안내하고 있습니다. 반면 Anthropic 공식 문서는 **Claude API 자체는 현재 fine-tuning을 제공하지 않는다**고 적고 있고, 대신 AWS Bedrock에서는 **Claude 3 Haiku fine-tuning**이 GA 상태입니다. 그러니 Lider 관점에서는 **Kimi 쪽이 커스터마이즈 경로가 더 적극적**이라고 보는 편이 맞습니다.

### 6) 프라이버시와 운영

이건 꼭 체크해야 합니다. Moonshot의 OpenPlatform Privacy Policy는 사용자 콘텐츠를 **서비스 개선과 모델/알고리즘 refinement**에 활용할 수 있다고 적고 있습니다. 반면 Fireworks는 **오픈모델에 대해 Zero Data Retention이 기본**이지만, **Response API는 `store=True`가 기본**이라 저장을 끄려면 `store=False`를 써야 합니다.  
그래서 Lider에 민감한 고객 데이터가 들어간다면 실무적으로는:

- **직접 Moonshot**: 빠르고 단순하지만 데이터 정책 검토 필수
- **Fireworks + `store=False`**: 좀 더 보수적인 운영 가능

이 선택지를 보안팀과 같이 보는 게 맞습니다.

### 7) 제가 Lider라면 이렇게 시작합니다

**v1**
- 기본 라우터: `K2 0905`
- 깊은 추론/툴 오케스트레이터: `K2 Thinking`
- 멀티모달 파서: `K2.5`
- 최종 한국어 premium fallback: `Sonnet 4.6`
- 내부 truth source: DB + RAG + workflow APIs
- 출력: JSON 우선, 자연어는 마지막 단계에서만

**v2**
- fallback이 걸린 케이스만 모아서 badcase eval
- 한국어 톤, tool accuracy, hallucination, JSON validity를 기준으로 Kimi 단독 통과율 측정

**v3**
- 통과율이 충분히 올라오면 Sonnet fallback 범위를 축소
- 이후에만 제한적 튜닝 검토

한 줄로 끝내면, **Lider는 “Kimi로 갈까 말까”보다 “Kimi를 어디에 꽂을까”가 더 중요**합니다.  
제 추천은 **전면 교체가 아니라, Kimi 3계층 라우터 + Sonnet 안전판**으로 시작하는 구조입니다.

다음 단계는 **Lider 기능 목록을 기준으로 기능별 모델 라우팅표와 API 스키마**까지 내려서 바로 개발 문서 형태로 만드는 일입니다.

---

## [5] User

ㄱ

---

## [6] Assistant

좋습니다. 그럼 바로 **Lider용 모델 라우팅표 + API 스키마 초안 v0**로 내리겠습니다.

Moonshot 공식 문서 기준으로는 **K2는 텍스트 전용**, **K2.5는 멀티모달**, 둘 다 **256K 컨텍스트**를 지원합니다. 또 **K2 Thinking / K2.5 thinking**은 멀티스텝 tool use를 지원하지만, reliable하게 쓰려면 `reasoning_content`를 문맥에 유지하고 `max_tokens >= 16000`, `stream=true`, `temperature=1.0`에 맞추는 것이 권장됩니다. 반면 **K2.5 thinking과 내장 `$web_search`는 현재 호환되지 않으므로**, 비전 해석과 최신 검색은 같은 턴에 한 모델로 합치지 않는 편이 안전합니다. Anthropic 공식 문서상 **Sonnet 4.6은 1M 컨텍스트**와 **adaptive/manual thinking**을 지원합니다. Kimi API는 또 **OpenAI SDK 호환**이라 라우터 붙이기는 쉬운 편입니다.

## 1) 기능별 모델 라우팅표

| 기능군 | 기본 모델 | 보조/후속 단계 | 진실의 원천 |
|---|---|---|---|
| 일반 채팅, FAQ, 재작성, 분류 | `kimi-k2-0905-preview` | 필요 시 Sonnet fallback | 내부 KB / RAG |
| 툴 여러 개를 물어야 하는 검색형 질의 | `kimi-k2-thinking` | 실패 시 Sonnet fallback | DB / 검색 / API |
| PDF, 이미지, 스크린샷, 폼 추출 | `kimi-k2.5` | 후속 정리는 `kimi-k2-0905-preview` | 추출 JSON + 검증기 |
| 긴 회의록, 긴 스레드, 대용량 문맥 비교 | `claude-sonnet-4-6` | 없음 | 원문 문맥 |
| 고객-facing 최종 답변 초안 | `kimi-k2-0905-preview` | premium 경로만 Sonnet | 내부 facts + 정책 |
| 승인/거절/정산/가격/권한 관련 액션 | LLM은 **preview만** | 실행은 deterministic service | 규칙 엔진 / DB |
| 커뮤니티/모더레이션/태깅 | `kimi-k2-0905-preview` | 고위험 케이스만 사람 검토 | 정책 룰 + 운영 큐 |

제가 Lider에 권하는 기본 철학은 간단합니다.  
**Kimi는 “읽고, 정리하고, 툴을 고르는 역할”**, **실행·권한·가격·상태값은 룰/DB가 책임**집니다.

## 2) 라우터 규칙

```text
1. 첨부파일이 image/pdf/screenshot면
   -> Stage A: kimi-k2.5 로 구조화 추출
   -> Stage B: validator 로 필수 필드/형식 검사
   -> Stage C: 필요 시 kimi-k2-thinking 이 DB/검색 툴 호출

2. 첨부파일이 없고,
   최신성 + 여러 툴 호출 + 추론 깊이가 필요하면
   -> kimi-k2-thinking

3. 단순 채팅 / 요약 / 재작성 / 태깅 / JSON 생성이면
   -> kimi-k2-0905-preview

4. 아래 조건이면 Sonnet fallback
   - 예상 문맥 180K~220K 이상
   - 외부 고객에게 바로 노출되는 고가치 최종 답변
   - Kimi가 JSON schema를 2회 연속 못 맞춤
   - 한국어 톤 품질이 내부 기준 미달
   - multi-doc 비교가 길고 복잡함

5. write action 요청이면
   -> LLM은 plan + preview만 생성
   -> rule engine / permission service 검증
   -> confirmed executor가 실제 실행
```

여기서 핵심은 **“vision 파싱”과 “최신 검색”을 분리**하는 겁니다. K2.5 thinking에서 내장 `$web_search` 제약이 있으니, **파일 해석은 K2.5**, **검색/툴 orchestration은 K2 Thinking**으로 두 단계로 끊는 편이 운영이 쉽습니다.

## 3) 외부 API는 3개로 쪼개는 게 좋습니다

### A. `POST /v1/assist`
사용자 대화용

```json
{
  "session_id": "sess_123",
  "user_id": "usr_42",
  "locale": "ko-KR",
  "message": {
    "text": "지난주 상담 로그 요약해줘"
  },
  "attachments": [],
  "allowed_tools": ["search", "crm_read", "ticket_read"],
  "response_mode": "answer",
  "risk_tier": "medium",
  "debug": false
}
```

```json
{
  "request_id": "req_abc",
  "answer": {
    "text": "요약 결과입니다...",
    "format": "plain"
  },
  "facts": [
    {"key": "ticket_count", "value": 12, "source": "ticket_db"}
  ],
  "citations": [
    {"source_id": "ticket_db:2026-03-24:1"}
  ],
  "action_preview": null,
  "meta": {
    "fallback_used": false,
    "confidence": 0.87
  }
}
```

### B. `POST /v1/extract`
문서/이미지/스크린샷을 **기계가 읽는 JSON**으로 추출

```json
{
  "session_id": "sess_123",
  "user_id": "usr_42",
  "attachments": [
    {
      "type": "image",
      "file_id": "file_001"
    }
  ],
  "extract_type": "form|invoice|poster|screen|generic",
  "output_schema": {
    "type": "object",
    "required": ["doc_type", "fields"],
    "properties": {
      "doc_type": {"type": "string"},
      "fields": {"type": "object"},
      "warnings": {"type": "array"}
    }
  }
}
```

```json
{
  "request_id": "req_xyz",
  "doc_type": "poster",
  "fields": {
    "title": "고객 세미나",
    "date": "2026-03-28",
    "location": "서울 강남"
  },
  "warnings": ["장소 문구 일부가 흐림"],
  "needs_review": true
}
```

### C. `POST /v1/actions/preview`
실행 전 preview 전용

```json
{
  "session_id": "sess_123",
  "user_id": "usr_42",
  "intent": "close_ticket",
  "payload": {
    "ticket_id": "T-1001",
    "reason": "중복 문의"
  }
}
```

```json
{
  "request_id": "req_pv1",
  "allowed": false,
  "reason": "owner 권한 확인 필요",
  "missing_checks": ["permission.owner_or_admin"],
  "human_readable_preview": "이 요청은 티켓을 종료하려고 하지만 현재 사용자 권한이 확인되지 않았습니다."
}
```

**실행 API는 LLM 밖으로 빼는 게 맞습니다.**  
즉 `/v1/actions/execute`는 AI 서비스가 아니라 **permission 검증을 통과한 backend service**가 담당해야 합니다.

## 4) 내부 오케스트레이터 계약

Lider 내부에서는 public API 뒤에 **하나의 공통 오브젝트 envelope**를 두는 게 좋습니다.

```json
{
  "task_type": "assist|extract|plan|act_preview",
  "route": {
    "primary_model": "kimi-k2-thinking",
    "fallback_model": "claude-sonnet-4-6",
    "reason": "multi_tool_and_recent"
  },
  "input": {
    "text": "지난주 로그 요약",
    "attachments": [],
    "locale": "ko-KR"
  },
  "tool_policy": {
    "allowed_tools": ["search", "crm_read", "ticket_read"],
    "write_tools_allowed": false
  },
  "output_contract": {
    "mode": "json",
    "schema_name": "assist_response_v1"
  },
  "safety": {
    "risk_tier": "medium",
    "pii_redacted": true
  }
}
```

이 envelope를 **top-level object**로 고정한 이유가 있습니다. Kimi JSON Mode는 `response_format={"type":"json_object"}`를 지원하지만, 공식 문서상 **유효한 JSON object 출력**을 전제로 하고 **top-level array는 기대하지 말라**는 쪽에 가깝습니다. 그래서 Lider 내부 계약도 전부 **object 중심**으로 맞추는 편이 안전합니다.

## 5) 툴 스키마 표준

Kimi tool call은 **`tools` 파라미터 + JSON Schema** 방식으로 붙이는 것이 정석이고, Moonshot 문서상 **`functions` 파라미터 방식은 지원하지 않습니다**. 또 tool parameters의 root는 `type: "object"`로 두는 예시를 공식 문서가 계속 권장합니다.

Lider 내부 툴 정의는 이렇게 통일하면 됩니다.

```json
{
  "type": "function",
  "function": {
    "name": "crm_lookup",
    "description": "고객 기본 정보를 조회한다. ID나 이메일이 있을 때만 사용한다.",
    "parameters": {
      "type": "object",
      "required": ["customer_id"],
      "properties": {
        "customer_id": {"type": "string"},
        "fields": {
          "type": "array",
          "items": {"type": "string"}
        }
      }
    }
  }
}
```

### 툴 네이밍 규칙
- 읽기 전용: `*_read`, `*_lookup`, `*_search`
- 실행 전용: `*_execute`
- write action preview: `*_preview`

이렇게 나누면 라우터에서 `write_tools_allowed=false`만 걸어도 사고가 크게 줄어듭니다.

## 6) 모델별 프롬프트 계약

### `kimi-k2-0905-preview`
역할:
- 일반 응답
- JSON 태깅
- 짧은 요약
- 간단한 툴 선택

시스템 규칙:
- 사실은 tool result/DB 결과만 사용
- 없으면 “확인 필요”로 남길 것
- machine-consumed output이면 반드시 JSON object

### `kimi-k2-thinking`
역할:
- 멀티툴 planner
- 검색 질의 재작성
- 복합 추론

시스템 규칙:
- 툴 호출 우선
- 추정치는 추정치로 표기
- 마지막 턴 전까지는 확정 표현 금지

### `kimi-k2.5`
역할:
- 이미지/PDF/스크린샷 파서
- UI/문서 구조 추출

시스템 규칙:
- 보이는 것만 추출
- 잘 안 보이면 `warnings[]`에 기록
- extraction 단계에서는 가능하면 자연어 답변보다 필드 추출 우선

## 7) 실패 처리 정책

### JSON 실패
1차: 같은 모델로 repair prompt 1회  
2차: `kimi-k2-0905-preview`로 재생성  
3차: Sonnet fallback

### 툴 실패
- timeout / 5xx → retry 1회
- permission error → 즉시 사용자 메시지 생성
- not found → 추정하지 말고 null 반환

### hallucination 방지
- `facts[]`가 비어 있으면 고위험 답변 금지
- `source_count == 0`이면 권한/가격/상태 관련 문장 금지
- action preview는 항상 `allowed` 필드 포함

## 8) Sonnet fallback을 남겨둘 자리

Sonnet 4.6은 **1M context**와 **adaptive/manual thinking**을 지원하므로, Lider에서는 아래 세 군데에만 남기는 것이 효율적입니다.

- 아주 긴 문맥 비교
- 한국어 최종 응답 품질이 중요한 premium 플로우
- Kimi가 2회 이상 schema/tool continuity를 놓친 케이스

이렇게 해야 Sonnet 비용이 “기본 엔진”이 아니라 **보험료**로 남습니다. Anthropic 공식 가격은 Sonnet 4.6이 **$3/MTok input, $15/MTok output**이고, Moonshot 쪽은 K2/K2.5가 그보다 훨씬 낮은 가격대라 기본 레이어를 Kimi에 두는 쪽이 비용 구조상 유리합니다.

## 9) 개발자가 꼭 알아야 할 함정 4개

1. **Kimi는 `tools`를 쓰고 `functions`는 쓰지 말 것.**  
2. **JSON Mode 출력은 top-level object로만 설계할 것.**  
3. **Thinking 모델은 `reasoning_content`를 잃어버리면 멀티툴 연속성이 깨질 수 있음.**  
4. **K2.5 thinking + built-in web search를 한 턴에 같이 태우지 말 것.**  

## 10) 이 구조로 바로 시작하는 MVP 순서

1주차:
- `/v1/extract` 먼저 구현
- `kimi-k2.5`로 이미지/PDF → JSON 추출
- validator / schema repair 추가

2주차:
- `/v1/assist` 구현
- 기본은 `kimi-k2-0905-preview`
- 검색/DB 질의가 필요하면 `kimi-k2-thinking` 분기

3주차:
- `/v1/actions/preview` 구현
- write action은 preview만 허용
- permission service 연결

4주차:
- Sonnet fallback 연결
- bad case replay 세트 구축
- 한국어 톤 / JSON valid rate / wrong-tool rate 측정

여기까지가 **실제로 바로 개발 들어갈 수 있는 0차 설계**입니다.  
다음으로 이어서 하면 가장 좋은 건 **“Lider 화면/기능 목록 기준 1:1 라우팅표”**를 만드는 일입니다. 예를 들어 로그인 후 첫 화면, 검색창, 문서 업로드, 상담 기록, 액션 버튼마다 어느 모델을 태울지까지 세분화할 수 있습니다.

---

## [7] User

ㄱ

---

## [8] Assistant

좋습니다. 이번엔 **Lider 화면 기준 1:1 배치표**로 바로 내리겠습니다.

전제만 하나 두겠습니다. **실제 Lider IA/화면 목록을 못 본 상태**라서, 우선 **일반 B2B SaaS 콘솔** 기준으로 잡았습니다. 현재 Moonshot 문서상 실무에서 바로 붙일 모델 ID는 `kimi-k2-0905-preview`, `kimi-k2-thinking`, `kimi-k2-thinking-turbo`, `kimi-k2.5`이고, **K2는 텍스트 전용**, **K2.5는 멀티모달**입니다. Thinking 계열은 안정적으로 쓰려면 `reasoning_content`를 문맥에 유지하고, `max_tokens`를 16,000 이상으로 두고, `temperature=1.0`, `stream=true`를 권장합니다. 또 **K2.5 thinking과 내장 `builtin_function.$web_search`는 같은 턴에 섞지 않는 편**이 맞고, `builtin_function.$web_search`를 쓸 때는 thinking을 끄라는 문서가 따로 있습니다. Anthropic 문서상 **`claude-sonnet-4-6`**은 현재 **1M context**, **adaptive thinking**, **multilingual**을 지원합니다.

그래서 Lider는 화면을 네 층으로 나누면 됩니다.

- **빠른 텍스트/정리**: `kimi-k2-0905-preview`
- **탐색/툴 오케스트레이션**: `kimi-k2-thinking`
- **파일/이미지/PDF 해석**: `kimi-k2.5`
- **고가치 최종 응답 fallback**: `claude-sonnet-4-6`

## 화면별 배치표

| 화면 | 1차 모델 | 후속 단계 | 맡길 일 | LLM에 맡기면 안 되는 일 |
|---|---|---|---|---|
| 홈 대시보드 | 없음 또는 `kimi-k2-0905-preview` | 필요 시 Sonnet | KPI 설명, 지난주 변화 요약, “이 숫자가 왜 변했는지” 자연어 설명 | KPI 계산, 집계 로직, 권한별 숫자 노출 |
| 통합 검색 | `kimi-k2-thinking` | `kimi-k2-0905-preview`로 최종 문장화 | 질의 재작성, 어떤 툴을 먼저 부를지 계획, 검색 결과 묶음 요약 | 검색 결과 없는 답을 추정해서 생성 |
| 고객/리드/계정 상세 | `kimi-k2-0905-preview` | 긴 문맥이면 Sonnet | 1페이지 브리프, 최근 이슈 요약, 다음 액션 초안 | canonical field 수정, 점수/등급 계산 |
| 상담/티켓 상세 | `kimi-k2-thinking` + `kimi-k2-0905-preview` | 첨부 있으면 `kimi-k2.5` | 조사 플랜, 스레드 요약, 답변 초안, 감정/긴급도 분류 | 티켓 종료/환불/승인 같은 write action |
| 문서 업로드/첨부 보기 | `kimi-k2.5` | validator → `kimi-k2-0905-preview` | 이미지/PDF/스크린샷에서 필드 추출, OCR 후 구조화 JSON, 사람용 요약 | 추출 실패한 값을 지어내기 |
| 리포트/분석 빌더 | `kimi-k2-thinking` | deterministic query builder → `kimi-k2-0905-preview` | 자연어 질의 해석, 지표 정의 확인 질문, 결과 설명 | SQL 실행 결정, 권한 우회, 숫자 계산 |
| 액션 모달(승인/변경/종료) | `kimi-k2-0905-preview` | backend executor | “이 액션이 어떤 영향인지” preview 문구 | 실제 실행 판단 |
| 관리자/정책/설정 | 기본적으로 없음 | 설명형 보조만 `kimi-k2-0905-preview` | 정책 문구 초안, 설정 가이드 요약 | 저장 경로, 권한 정책, 보안 설정 변경 |
| 운영 품질/리플레이 콘솔 | `kimi-k2-0905-preview` 또는 `kimi-k2-thinking` | 없음 | 실패 케이스 군집화, bad case 라벨링, 원인 분류 | 프로덕션 데이터 수정 |

## 제가 실제로 꽂는 플로우 4개

### 1) 통합 검색창
가장 중요한 화면입니다.

`사용자 질문`  
→ `kimi-k2-thinking`이 intent 분류 + 검색 플랜 생성  
→ 내부 검색/CRM/티켓/문서 툴 호출  
→ `kimi-k2-0905-preview`가 최종 답변 정리  
→ 문맥이 너무 길거나 한국어 최종 톤이 중요하면 Sonnet fallback

여기서는 **모델이 답을 만드는 게 아니라, 어떤 소스를 먼저 읽을지 정하는 역할**만 강하게 시키는 게 좋습니다.

### 2) 첨부파일/문서 업로드
이건 무조건 2단계로 쪼개는 편이 안정적입니다.

`파일 업로드`  
→ `kimi-k2.5`가 구조화 JSON 추출  
→ validator가 필수 필드/날짜 형식/숫자 형식 검사  
→ `kimi-k2-0905-preview`가 사람용 설명 생성

즉 **“비전 해석”과 “최종 답변”을 분리**합니다.  
그래야 추출 실패를 잡을 수 있습니다.

### 3) 티켓/상담 답변 초안
한 화면 안에서 모델을 둘로 나눕니다.

- **조사 버튼**: `kimi-k2-thinking`
- **답변 초안 버튼**: `kimi-k2-0905-preview`
- **첨부 파싱**: `kimi-k2.5`

이렇게 나누면 비용도 줄고, 실패 원인도 빨리 찾습니다.

### 4) 액션 버튼
여기서 가장 많이 사고 납니다.

`변경/승인/종료/전송` 같은 버튼은  
LLM이 하는 일 = **preview 생성**  
backend가 하는 일 = **권한 검사 + 실제 실행**

즉 LLM 응답 스키마는 항상 이런 식입니다.

```json
{
  "allowed": false,
  "preview": "이 작업은 고객 등급을 변경합니다.",
  "missing_checks": ["permission.admin"],
  "recommended_next_step": "관리자 승인 요청"
}
```

## 내부 툴 게이트웨이 원칙

Moonshot은 공식 툴로 `web-search`, `excel`, `fetch`, `quickjs`, `code_runner`, `memory` 등을 제공합니다. 다만 Lider에서는 이걸 프론트에서 바로 노출하지 말고, **반드시 내부 Tool Gateway 뒤에 두는 쪽**이 좋습니다. 그래야 권한, 로깅, 비용, 감사 추적이 한 군데에서 정리됩니다. 또 내장 `builtin_function.$web_search`는 thinking과의 제약이 있으니, 검색형 화면에서는 **내부 검색 서비스**가 웹검색을 대신 호출하게 두는 편이 더 깔끔합니다.

## 바로 개발 가능한 route config 초안

```yaml
routes:
  dashboard_explain:
    primary: kimi-k2-0905-preview
    fallback: claude-sonnet-4-6
    tools: [kpi_read, report_read]
    allow_write: false

  global_search:
    planner: kimi-k2-thinking
    finalizer: kimi-k2-0905-preview
    fallback: claude-sonnet-4-6
    tools: [internal_search, crm_lookup, ticket_search, doc_fetch]
    allow_write: false

  record_detail_brief:
    primary: kimi-k2-0905-preview
    fallback: claude-sonnet-4-6
    tools: [crm_lookup, timeline_read]
    allow_write: false

  ticket_investigate:
    planner: kimi-k2-thinking
    attachment_parser: kimi-k2.5
    finalizer: kimi-k2-0905-preview
    tools: [ticket_read, crm_lookup, kb_search]
    allow_write: false

  document_extract:
    primary: kimi-k2.5
    postprocess: validator
    finalizer: kimi-k2-0905-preview
    allow_write: false

  analytics_query:
    planner: kimi-k2-thinking
    compiler: safe_sql_service
    finalizer: kimi-k2-0905-preview
    fallback: claude-sonnet-4-6
    allow_write: false

  action_preview:
    primary: kimi-k2-0905-preview
    tools: [permission_check, impact_estimator]
    allow_write: false

  action_execute:
    primary: none
    executor: backend_service
```

## MVP 구현 순서

제가 Lider PM/CTO면 순서를 이렇게 잡습니다.

1. **문서 업로드**
   - 성공/실패가 눈에 잘 보여서 품질 측정이 쉽습니다.
2. **통합 검색**
   - 가장 많은 체감가치를 줍니다.
3. **티켓 답변 초안**
   - ROI가 빠릅니다.
4. **액션 preview**
   - 사고 방지 효과가 큽니다.

## 컷오버 기준

Sonnet fallback을 걷어낼지 말지는 감으로 보면 안 되고, 이 4개 수치로 봐야 합니다.

- `json_valid_rate` 98% 이상
- `wrong_tool_rate` 3% 이하
- `grounded_answer_rate` 95% 이상
- `fallback_rate` 20% 이하

한 줄 결론으로 끝내면, **Lider는 “페이지별 단일 모델”이 아니라 “화면 안에서 버튼/행동별 라우팅”이 맞습니다.**  
특히 **검색창은 K2 Thinking**, **첨부는 K2.5**, **요약·초안은 K2-0905**, **긴 문맥 최종안만 Sonnet**으로 나누면 가장 덜 위험합니다.

실제 화면명만 붙으면 이걸 바로 **Jira 티켓 단위**로 쪼갤 수 있습니다.

---

## [9] User

ㄱ

---

## [10] Assistant

좋습니다. **바로 발행 가능한 Jira 백로그 v0**로 자르겠습니다.

최신 문서 기준으로 보면, 지금 기준점은 이렇게 잡으면 됩니다. Moonshot에서 현재 문서에 명시된 주요 모델 ID는 `kimi-k2.5`, `kimi-k2-0905-preview`, `kimi-k2-thinking`, `kimi-k2-thinking-turbo`이고, K2.5와 K2 thinking 계열은 256K 컨텍스트를 지원합니다. K2.5는 멀티모달이며 thinking이 기본 활성화되고, `kimi-latest`와 `kimi-thinking-preview`는 이미 중단됐습니다. Claude Sonnet 4.6은 1M 컨텍스트를 지원하고, 표준 가격 기준 입력 $3/MTok·출력 $15/MTok이라 Lider에서는 **fallback / premium final answer** 전용으로 남기는 구조가 여전히 타당합니다.

구현 규칙도 같이 못 박아두는 게 좋습니다. Kimi는 OpenAI 호환 Chat Completions를 쓰되 deprecated `functions`가 아니라 `tools`를 써야 하고, JSON Mode는 `response_format={"type":"json_object"}` 기반의 **top-level object** 출력만 기대하는 편이 안전합니다. 또 K2.5의 built-in `$web_search`는 thinking과 같이 쓰지 않는 편이 맞고, thinking 계열은 `reasoning_content`를 문맥에 유지하면서 `max_tokens >= 16000`와 streaming을 잡는 것이 권장됩니다.

## Epic 1. AI Core Platform

**LDR-AI-001 | AI Provider 공통 어댑터 | P0**  
설명: Moonshot/Anthropic 호출을 하나의 내부 SDK로 감싼다.  
완료조건:
- 모델별 호출 인터페이스 통일
- streaming / usage / error code / latency 수집
- request_id 기준 추적 가능
- provider 교체 시 application code 수정 최소화

**LDR-AI-002 | 공통 Response Envelope + Schema Registry | P0**  
설명: 기계가 읽는 출력은 전부 하나의 object envelope로 통일한다.  
완료조건:
- `assist_response_v1`, `extract_response_v1`, `action_preview_v1` 스키마 등록
- top-level array 금지
- schema version 포함
- validation 실패 시 repair 경로 존재

**LDR-AI-003 | 모델 라우터 구현 | P0**  
설명: 입력 타입에 따라 primary/fallback 모델을 자동 선택한다.  
완료조건:
- 첨부파일 있으면 extract stage로 분기
- multi-tool 질의는 thinking 경로로 분기
- 짧은 요약/태깅/JSON 생성은 base text 경로로 분기
- long-context / premium final only는 Sonnet fallback 허용
- K2.5 thinking 경로에서는 built-in web search 금지 룰 존재

**LDR-AI-004 | Retry / Repair / Fallback 정책 | P0**  
설명: JSON 깨짐, timeout, tool 실패 시 자동 복구한다.  
완료조건:
- network retry 1회
- JSON repair 1회
- tool timeout / 5xx 분리 처리
- 최종 실패 시 Sonnet fallback 또는 safe failure 반환

## Epic 2. Tool Gateway

**LDR-AI-005 | Tool Registry + Permission Layer | P0**  
설명: 모델이 직접 백엔드에 닿지 않고 Tool Gateway를 통해서만 접근하도록 한다.  
완료조건:
- `*_read`, `*_search`, `*_lookup`, `*_preview`, `*_execute` 네이밍 규칙 적용
- tool schema는 전부 JSON Schema object
- 허용 툴 화이트리스트 지원
- write tool은 기본 비활성

**LDR-AI-006 | Search / CRM / Ticket / Doc 어댑터 | P0**  
설명: 통합 검색과 상담 화면에서 쓸 read-only 툴 4종을 먼저 붙인다.  
완료조건:
- `internal_search`
- `crm_lookup`
- `ticket_read`
- `doc_fetch`
- 툴 결과에 source metadata 포함

**LDR-AI-007 | Write Action 분리 실행 | P0**  
설명: LLM은 preview만 만들고 실제 실행은 백엔드가 맡는다.  
완료조건:
- 모델은 `/preview`만 호출 가능
- `/execute`는 backend service only
- permission check 미통과 시 실행 차단
- 감사 로그 저장

## Epic 3. Document Extract MVP

**LDR-AI-008 | `/v1/extract` API 구현 | P0**  
설명: 이미지/PDF/스크린샷을 구조화 JSON으로 추출한다.  
완료조건:
- `extract_type` 지원: `form | invoice | poster | screen | generic`
- attachment 단건/다건 처리
- extraction output은 schema registry와 연결
- warning 필드 포함

**LDR-AI-009 | Extraction Validator / Normalizer | P0**  
설명: 추출값을 사람이 쓸 수 있는 값으로 정규화한다.  
완료조건:
- 날짜/금액/전화번호/URL normalize
- 필수 필드 누락 감지
- confidence 낮으면 `needs_review=true`
- validator 실패 건은 human review queue로 이동

**LDR-AI-010 | 문서 검수 큐 | P1**  
설명: 운영자가 틀린 추출 결과를 바로 수정할 수 있게 한다.  
완료조건:
- 원본 미리보기
- 모델 출력 / 정답 수정 UI
- 수정본을 gold dataset으로 저장
- 재학습/재평가용 export 지원

## Epic 4. Assist / Search MVP

**LDR-AI-011 | `/v1/assist` API 구현 | P0**  
설명: 사용자 대화 진입점.  
완료조건:
- text + attachment 혼합 입력 지원
- session_id 기반 multi-turn 지원
- locale / risk_tier / allowed_tools 지원
- answer / citations / meta 반환

**LDR-AI-012 | Search Planner | P0**  
설명: “무엇을 먼저 찾고 어떤 툴을 부를지”만 담당하는 planner를 만든다.  
완료조건:
- 질의 재작성
- tool plan 생성
- 툴 호출 전/후 state 저장
- no-result일 때 추정 답변 금지

**LDR-AI-013 | Final Answer Composer | P0**  
설명: 툴 결과를 사람이 읽기 쉬운 한국어 답변으로 정리한다.  
완료조건:
- facts와 answer 분리
- source 없는 문장 최소화
- 고객-facing tone 가이드 적용
- 필요 시 fallback 결과 비교 로그 저장

## Epic 5. Safe Action MVP

**LDR-AI-014 | `/v1/actions/preview` API | P0**  
설명: 승인/변경/종료/전송류 액션은 먼저 preview만 만든다.  
완료조건:
- `allowed`
- `missing_checks`
- `impact_summary`
- `human_readable_preview`
- `recommended_next_step`
필드 반환

**LDR-AI-015 | Permission / Policy Adapter | P0**  
설명: 액션 preview 단계에서 정책 검사 결과를 주입한다.  
완료조건:
- owner/admin 권한 체크
- 정책 위반 사유 코드화
- irreversible action 식별
- high-risk action은 무조건 human confirm

## Epic 6. Quality / Ops

**LDR-AI-016 | 구조화 로깅 + 비용 대시보드 | P0**  
설명: 모델/툴별 품질과 비용을 같이 본다.  
완료조건:
- model_id
- prompt_tokens / completion_tokens
- fallback_used
- tool_count
- schema_valid
- latency_ms
- estimated_cost
저장

**LDR-AI-017 | Golden Set + Replay Harness | P1**  
설명: bad case를 다시 태워서 회귀를 막는다.  
완료조건:
- extract / assist / action_preview 3개 태스크셋 분리
- 정답셋 업로드 가능
- 모델 버전별 비교 가능
- 회귀 알람 생성

**LDR-AI-018 | Sonnet Fallback 컷오버 기준 | P1**  
설명: 감으로 끄지 말고 수치로 fallback 범위를 줄인다.  
완료조건:
- `json_valid_rate`
- `wrong_tool_rate`
- `grounded_answer_rate`
- `fallback_rate`
대시보드화
- 임계치 충족 시 특정 플로우 fallback off 가능

## 바로 발행 순서

가장 먼저 올릴 건 이 8개입니다.

1. `LDR-AI-001`  
2. `LDR-AI-002`  
3. `LDR-AI-003`  
4. `LDR-AI-005`  
5. `LDR-AI-008`  
6. `LDR-AI-009`  
7. `LDR-AI-011`  
8. `LDR-AI-014`

이 8개가 깔리면 Lider는 최소한 **문서 추출 / 검색 보조 / 답변 초안 / 액션 preview**까지는 바로 들어갑니다.

## 출시 컷

MVP 출시 기준은 이 정도면 충분합니다.

- extract 성공률이 사람 기준으로 쓸 만할 것
- assist가 source 없는 단정 답변을 거의 안 할 것
- action은 execute와 preview가 완전히 분리될 것
- fallback 사유가 전부 로그에 남을 것

한 줄로 정리하면, **지금 바로 Jira에 넣을 우선순위는 “라우터 → 툴 게이트웨이 → extract → assist → action preview → eval” 순서**입니다.

---

## [11] User

ㄱ

---

## [12] Assistant

좋습니다. 이번에는 **개발팀 핸드오프용 `Prompt Pack + Router Skeleton + Eval Sheet`**까지 바로 쓸 수 있게 내리겠습니다.

지금 기준 Moonshot 공식 문서상 Kimi API는 OpenAI 호환 방식으로 `/v1/chat/completions`와 `/v1/files`를 쓸 수 있지만, deprecated `functions`는 지원하지 않고 **`tools` 기반 tool calling**으로 가야 합니다. 또 `kimi-k2-0905-preview`, `kimi-k2-thinking`, `kimi-k2.5`는 모두 **256K 컨텍스트**를 지원하고, `kimi-k2.5`는 **native multimodal**이며 thinking이 기본 활성화됩니다. Thinking 계열은 `reasoning_content`를 문맥에 유지하고, `max_tokens ≥ 16,000`, `temperature=1.0`, `stream=true`를 권장하며, **K2.5 thinking과 내장 `$web_search`는 현재 같이 쓰지 않는 편**이 공식 가이드입니다. Anthropic 공식 문서상 `claude-sonnet-4-6`은 **1M context**, **adaptive thinking**, **multilingual**을 지원하므로 fallback 자리로 남기기 좋습니다.

## 1) 바로 쓸 레포 구조

```text
/apps
  /api
    /routes
      assist.py
      extract.py
      action_preview.py
    /schemas
      assist_response_v1.json
      extract_response_v1.json
      action_preview_v1.json
    /services
      router.py
      provider_kimi.py
      provider_claude.py
      tool_gateway.py
      validator.py
      evaluator.py
    /prompts
      planner.txt
      extractor.txt
      finalizer.txt
      action_preview.txt
    /tests
      golden/
        assist/
        extract/
        action_preview/
```

핵심은 단순합니다.

- `provider_*`는 모델 호출만 담당
- `router.py`는 어느 모델로 보낼지만 결정
- `tool_gateway.py`는 read/write 툴 접근 통제
- `validator.py`는 JSON/schema/fact 검증
- `prompts/`는 업무 프롬프트 버전 관리
- `tests/golden/`은 회귀 방지

## 2) 모델 라우터 골격

아래 정도면 바로 시작 가능합니다.

```python
from dataclasses import dataclass

@dataclass
class Task:
    kind: str                 # assist | extract | action_preview
    has_attachment: bool
    needs_multi_tool: bool
    needs_recent_data: bool
    customer_facing: bool
    expected_context_tokens: int
    high_risk: bool

def route(task: Task) -> dict:
    if task.kind == "extract" and task.has_attachment:
        return {
            "primary": "kimi-k2.5",
            "mode": "extract",
            "fallback": "claude-sonnet-4-6"
        }

    if task.kind == "action_preview":
        return {
            "primary": "kimi-k2-0905-preview",
            "mode": "preview_only",
            "fallback": None
        }

    if task.needs_multi_tool or task.needs_recent_data:
        return {
            "primary": "kimi-k2-thinking",
            "mode": "planner",
            "fallback": "claude-sonnet-4-6"
        }

    if task.customer_facing and task.expected_context_tokens > 180_000:
        return {
            "primary": "claude-sonnet-4-6",
            "mode": "final_answer",
            "fallback": None
        }

    return {
        "primary": "kimi-k2-0905-preview",
        "mode": "finalizer",
        "fallback": "claude-sonnet-4-6" if task.customer_facing else None
    }
```

여기서 중요한 건 **“답변 모델”과 “계획 모델”을 분리**하는 겁니다.  
검색/툴/최신성 이슈가 있으면 먼저 planner로 보내고, 최종 문장화는 더 싼 모델로 마감하는 식이 비용과 디버깅 둘 다 낫습니다.

## 3) 프롬프트 팩

### A. planner (`kimi-k2-thinking`)
이 프롬프트는 **답을 잘 쓰게** 하는 게 아니라 **어떤 툴을 먼저 부를지** 고르게 하는 데 목적이 있습니다.

```text
You are Lider Planner.

Your job:
1. Understand the user goal.
2. Decide whether tools are required.
3. If freshness, state, permission, price, or operational status matters, do not answer from memory.
4. Produce a JSON object only.

Hard rules:
- Never fabricate facts.
- Never claim an action has already been executed.
- Prefer internal tools before web search.
- If evidence is insufficient, return "needs_more_data": true.

Return schema:
{
  "intent": "search|summarize|draft|analyze|act_preview",
  "needs_tools": true,
  "tool_plan": [
    {"tool": "internal_search", "args": {}}
  ],
  "needs_fallback": false,
  "needs_more_data": false,
  "reason": "short explanation"
}
```

### B. extractor (`kimi-k2.5`)
이건 **보이는 것만 추출**하게 강하게 묶는 게 핵심입니다.

```text
You are Lider Extractor.

Goal:
Extract structured information from the provided file or image.

Hard rules:
- Only extract what is visible in the file.
- If text is blurry, incomplete, or ambiguous, do not guess.
- Put uncertain items into warnings.
- Return JSON object only.

Return schema:
{
  "doc_type": "poster|invoice|screen|form|generic",
  "fields": {},
  "warnings": [],
  "needs_review": false
}
```

### C. finalizer (`kimi-k2-0905-preview`)
이건 사람에게 보여줄 한국어를 정리하는 용도입니다.

```text
You are Lider Finalizer.

You will receive:
- verified facts
- tool outputs
- policy notes

Your job:
- write a concise Korean answer
- separate facts from suggestions
- never introduce unsupported claims
- if a required fact is missing, say it is not confirmed

Return JSON object:
{
  "answer": "final Korean answer",
  "facts_used": [],
  "uncertainties": [],
  "followup_actions": []
}
```

### D. action preview (`kimi-k2-0905-preview`)
이건 **실행 금지**가 핵심입니다.

```text
You are Lider Action Previewer.

You do NOT execute actions.
You only explain:
- what the action would do
- what checks are still missing
- whether human confirmation is needed

Return JSON object:
{
  "allowed": false,
  "impact_summary": "what would happen",
  "missing_checks": [],
  "human_confirmation_required": true,
  "recommended_next_step": ""
}
```

## 4) 호출 예시

### A. planner 호출
Moonshot은 OpenAI 호환이지만, tool use는 `functions`가 아니라 `tools`를 써야 하고, JSON Mode는 `response_format={"type":"json_object"}`로 거는 식이 정석입니다. 또 JSON Mode는 **top-level object**만 기대하는 편이 안전합니다.

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["MOONSHOT_API_KEY"],
    base_url="https://api.moonshot.ai/v1",
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "internal_search",
            "description": "Search internal indexed knowledge",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "limit": {"type": "integer"}
                },
                "required": ["query"]
            }
        }
    }
]

resp = client.chat.completions.create(
    model="kimi-k2-thinking",
    messages=[
        {"role": "system", "content": PLANNER_PROMPT},
        {"role": "user", "content": "지난주 고객 이슈를 요약하고, 아직 미해결 티켓이 있으면 알려줘"}
    ],
    tools=tools,
    response_format={"type": "json_object"},
    temperature=1.0,
    max_tokens=32000,
    stream=True,
)
```

### B. extraction 호출
`kimi-k2.5`는 멀티모달 입력을 받고, image/video는 base64나 `ms://<file_id>` 방식 둘 다 쓸 수 있습니다. 이미지/비디오가 큰 경우는 업로드 후 file ID 참조가 가능하고, 시각 입력 토큰 수는 별도 estimate API로 미리 계산할 수 있습니다.

```python
resp = client.chat.completions.create(
    model="kimi-k2.5",
    messages=[
        {"role": "system", "content": EXTRACTOR_PROMPT},
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {"url": image_url_or_ms_file_id}
                },
                {
                    "type": "text",
                    "text": "이 이미지를 보고 행사명, 날짜, 장소를 추출해줘"
                }
            ]
        }
    ],
    thinking={"type": "disabled"},
    response_format={"type": "json_object"},
    max_tokens=4000
)
```

제가 extraction에서 `thinking`을 끄라고 권하는 이유는 품질보다 **속도와 일관성**이 더 중요할 때가 많기 때문입니다. 문서 파싱은 “깊게 생각하기”보다 “보이는 걸 안정적으로 object로 빼기”가 우선입니다.

## 5) `reasoning_content` 처리 규칙

Thinking 모델을 쓸 때는 이 부분이 제일 많이 깨집니다. Moonshot 공식 가이드는 `reasoning_content`를 계속 문맥에 유지하고, `max_tokens ≥ 16,000`, `temperature=1.0`, `stream=true`를 권장합니다. OpenAI SDK 타입에서 `reasoning_content`가 바로 노출되지 않을 수 있으니 `getattr(...)`로 읽는 방식이 필요합니다.

```python
def extract_reasoning(msg):
    return getattr(msg, "reasoning_content", None)

def append_assistant_turn(messages, message):
    payload = {
        "role": "assistant",
        "content": message.content or ""
    }
    reasoning = extract_reasoning(message)
    if reasoning:
        payload["reasoning_content"] = reasoning
    if getattr(message, "tool_calls", None):
        payload["tool_calls"] = message.tool_calls
    messages.append(payload)
```

실무 규칙은 이 정도면 됩니다.

- planner/agent loop에서는 `reasoning_content` 유지
- finalizer/extractor 단발 호출에서는 굳이 유지하지 않음
- frontend에는 `reasoning_content`를 그대로 노출하지 않음
- 내부 로그에는 샘플링 저장만

## 6) `$web_search` 운영 규칙

Moonshot 내장 웹검색은 `builtin_function.$web_search`로 선언하고, 호출당 **$0.005**가 붙습니다. 여기에 검색 결과 토큰도 다음 `/chat/completions` 토큰 과금에 포함됩니다. 그래서 Lider처럼 이미 내부 검색 인프라가 있으면 **웹검색은 기본값이 아니라 fallback**으로 두는 편이 좋습니다. 특히 K2.5 thinking과는 현재 같이 쓰지 않는 것이 공식 가이드입니다.

실무 규칙은 이렇게 두면 됩니다.

- 1순위: `internal_search`
- 2순위: `crm_lookup` / `ticket_read` / `doc_fetch`
- 3순위: 그래도 최신성이 안 풀리면 `$web_search`
- 파일 해석 + 최신검색이 동시에 필요하면  
  `K2.5 extract → K2 thinking planner`  
  두 단계로 분리

## 7) Validator 규칙

이건 모델보다 중요합니다.

```python
def validate_extract(payload: dict) -> dict:
    warnings = payload.get("warnings", [])
    fields = payload.get("fields", {})

    # 예시 규칙
    if "date" in fields and not is_iso_date(fields["date"]):
        warnings.append("date_format_invalid")
        payload["needs_review"] = True

    if not fields:
        warnings.append("no_fields_extracted")
        payload["needs_review"] = True

    payload["warnings"] = warnings
    return payload
```

`validator.py`에서 최소한 이 4개는 잡아야 합니다.

- schema valid 여부
- 필수 필드 누락
- 날짜/금액/번호 normalize
- unsupported claim 존재 여부

## 8) Eval Sheet

출시 전에 이 6개만 보면 됩니다.

| 지표 | 의미 | 목표 |
|---|---|---|
| `json_valid_rate` | 파싱 가능한 object 비율 | 98%+ |
| `extract_field_f1` | 추출 정답률 | use-case별 기준 |
| `wrong_tool_rate` | 틀린 툴 선택 비율 | 3% 이하 |
| `grounded_answer_rate` | 소스 기반 답변 비율 | 95%+ |
| `fallback_rate` | Sonnet으로 넘어간 비율 | 20% 이하 |
| `unsafe_action_preview_rate` | preview가 실행처럼 말한 비율 | 0% |

그리고 golden set은 최소 3묶음으로 나누는 게 좋습니다.

- `extract`: 포스터, 캡처, 영수증, 폼
- `assist`: 검색형, 요약형, 초안형
- `action_preview`: 종료, 승인, 수정, 전송

## 9) 이번 주 바로 착수 순서

제가 Lider 개발 리드면 이번 주는 이렇게 갑니다.

1. `provider_kimi.py` 만들기  
2. `response envelope + schema registry` 만들기  
3. `extractor prompt + /v1/extract` 붙이기  
4. `planner prompt + /v1/assist` 붙이기  
5. `tool_gateway`에서 read-only 툴만 먼저 열기  
6. `action_preview`는 execute 없이 preview만 먼저 출시  
7. golden set 30~50개부터 쌓기

한 줄로 정리하면, **지금 단계에서 제일 중요한 건 모델 선택보다 “planner / extractor / finalizer / previewer를 분리한 계약”**입니다.  
이 계약만 먼저 잡히면 Kimi 성능이 올라가도 구조를 안 바꿔도 되고, Sonnet fallback도 점진적으로 걷어낼 수 있습니다.

다음으로 이어가면 가장 자연스러운 건 **실제 Python/FastAPI 코드 뼈대**까지 바로 내려주는 단계입니다.

---

## [13] User

위 채팅의 모든 내역을 md로 묶고 기존 lider 최종 디자인 오류까지잡은 패치한 배포파일까지 포함해서 단일 zip으로 다운링크줘
