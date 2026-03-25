"""
LIDER 모델 설정 관리
Clean Architecture - 인프라 레이어 설정
"""
from dataclasses import dataclass
from typing import Dict, List, Optional
from enum import Enum


class ModelPriority(str, Enum):
    """모델 우선순위"""
    PRIMARY = "primary"
    FALLBACK = "fallback"
    EMERGENCY = "emergency"


class TaskType(str, Enum):
    """작업 유형"""
    ASSIST = "assist"
    EXTRACT = "extract"
    ACTION_PREVIEW = "action_preview"


@dataclass(frozen=True)
class ModelSpec:
    """모델 사양"""
    internal_name: str
    api_name: str
    input_cost_per_1k: float  # USD
    output_cost_per_1k: float  # USD
    estimated_latency_ms: int
    supports_vision: bool = False
    supports_tools: bool = False
    max_tokens: int = 8192


# 모델 사양 정의
MODEL_SPECS: Dict[str, ModelSpec] = {
    "kimi-k2-0905": ModelSpec(
        internal_name="kimi-k2-0905",
        api_name="kimi-k2-0905-preview",
        input_cost_per_1k=0.0005,
        output_cost_per_1k=0.0015,
        estimated_latency_ms=2000,
        supports_tools=True,
        max_tokens=8192
    ),
    "kimi-k2-thinking": ModelSpec(
        internal_name="kimi-k2-thinking",
        api_name="kimi-k2-thinking",
        input_cost_per_1k=0.001,
        output_cost_per_1k=0.003,
        estimated_latency_ms=4000,
        supports_tools=True,
        max_tokens=128000
    ),
    "kimi-k2.5": ModelSpec(
        internal_name="kimi-k2.5",
        api_name="kimi-k2.5",
        input_cost_per_1k=0.002,
        output_cost_per_1k=0.006,
        estimated_latency_ms=3500,
        supports_vision=True,
        supports_tools=True,
        max_tokens=128000
    ),
    "claude-sonnet-4-6": ModelSpec(
        internal_name="claude-sonnet-4-6",
        api_name="claude-sonnet-4-6",
        input_cost_per_1k=0.003,
        output_cost_per_1k=0.015,
        estimated_latency_ms=2500,
        supports_vision=True,
        supports_tools=True,
        max_tokens=200000
    ),
}

# Fallback 체인 설정
FALLBACK_CHAIN: List[str] = [
    "claude-sonnet-4-6",
    "kimi-k2.5",
    "kimi-k2-thinking",
]

# 모델명 매핑
MODEL_NAME_MAP: Dict[str, str] = {
    spec.internal_name: spec.api_name
    for spec in MODEL_SPECS.values()
}


def get_api_model_name(internal_name: str) -> str:
    """내부 축약형 모델명을 API 공식 명칭으로 변환"""
    return MODEL_NAME_MAP.get(internal_name, internal_name)


def get_internal_model_name(api_name: str) -> str:
    """API 공식 명칭을 내부 축약형으로 역변환"""
    reverse_map = {v: k for k, v in MODEL_NAME_MAP.items()}
    return reverse_map.get(api_name, api_name)


def get_model_spec(internal_name: str) -> Optional[ModelSpec]:
    """모델 사양 조회"""
    return MODEL_SPECS.get(internal_name)


def calculate_estimated_cost(internal_name: str, estimated_tokens: int) -> float:
    """예상 비용 계산"""
    spec = get_model_spec(internal_name)
    if not spec:
        return 0.0
    
    avg_cost_per_token = (
        (spec.input_cost_per_1k + spec.output_cost_per_1k) / 2 / 1000
    )
    return round(estimated_tokens * avg_cost_per_token, 6)


def get_latency_estimate(internal_name: str) -> int:
    """레이턴시 예측값 조회"""
    spec = get_model_spec(internal_name)
    return spec.estimated_latency_ms if spec else 3000
