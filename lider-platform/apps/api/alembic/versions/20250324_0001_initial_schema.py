"""
Initial LIDER Schema

Revision ID: 20250324_0001
Revises: 
Create Date: 2025-03-24 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '20250324_0001'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """LIDER AI Platform 초기 데이터베이스 스키마 생성"""
    
    # 사용자 테이블
    op.create_table(
        'users',
        sa.Column('id', sa.String(255), primary_key=True),
        sa.Column('external_id', sa.String(255), unique=True, nullable=True),
        sa.Column('org_id', sa.String(255), nullable=False, index=True),
        sa.Column('email', sa.String(255), unique=True, nullable=False),
        sa.Column('role', sa.String(50), nullable=False, server_default='user'),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('total_requests', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('total_cost_usd', sa.Numeric(10, 4), nullable=False, server_default='0'),
        sa.Column('last_login_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('idx_users_org', 'users', ['org_id'])
    op.create_index('idx_users_email', 'users', ['email'])
    
    # 세션 테이블
    op.create_table(
        'sessions',
        sa.Column('id', sa.String(255), primary_key=True),
        sa.Column('user_id', sa.String(255), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('org_id', sa.String(255), nullable=False),
        sa.Column('context', postgresql.JSONB(astext_type=sa.Text()), default={}),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('idx_sessions_user', 'sessions', ['user_id'])
    op.create_index('idx_sessions_expiry', 'sessions', ['expires_at'])
    
    # 요청 로그 테이블
    op.create_table(
        'request_logs',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('request_id', sa.String(255), unique=True, nullable=False),
        sa.Column('user_id', sa.String(255), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('org_id', sa.String(255), nullable=True, index=True),
        sa.Column('session_id', sa.String(255), nullable=True),
        sa.Column('endpoint', sa.String(255), nullable=False),
        sa.Column('method', sa.String(10), nullable=False),
        sa.Column('model_used', sa.String(100), nullable=True),
        sa.Column('api_model_name', sa.String(100), nullable=True),
        sa.Column('fallback_used', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('total_tokens', sa.Integer(), nullable=True),
        sa.Column('estimated_cost_usd', sa.Numeric(10, 6), nullable=True),
        sa.Column('latency_ms', sa.Integer(), nullable=True),
        sa.Column('validation_result', sa.String(50), nullable=True),
        sa.Column('tool_calls', postgresql.JSONB(astext_type=sa.Text()), default=[]),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
    )
    op.create_index('idx_logs_user_time', 'request_logs', ['user_id', 'created_at'])
    op.create_index('idx_logs_org_time', 'request_logs', ['org_id', 'created_at'])
    op.create_index('idx_logs_created', 'request_logs', ['created_at'])
    
    # 추출 결과 테이블
    op.create_table(
        'extractions',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('request_id', sa.String(255), sa.ForeignKey('request_logs.request_id', ondelete='CASCADE'), nullable=False),
        sa.Column('user_id', sa.String(255), nullable=False),
        sa.Column('file_name', sa.String(500), nullable=True),
        sa.Column('file_type', sa.String(50), nullable=True),
        sa.Column('file_size_bytes', sa.Integer(), nullable=True),
        sa.Column('extracted_data', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('confidence_scores', postgresql.JSONB(astext_type=sa.Text()), default={}),
        sa.Column('confidence_avg', sa.Numeric(3, 2), nullable=True),
        sa.Column('processing_time_ms', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
    )
    op.create_index('idx_extractions_user', 'extractions', ['user_id'])
    op.create_index('idx_extractions_created', 'extractions', ['created_at'])
    
    # 액션 미리보기 테이블
    op.create_table(
        'action_previews',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('preview_id', sa.String(255), unique=True, nullable=False),
        sa.Column('request_id', sa.String(255), nullable=False),
        sa.Column('user_id', sa.String(255), nullable=False),
        sa.Column('action_type', sa.String(100), nullable=False),
        sa.Column('target_system', sa.String(100), nullable=False),
        sa.Column('impact_summary', sa.Text(), nullable=True),
        sa.Column('preconditions_check', postgresql.JSONB(astext_type=sa.Text()), default=[]),
        sa.Column('risks', postgresql.JSONB(astext_type=sa.Text()), default=[]),
        sa.Column('recommendations', postgresql.JSONB(astext_type=sa.Text()), default=[]),
        sa.Column('human_readable_preview', sa.Text(), nullable=True),
        sa.Column('approval_status', sa.String(50), nullable=False, server_default='pending'),
        sa.Column('approved_by', sa.String(255), nullable=True),
        sa.Column('approved_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('auto_execute', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('executed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
    )
    op.create_index('idx_previews_user', 'action_previews', ['user_id'])
    op.create_index('idx_previews_expiry', 'action_previews', ['expires_at'])
    
    # 액션 실행 테이블
    op.create_table(
        'action_executions',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('execution_id', sa.String(255), unique=True, nullable=False),
        sa.Column('preview_id', sa.String(255), sa.ForeignKey('action_previews.preview_id', ondelete='CASCADE'), nullable=False),
        sa.Column('status', sa.String(50), nullable=False, server_default='pending'),
        sa.Column('result', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('rolled_back', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('rollback_info', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('executed_by', sa.String(255), nullable=False),
        sa.Column('executed_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('idx_executions_preview', 'action_executions', ['preview_id'])
    op.create_index('idx_executions_status', 'action_executions', ['status'])
    
    # 배드케이스 테이블
    op.create_table(
        'badcases',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('case_id', sa.String(255), unique=True, nullable=False),
        sa.Column('category', sa.String(100), nullable=False),
        sa.Column('severity', sa.String(20), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('input_snapshot', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('model_output', sa.Text(), nullable=True),
        sa.Column('expected_output', sa.Text(), nullable=True),
        sa.Column('model_used', sa.String(100), nullable=True),
        sa.Column('request_id', sa.String(255), nullable=True),
        sa.Column('status', sa.String(50), nullable=False, server_default='open'),
        sa.Column('assigned_to', sa.String(255), nullable=True),
        sa.Column('root_cause', sa.Text(), nullable=True),
        sa.Column('fix_commit', sa.String(100), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.text('now()')),
        sa.Column('resolved_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index('idx_badcases_status', 'badcases', ['status'])
    op.create_index('idx_badcases_severity', 'badcases', ['severity'])
    op.create_index('idx_badcases_category', 'badcases', ['category'])
    op.create_index('idx_badcases_created', 'badcases', ['created_at'])


def downgrade() -> None:
    """스키마 삭제 (주의: 모든 데이터가 삭제됩니다)"""
    op.drop_table('badcases')
    op.drop_table('action_executions')
    op.drop_table('action_previews')
    op.drop_table('extractions')
    op.drop_table('request_logs')
    op.drop_table('sessions')
    op.drop_table('users')
