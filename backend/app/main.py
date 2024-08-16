from typing import Union

from fastapi import FastAPI

from app.core.config import settings


def start_app():
    app = FastAPI(title=settings.PROJECT_TITLE, version=settings.PROJECT_VERSION)
    return app


app = start_app()
