
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


@app.on_event("startup")
async def startup_event():
    print('startup fastapi')


@app.on_event("shutdown")
async def stop_event():
    print('stop fastapi')


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
