import json
from typing import TypeVar, Generic, Type, Any, Optional, List, Union, Dict

from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.base_class import Base
from pydantic import BaseModel
from sqlalchemy.sql import select
from sqlalchemy import column, or_, text, desc

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
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
            # self, db: Session, *, skip: int = 0, limit: int = 5000
            self, db: AsyncSession, *,
            # columns: str = None,
            sort: str = None,
            order: str = None,
            filter: str = None,
    ) -> List[ModelType]:
        query = select(from_obj=self.model, columns='*')
        # if columns is not None and columns != "all":
        #     query = select(from_obj=self.model, columns=self.convert_columns(columns))
        if filter is not None and filter != '{}' and filter != "null":
            # we need filter format data like this  --> {'name': 'an','country':'an'}
            # convert string to dict format
            print(f'filter ' + filter)
            # criteria = dict(x.split("*") for x in filter.split('-'))
            criteria = json.loads(filter)
            criteria_list = []
            # check every key in dict. are there any table attributes that are the same as the dict key ?
            for attr, value in criteria.items():
                if attr != 'q':
                    _attr = getattr(self.model, attr)
                    # filter format
                    search = "%{}%".format(value)
                    # criteria list
                    criteria_list.append(_attr.like(search))

            query = query.filter(or_(*criteria_list))

        if sort is not None and sort != "null":
            # we need sort format data like this --> ['id','name']
            if order is not None and order != "null":
                if order == '"DESC"':
                    query = query.order_by(desc(text(self.convert_sort(sort))))
            query = query.order_by(text(self.convert_sort(sort)))
        result = await db.execute(query)
        return (
            # db.query(self.model).order_by(self.model.id).offset(skip).limit(limit).all()
            result.fetchall()
        )

    async def create(self, db: AsyncSession, *, request: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(request)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(self, db: AsyncSession, *, db_obj: ModelType,
                     request: Union[UpdateSchemaType, Dict[str, Any]]) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(request, dict):
            update_data = request
        else:
            update_data = request.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def remove(self, db: AsyncSession, *, db_obj: ModelType) -> Any:
        # query = select(self.model).where(self.model.id == id)
        # result = await db.execute(query)
        # obj = result.scalars().first()
        await db.delete(db_obj)
        await db.commit()
        return {"message": "object delete with success"}
