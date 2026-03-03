from sqlalchemy.orm import Session
from .. import models

def get_all_posts(db: Session):
    return db.query(models.Post).all()

def create_post(db: Session, heading: str, body: str, user_id: int):
    new_post = models.Post(heading=heading, body=body, user_id=user_id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

def toggle_like(db: Session, post_id: int, user_id: int):
    existing_like = db.query(models.Like).filter(
        models.Like.post_id == post_id, 
        models.Like.user_id == user_id
    ).first()
    
    if existing_like:
        db.delete(existing_like)
        db.commit()
        return {"message": "Unliked"}
    
    new_like = models.Like(post_id=post_id, user_id=user_id)
    db.add(new_like)
    db.commit()
    return {"message": "Liked"}