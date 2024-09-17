import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv


from pydantic.v1 import AnyHttpUrl, BaseSettings

env_path = Path('') / '.env'
load_dotenv(dotenv_path=env_path)


class Settings(BaseSettings):
    PROJECT_TITLE: str = "grca_api_line_order&1C"
    PROJECT_VERSION: str = "0.0.1"

    # подключения к базе

    dbusername: str = os.getenv("DB_USERNAME")
    password: str = os.getenv("DB_PASSWORD")
    database: str = os.getenv("DB_DATABASE")
    host: str = os.getenv("DB_HOST")
    port: str = os.getenv("DB_PORT")

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:4200",
        "http://localhost:8001"  # type: ignore
     ]
    # class Config:
    #     env_prefix = "DB_"
    #     env_file = "../../../..env"


settings = Settings()
