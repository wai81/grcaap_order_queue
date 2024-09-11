from typing import Generator

from app.core.database import SessionLocal


async def get_db() -> Generator:
    db = SessionLocal()
    db.current_user_id = None
    try:
        yield db
        await db.commit()
    finally:
        await db.close()
