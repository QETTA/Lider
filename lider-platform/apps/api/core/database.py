"""
LIDER 데이터베이스 연결 및 ORM 설정
SQLAlchemy 2.0 비동기 지원 (SQLite/PostgreSQL 호환)
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base, DeclarativeBase
from sqlalchemy import Column, String, DateTime, Text, Float, Integer, Boolean, JSON, ForeignKey, Index, Numeric
from datetime import datetime
import uuid

from core.config import settings


class Base(DeclarativeBase):
    """ORM 기본 클래스"""
    pass


# 데이터베이스 타입 호환성 처리
if "sqlite" in str(settings.DATABASE_URL):
    # SQLite용 타입
    from sqlalchemy import String as UUIDType
    from sqlalchemy import Float as NumericType
    from sqlalchemy import func
    
    def generate_uuid():
        return str(uuid.uuid4())
else:
    # PostgreSQL용 타입
    from sqlalchemy.dialects.postgresql import UUID as UUIDType
    from sqlalchemy.dialects.postgresql import Numeric as NumericType
    
    def generate_uuid():
        return uuid.uuid4()


# 비동기 엔진 생성 (SQLite/PostgreSQL)
database_url = str(settings.DATABASE_URL)
if "sqlite" in database_url:
    engine = create_async_engine(
        database_url,
        echo=settings.DEBUG,
        future=True
    )
else:
    engine = create_async_engine(
        database_url,
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


async def get_db():
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


# ============== 데이터베이스 모델 정의 ==============

class Session(Base):
    """사용자 세션 테이블"""
    __tablename__ = "sessions"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(255), nullable=False, index=True)
    org_id = Column(String(255), nullable=True, index=True)
    context = Column(JSON, default=dict)  # 대화 컨텍스트
    meta_data = Column(JSON, default=dict)   # 추가 메타데이터
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    
    __table_args__ = (
        Index('idx_sessions_user_org', 'user_id', 'org_id'),
        Index('idx_sessions_expires', 'expires_at'),
    )


class RequestLog(Base):
    """API 요청 로그 테이블"""
    __tablename__ = "request_logs"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    request_id = Column(String(64), unique=True, nullable=False, index=True)
    user_id = Column(String(255), nullable=False, index=True)
    org_id = Column(String(255), nullable=True)
    endpoint = Column(String(100), nullable=False, index=True)
    method = Column(String(10), nullable=False)
    
    # 모델 사용 정보
    model_used = Column(String(100), nullable=True)
    api_model_name = Column(String(100), nullable=True)  # API 호출용 전체 명칭
    fallback_used = Column(Boolean, default=False)
    
    # 토큰 사용량
    prompt_tokens = Column(Integer, default=0)
    completion_tokens = Column(Integer, default=0)
    total_tokens = Column(Integer, default=0)
    
    # 비용 및 성능 (SQLite는 Float 사용)
    estimated_cost_usd = Column(Float, default=0)
    latency_ms = Column(Integer, default=0)
    
    # 검증 결과
    validation_result = Column(JSON, default=dict)
    error_code = Column(String(50), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    __table_args__ = (
        Index('idx_logs_user_time', 'user_id', 'created_at'),
        Index('idx_logs_org_time', 'org_id', 'created_at'),
        Index('idx_logs_endpoint_time', 'endpoint', 'created_at'),
    )


class Extraction(Base):
    """문서 추출 결과 테이블"""
    __tablename__ = "extractions"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    request_id = Column(String(64), ForeignKey('request_logs.request_id'), nullable=False)
    user_id = Column(String(255), nullable=False, index=True)
    org_id = Column(String(255), nullable=True)
    
    # 파일 정보
    file_name = Column(String(500), nullable=True)
    file_type = Column(String(50), nullable=True)
    file_size_bytes = Column(Integer, default=0)
    
    # 추출 결과
    extracted_data = Column(JSON, default=dict)
    confidence_scores = Column(JSON, default=dict)
    output_schema_used = Column(String(100), nullable=True)
    
    # 품질 메트릭
    processing_time_ms = Column(Integer, default=0)
    confidence_avg = Column(Float, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        Index('idx_extractions_user', 'user_id', 'created_at'),
        Index('idx_extractions_org', 'org_id', 'created_at'),
    )


class ActionPreview(Base):
    """액션 미리보기 테이블"""
    __tablename__ = "action_previews"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    preview_id = Column(String(64), unique=True, nullable=False, index=True)
    request_id = Column(String(64), ForeignKey('request_logs.request_id'), nullable=False)
    user_id = Column(String(255), nullable=False, index=True)
    
    # 액션 정보
    action_type = Column(String(100), nullable=False)
    target_system = Column(String(100), nullable=False)
    
    # 분석 결과
    impact_summary = Column(Text, nullable=True)
    preconditions_check = Column(JSON, default=dict)
    risks = Column(JSON, default=list)
    recommendations = Column(JSON, default=list)
    human_readable_preview = Column(Text, nullable=True)
    
    # 상태
    approved = Column(Boolean, nullable=True)
    approved_by = Column(String(255), nullable=True)
    approved_at = Column(DateTime, nullable=True)
    executed = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    
    __table_args__ = (
        Index('idx_previews_user', 'user_id', 'created_at'),
    )


class ActionExecution(Base):
    """액션 실행 로그 테이블"""
    __tablename__ = "action_executions"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    execution_id = Column(String(64), unique=True, nullable=False, index=True)
    preview_id = Column(String(64), ForeignKey('action_previews.preview_id'), nullable=True)
    request_id = Column(String(64), ForeignKey('request_logs.request_id'), nullable=False)
    user_id = Column(String(255), nullable=False, index=True)
    
    # 실행 정보
    action_type = Column(String(100), nullable=False)
    target_system = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False, index=True)  # pending, success, failed
    result = Column(JSON, default=dict)
    error_message = Column(Text, nullable=True)
    
    # 롤백 정보
    rollback_available = Column(Boolean, default=False)
    rollback_executed = Column(Boolean, default=False)
    rollback_result = Column(JSON, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    completed_at = Column(DateTime, nullable=True)
    
    __table_args__ = (
        Index('idx_executions_user', 'user_id', 'created_at'),
        Index('idx_executions_status', 'status', 'created_at'),
    )


class BadCase(Base):
    """품질 이슈 배드케이스 테이블"""
    __tablename__ = "badcases"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    case_id = Column(String(64), unique=True, nullable=False, index=True)
    request_id = Column(String(64), ForeignKey('request_logs.request_id'), nullable=True)
    
    # 분류
    category = Column(String(100), nullable=False, index=True)  # json_error, hallucination, etc.
    severity = Column(String(20), nullable=False)  # critical, high, medium, low
    
    # 상세 정보
    description = Column(Text, nullable=False)
    input_snapshot = Column(JSON, default=dict)
    model_output = Column(Text, nullable=True)
    expected_output = Column(Text, nullable=True)
    
    # 처리 상태
    status = Column(String(50), default='open')  # open, investigating, resolved, false_positive
    assigned_to = Column(String(255), nullable=True)
    resolution = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    resolved_at = Column(DateTime, nullable=True)
    
    __table_args__ = (
        Index('idx_badcases_category', 'category', 'status'),
        Index('idx_badcases_severity', 'severity', 'created_at'),
    )


class User(Base):
    """사용자 테이블 (기본 정보)"""
    __tablename__ = "users"
    
    id = Column(String(255), primary_key=True)  # 외부 시스템 ID
    org_id = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default='user')
    
    # 사용량 추적
    total_requests = Column(Integer, default=0)
    total_cost_usd = Column(Float, default=0)
    
    # 상태
    is_active = Column(Boolean, default=True)
    last_login_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    __table_args__ = (
        Index('idx_users_org', 'org_id', 'created_at'),
    )
