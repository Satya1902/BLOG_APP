# app/controllers/singlepost_controller.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import models

def all_likes_of_one_post(db: Session, post_id: int):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    # return likes with user info
    return post.likes

def all_comments_of_one_post(db: Session, post_id: int):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post.comments