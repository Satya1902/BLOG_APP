# app/controllers/singlepost_controller.py
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from .. import models

def all_likes_of_one_post(db: Session, post_id: int):
    """
    Return list of Like objects for a post, with the related User loaded.
    This ensures the frontend receives like.user populated (or an empty relationship).
    """
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Query Like rows and joinload the user to populate like.user
    likes = (
        db.query(models.Like)
          .options(joinedload(models.Like.user))
          .filter(models.Like.post_id == post_id)
          .all()
    )
    return likes

def all_comments_of_one_post(db: Session, post_id: int):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post.comments