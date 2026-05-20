# Tokiniaina Toavina — Portfolio (monorepo)

```
portfolio/
├── frontend/         React 18 + Vite 5 + Tailwind — Pokémon-trainer theme
├── backend/          FastAPI + Motor (async MongoDB driver)
├── docker-compose.yml  MongoDB 7 with ttoavina/ttoavina creds
└── README.md
```

## Quick start

### 1. MongoDB (Docker)

```powershell
docker compose up -d
```

This starts a Mongo 7 container on `localhost:27017` with root user
`ttoavina` / `ttoavina` and database `portfolio`.

### 2. Backend (FastAPI)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API → http://localhost:8000 · Swagger → http://localhost:8000/docs

### 3. Frontend (Vite)

```powershell
cd frontend
npm install         # only the first time
npm run dev
```

Dev server → http://localhost:5173

## What's where

- `frontend/src/pages/Trainer.jsx` — landing (avatar, intro, education, languages, quote)
- `frontend/src/pages/Pokedex.jsx` — work experience cards (from the CV)
- `frontend/src/pages/Skills.jsx` — technical stack with HP bars
- `frontend/src/pages/Contact.jsx` — credentials display (chatbot to come)
- `backend/app/main.py` — FastAPI app factory + CORS + Mongo lifespan
- `backend/app/routers/contact.py` — stores incoming messages in `contact_messages`
- `backend/app/routers/health.py` — `/health` and `/health/db`

## Conventions

Backend reads its config from `backend/.env` (see `.env.example`). The frontend
will eventually call the backend through `VITE_API_URL` — not wired yet
(planned with the chatbot).
