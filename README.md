# Todo Fullstack

A simple full-stack todo application with session-based authentication and per-user task scoping.

- **Backend:** FastAPI + SQLAlchemy + SQLite, cookie-based session auth, `bcrypt` password hashing
- **Frontend:** React 19 + Vite, landing page with modal login/signup flow and a task dashboard

## Project structure

```
todo-fullstack/
├── backend/
│   ├── app/
│   │   ├── main.py        # API routes
│   │   ├── auth.py        # session auth helpers
│   │   ├── database.py    # SQLAlchemy engine/session
│   │   ├── db_models.py   # ORM models
│   │   └── schemas.py     # Pydantic schemas
│   ├── tests/              # pytest suite (auth + tasks)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/        # auth context
    │   ├── api.js          # API client
    │   └── App.jsx
    └── package.json
```

## Prerequisites

- Python 3.12+
- Node.js 18+ and npm

## Getting started

### Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000` (interactive docs at `/docs`). SQLite data is stored in `backend/app.db`.

Run the test suite:

```bash
.venv/bin/python -m pytest -q
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and talks to the backend at `http://localhost:8000`.

Other frontend scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint       # oxlint
```

## API reference

All task routes require an authenticated session (cookie set on login/signup).

| Method | Path          | Description                |
|--------|---------------|-----------------------------|
| POST   | `/auth/signup`| Create a new user account   |
| POST   | `/auth/login` | Log in and start a session  |
| POST   | `/auth/logout`| End the current session      |
| GET    | `/auth/me`    | Get the current user         |
| GET    | `/tasks`      | List the current user's tasks|
| POST   | `/tasks`      | Create a task                |
| GET    | `/tasks/{id}` | Get a single task            |
| PUT    | `/tasks/{id}` | Update a task                |
| DELETE | `/tasks/{id}` | Delete a task                |

Full schema and try-it-out UI available at `http://localhost:8000/docs` once the backend is running.
