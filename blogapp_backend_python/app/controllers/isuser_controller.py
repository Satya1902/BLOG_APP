# app/controllers/isuser_controller.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import models

def is_user_liked_the_post(db: Session, user_id: int, post_id: int):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    like = db.query(models.Like).filter(models.Like.post_id == post_id, models.Like.user_id == user_id).first()
    return bool(like)