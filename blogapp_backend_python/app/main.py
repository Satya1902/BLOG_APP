# blogapp_backend_python/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database, config
from .routes import router

# create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title=config.settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router.router)

@app.get("/")
def root():
    return {"success": True, "message": "BlogApp FastAPI backend running"}