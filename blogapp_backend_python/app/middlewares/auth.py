# app/middlewares/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from ..config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invalid or expired")

def is_user(payload: dict = Depends(verify_token)):
    role = payload.get("role", "").upper()
    if role != "USER":
        raise HTTPException(status_code=401, detail="Insufficient permissions")
    return payload

def is_admin(payload: dict = Depends(verify_token)):
    role = payload.get("role", "")
    if role != "ADMIN":
        raise HTTPException(status_code=401, detail="Insufficient permissions")
    return payload