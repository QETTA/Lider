"""
LIDER Tool Gateway
내부 도구 통합 및 실행 관리
"""
from typing import Dict, Any, List, Optional, Callable, Awaitable
from dataclasses import dataclass
from enum import Enum
import structlog
import json
import hashlib

from core.redis_cache import redis_client
from core.config import settings

logger = structlog.get_logger()


class ToolCategory(str, Enum):
    """도구 카테고리"""
    READ = "read"
    WRITE = "write"
    SEARCH = "search"
    ANALYZE = "analyze"


class ToolPermission(str, Enum):
    """도구 권한 레벨"""
    PUBLIC = "public"
    AUTHENTICATED = "authenticated"
    ADMIN = "admin"
    SYSTEM = "system"


@dataclass
class ToolResult:
    """도구 실행 결과"""
    success: bool
    data: Any
    execution_time_ms: int
    error_message: Optional[str] = None
    cached: bool = False


@dataclass
class ToolDefinition:
    """도구 정의"""
    name: str
    category: ToolCategory
    permission: ToolPermission
    description: str
    parameters: Dict[str, Any]
    handler: Callable[..., Awaitable[ToolResult]]
    cache_enabled: bool = True
    cache_ttl_seconds: int = 300  # 5분


class ToolGateway:
    """도통 게이트웨이 - 내부 도구 레지스트리 및 실행"""
    
    def __init__(self):
        self._tools: Dict[str, ToolDefinition] = {}
        self._register_default_tools()
    
    def _register_default_tools(self):
        """기본 도구 등록"""
        # 내부 검색 도구
        self.register(ToolDefinition(
            name="internal_search",
            category=ToolCategory.SEARCH,
            permission=ToolPermission.AUTHENTICATED,
            description="내부 문서/지식베이스 검색",
            parameters={
                "query": {"type": "string", "required": True},
                "limit": {"type": "integer", "default": 10},
                "filters": {"type": "object", "default": {}}
            },
            handler=self._handle_internal_search,
            cache_enabled=True,
            cache_ttl_seconds=300
        ))
        
        # CRM 조회 도구
        self.register(ToolDefinition(
            name="crm_lookup",
            category=ToolCategory.READ,
            permission=ToolPermission.AUTHENTICATED,
            description="CRM 고객 정보 조회",
            parameters={
                "customer_id": {"type": "string", "required": False},
                "email": {"type": "string", "required": False},
                "fields": {"type": "array", "default": ["name", "email", "phone"]}
            },
            handler=self._handle_crm_lookup,
            cache_enabled=True,
            cache_ttl_seconds=900  # 15분
        ))
        
        # 티켓 조회 도구
        self.register(ToolDefinition(
            name="ticket_read",
            category=ToolCategory.READ,
            permission=ToolPermission.AUTHENTICATED,
            description="지원 티켓 정보 조회",
            parameters={
                "ticket_id": {"type": "string", "required": True},
                "include_history": {"type": "boolean", "default": False}
            },
            handler=self._handle_ticket_read,
            cache_enabled=True,
            cache_ttl_seconds=300
        ))
        
        # 문서 가져오기 도구
        self.register(ToolDefinition(
            name="doc_fetch",
            category=ToolCategory.READ,
            permission=ToolPermission.AUTHENTICATED,
            description="문서 콘텐츠 가져오기",
            parameters={
                "doc_id": {"type": "string", "required": True},
                "format": {"type": "string", "enum": ["text", "markdown", "html"], "default": "text"}
            },
            handler=self._handle_doc_fetch,
            cache_enabled=True,
            cache_ttl_seconds=600  # 10분
        ))
        
        # 권한 검사 도구
        self.register(ToolDefinition(
            name="permission_check",
            category=ToolCategory.READ,
            permission=ToolPermission.AUTHENTICATED,
            description="사용자 권한 검사",
            parameters={
                "user_id": {"type": "string", "required": True},
                "resource": {"type": "string", "required": True},
                "action": {"type": "string", "required": True}
            },
            handler=self._handle_permission_check,
            cache_enabled=True,
            cache_ttl_seconds=900  # 15분
        ))
        
        # 티켓 업데이트 도구 (쓰기)
        self.register(ToolDefinition(
            name="ticket_update",
            category=ToolCategory.WRITE,
            permission=ToolPermission.AUTHENTICATED,
            description="티켓 상태 업데이트",
            parameters={
                "ticket_id": {"type": "string", "required": True},
                "status": {"type": "string", "enum": ["open", "pending", "solved", "closed"]},
                "comment": {"type": "string", "required": False}
            },
            handler=self._handle_ticket_update,
            cache_enabled=False  # 쓰기 작업은 캐시하지 않음
        ))
        
        # CRM 업데이트 도구 (쓰기)
        self.register(ToolDefinition(
            name="crm_update",
            category=ToolCategory.WRITE,
            permission=ToolPermission.AUTHENTICATED,
            description="CRM 고객 정보 업데이트",
            parameters={
                "customer_id": {"type": "string", "required": True},
                "fields": {"type": "object", "required": True}
            },
            handler=self._handle_crm_update,
            cache_enabled=False
        ))
    
    def register(self, tool: ToolDefinition):
        """도구 등록"""
        self._tools[tool.name] = tool
        logger.info("tool_registered", name=tool.name, category=tool.category.value)
    
    def get_tool(self, name: str) -> Optional[ToolDefinition]:
        """도구 조회"""
        return self._tools.get(name)
    
    def list_tools(
        self,
        category: Optional[ToolCategory] = None,
        permission: Optional[ToolPermission] = None
    ) -> List[ToolDefinition]:
        """도구 목록 조회 (필터링 가능)"""
        tools = list(self._tools.values())
        
        if category:
            tools = [t for t in tools if t.category == category]
        
        if permission:
            tools = [t for t in tools if t.permission == permission]
        
        return tools
    
    def _generate_cache_key(self, tool_name: str, params: Dict[str, Any]) -> str:
        """캐시 키 생성"""
        param_str = json.dumps(params, sort_keys=True)
        hash_str = hashlib.md5(f"{tool_name}:{param_str}".encode()).hexdigest()[:16]
        return hash_str
    
    async def execute(
        self,
        tool_name: str,
        parameters: Dict[str, Any],
        user_id: str,
        org_id: Optional[str] = None
    ) -> ToolResult:
        """
        도구 실행
        
        1. 권한 검사
        2. 캐시 확인
        3. 실제 실행
        4. 결과 캐싱
        """
        import time
        start_time = time.time()
        
        tool = self.get_tool(tool_name)
        if not tool:
            return ToolResult(
                success=False,
                data=None,
                execution_time_ms=0,
                error_message=f"Tool not found: {tool_name}"
            )
        
        # 권한 검사
        if not await self._check_permission(tool.permission, user_id):
            return ToolResult(
                success=False,
                data=None,
                execution_time_ms=0,
                error_message=f"Permission denied for tool: {tool_name}"
            )
        
        # 캐시 확인
        cached_result = None
        if tool.cache_enabled:
            cache_key = self._generate_cache_key(tool_name, parameters)
            cached_result = await redis_client.get_tool_result(cache_key)
            if cached_result:
                execution_time = int((time.time() - start_time) * 1000)
                logger.info(
                    "tool_cache_hit",
                    tool=tool_name,
                    user_id=user_id,
                    cache_key=cache_key
                )
                return ToolResult(
                    success=True,
                    data=cached_result,
                    execution_time_ms=execution_time,
                    cached=True
                )
        
        # 실제 실행
        try:
            result = await tool.handler(parameters, user_id, org_id)
            execution_time = int((time.time() - start_time) * 1000)
            
            # 결과 캐싱
            if tool.cache_enabled and result.success:
                cache_key = self._generate_cache_key(tool_name, parameters)
                await redis_client.set_tool_result(
                    cache_key,
                    {
                        "data": result.data,
                        "cached_at": time.time()
                    },
                    ttl_seconds=tool.cache_ttl_seconds
                )
            
            logger.info(
                "tool_executed",
                tool=tool_name,
                user_id=user_id,
                success=result.success,
                execution_time_ms=execution_time,
                cached=False
            )
            
            return ToolResult(
                success=result.success,
                data=result.data,
                execution_time_ms=execution_time,
                error_message=result.error_message
            )
            
        except Exception as e:
            execution_time = int((time.time() - start_time) * 1000)
            logger.error(
                "tool_execution_failed",
                tool=tool_name,
                user_id=user_id,
                error=str(e)
            )
            return ToolResult(
                success=False,
                data=None,
                execution_time_ms=execution_time,
                error_message=str(e)
            )
    
    async def _check_permission(
        self,
        required_permission: ToolPermission,
        user_id: str
    ) -> bool:
        """사용자 권한 검사"""
        # TODO: 실제 권한 검사 로직 구현
        # 현재는 인증된 사용자 모두 허용
        return True
    
    # ============== 도구 핸들러 구현 ==============
    
    async def _handle_internal_search(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """내부 검색 처리"""
        query = params.get("query", "")
        limit = params.get("limit", 10)
        
        # TODO: 실제 검색 엔진 연동
        mock_results = [
            {
                "id": f"doc_{i}",
                "title": f"관련 문서 {i}",
                "snippet": f"검색어 '{query}'에 대한 샘플 결과입니다.",
                "score": 0.95 - (i * 0.1),
                "source": "knowledge_base"
            }
            for i in range(min(limit, 5))
        ]
        
        return ToolResult(success=True, data=mock_results, execution_time_ms=100)
    
    async def _handle_crm_lookup(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """CRM 조회 처리"""
        customer_id = params.get("customer_id")
        email = params.get("email")
        
        # TODO: 실제 CRM API 연동
        mock_customer = {
            "id": customer_id or "cust_12345",
            "name": "홍길동",
            "email": email or "hong@example.com",
            "phone": "010-1234-5678",
            "company": "주식회사 예시",
            "tier": "enterprise",
            "last_contact": "2024-03-20"
        }
        
        return ToolResult(success=True, data=mock_customer, execution_time_ms=150)
    
    async def _handle_ticket_read(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """티켓 조회 처리"""
        ticket_id = params.get("ticket_id")
        
        # TODO: 실제 티켓 시스템 연동
        mock_ticket = {
            "id": ticket_id,
            "subject": "서비스 문의",
            "status": "open",
            "priority": "high",
            "requester": "customer@example.com",
            "assignee": "agent@company.com",
            "created_at": "2024-03-20T10:00:00Z",
            "description": "서비스 사용 중 문제가 발생했습니다..."
        }
        
        return ToolResult(success=True, data=mock_ticket, execution_time_ms=80)
    
    async def _handle_doc_fetch(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """문서 가져오기 처리"""
        doc_id = params.get("doc_id")
        format_type = params.get("format", "text")
        
        # TODO: 실제 문서 저장소 연동
        mock_doc = {
            "id": doc_id,
            "title": "샘플 문서",
            "content": f"문서 {doc_id}의 콘텐츠입니다. (형식: {format_type})",
            "format": format_type,
            "metadata": {
                "author": "시스템",
                "created_at": "2024-03-15"
            }
        }
        
        return ToolResult(success=True, data=mock_doc, execution_time_ms=120)
    
    async def _handle_permission_check(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """권한 검사 처리"""
        target_user = params.get("user_id")
        resource = params.get("resource")
        action = params.get("action")
        
        # TODO: 실제 권한 시스템 연동
        has_permission = True  # Mock
        
        return ToolResult(
            success=True,
            data={
                "user_id": target_user,
                "resource": resource,
                "action": action,
                "granted": has_permission
            },
            execution_time_ms=50
        )
    
    async def _handle_ticket_update(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """티켓 업데이트 처리 (쓰기 작업)"""
        ticket_id = params.get("ticket_id")
        status = params.get("status")
        comment = params.get("comment")
        
        # TODO: 실제 티켓 시스템 업데이트
        result = {
            "ticket_id": ticket_id,
            "updated_fields": {"status": status},
            "comment_added": bool(comment),
            "updated_by": user_id,
            "updated_at": "2024-03-24T12:00:00Z"
        }
        
        return ToolResult(success=True, data=result, execution_time_ms=200)
    
    async def _handle_crm_update(
        self,
        params: Dict[str, Any],
        user_id: str,
        org_id: Optional[str]
    ) -> ToolResult:
        """CRM 업데이트 처리 (쓰기 작업)"""
        customer_id = params.get("customer_id")
        fields = params.get("fields", {})
        
        # TODO: 실제 CRM 업데이트
        result = {
            "customer_id": customer_id,
            "updated_fields": list(fields.keys()),
            "updated_by": user_id,
            "updated_at": "2024-03-24T12:00:00Z"
        }
        
        return ToolResult(success=True, data=result, execution_time_ms=180)


# 전역 도구 게이트웨이 인스턴스
tool_gateway = ToolGateway()
