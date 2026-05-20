from functools import lru_cache
from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "portfolio-backend"
    env: str = "development"

    mongo_uri: str | None = None

    mongo_user: str = "ttoavina"
    mongo_password: str = "azertyuiop"
    mongo_host: str = "localhost"
    mongo_port: int = 27017
    mongo_auth_source: str = "admin"

    mongo_db: str = "portfolio"

    cors_origins: str = "http://localhost:5173"

    llm_model: str = "gpt-4o-mini"
    llm_temperature: float = 0.8
    llm_max_tokens: int = 500
    llm_history_limit: int = 30

    admin_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def resolved_mongo_uri(self) -> str:
        if self.mongo_uri:
            return self.mongo_uri.replace("<db_username>", quote_plus(self.mongo_user)).replace(
                "<db_password>", quote_plus(self.mongo_password)
            )
        user = quote_plus(self.mongo_user)
        password = quote_plus(self.mongo_password)
        return (
            f"mongodb://{user}:{password}@{self.mongo_host}:{self.mongo_port}"
            f"/?authSource={self.mongo_auth_source}"
        )

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
