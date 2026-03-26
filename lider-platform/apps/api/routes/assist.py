"""
Assist API Routes
/v1/assist - AI 업무 어시스턴트 엔드포인트
"""
import time
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any

from core.database import get_db, RequestLog
from core.redis_cache import redis_client
from core.middleware import PIIRedactionMiddleware
from core.response import ResponseBuilder
from core.exceptions import (
    ModelException, ValidationException, DatabaseException,
    ErrorCode, raise_model_error
)
from schemas.assist import AssistRequest, AssistResponseData, ToolCall
from services.model_router import model_router, TaskType
from services.providers import get_provider_for_model
from services.tool_gateway import tool_gateway
from services.validator import validator_pipeline
from services.evaluator import response_evaluator

import structlog
logger = structlog.get_logger()

router = APIRouter()


@router.post("/assist", response_model=dict, tags=["Assist"])
async def assist(request: AssistRequest, db: AsyncSession = Depends(get_db)):
    """
    AI 업무 어시스턴트 API
    
    - 대화형 질문 응답
    - 내부 문서/CRM 검색 통합
    - 멀티툴 호출 지원
    """
    start_time = time.time()
    request_id = f"req_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{request.user_id[:8]}"
    
    # PII 마스킹
    safe_message = PIIRedactionMiddleware.redact_pii(request.message.text)
    
    try:
        # 1. 모델 라우팅 결정
        route_decision = await model_router.route(
            task_type=TaskType.ASSIST,
            has_attachments=False,
            needs_multi_tool=request.allowed_tools and len(request.allowed_tools) > 1,
            customer_facing=request.risk_tier.value == "low",
            estimated_tokens=1000
        )
        
        logger.info(
            "assist_request",
            request_id=request_id,
            user_id=request.user_id,
            model=route_decision.internal_model,
            tools=request.allowed_tools
        )
        
        # 2. 도구 호출 (필요시)
        tool_results = []
        if request.allowed_tools:
            for tool_name in request.allowed_tools[:3]:  # 최대 3개 도구
                result = await tool_gateway.execute(
                    tool_name=tool_name,
                    parameters={"query": safe_message, "user_id": request.user_id},
                    user_id=request.user_id,
                    org_id=request.org_id
                )
                if result.success:
                    tool_results.append({
                        "tool_name": tool_name,
                        "result": result.data,
                        "execution_time_ms": result.execution_time_ms
                    })
        
        # 3. AI 모델 호출
        provider = get_provider_for_model(route_decision.internal_model)
        
        messages = [
            {"role": "system", "content": _get_assist_system_prompt(request.locale)},
            {"role": "user", "content": safe_message}
        ]
        
        # 도구 결과 컨텍스트 추가
        if tool_results:
            context = _format_tool_context(tool_results)
            messages[0]["content"] += f"\n\n[도구 조회 결과]\n{context}"
        
        try:
            ai_response = await provider.generate(
                messages=messages,
                model=route_decision.internal_model,
                temperature=0.7,
                max_tokens=2000
            )
            
            model_used = route_decision.internal_model
            api_model_name = ai_response.get("api_model_name", route_decision.api_model_name)
            fallback_used = False
            
        except Exception as e:
            logger.error("primary_model_failed", error=str(e), model=route_decision.internal_model)
            
            # Fallback 모델로 재시도
            fallback = await model_router.get_fallback_model(route_decision.internal_model, attempt=1)
            if fallback:
                provider = get_provider_for_model(fallback.internal_model)
                ai_response = await provider.generate(
                    messages=messages,
                    model=fallback.internal_model,
                    temperature=0.7,
                    max_tokens=2000
                )
                model_used = fallback.internal_model
                api_model_name = fallback.api_model_name
                fallback_used = True
            else:
                raise
        
        # 4. 응답 구성
        content = ai_response.get("content", "")
        
        # 응답 파싱 (JSON 또는 자연어)
        parsed = _parse_assist_response(content, tool_results)
        
        # 5. 검증
        validation_results = await validator_pipeline.validate(
            data=parsed,
            context={"endpoint": "assist", "user_id": request.user_id}
        )
        
        # 6. 평가
        evaluation = await response_evaluator.evaluate_response(
            request_id=request_id,
            response_data={
                "success": True,
                "data": parsed,
                "meta": {}
            },
            request_context={"endpoint": "assist", "has_tools": bool(tool_results)}
        )
        
        # 7. 로깅
        latency_ms = int((time.time() - start_time) * 1000)
        usage = ai_response.get("usage", {})
        
        request_log = RequestLog(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            endpoint="assist",
            method="POST",
            model_used=model_used,
            api_model_name=api_model_name,
            fallback_used=fallback_used,
            prompt_tokens=usage.get("prompt_tokens", 0),
            completion_tokens=usage.get("completion_tokens", 0),
            total_tokens=usage.get("total_tokens", 0),
            estimated_cost_usd=route_decision.estimated_cost_usd,
            latency_ms=latency_ms,
            validation_result=validator_pipeline.get_summary(validation_results)
        )
        db.add(request_log)
        await db.commit()
        
        # 8. 응답 반환
        response_data = AssistResponseData(
            answer=parsed.get("answer", content),
            facts=parsed.get("facts", []),
            citations=parsed.get("citations", []),
            tool_calls=[ToolCall(**t) for t in parsed.get("tool_calls", [])] if parsed.get("tool_calls") else None,
            uncertainties=parsed.get("uncertainties"),
            suggested_actions=parsed.get("suggested_actions")
        )
        
        return {
            "success": True,
            "data": response_data.model_dump(exclude_none=True),
            "meta": {
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat(),
                "latency_ms": latency_ms,
                "model_used": model_used,
                "api_model_name": api_model_name,
                "fallback_used": fallback_used,
                "token_usage": {
                    "prompt_tokens": usage.get("prompt_tokens", 0),
                    "completion_tokens": usage.get("completion_tokens", 0),
                    "total_tokens": usage.get("total_tokens", 0)
                },
                "cost": {
                    "estimated_cost_usd": round(route_decision.estimated_cost_usd, 6)
                },
                "evaluation": {
                    "score": round(evaluation.overall_score, 1),
                    "verdict": evaluation.verdict.value
                }
            }
        }
        
    except Exception as e:
        logger.error("assist_error", request_id=request_id, error=str(e))
        
        # 에러 로깅
        request_log = RequestLog(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            endpoint="assist",
            method="POST",
            error_code="MODEL_ERROR",
            latency_ms=int((time.time() - start_time) * 1000)
        )
        db.add(request_log)
        await db.commit()
        
        # 표준화된 예외 발생
        raise DatabaseException(
            message="AI 모델 응답 생성 중 오류가 발생했습니다",
            details={"original_error": str(e), "error_type": type(e).__name__},
            request_id=request_id
        )


def _get_assist_system_prompt(locale: str = "ko-KR") -> str:
    """Assist 시스템 프롬프트 생성"""
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


def _format_tool_context(tool_results: List[Dict]) -> str:
    """도구 결과를 컨텍스트로 포맷"""
    context_parts = []
    for result in tool_results:
        tool_name = result["tool_name"]
        data = result["result"]
        context_parts.append(f"[{tool_name}]\n{str(data)[:500]}")  # 길이 제한
    return "\n\n".join(context_parts)


def _parse_assist_response(content: str, tool_results: List[Dict]) -> Dict:
    """Assist 응답 파싱"""
    import json
    
    # JSON 형식 응답 시도
    try:
        if content.strip().startswith("{"):
            return json.loads(content)
    except json.JSONDecodeError:
        pass
    
    # 자연어 응답 기본 구조
    return {
        "answer": content,
        "facts": [],
        "citations": [],
        "tool_calls": [
            {
                "tool_name": t["tool_name"],
                "parameters": {},
                "result": t["result"],
                "execution_time_ms": t["execution_time_ms"]
            }
            for t in tool_results
        ] if tool_results else None,
        "uncertainties": None,
        "suggested_actions": None
    }
