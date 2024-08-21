from typing import List, Any
from uuid import UUID

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app import services
from app.api.v1.schemas.line_order import LineOrderInDB, LineOrderCreate, LineOrderUpdate
from app.api.dependencies import get_db

router = APIRouter()


@router.get("",
            status_code=200,
            response_model=List[LineOrderInDB])
async def get_orders(*,
                     skip: int = Query(0, ge=0),
                     limit: int = Query(50, gt=0),
                     db: AsyncSession = Depends(get_db)
                     ) -> Any:
    """Получение списка заказов"""
    objects = await services.line_order_service.get_list(db=db, skip=skip, limit=limit)
    result = objects
    return result


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
