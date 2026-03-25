"""
AI Provider Factory
Clean Architecture - 인프라 레이어
"""
from typing import Dict, Optional
from infrastructure.ai_providers.base import AIProvider
from infrastructure.ai_providers.moonshot import MoonshotProvider
from infrastructure.ai_providers.anthropic import AnthropicProvider
from core.config import settings


class ProviderFactory:
    """AI 제공자 팩토리"""
    
    _providers: Dict[str, AIProvider] = {}
    
    @classmethod
    def get_provider(cls, model_name: str) -> AIProvider:
        """모델명에 따른 제공자 반환"""
        # Moonshot 모델
        if model_name.startswith("kimi"):
            return cls._get_moonshot_provider()
        
        # Anthropic 모델
        if model_name.startswith("claude"):
            return cls._get_anthropic_provider()
        
        # 기본값: Moonshot
        return cls._get_moonshot_provider()
    
    @classmethod
    def _get_moonshot_provider(cls) -> AIProvider:
        """Moonshot 제공자 인스턴스 반환"""
        if "moonshot" not in cls._providers:
            if not settings.MOONSHOT_API_KEY:
                raise ValueError("MOONSHOT_API_KEY not configured")
            cls._providers["moonshot"] = MoonshotProvider(
                api_key=settings.MOONSHOT_API_KEY,
                base_url=settings.MOONSHOT_BASE_URL
            )
        return cls._providers["moonshot"]
    
    @classmethod
    def _get_anthropic_provider(cls) -> AIProvider:
        """Anthropic 제공자 인스턴스 반환"""
        if "anthropic" not in cls._providers:
            if not settings.ANTHROPIC_API_KEY:
                raise ValueError("ANTHROPIC_API_KEY not configured")
            cls._providers["anthropic"] = AnthropicProvider(
                api_key=settings.ANTHROPIC_API_KEY,
                base_url=settings.ANTHROPIC_BASE_URL
            )
        return cls._providers["anthropic"]
    
    @classmethod
    def clear_cache(cls):
        """제공자 캐시 초기화"""
        cls._providers.clear()


def get_provider_for_model(model_name: str) -> AIProvider:
    """모델에 대한 제공자 반환 (레거시 호환)"""
    return ProviderFactory.get_provider(model_name)
