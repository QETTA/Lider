"""
서비스 레이어 단위 테스트
"""
import pytest
import asyncio
from datetime import datetime

from services.model_router import ModelRouter, TaskType, ModelPriority
from services.validator import ValidatorPipeline, ValidationType, ValidationStatus
from services.evaluator import ResponseEvaluator, EvalScore


class TestModelRouter:
    """모델 라우터 테스트"""

    @pytest.fixture
    def router(self):
        return ModelRouter()

    @pytest.mark.asyncio
    async def test_route_extract_vision_model(self, router):
        """추출 작업은 Vision 모델 선택"""
        decision = await router.route(
            task_type=TaskType.EXTRACT,
            required_vision=True,
            estimated_tokens=1000
        )
        assert decision.internal_model == "kimi-k2.5"
        assert decision.priority == ModelPriority.PRIMARY

    @pytest.mark.asyncio
    async def test_route_multi_tool_thinking(self, router):
        """멀티툴 작업은 Thinking 모델 선택"""
        decision = await router.route(
            task_type=TaskType.ASSIST,
            needs_multi_tool=True,
            estimated_tokens=5000
        )
        assert decision.internal_model == "kimi-k2-thinking"

    @pytest.mark.asyncio
    async def test_route_customer_facing_fast(self, router):
        """고객 대응용 빠른 모델 선택"""
        decision = await router.route(
            task_type=TaskType.ASSIST,
            customer_facing=True,
            needs_multi_tool=False,
            estimated_tokens=500
        )
        assert decision.internal_model == "kimi-k2-0905"

    @pytest.mark.asyncio
    async def test_fallback_chain(self, router):
        """폴백 체인 구성 확인"""
        decision = await router.route(
            task_type=TaskType.ASSIST,
            estimated_tokens=1000
        )
        assert len(decision.fallback_chain) > 0
        assert decision.internal_model not in decision.fallback_chain

    @pytest.mark.asyncio
    async def test_cost_calculation(self, router):
        """비용 계산 확인"""
        decision = await router.route(
            task_type=TaskType.ASSIST,
            estimated_tokens=1000
        )
        assert decision.estimated_cost_usd > 0
        assert decision.estimated_cost_usd < 0.1  # 1000 토큰 기준

    @pytest.mark.asyncio
    async def test_get_fallback_model(self, router):
        """폴백 모델 선택"""
        fallback = await router.get_fallback_model("kimi-k2-0905", attempt=1)
        assert fallback is not None
        assert fallback.priority == ModelPriority.FALLBACK


class TestValidatorPipeline:
    """검증 파이프라인 테스트"""

    @pytest.fixture
    def validator(self):
        return ValidatorPipeline()

    @pytest.mark.asyncio
    async def test_json_schema_validation(self, validator):
        """JSON Schema 검증"""
        schema = {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "age": {"type": "integer"}
            },
            "required": ["name"]
        }

        # 유효한 데이터
        results = await validator.validate(
            data={"name": "홍길동", "age": 30},
            schema=schema
        )

        json_results = [r for r in results if r.validator_type == ValidationType.JSON_SCHEMA]
        assert len(json_results) > 0
        assert any(r.status == ValidationStatus.PASS for r in json_results)

    @pytest.mark.asyncio
    async def test_business_rule_validation(self, validator):
        """비즈니스 규칙 검증"""
        results = await validator.validate(
            data={"answer": "x" * 15000},  # 너무 긴 답변
            context={"endpoint": "assist"}
        )

        warnings = [r for r in results if r.status == ValidationStatus.WARNING]
        assert len(warnings) > 0

    @pytest.mark.asyncio
    async def test_has_failures(self, validator):
        """실패 확인 함수"""
        results = [
            validator._validate_freshness(None, {})
        ]
        # async 함수 결과 처리
        results = await asyncio.gather(results[0])
        assert not validator.has_failures(results)


class TestResponseEvaluator:
    """응답 평가기 테스트"""

    @pytest.fixture
    def evaluator(self):
        return ResponseEvaluator()

    @pytest.mark.asyncio
    async def test_evaluate_response(self, evaluator):
        """응답 평가"""
        response_data = {
            "success": True,
            "data": {
                "answer": "테스트 답변입니다.",
                "citations": ["source1"],
                "tool_calls": [{"tool": "search"}]
            },
            "meta": {
                "request_id": "test_001"
            }
        }

        report = await evaluator.evaluate_response(
            request_id="test_001",
            response_data=response_data,
            request_context={"endpoint": "assist"}
        )

        assert report.request_id == "test_001"
        assert 0 <= report.overall_score <= 100
        assert report.verdict in [EvalScore.EXCELLENT, EvalScore.GOOD, EvalScore.FAIR, EvalScore.POOR]
        assert len(report.metrics) > 0

    def test_evaluate_json_validity(self, evaluator):
        """JSON 유효성 평가"""
        score = evaluator._evaluate_json_validity({
            "success": True,
            "data": {},
            "meta": {}
        })
        assert score == 100.0

        score = evaluator._evaluate_json_validity({
            "data": {}  # missing success and meta
        })
        assert score < 100.0

    def test_evaluate_groundedness(self, evaluator):
        """근거 기반 평가"""
        # 인용 없음
        score_no_citations = evaluator._evaluate_groundedness(
            {"data": {}},
            {}
        )
        assert score_no_citations < 100

        # 인용 있음
        score_with_citations = evaluator._evaluate_groundedness(
            {"data": {"citations": ["source1", "source2"]}},
            {}
        )
        assert score_with_citations > score_no_citations

    def test_golden_set_quality_report(self, evaluator):
        """Golden Set 품질 리포트"""
        report = evaluator.get_quality_report()
        assert "thresholds" in report
        assert "golden_set_size" in report
        assert report["golden_set_size"] > 0
