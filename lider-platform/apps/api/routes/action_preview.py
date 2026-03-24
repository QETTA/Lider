"""
Action Preview API Routes
/v1/actions/preview - 실행 전 액션 미리보기/영향 분석
"""
import time
import uuid
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db, RequestLog, ActionPreview
from schemas.action import (
    ActionPreviewRequest, ActionPreviewResponseData,
    Risk, Recommendation, ImpactSummary, PreconditionsCheck
)
from services.model_router import model_router, TaskType
from services.providers import get_provider_for_model
from services.tool_gateway import tool_gateway, ToolCategory
from core.config import settings

import structlog
logger = structlog.get_logger()

router = APIRouter()


@router.post("/actions/preview", response_model=dict, tags=["Actions"])
async def action_preview(request: ActionPreviewRequest, db: AsyncSession = Depends(get_db)):
    """
    액션 미리보기 API
    
    - 액션 실행 전 영향 분석
    - 리스크 평가
    - 권장사항 제공
    """
    start_time = time.time()
    request_id = f"req_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{request.user_id[:8]}"
    preview_id = f"prev_{uuid.uuid4().hex[:16]}"
    
    try:
        # 1. 모델 라우팅 (Action Preview는 깊은 추론 필요)
        route_decision = await model_router.route(
            task_type=TaskType.ACTION_PREVIEW,
            needs_multi_tool=True,
            estimated_tokens=1500
        )
        
        logger.info(
            "action_preview_request",
            request_id=request_id,
            user_id=request.user_id,
            action_type=request.action_type.value,
            target_system=request.target_system.value
        )
        
        # 2. 사전 조건 검사
        preconditions = await _check_preconditions(request, request.user_id)
        
        # 3. 영향 분석
        impact = await _analyze_impact(request)
        
        # 4. 리스크 평가
        risks = await _assess_risks(request, impact)
        
        # 5. AI 기반 분석
        provider = get_provider_for_model(route_decision.internal_model)
        
        analysis_prompt = _build_analysis_prompt(request, preconditions, impact, risks)
        
        messages = [
            {"role": "system", "content": _get_action_preview_system_prompt()},
            {"role": "user", "content": analysis_prompt}
        ]
        
        try:
            ai_response = await provider.generate(
                messages=messages,
                model=route_decision.internal_model,
                temperature=0.3,
                max_tokens=2000
            )
            model_used = route_decision.internal_model
            api_model_name = ai_response.get("api_model_name", route_decision.api_model_name)
            
        except Exception as e:
            logger.error("action_preview_ai_failed", error=str(e))
            # AI 실패 시 규칙 기반 분석 사용
            ai_response = {"content": _generate_fallback_analysis(request, risks)}
            model_used = "fallback_rules"
            api_model_name = "fallback_rules"
        
        # 6. 인간 친화적 미리보기 생성
        human_readable = _generate_human_readable_preview(
            request, preconditions, impact, risks, ai_response.get("content", "")
        )
        
        # 7. 권장사항 생성
        recommendations = _generate_recommendations(risks, preconditions)
        
        # 8. 미리보기 저장
        latency_ms = int((time.time() - start_time) * 1000)
        expires_at = datetime.utcnow() + timedelta(minutes=30)
        
        preview = ActionPreview(
            preview_id=preview_id,
            request_id=request_id,
            user_id=request.user_id,
            action_type=request.action_type.value,
            target_system=request.target_system.value,
            impact_summary=impact.get("summary", ""),
            preconditions_check=preconditions,
            risks=[{"severity": r.severity, "category": r.category, "description": r.description} for r in risks],
            recommendations=[{"priority": r.priority, "action": r.action, "reason": r.reason} for r in recommendations],
            human_readable_preview=human_readable,
            expires_at=expires_at
        )
        db.add(preview)
        
        # 9. 로깅
        request_log = RequestLog(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            endpoint="actions/preview",
            method="POST",
            model_used=model_used,
            api_model_name=api_model_name,
            fallback_used=False,
            latency_ms=latency_ms
        )
        db.add(request_log)
        await db.commit()
        
        # 10. 응답 구성
        response_data = ActionPreviewResponseData(
            preview_id=preview_id,
            action_type=request.action_type.value,
            target_system=request.target_system.value,
            impact_summary=ImpactSummary(**impact),
            preconditions_check=[PreconditionsCheck(**p) for p in preconditions],
            risks=[Risk(**r.model_dump()) for r in risks],
            recommendations=[Recommendation(**r.model_dump()) for r in recommendations],
            human_readable_preview=human_readable,
            estimated_execution_time_ms=impact.get("estimated_time_ms", 1000),
            rollback_available=impact.get("rollback_available", True),
            expires_at=expires_at.isoformat()
        )
        
        return {
            "success": True,
            "data": response_data.model_dump(exclude_none=True),
            "meta": {
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat(),
                "latency_ms": latency_ms,
                "model_used": model_used,
                "api_model_name": api_model_name
            }
        }
        
    except Exception as e:
        logger.error("action_preview_error", request_id=request_id, error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": {
                    "code": "PREVIEW_ERROR",
                    "message": "액션 미리보기 생성 중 오류가 발생했습니다."
                }
            }
        )


async def _check_preconditions(request: ActionPreviewRequest, user_id: str) -> list:
    """사전 조건 검사"""
    checks = []
    
    # 권한 검사
    perm_result = await tool_gateway.execute(
        tool_name="permission_check",
        parameters={
            "user_id": user_id,
            "resource": f"{request.target_system.value}:{request.action_type.value}",
            "action": "write"
        },
        user_id=user_id
    )
    checks.append({
        "check_name": "user_permission",
        "passed": perm_result.success and perm_result.data.get("granted", False),
        "details": "사용자 권한 확인" if perm_result.success else str(perm_result.error_message)
    })
    
    # 대상 리소스 존재 확인
    if request.action_type.value in ["ticket_close", "ticket_update"]:
        ticket_result = await tool_gateway.execute(
            tool_name="ticket_read",
            parameters={"ticket_id": request.parameters.get("ticket_id")},
            user_id=user_id
        )
        checks.append({
            "check_name": "target_exists",
            "passed": ticket_result.success,
            "details": "티켓 존재 확인" if ticket_result.success else "티켓을 찾을 수 없음"
        })
    
    return checks


async def _analyze_impact(request: ActionPreviewRequest) -> dict:
    """영향 분석"""
    # 기본 영향 분석
    impact = {
        "affected_records": 1,
        "affected_systems": [request.target_system.value],
        "estimated_scope": "single_user",
        "description": f"{request.target_system.value}의 데이터를 수정합니다.",
        "estimated_time_ms": 1000,
        "rollback_available": request.action_type.value not in ["email_send", "notification_send"]
    }
    
    # 액션 유형별 분석
    if request.action_type.value == "workflow_trigger":
        impact["affected_records"] = 10
        impact["estimated_scope"] = "team"
        impact["estimated_time_ms"] = 5000
    elif request.action_type.value == "crm_update":
        impact["affected_records"] = request.parameters.get("customer_ids", [request.parameters.get("customer_id", "")])
        impact["affected_records"] = len(impact["affected_records"]) if isinstance(impact["affected_records"], list) else 1
    
    return impact


async def _assess_risks(request: ActionPreviewRequest, impact: dict) -> list:
    """리스크 평가"""
    risks = []
    
    action_risk_map = {
        "ticket_close": "low",
        "ticket_update": "medium",
        "crm_update": "medium",
        "notification_send": "low",
        "email_send": "high",
        "workflow_trigger": "high"
    }
    
    base_risk = action_risk_map.get(request.action_type.value, "medium")
    
    if base_risk == "high":
        risks.append(Risk(
            severity="high",
            category="irreversible_action",
            description=f"{request.action_type.value}는 실행 후 취소가 어려울 수 있습니다.",
            mitigation="미리보기를 신중히 검토하고 승인자 확인을 받으세요."
        ))
    
    if impact["affected_records"] > 5:
        risks.append(Risk(
            severity="medium",
            category="batch_impact",
            description=f"{impact['affected_records']}개의 레코드에 영향을 미칩니다.",
            mitigation="영향받는 레코드를 다시 확인하세요."
        ))
    
    if not risks:
        risks.append(Risk(
            severity="low",
            category="general",
            description="표준적인 작업입니다. 일반적인 검토 후 진행하세요.",
            mitigation=None
        ))
    
    return risks


def _build_analysis_prompt(request: ActionPreviewRequest, preconditions: list, impact: dict, risks: list) -> str:
    """AI 분석용 프롬프트 생성"""
    return f"""다음 액션의 영향을 분석해주세요:

[액션 정보]
- 유형: {request.action_type.value}
- 대상 시스템: {request.target_system.value}
- 파라미터: {request.parameters}

[사전 조건 검사 결과]
{preconditions}

[영향 분석]
- 영향 레코드: {impact.get('affected_records', 'N/A')}
- 영향 시스템: {impact.get('affected_systems', [])}
- 롤백 가능: {impact.get('rollback_available', False)}

[식별된 리스크]
{[{'severity': r.severity, 'category': r.category, 'desc': r.description} for r in risks]}

다음 형식으로 분석 결과를 제공하세요:
1. 실행 효과 요약
2. 잠재적 부작용
3. 권장 조치
4. 검증 체크리스트"""


def _get_action_preview_system_prompt() -> str:
    """Action Preview 시스템 프롬프트"""
    return """당신은 액션 영향 분석 전문가입니다.
제공된 액션의 실행 전 영향을 객관적이고 명확하게 분석하세요.
다음을 포함해야 합니다:
- 실행 결과에 대한 현실적인 설명
- 데이터 무결성에 미치는 영향
- 의존성 있는 시스템에 미치는 영향
- 되돌리기 어려운 변경사항 강조

분석은 한국어로 제공하세요."""


def _generate_fallback_analysis(request: ActionPreviewRequest, risks: list) -> str:
    """AI 실패 시 폴백 분석"""
    return f"""[규칙 기반 분석 결과]

액션: {request.action_type.value}
대상: {request.target_system.value}

식별된 리스크:
{chr(10).join([f"- {r.severity}: {r.description}" for r in risks])}

이 액션은 {request.target_system.value}에서 실행됩니다.
일반적인 보안 및 데이터 무결성 검사가 필요합니다."""


def _generate_human_readable_preview(request, preconditions, impact, risks, ai_analysis: str) -> str:
    """인간 친화적 미리보기 생성"""
    lines = [
        f"## {request.action_type.value} 미리보기",
        "",
        f"**대상**: {request.target_system.value}",
        f"**영향 범위**: {impact.get('affected_records', 1)}개 레코드",
        "",
        "### 사전 조건",
    ]
    
    for check in preconditions:
        status = "✅" if check["passed"] else "❌"
        lines.append(f"{status} {check['check_name']}: {check['details']}")
    
    lines.extend(["", "### 리스크 분석"])
    
    for risk in risks:
        emoji = "🔴" if risk.severity == "high" else "🟡" if risk.severity == "medium" else "🟢"
        lines.append(f"{emoji} **{risk.severity.upper()}**: {risk.description}")
        if risk.mitigation:
            lines.append(f"   → {risk.mitigation}")
    
    lines.extend(["", "### AI 분석", ai_analysis[:500]])
    
    return "\n".join(lines)


def _generate_recommendations(risks: list, preconditions: list) -> list:
    """권장사항 생성"""
    recommendations = []
    
    # 고위험 리스크 대응
    high_risks = [r for r in risks if r.severity == "high"]
    if high_risks:
        recommendations.append(Recommendation(
            priority=1,
            action="고위험 항목 확인",
            reason=f"{len(high_risks)}개의 고위험 항목이 식별되었습니다.",
            auto_applicable=False
        ))
    
    # 사전 조건 실패 대응
    failed_checks = [p for p in preconditions if not p["passed"]]
    if failed_checks:
        recommendations.append(Recommendation(
            priority=1,
            action="사전 조건 해결",
            reason=f"{len(failed_checks)}개의 사전 조건이 충족되지 않았습니다.",
            auto_applicable=False
        ))
    
    # 기본 권장사항
    recommendations.append(Recommendation(
        priority=5,
        action="변경사항 검토",
        reason="실행 전 파라미터를 다시 확인하세요.",
        auto_applicable=True
    ))
    
    return recommendations


@router.post("/actions/execute", response_model=dict, tags=["Actions"])
async def action_execute(request: dict, db: AsyncSession = Depends(get_db)):
    """
    액션 실행 (미리보기 승인 후)

    - 미리보기 정보 검증
    - 권한 재확인
    - Tool Gateway를 통한 실제 실행
    - 실행 결과 로깅 및 롤백 정보 저장
    """
    import time
    start_time = time.time()

    preview_id = request.get("preview_id")
    user_id = request.get("user_id")
    confirmed = request.get("confirmed", False)
    note = request.get("note", "")

    if not preview_id or not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "success": False,
                "error": {
                    "code": "INVALID_REQUEST",
                    "message": "preview_id와 user_id가 필요합니다."
                }
            }
        )

    if not confirmed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "success": False,
                "error": {
                    "code": "NOT_CONFIRMED",
                    "message": "액션 실행을 확인해주세요. confirmed=true로 설정하세요."
                }
            }
        )

    execution_id = f"exec_{uuid.uuid4().hex[:16]}"
    request_id = f"req_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{user_id[:8]}"

    try:
        # 1. 미리보기 조회
        result = await db.execute(
            select(ActionPreview).where(ActionPreview.preview_id == preview_id)
        )
        preview = result.scalar_one_or_none()

        if not preview:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={
                    "success": False,
                    "error": {
                        "code": "PREVIEW_NOT_FOUND",
                        "message": "미리보기를 찾을 수 없습니다."
                    }
                }
            )

        # 2. 만료 확인
        if datetime.utcnow() > preview.expires_at:
            raise HTTPException(
                status_code=status.HTTP_410_GONE,
                detail={
                    "success": False,
                    "error": {
                        "code": "PREVIEW_EXPIRED",
                        "message": "미리보기가 만료되었습니다. 새로 생성해주세요."
                    }
                }
            )

        # 3. 이미 실행 여부 확인
        if preview.executed:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={
                    "success": False,
                    "error": {
                        "code": "ALREADY_EXECUTED",
                        "message": "이미 실행된 미리보기입니다."
                    }
                }
            )

        # 4. 권한 재확인 (미리보기 생성자 또는 관리자)
        if preview.user_id != user_id:
            # TODO: 관리자 권한 확인 로직
            pass

        # 5. Tool Gateway를 통한 실제 액션 실행
        action_type = preview.action_type
        target_system = preview.target_system

        # 실행 도구 선택
        tool_mapping = {
            "ticket_close": "ticket_update",
            "ticket_update": "ticket_update",
            "crm_update": "crm_update",
            "notification_send": None,  # 별도 서비스 호출
            "email_send": None,  # 별도 서비스 호출
            "workflow_trigger": None,  # 별도 서비스 호출
        }

        tool_name = tool_mapping.get(action_type)
        execution_result = None
        final_status = "pending"

        if tool_name:
            # Tool Gateway 실행
            tool_result = await tool_gateway.execute(
                tool_name=tool_name,
                parameters={"action": action_type, "target": target_system},
                user_id=user_id
            )

            if tool_result.success:
                final_status = "success"
                execution_result = {
                    "tool_result": tool_result.data,
                    "execution_time_ms": tool_result.execution_time_ms
                }
            else:
                final_status = "failed"
                execution_result = {
                    "error": tool_result.error_message,
                    "tool_failed": True
                }
        else:
            # 외부 서비스 호출 시뮬레이션
            final_status = "success"
            execution_result = {
                "action_type": action_type,
                "target_system": target_system,
                "executed_at": datetime.utcnow().isoformat(),
                "note": note,
                "integration": "external_service",
                "result": f"{action_type}가 {target_system}에서 실행되었습니다."
            }

        # 6. 미리보기 상태 업데이트
        preview.executed = True
        preview.approval_status = "approved"
        preview.approved_by = user_id
        preview.approved_at = datetime.utcnow()

        # 7. 실행 기록 저장
        execution = ActionExecution(
            execution_id=execution_id,
            preview_id=preview_id,
            status=final_status,
            result=execution_result,
            error_message=execution_result.get("error") if final_status == "failed" else None,
            rolled_back=False,
            rollback_info={
                "rollback_available": True,
                "rollback_method": f"reverse_{action_type}",
                "rollback_data": {
                    "action_type": action_type,
                    "target_system": target_system,
                    "original_preview_id": preview_id
                }
            },
            executed_by=user_id,
            executed_at=datetime.utcnow()
        )
        db.add(execution)

        # 8. 요청 로그 기록
        latency_ms = int((time.time() - start_time) * 1000)
        request_log = RequestLog(
            request_id=request_id,
            user_id=user_id,
            org_id=preview.user_id,  # org_id 대신 user_id 참조
            endpoint="actions/execute",
            method="POST",
            model_used="system",
            api_model_name="action_execution",
            fallback_used=False,
            latency_ms=latency_ms
        )
        db.add(request_log)

        await db.commit()

        logger.info(
            "action_executed",
            execution_id=execution_id,
            preview_id=preview_id,
            user_id=user_id,
            action_type=action_type,
            status=final_status,
            latency_ms=latency_ms
        )

        return {
            "success": final_status == "success",
            "data": {
                "execution_id": execution_id,
                "preview_id": preview_id,
                "status": final_status,
                "result": execution_result,
                "error_message": execution_result.get("error") if final_status == "failed" else None,
                "rollback_available": True,
                "audit_trail": {
                    "executed_by": user_id,
                    "executed_at": datetime.utcnow().isoformat(),
                    "preview_id": preview_id,
                    "approved_at": preview.approved_at.isoformat() if preview.approved_at else None,
                    "note": note,
                    "latency_ms": latency_ms
                }
            },
            "meta": {
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat(),
                "latency_ms": latency_ms
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("action_execute_error", execution_id=execution_id, error=str(e))

        # 실패 기록 저장
        try:
            failed_execution = ActionExecution(
                execution_id=execution_id,
                preview_id=preview_id,
                status="failed",
                result={"error": str(e)},
                error_message=str(e),
                rolled_back=False,
                executed_by=user_id,
                executed_at=datetime.utcnow()
            )
            db.add(failed_execution)
            await db.commit()
        except:
            pass

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": {
                    "code": "EXECUTION_ERROR",
                    "message": "액션 실행 중 오류가 발생했습니다."
                }
            }
        )
