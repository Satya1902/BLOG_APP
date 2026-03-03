# app/config.py
from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    # -------------------- Project --------------------
    PROJECT_NAME: str = "BlogApp FastAPI"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # -------------------- Database -------------------
    DATABASE_URL: str = "sqlite:///./blog_app.db"

    # -------------------- JWT Auth -------------------
    JWT_SECRET: str = "your_super_secret_jwt_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # -------------------- Mail -----------------------
    MAIL_USER: str | None = None
    MAIL_PASS: str | None = None
    MAIL_FROM: str | None = None
    MAIL_PORT: int = 587
    MAIL_HOST: str = "smtp.gmail.com"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    # -------------------- File Uploads ----------------
    BASE_DIR: Path = Path(__file__).resolve().parent
    UPLOAD_DIR: str = str(BASE_DIR / "uploads")

    # -------------------- Frontend --------------------
    FRONTEND_ORIGIN: str = "http://localhost:3000"

    # -------------------- Pydantic Config -------------
    model_config = {
        "extra": "ignore",       # ignore unknown env vars
        "env_file": ".env",      # load automatically
        "env_file_encoding": "utf-8",
    }

settings = Settings()