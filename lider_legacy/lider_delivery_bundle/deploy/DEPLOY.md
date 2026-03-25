# 배포 방법

## 1) 가장 간단한 사용법
`deploy/` 폴더 안의 파일들을 정적 호스팅에 그대로 올리면 됩니다.

필수 파일:
- `index.html`
- `styles.css`
- `app.js`
- `favicon.svg`

## 2) 로컬 확인
브라우저에서 `index.html`을 직접 열어도 동작합니다.

## 3) 정적 호스팅 예시
- Vercel Static
- Netlify
- GitHub Pages
- S3 + CloudFront
- Nginx static root

## 4) 권장 배포 구조
```text
/public
  index.html
  styles.css
  app.js
  favicon.svg
```

## 5) 이 빌드의 성격
이 배포본은 현재 대화에서 합의된 Lider 방향을 기준으로 만든 **패치 프리뷰 빌드**입니다.

포함된 주요 화면:
- Overview
- Search Assist
- Document Extract
- Action Preview
- Router Map

## 6) 연결 포인트
실제 서비스에 붙일 때는 아래 mock 데이터를 API로 바꾸면 됩니다.

- `app.js` 안 `searchCases`
- `app.js` 안 `extractSamples`
- `app.js` 안 `actionCases`
- `app.js` 안 `routerRows`

## 7) 실제 연동 시 권장 API
- `POST /v1/assist`
- `POST /v1/extract`
- `POST /v1/actions/preview`
