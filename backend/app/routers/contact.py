from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

from ..db import get_db

router = APIRouter(prefix="/contact", tags=["contact"])


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


@router.post("", status_code=201)
async def create_message(payload: ContactMessage) -> dict:
    db = get_db()
    doc = payload.model_dump()
    doc["created_at"] = datetime.now(timezone.utc)
    try:
        result = await db.contact_messages.insert_one(doc)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"db error: {exc}") from exc
    return {"id": str(result.inserted_id)}


@router.get("")
async def list_messages(limit: int = 20) -> list[dict]:
    db = get_db()
    cursor = db.contact_messages.find().sort("created_at", -1).limit(min(limit, 100))
    items: list[dict] = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        items.append(doc)
    return items
