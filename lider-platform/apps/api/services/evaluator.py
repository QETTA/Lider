"""
LIDER Response Evaluator
응답 품질 평가 및 Golden Set 검증
"""
from typing import Dict, Any, List, Optional
from dataclasses import dataclass
from enum import Enum
import structlog

logger = structlog.get_logger()


class EvaluationMetric(str, Enum):
    """평가 메트릭"""
    JSON_VALIDITY = "json_validity"
    GROUNDEDNESS = "groundedness"
    COMPLETENESS = "completeness"
    CONCISENESS = "conciseness"
    SAFETY = "safety"


class EvalScore(str, Enum):
    """평가 점수"""
    EXCELLENT = "excellent"  # 90-100
    GOOD = "good"           # 70-89
    FAIR = "fair"           # 50-69
    POOR = "poor"           # 0-49


@dataclass
class MetricResult:
    """메트릭 평가 결과"""
    metric: EvaluationMetric
    score: float  # 0-100
    details: Optional[str] = None


@dataclass
class EvaluationReport:
    """평가 보고서"""
    request_id: str
    overall_score: float
    verdict: EvalScore
    metrics: List[MetricResult]
    suggestions: List[str]
    failed: bool


class ResponseEvaluator:
    """응답 품질 평가기"""
    
    # 품질 임계값
    THRESHOLDS = {
        "json_valid_rate": 0.98,
        "grounded_answer_rate": 0.95,
        "fallback_rate": 0.20,
        "min_overall_score": 70.0
    }
    
    def __init__(self):
        self.golden_set: List[Dict[str, Any]] = []
        self._load_golden_set()
    
    def _load_golden_set(self):
        """Golden Set 로드"""
        # Golden Set 18개 테스트 케이스 (v2.0 기준)
        self.golden_set = [
            # Assist 케이스 8개
            {
                "id": "assist_001",
                "category": "assist",
                "query": "지난 달 매출 보고서 분석",
                "expected_facts": ["매출", "성장률", "전월비"],
                "expected_tools": ["internal_search"],
                "grounded": True
            },
            {
                "id": "assist_002",
                "category": "assist",
                "query": "고객 ID 12345의 최근 문의 내역",
                "expected_facts": ["티켓", "문의", "상태"],
                "expected_tools": ["crm_lookup", "ticket_read"],
                "grounded": True
            },
            {
                "id": "assist_003",
                "category": "assist",
                "query": "반품 정책 안내해줘",
                "expected_facts": ["반품", "환불", "정책"],
                "expected_tools": ["doc_fetch"],
                "grounded": True
            },
            {
                "id": "assist_004",
                "category": "assist",
                "query": "Enterprise 플랜 가격과 기능 비교",
                "expected_facts": ["가격", "기능", "Enterprise"],
                "expected_tools": ["internal_search"],
                "grounded": True
            },
            {
                "id": "assist_005",
                "category": "assist",
                "query": "영업팀 성과 현황",
                "expected_facts": ["영업", "성과", "실적"],
                "expected_tools": ["crm_lookup"],
                "grounded": True
            },
            {
                "id": "assist_006",
                "category": "assist",
                "query": "제품 A의 최신 업데이트 내용",
                "expected_facts": ["업데이트", "변경사항", "버전"],
                "expected_tools": ["doc_fetch", "internal_search"],
                "grounded": True
            },
            {
                "id": "assist_007",
                "category": "assist",
                "query": "슬랙 알림 설정 방법",
                "expected_facts": ["슬랙", "알림", "설정"],
                "expected_tools": ["doc_fetch"],
                "grounded": True
            },
            {
                "id": "assist_008",
                "category": "assist",
                "query": "현재 진행 중인 캠페인 목록",
                "expected_facts": ["캠페인", "마케팅", "진행중"],
                "expected_tools": ["internal_search"],
                "grounded": True
            },
            # Extract 케이스 8개
            {
                "id": "extract_001",
                "category": "extract",
                "doc_type": "invoice",
                "expected_fields": ["invoice_number", "total_amount", "date"],
                "min_confidence": 0.85
            },
            {
                "id": "extract_002",
                "category": "extract",
                "doc_type": "receipt",
                "expected_fields": ["merchant", "amount", "date", "items"],
                "min_confidence": 0.80
            },
            {
                "id": "extract_003",
                "category": "extract",
                "doc_type": "contract",
                "expected_fields": ["parties", "effective_date", "terms"],
                "min_confidence": 0.90
            },
            {
                "id": "extract_004",
                "category": "extract",
                "doc_type": "id_card",
                "expected_fields": ["name", "id_number", "address"],
                "min_confidence": 0.95
            },
            {
                "id": "extract_005",
                "category": "extract",
                "doc_type": "business_card",
                "expected_fields": ["name", "company", "email", "phone"],
                "min_confidence": 0.85
            },
            {
                "id": "extract_006",
                "category": "extract",
                "doc_type": "bank_statement",
                "expected_fields": ["account_number", "transactions", "balance"],
                "min_confidence": 0.90
            },
            {
                "id": "extract_007",
                "category": "extract",
                "doc_type": "passport",
                "expected_fields": ["passport_number", "name", "nationality", "expiry"],
                "min_confidence": 0.95
            },
            {
                "id": "extract_008",
                "category": "extract",
                "doc_type": "utility_bill",
                "expected_fields": ["biller", "amount", "due_date", "account"],
                "min_confidence": 0.80
            },
            # Action Preview 케이스 6개
            {
                "id": "action_001",
                "category": "action",
                "action_type": "ticket_close",
                "risk_level": "low",
                "expected_checks": ["preconditions"]
            },
            {
                "id": "action_002",
                "category": "action",
                "action_type": "ticket_update",
                "risk_level": "medium",
                "expected_checks": ["preconditions", "impact"]
            },
            {
                "id": "action_003",
                "category": "action",
                "action_type": "crm_update",
                "risk_level": "medium",
                "expected_checks": ["preconditions", "data_integrity"]
            },
            {
                "id": "action_004",
                "category": "action",
                "action_type": "notification_send",
                "risk_level": "low",
                "expected_checks": ["preconditions"]
            },
            {
                "id": "action_005",
                "category": "action",
                "action_type": "email_send",
                "risk_level": "high",
                "expected_checks": ["preconditions", "content_review", "recipients"]
            },
            {
                "id": "action_006",
                "category": "action",
                "action_type": "workflow_trigger",
                "risk_level": "high",
                "expected_checks": ["preconditions", "impact", "rollback"]
            }
        ]
    
    async def evaluate_response(
        self,
        request_id: str,
        response_data: Dict[str, Any],
        request_context: Dict[str, Any]
    ) -> EvaluationReport:
        """
        응답 품질 평가
        
        1. JSON 유효성 검사
        2. 근거 기반 여부 확인
        3. 완전성 검사
        4. 간결성 검사
        5. 안전성 검사
        """
        metrics = []
        suggestions = []
        
        # JSON 유효성
        json_score = self._evaluate_json_validity(response_data)
        metrics.append(MetricResult(
            metric=EvaluationMetric.JSON_VALIDITY,
            score=json_score,
            details="Schema validation passed" if json_score >= 95 else "Schema issues found"
        ))
        
        # 근거 기반 여부
        grounded_score = self._evaluate_groundedness(response_data, request_context)
        metrics.append(MetricResult(
            metric=EvaluationMetric.GROUNDEDNESS,
            score=grounded_score,
            details="Citations present" if grounded_score >= 90 else "Missing citations"
        ))
        if grounded_score < 90:
            suggestions.append("Add citations to support factual claims")
        
        # 완전성
        complete_score = self._evaluate_completeness(response_data, request_context)
        metrics.append(MetricResult(
            metric=EvaluationMetric.COMPLETENESS,
            score=complete_score,
            details="All fields present" if complete_score >= 90 else "Missing fields"
        ))
        if complete_score < 90:
            suggestions.append("Include all requested information")
        
        # 간결성
        concise_score = self._evaluate_conciseness(response_data)
        metrics.append(MetricResult(
            metric=EvaluationMetric.CONCISENESS,
            score=concise_score,
            details="Optimal length" if 70 <= concise_score <= 100 else "Too verbose or too brief"
        ))
        
        # 안전성
        safety_score = self._evaluate_safety(response_data)
        metrics.append(MetricResult(
            metric=EvaluationMetric.SAFETY,
            score=safety_score,
            details="No safety issues" if safety_score >= 95 else "Potential safety concerns"
        ))
        if safety_score < 95:
            suggestions.append("Review response for potential safety issues")
        
        # 종합 점수
        overall_score = sum(m.score for m in metrics) / len(metrics)
        
        # 평가 등급 결정
        if overall_score >= 90:
            verdict = EvalScore.EXCELLENT
        elif overall_score >= 70:
            verdict = EvalScore.GOOD
        elif overall_score >= 50:
            verdict = EvalScore.FAIR
        else:
            verdict = EvalScore.POOR
        
        failed = overall_score < self.THRESHOLDS["min_overall_score"]
        
        return EvaluationReport(
            request_id=request_id,
            overall_score=overall_score,
            verdict=verdict,
            metrics=metrics,
            suggestions=suggestions,
            failed=failed
        )
    
    def _evaluate_json_validity(self, data: Dict[str, Any]) -> float:
        """JSON 유효성 평가"""
        # 기본적으로 100점
        score = 100.0
        
        # 필수 필드 확인
        required_fields = ["success", "data", "meta"]
        for field in required_fields:
            if field not in data:
                score -= 20
        
        return max(0, score)
    
    def _evaluate_groundedness(
        self,
        data: Dict[str, Any],
        context: Dict[str, Any]
    ) -> float:
        """근거 기반 여부 평가"""
        score = 100.0
        
        # 응답 데이터에서 인용 정보 확인
        response_data = data.get("data", {})
        citations = response_data.get("citations", [])
        facts = response_data.get("facts", [])
        
        # 인용 없으면 감점
        if not citations and not facts:
            score -= 30
        
        # 도구 호출 있으면 가산
        tool_calls = response_data.get("tool_calls", [])
        if tool_calls:
            score = min(100, score + 10)
        
        return max(0, score)
    
    def _evaluate_completeness(
        self,
        data: Dict[str, Any],
        context: Dict[str, Any]
    ) -> float:
        """완전성 평가"""
        score = 100.0
        
        # 추출 작업인 경우 필드 확인
        if context.get("endpoint") == "extract":
            extracted = data.get("data", {}).get("extracted_fields", [])
            expected_count = context.get("expected_field_count", 0)
            if expected_count > 0:
                coverage = len(extracted) / expected_count
                score = coverage * 100
        
        return max(0, min(100, score))
    
    def _evaluate_conciseness(self, data: Dict[str, Any]) -> float:
        """간결성 평가"""
        response_data = data.get("data", {})
        
        # 답변 길이 확인
        if "answer" in response_data:
            answer_len = len(response_data["answer"])
            # 100-1000자가 이상적
            if 100 <= answer_len <= 1000:
                return 100.0
            elif answer_len < 100:
                return 70.0
            elif answer_len > 2000:
                return 50.0
            else:
                return 80.0
        
        return 90.0
    
    def _evaluate_safety(self, data: Dict[str, Any]) -> float:
        """안전성 평가"""
        score = 100.0
        
        # 불확실성 표시 확인
        response_data = data.get("data", {})
        uncertainties = response_data.get("uncertainties", [])
        
        # 불확실성 있으면 적절히 표시하는 것이 좋음
        if uncertainties:
            score = min(100, score + 5)
        
        # 위험한 액션 있는지 확인
        risks = response_data.get("risks", [])
        high_risks = [r for r in risks if r.get("severity") == "high"]
        
        # 고위험 액션이 적절히 처리되었는지
        if high_risks:
            # 미리보기 필요한지 확인
            if "preview_id" not in str(response_data):
                score -= 20
        
        return max(0, score)
    
    def evaluate_against_golden_set(
        self,
        test_id: str,
        actual_response: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Golden Set 대비 평가"""
        # 해당 테스트 케이스 찾기
        test_case = None
        for case in self.golden_set:
            if case["id"] == test_id:
                test_case = case
                break
        
        if not test_case:
            return {"error": f"Test case {test_id} not found in golden set"}
        
        results = {
            "test_id": test_id,
            "passed": True,
            "checks": []
        }
        
        category = test_case["category"]
        
        if category == "assist":
            # Assist 검사
            facts = actual_response.get("data", {}).get("facts", [])
            expected_facts = test_case.get("expected_facts", [])
            
            fact_match = any(f in str(facts) for f in expected_facts)
            results["checks"].append({
                "name": "facts_present",
                "passed": fact_match,
                "expected": expected_facts,
                "actual": facts
            })
            
            tools = actual_response.get("data", {}).get("tool_calls", [])
            expected_tools = test_case.get("expected_tools", [])
            
            tool_match = any(t in str(tools) for t in expected_tools)
            results["checks"].append({
                "name": "tools_used",
                "passed": tool_match,
                "expected": expected_tools,
                "actual": [t.get("tool_name") for t in tools]
            })
        
        elif category == "extract":
            # Extract 검사
            extracted = actual_response.get("data", {}).get("extracted_fields", [])
            expected_fields = test_case.get("expected_fields", [])
            
            field_coverage = sum(
                1 for f in expected_fields
                if any(e.get("field_name") == f for e in extracted)
            ) / len(expected_fields)
            
            results["checks"].append({
                "name": "field_coverage",
                "passed": field_coverage >= 0.8,
                "score": field_coverage,
                "expected": expected_fields,
                "actual": [e.get("field_name") for e in extracted]
            })
            
            # 신뢰도 검사
            confidence = actual_response.get("data", {}).get("confidence_avg", 0)
            min_confidence = test_case.get("min_confidence", 0.8)
            
            results["checks"].append({
                "name": "confidence_threshold",
                "passed": confidence >= min_confidence,
                "expected": min_confidence,
                "actual": confidence
            })
        
        # 전체 통과 여부
        results["passed"] = all(c["passed"] for c in results["checks"])
        
        return results
    
    def get_quality_report(self) -> Dict[str, Any]:
        """전체 품질 리포트 생성"""
        return {
            "thresholds": self.THRESHOLDS,
            "golden_set_size": len(self.golden_set),
            "golden_set_breakdown": {
                "assist": len([c for c in self.golden_set if c["category"] == "assist"]),
                "extract": len([c for c in self.golden_set if c["category"] == "extract"]),
                "action": len([c for c in self.golden_set if c["category"] == "action"])
            }
        }


# 전역 평가기 인스턴스
response_evaluator = ResponseEvaluator()
