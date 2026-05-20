from datetime import datetime, timezone
from typing import Literal

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from ..config import get_settings
from ..db import get_db
from ..llm import generate_reply
from ..utils import client_ip

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str = Field(min_length=1, max_length=8000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=50)
    session_id: str | None = Field(default=None, max_length=120)


class ChatResponse(BaseModel):
    reply: str
    model: str


@router.post("/messages", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request) -> ChatResponse:
    settings = get_settings()
    history = [m.model_dump() for m in payload.messages[-settings.llm_history_limit :]]

    try:
        reply = await generate_reply(history)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM call failed: {exc}") from exc

    last_user = next(
        (m.content for m in reversed(payload.messages) if m.role == "user"), None
    )

    try:
        db = get_db()
        await db.chat_messages.insert_one(
            {
                "session_id": payload.session_id,
                "model": settings.llm_model,
                "user_message": last_user,
                "reply": reply,
                "ip": client_ip(request),
                "user_agent": request.headers.get("user-agent"),
                "created_at": datetime.now(timezone.utc),
            }
        )
    except Exception:
        # Persistence is best-effort — never block the user's reply on it.
        pass

    return ChatResponse(reply=reply, model=settings.llm_model)
