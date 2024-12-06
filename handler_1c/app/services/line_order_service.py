from datetime import timezone
from typing import List, Any

from fastapi_pagination import Page
from fastapi_pagination.ext.async_sqlalchemy import paginate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import aliased  
from app.api.v1.filters.line_order import OrderListFilter,OrderCountFilter,OrderLineFilter
from app.api.v1.schemas.line_order import LineOrderCreate, LineOrderUpdate, LineOrderInDB, LineOrderResponse, \
    LineOrderChangeStatus, OrderCountByOrganization
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
        return result  # .fetchall()


    async def get_order_by_order_number(self,
                                        db: AsyncSession, *,
                                        # skip: int = 0,
                                        # limit: int = 5000,
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


    async def get_line_orders_filter(self,
                           db: AsyncSession, *,
                           filters: OrderLineFilter,
                           ) -> Page[LineOrderResponse]:
        # запроc получения списка очереди по всем организациям
        model_alias = aliased(self.model)
        subquery = (
            select(
                model_alias,
                func.row_number().over(
                    partition_by=model_alias.organization_id,
                    order_by=model_alias.order_create_date.asc()
                    ).label("row_num")
            )
            .where(model_alias.is_completed == False)
            .subquery()
        )
        query = select(subquery)

        # query = filters.filter(query)
        # query = filters.sort(query)

        if filters:
            # Применяем встроенные фильтры  
            #query = filters.filter(query)  

            # Применяем кастомные фильтры  
            query = filters.custom_filter(query, filters, subquery) 
        
            if filters.order_by:
                for order in filters.order_by:  
                    if order.startswith("-"):  # Обратный порядок  
                        query = query.order_by(getattr(subquery.c, order[1:]).desc())
                    elif order.startswith("+"):  # Повозрастанию порядок  
                        query = query.order_by(getattr(subquery.c, order[1:]).asc())  
                    else:  
                        query = query.order_by(getattr(subquery.c, order))  
        
        # query = select(subquery)  
        #result = await db.execute(query)  
        #print(result.fetchall()) 

        result = await paginate(db, query=query)
        return result  # .fetchall()

    async def get_list_filter(self,
                           db: AsyncSession, *,
                           filters: OrderListFilter,
                           ) -> LineOrderResponse:
        query = select(self.model)
        query = filters.filter(query)
        query = filters.sort(query)
        # result = await db.execute(query)
        result = await paginate(db, query=query)
        return result
    # async def change_status(self,
    #                         db: AsyncSession, *,
    #                         db_obj: LineOrder,
    #                         request: LineOrderChangeStatus,
    #                         ):
    #     pass

    async def get_orders_count(self, db:AsyncSession
    #,*,filters: OrderCountFilter
    ) -> Any:
         
        query = (  
            select(
                
            func.date(LineOrder.order_create_date).label("order_date"),
            #LineOrder.organization_id, 
            func.count(LineOrder.id).label("count"))  
            .group_by(func.date(LineOrder.order_create_date), LineOrder.organization_id)
            .order_by(LineOrder.order_create_date)  
        )
        # query = filters.filter(query)
        result = await db.fetchall(query) 
        return result

line_order_service = LineOrderService(LineOrder)
