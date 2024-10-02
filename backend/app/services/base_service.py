import json
from typing import TypeVar, Generic, Type, Any, Optional, List, Union, Dict

from fastapi.encoders import jsonable_encoder
from fastapi_pagination import Page
from fastapi_pagination.ext.async_sqlalchemy import paginate
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.base_class import Base
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy import column, or_, text, desc

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseService(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**
        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        query = select(self.model).where(self.model.id == id)
        result = await db.execute(query)
        obj = result.scalars().first()
        return obj

    async def get_list(
            self, db: AsyncSession, *,
            # skip: int = 0,
            # limit: int = 5000,
            # columns: str = None,
            sort: str = None,
            order: str = None,
            filters: str = None,
    ) -> Page[ModelType]:
        # query = select(from_obj=self.model, columns='*')
        query = select(self.model)

        result = await paginate(db, query=query)
        # result = await db.execute(query.offset(skip).limit(limit))
        return result
