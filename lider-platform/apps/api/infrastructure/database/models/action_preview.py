"""
ActionPreview Model

액션 미리보기 및 검토 데이터
"""

from datetime import datetime
from typing import Optional, Dict, Any, List

from sqlalchemy import String, Text, Boolean, DateTime, JSON, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, generate_uuid


class ActionPreview(Base):
    """액션 미리보기 테이블"""
    
    __tablename__ = "action_previews"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=generate_uuid
    )
    preview_id: Mapped[str] = mapped_column(
        String(64), 
        unique=True, 
        nullable=False, 
        index=True
    )
    request_id: Mapped[str] = mapped_column(
        String(64), 
        ForeignKey('request_logs.request_id'), 
        nullable=False
    )
    user_id: Mapped[str] = mapped_column(
        String(255), 
        nullable=False, 
        index=True
    )
    
    # 액션 정보
    action_type: Mapped[str] = mapped_column(
        String(100), 
        nullable=False
    )
    target_system: Mapped[str] = mapped_column(
        String(100), 
        nullable=False
    )
    
    # 분석 결과
    impact_summary: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )
    preconditions_check: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict
    )
    risks: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSON, 
        default=list
    )
    recommendations: Mapped[List[str]] = mapped_column(
        JSON, 
        default=list
    )
    human_readable_preview: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )
    
    # 승인 상태
    approved: Mapped[Optional[bool]] = mapped_column(
        Boolean, 
        nullable=True
    )
    approved_by: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True
    )
    approved_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        nullable=True
    )
    executed: Mapped[bool] = mapped_column(
        Boolean, 
        default=False
    )
    
    # 만료 시간
    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    
    __table_args__ = (
        Index('idx_previews_user', 'user_id', 'created_at'),
    )
    
    def __repr__(self) -> str:
        return f"<ActionPreview(preview_id={self.preview_id}, action_type={self.action_type}, approved={self.approved})>"
