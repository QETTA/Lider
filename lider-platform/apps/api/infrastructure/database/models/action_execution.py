"""
ActionExecution Model

액션 실행 로그 및 롤백 정보
"""

from datetime import datetime
from typing import Optional, Dict, Any

from sqlalchemy import String, Text, JSON, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, generate_uuid


class ActionExecution(Base):
    """액션 실행 로그 테이블"""
    
    __tablename__ = "action_executions"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=generate_uuid
    )
    execution_id: Mapped[str] = mapped_column(
        String(64), 
        unique=True, 
        nullable=False, 
        index=True
    )
    preview_id: Mapped[Optional[str]] = mapped_column(
        String(64), 
        nullable=True
    )
    request_id: Mapped[str] = mapped_column(
        String(64), 
        nullable=False
    )
    user_id: Mapped[str] = mapped_column(
        String(255), 
        nullable=False, 
        index=True
    )
    
    # 실행 정보
    action_type: Mapped[str] = mapped_column(
        String(100), 
        nullable=False
    )
    target_system: Mapped[str] = mapped_column(
        String(100), 
        nullable=False
    )
    status: Mapped[str] = mapped_column(
        String(50), 
        nullable=False, 
        index=True,
        comment="pending, success, failed"
    )
    result: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict
    )
    error_message: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True
    )
    
    # 롤백 정보
    rollback_available: Mapped[bool] = mapped_column(
        Boolean, 
        default=False
    )
    rollback_executed: Mapped[bool] = mapped_column(
        Boolean, 
        default=False
    )
    rollback_result: Mapped[Optional[Dict[str, Any]]] = mapped_column(
        JSON, 
        nullable=True
    )
    
    # 완료 시간
    completed_at: Mapped[Optional[datetime]] = mapped_column(
        nullable=True
    )
    
    __table_args__ = (
        Index('idx_executions_user', 'user_id', 'created_at'),
        Index('idx_executions_status', 'status', 'created_at'),
    )
    
    def __repr__(self) -> str:
        return f"<ActionExecution(execution_id={self.execution_id}, status={self.status})>"
