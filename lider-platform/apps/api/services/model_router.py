"""
LIDER 모델 라우터
요청 특성에 따른 최적 AI 모델 선택 및 Fallback 관리
"""
from dataclasses import dataclass
from typing import Optional, List, Dict, Any
from enum import Enum
import structlog

from core.config import settings, get_api_model_name

logger = structlog.get_logger()


class TaskType(str, Enum):
    """작업 유형"""
    ASSIST = "assist"
    EXTRACT = "extract"
    ACTION_PREVIEW = "action_preview"


class ModelPriority(str, Enum):
    """모델 우선순위"""
    PRIMARY = "primary"
    FALLBACK = "fallback"
    EMERGENCY = "emergency"


@dataclass
class RouteDecision:
    """라우팅 결정 결과"""
    internal_model: str  # 내부 축약형 (예: kimi-k2-0905)
    api_model_name: str  # API 공식 명칭 (예: kimi-k2-0905-preview)
    priority: ModelPriority
    reason: str
    estimated_cost_usd: float
    estimated_latency_ms: int
    fallback_chain: List[str]


class ModelRouter:
    """AI 모델 라우팅 엔진"""
    
    # 모델 비용 매트릭스 (USD per 1K tokens)
    COST_MATRIX = {
        "kimi-k2-0905": {"input": 0.0005, "output": 0.0015},
        "kimi-k2-thinking": {"input": 0.001, "output": 0.003},
        "kimi-k2.5": {"input": 0.002, "output": 0.006},
        "claude-sonnet-4-6": {"input": 0.003, "output": 0.015},
    }
    
    # 레이턴시 예측 (ms)
    LATENCY_ESTIMATE = {
        "kimi-k2-0905": 2000,
        "kimi-k2-thinking": 4000,
        "kimi-k2.5": 3500,
        "claude-sonnet-4-6": 2500,
    }
    
    def __init__(self):
        self.primary_models = {
            "kimi-k2-0905": True,
            "kimi-k2-thinking": True,
            "kimi-k2.5": True,
            "claude-sonnet-4-6": True,
        }
        self.fallback_chain = [
            "claude-sonnet-4-6",
            "kimi-k2.5",
            "kimi-k2-thinking",
        ]
    
    async def route(
        self,
        task_type: TaskType,
        has_attachments: bool = False,
        attachment_types: Optional[List[str]] = None,
        needs_multi_tool: bool = False,
        needs_recency: bool = False,
        customer_facing: bool = False,
        estimated_tokens: int = 1000,
        required_vision: bool = False,
        context: Optional[Dict[str, Any]] = None
    ) -> RouteDecision:
        """
        요청 특성에 따른 최적 모델 선택
        
        라우팅 규칙:
        1. 문서/이미지 첨부 + 추출 → kimi-k2.5 (Vision + JSON)
        2. 멀티툴 + 고급추론 필요 → kimi-k2-thinking
        3. 실시간/고객대면 → kimi-k2-0905 (빠른 응답)
        4. 긴 컨텍스트 → kimi-k2-thinking (128K)
        5. Fallback: Claude Sonnet 4.6
        """
        context = context or {}
        
        # 1. 문서/이미지 추출 작업 → kimi-k2.5 (Vision 지원)
        if task_type == TaskType.EXTRACT or required_vision:
            selected = "kimi-k2.5"
            reason = "Vision 모델 필요 (문서/이미지 추출)"
            return self._create_decision(selected, ModelPriority.PRIMARY, reason, estimated_tokens)
        
        # 2. 멀티툴 + 복잡한 추론 → kimi-k2-thinking
        if needs_multi_tool and estimated_tokens > 4000:
            selected = "kimi-k2-thinking"
            reason = "멀티툴 + 긴 컨텍스트 추론 필요"
            return self._create_decision(selected, ModelPriority.PRIMARY, reason, estimated_tokens)
        
        # 3. 멀티툴 필요 → kimi-k2-thinking
        if needs_multi_tool:
            selected = "kimi-k2-thinking"
            reason = "멀티툴 호출 및 계획 수립 필요"
            return self._create_decision(selected, ModelPriority.PRIMARY, reason, estimated_tokens)
        
        # 4. 실시간/고객대면 → kimi-k2-0905 (빠른 응답)
        if customer_facing and not needs_multi_tool:
            selected = "kimi-k2-0905"
            reason = "고객 대응용 빠른 응답 모델"
            return self._create_decision(selected, ModelPriority.PRIMARY, reason, estimated_tokens)
        
        # 5. 최신 정보 필요 → kimi-k2-0905 (Knowledge cutoff 최신)
        if needs_recency:
            selected = "kimi-k2-0905"
            reason = "최신 정보 기반 응답"
            return self._create_decision(selected, ModelPriority.PRIMARY, reason, estimated_tokens)
        
        # 6. 기본값: kimi-k2-0905 (범용 모델)
        selected = "kimi-k2-0905"
        reason = "기본 범용 모델"
        return self._create_decision(selected, ModelPriority.PRIMARY, reason, estimated_tokens)
    
    def _create_decision(
        self,
        internal_model: str,
        priority: ModelPriority,
        reason: str,
        estimated_tokens: int
    ) -> RouteDecision:
        """RouteDecision 객체 생성"""
        api_model_name = get_api_model_name(internal_model)
        
        # 비용 계산
        cost_per_1k = self.COST_MATRIX.get(internal_model, {"input": 0.001, "output": 0.002})
        avg_cost_per_token = (cost_per_1k["input"] + cost_per_1k["output"]) / 2 / 1000
        estimated_cost = estimated_tokens * avg_cost_per_token
        
        # 레이턴시 예측
        estimated_latency = self.LATENCY_ESTIMATE.get(internal_model, 3000)
        
        # Fallback 체인 구성 (선택된 모델 제외)
        fallback_chain = [m for m in self.fallback_chain if m != internal_model]
        
        return RouteDecision(
            internal_model=internal_model,
            api_model_name=api_model_name,
            priority=priority,
            reason=reason,
            estimated_cost_usd=round(estimated_cost, 6),
            estimated_latency_ms=estimated_latency,
            fallback_chain=fallback_chain
        )
    
    async def get_fallback_model(
        self,
        failed_model: str,
        attempt: int = 1
    ) -> Optional[RouteDecision]:
        """
        Fallback 모델 선택
        
        실패 시 순차적으로 더 강력한 모델로 전환:
        1차: Fallback chain 순서대로
        2차: Claude Sonnet (Emergency)
        """
        fallback_models = [m for m in self.fallback_chain if m != failed_model]
        
        if attempt <= len(fallback_models):
            fallback_model = fallback_models[attempt - 1]
            reason = f"{failed_model} 실패로 인한 Fallback"
            return self._create_decision(
                fallback_model,
                ModelPriority.FALLBACK,
                reason,
                estimated_tokens=2000
            )
        
        # Emergency fallback: Claude Sonnet
        if attempt > len(fallback_models):
            return self._create_decision(
                "claude-sonnet-4-6",
                ModelPriority.EMERGENCY,
                "Emergency fallback - 모든 모델 실패",
                estimated_tokens=2000
            )
        
        return None
    
    def update_model_status(self, model_name: str, is_healthy: bool):
        """모델 상태 업데이트 (헬스체크 결과 반영)"""
        self.primary_models[model_name] = is_healthy
        logger.info(
            "model_status_updated",
            model=model_name,
            healthy=is_healthy
        )


# 전역 라우터 인스턴스
model_router = ModelRouter()