"""
기관 스키마 (Pydantic)
"""

from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field

from app.models.institution import InstitutionType


class InstitutionBase(BaseModel):
    """기관 기본 스키마"""
    name: str = Field(..., min_length=1, max_length=200, description="기관명")
    code: str = Field(..., min_length=1, max_length=20, description="요양기관번호")
    type: InstitutionType = Field(..., description="기관유형")
    address: Optional[str] = Field(None, max_length=500, description="주소")
    phone: Optional[str] = Field(None, max_length=20, description="대표전화")
    manager_name: Optional[str] = Field(None, max_length=50, description="담당자명")
    manager_contact: Optional[str] = Field(None, max_length=20, description="담당자연락처")
    manager_email: Optional[str] = Field(None, max_length=100, description="담당자이메일")


class InstitutionCreate(InstitutionBase):
    """기관 생성 스키마"""
    pass


class InstitutionUpdate(BaseModel):
    """기관 수정 스키마"""
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    address: Optional[str] = Field(None, max_length=500)
    phone: Optional[str] = Field(None, max_length=20)
    manager_name: Optional[str] = Field(None, max_length=50)
    manager_contact: Optional[str] = Field(None, max_length=20)
    manager_email: Optional[str] = Field(None, max_length=100)


class InstitutionResponse(InstitutionBase):
    """기관 응답 스키마"""
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class InstitutionList(BaseModel):
    """기관 목록 스키마"""
    items: list[InstitutionResponse]
    total: int
