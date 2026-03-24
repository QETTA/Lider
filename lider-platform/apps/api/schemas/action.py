"""
Action API 스키마 정의
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class ActionType(str, Enum):
    """액션 유형"""
    TICKET_CLOSE = "ticket_close"
    TICKET_UPDATE = "ticket_update"
    CRM_UPDATE = "crm_update"
    EMAIL_SEND = "email_send"
    NOTIFICATION_SEND = "notification_send"
    DOCUMENT_CREATE = "document_create"
    WORKFLOW_TRIGGER = "workflow_trigger"


class TargetSystem(str, Enum):
    """대상 시스템"""
    ZENDESK = "zendesk"
    JIRA = "jira"
    SALESFORCE = "salesforce"
    HUBSPOT = "hubspot"
    SLACK = "slack"
    NOTION = "notion"
    INTERNAL = "internal"


class Risk(BaseModel):
    """위험 요소"""
    severity: str = Field(..., pattern=r"^(high|medium|low)$")
    category: str  # data_loss, security, compliance, etc.
    description: str
    mitigation: Optional[str] = None


class Recommendation(BaseModel):
    """권장사항"""
    priority: int = Field(ge=1, le=10)
    action: str
    reason: str
    auto_applicable: bool = False


class ImpactSummary(BaseModel):
    """영향 요약"""
    affected_records: int = Field(ge=0)
    affected_systems: List[str]
    estimated_scope: str = Field(..., pattern=r"^(single_user|team|department|organization)$")
    description: str


class PreconditionsCheck(BaseModel):
    """전제조건 검사"""
    check_name: str
    passed: bool
    details: Optional[str] = None


class ActionPreviewRequest(BaseModel):
    """Action Preview API 요청"""
    session_id: Optional[str] = None
    user_id: str = Field(..., min_length=1)
    org_id: Optional[str] = None
    action_type: ActionType
    target_system: TargetSystem
    parameters: Dict[str, Any]
    context: Optional[Dict[str, Any]] = None
    locale: str = Field(default="ko-KR")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "user_12345",
                "org_id": "org_67890",
                "action_type": "ticket_close",
                "target_system": "zendesk",
                "parameters": {
                    "ticket_id": "12345",
                    "resolution": "문제 해결됨",
                    "notify_customer": True
                },
                "locale": "ko-KR"
            }
        }


class ActionPreviewResponseData(BaseModel):
    """Action Preview 응답 데이터"""
    preview_id: str
    action_type: str
    target_system: str
    impact_summary: ImpactSummary
    preconditions_check: List[PreconditionsCheck]
    risks: List[Risk]
    recommendations: List[Recommendation]
    human_readable_preview: str
    estimated_execution_time_ms: Optional[int] = None
    rollback_available: bool = True
    expires_at: str


class ActionPreviewResponse(BaseModel):
    """Action Preview API 응답"""
    success: bool
    data: ActionPreviewResponseData
    meta: Dict[str, Any]


class ActionExecuteRequest(BaseModel):
    """Action Execute API 요청"""
    preview_id: str = Field(..., min_length=1)
    user_id: str = Field(..., min_length=1)
    confirmed: bool = True
    note: Optional[str] = None


class ActionExecuteResponseData(BaseModel):
    """Action Execute 응답 데이터"""
    execution_id: str
    preview_id: str
    status: str = Field(..., pattern=r"^(pending|success|failed|partial)$")
    result: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    rollback_available: bool = False
    audit_trail: Dict[str, Any]


class ActionExecuteResponse(BaseModel):
    """Action Execute API 응답"""
    success: bool
    data: ActionExecuteResponseData
    meta: Dict[str, Any]
