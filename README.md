# Todo Fullstack

Simple full-stack test project: FastAPI backend + React (Vite) frontend.

## Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --reload
```

API runs at http://localhost:8000 (docs at `/docs`).

Run tests:

```bash
.venv/bin/python -m pytest -q
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173 and talks to the backend at http://localhost:8000.
