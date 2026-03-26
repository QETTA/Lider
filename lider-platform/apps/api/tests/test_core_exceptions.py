"""
Core Exceptions Unit Tests
"""
import pytest
from datetime import datetime
from core.exceptions import (
    LIDERException, ModelException, ValidationException,
    DatabaseException, ToolException, PermissionException,
    ErrorCode, raise_model_error, raise_validation_error
)


class TestLIDERException:
    """LIDER 기본 예외 테스트"""

    def test_basic_exception_creation(self):
        """기본 예외 생성 테스트"""
        exc = LIDERException(
            code=ErrorCode.INTERNAL_ERROR,
            message="테스트 오류",
            details={"key": "value"},
            request_id="req_test_001"
        )

        assert exc.code == ErrorCode.INTERNAL_ERROR
        assert exc.message == "테스트 오류"
        assert exc.details == {"key": "value"}
        assert exc.request_id == "req_test_001"
        assert exc.status_code == 500

    def test_exception_to_dict(self):
        """예외 딕셔너리 변환 테스트"""
        exc = LIDERException(
            code=ErrorCode.MODEL_ERROR,
            message="모델 오류",
            request_id="req_test_002"
        )

        result = exc.to_dict()

        assert result["success"] is False
        assert result["error"]["code"] == "LDR1100"
        assert result["error"]["message"] == "모델 오류"
        assert result["error"]["request_id"] == "req_test_002"
        assert "timestamp" in result["error"]

    def test_exception_str(self):
        """예외 문자열 표현 테스트"""
        exc = LIDERException(
            code=ErrorCode.DATABASE_ERROR,
            message="DB 오류",
            request_id="req_test_003"
        )

        assert "LDR1001" in str(exc)
        assert "DB 오류" in str(exc)
        assert "req_test_003" in str(exc)


class TestModelException:
    """모델 예외 테스트"""

    def test_model_exception_default(self):
        """기본 모델 예외 테스트"""
        exc = ModelException()

        assert exc.code == ErrorCode.MODEL_ERROR
        assert "AI 모델" in exc.message
        assert exc.status_code == 502

    def test_model_exception_custom(self):
        """커스텀 모델 예외 테스트"""
        exc = ModelException(
            code=ErrorCode.MODEL_TIMEOUT,
            message="타임아웃",
            details={"model": "gpt-4"}
        )

        assert exc.code == ErrorCode.MODEL_TIMEOUT
        assert exc.status_code == 502


class TestValidationException:
    """검증 예외 테스트"""

    def test_validation_exception(self):
        """검증 예외 생성 테스트"""
        exc = ValidationException(
            message="필드 누락",
            details={"field": "email"}
        )

        assert exc.code == ErrorCode.VALIDATION_ERROR
        assert exc.status_code == 400
        assert "필드 누락" in exc.message


class TestDatabaseException:
    """데이터베이스 예외 테스트"""

    def test_database_exception(self):
        """DB 예외 생성 테스트"""
        exc = DatabaseException(
            message="연결 실패",
            details={"host": "localhost"}
        )

        assert exc.code == ErrorCode.DATABASE_ERROR
        assert exc.status_code == 500


class TestToolException:
    """도구 예외 테스트"""

    def test_tool_exception(self):
        """도구 예외 생성 테스트"""
        exc = ToolException(
            tool_name="search",
            message="도구 search 실행 중 오류가 발생했습니다"
        )

        assert exc.code == ErrorCode.TOOL_ERROR
        assert "search" in exc.message
        assert exc.details["tool_name"] == "search"


class TestHelperFunctions:
    """헬퍼 함수 테스트"""

    def test_raise_model_error(self):
        """모델 에러 헬퍼 테스트"""
        with pytest.raises(ModelException) as exc_info:
            raise_model_error("gpt-4", "timeout", "req_001")

        assert exc_info.value.code == ErrorCode.MODEL_ERROR
        assert "gpt-4" in exc_info.value.message
        assert "timeout" in exc_info.value.message

    def test_raise_validation_error(self):
        """검증 에러 헬퍼 테스트"""
        with pytest.raises(ValidationException) as exc_info:
            raise_validation_error("email", "invalid format", "req_002")

        assert exc_info.value.code == ErrorCode.VALIDATION_ERROR
        assert "email" in exc_info.value.message


class TestErrorCodes:
    """에러 코드 테스트"""

    def test_all_error_codes_unique(self):
        """모든 에러 코드가 고유한지 확인"""
        codes = [e.value for e in ErrorCode]
        assert len(codes) == len(set(codes))

    def test_error_code_prefix(self):
        """에러 코드 접두사 확인"""
        for code in ErrorCode:
            assert code.value.startswith("LDR")
