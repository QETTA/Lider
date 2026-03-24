"""
Session Management API Routes
"""
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional

from core.database import get_db, Session as SessionModel
from core.redis_cache import redis_client
from schemas.session import SessionCreateRequest, SessionResponse

router = APIRouter()


@router.post("/sessions", response_model=dict, tags=["Sessions"])
async def create_session(
    request: SessionCreateRequest,
    db: AsyncSession = Depends(get_db)
):
    """새로운 세션 생성"""
    session_id = f"sess_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{request.user_id[:8]}"
    
    expires_at = datetime.utcnow() + timedelta(hours=2)
    
    # DB에 세션 생성
    db_session = SessionModel(
        id=session_id,
        user_id=request.user_id,
        org_id=request.org_id,
        metadata=request.metadata or {},
        expires_at=expires_at
    )
    
    db.add(db_session)
    await db.commit()
    await db.refresh(db_session)
    
    # Redis에 캐싱
    await redis_client.set_session(
        session_id,
        {
            "user_id": request.user_id,
            "org_id": request.org_id,
            "metadata": request.metadata,
            "context": {},
            "created_at": datetime.utcnow().isoformat(),
            "expires_at": expires_at.isoformat()
        }
    )
    
    return {
        "success": True,
        "data": {
            "id": session_id,
            "user_id": request.user_id,
            "org_id": request.org_id,
            "expires_at": expires_at.isoformat()
        },
        "meta": {
            "request_id": f"req_{session_id}",
            "timestamp": datetime.utcnow().isoformat()
        }
    }


@router.get("/sessions/{session_id}", response_model=dict, tags=["Sessions"])
async def get_session(
    session_id: str,
    db: AsyncSession = Depends(get_db)
):
    """세션 조회"""
    # Redis에서 먼저 조회
    cached = await redis_client.get_session(session_id)
    if cached:
        return {
            "success": True,
            "data": {
                "id": session_id,
                **cached
            },
            "meta": {
                "request_id": f"req_{session_id}",
                "timestamp": datetime.utcnow().isoformat(),
                "cached": True
            }
        }
    
    # DB에서 조회
    result = await db.execute(
        select(SessionModel).where(SessionModel.id == session_id)
    )
    session = result.scalar_one_or_none()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found"
        )
    
    return {
        "success": True,
        "data": {
            "id": str(session.id),
            "user_id": session.user_id,
            "org_id": session.org_id,
            "context": session.context,
            "metadata": session.metadata,
            "created_at": session.created_at.isoformat() if session.created_at else None,
            "updated_at": session.updated_at.isoformat() if session.updated_at else None,
            "expires_at": session.expires_at.isoformat() if session.expires_at else None
        },
        "meta": {
            "request_id": f"req_{session_id}",
            "timestamp": datetime.utcnow().isoformat(),
            "cached": False
        }
    }


@router.delete("/sessions/{session_id}", response_model=dict, tags=["Sessions"])
async def delete_session(
    session_id: str,
    db: AsyncSession = Depends(get_db)
):
    """세션 종료"""
    result = await db.execute(
        select(SessionModel).where(SessionModel.id == session_id)
    )
    session = result.scalar_one_or_none()
    
    if session:
        await db.delete(session)
        await db.commit()
    
    # Redis에서도 삭제
    await redis_client.delete(f"session:{session_id}")
    
    return {
        "success": True,
        "data": {"deleted": True},
        "meta": {
            "request_id": f"req_{session_id}",
            "timestamp": datetime.utcnow().isoformat()
        }
    }
