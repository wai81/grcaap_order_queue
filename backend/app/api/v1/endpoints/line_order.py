from typing import List, Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app import services
from app.api.v1.schemas.line_order import LineOrderInDB, LineOrderCreate, LineOrderUpdate, LineOrderResponse, \
    LineOrderChangeStatus
from app.api.dependencies import get_db
from app.models.line_order import LineOrder

router = APIRouter()


@router.get("",
            status_code=200,
            response_model=Page[LineOrderInDB])
async def get_orders(*,
                     # skip: int = Query(0, ge=0),
                     # limit: int = Query(50, gt=0),
                     db: AsyncSession = Depends(get_db)
                     ) -> Any:
    """Получение списка заказов"""
    objects = await services.line_order_service.get_list(db=db)
    result = objects
    return result


@router.get("/search",
            status_code=200,
            response_model=LineOrderResponse)
async def get_line_orders_search(*,
                                 db: AsyncSession = Depends(get_db)
                                 ) -> LineOrderResponse:
    # Фильтруем данные находим id заказа проверяем статус заказа.
    # Если статус выполнен выводим сообщение иначе выводим очередь в заказе
    pass


@router.get("/order/{order_id}",
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
            status_code=404, detail=f"Order with ID: {order_id} not found."
        )
    if obj.is_completed:
        raise HTTPException(
            status_code=200, detail=f"Order with ID: {order_id} is completed."
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
            status_code=404, detail=f"Organization with ID: {organization_id} not found."
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
        # skip=skip,
        # limit=limit,
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
    # obj = await services.line_order_service.get(db=db, id=request.order_number)
    # if obj:
    #     raise HTTPException(
    #         status_code=400, detail="Order with number : {request.order_number} is exist."
    #     )

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
            status_code=404, detail=f"Order with ID: {order_id} not found."
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
            status_code=404, detail=f"Order with ID: {order_id} not found."
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
            status_code=404, detail=f"Order with ID: {order_id} not found."
        )
    await services.line_order_service.remove(db=db, db_obj=obj)
    # return result
