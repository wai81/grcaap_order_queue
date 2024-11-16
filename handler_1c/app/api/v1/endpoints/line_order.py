from typing import List, Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app import services
from app.api.v1.filters.line_order import OrderListFilter, OrderCountFilter
from app.api.v1.schemas.line_order import LineOrderInDB, LineOrderCreate, LineOrderUpdate, LineOrderResponse, \
    LineOrderChangeStatus, OrderCountByOrganization
from app.api.dependencies import get_db
from app.models.line_order import LineOrder

router = APIRouter()


@router.get("",
            status_code=200,
            response_model=Page[LineOrderInDB])
async def get_orders(*,
                     filters: OrderListFilter = FilterDepends(OrderListFilter),
                     db: AsyncSession = Depends(get_db)
                     ) -> any:
    """Получение списка заказов"""
    objects = await services.line_order_service.get_list_filter(db=db, filters=filters)
    result = objects
    return result


@router.get("/search",
            status_code=200,
            response_model=LineOrderResponse)
async def get_line_orders_search(*,
                                 organization_id: int,
                                 order_number: str,
                                 db: AsyncSession = Depends(get_db)
                                 ) -> any:
    # Фильтруем данные находим id заказа проверяем статус заказа.
    # Если статус выполнен выводим сообщение иначе выводим очередь в заказе

    response_order = await services.line_order_service.get_order_by_order_number(
        db=db,
        # skip=skip,
        # limit=limit,
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


@router.get("/{order_id}",
            status_code=200,
            response_model=LineOrderResponse)
async def get_line_orders_by_order_id(*,
                                      order_id: UUID,
                                      db: AsyncSession = Depends(get_db)
                                      ) -> LineOrderResponse:
    """Получение номера очереди заказа по id заказа"""
    obj = await services.line_order_service.get(db=db, id=order_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Заказ с ID: {order_id} не найден."
        )
    if obj.is_completed:
        raise HTTPException(
            status_code=200, detail=f"Ваш заказ выполнен"
        )

    response_order = await services.line_order_service.get_line_by_order_id(
        db=db,
        organization_id=obj.organization_id,
        order_id=order_id
    )

    return response_order


@router.get("/organization/{organization_id}",
            status_code=200,
            response_model=Page[LineOrderResponse])
async def get_line_orders_by_organization(*,
                                          organization_id: int,
                                          # order_number: str | None = None,
                                          # skip: int = Query(0, ge=0),
                                          # limit: int = Query(50, gt=0),
                                          db: AsyncSession = Depends(get_db)
                                          ) -> Page[LineOrderResponse]:
    """Получение списка заказов и номера очереди Организации"""
    obj = await services.organization_service.get(db=db, id=organization_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Организация не найдена."
        )
    # if order_number:
    #     response_orders = await services.line_order_service.get_line_by_order_number(
    #         db=db,
    #         # skip=skip,
    #         # limit=limit,
    #         organization_id=organization_id,
    #         order_number=order_number
    #     )
    # else:
    response_orders = await services.line_order_service.get_list_by_organization(
        db=db,
        organization_id=organization_id,
    )
    return response_orders


@router.post("",
             status_code=201,
             response_model=LineOrderInDB)
async def create_order(*,
                       request: LineOrderCreate,
                       db: AsyncSession = Depends(get_db)
                       ) -> dict:
    """Создание нового заказа."""
    result = await services.line_order_service.create(db=db, request=request)
    return result


@router.put("/{order_id}",
            status_code=201,
            response_model=LineOrderInDB)
async def update_order(*,
                       order_id: UUID,
                       request: LineOrderUpdate,
                       db: AsyncSession = Depends(get_db)
                       ) -> dict:
    """Редактирование данных заказа"""
    obj = await services.line_order_service.get(db=db, id=order_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Заказ ID: {order_id} не найден."
        )
    result = await services.line_order_service.update(db=db, db_obj=obj, request=request)
    return result


@router.patch("/{order_id}",
              status_code=201,
              response_model=LineOrderInDB)
async def change_status_order(*,
                              order_id: UUID,
                              request: LineOrderChangeStatus,
                              db: AsyncSession = Depends(get_db)
                              ) -> dict:
    """Редактирование данных заказа"""
    obj = await services.line_order_service.get(db=db, id=order_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Заказ ID: {order_id} не найден."
        )
    result = await services.line_order_service.update(db=db, db_obj=obj, request=request)
    return result


@router.delete("/{order_id}",
               status_code=204)
async def delete_order(*,
                       order_id: UUID,
                       db: AsyncSession = Depends(get_db)
                       ):
    """Удаление заказа"""
    obj = await services.line_order_service.get(db=db, id=order_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Заказ ID: {order_id} не найден."
        )
    await services.line_order_service.remove(db=db, db_obj=obj)
    # return result

# @router.get("/ordercount", response_model=List[OrderCountByOrganization], status_code=201)
# async def get_orders_count(#filters: OrderCountFilter = FilterDepends(OrderCountFilter),
#                            db: AsyncSession = Depends(get_db)):
#     """Количество заказов за период, по ТОР"""

#     #response_result = await services.line_order_service.get_orders_count(db=db)#, filters=filters)
#     query = (  
#             select(
#             LineOrder,
#             func.date(LineOrder.order_create_date).label("order_date"),
#             LineOrder.organization_id, 
#             func.count(LineOrder.organization_id).label("count"))  
#             .group_by(func.date(LineOrder.order_create_date), LineOrder.organization_id)
#             # .order_by(LineOrder.order_create_date)  
#         )
#         # query = filters.filter(query)
#     query_result = await db.execute(query) 
#     orders_count = query_result.fetchall() 
#     result = [
#         {
#             "order_date": str(order_date),
#             "organization_id": organization_id,
#             "count_orders": count
#         }
#         for order_date, 
#         organization_id, 
#         count in orders_count
#     ] 

#     return result