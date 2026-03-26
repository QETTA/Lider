"""
LIDER Platform - 중앙화된 예외 처리 시스템
Clean Architecture: Domain Exceptions + Infrastructure Handlers
"""
from enum import Enum
from typing import Dict, Any, Optional, List
from datetime import datetime
from fastapi import Request, status
from fastapi.responses import JSONResponse
import structlog

logger = structlog.get_logger()


class ErrorCode(Enum):
    """LIDER 표준 에러 코드"""
    # 시스템 에러 (1000-1099)
    INTERNAL_ERROR = "LDR1000"
    DATABASE_ERROR = "LDR1001"
    CACHE_ERROR = "LDR1002"
    CONFIG_ERROR = "LDR1003"

    # AI/모델 에러 (1100-1199)
    MODEL_ERROR = "LDR1100"
    MODEL_TIMEOUT = "LDR1101"
    MODEL_RATE_LIMIT = "LDR1102"
    FALLBACK_EXHAUSTED = "LDR1103"
    JSON_PARSE_ERROR = "LDR1104"

    # 요청/입력 에러 (1200-1299)
    INVALID_REQUEST = "LDR1200"
    VALIDATION_ERROR = "LDR1201"
    MISSING_REQUIRED_FIELD = "LDR1202"
    UNSUPPORTED_FILE_TYPE = "LDR1203"

    # 인증/권한 에러 (1300-1399)
    AUTH_ERROR = "LDR1300"
    PERMISSION_DENIED = "LDR1301"
    SESSION_EXPIRED = "LDR1302"
    ORG_ACCESS_DENIED = "LDR1303"

    # 도구/외부 시스템 에러 (1400-1499)
    TOOL_ERROR = "LDR1400"
    TOOL_TIMEOUT = "LDR1401"
    EXTERNAL_API_ERROR = "LDR1402"
    SEARCH_ERROR = "LDR1403"

    # 비즈니스 로직 에러 (1500-1599)
    BUSINESS_RULE_VIOLATION = "LDR1500"
    RESOURCE_NOT_FOUND = "LDR1501"
    DUPLICATE_REQUEST = "LDR1502"


class LIDERException(Exception):
    """
    LIDER 기본 예외 클래스
    모든 도메인 예외는 이 클래스를 상속받아야 함
    """

    def __init__(
        self,
        code: ErrorCode,
        message: str,
        details: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    ):
        super().__init__(message)
        self.code = code
        self.message = message
        self.details = details or {}
        self.request_id = request_id
        self.status_code = status_code
        self.timestamp = datetime.utcnow().isoformat()

    def to_dict(self) -> Dict[str, Any]:
        """예외를 딕셔너리로 변환 (API 응답용)"""
        return {
            "success": False,
            "error": {
                "code": self.code.value,
                "message": self.message,
                "details": self.details,
                "request_id": self.request_id,
                "timestamp": self.timestamp
            }
        }

    def __str__(self) -> str:
        return f"[{self.code.value}] {self.message} (req: {self.request_id})"


# === 도메인 특화 예외 ===

class ModelException(LIDERException):
    """AI 모델 관련 예외"""

    def __init__(
        self,
        code: ErrorCode = ErrorCode.MODEL_ERROR,
        message: str = "AI 모델 처리 중 오류가 발생했습니다",
        details: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None
    ):
        super().__init__(
            code=code,
            message=message,
            details=details,
            request_id=request_id,
            status_code=status.HTTP_502_BAD_GATEWAY
        )


class ModelTimeoutException(ModelException):
    """모델 응답 타임아웃"""

    def __init__(self, model: str, timeout: int, request_id: Optional[str] = None):
        super().__init__(
            code=ErrorCode.MODEL_TIMEOUT,
            message=f"모델 {model} 응답 시간 초과 ({timeout}초)",
            details={"model": model, "timeout_seconds": timeout},
            request_id=request_id
        )


class FallbackExhaustedException(ModelException):
    """모든 폴백 모델 소진"""

    def __init__(self, attempted_models: List[str], request_id: Optional[str] = None):
        super().__init__(
            code=ErrorCode.FALLBACK_EXHAUSTED,
            message="모든 AI 모델이 응답하지 않습니다. 잠시 후 다시 시도해주세요.",
            details={"attempted_models": attempted_models},
            request_id=request_id
        )


class ValidationException(LIDERException):
    """입력 검증 예외"""

    def __init__(
        self,
        message: str = "입력 데이터 검증에 실패했습니다",
        details: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None
    ):
        super().__init__(
            code=ErrorCode.VALIDATION_ERROR,
            message=message,
            details=details,
            request_id=request_id,
            status_code=status.HTTP_400_BAD_REQUEST
        )


class PermissionException(LIDERException):
    """권한 예외"""

    def __init__(
        self,
        code: ErrorCode = ErrorCode.PERMISSION_DENIED,
        message: str = "해당 작업에 대한 권한이 없습니다",
        details: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None
    ):
        super().__init__(
            code=code,
            message=message,
            details=details,
            request_id=request_id,
            status_code=status.HTTP_403_FORBIDDEN
        )


class ToolException(LIDERException):
    """도구/외부 시스템 예외"""

    def __init__(
        self,
        tool_name: str,
        code: ErrorCode = ErrorCode.TOOL_ERROR,
        message: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None
    ):
        super().__init__(
            code=code,
            message=message or f"도구 {tool_name} 실행 중 오류가 발생했습니다",
            details={"tool_name": tool_name, **(details or {})},
            request_id=request_id,
            status_code=status.HTTP_502_BAD_GATEWAY
        )


class DatabaseException(LIDERException):
    """데이터베이스 예외"""

    def __init__(
        self,
        message: str = "데이터베이스 처리 중 오류가 발생했습니다",
        details: Optional[Dict[str, Any]] = None,
        request_id: Optional[str] = None
    ):
        super().__init__(
            code=ErrorCode.DATABASE_ERROR,
            message=message,
            details=details,
            request_id=request_id,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# === FastAPI 예외 핸들러 ===

async def lider_exception_handler(request: Request, exc: LIDERException) -> JSONResponse:
    """
    LIDER 예외 중앙 핸들러
    모든 도메인 예외를 일관된 형식으로 변환
    """
    logger.error(
        "lider_exception",
        code=exc.code.value,
        message=exc.message,
        request_id=exc.request_id,
        path=str(request.url),
        method=request.method,
        details=exc.details
    )

    return JSONResponse(
        status_code=exc.status_code,
        content=exc.to_dict()
    )


async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    예상치 못한 예외 처리 핸들러
    Unhandled exceptions are caught and logged here
    """
    request_id = getattr(request.state, 'request_id', 'unknown')

    logger.exception(
        "unhandled_exception",
        error_type=type(exc).__name__,
        error=str(exc),
        request_id=request_id,
        path=str(request.url),
        method=request.method
    )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": ErrorCode.INTERNAL_ERROR.value,
                "message": "서버 내부 오류가 발생했습니다",
                "details": {
                    "error_type": type(exc).__name__,
                    "debug": str(exc) if getattr(request.app.state, 'debug', False) else None
                },
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    )


async def http_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    HTTPException 호환 핸들러
    기존 FastAPI HTTPException을 LIDER 표준 형식으로 변환
    """
    from fastapi import HTTPException

    if isinstance(exc, HTTPException):
        request_id = getattr(request.state, 'request_id', 'unknown')

        logger.warning(
            "http_exception",
            status_code=exc.status_code,
            detail=exc.detail,
            request_id=request_id,
            path=str(request.url)
        )

        # 기존 LIDER 형식과 호환되게 변환
        content = {
            "success": False,
            "error": {
                "code": f"HTTP{exc.status_code}",
                "message": exc.detail if isinstance(exc.detail, str) else "요청 처리 중 오류가 발생했습니다",
                "details": exc.detail if isinstance(exc.detail, dict) else {},
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat()
            }
        }

        return JSONResponse(
            status_code=exc.status_code,
            content=content
        )

    raise exc


# === 예외 발생 헬퍼 함수 ===

def raise_model_error(
    model: str,
    error: str,
    request_id: Optional[str] = None,
    fallback_available: bool = True
) -> None:
    """모델 에러 발생 헬퍼"""
    code = ErrorCode.MODEL_ERROR if fallback_available else ErrorCode.FALLBACK_EXHAUSTED
    raise ModelException(
        code=code,
        message=f"모델 {model} 처리 중 오류: {error}",
        details={"model": model, "error": error, "fallback_available": fallback_available},
        request_id=request_id
    )


def raise_validation_error(
    field: str,
    error: str,
    request_id: Optional[str] = None
) -> None:
    """검증 에러 발생 헬퍼"""
    raise ValidationException(
        message=f"입력 검증 오류: {field}",
        details={"field": field, "error": error},
        request_id=request_id
    )


def raise_permission_error(
    action: str,
    user_id: str,
    request_id: Optional[str] = None
) -> None:
    """권한 에러 발생 헬퍼"""
    raise PermissionException(
        message=f"사용자 {user_id}는 {action} 작업을 수행할 권한이 없습니다",
        details={"action": action, "user_id": user_id},
        request_id=request_id
    )
