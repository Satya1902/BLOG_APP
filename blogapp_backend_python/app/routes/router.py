# app/routes/router.py
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .. import database
from ..controllers import (
    post_actions, comment_controller, like_controller,
    update_controller, singlepost_controller, search_controller, signup_controller,
    user_controller, mail_controller, file_uploader, isuser_controller
)

router = APIRouter(prefix="/api/v1")
get_db = database.get_db

# -------------------- Pydantic Models --------------------
class CreatePostRequest(BaseModel):
    heading: str
    body: str
    user_id: int

class CommentRequest(BaseModel):
    post: int
    body: str
    user: int

class LikeRequest(BaseModel):
    post: int
    user: int

class ToggleLikeRequest(BaseModel):
    post_id: int
    user_id: int

class CreateUserRequest(BaseModel):
    email: str
    firstname: str
    lastname: str
    about: str | None = ""
    password: str
    role: str

class LoginRequest(BaseModel):
    email: str
    password: str

class StoreOtpRequest(BaseModel):
    email: str
    otp: int

class SendMailRequest(BaseModel):
    email: str
    subject: str
    body: str

# -------------------- Routes --------------------

# Posts
@router.get("/getallposts")
def get_all_posts(db: Session = Depends(get_db)):
    posts = post_actions.get_all_posts(db)
    return {"success": True, "allPosts": posts}

@router.post("/createpost")
def create_post(req: CreatePostRequest, db: Session = Depends(get_db)):
    post = post_actions.create_post(db, req.heading, req.body, req.user_id)
    return {"success": True, "savedPost": post}

# Comments
@router.post("/createcomment")
def create_comment(req: CommentRequest, db: Session = Depends(get_db)):
    comment = comment_controller.create_comment(db, req.post, req.user, req.body)
    return {"success": True, "savedComment": comment}

# Likes
@router.post("/createlike")
def create_like(req: LikeRequest, db: Session = Depends(get_db)):
    like = like_controller.create_like(db, req.post, req.user)
    return {"success": True, "savedLike": like}

@router.post("/dislike")
def dislike(req: LikeRequest, db: Session = Depends(get_db)):
    deleted = like_controller.delete_like(db, req.post, req.user)
    return {"success": True, "deletedLike": bool(deleted)}

@router.post("/like/toggle")
def toggle_like(req: ToggleLikeRequest, db: Session = Depends(get_db)):
    result = like_controller.toggle_like(db, req.post_id, req.user_id)
    return {"success": True, "message": result["message"]}

# Single post details
@router.get("/likes")
def get_likes(id: int, db: Session = Depends(get_db)):
    likes = singlepost_controller.all_likes_of_one_post(db, id)
    return {"success": True, "likes": likes}

@router.get("/comments")
def get_comments(id: int, db: Session = Depends(get_db)):
    comments = singlepost_controller.all_comments_of_one_post(db, id)
    return {"success": True, "comments": comments}

# Is user liked this post
@router.get("/isuserlikedthispost")
def is_user_liked(userid: int, postid: int, db: Session = Depends(get_db)):
    liked = isuser_controller.is_user_liked_the_post(db, userid, postid)
    return {"success": True, "liked": liked}

# Search
@router.get("/searchdata")
def searchdata(data: str, db: Session = Depends(get_db)):
    res = search_controller.search_posts(db, data)
    return {"success": True, "allBlogs": res, "message": "No post found" if not res else ""}

# User (signup/login)
@router.post("/createuser")
def create_user(req: CreateUserRequest, db: Session = Depends(get_db)):
    user = user_controller.create_user(db, req.email, req.firstname, req.lastname, req.about, req.password, req.role)
    return {"success": True, "user": user}

@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    token_info = user_controller.login_user(db, req.email, req.password)
    return {"success": True, **token_info}

# OTP
@router.post("/storeOtp")
def store_otp(req: StoreOtpRequest, db: Session = Depends(get_db)):
    rec = signup_controller.store_otp(db, req.email, req.otp)
    return {"success": True, "data": rec}

# Mail
@router.post("/sendMail")
def send_mail(req: SendMailRequest, db: Session = Depends(get_db)):
    res = mail_controller.send_mail(db, req.email, req.subject, req.body)
    return res

# File upload
@router.post("/imageupload")
def upload_image(file: UploadFile = File(...)):
    return file_uploader.save_upload(file)