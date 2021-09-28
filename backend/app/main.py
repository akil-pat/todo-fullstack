import os

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.middleware.sessions import SessionMiddleware

from . import db_models, schemas
from .auth import get_current_user, get_db, hash_password, verify_password
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")

SESSION_SECRET = os.environ.get("SESSION_SECRET", "dev-secret-do-not-use-in-production")
app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/auth/signup", response_model=schemas.UserOut, status_code=201)
def signup(
    payload: schemas.UserCredentials, request: Request, db: Session = Depends(get_db)
):
    if db.query(db_models.User).filter_by(username=payload.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    user = db_models.User(
        username=payload.username, password_hash=hash_password(payload.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    request.session["user_id"] = user.id
    return user


@app.post("/auth/login", response_model=schemas.UserOut)
def login(
    payload: schemas.UserCredentials, request: Request, db: Session = Depends(get_db)
):
    user = db.query(db_models.User).filter_by(username=payload.username).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    request.session["user_id"] = user.id
    return user


@app.post("/auth/logout", status_code=204)
def logout(request: Request):
    request.session.clear()


@app.get("/auth/me", response_model=schemas.UserOut)
def me(user: db_models.User = Depends(get_current_user)):
    return user


@app.get("/tasks", response_model=list[schemas.TaskOut])
def list_tasks(
    completed: bool | None = None,
    user: db_models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(db_models.Task).filter_by(owner_id=user.id)
    if completed is not None:
        query = query.filter_by(completed=completed)
    return query.all()


@app.post("/tasks", response_model=schemas.TaskOut, status_code=201)
def create_task(
    payload: schemas.TaskCreate,
    user: db_models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db_models.Task(**payload.model_dump(), owner_id=user.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@app.get("/tasks/{task_id}", response_model=schemas.TaskOut)
def get_task(
    task_id: int,
    user: db_models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db.query(db_models.Task).filter_by(id=task_id, owner_id=user.id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.put("/tasks/{task_id}", response_model=schemas.TaskOut)
def update_task(
    task_id: int,
    update: schemas.TaskUpdate,
    user: db_models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db.query(db_models.Task).filter_by(id=task_id, owner_id=user.id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in update.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(
    task_id: int,
    user: db_models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db.query(db_models.Task).filter_by(id=task_id, owner_id=user.id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
