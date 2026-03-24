"""
Extract API Routes
/v1/extract - 문서/이미지 정보 추출 엔드포인트
"""
import time
import base64
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db, RequestLog, Extraction
from schemas.extract import ExtractRequest, ExtractResponseData, ExtractedField, ExtractionWarning
from services.model_router import model_router, TaskType
from services.providers import get_provider_for_model
from services.validator import validator_pipeline
from services.evaluator import response_evaluator

import structlog
logger = structlog.get_logger()

router = APIRouter()


@router.post("/extract", response_model=dict, tags=["Extract"])
async def extract(request: ExtractRequest, db: AsyncSession = Depends(get_db)):
    """
    문서/이미지 정보 추출 API
    
    - OCR 기반 텍스트 추출
    - 구조화된 필드 추출
    - 신뢰도 점수 제공
    """
    start_time = time.time()
    request_id = f"req_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{request.user_id[:8]}"
    
    try:
        # 1. 모델 라우팅 (Vision 모델 필요)
        route_decision = await model_router.route(
            task_type=TaskType.EXTRACT,
            has_attachments=True,
            required_vision=True,
            estimated_tokens=2000
        )
        
        logger.info(
            "extract_request",
            request_id=request_id,
            user_id=request.user_id,
            file_type=request.file_type,
            model=route_decision.internal_model
        )
        
        # 2. 파일 콘텐츠 준비
        file_content = None
        if request.file_url:
            # URL에서 파일 다운로드 (간략화된 로직)
            file_content = f"[File from URL: {request.file_url}]"
        elif request.file_content:
            # Base64 디코딩
            try:
                file_content = base64.b64decode(request.file_content)
            except Exception:
                file_content = request.file_content
        
        # 3. AI 모델 호출 (Vision)
        provider = get_provider_for_model(route_decision.internal_model)
        
        # 스키마 포맷팅
        schema_str = _format_output_schema(request.output_schema)
        
        messages = [
            {
                "role": "system",
                "content": _get_extract_system_prompt(request.locale)
            },
            {
                "role": "user",
                "content": f"""문서에서 다음 정보를 추출해주세요:

[추출 대상 스키마]
{schema_str}

문서 콘텐츠:
{file_content[:5000] if isinstance(file_content, str) else '[Binary content]'}

응답은 반드시 JSON 형식으로 제공하세요."""
            }
        ]
        
        try:
            ai_response = await provider.generate(
                messages=messages,
                model=route_decision.internal_model,
                temperature=0.1,  # 추출은 낮은 temperature
                max_tokens=3000
            )
            
            model_used = route_decision.internal_model
            api_model_name = ai_response.get("api_model_name", route_decision.api_model_name)
            fallback_used = False
            
        except Exception as e:
            logger.error("extract_primary_failed", error=str(e), model=route_decision.internal_model)
            
            # Fallback
            fallback = await model_router.get_fallback_model(route_decision.internal_model, attempt=1)
            if fallback:
                provider = get_provider_for_model(fallback.internal_model)
                ai_response = await provider.generate(
                    messages=messages,
                    model=fallback.internal_model,
                    temperature=0.1,
                    max_tokens=3000
                )
                model_used = fallback.internal_model
                api_model_name = fallback.api_model_name
                fallback_used = True
            else:
                raise
        
        # 4. 응답 파싱
        content = ai_response.get("content", "")
        extracted_data = _parse_extract_response(content, request.output_schema)
        
        # 5. 신뢰도 계산
        confidence_scores = [f.get("confidence", 0.5) for f in extracted_data["fields"]]
        avg_confidence = sum(confidence_scores) / len(confidence_scores) if confidence_scores else 0
        
        # 6. 검증
        validation_results = await validator_pipeline.validate(
            data=extracted_data,
            context={"endpoint": "extract", "user_id": request.user_id}
        )
        
        # 7. 결과 저장
        processing_time = int((time.time() - start_time) * 1000)
        extraction_id = f"ext_{request_id}"
        
        extraction = Extraction(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            file_name=request.file_url.split('/')[-1] if request.file_url else "uploaded_file",
            file_type=request.file_type or "unknown",
            extracted_data={"fields": extracted_data["fields"]},
            confidence_scores=confidence_scores,
            output_schema_used=schema_str,
            processing_time_ms=processing_time,
            confidence_avg=avg_confidence
        )
        db.add(extraction)
        
        # 8. 로깅
        usage = ai_response.get("usage", {})
        request_log = RequestLog(
            request_id=request_id,
            user_id=request.user_id,
            org_id=request.org_id,
            endpoint="extract",
            method="POST",
            model_used=model_used,
            api_model_name=api_model_name,
            fallback_used=fallback_used,
            prompt_tokens=usage.get("prompt_tokens", 0),
            completion_tokens=usage.get("completion_tokens", 0),
            total_tokens=usage.get("total_tokens", 0),
            estimated_cost_usd=route_decision.estimated_cost_usd,
            latency_ms=processing_time,
            validation_result=validator_pipeline.get_summary(validation_results)
        )
        db.add(request_log)
        await db.commit()
        
        # 9. 응답 구성
        response_data = ExtractResponseData(
            extraction_id=extraction_id,
            extracted_fields=[ExtractedField(**f) for f in extracted_data["fields"]],
            confidence_avg=avg_confidence,
            warnings=extracted_data.get("warnings"),
            raw_text=extracted_data.get("raw_text"),
            processing_time_ms=processing_time
        )
        
        return {
            "success": True,
            "data": response_data.model_dump(exclude_none=True),
            "meta": {
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat(),
                "latency_ms": processing_time,
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
                }
            }
        }
        
    except Exception as e:
        logger.error("extract_error", request_id=request_id, error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": {
                    "code": "EXTRACTION_ERROR",
                    "message": "문서 추출 중 오류가 발생했습니다."
                }
            }
        )


def _get_extract_system_prompt(locale: str = "ko-KR") -> str:
    """Extract 시스템 프롬프트"""
    if locale.startswith("ko"):
        return """당신은 문서 정보 추출 전문가입니다.
제공된 스키마에 따라 문서에서 정확한 정보를 추출하세요.
각 필드에 대해 신뢰도 점수(0.0~1.0)를 반드시 포함하세요.
정보를 찾을 수 없는 경우 null로 표시하고 confidence를 0으로 설정하세요.
응답은 반드시 유효한 JSON 형식이어야 합니다."""
    else:
        return """You are a document information extraction expert.
Extract accurate information from the document according to the provided schema.
Include a confidence score (0.0~1.0) for each field.
If information is not found, set null and confidence to 0.
Response must be in valid JSON format."""


def _format_output_schema(schemas: list) -> str:
    """출력 스키마 포맷팅"""
    lines = []
    for schema in schemas:
        req = "(필수)" if schema.required else "(선택)"
        lines.append(f"- {schema.field_name}: {schema.field_type} {req} - {schema.description}")
    return "\n".join(lines)


def _parse_extract_response(content: str, output_schemas: list) -> dict:
    """Extract 응답 파싱"""
    import json
    import re
    
    # JSON 추출 시도
    try:
        # Markdown 코드 블록 제거
        if "```json" in content:
            content = re.search(r'```json\s*(.*?)\s*```', content, re.DOTALL)
            if content:
                content = content.group(1)
        elif "```" in content:
            content = re.search(r'```\s*(.*?)\s*```', content, re.DOTALL)
            if content:
                content = content.group(1)
        
        parsed = json.loads(content.strip())
        
        # 필드 형식 표준화
        fields = []
        for schema in output_schemas:
            field_name = schema.field_name
            value = parsed.get(field_name)
            confidence = parsed.get(f"{field_name}_confidence", 0.5) if value else 0.0
            
            fields.append({
                "field_name": field_name,
                "value": value,
                "confidence": confidence,
                "source_page": parsed.get(f"{field_name}_page")
            })
        
        return {
            "fields": fields,
            "raw_text": parsed.get("_raw_text"),
            "warnings": parsed.get("_warnings")
        }
        
    except json.JSONDecodeError:
        # 파싱 실패 시 기본값 반환
        return {
            "fields": [
                {
                    "field_name": s.field_name,
                    "value": None,
                    "confidence": 0.0
                }
                for s in output_schemas
            ],
            "warnings": [{"field_name": "_global", "warning_type": "parse_error", "message": "JSON 파싱 실패"}]
        }
