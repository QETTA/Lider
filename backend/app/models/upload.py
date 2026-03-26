"""
데이터 업로드 모델 (UploadedData)
"""

import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import Column, String, DateTime, Enum as SQLEnum, Integer, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class UploadType(str, Enum):
    """업로드 데이터 유형"""
    RECIPIENT = "recipient"           # 수급자 정보
    CLAIM = "claim"                 # 청구 데이터
    SCHEDULE = "schedule"           # 일정 데이터
    ALLOWANCE = "allowance"         # 가산 데이터
    EVALUATION = "evaluation"       # 평가 데이터


class ProcessingStatus(str, Enum):
    """처리 상태"""
    PENDING = "pending"              # 대기중
    PROCESSING = "processing"        # 처리중
    COMPLETED = "completed"          # 완료
    ERROR = "error"                  # 오류


class UploadedData(Base):
    """업로드 데이터 모델"""
    
    __tablename__ = "uploaded_data"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    institution_id = Column(UUID(as_uuid=True), ForeignKey("institutions.id"), nullable=False)
    
    # 업로드 정보
    upload_type = Column(SQLEnum(UploadType), nullable=False, comment="데이터 유형")
    file_name = Column(String(255), nullable=False, comment="원본 파일명")
    file_size = Column(Integer, nullable=False, comment="파일 크기 (bytes)")
    row_count = Column(Integer, nullable=False, default=0, comment="데이터 행 수")
    
    # 매핑 및 데이터
    mapping_config = Column(JSON, nullable=True, comment="컬럼 매핑 정보")
    raw_data = Column(JSON, nullable=True, comment="파싱된 원본 데이터")
    processed_data = Column(JSON, nullable=True, comment="처리된 데이터")
    
    # 상태
    status = Column(SQLEnum(ProcessingStatus), default=ProcessingStatus.PENDING, comment="처리 상태")
    error_message = Column(Text, nullable=True, comment="오류 메시지")
    
    # 메타데이터
    processed_at = Column(DateTime, nullable=True, comment="처리 완료 시간")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    institution = relationship("Institution", backref="uploads")
    
    def __repr__(self):
        return f"<UploadedData {self.file_name} ({self.status.value})>"
