# app/controllers/signup_controller.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import models

def store_otp(db: Session, email: str, otp: int):
    try:
        record = models.OTP(email=email, otp=otp)
        db.add(record)
        db.commit()
        db.refresh(record)
        return record
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))