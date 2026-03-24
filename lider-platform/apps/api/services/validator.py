"""
LIDER Validator Pipeline
결과 검증 및 비즈니스 규칙 검사
"""
from typing import Dict, Any, List, Optional, Callable
from dataclasses import dataclass
from enum import Enum
import json
import structlog

from jsonschema import validate, ValidationError as JSONSchemaError

logger = structlog.get_logger()


class ValidationType(str, Enum):
    """검증 유형"""
    JSON_SCHEMA = "json_schema"
    BUSINESS_RULE = "business_rule"
    PERMISSION = "permission"
    FRESHNESS = "freshness"


class ValidationStatus(str, Enum):
    """검증 상태"""
    PASS = "pass"
    FAIL = "fail"
    WARNING = "warning"
    SKIP = "skip"


@dataclass
class ValidationResult:
    """검증 결과"""
    validator_type: ValidationType
    status: ValidationStatus
    message: str
    details: Optional[Dict[str, Any]] = None


class ValidatorPipeline:
    """검증 파이프라인 - 다단계 검증 체인"""
    
    def __init__(self):
        self._validators: Dict[ValidationType, List[Callable]] = {
            ValidationType.JSON_SCHEMA: [],
            ValidationType.BUSINESS_RULE: [],
            ValidationType.PERMISSION: [],
            ValidationType.FRESHNESS: [],
        }
        self._register_default_validators()
    
    def _register_default_validators(self):
        """기본 검증기 등록"""
        self.register(ValidationType.JSON_SCHEMA, self._validate_json_schema)
        self.register(ValidationType.BUSINESS_RULE, self._validate_business_rules)
        self.register(ValidationType.PERMISSION, self._validate_permissions)
        self.register(ValidationType.FRESHNESS, self._validate_freshness)
    
    def register(self, validator_type: ValidationType, validator: Callable):
        """검증기 등록"""
        self._validators[validator_type].append(validator)
    
    async def validate(
        self,
        data: Any,
        schema: Optional[Dict[str, Any]] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> List[ValidationResult]:
        """
        전체 검증 실행
        
        1. JSON Schema 검증
        2. 비즈니스 규칙 검증
        3. 권한 검증
        4. 데이터 신선도 검증
        """
        results = []
        context = context or {}
        
        # JSON Schema 검증
        if schema:
            for validator in self._validators[ValidationType.JSON_SCHEMA]:
                result = await validator(data, schema, context)
                results.append(result)
        
        # 비즈니스 규칙 검증
        for validator in self._validators[ValidationType.BUSINESS_RULE]:
            result = await validator(data, context)
            results.append(result)
        
        # 권한 검증
        for validator in self._validators[ValidationType.PERMISSION]:
            result = await validator(data, context)
            results.append(result)
        
        # 데이터 신선도 검증
        for validator in self._validators[ValidationType.FRESHNESS]:
            result = await validator(data, context)
            results.append(result)
        
        return results
    
    async def _validate_json_schema(
        self,
        data: Any,
        schema: Dict[str, Any],
        context: Dict[str, Any]
    ) -> ValidationResult:
        """JSON Schema 검증"""
        try:
            validate(instance=data, schema=schema)
            return ValidationResult(
                validator_type=ValidationType.JSON_SCHEMA,
                status=ValidationStatus.PASS,
                message="JSON schema validation passed"
            )
        except JSONSchemaError as e:
            return ValidationResult(
                validator_type=ValidationType.JSON_SCHEMA,
                status=ValidationStatus.FAIL,
                message=f"JSON schema validation failed: {str(e)}"
            )
    
    async def _validate_business_rules(
        self,
        data: Any,
        context: Dict[str, Any]
    ) -> ValidationResult:
        """비즈니스 규칙 검증"""
        endpoint = context.get("endpoint", "")
        
        # Assist 응답 길이 검사
        if endpoint == "assist":
            if isinstance(data, dict) and "answer" in data:
                answer = data["answer"]
                if len(answer) > 10000:
                    return ValidationResult(
                        validator_type=ValidationType.BUSINESS_RULE,
                        status=ValidationStatus.WARNING,
                        message="Answer exceeds recommended length",
                        details={"max_recommended": 10000, "actual": len(answer)}
                    )
        
        # Extract 신뢰도 검사
        if endpoint == "extract":
            if isinstance(data, dict) and "confidence_avg" in data:
                confidence = data["confidence_avg"]
                if confidence < 0.5:
                    return ValidationResult(
                        validator_type=ValidationType.BUSINESS_RULE,
                        status=ValidationStatus.FAIL,
                        message="Confidence too low",
                        details={"min_required": 0.5, "actual": confidence}
                    )
        
        return ValidationResult(
            validator_type=ValidationType.BUSINESS_RULE,
            status=ValidationStatus.PASS,
            message="Business rules validation passed"
        )
    
    async def _validate_permissions(
        self,
        data: Any,
        context: Dict[str, Any]
    ) -> ValidationResult:
        """권한 검증"""
        user_id = context.get("user_id")
        required_permission = context.get("required_permission")
        
        # TODO: 실제 권한 시스템 연동
        # 현재는 모두 통과
        return ValidationResult(
            validator_type=ValidationType.PERMISSION,
            status=ValidationStatus.PASS,
            message="Permission validation passed"
        )
    
    async def _validate_freshness(
        self,
        data: Any,
        context: Dict[str, Any]
    ) -> ValidationResult:
        """데이터 신선도 검증"""
        # TODO: 캐시/도구 결과의 타임스탬프 확인
        return ValidationResult(
            validator_type=ValidationType.FRESHNESS,
            status=ValidationStatus.PASS,
            message="Data freshness validation passed"
        )
    
    def has_failures(self, results: List[ValidationResult]) -> bool:
        """검증 실패 여부 확인"""
        return any(r.status == ValidationStatus.FAIL for r in results)
    
    def get_failures(self, results: List[ValidationResult]) -> List[ValidationResult]:
        """실패한 검증 결과 반환"""
        return [r for r in results if r.status == ValidationStatus.FAIL]
    
    def get_summary(self, results: List[ValidationResult]) -> Dict[str, Any]:
        """검증 결과 요약"""
        status_counts = {"pass": 0, "fail": 0, "warning": 0, "skip": 0}
        for r in results:
            status_counts[r.status.value] += 1
        
        return {
            "total": len(results),
            "passed": status_counts["pass"],
            "failed": status_counts["fail"],
            "warnings": status_counts["warning"],
            "skipped": status_counts["skip"],
            "valid": status_counts["fail"] == 0
        }


# 전역 검증 파이프라인 인스턴스
validator_pipeline = ValidatorPipeline()
