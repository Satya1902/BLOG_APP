# app/controllers/update_controller.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import models

def update_post_add_comment(db: Session, post_id: int, comment_id: int):
    try:
        post = db.query(models.Post).filter(models.Post.id == post_id).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        # Because relationship is configured, adding comment already links by comment.post_id
        # We return the post with refreshed relations
        db.refresh(post)
        return post
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def update_post_add_like(db: Session, post_id: int, like_id: int):
    try:
        post = db.query(models.Post).filter(models.Post.id == post_id).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        db.refresh(post)
        return post
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))