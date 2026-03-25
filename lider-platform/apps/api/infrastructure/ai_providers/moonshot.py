"""
Moonshot AI Provider 구현
Clean Architecture - 인프라 레이어
"""
import httpx
from typing import Dict, List, Any, Optional

from infrastructure.ai_providers.base import AIProvider, GenerationResult
from infrastructure.config.model_config import get_api_model_name


class MoonshotProvider(AIProvider):
    """Moonshot AI 제공자"""
    
    def __init__(self, api_key: str, base_url: str = "https://api.moonshot.cn/v1"):
        super().__init__(api_key, base_url)
        self.client = httpx.AsyncClient(
            base_url=base_url,
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=60.0
        )
    
    @property
    def provider_name(self) -> str:
        return "moonshot"
    
    async def generate(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        tools: Optional[List[Dict]] = None
    ) -> GenerationResult:
        """Moonshot API 호출"""
        api_model = get_api_model_name(model)
        
        payload = {
            "model": api_model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        if tools:
            payload["tools"] = tools
        
        try:
            response = await self.client.post("/chat/completions", json=payload)
            response.raise_for_status()
            data = response.json()
            
            choice = data["choices"][0]
            usage = data.get("usage", {})
            
            return GenerationResult(
                content=choice["message"]["content"],
                api_model_name=api_model,
                usage={
                    "prompt_tokens": usage.get("prompt_tokens", 0),
                    "completion_tokens": usage.get("completion_tokens", 0),
                    "total_tokens": usage.get("total_tokens", 0)
                },
                finish_reason=choice.get("finish_reason")
            )
        except httpx.HTTPStatusError as e:
            raise Exception(f"Moonshot API error: {e.response.text}")
        except Exception as e:
            raise Exception(f"Moonshot generation failed: {str(e)}")
    
    async def health_check(self) -> bool:
        """API 상태 체크"""
        try:
            response = await self.client.get("/models")
            return response.status_code == 200
        except:
            return False
