"""
LIDER Platform - 보안 및 PII 처리 유틸리티
PII Redaction, Data Masking, Security Utilities
"""
import re
import hashlib
import base64
from typing import Dict, Any, List, Optional, Union, Set
from enum import Enum
import structlog

logger = structlog.get_logger()


class PIIType(Enum):
    """PII (개인식별정보) 유형"""
    EMAIL = "email"
    PHONE = "phone"
    KOREAN_PHONE = "korean_phone"
    CREDIT_CARD = "credit_card"
    SSN = "ssn"  # 주민등록번호
    KOREAN_SSN = "korean_ssn"
    IP_ADDRESS = "ip_address"
    BANK_ACCOUNT = "bank_account"
    PASSWORD = "password"
    API_KEY = "api_key"
    TOKEN = "token"
    NAME = "name"
    ADDRESS = "address"


# PII 정규식 패턴
PII_PATTERNS = {
    PIIType.EMAIL: re.compile(
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    ),
    PIIType.KOREAN_PHONE: re.compile(
        r'(?:(?:\+82[\s-]*)?(?:(?:01[0|1|6|7|8|9])[-\s]?\d{3,4}[-\s]?\d{4}))'
    ),
    PIIType.PHONE: re.compile(
        r'(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?(\d{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?'
    ),
    PIIType.CREDIT_CARD: re.compile(
        r'\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b'
    ),
    PIIType.KOREAN_SSN: re.compile(
        r'\b\d{6}[-\s]?[1-4]\d{6}\b'
    ),
    PIIType.SSN: re.compile(
        r'\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b'
    ),
    PIIType.IP_ADDRESS: re.compile(
        r'\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b'
    ),
    PIIType.BANK_ACCOUNT: re.compile(
        r'\b\d{10,16}\b'  # 간소화된 패턴
    ),
    PIIType.API_KEY: re.compile(
        r'(?i)(api[_-]?key|apikey)[\s]*[=:]+[\s]*["\']?[a-zA-Z0-9_\-]{20,}["\']?'
    ),
    PIIType.TOKEN: re.compile(
        r'(?i)(bearer\s+)[a-zA-Z0-9_\-\.=]{20,}'
    ),
    PIIType.PASSWORD: re.compile(
        r'(?i)(password|passwd|pwd)[\s]*[=:]+[\s]*["\']?[^"\'\s]{8,}["\']?'
    ),
}


class PIIRedactor:
    """
    PII (개인식별정보) 마스킹/제거 유틸리티
    """

    def __init__(
        self,
        mask_char: str = "*",
        preserve_length: bool = True,
        hash_sensitive: bool = False,
        allowed_fields: Optional[Set[str]] = None
    ):
        self.mask_char = mask_char
        self.preserve_length = preserve_length
        self.hash_sensitive = hash_sensitive
        self.allowed_fields = allowed_fields or set()
        self.detection_stats: Dict[PIIType, int] = {pii_type: 0 for pii_type in PIIType}

    def redact_text(self, text: str, pii_types: Optional[List[PIIType]] = None) -> str:
        """
        텍스트에서 PII 마스킹

        Args:
            text: 원본 텍스트
            pii_types: 마스킹할 PII 유형 (None = 전체)

        Returns:
            마스킹된 텍스트
        """
        if not text or not isinstance(text, str):
            return text

        target_types = pii_types or list(PIIType)
        result = text

        for pii_type in target_types:
            pattern = PII_PATTERNS.get(pii_type)
            if pattern:
                matches = pattern.findall(result)
                if matches:
                    self.detection_stats[pii_type] += len(matches)
                    for match in matches:
                        if isinstance(match, tuple):
                            match = ''.join(filter(None, match))
                        masked = self._mask_value(match)
                        result = result.replace(match, masked, 1)

        return result

    def redact_dict(
        self,
        data: Dict[str, Any],
        sensitive_fields: Optional[Set[str]] = None,
        pii_types: Optional[List[PIIType]] = None
    ) -> Dict[str, Any]:
        """
        딕셔너리에서 PII 마스킹

        Args:
            data: 원본 딕셔너리
            sensitive_fields: 민감한 필드명 집합
            pii_types: 마스킹할 PII 유형

        Returns:
            마스킹된 딕셔너리
        """
        if not isinstance(data, dict):
            return data

        sensitive = sensitive_fields or {
            "password", "token", "api_key", "secret", "ssn",
            "phone", "email", "address", "credit_card", "bank_account",
            "주민번호", "전화번호", "비밀번호", "계좌번호"
        }

        result = {}
        for key, value in data.items():
            # 허용된 필드는 마스킹하지 않음
            if key in self.allowed_fields:
                result[key] = value
                continue

            if isinstance(value, str):
                # 민감한 필드는 완전 마스킹
                if any(s in key.lower() for s in sensitive):
                    result[key] = self._mask_value(value, full=True)
                else:
                    # 일반 텍스트는 PII 패턴 검색
                    result[key] = self.redact_text(value, pii_types)
            elif isinstance(value, dict):
                result[key] = self.redact_dict(value, sensitive, pii_types)
            elif isinstance(value, list):
                result[key] = [
                    self.redact_dict(item, sensitive, pii_types)
                    if isinstance(item, dict)
                    else self.redact_text(item, pii_types)
                    if isinstance(item, str)
                    else item
                    for item in value
                ]
            else:
                result[key] = value

        return result

    def _mask_value(self, value: str, full: bool = False) -> str:
        """값 마스킹"""
        if not value:
            return value

        if full or not self.preserve_length:
            return self.mask_char * min(len(value), 8)

        # 부분 마스킹 (앞 2자리, 뒤 2자리 보존)
        if len(value) <= 4:
            return self.mask_char * len(value)

        return value[:2] + self.mask_char * (len(value) - 4) + value[-2:]

    def get_detection_stats(self) -> Dict[str, int]:
        """PII 감지 통계 반환"""
        return {k.value: v for k, v in self.detection_stats.items() if v > 0}

    def reset_stats(self) -> None:
        """통계 초기화"""
        self.detection_stats = {pii_type: 0 for pii_type in PIIType}


class DataAnonymizer:
    """
    데이터 익명화 유틸리티
    """

    @staticmethod
    def hash_identifier(identifier: str, salt: Optional[str] = None) -> str:
        """
        식별자 해시화

        Args:
            identifier: 원본 식별자
            salt: 선택적 솔트

        Returns:
            해시된 식별자
        """
        data = identifier.encode('utf-8')
        if salt:
            data += salt.encode('utf-8')

        return hashlib.sha256(data).hexdigest()[:16]

    @staticmethod
    def pseudonymize_user_id(user_id: str, org_id: str) -> str:
        """
        사용자 ID 가명화

        Args:
            user_id: 원본 사용자 ID
            org_id: 조직 ID (솔트로 사용)

        Returns:
            가명화된 ID
        """
        return f"anon_{DataAnonymizer.hash_identifier(user_id, org_id)}"

    @staticmethod
    def mask_ip_address(ip: str) -> str:
        """IP 주소 마스킹 (마지막 옥텟)"""
        parts = ip.split('.')
        if len(parts) == 4:
            return f"{parts[0]}.{parts[1]}.{parts[2]}.***"
        return "***.***.***.***"


class SecurityUtils:
    """보안 관련 유틸리티"""

    @staticmethod
    def sanitize_input(text: str) -> str:
        """입력 sanitization"""
        if not text:
            return text

        # HTML 태그 제거
        import re
        text = re.sub(r'<[^>]+>', '', text)

        # 제어 문자 제거
        text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)

        return text.strip()

    @staticmethod
    def truncate_for_logging(text: str, max_length: int = 1000) -> str:
        """로깅용 텍스트 트렁케이션"""
        if not text or len(text) <= max_length:
            return text
        return text[:max_length] + f"... [truncated, total: {len(text)} chars]"

    @staticmethod
    def is_sensitive_endpoint(endpoint: str) -> bool:
        """민감한 엔드포인트 확인"""
        sensitive_patterns = [
            r'/auth', r'/login', r'/password', r'/token',
            r'/api.*key', r'/secret', r'/credential'
        ]
        return any(re.search(pattern, endpoint, re.IGNORECASE) for pattern in sensitive_patterns)


# === 전역 인스턴스 ===
_default_redactor = PIIRedactor()


def redact_pii(text: str) -> str:
    """간단한 PII 마스킹 헬퍼"""
    return _default_redactor.redact_text(text)


def redact_dict_pii(data: Dict[str, Any]) -> Dict[str, Any]:
    """딕셔너리 PII 마스킹 헬퍼"""
    return _default_redactor.redact_dict(data)


def anonymize_user_id(user_id: str, org_id: str) -> str:
    """사용자 ID 가명화 헬퍼"""
    return DataAnonymizer.pseudonymize_user_id(user_id, org_id)


def sanitize_for_audit(
    data: Dict[str, Any],
    exclude_fields: Optional[Set[str]] = None
) -> Dict[str, Any]:
    """
    감사 로그용 데이터 정제
    - PII 마스킹
    - 민감한 필드 제거
    - 크기 제한
    """
    exclude = exclude_fields or {
        "password", "token", "api_key", "secret", "credit_card",
        "raw_content", "file_content", "image_data"
    }

    result = {}
    for key, value in data.items():
        # 민감한 필드 제거
        if any(s in key.lower() for s in exclude):
            result[key] = "[REDACTED]"
        elif isinstance(value, dict):
            result[key] = sanitize_for_audit(value, exclude)
        elif isinstance(value, str):
            # 문자열 길이 제한
            result[key] = SecurityUtils.truncate_for_logging(value, 500)
        else:
            result[key] = value

    return result


class AuditLogger:
    """감사 로깅 전용 유틸리티"""

    @staticmethod
    def log_access(
        user_id: str,
        action: str,
        resource: str,
        details: Optional[Dict[str, Any]] = None
    ) -> None:
        """접근 감사 로깅"""
        safe_details = sanitize_for_audit(details or {})
        logger.info(
            "audit_access",
            user_id=user_id,
            action=action,
            resource=resource,
            details=safe_details,
            timestamp=datetime.utcnow().isoformat()
        )

    @staticmethod
    def log_data_modification(
        user_id: str,
        operation: str,
        table: str,
        record_id: str,
        changes: Optional[Dict[str, Any]] = None
    ) -> None:
        """데이터 수정 감사 로깅"""
        logger.info(
            "audit_data_change",
            user_id=user_id,
            operation=operation,
            table=table,
            record_id=record_id,
            changes=sanitize_for_audit(changes or {}),
            timestamp=datetime.utcnow().isoformat()
        )
