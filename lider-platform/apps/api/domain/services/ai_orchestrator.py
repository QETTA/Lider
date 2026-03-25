"""
AI 오케스트레이터 서비스
Clean Architecture - 도메인 레이어
비즈니스 로직 중심의 AI 요청 처리
"""
from dataclasses import dataclass
from typing import Dict, Any, List, Optional
import time

from domain.models.ai_request import AIRequest, AIResponse, RouteDecision, ToolResult
from infrastructure.config.model_config import (
    get_model_spec, calculate_estimated_cost, get_latency_estimate,
    FALLBACK_CHAIN, ModelPriority
)
from infrastructure.ai_providers.factory import get_provider_for_model
from infrastructure.cache.redis_client import cache_manager


@dataclass
class OrchestrationResult:
    """오케스트레이션 결과"""
    response: AIResponse
    model_used: str
    api_model_name: str
    fallback_used: bool
    latency_ms: int
    cost_usd: float
    token_usage: Dict[str, int]
    request_id: str


class AIOrchestrator:
    """AI 요청 오케스트레이터"""
    
    def __init__(self):
        self._tool_gateway = None  # 의존성 주입용
    
    def set_tool_gateway(self, tool_gateway):
        """툴 게이트웨이 설정"""
        self._tool_gateway = tool_gateway
    
    async def orchestrate(
        self,
        request: AIRequest,
        request_id: str
    ) -> OrchestrationResult:
        """
        AI 요청 오케스트레이션
        1. 모델 라우팅
        2. 툴 실행
        3. AI 생성
        4. 응답 구성
        """
        start_time = time.time()
        
        # 1. 모델 라우팅 결정
        route_decision = self._route_request(request)
        
        # 2. 툴 실행 (필요시)
        tool_results = await self._execute_tools(request)
        
        # 3. AI 생성 (Fallback 포함)
        ai_result, model_used, api_model_name, fallback_used = await self._generate_with_fallback(
            request=request,
            route_decision=route_decision,
            tool_results=tool_results
        )
        
        # 4. 응답 구성
        response = self._compose_response(ai_result, tool_results)
        
        latency_ms = int((time.time() - start_time) * 1000)
        
        return OrchestrationResult(
            response=response,
            model_used=model_used,
            api_model_name=api_model_name,
            fallback_used=fallback_used,
            latency_ms=latency_ms,
            cost_usd=route_decision.estimated_cost_usd,
            token_usage=ai_result.get("usage", {}),
            request_id=request_id
        )
    
    def _route_request(self, request: AIRequest) -> RouteDecision:
        """요청 라우팅 결정"""
        # 라우팅 규칙 적용
        if request.task_type.value == "extract":
            selected = "kimi-k2.5"
            reason = "Vision 모델 필요 (문서/이미지 추출)"
        elif request.needs_multi_tool():
            selected = "kimi-k2-thinking"
            reason = "멀티툴 호출 및 계획 수립 필요"
        elif request.is_customer_facing():
            selected = "kimi-k2-0905"
            reason = "고객 대응용 빠른 응답 모델"
        else:
            selected = "kimi-k2-0905"
            reason = "기본 범용 모델"
        
        # 비용 및 레이턴시 계산
        spec = get_model_spec(selected)
        estimated_tokens = 1000  # 기본값
        cost = calculate_estimated_cost(selected, estimated_tokens)
        latency = get_latency_estimate(selected)
        
        # Fallback 체인
        fallback = [m for m in FALLBACK_CHAIN if m != selected]
        
        return RouteDecision(
            internal_model=selected,
            api_model_name=spec.api_name if spec else selected,
            priority=ModelPriority.PRIMARY.value,
            reason=reason,
            estimated_cost_usd=cost,
            estimated_latency_ms=latency,
            fallback_chain=fallback
        )
    
    async def _execute_tools(self, request: AIRequest) -> List[ToolResult]:
        """툴 실행"""
        if not request.allowed_tools or not self._tool_gateway:
            return []
        
        results = []
        for tool_name in request.allowed_tools[:3]:  # 최대 3개
            try:
                result = await self._tool_gateway.execute(
                    tool_name=tool_name,
                    parameters={"query": request.message.text, "user_id": request.user_id},
                    user_id=request.user_id,
                    org_id=request.org_id
                )
                results.append(ToolResult(
                    tool_name=tool_name,
                    result=result.data if result.success else None,
                    execution_time_ms=result.execution_time_ms,
                    success=result.success,
                    error_message=result.error_message if not result.success else None
                ))
            except Exception as e:
                results.append(ToolResult(
                    tool_name=tool_name,
                    result=None,
                    execution_time_ms=0,
                    success=False,
                    error_message=str(e)
                ))
        
        return results
    
    async def _generate_with_fallback(
        self,
        request: AIRequest,
        route_decision: RouteDecision,
        tool_results: List[ToolResult]
    ) -> tuple:
        """AI 생성 (Fallback 포함)"""
        messages = self._build_messages(request, tool_results)
        
        # 1차 시도: 주요 모델
        try:
            provider = get_provider_for_model(route_decision.internal_model)
            result = await provider.generate(
                messages=messages,
                model=route_decision.internal_model,
                temperature=0.7,
                max_tokens=2000
            )
            return {
                "content": result.content,
                "usage": result.usage,
                "finish_reason": result.finish_reason
            }, route_decision.internal_model, route_decision.api_model_name, False
        except Exception as e:
            # Fallback 시도
            for fallback_model in route_decision.fallback_chain:
                try:
                    provider = get_provider_for_model(fallback_model)
                    spec = get_model_spec(fallback_model)
                    result = await provider.generate(
                        messages=messages,
                        model=fallback_model,
                        temperature=0.7,
                        max_tokens=2000
                    )
                    return {
                        "content": result.content,
                        "usage": result.usage,
                        "finish_reason": result.finish_reason
                    }, fallback_model, spec.api_name if spec else fallback_model, True
                except Exception:
                    continue
            
            # 모든 모델 실패
            raise e
    
    def _build_messages(
        self,
        request: AIRequest,
        tool_results: List[ToolResult]
    ) -> List[Dict[str, str]]:
        """메시지 구성"""
        system_prompt = self._get_system_prompt(request.locale)
        
        # 툴 결과 컨텍스트 추가
        if tool_results:
            context = self._format_tool_context(tool_results)
            system_prompt += f"\n\n[도구 조회 결과]\n{context}"
        
        return [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message.text}
        ]
    
    def _get_system_prompt(self, locale: str) -> str:
        """시스템 프롬프트 생성"""
        if locale.startswith("ko"):
            return """당신은 LIDER AI 업무 어시스턴트입니다. 
사용자의 질문에 대해 다음 원칙을 따르세요:
1. 사실 기반 정보를 제공하고 출처를 인용하세요
2. 불확실한 정보는 명확히 표시하세요
3. 액션이 필요한 경우 추천 액션을 제시하세요
4. 간결하고 이해하기 쉽게 설명하세요"""
        else:
            return """You are the LIDER AI business assistant.
Please follow these principles:
1. Provide fact-based information with citations
2. Clearly indicate uncertain information
3. Suggest recommended actions when needed
4. Explain concisely and clearly"""
    
    def _format_tool_context(self, tool_results: List[ToolResult]) -> str:
        """툴 결과 포맷팅"""
        parts = []
        for result in tool_results:
            if result.success:
                parts.append(f"[{result.tool_name}]\n{str(result.result)[:500]}")
        return "\n\n".join(parts)
    
    def _compose_response(
        self,
        ai_result: Dict[str, Any],
        tool_results: List[ToolResult]
    ) -> AIResponse:
        """응답 구성"""
        content = ai_result.get("content", "")
        
        # JSON 파싱 시도
        parsed = self._parse_json_response(content)
        if parsed:
            return AIResponse(
                answer=parsed.get("answer", content),
                facts=parsed.get("facts", []),
                citations=parsed.get("citations", []),
                tool_results=tool_results if tool_results else None,
                uncertainties=parsed.get("uncertainties"),
                suggested_actions=parsed.get("suggested_actions")
            )
        
        # 기본 응답
        return AIResponse(
            answer=content,
            facts=[],
            citations=[],
            tool_results=tool_results if tool_results else None
        )
    
    def _parse_json_response(self, content: str) -> Optional[Dict]:
        """JSON 응답 파싱"""
        import json
        try:
            if content.strip().startswith("{"):
                return json.loads(content)
        except json.JSONDecodeError:
            pass
        return None
