"""
AI 요청 도메인 모델
Clean Architecture - 도메인 레이어
"""
from dataclasses import dataclass
from typing import List, Dict, Any, Optional
from enum import Enum


class TaskType(str, Enum):
    """작업 유형"""
    ASSIST = "assist"
    EXTRACT = "extract"
    ACTION_PREVIEW = "action_preview"


class RiskTier(str, Enum):
    """위험 등급"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


@dataclass
class Message:
    """대화 메시지"""
    text: str
    role: str = "user"  # user, assistant, system


@dataclass
class AIRequest:
    """AI 요청 도메인 객체"""
    user_id: str
    org_id: Optional[str]
    message: Message
    task_type: TaskType
    allowed_tools: Optional[List[str]] = None
    risk_tier: RiskTier = RiskTier.LOW
    locale: str = "ko-KR"
    session_id: Optional[str] = None
    
    def needs_multi_tool(self) -> bool:
        """멀티툴 필요 여부"""
        return self.allowed_tools is not None and len(self.allowed_tools) > 1
    
    def is_customer_facing(self) -> bool:
        """고객 대면 여부"""
        return self.risk_tier == RiskTier.LOW


@dataclass
class RouteDecision:
    """모델 라우팅 결정"""
    internal_model: str
    api_model_name: str
    priority: str
    reason: str
    estimated_cost_usd: float
    estimated_latency_ms: int
    fallback_chain: List[str]


@dataclass
class ToolResult:
    """도구 실행 결과"""
    tool_name: str
    result: Any
    execution_time_ms: int
    success: bool = True
    error_message: Optional[str] = None


@dataclass
class Citation:
    """출처 인용"""
    source: str
    title: Optional[str] = None
    url: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class SuggestedAction:
    """추천 액션"""
    action_type: str
    description: str
    confidence: float
    parameters: Optional[Dict[str, Any]] = None


@dataclass
class AIResponse:
    """AI 응답 도메인 객체"""
    answer: str
    facts: List[str]
    citations: List[Citation]
    tool_results: Optional[List[ToolResult]] = None
    uncertainties: Optional[List[str]] = None
    suggested_actions: Optional[List[SuggestedAction]] = None
    metadata: Optional[Dict[str, Any]] = None
