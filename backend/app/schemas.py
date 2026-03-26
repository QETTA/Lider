from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import date, datetime
from decimal import Decimal

# ===== 기관 스키마 =====
class InstitutionCreate(BaseModel):
    name: str
    code: Optional[str] = None
    type: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None

class InstitutionResponse(BaseModel):
    id: int
    name: str
    code: Optional[str]
    type: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    created_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# ===== 수급자 스키마 =====
class RecipientBase(BaseModel):
    recipient_code: str
    name: str
    grade: Optional[int] = None
    birth_date: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    contact: Optional[str] = None

class RecipientCreate(RecipientBase):
    institution_id: int

class RecipientResponse(RecipientBase):
    id: int
    institution_id: int
    is_active: bool
    created_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# ===== 데이터 업로드 스키마 =====
class UploadResponse(BaseModel):
    status: str
    analysis_id: int
    total_records: int
    omissions_found: int
    recovery_potential: int
    top_rules: Dict[str, Any]

class ColumnMapping(BaseModel):
    recipient_code: str = "수급자번호"
    name: str = "수급자명"
    grade: str = "등급"
    service_date: str = "제공일자"
    service_code: str = "행위코드"
    service_name: str = "행위명"
    start_time: str = "시작시간"
    end_time: str = "종료시간"
    duration: str = "제공시간"

# ===== 분석 결과 스키마 =====
class SummaryStats(BaseModel):
    total_claims: int
    total_amount: int
    omission_count: int
    omission_amount: int
    recovery_potential: int

class OmissionItem(BaseModel):
    id: int
    rule_id: str
    rule_name: str
    recipient_name: str
    omission_type: str
    description: str
    service_date: Optional[date]
    expected_recovery: int
    confidence: Decimal
    suggested_action: Optional[str]

class AnalysisResult(BaseModel):
    analysis_id: int
    institution_id: int
    analysis_date: datetime
    period_start: date
    period_end: date
    summary: SummaryStats
    omissions: List[OmissionItem]

# ===== Action Preview 스키마 =====
class ActionPreview(BaseModel):
    omission_id: int
    type: str
    description: str
    current_state: str
    suggested_change: Optional[str]
    financial_impact: int
    risks: List[str]
    requires_confirmation: bool
    allowed: bool

# ===== 규칙 스키마 =====
class RuleInfo(BaseModel):
    rule_id: str
    name: str
    description: str
    priority: str
    automation_level: str
    expected_recovery_per_case: int

class RuleListResponse(BaseModel):
    rules: List[RuleInfo]
    total_count: int

# ===== 대시보드 스키마 =====
class DashboardSummary(BaseModel):
    institution_id: int
    month: str
    total_analysis: int
    total_recovery_potential: int
    top_omissions: List[Dict[str, Any]]
    by_rule: List[Dict[str, Any]]
