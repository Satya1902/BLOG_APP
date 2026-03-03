from sqlalchemy.orm import Session, joinedload
from .. import models

def create_comment(db: Session, post_id: int, user_id: int, body: str):
    # 1. Create and save
    comment = models.Comment(post_id=post_id, user_id=user_id, body=body)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    
    # 2. Return with user details joined (for frontend display)
    return db.query(models.Comment)\
             .options(joinedload(models.Comment.user))\
             .filter(models.Comment.id == comment.id)\
             .first()