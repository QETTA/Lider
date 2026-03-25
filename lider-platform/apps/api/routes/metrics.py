"""
Metrics & Monitoring API Routes
/v1/metrics - 모니터링 및 메트릭 엔드포인트
"""
from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, desc
from pydantic import BaseModel

from core.database import get_db, RequestLog
from core.middleware import require_auth, require_admin
from services.metrics import metrics_collector, KPIResult

import structlog
logger = structlog.get_logger()

router = APIRouter()


class MetricsSummaryResponse(BaseModel):
    """메트릭 요약 응답"""
    period_hours: int
    total_requests: int
    success_rate: float
    avg_latency_ms: float
    fallback_rate: float


@router.get("/metrics/dashboard", response_model=dict, tags=["Metrics"])
async def get_dashboard(
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    운영 대시보드 데이터
    
    - KPI 현황
    - 모델별 사용량
    - 엔드포인트별 통계
    - 실시간 알림
    """
    try:
        dashboard_data = await metrics_collector.get_dashboard_data()
        
        return {
            "success": True,
            "data": dashboard_data,
            "meta": {
                "request_id": f"req_dash_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        logger.error("dashboard_error", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="대시보드 데이터 조회 중 오류가 발생했습니다."
        )


@router.get("/metrics/kpis", response_model=dict, tags=["Metrics"])
async def get_kpis(
    hours: int = Query(24, ge=1, le=168, description="조회 시간 범위"),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    KPI 메트릭 조회
    
    - json_valid_rate
    - fallback_rate
    - grounded_answer_rate
    - avg_latency_ms
    - 기타 KPI
    """
    try:
        kpis = await metrics_collector.calculate_kpis(hours=hours)
        
        return {
            "success": True,
            "data": {
                "period_hours": hours,
                "evaluated_at": datetime.utcnow().isoformat(),
                "kpis": [
                    {
                        "name": kpi.name,
                        "display_name": _get_kpi_display_name(kpi.name),
                        "value": kpi.value,
                        "target": kpi.target,
                        "status": kpi.status,
                        "unit": kpi.unit,
                        "formatted": _format_kpi_value(kpi)
                    }
                    for kpi in kpis
                ],
                "summary": {
                    "pass_count": sum(1 for k in kpis if k.status == "pass"),
                    "warning_count": sum(1 for k in kpis if k.status == "warning"),
                    "fail_count": sum(1 for k in kpis if k.status == "fail")
                }
            },
            "meta": {
                "request_id": f"req_kpi_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        logger.error("kpis_error", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="KPI 조회 중 오류가 발생했습니다."
        )


@router.get("/metrics/usage", response_model=dict, tags=["Metrics"])
async def get_usage_stats(
    days: int = Query(7, ge=1, le=30, description="조회 일수"),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    사용량 통계 조회
    
    - 일별 요청 수
    - 모델별 토큰 사용량
    - 엔드포인드별 분포
    """
    try:
        # 최근 N일 통계
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # DB에서 집계
        result = await db.execute(
            select(
                func.date(RequestLog.created_at).label("date"),
                RequestLog.endpoint,
                RequestLog.model_used,
                func.count().label("count"),
                func.avg(RequestLog.latency_ms).label("avg_latency"),
                func.sum(RequestLog.total_tokens).label("total_tokens")
            )
            .where(and_(
                RequestLog.created_at >= start_date,
                RequestLog.created_at <= end_date
            ))
            .group_by(
                func.date(RequestLog.created_at),
                RequestLog.endpoint,
                RequestLog.model_used
            )
            .order_by(desc("date"))
        )
        
        rows = result.all()
        
        # 데이터 정리
        daily_stats = {}
        endpoint_totals = {}
        model_totals = {}
        
        for row in rows:
            date_str = str(row.date)
            
            if date_str not in daily_stats:
                daily_stats[date_str] = {"requests": 0, "tokens": 0}
            
            daily_stats[date_str]["requests"] += row.count
            daily_stats[date_str]["tokens"] += row.total_tokens or 0
            
            endpoint_totals[row.endpoint] = endpoint_totals.get(row.endpoint, 0) + row.count
            
            if row.model_used:
                model_totals[row.model_used] = model_totals.get(row.model_used, 0) + row.count
        
        return {
            "success": True,
            "data": {
                "period_days": days,
                "daily_breakdown": [
                    {"date": d, **stats} for d, stats in sorted(daily_stats.items(), reverse=True)
                ],
                "by_endpoint": endpoint_totals,
                "by_model": model_totals,
                "total_requests": sum(daily_stats[d]["requests"] for d in daily_stats),
                "total_tokens": sum(daily_stats[d]["tokens"] for d in daily_stats)
            },
            "meta": {
                "request_id": f"req_usage_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        logger.error("usage_stats_error", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="사용량 통계 조회 중 오류가 발생했습니다."
        )


@router.get("/metrics/latency", response_model=dict, tags=["Metrics"])
async def get_latency_distribution(
    hours: int = Query(24, ge=1, le=168),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    레이턴시 분포 조회
    
    - P50, P90, P95, P99
    - 엔드포인트별 분포
    - 모델별 분포
    """
    try:
        start_time = datetime.utcnow() - timedelta(hours=hours)
        
        # Raw latency data (simplified)
        result = await db.execute(
            select(RequestLog)
            .where(and_(
                RequestLog.created_at >= start_time,
                RequestLog.latency_ms.isnot(None)
            ))
            .order_by(RequestLog.latency_ms)
        )
        
        logs = result.scalars().all()
        latencies = [log.latency_ms for log in logs if log.latency_ms]
        
        if not latencies:
            return {
                "success": True,
                "data": {"message": "No data available"},
                "meta": {"timestamp": datetime.utcnow().isoformat()}
            }
        
        latencies.sort()
        n = len(latencies)
        
        def percentile(p):
            idx = int(n * p / 100)
            return latencies[min(idx, n - 1)]
        
        return {
            "success": True,
            "data": {
                "period_hours": hours,
                "count": n,
                "min_ms": min(latencies),
                "max_ms": max(latencies),
                "avg_ms": round(sum(latencies) / n, 2),
                "p50_ms": percentile(50),
                "p90_ms": percentile(90),
                "p95_ms": percentile(95),
                "p99_ms": percentile(99),
                "buckets": {
                    "under_1s": sum(1 for l in latencies if l < 1000),
                    "1s_to_3s": sum(1 for l in latencies if 1000 <= l < 3000),
                    "3s_to_5s": sum(1 for l in latencies if 3000 <= l < 5000),
                    "over_5s": sum(1 for l in latencies if l >= 5000)
                }
            },
            "meta": {
                "request_id": f"req_latency_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        logger.error("latency_stats_error", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="레이턴시 통계 조회 중 오류가 발생했습니다."
        )


def _get_kpi_display_name(name: str) -> str:
    """KPI 표시 이름 변환"""
    display_names = {
        "json_valid_rate": "JSON 유효률",
        "extract_field_f1": "추출 정확도(F1)",
        "wrong_tool_rate": "잘못된 툴 선택률",
        "grounded_answer_rate": "근거 기반 답변률",
        "fallback_rate": "Fallback 비율",
        "unsafe_action_preview_rate": "안전하지 않은 Preview 비율",
        "avg_latency_ms": "평균 응답 시간",
        "p99_latency_ms": "P99 응답 시간"
    }
    return display_names.get(name, name)


def _format_kpi_value(kpi: KPIResult) -> str:
    """KPI 값 포맷팅"""
    if kpi.unit == "ratio":
        return f"{kpi.value * 100:.1f}%"
    elif kpi.unit == "ms":
        return f"{kpi.value:.0f}ms"
    else:
        return str(kpi.value)
