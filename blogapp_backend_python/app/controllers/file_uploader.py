# app/controllers/file_uploader.py
import os
from fastapi import UploadFile, HTTPException
from ..config import settings

SUPPORTED = {"jpg", "jpeg", "png"}

def is_supported(filename: str):
    ext = filename.rsplit(".", 1)[-1].lower()
    return ext in SUPPORTED

def save_upload(file: UploadFile):
    if not is_supported(file.filename):
        raise HTTPException(status_code=400, detail="Unsupported file type")
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    filepath = os.path.join(settings.UPLOAD_DIR, file.filename)
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    # return local URL or path
    return {"filename": file.filename, "path": filepath}