from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from .. import models, config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    if not password:
        raise HTTPException(status_code=400, detail="Password cannot be empty")
    return pwd_context.hash(password[:72])  # truncate safely

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password[:72], hashed)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    token = jwt.encode(to_encode, config.settings.JWT_SECRET, algorithm=config.settings.ALGORITHM)
    return token

def create_user(db: Session, email: str, firstname: str, lastname: str, about: str, password: str, role: str):
    if not (email and firstname and lastname and password and role):
        raise HTTPException(status_code=400, detail="Missing required fields")

    existing = db.query(models.User).filter(models.User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = get_password_hash(password)
    user = models.User(
        email=email,
        firstname=firstname,
        lastname=lastname,
        about=about,
        password=hashed,
        role=role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def login_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Email not registered")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    payload = {"sub": user.email, "id": user.id, "role": user.role}
    token = create_access_token(payload)

    user_data = {
        "id": user.id,
        "email": user.email,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "about": user.about,
        "role": user.role
    }
    return {"token": token, "user": user_data}