"""
Extract API 스키마 정의
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class ExtractMode(str, Enum):
    """추출 모드"""
    OCR = "ocr"
    STRUCTURED = "structured"
    HYBRID = "hybrid"


class OutputSchema(BaseModel):
    """출력 스키마 정의"""
    field_name: str
    field_type: str  # string, number, date, boolean, array, object
    description: str
    required: bool = True
    validation_pattern: Optional[str] = None
    enum_values: Optional[List[str]] = None


class ExtractRequest(BaseModel):
    """Extract API 요청"""
    session_id: Optional[str] = None
    user_id: str = Field(..., min_length=1)
    org_id: Optional[str] = None
    file_url: Optional[str] = None
    file_content: Optional[str] = None  # base64 encoded
    file_type: Optional[str] = None  # pdf, image, docx, etc.
    output_schema: List[OutputSchema] = Field(..., min_length=1)
    options: Optional[Dict[str, Any]] = Field(default=None)
    locale: str = Field(default="ko-KR")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "user_12345",
                "org_id": "org_67890",
                "file_url": "https://storage.lider.ai/docs/invoice.pdf",
                "file_type": "pdf",
                "output_schema": [
                    {
                        "field_name": "invoice_number",
                        "field_type": "string",
                        "description": "청구서 번호",
                        "required": True
                    },
                    {
                        "field_name": "total_amount",
                        "field_type": "number",
                        "description": "총 금액",
                        "required": True
                    }
                ],
                "locale": "ko-KR"
            }
        }


class ExtractedField(BaseModel):
    """추출된 필드"""
    field_name: str
    value: Any
    confidence: float = Field(ge=0, le=1)
    source_page: Optional[int] = None
    source_region: Optional[str] = None  # bbox coordinates


class ExtractionWarning(BaseModel):
    """추출 경고"""
    field_name: str
    warning_type: str  # low_confidence, missing, ambiguous, etc.
    message: str
    suggestion: Optional[str] = None


class ExtractResponseData(BaseModel):
    """Extract 응답 데이터"""
    extraction_id: str
    extracted_fields: List[ExtractedField]
    confidence_avg: float = Field(ge=0, le=1)
    warnings: Optional[List[ExtractionWarning]] = None
    raw_text: Optional[str] = None  # 전체 OCR 텍스트
    processing_time_ms: int = Field(ge=0)


class ExtractResponse(BaseModel):
    """Extract API 응답"""
    success: bool
    data: ExtractResponseData
    meta: Dict[str, Any]
