"""
Session API 스키마 정의
"""
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class SessionCreateRequest(BaseModel):
    """세션 생성 요청"""
    user_id: str = Field(..., min_length=1)
    org_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = Field(default=None)


class SessionResponse(BaseModel):
    """세션 응답"""
    id: str
    user_id: str
    org_id: Optional[str] = None
    context: Dict[str, Any]
    created_at: str
    updated_at: str
    expires_at: str


class SessionListResponse(BaseModel):
    """세션 목록 응답"""
    sessions: list[SessionResponse]
    total: int
