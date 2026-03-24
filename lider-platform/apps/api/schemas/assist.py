"""
Assist API 스키마 정의
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class ResponseMode(str, Enum):
    """응답 모드"""
    SYNC = "sync"
    STREAM = "stream"


class RiskTier(str, Enum):
    """리스크 등급"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Message(BaseModel):
    """메시지 구조"""
    text: str = Field(..., min_length=1, max_length=10000)
    role: Optional[str] = Field(default="user")  # user, assistant, system


class Citation(BaseModel):
    """인용 출처 정보"""
    source_id: str
    source_type: str  # document, ticket, knowledge_base, etc.
    title: str
    url: Optional[str] = None
    snippet: str


class ToolCall(BaseModel):
    """도구 호출 정보"""
    tool_name: str
    parameters: Dict[str, Any]
    result: Optional[Any] = None
    execution_time_ms: Optional[int] = None


class Uncertainty(BaseModel):
    """불확실성 표시"""
    field: str
    reason: str
    suggested_verification: Optional[str] = None


class SuggestedAction(BaseModel):
    """추천 액션"""
    action_type: str
    description: str
    confidence: float = Field(ge=0, le=1)
    preview_id: Optional[str] = None


class AssistRequest(BaseModel):
    """Assist API 요청"""
    session_id: Optional[str] = None
    user_id: str = Field(..., min_length=1)
    org_id: Optional[str] = None
    message: Message
    locale: str = Field(default="ko-KR")
    allowed_tools: Optional[List[str]] = Field(default=None)
    response_mode: ResponseMode = Field(default=ResponseMode.SYNC)
    risk_tier: RiskTier = Field(default=RiskTier.LOW)
    context: Optional[Dict[str, Any]] = Field(default=None)

    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "sess_abc123",
                "user_id": "user_12345",
                "org_id": "org_67890",
                "message": {
                    "text": "지난 달 매출 보고서를 분석해줘"
                },
                "locale": "ko-KR",
                "allowed_tools": ["internal_search", "crm_lookup"],
                "response_mode": "sync",
                "risk_tier": "low"
            }
        }


class AssistResponseData(BaseModel):
    """Assist 응답 데이터"""
    answer: str
    facts: Optional[List[str]] = None
    citations: Optional[List[Citation]] = None
    tool_calls: Optional[List[ToolCall]] = None
    uncertainties: Optional[List[Uncertainty]] = None
    suggested_actions: Optional[List[SuggestedAction]] = None


class AssistResponse(BaseModel):
    """Assist API 응답"""
    success: bool
    data: AssistResponseData
    meta: Dict[str, Any]
