"""
BadCase Model

품질 이슈 배드케이스 관리
"""

from datetime import datetime
from typing import Optional, Dict, Any

from sqlalchemy import String, Text, JSON, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, generate_uuid


class BadCase(Base):
    """품질 이슈 배드케이스 테이블"""
    
    __tablename__ = "badcases"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=generate_uuid
    )
    case_id: Mapped[str] = mapped_column(
        String(64), 
        unique=True, 
        nullable=False, 
        index=True
    )
    request_id: Mapped[Optional[str]] = mapped_column(
        String(64), 
        nullable=True
    )
    
    # 분류
    category: Mapped[str] = mapped_column(
        String(100), 
        nullable=False, 
        index=True,
        comment="json_error, hallucination, etc."
    )
    severity: Mapped[str] = mapped_column(
        String(20), 
        nullable=False,
        comment="critical, high, medium, low"
    )
    
    # 상세 정보
    description: Mapped[str] = mapped_column(
        Text, 
        nullable=False
    )
    input_snapshot: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict
    )
    model_output: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )
    expected_output: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )
    
    # 처리 상태
    status: Mapped[str] = mapped_column(
        String(50), 
        default='open',
        comment="open, investigating, resolved, false_positive"
    )
    assigned_to: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True
    )
    resolution: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )
    
    # 해결 시간
    resolved_at: Mapped[Optional[datetime]] = mapped_column(
        nullable=True
    )
    
    __table_args__ = (
        Index('idx_badcases_category', 'category', 'status'),
        Index('idx_badcases_severity', 'severity', 'created_at'),
    )
    
    def __repr__(self) -> str:
        return f"<BadCase(case_id={self.case_id}, category={self.category}, status={self.status})>"
