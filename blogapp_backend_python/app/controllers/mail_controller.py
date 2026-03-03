# app/controllers/mail_controller.py
import smtplib
from email.mime.text import MIMEText
from fastapi import HTTPException
from ..config import settings
from .. import models

def send_mail(db, email: str, subject: str, body: str, save_record: bool = True):
    try:
        msg = MIMEText(body, "html")
        msg["Subject"] = subject
        msg["From"] = settings.MAIL_USER
        msg["To"] = email

        with smtplib.SMTP(settings.MAIL_HOST, 587) as server:
            server.starttls()
            server.login(settings.MAIL_USER, settings.MAIL_PASS)
            server.send_message(msg)

        # optionally save record
        if save_record:
            record = models.MailRecord(email=email, subject=subject, body=body)
            db.add(record)
            db.commit()
            db.refresh(record)

        return {"success": True, "message": "Mail sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))