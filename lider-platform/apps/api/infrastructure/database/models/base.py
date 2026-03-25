"""
LIDER 데이터베이스 모델 기본 클래스 및 유틸리티
"""
import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from infrastructure.database.engine import IS_SQLITE


class BaseModel(DeclarativeBase):
    """모든 모델의 기본 클래스"""
    pass


def generate_uuid() -> Any:
    """데이터베이스 타입에 따른 UUID 생성"""
    if IS_SQLITE:
        return str(uuid.uuid4())
    return uuid.uuid4()


class TimestampMixin:
    """타임스탬프 mixin"""
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )


class UUIDMixin:
    """UUID PK mixin"""
    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid
    )
