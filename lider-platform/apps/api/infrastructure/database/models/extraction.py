"""
Extraction Model

문서/이미지 추출 결과 저장
"""

from typing import Optional, Dict, Any

from sqlalchemy import String, Integer, Float, JSON, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, generate_uuid


class Extraction(Base):
    """문서 추출 결과 테이블"""
    
    __tablename__ = "extractions"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=generate_uuid
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
    org_id: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True
    )
    
    # 파일 정보
    file_name: Mapped[Optional[str]] = mapped_column(
        String(500), 
        nullable=True
    )
    file_type: Mapped[Optional[str]] = mapped_column(
        String(50), 
        nullable=True
    )
    file_size_bytes: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    
    # 추출 결과
    extracted_data: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict
    )
    confidence_scores: Mapped[Dict[str, Any]] = mapped_column(
        JSON, 
        default=dict
    )
    output_schema_used: Mapped[Optional[str]] = mapped_column(
        String(100), 
        nullable=True
    )
    
    # 품질 메트릭
    processing_time_ms: Mapped[int] = mapped_column(
        Integer, 
        default=0
    )
    confidence_avg: Mapped[float] = mapped_column(
        Float, 
        default=0.0
    )
    
    __table_args__ = (
        Index('idx_extractions_user', 'user_id', 'created_at'),
        Index('idx_extractions_org', 'org_id', 'created_at'),
    )
    
    def __repr__(self) -> str:
        return f"<Extraction(id={self.id}, file_name={self.file_name}, confidence_avg={self.confidence_avg})>"
