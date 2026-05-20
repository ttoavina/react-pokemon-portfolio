from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Query

from ..config import get_settings
from ..db import get_db


def require_admin(x_admin_key: Optional[str] = Header(default=None)) -> None:
    settings = get_settings()
    if not settings.admin_key:
        raise HTTPException(
            status_code=503,
            detail="Stats endpoint disabled: set ADMIN_KEY in the backend .env",
        )
    if x_admin_key != settings.admin_key:
        raise HTTPException(status_code=403, detail="Invalid admin key")


router = APIRouter(
    prefix="/stats",
    tags=["stats"],
    dependencies=[Depends(require_admin)],
)


def _serialize(doc: dict) -> dict:
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


@router.get("/summary")
async def summary() -> dict:
    """Global counters across visits and chat activity."""
    db = get_db()
    visits = db.visits
    chats = db.chat_messages

    total_visits = await visits.count_documents({})
    total_messages = await chats.count_documents({})

    visit_sessions = [s for s in await visits.distinct("session_id") if s]
    chat_sessions = [s for s in await chats.distinct("session_id") if s]
    visit_ips = [ip for ip in await visits.distinct("ip") if ip]
    chat_ips = [ip for ip in await chats.distinct("ip") if ip]

    first_visit = await visits.find_one({}, sort=[("created_at", 1)], projection={"created_at": 1})
    last_visit = await visits.find_one({}, sort=[("created_at", -1)], projection={"created_at": 1})

    return {
        "total_visits": total_visits,
        "total_messages": total_messages,
        "unique_visitors": len(set(visit_sessions) | set(chat_sessions)),
        "unique_chatters": len(chat_sessions),
        "unique_ips": len(set(visit_ips) | set(chat_ips)),
        "first_seen": first_visit["created_at"] if first_visit else None,
        "last_seen": last_visit["created_at"] if last_visit else None,
    }


@router.get("/visitors")
async def visitors(
    limit: int = Query(default=20, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> dict:
    """One row per session_id (the persistent client UUID), sorted by last activity."""
    db = get_db()
    coll = db.chat_messages

    pipeline = [
        {"$sort": {"created_at": 1}},
        {
            "$group": {
                "_id": "$session_id",
                "first_seen": {"$min": "$created_at"},
                "last_seen": {"$max": "$created_at"},
                "messages": {"$sum": 1},
                "ips": {"$addToSet": "$ip"},
                "user_agents": {"$addToSet": "$user_agent"},
                "models": {"$addToSet": "$model"},
                "last_user_message": {"$last": "$user_message"},
                "last_reply": {"$last": "$reply"},
            }
        },
        {"$sort": {"last_seen": -1}},
        {"$skip": offset},
        {"$limit": limit},
    ]

    cursor = coll.aggregate(pipeline)
    items: list[dict] = []
    async for doc in cursor:
        doc["session_id"] = doc.pop("_id")
        doc["ips"] = [ip for ip in doc.get("ips", []) if ip]
        doc["user_agents"] = [ua for ua in doc.get("user_agents", []) if ua]
        items.append(doc)

    total = len([s for s in await coll.distinct("session_id") if s])

    return {"total": total, "limit": limit, "offset": offset, "visitors": items}


@router.get("/by-ip")
async def by_ip(
    limit: int = Query(default=20, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> dict:
    """One row per IP, sorted by last activity."""
    db = get_db()
    coll = db.chat_messages

    pipeline = [
        {"$match": {"ip": {"$ne": None}}},
        {"$sort": {"created_at": 1}},
        {
            "$group": {
                "_id": "$ip",
                "first_seen": {"$min": "$created_at"},
                "last_seen": {"$max": "$created_at"},
                "messages": {"$sum": 1},
                "sessions": {"$addToSet": "$session_id"},
                "user_agents": {"$addToSet": "$user_agent"},
                "last_user_message": {"$last": "$user_message"},
            }
        },
        {"$sort": {"last_seen": -1}},
        {"$skip": offset},
        {"$limit": limit},
    ]

    cursor = coll.aggregate(pipeline)
    items: list[dict] = []
    async for doc in cursor:
        doc["ip"] = doc.pop("_id")
        doc["sessions"] = [s for s in doc.get("sessions", []) if s]
        doc["user_agents"] = [ua for ua in doc.get("user_agents", []) if ua]
        items.append(doc)

    total = len([ip for ip in await coll.distinct("ip") if ip])

    return {"total": total, "limit": limit, "offset": offset, "ips": items}


@router.get("/messages")
async def messages(
    limit: int = Query(default=50, ge=1, le=500),
    session_id: Optional[str] = Query(default=None),
    ip: Optional[str] = Query(default=None),
) -> dict:
    """Raw chat message log with optional filters."""
    db = get_db()
    coll = db.chat_messages

    query: dict = {}
    if session_id:
        query["session_id"] = session_id
    if ip:
        query["ip"] = ip

    cursor = coll.find(query).sort("created_at", -1).limit(limit)
    items: list[dict] = []
    async for doc in cursor:
        items.append(_serialize(doc))

    return {"count": len(items), "limit": limit, "messages": items}


@router.get("/visits")
async def visits_log(
    limit: int = Query(default=50, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    session_id: Optional[str] = Query(default=None),
    ip: Optional[str] = Query(default=None),
    path: Optional[str] = Query(default=None),
) -> dict:
    """Raw page-view log with optional filters."""
    db = get_db()
    coll = db.visits

    query: dict = {}
    if session_id:
        query["session_id"] = session_id
    if ip:
        query["ip"] = ip
    if path:
        query["path"] = path

    total = await coll.count_documents(query)
    cursor = coll.find(query).sort("created_at", -1).skip(offset).limit(limit)
    items: list[dict] = []
    async for doc in cursor:
        items.append(_serialize(doc))

    return {
        "total": total,
        "count": len(items),
        "limit": limit,
        "offset": offset,
        "visits": items,
    }


@router.get("/clients")
async def clients(
    limit: int = Query(default=20, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> dict:
    """Unified view: one row per session_id, combining page-views and chat activity."""
    db = get_db()

    pipeline = [
        {"$sort": {"created_at": 1}},
        {
            "$group": {
                "_id": "$session_id",
                "first_seen": {"$min": "$created_at"},
                "last_seen": {"$max": "$created_at"},
                "page_views": {"$sum": 1},
                "ips": {"$addToSet": "$ip"},
                "user_agents": {"$addToSet": "$user_agent"},
                "languages": {"$addToSet": "$language"},
                "accept_languages": {"$addToSet": "$accept_language"},
                "timezones": {"$addToSet": "$timezone"},
                "screens": {"$addToSet": "$screen"},
                "viewports": {"$addToSet": "$viewport"},
                "color_schemes": {"$addToSet": "$color_scheme"},
                "touch_devices": {"$addToSet": "$touch"},
                "paths_visited": {"$addToSet": "$path"},
                "last_path": {"$last": "$path"},
                "last_referrer": {"$last": "$referrer"},
            }
        },
        {
            "$lookup": {
                "from": "chat_messages",
                "localField": "_id",
                "foreignField": "session_id",
                "as": "_chats",
            }
        },
        {
            "$addFields": {
                "chat_count": {"$size": "$_chats"},
                "chat_last_user_message": {"$last": "$_chats.user_message"},
                "chat_last_reply": {"$last": "$_chats.reply"},
            }
        },
        {"$project": {"_chats": 0}},
        {"$sort": {"last_seen": -1}},
        {"$skip": offset},
        {"$limit": limit},
    ]

    items: list[dict] = []
    async for doc in db.visits.aggregate(pipeline):
        doc["session_id"] = doc.pop("_id")
        for key in ("ips", "user_agents", "languages", "accept_languages",
                    "timezones", "screens", "viewports", "color_schemes",
                    "touch_devices", "paths_visited"):
            doc[key] = [v for v in doc.get(key, []) if v is not None]
        items.append(doc)

    total = len([s for s in await db.visits.distinct("session_id") if s])
    return {"total": total, "limit": limit, "offset": offset, "clients": items}
