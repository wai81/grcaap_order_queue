from typing import Union

from fastapi import FastAPI

from app.api.v1.route import api_router
from app.core.config import settings


def include_routes(app):  # добавляем список маршрутов
    app.include_router(api_router)


def start_app():
    app = FastAPI(title=settings.PROJECT_TITLE, version=settings.PROJECT_VERSION)
    include_routes(app)
    return app


app = start_app()
