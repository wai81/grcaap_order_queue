from typing import List, Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app import services
from app.api.v1.filters.line_order import OrderFilter
from app.api.v1.schemas.line_order import LineOrderInDB, LineOrderCreate, LineOrderUpdate, LineOrderResponse, \
    LineOrderChangeStatus
from app.api.dependencies import get_db
from app.models.line_order import LineOrder

router = APIRouter()

@router.get("/search",
            status_code=200,
            response_model=LineOrderResponse)
async def get_line_orders_search(*,
                                 organization_id: int,
                                 order_number: str,
                                 db: AsyncSession = Depends(get_db)
                                 ) -> any:
    "Получение очереди заказа"
    response_order = await services.line_order_service.get_order_by_order_number(
        db=db,
        organization_id=organization_id,
        order_number=order_number
    )

    if response_order is None:
        raise HTTPException(status_code=404, detail="Заказ не найден")

    if response_order.is_completed is True:
        raise HTTPException(status_code=200, detail="Ваш заказ выполнен")

    result = await services.line_order_service.get_line_by_order_id(
        db=db,
        order_id=response_order.id,
        organization_id=organization_id
    )

    return result

