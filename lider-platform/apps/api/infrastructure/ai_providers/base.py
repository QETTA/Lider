"""
AI Provider 추상 기본 클래스
Clean Architecture - 인프라 레이어
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, List, Any, Optional


@dataclass
class GenerationResult:
    """AI 생성 결과"""
    content: str
    api_model_name: str
    usage: Dict[str, int]
    finish_reason: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class AIProvider(ABC):
    """AI 제공자 추상 클래스"""
    
    def __init__(self, api_key: str, base_url: Optional[str] = None):
        self.api_key = api_key
        self.base_url = base_url
    
    @abstractmethod
    async def generate(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        tools: Optional[List[Dict]] = None
    ) -> GenerationResult:
        """메시지 기반 생성"""
        pass
    
    @abstractmethod
    async def health_check(self) -> bool:
        """API 상태 체크"""
        pass
    
    @property
    @abstractmethod
    def provider_name(self) -> str:
        """제공자 이름"""
        pass
