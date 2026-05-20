from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Request
from pydantic import BaseModel, Field

from ..db import get_db
from ..utils import client_ip

router = APIRouter(prefix="/track", tags=["track"])


class VisitPayload(BaseModel):
    session_id: Optional[str] = Field(default=None, max_length=120)
    path: str = Field(min_length=1, max_length=200)
    referrer: Optional[str] = Field(default=None, max_length=2000)
    screen: Optional[str] = Field(default=None, max_length=40)
    viewport: Optional[str] = Field(default=None, max_length=40)
    timezone: Optional[str] = Field(default=None, max_length=80)
    language: Optional[str] = Field(default=None, max_length=20)
    pixel_ratio: Optional[float] = Field(default=None, ge=0, le=10)
    color_scheme: Optional[str] = Field(default=None, max_length=20)
    touch: Optional[bool] = None


@router.post("/visit", status_code=201)
async def track_visit(payload: VisitPayload, request: Request) -> dict:
    """Public endpoint called by the SPA on every route change."""
    doc = payload.model_dump()
    doc.update(
        {
            "ip": client_ip(request),
            "user_agent": request.headers.get("user-agent"),
            "accept_language": request.headers.get("accept-language"),
            "created_at": datetime.now(timezone.utc),
        }
    )
    try:
        db = get_db()
        await db.visits.insert_one(doc)
    except Exception:
        # Tracking is best-effort.
        pass
    return {"ok": True}
