"""
User Management API Routes
/v1/users - 사용자 관리 엔드포인트
"""
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, desc, func

from core.database import get_db, User, RequestLog
from core.middleware import require_auth, require_admin
from core.redis_cache import redis_client
from pydantic import BaseModel, Field
from enum import Enum

import structlog
logger = structlog.get_logger()

router = APIRouter()


class UserRole(str, Enum):
    """사용자 역할"""
    ADMIN = "admin"
    MANAGER = "manager"
    USER = "user"
    VIEWER = "viewer"


class UserCreateRequest(BaseModel):
    """사용자 생성 요청"""
    id: str = Field(..., min_length=1, max_length=255)
    email: str = Field(..., pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    org_id: str = Field(..., min_length=1, max_length=255)
    role: UserRole = UserRole.USER


class UserUpdateRequest(BaseModel):
    """사용자 업데이트 요청"""
    email: Optional[str] = Field(None, pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class UserResponse(BaseModel):
    """사용자 응답"""
    id: str
    email: str
    org_id: str
    role: str
    is_active: bool
    total_requests: int
    total_cost_usd: float
    last_login_at: Optional[str]
    created_at: str


@router.post("/users", response_model=dict, tags=["Users"])
async def create_user(
    request: UserCreateRequest,
    db: AsyncSession = Depends(get_db),
    admin_id: str = Depends(require_admin)
):
    """
    새로운 사용자 생성
    
    - 관리자 전용 기능
    - 사용자 기본 정보 설정
    """
    try:
        # 중복 확인
        result = await db.execute(
            select(User).where(User.id == request.id)
        )
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={
                    "success": False,
                    "error": {
                        "code": "USER_EXISTS",
                        "message": "이미 존재하는 사용자 ID입니다."
                    }
                }
            )
        
        user = User(
            id=request.id,
            email=request.email,
            org_id=request.org_id,
            role=request.role.value,
            is_active=True,
            total_requests=0,
            total_cost_usd=0
        )
        
        db.add(user)
        await db.commit()
        await db.refresh(user)
        
        logger.info(
            "user_created",
            user_id=request.id,
            org_id=request.org_id,
            role=request.role.value,
            created_by=admin_id
        )
        
        return {
            "success": True,
            "data": {
                "id": user.id,
                "email": user.email,
                "org_id": user.org_id,
                "role": user.role,
                "is_active": user.is_active,
                "created_at": user.created_at.isoformat()
            },
            "meta": {
                "request_id": f"req_user_create_{request.id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("user_create_error", error=str(e), admin_id=admin_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="사용자 생성 중 오류가 발생했습니다."
        )


@router.get("/users", response_model=dict, tags=["Users"])
async def list_users(
    org_id: Optional[str] = Query(None, description="조직 필터"),
    role: Optional[UserRole] = Query(None, description="역할 필터"),
    is_active: Optional[bool] = Query(None, description="활성 상태 필터"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    사용자 목록 조회
    
    - 필터링: 조직, 역할, 활성 상태
    - 페이지네이션 지원
    """
    try:
        # 쿼리 조건 구성
        conditions = []
        if org_id:
            conditions.append(User.org_id == org_id)
        if role:
            conditions.append(User.role == role.value)
        if is_active is not None:
            conditions.append(User.is_active == is_active)
        
        # 기본 쿼리
        query = select(User)
        if conditions:
            query = query.where(and_(*conditions))
        
        # 정렬 및 페이지네이션
        query = query.order_by(desc(User.created_at)).offset(offset).limit(limit)
        
        result = await db.execute(query)
        users = result.scalars().all()
        
        # 총 개수 조회
        count_query = select(func.count()).select_from(User)
        if conditions:
            count_query = count_query.where(and_(*conditions))
        count_result = await db.execute(count_query)
        total_count = count_result.scalar()
        
        return {
            "success": True,
            "data": {
                "items": [
                    {
                        "id": u.id,
                        "email": u.email,
                        "org_id": u.org_id,
                        "role": u.role,
                        "is_active": u.is_active,
                        "total_requests": u.total_requests,
                        "total_cost_usd": float(u.total_cost_usd) if u.total_cost_usd else 0,
                        "last_login_at": u.last_login_at.isoformat() if u.last_login_at else None,
                        "created_at": u.created_at.isoformat()
                    }
                    for u in users
                ],
                "pagination": {
                    "total": total_count,
                    "limit": limit,
                    "offset": offset,
                    "has_more": (offset + limit) < total_count
                }
            },
            "meta": {
                "request_id": f"req_users_list_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except Exception as e:
        logger.error("users_list_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="사용자 목록 조회 중 오류가 발생했습니다."
        )


@router.get("/users/{user_id}", response_model=dict, tags=["Users"])
async def get_user(
    user_id: str,
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(require_auth)
):
    """
    단일 사용자 상세 조회
    
    - 본인 정보나 관리자만 조회 가능
    """
    try:
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="사용자를 찾을 수 없습니다."
            )
        
        # 권한 확인 (본인 또는 관리자)
        if current_user_id != user_id:
            # TODO: 관리자 권한 확인
            pass
        
        return {
            "success": True,
            "data": {
                "id": user.id,
                "email": user.email,
                "org_id": user.org_id,
                "role": user.role,
                "is_active": user.is_active,
                "total_requests": user.total_requests,
                "total_cost_usd": float(user.total_cost_usd) if user.total_cost_usd else 0,
                "last_login_at": user.last_login_at.isoformat() if user.last_login_at else None,
                "created_at": user.created_at.isoformat(),
                "updated_at": user.updated_at.isoformat() if user.updated_at else None
            },
            "meta": {
                "request_id": f"req_user_{user_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("user_get_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="사용자 조회 중 오류가 발생했습니다."
        )


@router.patch("/users/{user_id}", response_model=dict, tags=["Users"])
async def update_user(
    user_id: str,
    request: UserUpdateRequest,
    db: AsyncSession = Depends(get_db),
    admin_id: str = Depends(require_admin)
):
    """
    사용자 정보 업데이트
    
    - 관리자 전용 기능
    - 역할 변경 시 권한 캐시 무효화
    """
    try:
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="사용자를 찾을 수 없습니다."
            )
        
        # 업데이트 적용
        if request.email:
            user.email = request.email
        
        role_changed = False
        if request.role:
            if user.role != request.role.value:
                role_changed = True
            user.role = request.role.value
        
        if request.is_active is not None:
            user.is_active = request.is_active
        
        user.updated_at = datetime.utcnow()
        
        await db.commit()
        await db.refresh(user)
        
        # 역할 변경 시 캐시 무효화
        if role_changed:
            await redis_client.invalidate_role_cache(user.role)
            await redis_client.delete(f"permissions:{user_id}")
            logger.info(
                "user_role_changed",
                user_id=user_id,
                new_role=user.role,
                cache_invalidated=True
            )
        
        logger.info(
            "user_updated",
            user_id=user_id,
            updated_by=admin_id,
            role_changed=role_changed
        )
        
        return {
            "success": True,
            "data": {
                "id": user.id,
                "email": user.email,
                "org_id": user.org_id,
                "role": user.role,
                "is_active": user.is_active,
                "updated_at": user.updated_at.isoformat()
            },
            "meta": {
                "request_id": f"req_user_update_{user_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("user_update_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="사용자 업데이트 중 오류가 발생했습니다."
        )


@router.get("/users/me/stats", response_model=dict, tags=["Users"])
async def get_my_stats(
    days: int = Query(30, ge=1, le=365, description="조회 일수"),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    현재 사용자의 사용량 통계
    
    - 요청 수, 비용, 모델 사용 분포
    """
    try:
        from_date = datetime.utcnow() - __import__('datetime').timedelta(days=days)
        
        # 사용자 기본 정보
        user_result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = user_result.scalar_one_or_none()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="사용자를 찾을 수 없습니다."
            )
        
        # 기간별 요청 통계
        stats_result = await db.execute(
            select(
                func.count().label("total_requests"),
                func.sum(RequestLog.total_tokens).label("total_tokens"),
                func.sum(RequestLog.estimated_cost_usd).label("total_cost"),
                func.avg(RequestLog.latency_ms).label("avg_latency")
            )
            .where(
                and_(
                    RequestLog.user_id == user_id,
                    RequestLog.created_at >= from_date
                )
            )
        )
        stats = stats_result.one()
        
        # 엔드포인트별 사용량
        endpoint_stats = await db.execute(
            select(RequestLog.endpoint, func.count())
            .where(
                and_(
                    RequestLog.user_id == user_id,
                    RequestLog.created_at >= from_date
                )
            )
            .group_by(RequestLog.endpoint)
        )
        endpoint_usage = {row[0]: row[1] for row in endpoint_stats.all()}
        
        # 모델별 사용량
        model_stats = await db.execute(
            select(RequestLog.model_used, func.count())
            .where(
                and_(
                    RequestLog.user_id == user_id,
                    RequestLog.created_at >= from_date
                )
            )
            .group_by(RequestLog.model_used)
        )
        model_usage = {row[0]: row[1] for row in model_stats.all()}
        
        return {
            "success": True,
            "data": {
                "user_id": user_id,
                "period_days": days,
                "summary": {
                    "total_requests": stats.total_requests or 0,
                    "total_tokens": stats.total_tokens or 0,
                    "total_cost_usd": round(float(stats.total_cost), 4) if stats.total_cost else 0,
                    "average_latency_ms": round(float(stats.avg_latency), 1) if stats.avg_latency else 0
                },
                "by_endpoint": endpoint_usage,
                "by_model": model_usage,
                "all_time": {
                    "total_requests": user.total_requests,
                    "total_cost_usd": float(user.total_cost_usd) if user.total_cost_usd else 0
                }
            },
            "meta": {
                "request_id": f"req_user_stats_{user_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("user_stats_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="사용자 통계 조회 중 오류가 발생했습니다."
        )


@router.post("/users/me/login", response_model=dict, tags=["Users"])
async def record_login(
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    사용자 로그인 기록
    
    - 마지막 로그인 시간 업데이트
    """
    try:
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()
        
        if user:
            user.last_login_at = datetime.utcnow()
            await db.commit()
        
        return {
            "success": True,
            "data": {
                "user_id": user_id,
                "logged_in_at": datetime.utcnow().isoformat()
            },
            "meta": {
                "request_id": f"req_login_{user_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except Exception as e:
        logger.error("login_record_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="로그인 기록 중 오류가 발생했습니다."
        )
