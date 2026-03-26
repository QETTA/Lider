"""
API v1 라우터
"""

from fastapi import APIRouter

from app.api.v1.endpoints import institutions, uploads, analysis, dashboard

api_router = APIRouter()

# 기관 관리
api_router.include_router(
    institutions.router,
    prefix="/institutions",
    tags=["기관 관리"]
)

# 데이터 업로드
api_router.include_router(
    uploads.router,
    prefix="/uploads",
    tags=["데이터 업로드"]
)

# 분석 결과
api_router.include_router(
    analysis.router,
    prefix="/analysis",
    tags=["분석 결과"]
)

# 대시보드
api_router.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["대시보드"]
)
