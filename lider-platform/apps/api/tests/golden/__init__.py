"""
LIDER Golden Set 테스트 프레임워크
품질 회귀 테스트 및 AI 응답 평가 시스템
"""
from typing import Dict, List, Any, Optional
from enum import Enum
from dataclasses import dataclass
from datetime import datetime
import json
import structlog

logger = structlog.get_logger()


class TestResult(Enum):
    """테스트 결과 상태"""
    PASS = "pass"
    FAIL = "fail"
    PARTIAL = "partial"
    SKIPPED = "skipped"


@dataclass
class GoldenTestCase:
    """Golden Set 테스트 케이스"""
    test_id: str
    category: str
    priority: str
    description: str
    input_data: Dict[str, Any]
    expected_behavior: Dict[str, Any]
    evaluation_criteria: Dict[str, Any]
    golden_response: Dict[str, Any]
    tags: List[str]
    mock_data: Optional[Dict[str, Any]] = None


@dataclass
class TestExecutionResult:
    """테스트 실행 결과"""
    test_id: str
    result: TestResult
    score: float
    passed_checks: List[str]
    failed_checks: List[str]
    actual_response: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    execution_time_ms: int = 0


class GoldenSetLoader:
    """Golden Set 테스트 케이스 로더"""

    @staticmethod
    def load_test_case(file_path: str) -> GoldenTestCase:
        """단일 테스트 케이스 로드"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        return GoldenTestCase(
            test_id=data['test_id'],
            category=data['category'],
            priority=data['priority'],
            description=data['description'],
            input_data=data['input'],
            expected_behavior=data['expected_behavior'],
            evaluation_criteria=data['evaluation_criteria'],
            golden_response=data['golden_response'],
            tags=data.get('tags', []),
            mock_data=data.get('mock_data')
        )

    @staticmethod
    def load_all_tests(directory: str) -> List[GoldenTestCase]:
        """디렉토리의 모든 테스트 케이스 로드"""
        import os
        import glob

        test_cases = []
        json_files = glob.glob(os.path.join(directory, "**/*.json"), recursive=True)

        for json_file in json_files:
            try:
                test_case = GoldenSetLoader.load_test_case(json_file)
                test_cases.append(test_case)
                logger.info("loaded_golden_test", test_id=test_case.test_id)
            except Exception as e:
                logger.error("failed_to_load_test", file=json_file, error=str(e))

        return sorted(test_cases, key=lambda x: (x.category, x.test_id))


class GoldenSetEvaluator:
    """Golden Set 응답 평가기"""

    def __init__(self):
        self.thresholds = {
            "tool_accuracy": 0.95,
            "fact_f1": 0.90,
            "groundedness": 0.95,
            "field_recall": 0.95,
            "field_precision": 0.90,
            "hallucination": 0.0  # 0이어야 pass
        }

    def evaluate_assist_response(
        self,
        test_case: GoldenTestCase,
        actual_response: Dict[str, Any]
    ) -> TestExecutionResult:
        """Assist 응답 평가"""
        passed = []
        failed = []

        # tools_called 확인
        expected_tools = test_case.expected_behavior.get('tools_called', [])
        actual_tools = actual_response.get('tool_calls', [])
        actual_tool_names = [t.get('tool') for t in actual_tools] if isinstance(actual_tools, list) else []

        if set(expected_tools) == set(actual_tool_names):
            passed.append("tools_called")
        else:
            failed.append(f"tools_called: expected {expected_tools}, got {actual_tool_names}")

        # answer 내용 확인
        answer = actual_response.get('answer', '')
        must_contain = test_case.expected_behavior.get('answer_must_contain', [])
        must_not_contain = test_case.expected_behavior.get('answer_must_not_contain', [])

        for phrase in must_contain:
            if phrase in answer:
                passed.append(f"answer_contains_{phrase}")
            else:
                failed.append(f"answer_missing_{phrase}")

        for phrase in must_not_contain:
            if phrase not in answer:
                passed.append(f"answer_excludes_{phrase}")
            else:
                failed.append(f"answer_has_forbidden_{phrase}")

        # citations 확인
        citations = actual_response.get('citations', [])
        min_citations = test_case.expected_behavior.get('citations_min_count', 0)
        if len(citations) >= min_citations:
            passed.append("citations_count")
        else:
            failed.append(f"citations_count: expected >= {min_citations}, got {len(citations)}")

        # facts 확인
        if test_case.expected_behavior.get('facts_must_be_empty'):
            facts = actual_response.get('facts', [])
            if not facts:
                passed.append("facts_empty")
            else:
                failed.append("facts_should_be_empty")

        score = len(passed) / (len(passed) + len(failed)) if (passed or failed) else 0
        result = TestResult.PASS if score >= 0.8 else TestResult.FAIL

        return TestExecutionResult(
            test_id=test_case.test_id,
            result=result,
            score=score,
            passed_checks=passed,
            failed_checks=failed,
            actual_response=actual_response
        )

    def evaluate_extract_response(
        self,
        test_case: GoldenTestCase,
        actual_response: Dict[str, Any]
    ) -> TestExecutionResult:
        """Extract 응답 평가"""
        passed = []
        failed = []

        golden_fields = {f['field_name']: f for f in test_case.golden_response.get('fields', [])}
        actual_fields = {f['field_name']: f for f in actual_response.get('fields', [])}

        # 필드 존재 여부 확인
        for field_name, golden_field in golden_fields.items():
            if field_name in actual_fields:
                actual_field = actual_fields[field_name]

                # 값 확인
                if golden_field.get('value') == actual_field.get('value'):
                    passed.append(f"field_{field_name}_value")
                else:
                    failed.append(f"field_{field_name}_value: expected {golden_field.get('value')}, got {actual_field.get('value')}")

                # 신뢰도 임계값 확인
                min_confidence = test_case.expected_behavior.get('confidence_threshold', 0.8)
                if golden_field.get('value') is None or actual_field.get('confidence', 0) >= min_confidence:
                    passed.append(f"field_{field_name}_confidence")
                else:
                    failed.append(f"field_{field_name}_confidence: {actual_field.get('confidence')} < {min_confidence}")
            else:
                failed.append(f"missing_field_{field_name}")

        # needs_review 플래그 확인
        expected_needs_review = test_case.golden_response.get('needs_review', False)
        actual_needs_review = actual_response.get('needs_review', False)
        if expected_needs_review == actual_needs_review:
            passed.append("needs_review_flag")
        else:
            failed.append(f"needs_review_flag: expected {expected_needs_review}, got {actual_needs_review}")

        score = len(passed) / (len(passed) + len(failed)) if (passed or failed) else 0
        result = TestResult.PASS if score >= 0.8 else TestResult.FAIL

        return TestExecutionResult(
            test_id=test_case.test_id,
            result=result,
            score=score,
            passed_checks=passed,
            failed_checks=failed,
            actual_response=actual_response
        )

    def evaluate_action_preview_response(
        self,
        test_case: GoldenTestCase,
        actual_response: Dict[str, Any]
    ) -> TestExecutionResult:
        """Action Preview 응답 평가"""
        passed = []
        failed = []

        # allowed 필드 확인
        expected_allowed = test_case.expected_behavior.get('allowed', False)
        actual_allowed = actual_response.get('allowed', False)
        if expected_allowed == actual_allowed:
            passed.append("allowed_flag")
        else:
            failed.append(f"allowed_flag: expected {expected_allowed}, got {actual_allowed}")

        # missing_checks 확인
        expected_missing = set(test_case.expected_behavior.get('missing_checks_must_include', []))
        actual_missing = set(actual_response.get('missing_checks', []))
        if expected_missing.issubset(actual_missing):
            passed.append("missing_checks")
        else:
            failed.append(f"missing_checks: expected {expected_missing}, got {actual_missing}")

        # impact_summary 존재 여부
        if actual_response.get('impact_summary'):
            passed.append("has_impact_summary")
        else:
            failed.append("missing_impact_summary")

        score = len(passed) / (len(passed) + len(failed)) if (passed or failed) else 0
        result = TestResult.PASS if score >= 0.8 else TestResult.FAIL

        return TestExecutionResult(
            test_id=test_case.test_id,
            result=result,
            score=score,
            passed_checks=passed,
            failed_checks=failed,
            actual_response=actual_response
        )


class GoldenSetRunner:
    """Golden Set 테스트 실행기"""

    def __init__(self):
        self.loader = GoldenSetLoader()
        self.evaluator = GoldenSetEvaluator()

    def run_single_test(
        self,
        test_case: GoldenTestCase,
        actual_response: Dict[str, Any]
    ) -> TestExecutionResult:
        """단일 테스트 실행"""
        if test_case.category == "assist":
            return self.evaluator.evaluate_assist_response(test_case, actual_response)
        elif test_case.category == "extract":
            return self.evaluator.evaluate_extract_response(test_case, actual_response)
        elif test_case.category == "action_preview":
            return self.evaluator.evaluate_action_preview_response(test_case, actual_response)
        else:
            return TestExecutionResult(
                test_id=test_case.test_id,
                result=TestResult.SKIPPED,
                score=0,
                passed_checks=[],
                failed_checks=[f"Unknown category: {test_case.category}"]
            )

    def run_all_tests(
        self,
        test_cases: List[GoldenTestCase],
        responses: Dict[str, Dict[str, Any]]
    ) -> List[TestExecutionResult]:
        """모든 테스트 실행"""
        results = []
        for test_case in test_cases:
            actual_response = responses.get(test_case.test_id, {})
            result = self.run_single_test(test_case, actual_response)
            results.append(result)

            logger.info(
                "golden_test_executed",
                test_id=test_case.test_id,
                result=result.result.value,
                score=result.score
            )

        return results

    def generate_report(self, results: List[TestExecutionResult]) -> Dict[str, Any]:
        """테스트 실행 리포트 생성"""
        total = len(results)
        passed = sum(1 for r in results if r.result == TestResult.PASS)
        failed = sum(1 for r in results if r.result == TestResult.FAIL)
        partial = sum(1 for r in results if r.result == TestResult.PARTIAL)
        skipped = sum(1 for r in results if r.result == TestResult.SKIPPED)

        pass_rate = passed / total if total > 0 else 0

        return {
            "summary": {
                "total_tests": total,
                "passed": passed,
                "failed": failed,
                "partial": partial,
                "skipped": skipped,
                "pass_rate": round(pass_rate, 3)
            },
            "details": [
                {
                    "test_id": r.test_id,
                    "result": r.result.value,
                    "score": r.score,
                    "passed_checks": r.passed_checks,
                    "failed_checks": r.failed_checks
                }
                for r in results
            ],
            "timestamp": datetime.utcnow().isoformat(),
            "deployment_recommended": pass_rate >= 0.95
        }
