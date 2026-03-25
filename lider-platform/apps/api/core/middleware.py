"""
LIDER 미들웨어 컴포넌트
- Rate Limiting
- PII Redaction
- Request Logging
"""
import time
import uuid
import re
from typing import Optional
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.status import HTTP_429_TOO_MANY_REQUESTS, HTTP_503_SERVICE_UNAVAILABLE
import structlog

from core.config import settings
from core.redis_cache import redis_client

logger = structlog.get_logger()


class RateLimitMiddleware(BaseHTTPMiddleware):
    """요청 속도 제한 미들웨어"""
    
    async def dispatch(self, request: Request, call_next):
        # Health check는 제외
        if request.url.path in ["/health", "/", "/docs", "/redoc", "/openapi.json"]:
            return await call_next(request)
        
        # API 키 또는 사용자 ID 추출
        user_id = self._extract_user_id(request)
        key = f"rate_limit:{user_id}:{request.url.path}"
        
        # Redis에서 현재 요청 수 확인
        try:
            current_count = await redis_client.incr(key)
            if current_count == 1:
                # 첫 요청이면 TTL 설정
                await redis_client.expire(key, 60)
            
            # 요청 한도 확인
            tier_limit = await self._get_user_tier_limit(user_id)
            burst_limit = await self._get_user_burst_limit(user_id)
            
            remaining = tier_limit - current_count
            
            response = await call_next(request)
            
            # Rate Limit 헤더 추가
            response.headers["X-RateLimit-Limit"] = str(tier_limit)
            response.headers["X-RateLimit-Remaining"] = str(max(0, remaining))
            response.headers["X-RateLimit-Reset"] = str(int(time.time()) + 60)
            
            if current_count > tier_limit:
                logger.warning(
                    "rate_limit_exceeded",
                    user_id=user_id,
                    path=request.url.path,
                    count=current_count
                )
                return Response(
                    content='{"success": false, "error": {"code": "RATE_LIMITED", "message": "요청 한도 초과. 잠시 후 다시 시도해주세요."}}',
                    status_code=HTTP_429_TOO_MANY_REQUESTS,
                    media_type="application/json",
                    headers={
                        "X-RateLimit-Limit": str(tier_limit),
                        "X-RateLimit-Remaining": "0",
                        "Retry-After": "60"
                    }
                )
            
            return response
            
        except Exception as e:
            logger.error("rate_limit_check_failed", error=str(e))
            # Redis 오류 시 기본적으로 요청 허용 (graceful degradation)
            return await call_next(request)
    
    def _extract_user_id(self, request: Request) -> str:
        """요청에서 사용자 ID 추출"""
        # Authorization 헤더에서 추출
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            # JWT 토큰에서 사용자 ID 추출 (간략화)
            return "user_from_token"
        
        # API 키 헤더에서 추출
        api_key = request.headers.get("X-API-Key", "")
        if api_key:
            return f"api_{api_key[:8]}"
        
        # IP 주소 기반
        client_ip = request.client.host if request.client else "unknown"
        return f"ip_{client_ip}"
    
    async def _get_user_tier_limit(self, user_id: str) -> int:
        """사용자 요금제별 한도 반환"""
        # TODO: 사용자 DB에서 tier 조회
        # 기본값 반환
        return settings.RATE_LIMIT_PER_MINUTE
    
    async def _get_user_burst_limit(self, user_id: str) -> int:
        """사용자 burst 한도 반환"""
        return settings.RATE_LIMIT_BURST


class PIIRedactionMiddleware(BaseHTTPMiddleware):
    """PII (개인식별정보) 검출 및 마스킹 미들웨어"""
    
    # PII 패턴 정의
    PII_PATTERNS = {
        "email": re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'),
        "phone": re.compile(r'\b(?:\+?82|0)?[-.\s]?\d{2,4}[-.\s]?\d{3,4}[-.\s]?\d{4}\b'),
        "ssn": re.compile(r'\d{6}[-\s]?\d{7}'),  # 한국 주민번호
        "credit_card": re.compile(r'\b(?:\d{4}[-\s]?){3}\d{4}\b'),
        "ip_address": re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b'),
    }
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # 요청 ID 생성
        request_id = str(uuid.uuid4())[:8]
        request.state.request_id = request_id
        
        response = await call_next(request)
        
        # PII redaction 처리 시간 로깅
        pii_time = (time.time() - start_time) * 1000
        response.headers["X-PII-Redaction-Time-Ms"] = str(int(pii_time))
        
        return response
    
    @classmethod
    def redact_pii(cls, text: str) -> str:
        """텍스트에서 PII 마스킹"""
        if not text:
            return text
        
        redacted = text
        for pii_type, pattern in cls.PII_PATTERNS.items():
            redacted = pattern.sub(f"[REDACTED_{pii_type.upper()}]", redacted)
        return redacted


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """요청/응답 로깅 미들웨어"""
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        request_id = getattr(request.state, "request_id", str(uuid.uuid4())[:8])
        
        # 요청 로깅
        logger.info(
            "request_start",
            request_id=request_id,
            method=request.method,
            path=request.url.path,
            query=str(request.url.query),
            client_host=request.client.host if request.client else None,
            user_agent=request.headers.get("User-Agent", "")[:100]
        )
        
        try:
            response = await call_next(request)
            duration = (time.time() - start_time) * 1000
            
            # 응답 로깅
            logger.info(
                "request_complete",
                request_id=request_id,
                status_code=response.status_code,
                duration_ms=round(duration, 2)
            )
            
            # 응답 헤더에 요청 ID 추가
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Response-Time-Ms"] = str(int(duration))
            
            return response
            
        except Exception as e:
            duration = (time.time() - start_time) * 1000
            logger.error(
                "request_failed",
                request_id=request_id,
                error=str(e),
                duration_ms=round(duration, 2)
            )
            raise


# ===== 인증 의존성 함수 =====

from fastapi import HTTPException, status

async def require_auth(request: Request) -> str:
    """
    요청에서 사용자 인증 정보 추출
    
    - Header: X-User-ID에서 사용자 ID 추출
    - JWT 검증 (Phase 2에서 구현)
    """
    user_id = request.headers.get("X-User-ID")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "UNAUTHORIZED",
                    "message": "인증이 필요합니다. X-User-ID 헤더를 포함해주세요."
                }
            }
        )
    
    # 요청 상태에 사용자 정보 저장
    request.state.user_id = user_id
    
    return user_id


async def require_admin(request: Request) -> str:
    """관리자 권한 확인"""
    user_id = await require_auth(request)
    
    # Phase 2: 실제 권한 확인 로직 구현
    # 현재는 헤더 X-Is-Admin 확인
    is_admin = request.headers.get("X-Is-Admin") == "true"
    
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": {
                    "code": "FORBIDDEN",
                    "message": "관리자 권한이 필요합니다."
                }
            }
        )
    
    return user_id
