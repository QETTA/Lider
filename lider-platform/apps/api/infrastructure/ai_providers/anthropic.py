"""
Anthropic AI Provider 구현
Clean Architecture - 인프라 레이어
"""
import httpx
from typing import Dict, List, Any, Optional

from infrastructure.ai_providers.base import AIProvider, GenerationResult
from infrastructure.config.model_config import get_api_model_name


class AnthropicProvider(AIProvider):
    """Anthropic AI 제공자"""
    
    def __init__(self, api_key: str, base_url: str = "https://api.anthropic.com"):
        super().__init__(api_key, base_url)
        self.client = httpx.AsyncClient(
            base_url=base_url,
            headers={
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01"
            },
            timeout=60.0
        )
    
    @property
    def provider_name(self) -> str:
        return "anthropic"
    
    async def generate(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        tools: Optional[List[Dict]] = None
    ) -> GenerationResult:
        """Anthropic API 호출"""
        api_model = get_api_model_name(model)
        
        # 메시지 형식 변환 (Anthropic 형식)
        system_msg = next((m["content"] for m in messages if m["role"] == "system"), "")
        user_messages = [m for m in messages if m["role"] != "system"]
        
        payload = {
            "model": api_model,
            "messages": user_messages,
            "system": system_msg,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        if tools:
            payload["tools"] = tools
        
        try:
            response = await self.client.post("/v1/messages", json=payload)
            response.raise_for_status()
            data = response.json()
            
            content = ""
            if data.get("content"):
                content = data["content"][0].get("text", "")
            
            usage = data.get("usage", {})
            
            return GenerationResult(
                content=content,
                api_model_name=api_model,
                usage={
                    "prompt_tokens": usage.get("input_tokens", 0),
                    "completion_tokens": usage.get("output_tokens", 0),
                    "total_tokens": usage.get("input_tokens", 0) + usage.get("output_tokens", 0)
                },
                finish_reason=data.get("stop_reason")
            )
        except httpx.HTTPStatusError as e:
            raise Exception(f"Anthropic API error: {e.response.text}")
        except Exception as e:
            raise Exception(f"Anthropic generation failed: {str(e)}")
    
    async def health_check(self) -> bool:
        """API 상태 체크"""
        try:
            response = await self.client.get("/v1/models")
            return response.status_code == 200
        except:
            return False
