# app/controllers/search_controller.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import or_
from .. import models

def search_posts(db: Session, query_str: str):
    try:
        results = db.query(models.Post).filter(models.Post.heading.ilike(f"%{query_str}%")).all()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))