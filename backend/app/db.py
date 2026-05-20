from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from .config import get_settings


class MongoState:
    client: AsyncIOMotorClient | None = None
    db: AsyncIOMotorDatabase | None = None


state = MongoState()


async def connect_to_mongo() -> None:
    settings = get_settings()
    print(settings.resolved_mongo_uri)
    state.client = AsyncIOMotorClient(settings.resolved_mongo_uri, serverSelectionTimeoutMS=5000)
    state.db = state.client[settings.mongo_db]


async def close_mongo_connection() -> None:
    if state.client is not None:
        state.client.close()
        state.client = None
        state.db = None


def get_db() -> AsyncIOMotorDatabase:
    if state.db is None:
        raise RuntimeError("MongoDB is not initialized")
    return state.db
