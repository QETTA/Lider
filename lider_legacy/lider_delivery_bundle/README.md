# Lider 단일 전달 묶음

이 압축 묶음에는 아래 두 가지가 포함됩니다.

1. `chat/lider_chat_history.md`
   - 현재 대화에서 보이는 사용자/어시스턴트 채팅 전체 내역을 Markdown으로 정리한 파일

2. `deploy/`
   - Lider용 패치 적용 정적 배포본
   - 브라우저에서 바로 열 수 있는 `index.html` 포함
   - 별도 빌드 없이 정적 호스팅에 업로드 가능

## 중요한 참고

원본 Lider 디자인 소스(Figma, HTML, React, ZIP, 배포 번들)는 작업 디렉터리에서 확인되지 않았습니다.  
그래서 이 배포본은 **현재 채팅에서 확정된 요구사항과 구조를 바탕으로 재구성한 패치 빌드**입니다.

즉, 이 묶음은 다음 두 목적에 맞춰 제작되었습니다.

- 대화 전체 보관 / 공유
- Lider 최종안으로 바로 검토 가능한 패치 적용 UI 배포본 제공

## 포함 파일

```text
lider_delivery_bundle/
├─ README.md
├─ chat/
│  └─ lider_chat_history.md
└─ deploy/
   ├─ index.html
   ├─ styles.css
   ├─ app.js
   ├─ PATCH_NOTES.md
   ├─ DEPLOY.md
   └─ favicon.svg
```


추가 포함:
- `biz/LIDER_CORE_BUSINESS_PLAN.md` — 핵심 사업기획 초안
