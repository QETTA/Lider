"""
User Model

사용자 기본 정보 및 사용량 추적
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import String, Integer, Float, Boolean, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class User(Base):
    """사용자 테이블 (기본 정보)"""
    
    __tablename__ = "users"
    
    id: Mapped[str] = mapped_column(
        String(255), 
        primary_key=True,
        comment="외부 시스템 ID"
    )
    org_id: Mapped[str] = mapped_column(
        String(255), 
        nullable=False, 
        index=True
    )
    email: Mapped[str] = mapped_column(
        String(255), 
        nullable=False
    )
    role: Mapped[str] = mapped_column(
        String(50), 
        nullable=False, 
        default='user'
    )
    
    # 사용량 추적
    total_requests: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    total_cost_usd: Mapped[float] = mapped_column(
        Float, 
        default=0.0
    )
    
    # 상태
    is_active: Mapped[bool] = mapped_column(
        Boolean, 
        default=True
    )
    last_login_at: Mapped[Optional[datetime]] = mapped_column(
        nullable=True
    )
    
    __table_args__ = (
        Index('idx_users_org', 'org_id', 'created_at'),
    )
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, org_id={self.org_id})>"
