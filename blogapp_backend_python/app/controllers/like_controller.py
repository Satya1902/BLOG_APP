# app/controllers/like_controller.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import models

def create_like(db: Session, post_id: int, user_id: int):
    try:
        like = models.Like(post_id=post_id, user_id=user_id)
        db.add(like)
        db.commit()
        db.refresh(like)
        return like
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def delete_like(db: Session, post_id: int, user_id: int):
    try:
        like = db.query(models.Like).filter(models.Like.post_id == post_id, models.Like.user_id == user_id).first()
        if like:
            db.delete(like)
            db.commit()
            return like
        return None
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def toggle_like(db: Session, post_id: int, user_id: int):
    existing = db.query(models.Like).filter(models.Like.post_id == post_id, models.Like.user_id == user_id).first()
    if existing:
        db.delete(existing)
        db.commit()
        return {"message": "Unliked"}
    new_like = models.Like(post_id=post_id, user_id=user_id)
    db.add(new_like)
    db.commit()
    return {"message": "Liked"}