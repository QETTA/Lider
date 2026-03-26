# LIDER 디자인 컨셉 설계자료

상태: Draft v2  
작성일: 2026-03-26  
대상: `/frontend` 리디자인 기준 문서  
범위: `Catalyst + Oatmeal` 혼합 전략, 토큰, 페이지 책임 분담, 구현 우선순위

## 1. 이 문서의 목적

이 문서는 `LIDER`를 하나의 제품처럼 보이게 만들기 위한 기준점이다.

문제는 단순하다.

- `Catalyst`는 내부 운영 앱에 강하다.
- `Oatmeal`은 차분하고 설득력 있는 랜딩과 에디토리얼 톤에 강하다.
- 현재 `LIDER`는 두 세계가 모두 필요하지만, 지금 화면은 `글래스모피즘 데모`, `케어 제품`, `업무 도구`의 인상이 섞여 있다.

따라서 이 문서는 “두 템플릿을 같이 쓴다”가 아니라, `어떤 역할을 어느 층위에서 누가 맡는가`를 고정하기 위해 작성한다.

핵심 결정은 다음 한 줄이다.

> `Oatmeal의 정서`를 바깥에 두고, `Catalyst의 구조`를 안쪽에 둔다.

이 원칙만 흔들리지 않으면, 랜딩과 앱 내부가 달라도 같은 브랜드처럼 보일 수 있다.

## 2. 리서치 기반

### 2.1 공식 프리뷰에서 읽은 역할

#### Catalyst

공식 페이지 기준 `Catalyst`는:

- React 기반의 application UI kit이다.
- 버튼, 입력, 테이블, 사이드바, 다이얼로그, 폼 등 “업무 도구의 기본 골격”을 빠르게 만드는 데 목적이 있다.
- 과하게 유행을 타지 않고, 너무 밋밋하지도 않은 중간 지점을 목표로 한다.
- “자기 코드베이스 안에 들여와서 자기 디자인 시스템으로 키우는 기반”이라는 성격이 강하다.

정리하면 `Catalyst = 운영 제품의 뼈대`다.

#### Oatmeal

공식 페이지 기준 `Oatmeal`은:

- SaaS marketing kit이다.
- 50개 이상의 컴포넌트, 100개 이상의 아이콘, 여러 색 조합과 폰트 조합을 제공한다.
- 하나의 고정된 템플릿보다, 섹션을 조합해 브랜드 톤을 만들 수 있게 설계되어 있다.
- 차분하고 에디토리얼한 인상을 주는 랜딩/마케팅에 적합하다.

정리하면 `Oatmeal = 제품 외피와 브랜드 정서`다.

### 2.2 로컬 ZIP 구조에서 읽은 실무 포인트

#### Catalyst ZIP에서 바로 가져올 수 있는 것

로컬 압축본 기준 `catalyst-ui-kit`에는 다음과 같은 앱용 기본기가 이미 있다.

- `button`, `input`, `textarea`, `select`
- `table`, `description-list`
- `dialog`, `dropdown`
- `sidebar`, `navbar`, `sidebar-layout`, `stacked-layout`
- `badge`, `alert`, `avatar`
- `auth-layout`

즉, 내부 제품에서 매일 반복되는 `폼`, `목록`, `상세`, `설정`, `레이아웃`은 Catalyst 책임으로 보는 게 맞다.

#### Oatmeal ZIP에서 바로 가져올 수 있는 것

로컬 압축본 기준 `oatmeal-olive-instrument`에는 다음과 같은 마케팅용 요소가 강하다.

- `wallpaper`, `section`, `container`, `eyebrow`, `heading`, `text`
- rounded pill 계열의 버튼
- hero, feature, pricing, testimonial, FAQ, footer 섹션
- duotone 느낌의 아이콘 세트
- `Instrument Serif + Inter` 기반의 calm/editorial 무드

즉, `랜딩`, `empty state`, `onboarding intro`, `가벼운 설명 섹션`, `브랜드 소개 영역`은 Oatmeal 책임으로 보는 게 맞다.

### 2.3 현재 기술 스택과 템플릿 호환성 제약

이 문서는 비주얼 컨셉 문서이지만, 현재 코드베이스의 기술 제약을 무시하면 설계가 곧바로 구현과 충돌한다.  
따라서 아래 제약은 디자인 결정과 같은 수준의 중요도를 가진다.

현재 `LIDER` 프론트엔드는 다음 전제 위에 있다.

- `Vite + React 18 + React Router 6`
- `Tailwind CSS v3.3.6`
- `Headless UI` 미도입
- `main.tsx`에서 `EmotionModeProvider`, `SystemStatusProvider`로 앱을 감싼 구조
- `App.tsx` 기준 단일 앱 셸 + 라우트 분기 구조

반면 공식 템플릿은 다음 전제를 가진다.

- `Next.js App Router`
- `React 19`
- `Tailwind CSS v4.2`
- `Headless UI v2.1`
- `next/image`, metadata, `@theme`, `data-*` 기반 스타일 활용

즉, 이 문서는 템플릿 코드를 “복사 설치”하는 문서가 아니다.  
정확한 번역 원칙은 다음과 같다.

- `Catalyst`와 `Oatmeal`의 `구조`, `API 감각`, `표면 규칙`, `토큰 철학`을 가져온다.
- `Next.js` 전용 문법과 `Tailwind v4 @theme` 문법은 현재 스택에 맞게 재작성한다.
- `React 19`, `Headless UI`, `dark:` 변형은 무비판적으로 들여오지 않는다.
- 현재 앱은 `Vite React`이므로 “한 템플릿 통째 도입”보다 `컴포넌트 단위 이식`이 원칙이다.

이 문서에서 말하는 “Catalyst 적용”은 원본 파일을 그대로 쓰는 것이 아니라 아래 중 하나를 뜻한다.

- API 구조와 클래스 전략을 참고해 현재 컴포넌트를 리스타일링
- 현재 코드베이스에 맞게 재작성한 동등 컴포넌트로 교체
- 템플릿의 정보 위계와 토큰 규칙만 차용

## 3. 최종 컨셉

### 3.1 컨셉 이름

`Quiet Care Ledger`

한국어로는 다음 문장으로 정리한다.

`차분한 신뢰, 정확한 운영`

### 3.2 컨셉 설명

LIDER는 병원 EMR처럼 차갑지도, 복지 홍보 사이트처럼 느슨하지도 않아야 한다.

운영자는 매일 오래 써도 피로하지 않아야 하고, 센터장이나 파트너는 첫 화면에서 “정돈되어 있고 믿을 만하다”는 인상을 받아야 한다.  
따라서 화면은 따뜻해야 하지만 감상적이면 안 되고, 업무적이어야 하지만 건조하면 안 된다.

이 컨셉은 다음 두 문장을 동시에 만족시키는 것을 목표로 한다.

- `겉`: 사람을 돌보는 서비스처럼 보인다.
- `속`: 실수 없이 운영하는 도구처럼 작동한다.

### 3.3 제품이 되어야 하는 것 / 되지 말아야 하는 것

이 문서는 미적 취향보다 제품의 성격을 우선한다.  
따라서 아래의 쌍은 이후 세부 결정의 판단 기준이 된다.

되어야 하는 것:

- 차분한 기관용 케어 운영 도구
- 사람 중심이지만 숫자와 상태가 명료한 업무 화면
- 장식보다 기록, 검수, 상태 파악이 쉬운 UI
- 모바일에서도 실무자가 바로 쓰는 입력 도구
- 센터장, 파트너, 직원이 모두 “정돈되어 있다”고 느끼는 화면

되지 말아야 하는 것:

- 네온 계열의 AI 대시보드
- 미래적인 glass demo
- 병원용 EMR처럼 냉정하고 무거운 화면
- 소비자용 웰니스 앱처럼 감성적인 화면
- SaaS 마케팅 템플릿 그대로인 제품

## 4. 왜 50:50 혼합이 아니라 층위 분리여야 하는가

두 템플릿을 동일한 강도로 섞으면 다음 문제가 생긴다.

### 4.1 Oatmeal이 앱 깊숙이 들어오면 생기는 문제

- serif headline과 decorative section rhythm이 잦아진다.
- 폼/테이블/설정 화면까지 브랜드 연출이 들어와 업무 화면이 가벼워 보인다.
- 밀도 높은 화면에서 정보 위계보다 연출이 먼저 보인다.

### 4.2 Catalyst가 모든 곳을 지배하면 생기는 문제

- 제품 소개, 소개형 섹션, empty state가 너무 무난해진다.
- 센터/가족/파트너가 보는 첫인상에서 정서적 차별점이 약해진다.
- 의료/돌봄 서비스가 아닌 일반 B2B SaaS처럼 보일 위험이 있다.

### 4.3 따라서 필요한 구조

- `브랜드 캔버스`: Oatmeal
- `인터랙션 시스템`: Catalyst
- `정보 밀도 높은 운영 UI`: Catalyst 우선
- `브랜드 감정 조율`: Oatmeal 일부 차용

즉, Oatmeal은 `배경과 목소리`, Catalyst는 `문장 구조와 문법`이다.

## 5. 현재 코드베이스에 대한 진단

현재 프론트엔드 기준 문제는 다음과 같다.

### 5.1 강한 글래스/그라데이션 의존

현재 `frontend/src/styles/design-system.css`, `frontend/src/components/ui/GlassCard.tsx`, `frontend/src/components/layout/Layout.tsx`는 전반적으로:

- 강한 블러
- sky/violet 중심 그라데이션
- hover lift/scale
- “감성 데모” 같은 surface

에 기대고 있다.

이 방향은 Oatmeal의 calm paper feel도 아니고, Catalyst의 structured app feel도 아니다.

### 5.2 Emotion Mode의 브랜드 분산

`useEmotionMode.tsx`와 관련 UI는 화면의 감정 모드를 바꾸는 재미는 있지만, 실제 운영 제품 기준으로는 다음 문제가 있다.

- 브랜드 색이 고정되지 않는다.
- 상태 의미와 분위기 색이 섞인다.
- 센터 운영 UI에 필요한 예측 가능성을 떨어뜨린다.

이 기능은 핵심 브랜드 축이 아니라 `실험 기능`에 가깝다.  
정식 디자인 시스템 기준에서는 `기본 UI 구조`에 직접 영향 주지 않도록 격리하거나 제거하는 편이 맞다.

### 5.3 앱 셸 구조 자체는 이미 괜찮음

반대로 다음 파일들은 구조적 출발점이 좋다.

- `frontend/src/components/layout/Header2026.tsx`
- `frontend/src/components/layout/Sidebar2026.tsx`
- `frontend/src/components/layout/Layout.tsx`
- `frontend/src/pages/Dashboard2026.tsx`

즉, 지금 필요한 것은 `전체 재구축`보다 `surface, typography, token, state 표현의 재정렬`이다.

### 5.4 살려야 할 코드 자산

현재 코드 중 모두 버리면 손해인 자산도 분명히 있다.

- `frontend/src/components/layout/Layout.tsx`
  - 반응형 셸과 모바일 드로어 전환 구조는 이미 충분히 쓸 만하다.
- `frontend/src/components/layout/Header2026.tsx`
  - 시스템 상태와 사용자 액션이 한 줄에 묶이는 정보 구조는 좋다.
- `frontend/src/components/layout/Sidebar2026.tsx`
  - 운영 앱용 내비게이션 구조와 하단 유틸리티 분리는 유지 가치가 높다.
- `frontend/src/components/ui/PageShell.tsx`
  - `PageHeader`, `SectionCard`, `MetricTile`, `InlineNotice`의 조합형 API는 계속 활용 가능하다.
- `frontend/src/hooks/useSystemStatus.tsx`
  - `live / cached / unavailable` 구분은 이 제품의 신뢰성과 잘 맞는 모델이다.

즉, 리디자인은 “다 지우고 다시 그리기”가 아니라, `좋은 구조 위에 잘못된 표면을 덮어쓴 상태를 바로잡는 일`이어야 한다.

## 6. 디자인 시스템 원칙

### 6.1 원칙 1: 신뢰가 먼저 보여야 한다

숫자, 상태, 문서 위험도, 저장 결과 같은 운영 정보는 가장 먼저 읽혀야 한다.  
장식은 정보 해석을 돕는 범위까지만 허용한다.

### 6.2 원칙 2: 따뜻하지만 무르지 않아야 한다

배경과 타이포는 인간적인 온도를 주되, 버튼과 폼과 표는 단정하게 유지한다.

### 6.3 원칙 3: 밀도는 Catalyst, 호흡은 Oatmeal

- dense view는 Catalyst 규칙
- narrative section은 Oatmeal 규칙

### 6.4 원칙 4: 상태 색과 브랜드 색을 분리한다

브랜드의 기본 색은 “신뢰/차분함”을 담당하고, 경고/오류/대기 색은 오직 상태 의미만 담당한다.

### 6.5 원칙 5: 모션은 보조어이지 주어가 아니다

운영 화면에서 모션은 `전환`, `상태 변화`, `포커스`, `입력 피드백`만 지원한다.  
카드가 떠다니거나, 숫자가 불필요하게 튀는 연출은 최소화한다.

### 6.6 충돌이 생길 때의 우선순위

혼합 설계에서는 아름다움보다 우선순위가 중요하다.  
아래 순서는 타협이 필요할 때의 최종 판단 기준이다.

1. `정확한 정보 해석`
2. `한국어 가독성`
3. `모바일 실사용성`
4. `Catalyst식 구조 일관성`
5. `Oatmeal식 정서와 브랜드 무드`

이 의미는 명확하다.

- 입력/목록/상세/설정에서 Oatmeal의 연출과 Catalyst의 구조가 충돌하면 Catalyst를 따른다.
- 한글 타이포 품질과 Oatmeal 원본 폰트가 충돌하면 한글 가독성을 따른다.
- 예쁜 연출과 터치 타깃이 충돌하면 터치 타깃을 따른다.
- 시스템 상태/오류/저장 결과는 어떤 감성 연출보다 명확해야 한다.

## 7. 단일 비주얼 언어

## 7.1 캔버스

앱과 랜딩의 배경은 공통적으로 `warm linen canvas` 계열로 통일한다.

- 순백 배경 금지
- 블루/퍼플 대형 그라데이션 배경 금지
- 항상 약간의 따뜻한 회백/베이지 기반을 깐다
- 필요할 때만 매우 약한 radial tint를 얹는다

권장 기본 캔버스:

- `linen-25`: `#faf8f4`
- `linen-50`: `#f5f2eb`
- `stone-50`: `#f7f6f3`

용도:

- 앱 배경: `linen-25`
- 섹션 분리 배경: `stone-50`
- 랜딩 hero 주변: `linen-50 + subtle noise`

## 7.2 색 시스템

### 브랜드 기본색

`Oatmeal`의 olive 계열을 그대로 쓰기보다, 의료/요양 맥락에 맞게 한 단계 더 맑고 중립적으로 조정한다.

- `brand-900`: `#27352d`
- `brand-800`: `#34463c`
- `brand-700`: `#476053`
- `brand-600`: `#5d7769`
- `brand-500`: `#769181`

이 축은 logo, editorial headline, subtle emphasis에만 쓴다.

### 업무 강조색

실제 CTA와 선택 상태는 olive보다 `teal/sky`가 더 적합하다.

- `action-700`: `#0f6b6f`
- `action-600`: `#137d80`
- `action-500`: `#1c9a9d`
- `action-100`: `#dff4f4`

용도:

- primary button
- active nav
- focus ring
- selected chip

### 상태색

- `success-600`: `#1f7a43`
- `warning-600`: `#b7791f`
- `danger-600`: `#b54135`
- `info-600`: `#2f6eb3`

규칙:

- 상태색은 badge, dot, strip, small icon에만 쓴다
- 카드 전체를 강하게 칠하지 않는다
- 위험도를 설명하는 텍스트/아이콘은 강조하되, 전체 UI를 경보판처럼 만들지 않는다

## 7.3 타이포그래피

### 권장 조합

한글 기준 추천:

- Display Serif: `MaruBuri`
- UI Sans: `Pretendard`

영문 fallback:

- Display: `Instrument Serif`
- Sans: `Inter`

이유:

- Oatmeal의 editorial tone을 한글에 그대로 옮기려면 영문용 serif를 억지로 쓰는 것보다, 부드럽고 문서적인 한국어 serif가 낫다.
- 운영 UI 본문은 여전히 `Pretendard`가 가장 안정적이다.

### 역할 분리

- 랜딩 hero headline: Display Serif
- 섹션 title: Display Serif 또는 Sans Semibold
- 앱 화면 title: Sans Semibold
- 테이블/폼/body: Sans Regular
- 숫자/상태 수치: Sans Medium~Semibold

### 절대 규칙

- 앱 내부 dense view에서 serif 본문 금지
- form label, table header, badge에 serif 금지
- 대시보드 숫자를 decorative font로 처리하지 않는다

## 7.4 반경, 테두리, 그림자

### 반경

- page shell card: `20px`
- form card / list item: `16px`
- input / select / textarea / button: `14px`
- pill / badge: `999px`

### 보더

- 기본 보더: `1px solid rgba(39,53,45,0.08)`
- 강조 보더: `1px solid rgba(19,125,128,0.22)`
- overlay 보더: `1px solid rgba(255,255,255,0.55)`

### 그림자

그림자는 `깊이`를 표현해야지 `광택`을 표현하면 안 된다.

- 카드 기본: `0 8px 24px rgba(30, 41, 59, 0.06)`
- hover: `0 14px 34px rgba(30, 41, 59, 0.08)`
- 모달/드로어: `0 22px 60px rgba(15, 23, 42, 0.12)`

규칙:

- colored shadow 금지
- glow 계열 금지
- 큰 blur shadow 금지

## 7.5 surface 시스템

현재 `glass-card` 중심 구조는 다음처럼 바꾸는 것이 맞다.

### Surface 1: Paper

기본 업무 카드.

- 배경: 거의 흰색
- 보더: 매우 연한 stone/brand line
- 그림자: 얕게
- blur 없음

### Surface 2: Frosted Overlay

모바일 사이드바, dialog backdrop, floating tray에만 제한 사용.

- blur 허용
- 단, main content card에는 기본 사용 금지

### Surface 3: Tinted Section

랜딩 hero, empty state, guidance block용.

- oat/moss/teal의 매우 얕은 tint
- 미세한 noise나 radial light 허용

## 7.6 버튼 시스템

### Primary

- Catalyst 구조
- Oatmeal의 pill 감성은 일부만 반영
- shape는 완전 동그란 pill보다 `rounded-2xl`에 가깝게
- 색은 `action-600`

### Secondary

- white 또는 linen 배경
- 얕은 보더
- hover 시 배경만 미세하게 진해짐

### Tertiary / Plain

- 텍스트 버튼
- underline보다 subtle background hover 우선

규칙:

- 버튼에 violet/purple gradient 금지
- 모든 페이지에서 primary gradient CTA 금지
- 버튼 그림자 과다 사용 금지

## 7.7 입력계

입력계는 거의 전부 Catalyst 기준으로 맞춘다.

- 높이, 보더, focus state를 일관화
- placeholder는 low contrast
- label은 sans medium
- help text는 muted
- validation은 field 하단 작은 문장 + 아이콘

규칙:

- 입력창에 강한 glass 배경 금지
- 과도한 inset shadow 금지
- 입력마다 다른 accent color 금지

## 7.8 아이콘 시스템

앱 내부는 현재의 `lucide-react`를 유지해도 된다.  
다만 Oatmeal의 duotone 성격은 랜딩/설명 영역에서만 제한적으로 차용한다.

규칙:

- dense app UI에서는 single-tone outline icon 우선
- hero, empty, feature explainer에서만 richer icon 허용
- 페이지마다 icon stroke 두께가 달라지지 않게 한다

## 7.9 모션 시스템

권장 시간:

- hover: `150ms`
- panel open/close: `220ms`
- route shell change: `220~260ms`
- toast: `180ms`

규칙:

- 운영 수치 auto-animate 금지
- decorative floating animation 금지
- pulse는 recording/live sync 같은 실제 상태에만 허용
- card hover는 `1~2px` 정도만

## 7.10 간격과 밀도 시스템

Catalyst의 강점은 정보 밀도 조절에 있고, Oatmeal의 강점은 여백의 호흡에 있다.  
LIDER는 둘을 다음처럼 조합한다.

기본 간격 스케일:

- `4`, `8`, `12`, `16`, `24`, `32`, `40`, `56`

권장 규칙:

- 페이지 최상단 블록 간격: `24~32`
- 카드 내부 패딩: `16` 또는 `24`
- 폼 필드 간격: `12` 또는 `16`
- 조밀한 리스트 행 간격: `12`
- 설명 섹션의 단락 간격: `16~24`

중요한 건 “넓은 여백”이 아니라 “예측 가능한 밀도”다.  
업무 화면은 넉넉하되 느슨해 보이면 안 된다.

## 7.11 레이아웃 시스템

### 앱 셸

- content max width는 현재처럼 `7xl` 정도를 유지하되, 시각적으로는 `1280px` 안쪽의 집중도를 지향한다.
- 헤더는 sticky 유지
- 사이드바는 desktop fixed, mobile overlay 유지
- 본문은 `page header -> summary block -> main sections` 순서를 기본 패턴으로 삼는다

### 카드 배열

- 대시보드만 제한적으로 `bento` 허용
- 나머지 운영 화면은 `list/detail`, `form/aside`, `single column stack` 패턴을 우선한다
- 단순히 멋있어 보인다는 이유로 모든 화면을 bento grid로 바꾸지 않는다

### 상세 패널

- 우측 패널은 desktop에서만 side-by-side
- mobile에서는 반드시 하단 스택으로 떨어져야 한다
- 선택 상태 없는 패널은 empty state를 명확히 보여줘야 한다

## 7.12 데이터 시각화 규칙

현재 MVP는 수치와 카드 중심이지만, 대시보드 특성상 차트나 추세 그래프가 늘어날 가능성이 높다.  
따라서 차트도 지금부터 규칙을 고정한다.

- 차트는 브랜드 색 한 축과 상태 색 보조축만 사용한다
- 한 그래프에 4개 이상의 포화 색을 쓰지 않는다
- gradient fill은 area chart에서만 아주 약하게 허용한다
- 축, 단위, 기간, 기준값은 반드시 드러난다
- 숫자는 차트 안보다 차트 밖의 요약 문장으로 먼저 읽혀야 한다

차트의 목표는 “멋”이 아니라 `판단 속도`다.

## 7.13 카피 톤과 용어 규칙

시각 언어만큼 중요한 것이 텍스트 톤이다.  
Oatmeal의 calm함은 장식보다 문장 톤에서 더 많이 느껴진다.

권장 문체:

- 짧고 정확한 한국어
- 과장 대신 설명
- 영어 기술 용어 최소화
- 경고는 단호하되 과잉 공포 금지

권장 예:

- `센터 현황`
- `검수 대기`
- `최근 상태 기준`
- `연결 확인 중`
- `보완 필요`

지양 예:

- `AI-Powered Insight`
- `Realtime Intelligence`
- `Workspace`
- `Smart Care Revolution`

즉, 이 제품의 카피는 `B2B SaaS 카피`가 아니라 `운영 안내 문장`에 가까워야 한다.

## 7.14 접근성 기준

이 문서는 미감뿐 아니라 작업 안정성을 위한 기준 문서이므로 접근성을 기본값으로 본다.

- 텍스트 대비는 최소 `WCAG AA` 수준을 목표로 한다
- 포커스 링은 모든 버튼, 링크, 입력에 일관되게 보여야 한다
- 상태 표현은 색만으로 전달하지 않는다
- disabled 상태는 `색 + 커서 + 설명`으로 드러난다
- 터치 타깃은 최소 `44x44px`를 목표로 한다
- `prefers-reduced-motion` 환경에서는 hover/transition을 약화한다

`Catalyst`의 강점인 접근성 설계를 앱 내부에 우선 적용한다.

## 7.15 반응형 규칙

모바일은 축소판이 아니라 별도 실사용 모드로 다뤄야 한다.

- mobile header는 정보 과밀도를 피하고 핵심 상태만 남긴다
- 사이드바는 drawer 역할만 수행하고, 콘텐츠의 permanent margin을 만들지 않는다
- list/detail 화면은 mobile에서 반드시 vertical flow로 재구성한다
- 버튼 행은 mobile에서 세로 스택 또는 주/보조 2단 구조로 바뀌어야 한다
- 카드 내부 padding은 mobile에서 `16`, desktop에서 `20~24`를 기본으로 한다

운영 제품에서 mobile responsive는 “예쁘게 줄어드는 것”이 아니라 `정확히 쓸 수 있는 것`이어야 한다.

## 7.16 다크 모드 정책

`Catalyst`와 `Oatmeal` 모두 dark 스타일 예시를 제공하지만, `LIDER`의 v1 메인 시스템에서는 다크 모드를 기본 목표로 두지 않는다.

이유:

- 현재 운영 환경은 주간 실사용 비중이 높다
- 관리 화면의 의미 색 체계가 먼저 안정되어야 한다
- 다크 모드는 랜딩/앱/상태색 전부를 다시 검증해야 하므로 비용이 크다

정책:

- v1은 `light-only`를 기본 원칙으로 한다
- dark 관련 클래스는 무심코 들여오지 않는다
- 추후 필요할 때 별도 프로젝트로 설계한다

## 8. 정보 구조별 템플릿 책임 분담

## 8.1 퍼블릭/브랜드 레이어

대상:

- 미래 랜딩 페이지
- 파트너 소개
- 서비스 소개
- 문제/해결/신뢰 섹션
- FAQ / contact / case study

비중:

- Oatmeal 70
- Catalyst 30

설명:

- 레이아웃, hero rhythm, typography, footer, feature sections는 Oatmeal
- form, newsletter signup, CTA, mini cards는 Catalyst 구조로 정리 가능

## 8.2 인증/전환 레이어

대상:

- login
- onboarding
- first-run setup

비중:

- Oatmeal 45
- Catalyst 55

설명:

- 상단 헤드라인/보조 설명은 Oatmeal
- 입력/버튼/validation/stepper는 Catalyst

## 8.3 앱 셸 레이어

대상:

- global header
- sidebar
- mobile drawer
- global status

비중:

- Catalyst 80
- Oatmeal 20

설명:

- 구조와 interaction은 Catalyst
- 표면의 따뜻한 색감, 얕은 editorial feeling만 Oatmeal

## 8.4 업무 화면 레이어

대상:

- dashboard
- mobile-entry
- documents
- consultation
- elderly
- alerts
- settings

비중:

- Catalyst 85
- Oatmeal 15

설명:

- 표, 폼, 상태카드, 상세 패널은 Catalyst
- section intro, empty state, subtle surface tint만 Oatmeal

## 9. 현재 라우트 기준 적용 매핑

### `/dashboard`

- 구조: Catalyst
- 표현: Oatmeal 10~15%
- 핵심: 운영 보드로 보여야 한다
- 조정: `glass hero dashboard`에서 `paper operations board`로 이동

### `/mobile-entry`

- 구조: Catalyst form layout
- 표현: Oatmeal 15%
- 핵심: 현장 입력 도구여야 한다
- 조정: 기록 카드, AI 정리, 저장 버튼의 과한 gradient를 줄인다

### `/documents`

- 구조: Catalyst 90%
- 표현: Oatmeal 10%
- 핵심: 문서실/검수 콘솔 같은 신뢰감
- 조정: 목록-상세-작업패널 3분할을 명확히 하고 연출은 최소화

### `/consultation`

- 구조: Catalyst 80%
- 표현: Oatmeal 20%
- 핵심: AI 요약은 따뜻하게, 저장 인터랙션은 단정하게

### `/elderly`

- 구조: Catalyst 85%
- 표현: Oatmeal 15%
- 핵심: 사람 중심 카드이되 CRM처럼 읽혀야 한다

### `/alerts`

- 구조: Catalyst 90%
- 표현: Oatmeal 10%
- 핵심: 경고 센터이지 마케팅 페이지가 아니다

### `/settings`

- 구조: Catalyst 95%
- 표현: Oatmeal 5%
- 핵심: 가장 단정한 화면이어야 한다

## 10. 반드시 버릴 것

이 문서 기준으로 다음은 기본 금지 패턴이다.

- 전면 blue/purple radial gradient 배경
- 카드 대부분에 blur glass 적용
- 페이지마다 다른 감성 테마 전환
- colored shadow
- 대형 gradient CTA 남발
- dense view에서 decorative serif 과사용
- 운영 수치의 과한 애니메이션
- “AI라서 미래적인” 시각 장식
- 실제 상태와 무관한 반짝임, pulse, sparkle 강조
- `Tailwind v4 @theme` 문법을 현재 코드에 그대로 복붙
- `next/image`, metadata, App Router 패턴을 Vite 앱에 직접 이식
- 템플릿 원본의 dark mode 분기를 무비판적으로 유지
- `Headless UI` 의존을 디자인 이유만으로 한꺼번에 도입
- 디자인 시스템 없이 페이지별로 다른 CTA 색을 쓰는 것
- 랜딩용 에디토리얼 컴포넌트를 설정/문서/알림 화면에 그대로 가져오는 것

## 11. 구현 대상으로 번역한 컴포넌트 전략

## 11.1 유지

- `Header2026`
- `Sidebar2026`
- `Layout`
- `StatusBadge`
- `BentoGrid`

이들은 구조가 살아 있으므로 완전 폐기보다 리스타일링이 맞다.

## 11.2 리디자인

- `GlassCard`
- `EmotionModeSelector`
- `design-system.css`
- `index.css`
- `PageShell.tsx`

이 축은 현재 컨셉과 가장 많이 충돌한다.

## 11.3 교체 방향

### `GlassCard` → `PaperCard / FrostedPanel`

하나의 카드가 모든 surface 역할을 맡지 않게 분리한다.

- `PaperCard`: 기본 카드
- `TintedCard`: 설명/empty/insight
- `FrostedPanel`: drawer/dialog/floating tray

### `EmotionMode`

선택지:

- 기본 제품에서 제거
- 실험 기능으로 격리
- 관리자 전용 personalization으로 이동

공용 운영 UI의 메인 디자인 축으로는 사용하지 않는다.

### `PageShell`

현재 `PageHeader`, `SectionCard`, `MetricTile`, `InlineNotice`는 API 방향이 좋지만 표면 언어가 아직 새 컨셉과 맞지 않는다.

수정 원칙:

- gradient icon chip 축소
- glass wrapper 제거 또는 최소화
- page title hierarchy 단정화
- notice tone을 brand tone과 분리
- tile을 `종이 카드`로 재정의

### 파일별 1차 책임

- `frontend/src/components/layout/Layout.tsx`
  - canvas, overlay, shell spacing 재정의
- `frontend/src/components/layout/Header2026.tsx`
  - 상단 action cluster, 검색 비활성 상태, 상태 배지 톤 재정의
- `frontend/src/components/layout/Sidebar2026.tsx`
  - 로고 영역, active nav, 하단 상태 카드 재질 재정의
- `frontend/src/components/ui/GlassCard.tsx`
  - `PaperCard`, `TintedCard`, `FrostedPanel` 계열로 분리
- `frontend/src/components/ui/PageShell.tsx`
  - header / section / metric 조합형 컴포넌트 재질 재정의
- `frontend/src/hooks/useEmotionMode.tsx`
  - 기본 UI 관여 축소 또는 제거
- `frontend/src/main.tsx`
  - provider 유지 여부를 최종 결정하고 정리

## 12. 1차 토큰 초안

이 값들은 구현 시 CSS 변수 또는 Tailwind theme token으로 옮길 수 있다.

```css
:root {
  --canvas: #faf8f4;
  --canvas-muted: #f5f2eb;
  --surface: rgba(255, 255, 255, 0.92);
  --surface-strong: #ffffff;
  --surface-tint: #f2f6f3;
  --border-subtle: rgba(39, 53, 45, 0.08);
  --border-accent: rgba(19, 125, 128, 0.22);
  --text-strong: #1f2937;
  --text-primary: #334155;
  --text-muted: #64748b;
  --brand-900: #27352d;
  --brand-700: #476053;
  --action-600: #137d80;
  --action-100: #dff4f4;
  --success-600: #1f7a43;
  --warning-600: #b7791f;
  --danger-600: #b54135;
  --shadow-card: 0 8px 24px rgba(30, 41, 59, 0.06);
  --shadow-float: 0 22px 60px rgba(15, 23, 42, 0.12);
  --radius-card: 20px;
  --radius-control: 14px;
  --radius-pill: 999px;
}
```

타이포 스케일 초안:

```css
:root {
  --text-display: 2.75rem;
  --text-h1: 2rem;
  --text-h2: 1.5rem;
  --text-h3: 1.125rem;
  --text-body: 0.9375rem;
  --text-meta: 0.8125rem;
}
```

간격 스케일 초안:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-14: 56px;
}
```

주의:

- 현재 프로젝트는 `Tailwind v3`이므로, 이 토큰들은 우선 CSS 변수와 현재 utility 조합으로 구현한다
- `Tailwind v4 @theme`로 바로 옮기는 것은 별도 업그레이드 프로젝트로 분리한다

## 13. 페이지별 체크리스트

각 화면은 아래 조건을 만족해야 한다.

### 공통

- 첫 시선이 장식보다 정보에 먼저 간다
- 상태 색이 브랜드 색을 침범하지 않는다
- CTA는 한 화면에 1개만 primary처럼 보인다
- hover 없이도 레이아웃이 완성되어 보인다
- 모바일에서 종이 카드가 층으로 읽힌다

### 랜딩

- serif headline 사용
- 배경은 warm linen + subtle texture
- 카드/기능 소개는 지나치게 기술 제품처럼 보이지 않음

### 앱 내부

- serif는 section intro 정도까지만
- dense data zone은 sans only
- background effect 최소화
- state badge와 field state가 명확히 분리됨

## 14. 구현 우선순위

### Phase 1

- `design-system.css` 토큰 교체
- `GlassCard`를 `PaperCard` 중심으로 재설계
- `Layout` 배경과 shell 정리
- `Header2026`, `Sidebar2026` surface 정리

대상 파일:

- `frontend/src/styles/design-system.css`
- `frontend/src/styles/index.css`
- `frontend/src/components/ui/GlassCard.tsx`
- `frontend/src/components/layout/Layout.tsx`
- `frontend/src/components/layout/Header2026.tsx`
- `frontend/src/components/layout/Sidebar2026.tsx`

완료 조건:

- 전면 blue/violet gradient가 사라진다
- 기본 카드가 더 이상 blur glass처럼 보이지 않는다
- 헤더/사이드바/페이지 배경이 한 시스템으로 읽힌다

### Phase 2

- `Dashboard2026` 재질감/위계 정리
- `documents`, `settings`, `alerts`를 Catalyst 중심으로 통일
- `mobile-entry`, `consultation`, `elderly`의 CTA 색과 패널 계층 정리

대상 파일:

- `frontend/src/components/ui/PageShell.tsx`
- `frontend/src/pages/Dashboard2026.tsx`
- `frontend/src/pages/DocumentExtract.tsx`
- `frontend/src/pages/SettingsPage.tsx`
- `frontend/src/pages/AlertsCenter.tsx`
- `frontend/src/pages/MobileEntry.tsx`
- `frontend/src/pages/Consultation.tsx`
- `frontend/src/pages/ElderlyManagement.tsx`

완료 조건:

- 업무 화면에서 serif와 decorative gradient가 거의 사라진다
- 문서/설정/알림이 가장 정돈된 층으로 느껴진다
- primary CTA 색과 상태 색이 서로 충돌하지 않는다

### Phase 3

- 퍼블릭 랜딩/소개 화면을 Oatmeal 기반으로 별도 설계
- auth/onboarding을 혼합 톤으로 연결
- iconography와 empty state를 정리

완료 조건:

- 퍼블릭 레이어가 앱 내부와 다른 목적을 가지면서도 같은 브랜드처럼 보인다
- 랜딩 headline, section rhythm, footer가 앱 셸과 어색하게 분리되지 않는다
- empty state와 helper section이 Oatmeal 톤을 적절히 차용한다

## 15. 기술 채택 원칙과 리스크

디자인 설계가 좋더라도 구현 전략이 잘못되면 전체가 쉽게 무너진다.  
아래는 이번 리디자인에서 반드시 먼저 합의해야 하는 기술 원칙이다.

### 15.1 즉시 하지 않을 것

- React 18에서 React 19로 동시 업그레이드
- Tailwind v3에서 v4로 동시 업그레이드
- Headless UI 전면 도입
- Next.js 구조로 앱 셸을 이주

이 네 가지는 모두 별도 프로젝트여야 한다.  
현재 리디자인 목표는 `브랜드와 UI 일관성 회복`이지 `프레임워크 전환`이 아니다.

### 15.2 이번 리디자인에서 실제로 할 것

- 기존 Vite/React Router 구조 유지
- 현재 페이지와 컴포넌트를 리스타일링
- 필요한 경우 Catalyst 스타일을 참고한 경량 로컬 컴포넌트 작성
- CSS 변수 기반 토큰 시스템 정리

### 15.3 리스크 메모

- `EmotionModeProvider`를 남기면 색 체계가 다시 흔들릴 수 있다
- Tailwind Plus 원본 클래스를 무비판적으로 복붙하면 현재 Tailwind 버전과 충돌할 수 있다
- Oatmeal의 serif 톤을 앱 내부에 과하게 넣으면 실무 화면이 느슨해질 수 있다
- Catalyst의 구조만 따르고 브랜드 무드를 잃으면 결과가 너무 평범해질 수 있다

따라서 이번 작업은 “양쪽 템플릿의 예쁜 부분 수집”이 아니라 `의사결정 우선순위에 따른 번역 작업`이어야 한다.

## 16. 완료 기준

리디자인이 잘 되었는지는 “예쁘다”가 아니라 아래로 판단한다.

- 랜딩과 앱 내부가 다른데도 같은 브랜드처럼 보인다
- 센터 운영자가 봤을 때 장식보다 신뢰가 먼저 느껴진다
- 모바일에서 과장된 glass demo 느낌이 사라진다
- 설정/문서/알림 화면이 가장 단정한 층으로 정리된다
- 케어 제품 특유의 따뜻함은 남지만, 감상적이거나 장난스럽지 않다

검증 방법:

- Playwright 모바일/데스크톱 스모크 체크
- 주요 라우트 스크린샷 비교
- disabled, focus, empty, loading, error 상태 시각 점검
- 랜딩과 앱 내부를 나란히 봤을 때 브랜드 축 일치 여부 리뷰
- 실제 실무 플로우 기준 `문서`, `현장 기록`, `설정` 화면 우선 검수

## 17. 참고 소스

- Catalyst 공식 소개: https://tailwindcss.com/plus/templates/catalyst
- Oatmeal 공식 소개: https://tailwindcss.com/plus/templates/oatmeal

로컬 기준 참고 템플릿:

- `C:\Users\uju\Downloads\catalyst-ui-kit (1).zip`
- `C:\Users\uju\Downloads\oatmeal-olive-instrument (1).zip`

현재 프론트엔드 기준 주요 대상 파일:

- `frontend/src/components/layout/Layout.tsx`
- `frontend/src/components/layout/Header2026.tsx`
- `frontend/src/components/layout/Sidebar2026.tsx`
- `frontend/src/components/ui/GlassCard.tsx`
- `frontend/src/components/ui/PageShell.tsx`
- `frontend/src/styles/design-system.css`
- `frontend/src/styles/index.css`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/hooks/useEmotionMode.tsx`
- `frontend/src/hooks/useSystemStatus.tsx`
- `frontend/src/pages/Dashboard2026.tsx`
- `frontend/src/pages/DocumentExtract.tsx`
- `frontend/src/pages/MobileEntry.tsx`
- `frontend/src/pages/Consultation.tsx`
- `frontend/src/pages/ElderlyManagement.tsx`
- `frontend/src/pages/AlertsCenter.tsx`
- `frontend/src/pages/SettingsPage.tsx`
