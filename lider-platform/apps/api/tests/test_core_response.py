"""
Core Response Unit Tests
"""
import pytest
from datetime import datetime
from core.response import (
    APIResponse, ResponseBuilder, ResponseStatus,
    TokenUsage, CostInfo, ModelInfo, EvaluationInfo,
    PaginationInfo, ResponseMeta,
    create_success_response, create_error_response
)


class TestAPIResponse:
    """API 응답 테스트"""

    def test_success_response_creation(self):
        """성공 응답 생성 테스트"""
        response = APIResponse.success(
            data={"message": "hello"},
            request_id="req_001",
            latency_ms=100
        )

        assert response.status == ResponseStatus.SUCCESS
        assert response.data == {"message": "hello"}
        assert response.error is None
        assert response.meta.request_id == "req_001"
        assert response.meta.latency_ms == 100

    def test_error_response_creation(self):
        """에러 응답 생성 테스트"""
        response = APIResponse.create_error(
            code="LDR1000",
            message="오류 발생",
            request_id="req_002",
            details={"debug": "info"}
        )

        assert response.status == ResponseStatus.ERROR
        assert response.data is None
        assert response.error["code"] == "LDR1000"
        assert response.error["message"] == "오류 발생"
        assert response.error["details"]["debug"] == "info"

    def test_partial_response_creation(self):
        """부분 성공 응답 테스트"""
        response = APIResponse.partial(
            data={"result": "partial"},
            request_id="req_003",
            latency_ms=200,
            warnings=["fallback used"]
        )

        assert response.status == ResponseStatus.PARTIAL
        assert response.meta.warnings == ["fallback used"]

    def test_response_to_dict(self):
        """응답 딕셔너리 변환 테스트"""
        response = APIResponse.success(
            data={"key": "value"},
            request_id="req_004",
            latency_ms=50
        )

        data = response.model_dump(exclude_none=True)

        assert data["status"] == "success"
        assert data["data"]["key"] == "value"
        assert "meta" in data
        assert data["meta"]["request_id"] == "req_004"


class TestResponseBuilder:
    """응답 빌더 테스트"""

    def test_basic_build(self):
        """기본 빌드 테스트"""
        builder = ResponseBuilder(request_id="req_001")
        response = (
            builder
            .set_data({"result": "success"})
            .build()
        )

        assert response.status == ResponseStatus.SUCCESS
        assert response.data == {"result": "success"}
        assert response.meta.request_id == "req_001"
        assert response.meta.latency_ms >= 0

    def test_full_build(self):
        """완전한 빌드 테스트"""
        builder = ResponseBuilder(request_id="req_002")
        response = (
            builder
            .set_data({"items": [1, 2, 3]})
            .set_model_info(
                model_used="gpt-4",
                api_model_name="gpt-4-turbo",
                fallback_used=False
            )
            .set_token_usage(prompt_tokens=100, completion_tokens=50)
            .set_cost(estimated_cost_usd=0.002)
            .set_evaluation(score=95.0, verdict="EXCELLENT")
            .add_warning("Cache miss")
            .build()
        )

        assert response.data["items"] == [1, 2, 3]
        assert response.meta.model_info.model_used == "gpt-4"
        assert response.meta.model_info.api_model_name == "gpt-4-turbo"
        assert response.meta.token_usage.total_tokens == 150
        assert response.meta.cost.estimated_cost_usd == 0.002
        assert response.meta.evaluation.score == 95.0
        assert "Cache miss" in response.meta.warnings

    def test_builder_chaining(self):
        """빌더 메서드 체이닝 테스트"""
        builder = ResponseBuilder(request_id="req_003")

        # 모든 메서드가 self를 반환하는지 확인
        assert builder.set_data({}) == builder
        assert builder.set_model_info("model") == builder
        assert builder.set_token_usage(1, 2) == builder
        assert builder.set_cost(0.001) == builder
        assert builder.add_warning("test") == builder


class TestHelperFunctions:
    """헬퍼 함수 테스트"""

    def test_create_success_response(self):
        """성공 응답 헬퍼 테스트"""
        response = create_success_response(
            data={"status": "ok"},
            request_id="req_001",
            latency_ms=100
        )

        assert isinstance(response, dict)
        assert response["status"] == "success"
        assert response["data"]["status"] == "ok"

    def test_create_error_response(self):
        """에러 응답 헬퍼 테스트"""
        response = create_error_response(
            code="LDR1000",
            message="Internal Error",
            request_id="req_002"
        )

        assert isinstance(response, dict)
        assert response["status"] == "error"
        assert response["error"]["code"] == "LDR1000"


class TestSubModels:
    """서브 모델 테스트"""

    def test_token_usage(self):
        """토큰 사용량 모델 테스트"""
        usage = TokenUsage(
            prompt_tokens=100,
            completion_tokens=50
        )

        assert usage.total_tokens == 150

    def test_model_info(self):
        """모델 정보 모델 테스트"""
        info = ModelInfo(
            model_used="gpt-4",
            api_model_name="gpt-4-turbo",
            fallback_used=True,
            fallback_chain=["gpt-3.5"]
        )

        assert info.model_used == "gpt-4"
        assert info.fallback_used is True

    def test_evaluation_info(self):
        """평가 정보 모델 테스트"""
        eval_info = EvaluationInfo(
            score=85.5,
            verdict="GOOD"
        )

        assert eval_info.score == 85.5
        assert eval_info.verdict == "GOOD"

    def test_pagination_info(self):
        """페이지네이션 정보 테스트"""
        pagination = PaginationInfo(
            page=2,
            page_size=20,
            total_count=100
        )

        assert pagination.total_pages == 5
        assert pagination.has_prev is True

    def test_cost_info(self):
        """비용 정보 테스트"""
        cost = CostInfo(estimated_cost_usd=0.0025)

        assert cost.estimated_cost_usd == 0.0025
        assert cost.currency == "USD"
