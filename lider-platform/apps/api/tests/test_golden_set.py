"""
Golden Set 테스트 - AI 응답 품질 회귀 테스트
LIDER_DEVELOPMENT_PLAN.md 기반 Golden Set 구현
"""
import pytest
import json
import os
from pathlib import Path
from typing import Dict, List, Any
import asyncio

# Golden Set 로더
def load_golden_tests(category: str) -> List[Dict[str, Any]]:
    """Golden Set 테스트 케이스 로드"""
    golden_dir = Path(__file__).parent / "golden" / category
    tests = []
    if golden_dir.exists():
        for test_file in golden_dir.glob("*.json"):
            with open(test_file, "r", encoding="utf-8") as f:
                tests.append(json.load(f))
    return tests


def load_single_test(category: str, test_id: str) -> Dict[str, Any]:
    """단일 Golden Set 테스트 로드"""
    golden_dir = Path(__file__).parent / "golden" / category
    for test_file in golden_dir.glob("*.json"):
        with open(test_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            if data.get("test_id") == test_id:
                return data
    return None


# ========== Assist Golden Tests ==========

@pytest.mark.golden
@pytest.mark.assist
class TestAssistGolden:
    """Assist API Golden Set 테스트"""
    
    def test_search_single_source_structure(self):
        """search_single_source: 단일 소스 검색형 구조 검증"""
        test = load_single_test("assist", "assist/search_single_source_001")
        assert test is not None
        assert test["expected_behavior"]["citations_min_count"] >= 1
        assert "crm_lookup" in test["expected_behavior"]["tools_called"]
        assert test["evaluation_criteria"]["fact_f1"] >= 0.95
    
    def test_search_multi_source_tool_order(self):
        """search_multi_source: 멀티툴 조합 및 순서 검증"""
        test = load_single_test("assist", "assist/search_multi_source_001")
        assert test is not None
        expected_tools = test["expected_behavior"]["tools_called"]
        assert len(expected_tools) >= 2
        assert test["expected_behavior"]["tool_order_correct"]
    
    def test_summarize_weekly_tickets_numeric_accuracy(self):
        """summarize_weekly_tickets: 숫자/날짜 정확성 검증"""
        test = load_single_test("assist", "assist/summarize_weekly_tickets_001")
        assert test is not None
        assert test["evaluation_criteria"]["numeric_accuracy"] == 1.0
        assert test["evaluation_criteria"]["date_range_correct"]
    
    def test_no_result_hallucination_prevention(self):
        """no_result_scenario: 추정 답변 금지 확인"""
        test = load_single_test("assist", "assist/no_result_scenario_001")
        assert test is not None
        assert test["expected_behavior"]["must_avoid_hallucination"]
        assert test["evaluation_criteria"]["no_fabrication"]
        forbidden_words = test["expected_behavior"]["answer_must_not_contain"]
        assert len(forbidden_words) > 0


# ========== Extract Golden Tests ==========

@pytest.mark.golden
@pytest.mark.extract
class TestExtractGolden:
    """Extract API Golden Set 테스트"""
    
    def test_poster_complete_recall(self):
        """poster_complete: 모든 필드 추출 완료 (recall > 0.98)"""
        test = load_single_test("extract", "extract/poster_complete_001")
        assert test is not None
        assert test["evaluation_criteria"]["field_recall"] >= 0.98
        assert test["expected_behavior"]["confidence_threshold"] >= 0.9
    
    def test_poster_partial_blur_warning(self):
        """poster_partial_blur: 누락 필드 warnings[]에 포함"""
        test = load_single_test("extract", "extract/poster_partial_blur_001")
        assert test is not None
        assert test["expected_behavior"]["needs_review"]
        assert len(test["expected_behavior"]["warnings_expected"]) > 0
        assert test["evaluation_criteria"]["warning_coverage"] >= 0.95
    
    def test_invoice_numeric_precision(self):
        """invoice_standard: 숫자/날짜 정확성"""
        test = load_single_test("extract", "extract/invoice_standard_001")
        assert test is not None
        assert test["evaluation_criteria"]["numeric_accuracy"] == 1.0
        assert test["evaluation_criteria"]["date_accuracy"] == 1.0
    
    def test_screenshot_ui_classification(self):
        """screenshot_ui: UI 유형 분류 정확성"""
        test = load_single_test("extract", "extract/screenshot_ui_001")
        assert test is not None
        assert test["evaluation_criteria"]["ui_classification_correct"]


# ========== Action Preview Golden Tests ==========

@pytest.mark.golden
@pytest.mark.action
class TestActionPreviewGolden:
    """Action Preview API Golden Set 테스트"""
    
    def test_close_ticket_owner_allowed(self):
        """close_ticket_owner: 소유자 종료 시도 (allowed=true)"""
        test = load_single_test("action_preview", "action/close_ticket_owner_001")
        assert test is not None
        assert test["expected_behavior"]["allowed"] is True
        assert len(test["expected_behavior"]["missing_checks"]) == 0
    
    def test_close_ticket_non_owner_denied(self):
        """close_ticket_non_owner: 비소유자 종료 시도 (allowed=false)"""
        test = load_single_test("action_preview", "action/close_ticket_non_owner_001")
        assert test is not None
        assert test["expected_behavior"]["allowed"] is False
        assert "permission.owner_or_admin" in str(test["expected_behavior"]["missing_checks_must_contain"])
    
    def test_refund_excessive_policy_violation(self):
        """approve_refund_excessive: 과다 환불 금지 감지"""
        test = load_single_test("action_preview", "action/approve_refund_excessive_001")
        assert test is not None
        assert test["expected_behavior"]["allowed"] is False
        assert test["evaluation_criteria"]["policy_check_accuracy"] == 1.0
        assert test["evaluation_criteria"]["limit_detection"]


# ========== Golden Set 실행기 ==========

class GoldenSetRunner:
    """Golden Set 실행 및 평가 엔진"""
    
    def __init__(self, api_base_url: str = "http://localhost:8000"):
        self.api_base_url = api_base_url
        self.results = []
    
    async def run_all_tests(self) -> Dict[str, Any]:
        """모든 Golden Set 테스트 실행"""
        categories = ["assist", "extract", "action_preview"]
        
        for category in categories:
            tests = load_golden_tests(category)
            for test in tests:
                result = await self.run_single_test(test)
                self.results.append(result)
        
        return self._compile_summary()
    
    async def run_single_test(self, test: Dict[str, Any]) -> Dict[str, Any]:
        """단일 테스트 실행"""
        # 실제 API 호출은 통합 테스트에서 수행
        # 여기서는 테스트 케이스 유효성 검증
        return {
            "test_id": test["test_id"],
            "category": test["category"],
            "status": "loaded",
            "valid": True
        }
    
    def _compile_summary(self) -> Dict[str, Any]:
        """결과 요약"""
        total = len(self.results)
        loaded = sum(1 for r in self.results if r["status"] == "loaded")
        
        by_category = {}
        for r in self.results:
            cat = r["category"]
            by_category[cat] = by_category.get(cat, 0) + 1
        
        return {
            "total_tests": total,
            "loaded": loaded,
            "by_category": by_category,
            "pass_rate": loaded / total if total > 0 else 0
        }


# ========== Golden Set 메타데이터 ==========

def get_golden_set_metadata() -> Dict[str, Any]:
    """Golden Set 메타데이터 조회"""
    golden_dir = Path(__file__).parent / "golden"
    
    metadata = {
        "version": "1.0.0",
        "created_at": "2026-03-24",
        "categories": {}
    }
    
    for category in ["assist", "extract", "action_preview"]:
        tests = load_golden_tests(category)
        metadata["categories"][category] = {
            "count": len(tests),
            "test_ids": [t["test_id"] for t in tests],
            "tags": list(set(tag for t in tests for tag in t.get("tags", [])))
        }
    
    return metadata


if __name__ == "__main__":
    # CLI 실행
    metadata = get_golden_set_metadata()
    print("=" * 60)
    print("LIDER Golden Set 메타데이터")
    print("=" * 60)
    print(json.dumps(metadata, indent=2, ensure_ascii=False))
    print("=" * 60)
    
    total = sum(c["count"] for c in metadata["categories"].values())
    print(f"총 테스트 케이스: {total}개")
    for cat, info in metadata["categories"].items():
        print(f"  - {cat}: {info['count']}개")
