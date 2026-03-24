"""
Pytest Configuration
테스트 공통 설정 및 Fixture
"""
import pytest
import asyncio
from typing import AsyncGenerator, Generator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.pool import NullPool

from core.database import Base
from core.config import settings

# 테스트용 데이터베이스 URL
TEST_DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/lider_test"

# 테스트용 엔진
engine = create_async_engine(
    TEST_DATABASE_URL,
    poolclass=NullPool,
    echo=False
)

# 테스트용 세션 팩토리
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session", autouse=True)
async def setup_database():
    """테스트 데이터베이스 테이블 생성"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture(scope="function")
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """테스트용 DB 세션 제공"""
    async with async_session_maker() as session:
        yield session
        await session.rollback()


@pytest.fixture
def sample_user():
    """테스트용 사용자 데이터"""
    return {
        "id": "test_user_001",
        "email": "test@example.com",
        "org_id": "org_test_001",
        "role": "user"
    }


@pytest.fixture
def sample_session():
    """테스트용 세션 데이터"""
    return {
        "user_id": "test_user_001",
        "org_id": "org_test_001",
        "context": {"source": "test"}
    }


@pytest.fixture
def mock_extract_request():
    """테스트용 추출 요청 데이터"""
    return {
        "file_url": "https://example.com/test.pdf",
        "extraction_type": "invoice",
        "output_schema": {
            "type": "object",
            "properties": {
                "invoice_number": {"type": "string"},
                "total": {"type": "number"}
            }
        },
        "locale": "ko-KR"
    }


@pytest.fixture
def mock_action_request():
    """테스트용 액션 미리보기 요청"""
    return {
        "user_id": "test_user_001",
        "org_id": "org_test_001",
        "action_type": "ticket_close",
        "target_system": "zendesk",
        "parameters": {
            "ticket_id": "12345",
            "resolution": "해결 완료"
        },
        "locale": "ko-KR"
    }
