from datetime import timezone
from typing import List, Any

from fastapi_pagination import Page
from fastapi_pagination.ext.async_sqlalchemy import paginate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.api.v1.filters.line_order import OrderFilter
from app.api.v1.schemas.line_order import LineOrderCreate, LineOrderUpdate, LineOrderInDB, LineOrderResponse, \
    LineOrderChangeStatus
from app.models.line_order import LineOrder
from app.services.base_service import BaseService


class LineOrderService(BaseService[LineOrder, LineOrderCreate, LineOrderUpdate]):

    async def get_list_by_organization(self,
                                       db: AsyncSession, *,
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
        result = await paginate(db, query=query)
        return result  # .fetchall()

    async def get_order_by_order_number(self,
                                        db: AsyncSession, *,
                                        organization_id: int,
                                        order_number: str) -> LineOrderInDB:
        query = (select(LineOrder)
                 .where(LineOrder.organization_id == organization_id)
                 .where(LineOrder.order_number == order_number))

        result = await db.execute(query)  # Execute the query
        return result.scalars().first()

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


line_order_service = LineOrderService(LineOrder)
