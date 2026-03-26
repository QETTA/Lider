"""
업로드 스키마 (Pydantic)
"""

from datetime import datetime
from typing import Optional, Dict, Any, List
from uuid import UUID
from pydantic import BaseModel, Field

from app.models.upload import UploadType, ProcessingStatus


class ColumnMapping(BaseModel):
    """컬럼 매핑 스키마"""
    source_column: str = Field(..., description="원본 컬럼명")
    target_field: str = Field(..., description="매핑 대상 필드")
    data_type: str = Field(default="string", description="데이터 타입")


class UploadPreview(BaseModel):
    """업로드 미리보기 스키마"""
    columns: List[str] = Field(..., description="감지된 컬럼 목록")
    sample_rows: List[Dict[str, Any]] = Field(..., description="샘플 데이터 (5행)")
    total_rows: int = Field(..., description="총 행 수")
    suggested_mapping: List[ColumnMapping] = Field(..., description="추천 매핑")


class UploadCreate(BaseModel):
    """업로드 생성 스키마"""
    upload_type: UploadType = Field(..., description="데이터 유형")
    mapping_config: List[ColumnMapping] = Field(..., description="컬럼 매핑 설정")


class UploadResponse(BaseModel):
    """업로드 응답 스키마"""
    id: UUID
    institution_id: UUID
    upload_type: UploadType
    file_name: str
    file_size: int
    row_count: int
    status: ProcessingStatus
    mapping_config: Optional[List[ColumnMapping]]
    error_message: Optional[str]
    processed_at: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True


class UploadList(BaseModel):
    """업로드 목록 스키마"""
    items: List[UploadResponse]
    total: int


class AnalysisResultItem(BaseModel):
    """분석 결과 아이템"""
    category: str = Field(..., description="분석 카테고리")
    severity: str = Field(..., description="심각도 (INFO/WARNING/CRITICAL)")
    title: str = Field(..., description="제목")
    description: str = Field(..., description="설명")
    affected_count: int = Field(..., description="영향 수")
    suggestion: Optional[str] = Field(None, description="개선 제안")
    data: Optional[Dict[str, Any]] = Field(None, description="관련 데이터")


class AnalysisSummary(BaseModel):
    """분석 요약 스키마"""
    total_issues: int = Field(..., description="총 이슈 수")
    critical_count: int = Field(..., description="심각 이슈 수")
    warning_count: int = Field(..., description="경고 이슈 수")
    info_count: int = Field(..., description="정보 이슈 수")
    results: List[AnalysisResultItem] = Field(..., description="상세 결과")


class DashboardSummary(BaseModel):
    """대시보드 요약 스키마"""
    institution_id: UUID
    institution_name: str
    last_upload_at: Optional[datetime]
    
    # 요약 지표
    total_recipients: int = Field(0, description="총 수급자 수")
    monthly_claim_amount: float = Field(0.0, description="월 청구액")
    monthly_limit_usage_rate: float = Field(0.0, description="월 한도 활용률")
    
    # 이슈 요약
    missing_claims_count: int = Field(0, description="청구누락 의심 건수")
    unapplied_allowances: int = Field(0, description="미적용 가산 건수")
    upcoming_evaluations: int = Field(0, description="다가오는 평가/갱신 수")
    overdue_tasks: int = Field(0, description="지연 업무 수")
    
    # 최근 알림
    recent_alerts: List[AnalysisResultItem] = Field(default_factory=list)
