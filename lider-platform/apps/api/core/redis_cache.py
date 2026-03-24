"""
LIDER Redis 캐시 클라이언트
TTL 및 크기 제한 관리
"""
import json
import pickle
from typing import Optional, Any, Union
from datetime import timedelta

import redis.asyncio as redis
from core.config import settings


class RedisCache:
    """Redis 캐시 관리자"""
    
    def __init__(self):
        self._redis: Optional[redis.Redis] = None
    
    async def connect(self):
        """Redis 연결 초기화"""
        if self._redis is None:
            self._redis = redis.from_url(
                str(settings.REDIS_URL),
                max_connections=settings.REDIS_POOL_SIZE,
                decode_responses=True
            )
    
    async def disconnect(self):
        """Redis 연결 종료"""
        if self._redis:
            await self._redis.close()
            self._redis = None
    
    async def get(self, key: str) -> Optional[Any]:
        """캐시 값 조회"""
        await self.connect()
        value = await self._redis.get(key)
        if value is None:
            return None
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return value
    
    async def set(
        self,
        key: str,
        value: Any,
        ttl_seconds: int = 3600,
        max_size_bytes: int = 10 * 1024 * 1024  # 10MB
    ) -> bool:
        """캐시 값 저장 (크기 제한 적용)"""
        await self.connect()
        
        # 직렬화
        if isinstance(value, (dict, list)):
            serialized = json.dumps(value, ensure_ascii=False)
        else:
            serialized = str(value)
        
        # 크기 검사
        size = len(serialized.encode('utf-8'))
        if size > max_size_bytes:
            # 크기 초과 시 저장하지 않음
            return False
        
        await self._redis.setex(key, ttl_seconds, serialized)
        return True
    
    async def delete(self, key: str) -> bool:
        """캐시 값 삭제"""
        await self.connect()
        result = await self._redis.delete(key)
        return result > 0
    
    async def incr(self, key: str) -> int:
        """카운터 증가"""
        await self.connect()
        return await self._redis.incr(key)
    
    async def expire(self, key: str, seconds: int) -> bool:
        """TTL 설정"""
        await self.connect()
        return await self._redis.expire(key, seconds)
    
    async def get_session(self, session_id: str) -> Optional[dict]:
        """세션 캐시 조회 (TTL: 2시간, 최대 10MB)"""
        key = f"session:{session_id}"
        return await self.get(key)
    
    async def set_session(self, session_id: str, data: dict) -> bool:
        """세션 캐시 저장 (TTL: 2시간, 최대 10MB, 1000개 제한)"""
        key = f"session:{session_id}"
        return await self.set(
            key,
            data,
            ttl_seconds=settings.CACHE_TTL_SESSION,
            max_size_bytes=10 * 1024 * 1024  # 10MB
        )
    
    async def get_permissions(self, user_id: str) -> Optional[dict]:
        """권한 캐시 조회 (TTL: 15분, 최대 5MB)"""
        key = f"permissions:{user_id}"
        return await self.get(key)
    
    async def set_permissions(self, user_id: str, data: dict) -> bool:
        """권한 캐시 저장 (TTL: 15분)"""
        key = f"permissions:{user_id}"
        return await self.set(
            key,
            data,
            ttl_seconds=settings.CACHE_TTL_PERMISSIONS,
            max_size_bytes=5 * 1024 * 1024  # 5MB
        )
    
    async def get_tool_result(self, cache_key: str) -> Optional[Any]:
        """도구 결과 캐시 조회 (TTL: 5분, 최대 50MB)"""
        key = f"tool_result:{cache_key}"
        return await self.get(key)
    
    async def set_tool_result(self, cache_key: str, data: Any) -> bool:
        """도구 결과 캐시 저장 (TTL: 5분)"""
        key = f"tool_result:{cache_key}"
        return await self.set(
            key,
            data,
            ttl_seconds=settings.CACHE_TTL_TOOL_RESULT,
            max_size_bytes=50 * 1024 * 1024  # 50MB
        )
    
    async def get_model_response(self, cache_key: str) -> Optional[Any]:
        """모델 응답 캐시 조회 (TTL: 1시간, 최대 100MB)"""
        key = f"model_response:{cache_key}"
        return await self.get(key)
    
    async def set_model_response(self, cache_key: str, data: Any) -> bool:
        """모델 응답 캐시 저장 (TTL: 1시간)"""
        key = f"model_response:{cache_key}"
        return await self.set(
            key,
            data,
            ttl_seconds=settings.CACHE_TTL_MODEL_RESPONSE,
            max_size_bytes=100 * 1024 * 1024  # 100MB
        )
    
    async def invalidate_user_sessions(self, user_id: str) -> int:
        """사용자 세션 무효화 (로그아웃/비밀번호 변경 시)"""
        await self.connect()
        pattern = f"session:*:{user_id}"
        keys = await self._redis.keys(pattern)
        if keys:
            return await self._redis.delete(*keys)
        return 0
    
    async def invalidate_role_cache(self, role: str) -> int:
        """역할 캐시 무효화"""
        await self.connect()
        pattern = f"permissions:*:{role}"
        keys = await self._redis.keys(pattern)
        if keys:
            return await self._redis.delete(*keys)
        return 0


# 전역 Redis 캐시 인스턴스
redis_client = RedisCache()
