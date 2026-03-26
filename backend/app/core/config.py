"""
애플리케이션 설정 (Pydantic Settings)
"""

from typing import List
from pydantic_settings import BaseSettings
from pydantic import validator


class Settings(BaseSettings):
    """애플리케이션 설정"""
    
    # 기본 설정
    DEBUG: bool = True
    ENV: str = "development"
    
    # 서버 설정
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # 보안 설정
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1일
    ALGORITHM: str = "HS256"
    
    # 데이터베이스 설정
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/yoyangradar"
    
    # Redis 설정
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS 설정
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # 파일 업로드 설정
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "./uploads"
    
    @validator("CORS_ORIGINS", pre=True)
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 설정 인스턴스 생성
settings = Settings()
