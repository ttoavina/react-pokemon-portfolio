# Portfolio backend — FastAPI + MongoDB

## Setup

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run

```powershell
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs for the OpenAPI UI.

## Environment

Copy `.env.example` to `.env`. Two modes:

**Atlas (default in the template)** — set `MONGO_URI` to your SRV string.
The placeholders `<db_username>` / `<db_password>` are auto-replaced with
`MONGO_USER` / `MONGO_PASSWORD` at runtime, so you can leave them as is and
just edit the user/password vars:

```
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.vl4e1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGO_USER=ttoavina
MONGO_PASSWORD=ttoavina
MONGO_DB=portfolio
```

**Local Mongo fallback** — leave `MONGO_URI` empty; the app then builds
`mongodb://<user>:<pwd>@<host>:<port>/?authSource=<auth>` from the other vars.

## Endpoints

- `GET /` — app info
- `GET /health` — liveness
- `GET /health/db` — pings MongoDB
- `POST /contact` — store a contact message
- `GET /contact` — list recent messages (admin/debug)
