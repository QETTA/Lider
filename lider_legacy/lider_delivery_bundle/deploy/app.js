const searchCases = {
  default: {
    input: "지난주 고객 이슈를 요약하고, 아직 미해결 티켓이 있으면 알려줘",
    plan: [
      "ticket_read로 지난 7일 주요 티켓 상태 조회",
      "crm_lookup으로 해당 고객 우선순위 및 담당자 확인",
      "internal_search로 최근 운영 공지/장애 이력 검색",
      "최종 응답은 kimi-k2-0905-preview가 사실과 제안을 분리해 정리"
    ],
    facts: [
      { title: "미해결 티켓 3건", body: "결제 지연 1건, 권한 이슈 1건, 연동 오류 1건", sources: ["ticket_db", "sla_view"] },
      { title: "우선순위 고객 1건 포함", body: "엔터프라이즈 계정이 1건 포함되어 24시간 내 응답 기준이 적용됩니다.", sources: ["crm_lookup"] },
      { title: "관련 공지 1건", body: "3월 23일자 연동 장애 공지가 있어 연동 오류 티켓과 연관 가능성이 있습니다.", sources: ["internal_search"] }
    ],
    answer: "지난주 고객 이슈는 결제 지연, 권한 이슈, 연동 오류가 중심이었고 현재 미해결 티켓은 3건입니다. 이 중 1건은 엔터프라이즈 계정이 포함되어 우선 대응이 필요합니다. 연동 오류는 3월 23일 공지와 연결 가능성이 있어 장애 공지 기준으로 먼저 확인하는 것이 좋습니다.",
    uncertainties: [
      "연동 오류 티켓이 공지된 장애와 정확히 동일 원인인지 추가 확인이 필요합니다.",
      "담당자 재배정 여부는 현재 기록만으로 확정되지 않았습니다."
    ]
  },
  lead: {
    input: "A사 리드 브리프를 만들어줘. 최근 접점과 다음 액션도 포함해줘",
    plan: [
      "crm_lookup으로 A사 기본 정보와 단계 조회",
      "timeline_read로 최근 미팅/메일 기록 확인",
      "doc_fetch로 최근 제안서 버전 유무 확인",
      "최종 브리프는 확정 정보와 제안 액션을 분리해 작성"
    ],
    facts: [
      { title: "현재 단계: Proposal", body: "최근 제안서 발송 후 가격 검토 단계로 표시됩니다.", sources: ["crm_lookup"] },
      { title: "최근 접점 2건", body: "3월 20일 제품 데모, 3월 22일 가격 관련 메일 회신이 있습니다.", sources: ["timeline_read"] },
      { title: "다음 액션 후보", body: "ROI 문서 보강 요청과 보안 질의 응답이 남아 있습니다.", sources: ["doc_fetch"] }
    ],
    answer: "A사는 현재 Proposal 단계이며 최근 접점은 제품 데모와 가격 회신입니다. 바로 다음 액션은 ROI 근거 보강과 보안 질의 응답 정리입니다. 영업 메시지는 가격 재협상보다 내부 설득 자료 제공에 초점을 맞추는 편이 적절합니다.",
    uncertainties: [
      "가격 재협상 의사가 확정인지 기록상 명시되지 않았습니다."
    ]
  },
  analytics: {
    input: "이번 달 이탈 가능성이 높은 고객군을 설명해줘",
    plan: [
      "safe_sql_service로 월간 churn 관련 지표 조회",
      "segment_lookup으로 고객군 기준 확인",
      "policy_check로 민감 속성 노출 제한 검증",
      "설명은 숫자 계산이 아닌 결과 해석만 수행"
    ],
    facts: [
      { title: "고위험 고객군", body: "최근 30일 로그인 감소와 미해결 지원 티켓이 동시에 있는 계정군", sources: ["safe_sql_service", "segment_lookup"] },
      { title: "주요 신호", body: "사용량 하락, 지원 응답 지연, 결제 만료 임박", sources: ["safe_sql_service"] }
    ],
    answer: "이번 달 이탈 가능성이 높은 고객군은 최근 30일 사용량 감소와 미해결 지원 티켓이 동시에 관측된 계정군입니다. 특히 결제 만료가 임박한 계정은 우선순위를 높게 두고 지원 응답과 재접촉 계획을 묶어서 관리하는 것이 좋습니다.",
    uncertainties: [
      "예측 점수 자체는 별도 모델 산출값이므로 이 화면에서는 설명만 제공됩니다."
    ]
  }
};

const extractSamples = {
  poster: {
    validator: "경고 있음",
    json: {
      doc_type: "poster",
      fields: {
        title: "고객 세미나",
        date: "2026-03-28",
        time: "14:00",
        location: "서울 강남",
        host: "Lider Ops"
      },
      warnings: ["장소 하단 안내 문구 일부가 흐립니다."],
      needs_review: true
    },
    summary: "포스터에서 행사명, 날짜, 시간, 장소, 주최를 추출했습니다. 안내 문구 일부가 흐려 검수가 필요합니다."
  },
  invoice: {
    validator: "정상",
    json: {
      doc_type: "invoice",
      fields: {
        invoice_no: "INV-2026-0317",
        issued_date: "2026-03-17",
        vendor: "Lider Inc.",
        amount: "1280000",
        currency: "KRW"
      },
      warnings: [],
      needs_review: false
    },
    summary: "인보이스 번호, 발행일, 공급자, 금액을 안정적으로 추출했습니다. 추가 검수 없이 정규화 단계로 넘길 수 있습니다."
  },
  screen: {
    validator: "경고 있음",
    json: {
      doc_type: "screen",
      fields: {
        page: "settings > billing",
        primary_issue: "자동 결제 실패 배너 노출",
        visible_cta: "결제 수단 업데이트"
      },
      warnings: ["상단 네비게이션 텍스트 일부 식별 불가"],
      needs_review: true
    },
    summary: "스크린샷에서 결제 실패 배너와 주요 CTA를 읽어냈습니다. 상단 네비게이션 일부는 해상도 문제로 추가 확인이 필요합니다."
  }
};

const actionCases = {
  close_ticket: {
    allowed: false,
    badge: "권한 확인 필요",
    impact: "이 작업은 선택한 티켓을 종료 상태로 전환하고 후속 SLA 타이머를 중지합니다.",
    missing: ["permission.owner_or_admin", "customer_confirmation"],
    next: "담당자 또는 관리자 권한을 확인하고 고객 확인 로그가 있으면 다시 preview를 생성하세요."
  },
  change_tier: {
    allowed: false,
    badge: "수동 승인 필요",
    impact: "이 작업은 고객 등급을 상향 조정하며 가격 정책과 지원 등급이 함께 바뀔 수 있습니다.",
    missing: ["pricing_policy_review", "finance_approval"],
    next: "가격 정책 검토와 재무 승인 완료 후 백엔드 전용 execute 플로우로 넘기세요."
  },
  approve_refund: {
    allowed: false,
    badge: "고위험 액션",
    impact: "환불 승인 시 정산과 영수증 상태가 함께 변경되며 되돌리기 어려운 작업입니다.",
    missing: ["refund_policy_check", "manager_confirmation", "payment_state_lock"],
    next: "환불 정책 확인과 관리자 승인을 완료한 뒤 별도 실행 서비스에서 처리해야 합니다."
  }
};

const routerRows = [
  ["홈 대시보드", "없음 또는 kimi-k2-0905-preview", "요약 시 Sonnet fallback", "KPI DB / 집계 서비스", "숫자 계산은 LLM 금지"],
  ["통합 검색", "kimi-k2-thinking", "kimi-k2-0905-preview", "Search / CRM / Ticket", "무근거 단정 응답 금지"],
  ["문서 업로드", "kimi-k2.5", "Validator → Finalizer", "원본 파일 + 검증기", "보이는 것만 추출"],
  ["상담/티켓 상세", "kimi-k2-thinking", "초안은 kimi-k2-0905-preview", "Ticket / CRM / KB", "종료/환불 직접 실행 금지"],
  ["액션 모달", "kimi-k2-0905-preview", "백엔드 executor", "Permission / Policy", "Preview 우선"],
  ["긴 문맥 최종안", "claude-sonnet-4-6", "없음", "원문 문맥", "비용 높은 fallback 전용"]
];

const tabs = [...document.querySelectorAll('.tab')];
const panels = [...document.querySelectorAll('.tab-panel')];
const targetButtons = [...document.querySelectorAll('[data-target]')];
const themeToggle = document.getElementById('themeToggle');

function activateTab(id) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === id));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
}

tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
targetButtons.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.target)));

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

const plannerModel = document.getElementById('plannerModel');
const toolPlan = document.getElementById('toolPlan');
const facts = document.getElementById('facts');
const answerText = document.getElementById('answerText');
const uncertainties = document.getElementById('uncertainties');
const groundedBadge = document.getElementById('groundedBadge');
const searchInput = document.getElementById('searchInput');

function renderSearch(caseKey = 'default') {
  const item = searchCases[caseKey];
  searchInput.value = item.input;
  plannerModel.textContent = 'kimi-k2-thinking';
  toolPlan.innerHTML = item.plan.map(step => `<li>${step}</li>`).join('');
  facts.innerHTML = item.facts.map(f => `
    <div class="fact-item">
      <strong>${f.title}</strong>
      <div>${f.body}</div>
      <div class="source-row">${f.sources.map(s => `<span class="chip mono">${s}</span>`).join('')}</div>
    </div>
  `).join('');
  answerText.textContent = item.answer;
  uncertainties.innerHTML = item.uncertainties.map(u => `<li>${u}</li>`).join('');
  groundedBadge.textContent = item.facts.length ? '근거 포함' : '근거 부족';
  groundedBadge.className = item.facts.length ? 'pill success' : 'pill danger';
}

document.getElementById('runSearch').addEventListener('click', () => renderSearch('default'));
document.querySelectorAll('.sample-case').forEach(btn => {
  btn.addEventListener('click', () => renderSearch(btn.dataset.case));
});

const validatorStatus = document.getElementById('validatorStatus');
const extractWarnings = document.getElementById('extractWarnings');
const jsonOutput = document.getElementById('jsonOutput');
const extractSummary = document.getElementById('extractSummary');

function renderExtract(sampleKey = 'poster') {
  const sample = extractSamples[sampleKey];
  validatorStatus.textContent = sample.validator;
  validatorStatus.className = sample.validator === '정상' ? 'pill success' : 'pill warning';
  extractWarnings.innerHTML = sample.json.warnings.length
    ? sample.json.warnings.map(w => `<li>${w}</li>`).join('')
    : '<li>경고 없음</li>';
  jsonOutput.textContent = JSON.stringify(sample.json, null, 2);
  extractSummary.textContent = sample.summary;
}

document.querySelectorAll('.extract-sample').forEach(btn => {
  btn.addEventListener('click', () => renderExtract(btn.dataset.sample));
});

document.getElementById('copyJson').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(jsonOutput.textContent);
    const original = document.getElementById('copyJson').textContent;
    document.getElementById('copyJson').textContent = '복사됨';
    setTimeout(() => document.getElementById('copyJson').textContent = original, 1200);
  } catch (e) {
    alert('클립보드 복사에 실패했습니다.');
  }
});

const actionType = document.getElementById('actionType');
const actionAllowedBadge = document.getElementById('actionAllowedBadge');
const impactSummary = document.getElementById('impactSummary');
const missingChecks = document.getElementById('missingChecks');
const nextStep = document.getElementById('nextStep');

function renderAction(caseKey = 'close_ticket') {
  const item = actionCases[caseKey];
  actionAllowedBadge.textContent = item.badge;
  actionAllowedBadge.className = 'pill danger';
  impactSummary.textContent = item.impact;
  missingChecks.innerHTML = item.missing.map(m => `<li>${m}</li>`).join('');
  nextStep.textContent = item.next;
}

document.getElementById('previewAction').addEventListener('click', () => renderAction(actionType.value));

const routerTableBody = document.getElementById('routerTableBody');
routerTableBody.innerHTML = routerRows.map(row => `
  <tr>
    <td>${row[0]}</td>
    <td><span class="chip mono">${row[1]}</span></td>
    <td>${row[2]}</td>
    <td>${row[3]}</td>
    <td>${row[4]}</td>
  </tr>
`).join('');

renderSearch('default');
renderExtract('poster');
renderAction('close_ticket');
