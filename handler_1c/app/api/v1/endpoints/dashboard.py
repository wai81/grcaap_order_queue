from typing import List, Any, Optional

from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, desc, asc, case
from app import services
from app.api.v1.filters.line_order import OrderListFilter, OrderCountFilter
from app.api.v1.schemas.line_order import LineOrderInDB, LineOrderCreate, LineOrderUpdate, LineOrderResponse, \
    LineOrderChangeStatus, OrderCountByOrganization, OrderCountBySatus, OrderCountBySatusByDate
from app.api.dependencies import get_db
from app.models.line_order import LineOrder


router = APIRouter()

@router.get("/ordercount_by_status", response_model=List[OrderCountBySatus], status_code=200)
async def get_orders_count(*, 
filters: OrderCountFilter = FilterDepends(OrderCountFilter),
db: AsyncSession = Depends(get_db)):
    """Количество принятых заказов, вработе и выполненных за весь период, по ТОР"""

    query = (  
            select(
            func.count(LineOrder.id).label("count"),   
            func.sum(case((LineOrder.is_completed, 1), else_=0)).label('completed_orders'),  
            func.sum(case((~LineOrder.is_completed, 1), else_=0)).label('not_completed_orders'))  
        )
    query = filters.filter(query)
    query_result = await db.execute(query) 
    orders_count = query_result.fetchall() 
    result = [
        {
            "count_orders": count,
            "completed_orders": completed_orders,
            "not_completed_orders": not_completed_orders
        }
        for count, completed_orders, not_completed_orders 
        in orders_count
    ] 

    return result

@router.get("/ordercount_by_date", response_model=List[OrderCountByOrganization], status_code=200)
async def get_orders_count(*, 
filters: OrderCountFilter = FilterDepends(OrderCountFilter),
db: AsyncSession = Depends(get_db)):
    """Количество принятых заказов за период, по ТОР"""

    query = (  
            select(
            func.date(LineOrder.order_create_date).label("order_date"),
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
            "count_orders": count
        }
        for order_date, 
        count in orders_count
    ] 

    return result

@router.get("/ordercount_by_status_by_date",  response_model=List[OrderCountBySatusByDate], status_code=200)
async def get_orders_count(*, 
filters: OrderCountFilter = FilterDepends(OrderCountFilter),
db: AsyncSession = Depends(get_db)):
    """Количество принятых и выполненых заказов за период, по ТОР"""

    query = (  
            select(
            func.date(LineOrder.order_create_date).label("order_date"),
            func.count(LineOrder.order_number).label("count"),   
            func.sum(case((LineOrder.is_completed, 1), else_=0)).label('completed_orders'),  
            func.sum(case((~LineOrder.is_completed, 1), else_=0)).label('not_completed_orders'))  
            .group_by(func.date(LineOrder.order_create_date)) #.group_by(func.date(LineOrder.order_create_date), LineOrder.organization_id)
            .order_by(asc(func.date(LineOrder.order_create_date)))#.order_by(asc(func.date(LineOrder.order_create_date)), LineOrder.organization_id)  
        )
    query = filters.filter(query)
    query_result = await db.execute(query) 
    orders_count = query_result.fetchall() 
        
    result = [
        {
            "order_date": str(order_date),
            "count_orders": count,
            "completed_orders": completed_orders,
            "not_completed_orders": not_completed_orders
        }
        for order_date, count, completed_orders, not_completed_orders 
        in orders_count
    ] 

    return result