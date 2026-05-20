from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .db import close_mongo_connection, connect_to_mongo
from .routers import chat, contact, health, stats, track


@asynccontextmanager
async def lifespan(_: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name, lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    app.include_router(contact.router)
    app.include_router(chat.router)
    app.include_router(track.router)
    app.include_router(stats.router)

    @app.get("/")
    async def root() -> dict:
        return {"app": settings.app_name, "env": settings.env}

    return app


app = create_app()
