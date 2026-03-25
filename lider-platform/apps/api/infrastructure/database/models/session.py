"""
Session Model

사용자 세션 관리
"""

from datetime import datetime
from typing import Optional, Dict, Any

from sqlalchemy import String, DateTime, JSON, Index, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, generate_uuid


class Session(Base):
    """사용자 세션 테이블"""
    
    __tablename__ = "sessions"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=generate_uuid
    )
    user_id: Mapped[str] = mapped_column(
        String(255), 
        nullable=False, 
        index=True
    )
    org_id: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True, 
        index=True
    )
    
    # 대화 컨텍스트 및 메타데이터
    context: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict,
        comment="대화 컨텍스트"
    )
    meta_data: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict,
        comment="추가 메타데이터"
    )
    
    # 만료 시간
    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    
    __table_args__ = (
        Index('idx_sessions_user_org', 'user_id', 'org_id'),
        Index('idx_sessions_expires', 'expires_at'),
    )
    
    def __repr__(self) -> str:
        return f"<Session(id={self.id}, user_id={self.user_id}, expires_at={self.expires_at})>"
