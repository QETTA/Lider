from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import pandas as pd
import io
from datetime import date, datetime

from app.database import get_db, engine
from app import models, schemas
from app.core.rule_engine import RuleEngine
from app.core.calculator import Calculator
from app.utils.holiday_util import HolidayUtil

# DB 테이블 생성
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="요양레이다 API",
    description="장기요양기관 수급 청구 누락 검출 시스템",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일 (업로드된 파일 접근)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 전역 유틸리티 초기화
holiday_util = HolidayUtil()
calculator = Calculator()

@app.get("/")
def root():
    return {"message": "요양레이다 API", "version": "1.0.0", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# ===== 기관 관리 =====
@app.post("/v1/institutions", response_model=schemas.InstitutionResponse)
def create_institution(institution: schemas.InstitutionCreate, db: Session = Depends(get_db)):
    db_inst = models.Institution(**institution.dict())
    db.add(db_inst)
    db.commit()
    db.refresh(db_inst)
    return db_inst

@app.get("/v1/institutions", response_model=List[schemas.InstitutionResponse])
def list_institutions(db: Session = Depends(get_db)):
    return db.query(models.Institution).all()

# ===== 데이터 업로드 (0순위 핵심) =====
@app.post("/v1/upload/csv")
async def upload_csv(
    institution_id: int = Form(...),
    file: UploadFile = File(...),
    mapping: Optional[str] = Form(None),  # JSON string of column mapping
    db: Session = Depends(get_db)
):
    """
    CSV/Excel 파일 업로드 및 분석 시작
    0순위: R004(식사별도), R002(연속제공), R001(야간공휴일) 자동 검출
    """
    try:
        # 파일 읽기
        contents = await file.read()
        
        # CSV 또는 Excel 판단
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(contents))
        else:
            raise HTTPException(400, "CSV 또는 Excel 파일만 지원합니다")
        
        # 데이터 검증
        if len(df) == 0:
            raise HTTPException(400, "업로드된 파일이 비어있습니다")
        
        # 분석 실행 (Rule Engine)
        rule_engine = RuleEngine(db, holiday_util, calculator)
        result = await rule_engine.analyze_data(institution_id, df, mapping)
        
        return {
            "status": "success",
            "analysis_id": result["analysis_id"],
            "total_records": len(df),
            "omissions_found": result["omission_count"],
            "recovery_potential": result["recovery_potential"],
            "top_rules": result["rule_breakdown"]
        }
        
    except Exception as e:
        raise HTTPException(500, f"분석 중 오류: {str(e)}")

# ===== 분석 결과 조회 =====
@app.get("/v1/results/{analysis_id}", response_model=schemas.AnalysisResult)
def get_analysis_result(analysis_id: int, db: Session = Depends(get_db)):
    """분석 결과 상세 조회"""
    analysis = db.query(models.AnalysisRun).filter(models.AnalysisRun.id == analysis_id).first()
    if not analysis:
        raise HTTPException(404, "분석 결과를 찾을 수 없습니다")
    
    omissions = db.query(models.OmissionDetail).filter(
        models.OmissionDetail.analysis_id == analysis_id
    ).all()
    
    return {
        "analysis_id": analysis.id,
        "institution_id": analysis.institution_id,
        "analysis_date": analysis.analysis_date,
        "period_start": analysis.period_start,
        "period_end": analysis.period_end,
        "summary": {
            "total_claims": analysis.total_claims,
            "total_amount": analysis.total_amount,
            "omission_count": analysis.omission_count,
            "omission_amount": analysis.omission_amount,
            "recovery_potential": analysis.recovery_potential
        },
        "omissions": omissions
    }

@app.get("/v1/results/{analysis_id}/summary")
def get_analysis_summary(analysis_id: int, db: Session = Depends(get_db)):
    """분석 결과 요약 (대시보드용)"""
    analysis = db.query(models.AnalysisRun).filter(models.AnalysisRun.id == analysis_id).first()
    if not analysis:
        raise HTTPException(404, "분석 결과를 찾을 수 없습니다")
    
    # 규칙별 집계
    rule_stats = db.query(
        models.OmissionDetail.rule_id,
        models.OmissionDetail.rule_name,
        db.func.count(models.OmissionDetail.id).label('count'),
        db.func.sum(models.OmissionDetail.expected_recovery).label('total')
    ).filter(
        models.OmissionDetail.analysis_id == analysis_id
    ).group_by(
        models.OmissionDetail.rule_id,
        models.OmissionDetail.rule_name
    ).all()
    
    return {
        "analysis_id": analysis_id,
        "period": f"{analysis.period_start} ~ {analysis.period_end}",
        "summary": {
            "total_claims": analysis.total_claims,
            "recovery_potential": analysis.recovery_potential,
            "omission_count": analysis.omission_count
        },
        "by_rule": [
            {"rule_id": r.rule_id, "rule_name": r.rule_name, "count": r.count, "amount": r.total}
            for r in rule_stats
        ]
    }

# ===== Action Preview (Lider 패턴 적용) =====
@app.post("/v1/preview/{omission_id}")
def preview_action(omission_id: int, db: Session = Depends(get_db)):
    """
    누락 수정 Preview
    실행 전 확인용 (Lider Action Preview 패턴)
    """
    omission = db.query(models.OmissionDetail).filter(
        models.OmissionDetail.id == omission_id
    ).first()
    
    if not omission:
        raise HTTPException(404, "누락 항목을 찾을 수 없습니다")
    
    # 수정 제안 생성
    preview = {
        "omission_id": omission_id,
        "type": omission.omission_type,
        "description": omission.description,
        "current_state": "청구 누락",
        "suggested_change": omission.suggested_action,
        "financial_impact": omission.expected_recovery,
        "risks": [],
        "requires_confirmation": True,
        "allowed": True
    }
    
    # 위험도에 따른 경고 추가
    if omission.rule_id in ["R005"]:
        preview["risks"].append("과다청구로 인한 환수 가능성")
    
    return preview

# ===== 수급자 관리 =====
@app.get("/v1/recipients")
def list_recipients(institution_id: int, db: Session = Depends(get_db)):
    recipients = db.query(models.Recipient).filter(
        models.Recipient.institution_id == institution_id
    ).all()
    return recipients

# ===== 공휴일 관리 =====
@app.get("/v1/holidays")
def get_holidays(year: int = datetime.now().year, db: Session = Depends(get_db)):
    holidays = db.query(models.Holiday).filter(models.Holiday.year == year).all()
    return holidays

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)