from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

from app.api.v1.route import api_router
from app.core.config import settings


def include_routes(app):  # добавляем список маршрутов
    app.include_router(api_router)


origins = [
"http://grka.by",
"http://10.2.5.219:3000",
"*"
]

def start_app():
    app = FastAPI(title=settings.PROJECT_TITLE, version=settings.PROJECT_VERSION)
    include_routes(app)
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins= origins,
            # ["*"],
            # [str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    return app


app = start_app()
add_pagination(app)  # added fastapi_pagination


@app.on_event("startup")
async def startup_event():
    print('startup fastapi')


@app.on_event("shutdown")
async def stop_event():
    print('stop fastapi')



