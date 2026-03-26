"""
기관 모델 (Institution)
"""

import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import Column, String, DateTime, Enum as SQLEnum, Text
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class InstitutionType(str, Enum):
    """기관 유형"""
    VISITING_CARE = "visiting_care"           # 방문요양
    DAY_CARE = "day_care"                     # 주야간보호
    VISITING_NURSING = "visiting_nursing"     # 방문간호
    VISITING_BATH = "visiting_bath"           # 방문목욕
    COMPLEX = "complex"                       # 복합 (2개 이상 병행)


class Institution(Base):
    """장기요양기관 모델"""
    
    __tablename__ = "institutions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False, comment="기관명")
    code = Column(String(20), unique=True, nullable=False, comment="요양기관번호")
    type = Column(SQLEnum(InstitutionType), nullable=False, comment="기관유형")
    
    # 연락처 정보
    address = Column(String(500), nullable=True, comment="주소")
    phone = Column(String(20), nullable=True, comment="대표전화")
    
    # 담당자 정보
    manager_name = Column(String(50), nullable=True, comment="담당자명")
    manager_contact = Column(String(20), nullable=True, comment="담당자연락처")
    manager_email = Column(String(100), nullable=True, comment="담당자이메일")
    
    # 메타데이터
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Institution {self.name} ({self.code})>"
