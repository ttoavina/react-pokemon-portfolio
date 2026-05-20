from fastapi import APIRouter

from ..db import get_db

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@router.get("/health/db")
async def health_db() -> dict:
    db = get_db()
    info = await db.command("ping")
    return {"status": "ok", "mongo": info}
