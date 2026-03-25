"""
LIDER 데이터베이스 엔진 및 세션 관리
SQLAlchemy 2.0 비동기 지원 (SQLite/PostgreSQL 호환)
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator

from core.config import settings


class Base(DeclarativeBase):
    """ORM 기본 클래스"""
    pass


# 데이터베이스 타입 감지
IS_SQLITE = "sqlite" in str(settings.DATABASE_URL).lower()

# 비동기 엔진 생성
if IS_SQLITE:
    # SQLite: 단순 설정
    engine = create_async_engine(
        str(settings.DATABASE_URL),
        echo=settings.DEBUG,
        future=True
    )
else:
    # PostgreSQL: 풀 설정
    engine = create_async_engine(
        str(settings.DATABASE_URL),
        pool_size=settings.DATABASE_POOL_SIZE,
        max_overflow=settings.DATABASE_MAX_OVERFLOW,
        echo=settings.DEBUG,
        future=True
    )

# 비동기 세션 팩토리
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """의존성 주입용 DB 세션 생성기"""
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
