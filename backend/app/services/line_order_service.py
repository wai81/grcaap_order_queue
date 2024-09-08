from datetime import timezone
from typing import List, Any

from fastapi_pagination import Page
from fastapi_pagination.ext.async_sqlalchemy import paginate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.api.v1.schemas.line_order import LineOrderCreate, LineOrderUpdate, LineOrderInDB, LineOrderResponse, \
    LineOrderChangeStatus
from app.models.line_order import LineOrder
from app.services.base_service import BaseService


class LineOrderService(BaseService[LineOrder, LineOrderCreate, LineOrderUpdate]):
    async def create(self, db: AsyncSession, *, request: LineOrderCreate) -> LineOrder:
        create_data = request.dict()
        create_data.pop("order_create_date")
        obj = LineOrder(**create_data)
        obj.order_create_date = request.order_create_date.replace(tzinfo=timezone.utc)
        db.add(obj)
        await db.commit()
        await db.refresh(obj)
        return obj

    async def get_list_by_organization(self,
                                       db: AsyncSession, *,
                                       # skip: int = 0,
                                       # limit: int = 5000,
                                       organization_id: int) -> Page[LineOrderResponse]:
        subquery = (
            select(
                LineOrder,
                func.row_number().over(order_by=LineOrder.order_create_date.asc()).label("row_num")
            ).where(LineOrder.organization_id == organization_id)
            .where(LineOrder.is_completed == False)
            .subquery()
        )
        query = (
            select(subquery)
        )
        # result = await db.execute(query.offset(skip).limit(limit))
        result = await paginate(db, query=query)
        return result  #.fetchall()

    # async def get_line_by_order_number(self,
    #                                    db: AsyncSession, *,
    #                                    skip: int = 0,
    #                                    limit: int = 5000,
    #                                    organization_id: int,
    #                                    order_number: str) -> List[LineOrderResponse]:
    #     subquery = (
    #         select(
    #             LineOrder,
    #             func.row_number().over(order_by=LineOrder.order_create_date.asc()).label("row_num")
    #         ).where(LineOrder.organization_id == organization_id)
    #         .where(LineOrder.is_completed == False)
    #         .subquery()
    #     )
    #
    #     query = (
    #         select(subquery).where(subquery.c.order_number.ilike(f'{order_number}%'))
    #     )
    #
    #     result = await db.execute(query.offset(skip).limit(limit))  # Execute the query
    #     return result.fetchall()

    async def get_line_by_order_id(self,
                                   db: AsyncSession, *,
                                   organization_id: int,
                                   order_id: str) -> LineOrderResponse:
        subquery = (
            select(
                LineOrder,
                func.row_number().over(order_by=LineOrder.order_create_date.asc()).label("row_num")
            ).where(LineOrder.organization_id == organization_id)
            .where(LineOrder.is_completed == False)
            .subquery()
        )

        query = (
            select(subquery).where(subquery.c.id == order_id)
        )

        result = await db.execute(query)  # Execute the query
        return result.fetchone()
    # async def change_status(self,
    #                         db: AsyncSession, *,
    #                         db_obj: LineOrder,
    #                         request: LineOrderChangeStatus,
    #                         ):
    #     pass


line_order_service = LineOrderService(LineOrder)
