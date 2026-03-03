from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# ----------------------------
# User Model
# ----------------------------
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    about = Column(Text)
    role = Column(String, default="USER")
    posts = relationship("Post", back_populates="author")

# ----------------------------
# Post Model
# ----------------------------
class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    heading = Column(String)
    body = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    createdAt = Column(DateTime, default=datetime.utcnow)

    author = relationship("User", back_populates="posts")
    likes = relationship("Like", back_populates="post")
    comments = relationship("Comment", back_populates="post")

# ----------------------------
# Like Model
# ----------------------------
class Like(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("posts.id"))
    post = relationship("Post", back_populates="likes")

# ----------------------------
# Comment Model
# ----------------------------
# class Comment(Base):
#     __tablename__ = "comments"
#     id = Column(Integer, primary_key=True, index=True)
#     body = Column(Text)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     post_id = Column(Integer, ForeignKey("posts.id"))
#     post = relationship("Post", back_populates="comments")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    body = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("posts.id"))

    # Crucial: Add this so we can fetch user details with the comment
    user = relationship("User") 
    post = relationship("Post", back_populates="comments")

# ----------------------------
# MailRecord Model
# ----------------------------
class MailRecord(Base):
    __tablename__ = "mail_records"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    sent_at = Column(DateTime, default=datetime.utcnow)