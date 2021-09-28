import bcrypt
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from . import db_models
from .database import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode(), password_hash.encode())


def get_current_user(
    request: Request, db: Session = Depends(get_db)
) -> db_models.User:
    user_id = request.session.get("user_id")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user = db.get(db_models.User, user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user
