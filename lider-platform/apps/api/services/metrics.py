"""
LIDER Metrics & Monitoring Service
제품 KPI 및 운영 메트릭 수집/집계
"""
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
from collections import defaultdict
import asyncio
import structlog

from core.redis_cache import redis_client
from core.config import settings

logger = structlog.get_logger()


@dataclass
class MetricPoint:
    """단일 메트릭 데이터 포인트"""
    timestamp: datetime
    value: float
    labels: Dict[str, str] = field(default_factory=dict)


@dataclass
class KPIResult:
    """KPI 평가 결과"""
    name: str
    value: float
    target: float
    status: str  # "pass", "warning", "fail"
    unit: str


class MetricsCollector:
    """메트릭 수집 및 집계 엔진"""
    
    # KPI 목표값 (LIDER_DEVELOPMENT_PLAN.md 기준)
    KPI_TARGETS = {
        "json_valid_rate": {"target": 0.98, "min": 0.95, "unit": "ratio"},
        "extract_field_f1": {"target": 0.90, "min": 0.85, "unit": "ratio"},
        "wrong_tool_rate": {"target": 0.03, "max": 0.05, "unit": "ratio"},
        "grounded_answer_rate": {"target": 0.95, "min": 0.90, "unit": "ratio"},
        "fallback_rate": {"target": 0.20, "max": 0.30, "unit": "ratio"},
        "unsafe_action_preview_rate": {"target": 0.0, "max": 0.01, "unit": "ratio"},
        "avg_latency_ms": {"target": 3000, "max": 5000, "unit": "ms"},
        "p99_latency_ms": {"target": 8000, "max": 10000, "unit": "ms"},
    }
    
    def __init__(self):
        self._buffers: Dict[str, List[MetricPoint]] = defaultdict(list)
        self._lock = asyncio.Lock()
    
    async def record_request(
        self,
        request_id: str,
        endpoint: str,
        model_used: str,
        latency_ms: int,
        success: bool,
        validation_result: Optional[Dict] = None,
        fallback_used: bool = False,
        token_usage: Optional[Dict] = None
    ):
        """개별 요청 메트릭 기록"""
        timestamp = datetime.utcnow()
        
        # Redis에 실시간 메트릭 저장
        metric_data = {
            "timestamp": timestamp.isoformat(),
            "endpoint": endpoint,
            "model_used": model_used,
            "latency_ms": latency_ms,
            "success": success,
            "fallback_used": fallback_used,
            "token_usage": token_usage or {}
        }
        
        await redis_client.set_model_response(
            f"metric:{request_id}",
            metric_data,
            ttl_seconds=3600  # 1시간
        )
        
        # 버퍼에 추가 (배치 처리용)
        async with self._lock:
            self._buffers[endpoint].append(MetricPoint(
                timestamp=timestamp,
                value=latency_ms,
                labels={"model": model_used, "success": str(success)}
            ))
        
        logger.debug(
            "metric_recorded",
            request_id=request_id,
            endpoint=endpoint,
            latency_ms=latency_ms,
            model=model_used
        )
    
    async def record_model_call(
        self,
        model: str,
        prompt_tokens: int,
        completion_tokens: int,
        latency_ms: int,
        success: bool,
        error_type: Optional[str] = None
    ):
        """모델 호출 메트릭 기록"""
        metric_key = f"model_calls:{datetime.utcnow().strftime('%Y%m%d%H')}"
        
        # Redis에서 현재 카운트 조회 및 증가
        current = await redis_client.get(f"{metric_key}:{model}") or {}
        
        updated = {
            "total": current.get("total", 0) + 1,
            "success": current.get("success", 0) + (1 if success else 0),
            "failed": current.get("failed", 0) + (0 if success else 1),
            "prompt_tokens": current.get("prompt_tokens", 0) + prompt_tokens,
            "completion_tokens": current.get("completion_tokens", 0) + completion_tokens,
            "total_latency_ms": current.get("total_latency_ms", 0) + latency_ms
        }
        
        await redis_client.set(
            f"{metric_key}:{model}",
            updated,
            ttl_seconds=7200  # 2시간
        )
    
    async def record_tool_call(
        self,
        tool_name: str,
        latency_ms: int,
        success: bool,
        cached: bool = False
    ):
        """도구 호출 메트릭 기록"""
        metric_key = f"tool_calls:{datetime.utcnow().strftime('%Y%m%d%H')}"
        
        current = await redis_client.get(f"{metric_key}:{tool_name}") or {}
        
        updated = {
            "total": current.get("total", 0) + 1,
            "success": current.get("success", 0) + (1 if success else 0),
            "cached": current.get("cached", 0) + (1 if cached else 0),
            "total_latency_ms": current.get("total_latency_ms", 0) + latency_ms
        }
        
        await redis_client.set(
            f"{metric_key}:{tool_name}",
            updated,
            ttl_seconds=7200
        )
    
    async def calculate_kpis(self, hours: int = 24) -> List[KPIResult]:
        """KPI 계산"""
        kpis = []
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(hours=hours)
        
        # 모델 호출 데이터 수집
        model_data = await self._aggregate_model_data(hours)
        
        # 1. json_valid_rate
        total_requests = model_data.get("total", 0)
        valid_requests = model_data.get("valid_json", 0)
        json_valid_rate = valid_requests / total_requests if total_requests > 0 else 1.0
        
        kpis.append(self._evaluate_kpi(
            "json_valid_rate", json_valid_rate, "ratio"
        ))
        
        # 2. fallback_rate
        fallback_count = model_data.get("fallback_used", 0)
        fallback_rate = fallback_count / total_requests if total_requests > 0 else 0.0
        
        kpis.append(self._evaluate_kpi(
            "fallback_rate", fallback_rate, "ratio"
        ))
        
        # 3. avg_latency_ms
        avg_latency = model_data.get("avg_latency_ms", 0)
        
        kpis.append(self._evaluate_kpi(
            "avg_latency_ms", avg_latency, "ms"
        ))
        
        # 4. grounded_answer_rate (시뮬레이션)
        grounded_rate = 0.95  # 실제로는 평가 시스템에서 수집
        kpis.append(self._evaluate_kpi(
            "grounded_answer_rate", grounded_rate, "ratio"
        ))
        
        return kpis
    
    def _evaluate_kpi(self, name: str, value: float, unit: str) -> KPIResult:
        """KPI 평가"""
        config = self.KPI_TARGETS.get(name, {})
        target = config.get("target", 0)
        
        if unit == "ratio":
            # 높을수록 좋은 메트릭
            if "min" in config:
                if value >= config["min"]:
                    status = "pass"
                else:
                    status = "fail"
            # 낮을수록 좋은 메트릭
            elif "max" in config:
                if value <= config["max"]:
                    status = "pass"
                else:
                    status = "fail"
            else:
                status = "pass" if value >= target else "warning"
        else:
            # 시간/비용 메트릭 (낮을수록 좋음)
            max_val = config.get("max", target * 1.5)
            if value <= target:
                status = "pass"
            elif value <= max_val:
                status = "warning"
            else:
                status = "fail"
        
        return KPIResult(
            name=name,
            value=round(value, 4),
            target=target,
            status=status,
            unit=unit
        )
    
    async def _aggregate_model_data(self, hours: int) -> Dict[str, Any]:
        """모델 데이터 집계"""
        now = datetime.utcnow()
        total_data = {
            "total": 0,
            "valid_json": 0,
            "fallback_used": 0,
            "total_latency_ms": 0,
            "count": 0
        }
        
        for h in range(hours):
            hour_key = (now - timedelta(hours=h)).strftime('%Y%m%d%H')
            pattern = f"model_calls:{hour_key}:*"
            
            # Redis에서 패턴 검색 (simplified)
            keys = [f"model_calls:{hour_key}:kimi-k2-0905", 
                   f"model_calls:{hour_key}:kimi-k2-thinking",
                   f"model_calls:{hour_key}:claude-sonnet-4-6"]
            
            for key in keys:
                data = await redis_client.get(key)
                if data:
                    total_data["total"] += data.get("total", 0)
                    total_data["valid_json"] += data.get("success", 0)
                    total_data["fallback_used"] += data.get("failed", 0)
                    total_data["total_latency_ms"] += data.get("total_latency_ms", 0)
                    total_data["count"] += 1
        
        if total_data["count"] > 0:
            total_data["avg_latency_ms"] = total_data["total_latency_ms"] / total_data["total"] if total_data["total"] > 0 else 0
        
        return total_data
    
    async def get_dashboard_data(self) -> Dict[str, Any]:
        """대시보드용 종합 데이터"""
        now = datetime.utcnow()
        
        # KPI
        kpis = await self.calculate_kpis(hours=24)
        
        # 모델별 사용량
        model_usage = await self._get_model_usage_last_24h()
        
        # 엔드포인트별 트래픽
        endpoint_stats = await self._get_endpoint_stats_last_24h()
        
        # 최근 알림
        alerts = self._generate_alerts_from_kpis(kpis)
        
        return {
            "timestamp": now.isoformat(),
            "kpis": [{
                "name": k.name,
                "value": k.value,
                "target": k.target,
                "status": k.status,
                "unit": k.unit
            } for k in kpis],
            "model_usage": model_usage,
            "endpoint_stats": endpoint_stats,
            "alerts": alerts,
            "health_status": "healthy" if all(k.status != "fail" for k in kpis) else "degraded"
        }
    
    async def _get_model_usage_last_24h(self) -> Dict[str, Any]:
        """24시간 모델 사용량"""
        now = datetime.utcnow()
        models = ["kimi-k2-0905", "kimi-k2-thinking", "kimi-k2.5", "claude-sonnet-4-6"]
        
        result = {}
        for model in models:
            total_calls = 0
            total_tokens = 0
            
            for h in range(24):
                hour_key = (now - timedelta(hours=h)).strftime('%Y%m%d%H')
                data = await redis_client.get(f"model_calls:{hour_key}:{model}")
                if data:
                    total_calls += data.get("total", 0)
                    total_tokens += data.get("prompt_tokens", 0) + data.get("completion_tokens", 0)
            
            if total_calls > 0:
                result[model] = {
                    "calls": total_calls,
                    "tokens": total_tokens
                }
        
        return result
    
    async def _get_endpoint_stats_last_24h(self) -> Dict[str, Any]:
        """24시간 엔드포인트 통계"""
        # 실제 구현에서는 DB 쿼리 또는 Redis 집계
        return {
            "assist": {"requests": 150, "avg_latency_ms": 2500},
            "extract": {"requests": 80, "avg_latency_ms": 3500},
            "action_preview": {"requests": 45, "avg_latency_ms": 1800}
        }
    
    def _generate_alerts_from_kpis(self, kpis: List[KPIResult]) -> List[Dict[str, Any]]:
        """KPI 기반 알림 생성"""
        alerts = []
        
        for kpi in kpis:
            if kpi.status == "fail":
                alerts.append({
                    "severity": "critical",
                    "title": f"{kpi.name} 실패",
                    "message": f"현재값: {kpi.value}, 목표: {kpi.target}",
                    "timestamp": datetime.utcnow().isoformat()
                })
            elif kpi.status == "warning":
                alerts.append({
                    "severity": "warning",
                    "title": f"{kpi.name} 경고",
                    "message": f"현재값: {kpi.value}, 목표: {kpi.target}",
                    "timestamp": datetime.utcnow().isoformat()
                })
        
        return alerts[:5]  # 최대 5개


# 전역 메트릭 수집기 인스턴스
metrics_collector = MetricsCollector()
