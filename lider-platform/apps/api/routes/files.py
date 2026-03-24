"""
File Upload/Management API Routes
"""
import os
import uuid
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.database import get_db

router = APIRouter()


@router.post("/files/upload", response_model=dict, tags=["Files"])
async def upload_file(
    file: UploadFile = File(...),
    user_id: str = "",
    db: AsyncSession = Depends(get_db)
):
    """파일 업로드"""
    # 파일 크기 검사
    contents = await file.read()
    file_size = len(contents)
    
    if file_size > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Max size: {settings.MAX_FILE_SIZE_MB}MB"
        )
    
    # 파일 확장자 검사
    allowed_extensions = {'.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.txt', '.csv'}
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed: {allowed_extensions}"
        )
    
    # 저장 경로 생성
    upload_dir = settings.UPLOAD_DIR
    os.makedirs(upload_dir, exist_ok=True)
    
    file_id = f"file_{uuid.uuid4().hex[:16]}"
    file_path = os.path.join(upload_dir, f"{file_id}{file_ext}")
    
    # 파일 저장
    with open(file_path, "wb") as f:
        f.write(contents)
    
    # 파일 URL 생성
    file_url = f"https://storage.lider.ai/files/{file_id}{file_ext}"
    
    return {
        "success": True,
        "data": {
            "file_id": file_id,
            "file_name": file.filename,
            "file_url": file_url,
            "file_type": file_ext[1:],
            "file_size": file_size,
            "uploaded_at": datetime.utcnow().isoformat()
        },
        "meta": {
            "request_id": f"req_{file_id}",
            "timestamp": datetime.utcnow().isoformat()
        }
    }
