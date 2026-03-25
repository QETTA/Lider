"""
Assist API Routes (Refactored)
Clean Architecture - 인터페이스 레이어
/v1/assist - AI 업무 어시스턴트 엔드포인트 (슬림 버전)
"""
import time
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.database.engine import get_db
from infrastructure.database.models.request_log import RequestLog
from domain.models.ai_request import AIRequest, Message, RiskTier, TaskType
from domain.services.ai_orchestrator import AIOrchestrator
from schemas.assist import AssistRequest, AssistResponse
from core.middleware import PIIRedactionMiddleware

import structlog
logger = structlog.get_logger()

router = APIRouter()
ai_orchestrator = AIOrchestrator()


@router.post("/assist", response_model=dict, tags=["Assist"])
async def assist(request: AssistRequest, db: AsyncSession = Depends(get_db)):
    """
    AI 업무 어시스턴트 API (리팩토링 버전)
    
    - 대화형 질문 응답
    - 내부 문서/CRM 검색 통합
    - 멀티툴 호출 지원
    """
    start_time = time.time()
    request_id = f"req_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{request.user_id[:8]}"
    
    try:
        # 1. 요청 객체 생성
        domain_request = AIRequest(
            user_id=request.user_id,
            org_id=request.org_id,
            message=Message(text=request.message.text, role="user"),
            task_type=TaskType.ASSIST,
            allowed_tools=request.allowed_tools,
            risk_tier=RiskTier(request.risk_tier.value),
            locale=request.locale,
            session_id=request.session_id
        )
        
        # PII 마스킹
        domain_request.message.text = PIIRedactionMiddleware.redact_pii(
            domain_request.message.text
        )
        
        logger.info(
            "assist_request_v2",
            request_id=request_id,
            user_id=request.user_id,
            tools=request.allowed_tools
        )
        
        # 2. 오케스트레이션 실행 (비즈니스 로직)
        result = await ai_orchestrator.orchestrate(
            request=domain_request,
            request_id=request_id
        )
        
        # 3. 로깅
        latency_ms = int((time.time() - start_time) * 1000)
        request_log = RequestLog(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            endpoint="assist",
            method="POST",
            model_used=result.model_used,
            api_model_name=result.api_model_name,
            fallback_used=result.fallback_used,
            prompt_tokens=result.token_usage.get("prompt_tokens", 0),
            completion_tokens=result.token_usage.get("completion_tokens", 0),
            total_tokens=result.token_usage.get("total_tokens", 0),
            estimated_cost_usd=result.cost_usd,
            latency_ms=latency_ms
        )
        db.add(request_log)
        await db.commit()
        
        # 4. 응답 반환
        return {
            "success": True,
            "data": {
                "answer": result.response.answer,
                "facts": result.response.facts,
                "citations": [
                    {"source": c.source, "title": c.title, "url": c.url}
                    for c in result.response.citations
                ] if result.response.citations else [],
                "tool_calls": [
                    {
                        "tool_name": tr.tool_name,
                        "result": tr.result,
                        "execution_time_ms": tr.execution_time_ms
                    }
                    for tr in result.response.tool_results
                ] if result.response.tool_results else None,
                "uncertainties": result.response.uncertainties,
                "suggested_actions": [
                    {
                        "action_type": sa.action_type,
                        "description": sa.description,
                        "confidence": sa.confidence
                    }
                    for sa in result.response.suggested_actions
                ] if result.response.suggested_actions else None
            },
            "meta": {
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat(),
                "latency_ms": latency_ms,
                "model_used": result.model_used,
                "api_model_name": result.api_model_name,
                "fallback_used": result.fallback_used,
                "token_usage": result.token_usage,
                "cost": {"estimated_cost_usd": round(result.cost_usd, 6)}
            }
        }
        
    except Exception as e:
        logger.error("assist_error_v2", request_id=request_id, error=str(e))
        
        # 에러 로깅
        latency_ms = int((time.time() - start_time) * 1000)
        request_log = RequestLog(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            endpoint="assist",
            method="POST",
            error_code="MODEL_ERROR",
            latency_ms=latency_ms
        )
        db.add(request_log)
        await db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": {
                    "code": "MODEL_ERROR",
                    "message": "AI 모델 응답 생성 중 오류가 발생했습니다."
                },
                "meta": {
                    "request_id": request_id,
                    "timestamp": datetime.utcnow().isoformat()
                }
            }
        )
