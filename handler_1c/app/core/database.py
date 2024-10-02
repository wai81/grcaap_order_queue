from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select

from app.core.config import settings

# DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"  # Данные к подлючению БД

DATABASE_URL = f"postgresql+asyncpg://" \
                          f"{settings.dbusername}:{settings.password}@{settings.host}:{settings.port}" \
                          f"/{settings.database}"
print(DATABASE_URL)
engine = create_async_engine(DATABASE_URL,
                             echo=True,
                             future=True)
SessionLocal = sessionmaker(bind=engine,
                            class_=AsyncSession,
                            expire_on_commit=False)
# Base = declarative_base()
#
#
# async def get_db():
#     async with SessionLocal() as session:
#         yield session
