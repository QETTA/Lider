from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, Text, ForeignKey, Numeric, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Institution(Base):
    __tablename__ = "institutions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True)
    type = Column(String(50))
    address = Column(Text)
    phone = Column(String(50))
    created_at = Column(DateTime, default=Base.metadata.bind)
    updated_at = Column(DateTime)
    
    recipients = relationship("Recipient", back_populates="institution")

class Recipient(Base):
    __tablename__ = "recipients"
    
    id = Column(Integer, primary_key=True, index=True)
    institution_id = Column(Integer, ForeignKey("institutions.id"))
    recipient_code = Column(String(50), nullable=False)
    name = Column(String(100), nullable=False)
    grade = Column(Integer)
    birth_date = Column(Date)
    gender = Column(String(10))
    address = Column(Text)
    contact = Column(String(50))
    care_start_date = Column(Date)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime)
    
    institution = relationship("Institution", back_populates="recipients")

class ServiceRecord(Base):
    __tablename__ = "service_records"
    
    id = Column(Integer, primary_key=True, index=True)
    institution_id = Column(Integer, ForeignKey("institutions.id"))
    recipient_id = Column(Integer, ForeignKey("recipients.id"))
    service_date = Column(Date, nullable=False)
    service_code = Column(String(20), nullable=False)
    service_name = Column(String(100))
    start_time = Column(String(10))
    end_time = Column(String(10))
    duration_minutes = Column(Integer)
    provider_name = Column(String(100))
    provider_type = Column(String(50))
    notes = Column(Text)
    created_at = Column(DateTime)

class AnalysisRun(Base):
    __tablename__ = "analysis_runs"
    
    id = Column(Integer, primary_key=True, index=True)
    institution_id = Column(Integer, ForeignKey("institutions.id"))
    analysis_date = Column(DateTime)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    status = Column(String(50), default='completed')
    total_claims = Column(Integer, default=0)
    total_amount = Column(Integer, default=0)
    omission_count = Column(Integer, default=0)
    omission_amount = Column(Integer, default=0)
    recovery_potential = Column(Integer, default=0)
    raw_data_file = Column(String(255))
    metadata = Column(JSON)

class OmissionDetail(Base):
    __tablename__ = "omission_details"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis_runs.id"))
    recipient_id = Column(Integer, ForeignKey("recipients.id"))
    rule_id = Column(String(20), nullable=False)
    rule_name = Column(String(100))
    omission_type = Column(String(50))
    description = Column(Text)
    service_date = Column(Date)
    expected_recovery = Column(Integer, default=0)
    confidence = Column(Numeric(3, 2), default=0.95)
    suggested_action = Column(Text)
    is_reviewed = Column(Boolean, default=False)
    is_actioned = Column(Boolean, default=False)
    created_at = Column(DateTime)

class Holiday(Base):
    __tablename__ = "holidays"
    
    id = Column(Integer, primary_key=True, index=True)
    holiday_date = Column(Date, unique=True, nullable=False)
    name = Column(String(100))
    is_weekend = Column(Boolean, default=False)
    year = Column(Integer)
