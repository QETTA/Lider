"""
LIDER AI Provider Adapters
Moonshot (Kimi) 및 Anthropic (Claude) API 통합
"""
from abc import ABC, abstractmethod
from typing import AsyncGenerator, Optional, Dict, Any, List
import json
import structlog

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

from core.config import settings, get_api_model_name
from core.redis_cache import redis_client

logger = structlog.get_logger()


class AIProvider(ABC):
    """AI Provider 추상 클래스"""
    
    @abstractmethod
    async def generate(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        tools: Optional[List[Dict]] = None,
        stream: bool = False
    ) -> Dict[str, Any]:
        """텍스트 생성"""
        pass
    
    @abstractmethod
    async def generate_stream(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> AsyncGenerator[str, None]:
        """스트리밍 생성"""
        pass
    
    @abstractmethod
    async def health_check(self) -> bool:
        """헬스 체크"""
        pass


class MoonshotProvider(AIProvider):
    """Moonshot (Kimi) API Provider"""
    
    def __init__(self):
        self.base_url = settings.MOONSHOT_BASE_URL
        self.api_key = settings.MOONSHOT_API_KEY
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            headers={"Authorization": f"Bearer {self.api_key}"},
            timeout=60.0
        )
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((httpx.TimeoutException, httpx.NetworkError))
    )
    async def generate(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        tools: Optional[List[Dict]] = None,
        stream: bool = False
    ) -> Dict[str, Any]:
        """Kimi 모델로 텍스트 생성"""
        api_model = get_api_model_name(model)
        
        payload = {
            "model": api_model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": stream
        }
        
        if tools:
            payload["tools"] = tools
        
        try:
            response = await self.client.post("/chat/completions", json=payload)
            response.raise_for_status()
            result = response.json()
            
            return {
                "content": result["choices"][0]["message"]["content"],
                "tool_calls": result["choices"][0]["message"].get("tool_calls", []),
                "usage": result.get("usage", {}),
                "model": model,
                "api_model_name": api_model
            }
            
        except httpx.HTTPStatusError as e:
            logger.error(
                "moonshot_api_error",
                status_code=e.response.status_code,
                error=str(e)
            )
            raise
        except Exception as e:
            logger.error("moonshot_generate_error", error=str(e))
            raise
    
    async def generate_stream(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> AsyncGenerator[str, None]:
        """스트리밍 생성 (Server-Sent Events)"""
        api_model = get_api_model_name(model)
        
        payload = {
            "model": api_model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": True
        }
        
        try:
            async with self.client.stream(
                "POST",
                "/chat/completions",
                json=payload,
                headers={"Accept": "text/event-stream"}
            ) as response:
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data = line[6:]
                        if data == "[DONE]":
                            break
                        try:
                            chunk = json.loads(data)
                            delta = chunk["choices"][0]["delta"].get("content", "")
                            if delta:
                                yield delta
                        except json.JSONDecodeError:
                            continue
        except Exception as e:
            logger.error("moonshot_stream_error", error=str(e))
            raise
    
    async def health_check(self) -> bool:
        """Moonshot API 헬스 체크"""
        try:
            response = await self.client.get("/models")
            return response.status_code == 200
        except Exception as e:
            logger.error("moonshot_health_check_failed", error=str(e))
            return False


class AnthropicProvider(AIProvider):
    """Anthropic (Claude) API Provider"""
    
    def __init__(self):
        self.base_url = settings.ANTHROPIC_BASE_URL
        self.api_key = settings.ANTHROPIC_API_KEY
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            headers={
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01"
            },
            timeout=60.0
        )
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((httpx.TimeoutException, httpx.NetworkError))
    )
    async def generate(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        tools: Optional[List[Dict]] = None,
        stream: bool = False
    ) -> Dict[str, Any]:
        """Claude 모델로 텍스트 생성"""
        api_model = get_api_model_name(model)
        
        # Anthropic 메시지 형식 변환
        system_msg = ""
        claude_messages = []
        for msg in messages:
            if msg["role"] == "system":
                system_msg = msg["content"]
            else:
                claude_messages.append(msg)
        
        payload = {
            "model": api_model,
            "messages": claude_messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": stream
        }
        
        if system_msg:
            payload["system"] = system_msg
        
        if tools:
            payload["tools"] = tools
        
        try:
            response = await self.client.post("/v1/messages", json=payload)
            response.raise_for_status()
            result = response.json()
            
            return {
                "content": result["content"][0]["text"],
                "tool_calls": result.get("stop_reason") == "tool_use",
                "usage": result.get("usage", {}),
                "model": model,
                "api_model_name": api_model
            }
            
        except httpx.HTTPStatusError as e:
            logger.error(
                "anthropic_api_error",
                status_code=e.response.status_code,
                error=str(e)
            )
            raise
        except Exception as e:
            logger.error("anthropic_generate_error", error=str(e))
            raise
    
    async def generate_stream(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> AsyncGenerator[str, None]:
        """스트리밍 생성"""
        # Claude 스트리밍 구현
        yield "Claude streaming not yet implemented"
    
    async def health_check(self) -> bool:
        """Anthropic API 헬스 체크"""
        try:
            response = await self.client.get("/v1/models")
            return response.status_code == 200
        except Exception as e:
            logger.error("anthropic_health_check_failed", error=str(e))
            return False


# Provider 인스턴스 관리
_providers: Dict[str, AIProvider] = {}


def get_provider(model_family: str) -> AIProvider:
    """모델 패밀리별 Provider 반환"""
    if model_family not in _providers:
        if model_family.startswith("kimi"):
            _providers[model_family] = MoonshotProvider()
        elif model_family.startswith("claude"):
            _providers[model_family] = AnthropicProvider()
        else:
            # 기본값: Moonshot
            _providers[model_family] = MoonshotProvider()
    
    return _providers[model_family]


def get_provider_for_model(model: str) -> AIProvider:
    """모델명으로 Provider 반환"""
    if model.startswith("kimi"):
        return get_provider("kimi")
    elif model.startswith("claude"):
        return get_provider("claude")
    else:
        return get_provider("kimi")  # 기본값