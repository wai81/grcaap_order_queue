from typing import AsyncGenerator

from app.core.database import SessionLocal


async def get_db() -> AsyncGenerator:
    db = SessionLocal()
    db.current_user_id = None
    try:
        yield db
        await db.commit()
    finally:
        await db.close()
