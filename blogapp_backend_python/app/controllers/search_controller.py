# app/controllers/search_controller.py
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from sqlalchemy import or_
from .. import models

def search_posts(db: Session, query_str: str):
    """
    Search posts by heading (case-insensitive) and return
    full post details with author, likes, and comments preloaded.
    """
    try:
        results = (
            db.query(models.Post)
            .options(
                joinedload(models.Post.author),                                # include author info
                joinedload(models.Post.likes).joinedload(models.Like.user),    # include users who liked
                joinedload(models.Post.comments).joinedload(models.Comment.user)  # include comments with users
            )
            .filter(models.Post.heading.ilike(f"%{query_str}%"))
            .all()
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))