from typing import List, Any, Optional

from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, desc, asc
from app import services
from app.api.v1.filters.line_order import OrderListFilter, OrderCountFilter
from app.api.v1.schemas.line_order import LineOrderInDB, LineOrderCreate, LineOrderUpdate, LineOrderResponse, \
    LineOrderChangeStatus, OrderCountByOrganization
from app.api.dependencies import get_db
from app.models.line_order import LineOrder


router = APIRouter()

@router.get("/ordercount", response_model=List[OrderCountByOrganization], status_code=201)
async def get_orders_count(*, 
filters: OrderCountFilter = FilterDepends(OrderCountFilter),
db: AsyncSession = Depends(get_db)):
    """Количество заказов за период, по ТОР"""

    #response_result = await services.line_order_service.get_orders_count(db=db)#, filters=filters)
    query = (  
            select(
            
            func.date(LineOrder.order_create_date).label("order_date"),
            # LineOrder.organization_id, 
            func.count(LineOrder.organization_id).label("count"))  
            .group_by(func.date(LineOrder.order_create_date))#, LineOrder.organization_id)
            .order_by(asc(func.date(LineOrder.order_create_date)))#, LineOrder.organization_id)  
        )
    query = filters.filter(query)
    query_result = await db.execute(query) 
    orders_count = query_result.fetchall() 
    result = [
        {
            "order_date": str(order_date),
            # "organization_id": organization_id,
            "count_orders": count
        }
        for order_date, 
        # organization_id, 
        count in orders_count
    ] 

    return result