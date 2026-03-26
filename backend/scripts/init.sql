-- 요양레이다 초기 데이터베이스 스키마

-- 기관 정보
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE,
    type VARCHAR(50), -- 방문요양, 주야간보호, 복합
    address TEXT,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 수급자 정보
CREATE TABLE recipients (
    id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES institutions(id),
    recipient_code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    grade INTEGER CHECK (grade BETWEEN 1 AND 4),
    birth_date DATE,
    gender VARCHAR(10),
    address TEXT,
    contact VARCHAR(50),
    care_start_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 제공 기록 (원본 데이터)
CREATE TABLE service_records (
    id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES institutions(id),
    recipient_id INTEGER REFERENCES recipients(id),
    service_date DATE NOT NULL,
    service_code VARCHAR(20) NOT NULL, -- 행위코드
    service_name VARCHAR(100),
    start_time TIME,
    end_time TIME,
    duration_minutes INTEGER,
    provider_name VARCHAR(100),
    provider_type VARCHAR(50), -- 요양보호사, 가족 등
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 청구 기록
CREATE TABLE claim_records (
    id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES institutions(id),
    recipient_id INTEGER REFERENCES recipients(id),
    claim_month DATE NOT NULL,
    service_code VARCHAR(20) NOT NULL,
    service_count INTEGER DEFAULT 0,
    unit_price INTEGER DEFAULT 0,
    total_amount INTEGER DEFAULT 0,
    claimed_amount INTEGER DEFAULT 0, -- 실제 청구액
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 분석 실행 기록
CREATE TABLE analysis_runs (
    id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES institutions(id),
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    total_claims INTEGER DEFAULT 0,
    total_amount INTEGER DEFAULT 0,
    omission_count INTEGER DEFAULT 0,
    omission_amount INTEGER DEFAULT 0,
    recovery_potential INTEGER DEFAULT 0,
    raw_data_file VARCHAR(255),
    metadata JSONB
);

-- 누락/오류 상세
CREATE TABLE omission_details (
    id SERIAL PRIMARY KEY,
    analysis_id INTEGER REFERENCES analysis_runs(id),
    recipient_id INTEGER REFERENCES recipients(id),
    rule_id VARCHAR(20) NOT NULL, -- R001, R002, R004 등
    rule_name VARCHAR(100),
    omission_type VARCHAR(50),
    description TEXT,
    service_date DATE,
    expected_recovery INTEGER DEFAULT 0,
    confidence DECIMAL(3,2) DEFAULT 0.95,
    suggested_action TEXT,
    is_reviewed BOOLEAN DEFAULT FALSE,
    is_actioned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 공휴일 테이블
CREATE TABLE holidays (
    id SERIAL PRIMARY KEY,
    holiday_date DATE NOT NULL UNIQUE,
    name VARCHAR(100),
    is_weekend BOOLEAN DEFAULT FALSE,
    year INTEGER
);

-- 인덱스 생성
CREATE INDEX idx_recipients_institution ON recipients(institution_id);
CREATE INDEX idx_service_records_date ON service_records(service_date);
CREATE INDEX idx_service_records_recipient ON service_records(recipient_id);
CREATE INDEX idx_claim_records_month ON claim_records(claim_month);
CREATE INDEX idx_omission_analysis ON omission_details(analysis_id);

-- 샘플 기관 데이터
INSERT INTO institutions (name, code, type, address) VALUES 
('행복재가복지센터', 'INST001', '방문요양+주야간보호', '경기도 수원시 권선구'),
('희망요양서비스', 'INST002', '방문요양', '서울특별시 강남구');

-- 2026년 공휴일 데이터 삽입
INSERT INTO holidays (holiday_date, name, year) VALUES
('2026-01-01', '신정', 2026),
('2026-02-16', '설날', 2026),
('2026-02-17', '설날 연휴', 2026),
('2026-03-01', '삼일절', 2026),
('2026-05-05', '어린이날', 2026),
('2026-05-24', '부처님오신날', 2026),
('2026-06-06', '현충일', 2026),
('2026-08-15', '광복절', 2026),
('2026-09-25', '추석', 2026),
('2026-09-26', '추석 연휴', 2026),
('2026-10-03', '개천절', 2026),
('2026-10-09', '한글날', 2026),
('2026-12-25', '크리스마스', 2026);