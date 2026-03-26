"""
LIDER Platform - 표준화된 API 응답 시스템
Clean Architecture: 일관된 응답 형식 보장
"""
from typing import Dict, Any, Optional, List, TypeVar, Generic
from datetime import datetime
from pydantic import BaseModel, Field
from enum import Enum
import time

T = TypeVar('T')


class ResponseStatus(str, Enum):
    """응답 상태"""
    SUCCESS = "success"
    ERROR = "error"
    PARTIAL = "partial"  # 일부 성공 (폴백 사용 등)


class PaginationInfo(BaseModel):
    """페이지네이션 정보"""
    page: int = 1
    page_size: int = 20
    total_count: int = 0

    @property
    def total_pages(self) -> int:
        return max(1, (self.total_count + self.page_size - 1) // self.page_size)

    @property
    def has_next(self) -> bool:
        return self.page < self.total_pages

    @property
    def has_prev(self) -> bool:
        return self.page > 1


class TokenUsage(BaseModel):
    """토큰 사용량 정보"""
    prompt_tokens: int = 0
    completion_tokens: int = 0

    @property
    def total_tokens(self) -> int:
        return self.prompt_tokens + self.completion_tokens


class CostInfo(BaseModel):
    """비용 정보"""
    estimated_cost_usd: float = 0.0
    currency: str = "USD"


class ModelInfo(BaseModel):
    """모델 사용 정보"""
    model_used: str
    api_model_name: Optional[str] = None
    fallback_used: bool = False
    fallback_chain: Optional[List[str]] = None


class EvaluationInfo(BaseModel):
    """응답 평가 정보"""
    score: float = Field(ge=0, le=100)
    verdict: str
    quality_checks: Optional[Dict[str, Any]] = None


class ResponseMeta(BaseModel):
    """표준 응답 메타데이터"""
    request_id: str
    timestamp: str
    latency_ms: int
    model_info: Optional[ModelInfo] = None
    token_usage: Optional[TokenUsage] = None
    cost: Optional[CostInfo] = None
    evaluation: Optional[EvaluationInfo] = None
    pagination: Optional[PaginationInfo] = None
    warnings: Optional[List[str]] = None
    cache_hit: Optional[bool] = None

    class Config:
        json_schema_extra = {
            "example": {
                "request_id": "req_20260326120000_abc123",
                "timestamp": "2026-03-26T12:00:00.000Z",
                "latency_ms": 1250,
                "model_info": {
                    "model_used": "kimi-k2-thinking",
                    "fallback_used": False
                },
                "token_usage": {
                    "prompt_tokens": 1000,
                    "completion_tokens": 500,
                    "total_tokens": 1500
                }
            }
        }


class APIResponse(BaseModel, Generic[T]):
    """
    LIDER 표준 API 응답 래퍼
    모든 API 응답은 이 형식을 따름
    """
    status: ResponseStatus = ResponseStatus.SUCCESS
    data: Optional[T] = None
    error: Optional[Dict[str, Any]] = None
    meta: ResponseMeta

    @classmethod
    def success(
        cls,
        data: T,
        request_id: str,
        latency_ms: int = 0,
        model_info: Optional[ModelInfo] = None,
        token_usage: Optional[TokenUsage] = None,
        cost: Optional[CostInfo] = None,
        evaluation: Optional[EvaluationInfo] = None,
        pagination: Optional[PaginationInfo] = None,
        warnings: Optional[List[str]] = None,
        cache_hit: Optional[bool] = None
    ) -> "APIResponse[T]":
        """성공 응답 생성"""
        return cls(
            status=ResponseStatus.SUCCESS,
            data=data,
            meta=ResponseMeta(
                request_id=request_id,
                timestamp=datetime.utcnow().isoformat(),
                latency_ms=latency_ms,
                model_info=model_info,
                token_usage=token_usage,
                cost=cost,
                evaluation=evaluation,
                pagination=pagination,
                warnings=warnings,
                cache_hit=cache_hit
            )
        )

    @classmethod
    def create_error(
        cls,
        code: str,
        message: str,
        request_id: str,
        details: Optional[Dict[str, Any]] = None,
        status_code: int = 500
    ) -> "APIResponse[Any]":
        """에러 응답 생성"""
        return cls(
            status=ResponseStatus.ERROR,
            error={
                "code": code,
                "message": message,
                "details": details or {},
                "status_code": status_code
            },
            meta=ResponseMeta(
                request_id=request_id,
                timestamp=datetime.utcnow().isoformat(),
                latency_ms=0
            )
        )

    @classmethod
    def partial(
        cls,
        data: T,
        request_id: str,
        latency_ms: int,
        warnings: List[str],
        model_info: Optional[ModelInfo] = None
    ) -> "APIResponse[T]":
        """부분 성공 응답 (폴백 사용 등)"""
        return cls(
            status=ResponseStatus.PARTIAL,
            data=data,
            meta=ResponseMeta(
                request_id=request_id,
                timestamp=datetime.utcnow().isoformat(),
                latency_ms=latency_ms,
                model_info=model_info,
                warnings=warnings
            )
        )


class ResponseBuilder:
    """
    응답 빌더 - 복잡한 응답 객체를 단계적으로 구성
    """

    def __init__(self, request_id: str):
        self.request_id = request_id
        self.start_time = time.time()
        self.data: Optional[Any] = None
        self.model_info: Optional[ModelInfo] = None
        self.token_usage: Optional[TokenUsage] = None
        self.cost: Optional[CostInfo] = None
        self.evaluation: Optional[EvaluationInfo] = None
        self.warnings: List[str] = []
        self.cache_hit: Optional[bool] = None

    def set_data(self, data: Any) -> "ResponseBuilder":
        self.data = data
        return self

    def set_model_info(
        self,
        model_used: str,
        api_model_name: Optional[str] = None,
        fallback_used: bool = False,
        fallback_chain: Optional[List[str]] = None
    ) -> "ResponseBuilder":
        self.model_info = ModelInfo(
            model_used=model_used,
            api_model_name=api_model_name,
            fallback_used=fallback_used,
            fallback_chain=fallback_chain
        )
        return self

    def set_token_usage(
        self,
        prompt_tokens: int = 0,
        completion_tokens: int = 0
    ) -> "ResponseBuilder":
        self.token_usage = TokenUsage(
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=prompt_tokens + completion_tokens
        )
        return self

    def set_cost(self, estimated_cost_usd: float) -> "ResponseBuilder":
        self.cost = CostInfo(estimated_cost_usd=estimated_cost_usd)
        return self

    def set_evaluation(
        self,
        score: float,
        verdict: str,
        quality_checks: Optional[Dict[str, Any]] = None
    ) -> "ResponseBuilder":
        self.evaluation = EvaluationInfo(
            score=score,
            verdict=verdict,
            quality_checks=quality_checks
        )
        return self

    def add_warning(self, warning: str) -> "ResponseBuilder":
        self.warnings.append(warning)
        return self

    def set_cache_hit(self, cache_hit: bool) -> "ResponseBuilder":
        self.cache_hit = cache_hit
        return self

    def build(self) -> APIResponse[Any]:
        latency_ms = int((time.time() - self.start_time) * 1000)
        return APIResponse.success(
            data=self.data,
            request_id=self.request_id,
            latency_ms=latency_ms,
            model_info=self.model_info,
            token_usage=self.token_usage,
            cost=self.cost,
            evaluation=self.evaluation,
            warnings=self.warnings if self.warnings else None,
            cache_hit=self.cache_hit
        )


# === 헬퍼 함수 ===

def create_success_response(
    data: Any,
    request_id: str,
    latency_ms: int = 0,
    **kwargs
) -> Dict[str, Any]:
    """간단한 성공 응답 생성 (dict 반환)"""
    response = APIResponse.success(
        data=data,
        request_id=request_id,
        latency_ms=latency_ms,
        **kwargs
    )
    return response.model_dump(exclude_none=True)


def create_error_response(
    code: str,
    message: str,
    request_id: str,
    details: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """간단한 에러 응답 생성 (dict 반환)"""
    response = APIResponse.create_error(
        code=code,
        message=message,
        request_id=request_id,
        details=details
    )
    return response.model_dump(exclude_none=True)


def merge_responses(
    base_response: Dict[str, Any],
    additional_data: Dict[str, Any]
) -> Dict[str, Any]:
    """응답 데이터 병합 헬퍼"""
    result = base_response.copy()
    if "data" in additional_data and "data" in result:
        if isinstance(result["data"], dict) and isinstance(additional_data["data"], dict):
            result["data"].update(additional_data["data"])
        else:
            result["data"] = additional_data["data"]
    return result
