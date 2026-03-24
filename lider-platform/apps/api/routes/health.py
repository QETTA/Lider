"""
Health Check API Routes
"""
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db, engine
from core.redis_cache import redis_client
from services.model_router import model_router
from services.providers import MoonshotProvider, AnthropicProvider

router = APIRouter()


@router.get("/health", tags=["Health"])
async def health_check():
    """기본 헬스 체크"""
    return {
        "status": "healthy",
        "service": "lider-api",
        "version": "1.0.0",
        "timestamp": "2024-03-24T00:00:00Z"
    }


@router.get("/health/detailed", tags=["Health"])
async def detailed_health_check(db: AsyncSession = Depends(get_db)):
    """상세 헬스 체크 - 모든 의존성 확인"""
    checks = {
        "api": {"status": "healthy", "response_time_ms": 0},
        "database": {"status": "unknown", "response_time_ms": 0},
        "redis": {"status": "unknown", "response_time_ms": 0},
        "moonshot_api": {"status": "unknown"},
        "anthropic_api": {"status": "unknown"}
    }
    
    import time
    
    # Database check
    try:
        start = time.time()
        await db.execute(text("SELECT 1"))
        checks["database"]["status"] = "healthy"
        checks["database"]["response_time_ms"] = int((time.time() - start) * 1000)
    except Exception as e:
        checks["database"]["status"] = "unhealthy"
        checks["database"]["error"] = str(e)
    
    # Redis check
    try:
        start = time.time()
        await redis_client.connect()
        await redis_client._redis.ping()
        checks["redis"]["status"] = "healthy"
        checks["redis"]["response_time_ms"] = int((time.time() - start) * 1000)
    except Exception as e:
        checks["redis"]["status"] = "unhealthy"
        checks["redis"]["error"] = str(e)
    
    # AI Provider checks
    moonshot = MoonshotProvider()
    anthropic = AnthropicProvider()
    
    try:
        checks["moonshot_api"]["status"] = "healthy" if await moonshot.health_check() else "unhealthy"
    except Exception as e:
        checks["moonshot_api"]["status"] = "unhealthy"
        checks["moonshot_api"]["error"] = str(e)
    
    try:
        checks["anthropic_api"]["status"] = "healthy" if await anthropic.health_check() else "unhealthy"
    except Exception as e:
        checks["anthropic_api"]["status"] = "unhealthy"
        checks["anthropic_api"]["error"] = str(e)
    
    # Overall status
    all_healthy = all(
        c["status"] == "healthy"
        for c in [checks["api"], checks["database"], checks["redis"]]
    )
    
    return {
        "status": "healthy" if all_healthy else "degraded",
        "service": "lider-api",
        "checks": checks,
        "timestamp": "2024-03-24T00:00:00Z"
    }
