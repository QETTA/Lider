"""
LIDER AI 업무 오케스트레이션 플랫폼
FastAPI 메인 애플리케이션
"""
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
import structlog

from core.config import settings
from core.database import engine, Base
from core.middleware import (
    RateLimitMiddleware,
    PIIRedactionMiddleware,
    RequestLoggingMiddleware
)
from routes import assist, extract, action_preview, sessions, files, health, users, badcases, metrics

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """애플리케이션 수명 주기 관리"""
    # Startup
    logger.info("lider_api_starting", version=settings.APP_VERSION)
    
    # 데이터베이스 테이블 생성 (개발 환경)
    if settings.ENVIRONMENT == "development":
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("database_tables_created")
    
    yield
    
    # Shutdown
    logger.info("lider_api_shutting_down")
    await engine.dispose()


app = FastAPI(
    title="LIDER AI Platform API",
    description="AI 업무 오케스트레이션 SaaS - 문서 추출, 통합 검색, 실행 전 검토",
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    lifespan=lifespan
)

# 미들웨어 설정 (순서 중요: 요청 들어오는 순서의 역순으로 실행)
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(PIIRedactionMiddleware)
app.add_middleware(RateLimitMiddleware)

# 라우터 등록
app.include_router(health.router, tags=["Health"])
app.include_router(sessions.router, prefix="/v1", tags=["Sessions"])
app.include_router(files.router, prefix="/v1", tags=["Files"])
app.include_router(assist.router, prefix="/v1", tags=["Assist"])
app.include_router(extract.router, prefix="/v1", tags=["Extract"])
app.include_router(action_preview.router, prefix="/v1", tags=["Actions"])
app.include_router(users.router, prefix="/v1", tags=["Users"])
app.include_router(badcases.router, prefix="/v1", tags=["BadCases"])
app.include_router(metrics.router, prefix="/v1", tags=["Metrics"])


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """전역 예외 핸들러"""
    logger.error(
        "unhandled_exception",
        error=str(exc),
        path=request.url.path,
        method=request.method
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "서버 내부 오류가 발생했습니다."
            },
            "meta": {
                "request_id": getattr(request.state, "request_id", "unknown"),
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
        }
    )


@app.get("/")
async def root():
    """API 루트 엔드포인트"""
    return {
        "name": "LIDER AI Platform",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.ENVIRONMENT == "development",
        log_level=settings.LOG_LEVEL.lower()
    )
