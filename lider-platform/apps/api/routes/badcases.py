"""
BadCase Management API Routes
/v1/badcases - 품질 이슈 배드케이스 관리 엔드포인트
"""
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, desc, func

from core.database import get_db, BadCase, RequestLog
from core.middleware import require_auth
from pydantic import BaseModel, Field
from enum import Enum

import structlog
logger = structlog.get_logger()

router = APIRouter()


class Severity(str, Enum):
    """심각도 수준"""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class Category(str, Enum):
    """배드케이스 유형"""
    JSON_ERROR = "json_error"
    HALLUCINATION = "hallucination"
    INCOMPLETE = "incomplete"
    PARSING_ERROR = "parsing_error"
    LOW_CONFIDENCE = "low_confidence"
    WRONG_FORMAT = "wrong_format"
    TIMEOUT = "timeout"
    OTHER = "other"


class Status(str, Enum):
    """처리 상태"""
    OPEN = "open"
    INVESTIGATING = "investigating"
    RESOLVED = "resolved"
    FALSE_POSITIVE = "false_positive"


class BadCaseCreateRequest(BaseModel):
    """배드케이스 생성 요청"""
    category: Category
    severity: Severity
    description: str = Field(..., min_length=10, max_length=2000)
    request_id: Optional[str] = None
    input_snapshot: Optional[dict] = None
    model_output: Optional[str] = None
    expected_output: Optional[str] = None


class BadCaseUpdateRequest(BaseModel):
    """배드케이스 업데이트 요청"""
    status: Optional[Status] = None
    assigned_to: Optional[str] = None
    resolution: Optional[str] = None


class BadCaseResponse(BaseModel):
    """배드케이스 응답"""
    id: str
    case_id: str
    category: str
    severity: str
    description: str
    status: str
    created_at: str
    assigned_to: Optional[str] = None
    resolved_at: Optional[str] = None


@router.post("/badcases", response_model=dict, tags=["BadCases"])
async def create_badcase(
    request: BadCaseCreateRequest,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    새로운 배드케이스 생성
    
    - AI 응답 품질 이슈 보고
    - 자동 분류 및 우선순위 설정
    """
    case_id = f"bc_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{user_id[:8]}"
    
    try:
        badcase = BadCase(
            case_id=case_id,
            request_id=request.request_id,
            category=request.category.value,
            severity=request.severity.value,
            description=request.description,
            input_snapshot=request.input_snapshot or {},
            model_output=request.model_output,
            expected_output=request.expected_output,
            status="open",
            assigned_to=None,
            resolution=None
        )
        
        db.add(badcase)
        await db.commit()
        await db.refresh(badcase)
        
        logger.info(
            "badcase_created",
            case_id=case_id,
            category=request.category.value,
            severity=request.severity.value,
            reporter=user_id
        )
        
        return {
            "success": True,
            "data": {
                "id": str(badcase.id),
                "case_id": case_id,
                "status": "open",
                "created_at": badcase.created_at.isoformat()
            },
            "meta": {
                "request_id": f"req_{case_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except Exception as e:
        logger.error("badcase_create_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="배드케이스 생성 중 오류가 발생했습니다."
        )


@router.get("/badcases", response_model=dict, tags=["BadCases"])
async def list_badcases(
    status: Optional[Status] = Query(None, description="상태 필터"),
    category: Optional[Category] = Query(None, description="유형 필터"),
    severity: Optional[Severity] = Query(None, description="심각도 필터"),
    assigned_to: Optional[str] = Query(None, description="담당자 필터"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    배드케이스 목록 조회
    
    - 필터링: 상태, 유형, 심각도, 담당자
    - 페이지네이션 지원
    """
    try:
        # 쿼리 조건 구성
        conditions = []
        if status:
            conditions.append(BadCase.status == status.value)
        if category:
            conditions.append(BadCase.category == category.value)
        if severity:
            conditions.append(BadCase.severity == severity.value)
        if assigned_to:
            conditions.append(BadCase.assigned_to == assigned_to)
        
        # 기본 쿼리
        query = select(BadCase)
        if conditions:
            query = query.where(and_(*conditions))
        
        # 정렬 및 페이지네이션
        query = query.order_by(desc(BadCase.created_at)).offset(offset).limit(limit)
        
        result = await db.execute(query)
        badcases = result.scalars().all()
        
        # 총 개수 조회
        count_query = select(func.count()).select_from(BadCase)
        if conditions:
            count_query = count_query.where(and_(*conditions))
        count_result = await db.execute(count_query)
        total_count = count_result.scalar()
        
        return {
            "success": True,
            "data": {
                "items": [
                    {
                        "id": str(bc.id),
                        "case_id": bc.case_id,
                        "category": bc.category,
                        "severity": bc.severity,
                        "description": bc.description[:100] + "..." if len(bc.description) > 100 else bc.description,
                        "status": bc.status,
                        "assigned_to": bc.assigned_to,
                        "created_at": bc.created_at.isoformat(),
                        "resolved_at": bc.resolved_at.isoformat() if bc.resolved_at else None
                    }
                    for bc in badcases
                ],
                "pagination": {
                    "total": total_count,
                    "limit": limit,
                    "offset": offset,
                    "has_more": (offset + limit) < total_count
                }
            },
            "meta": {
                "request_id": f"req_list_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except Exception as e:
        logger.error("badcase_list_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="배드케이스 목록 조회 중 오류가 발생했습니다."
        )


@router.get("/badcases/{case_id}", response_model=dict, tags=["BadCases"])
async def get_badcase(
    case_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """단일 배드케이스 상세 조회"""
    try:
        result = await db.execute(
            select(BadCase).where(BadCase.case_id == case_id)
        )
        badcase = result.scalar_one_or_none()
        
        if not badcase:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="배드케이스를 찾을 수 없습니다."
            )
        
        # 연관된 요청 로그 조회
        related_request = None
        if badcase.request_id:
            req_result = await db.execute(
                select(RequestLog).where(RequestLog.request_id == badcase.request_id)
            )
            req = req_result.scalar_one_or_none()
            if req:
                related_request = {
                    "request_id": req.request_id,
                    "endpoint": req.endpoint,
                    "model_used": req.model_used,
                    "created_at": req.created_at.isoformat()
                }
        
        return {
            "success": True,
            "data": {
                "id": str(badcase.id),
                "case_id": badcase.case_id,
                "category": badcase.category,
                "severity": badcase.severity,
                "description": badcase.description,
                "status": badcase.status,
                "input_snapshot": badcase.input_snapshot,
                "model_output": badcase.model_output,
                "expected_output": badcase.expected_output,
                "assigned_to": badcase.assigned_to,
                "resolution": badcase.resolution,
                "created_at": badcase.created_at.isoformat(),
                "resolved_at": badcase.resolved_at.isoformat() if badcase.resolved_at else None,
                "related_request": related_request
            },
            "meta": {
                "request_id": f"req_{case_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("badcase_get_error", error=str(e), case_id=case_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="배드케이스 조회 중 오류가 발생했습니다."
        )


@router.patch("/badcases/{case_id}", response_model=dict, tags=["BadCases"])
async def update_badcase(
    case_id: str,
    request: BadCaseUpdateRequest,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    배드케이스 상태 업데이트
    
    - 상태 변경 (open → investigating → resolved)
    - 담당자 할당
    - 해결 내용 기록
    """
    try:
        result = await db.execute(
            select(BadCase).where(BadCase.case_id == case_id)
        )
        badcase = result.scalar_one_or_none()
        
        if not badcase:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="배드케이스를 찾을 수 없습니다."
            )
        
        # 업데이트 적용
        if request.status:
            badcase.status = request.status.value
            if request.status == Status.RESOLVED:
                badcase.resolved_at = datetime.utcnow()
        
        if request.assigned_to:
            badcase.assigned_to = request.assigned_to
        
        if request.resolution:
            badcase.resolution = request.resolution
        
        await db.commit()
        await db.refresh(badcase)
        
        logger.info(
            "badcase_updated",
            case_id=case_id,
            new_status=request.status.value if request.status else None,
            updater=user_id
        )
        
        return {
            "success": True,
            "data": {
                "id": str(badcase.id),
                "case_id": case_id,
                "status": badcase.status,
                "assigned_to": badcase.assigned_to,
                "updated_at": datetime.utcnow().isoformat()
            },
            "meta": {
                "request_id": f"req_update_{case_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("badcase_update_error", error=str(e), case_id=case_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="배드케이스 업데이트 중 오류가 발생했습니다."
        )


@router.delete("/badcases/{case_id}", response_model=dict, tags=["BadCases"])
async def delete_badcase(
    case_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    배드케이스 삭제 (관리자 전용)
    
    - False positive 케이스 삭제
    - 데이터 정리용
    """
    try:
        result = await db.execute(
            select(BadCase).where(BadCase.case_id == case_id)
        )
        badcase = result.scalar_one_or_none()
        
        if not badcase:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="배드케이스를 찾을 수 없습니다."
            )
        
        await db.delete(badcase)
        await db.commit()
        
        logger.info("badcase_deleted", case_id=case_id, deleted_by=user_id)
        
        return {
            "success": True,
            "data": {"deleted": True, "case_id": case_id},
            "meta": {
                "request_id": f"req_del_{case_id}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("badcase_delete_error", error=str(e), case_id=case_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="배드케이스 삭제 중 오류가 발생했습니다."
        )


@router.get("/badcases/stats/summary", response_model=dict, tags=["BadCases"])
async def get_badcase_stats(
    days: int = Query(30, ge=1, le=365, description="조회 일수"),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(require_auth)
):
    """
    배드케이스 통계 요약
    
    - 상태별 분포
    - 카테고리별 분포
    - 심각도별 분포
    - 일별 추이
    """
    try:
        from_date = datetime.utcnow() - __import__('datetime').timedelta(days=days)
        
        # 상태별 개수
        status_counts = await db.execute(
            select(BadCase.status, func.count())
            .where(BadCase.created_at >= from_date)
            .group_by(BadCase.status)
        )
        status_stats = {row[0]: row[1] for row in status_counts.all()}
        
        # 카테고리별 개수
        category_counts = await db.execute(
            select(BadCase.category, func.count())
            .where(BadCase.created_at >= from_date)
            .group_by(BadCase.category)
        )
        category_stats = {row[0]: row[1] for row in category_counts.all()}
        
        # 심각도별 개수
        severity_counts = await db.execute(
            select(BadCase.severity, func.count())
            .where(BadCase.created_at >= from_date)
            .group_by(BadCase.severity)
        )
        severity_stats = {row[0]: row[1] for row in severity_counts.all()}
        
        # 총 개수
        total_count = sum(status_stats.values())
        open_count = status_stats.get("open", 0) + status_stats.get("investigating", 0)
        resolved_count = status_stats.get("resolved", 0)
        
        # 해결률 계산
        resolution_rate = (resolved_count / (total_count - status_stats.get("false_positive", 0)) * 100) if total_count > 0 else 0
        
        return {
            "success": True,
            "data": {
                "period_days": days,
                "total_count": total_count,
                "open_count": open_count,
                "resolved_count": resolved_count,
                "resolution_rate": round(resolution_rate, 1),
                "by_status": status_stats,
                "by_category": category_stats,
                "by_severity": severity_stats
            },
            "meta": {
                "request_id": f"req_stats_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        
    except Exception as e:
        logger.error("badcase_stats_error", error=str(e), user_id=user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="통계 조회 중 오류가 발생했습니다."
        )
