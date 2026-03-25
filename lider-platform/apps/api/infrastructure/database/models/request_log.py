"""
RequestLog Model

API 요청 로그 및 사용량 추적
"""

from typing import Optional, Dict, Any

from sqlalchemy import String, Integer, Boolean, Float, JSON, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, generate_uuid


class RequestLog(Base):
    """API 요청 로그 테이블"""
    
    __tablename__ = "request_logs"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=generate_uuid
    )
    request_id: Mapped[str] = mapped_column(
        String(64), 
        unique=True, 
        nullable=False, 
        index=True
    )
    user_id: Mapped[str] = mapped_column(
        String(255), 
        nullable=False, 
        index=True
    )
    org_id: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True
    )
    
    # 요청 정보
    endpoint: Mapped[str] = mapped_column(
        String(100), 
        nullable=False, 
        index=True
    )
    method: Mapped[str] = mapped_column(
        String(10), 
        nullable=False
    )
    
    # 모델 사용 정보
    model_used: Mapped[Optional[str]] = mapped_column(
        String(100), 
        nullable=True
    )
    api_model_name: Mapped[Optional[str]] = mapped_column(
        String(100), 
        nullable=True,
        comment="API 호출용 전체 명칭"
    )
    fallback_used: Mapped[bool] = mapped_column(
        Boolean, 
        default=False
    )
    
    # 토큰 사용량
    prompt_tokens: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    completion_tokens: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    total_tokens: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    
    # 비용 및 성능
    estimated_cost_usd: Mapped[float] = mapped_column(
        Float, 
        default=0.0
    )
    latency_ms: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    
    # 검증 결과
    validation_result: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict
    )
    error_code: Mapped[Optional[str]] = mapped_column(
        String(50), 
        nullable=True
    )
    
    __table_args__ = (
        Index('idx_logs_user_time', 'user_id', 'created_at'),
        Index('idx_logs_org_time', 'org_id', 'created_at'),
        Index('idx_logs_endpoint_time', 'endpoint', 'created_at'),
    )
    
    def __repr__(self) -> str:
        return f"<RequestLog(request_id={self.request_id}, endpoint={self.endpoint}, latency_ms={self.latency_ms})>"
