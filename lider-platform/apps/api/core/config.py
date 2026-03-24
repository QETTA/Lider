"""
LIDER 설정 관리
Pydantic Settings 기반 환경 설정
"""
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field, PostgresDsn, RedisDsn


class Settings(BaseSettings):
    """애플리케이션 설정"""
    
    # 기본 설정
    APP_NAME: str = "LIDER AI Platform"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", pattern=r"^(development|staging|production)$")
    DEBUG: bool = Field(default=False)
    
    # 서버 설정
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    LOG_LEVEL: str = "INFO"
    
    # 데이터베이스 설정
    DATABASE_URL: PostgresDsn = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/lider"
    )
    DATABASE_POOL_SIZE: int = 20
    DATABASE_MAX_OVERFLOW: int = 10
    
    # Redis 설정
    REDIS_URL: RedisDsn = Field(default="redis://localhost:6379/0")
    REDIS_POOL_SIZE: int = 50
    
    # API Keys
    MOONSHOT_API_KEY: Optional[str] = None
    MOONSHOT_BASE_URL: str = "https://api.moonshot.cn/v1"
    
    ANTHROPIC_API_KEY: Optional[str] = None
    ANTHROPIC_BASE_URL: str = "https://api.anthropic.com"
    
    # 보안 설정
    SECRET_KEY: str = Field(default="your-secret-key-here-change-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_BURST: int = 10
    
    # CORS
    CORS_ORIGINS: List[str] = Field(default=["*"])
    
    # 모델 라우팅 설정
    DEFAULT_MODEL: str = "kimi-k2-0905"
    FALLBACK_MODEL: str = "claude-sonnet-4-6"
    MAX_RETRIES: int = 3
    TIMEOUT_SECONDS: int = 30
    
    # 캐싱 TTL (초)
    CACHE_TTL_SESSION: int = 7200  # 2시간
    CACHE_TTL_PERMISSIONS: int = 900  # 15분
    CACHE_TTL_TOOL_RESULT: int = 300  # 5분
    CACHE_TTL_MODEL_RESPONSE: int = 3600  # 1시간
    
    # 품질 임계값
    JSON_VALID_RATE_THRESHOLD: float = 0.98
    FALLBACK_RATE_THRESHOLD: float = 0.20
    GROUNDED_ANSWER_THRESHOLD: float = 0.95
    
    # 파일 업로드
    MAX_FILE_SIZE_MB: int = 50
    UPLOAD_DIR: str = "/tmp/lider-uploads"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# 전역 설정 인스턴스
settings = Settings()


# 모델명 매핑 (내부 축약형 → API 공식 명칭)
MODEL_NAME_MAP = {
    "kimi-k2-0905": "kimi-k2-0905-preview",
    "kimi-k2-thinking": "kimi-k2-thinking",
    "kimi-k2.5": "kimi-k2.5",
    "claude-sonnet-4-6": "claude-sonnet-4-6",
}


def get_api_model_name(internal_name: str) -> str:
    """내부 축약형 모델명을 API 공식 명칭으로 변환"""
    return MODEL_NAME_MAP.get(internal_name, internal_name)


def get_internal_model_name(api_name: str) -> str:
    """API 공식 명칭을 내부 축약형으로 역변환"""
    reverse_map = {v: k for k, v in MODEL_NAME_MAP.items()}
    return reverse_map.get(api_name, api_name)
