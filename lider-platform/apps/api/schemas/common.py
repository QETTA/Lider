"""
공통 스키마 정의
"""
from typing import Optional, List, Dict, Any, Union
from pydantic import BaseModel, Field
from datetime import datetime


class TokenUsage(BaseModel):
    """토큰 사용량 정보"""
    prompt_tokens: int = Field(default=0, ge=0)
    completion_tokens: int = Field(default=0, ge=0)
    total_tokens: int = Field(default=0, ge=0)


class CostInfo(BaseModel):
    """비용 정보"""
    estimated_cost_usd: float = Field(default=0.0, ge=0)
    currency: str = Field(default="USD")


class MetaInfo(BaseModel):
    """공통 메타 정보"""
    request_id: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    latency_ms: int = Field(default=0, ge=0)
    model_used: Optional[str] = None
    api_model_name: Optional[str] = None  # API 호출용 전체 명칭
    token_usage: TokenUsage = Field(default_factory=TokenUsage)
    cost: CostInfo = Field(default_factory=CostInfo)


class ErrorDetail(BaseModel):
    """에러 상세 정보"""
    code: str
    message: str
    details: Optional[Dict[str, Any]] = None
    suggested_action: Optional[str] = None


class PaginationInfo(BaseModel):
    """페이지네이션 정보"""
    total: int
    page: int
    per_page: int
    total_pages: int
    has_next: bool
    has_prev: bool


class BaseResponse(BaseModel):
    """공통 응답 봉투"""
    success: bool
    data: Optional[Any] = None
    error: Optional[ErrorDetail] = None
    meta: MetaInfo


class ListResponse(BaseModel):
    """리스트 응답용 확장"""
    items: List[Any]
    pagination: PaginationInfo
