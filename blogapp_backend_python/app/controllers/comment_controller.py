from sqlalchemy.orm import Session
from .. import models

def create_comment(db: Session, post_id: int, user_id: int, body: str):
    comment = models.Comment(post_id=post_id, user_id=user_id, body=body)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment