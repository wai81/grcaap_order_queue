from typing import List, Any

from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession

from app import services
from app.api.v1.filters.organization import OrganizationFilter
from app.api.v1.schemas.organization import OrganizationInDB, OrganizationCreate, OrganizationUpdate
from app.api.dependencies import get_db
from app.models.organization import Organization

router = APIRouter()


@router.get("",
            status_code=200,
            response_model=Page[OrganizationInDB])
async def get_organizations(*,
                            # skip: int = Query(0, ge=0),
                            # limit: int = Query(50, gt=0),
                            filters: OrganizationFilter = FilterDepends(OrganizationFilter),
                            db: AsyncSession = Depends(get_db)
                            ) -> Any:
    """Получение списка организаций, ТОР"""
    objects = await services.organization_service.get_list(db=db, filters=filters)
    result = objects
    return result

@router.post("",
             status_code=201,
             response_model=OrganizationInDB)
async def create_organization(*,
                              request: OrganizationCreate,
                              db: AsyncSession = Depends(get_db)
                              ) -> dict:
    """Создание организации.
    Проверяем по номеру ТОР
    (ТОР является ID организации)
    если организация  в списке,
    если есть выводим сообщение"""
    obj = await services.organization_service.get(db=db, id=request.id)
    if obj:
        raise HTTPException(
            status_code=400, detail=f"Организация с номером ТОР: {request.id} уже есть."
        )

    result = await services.organization_service.create(db=db, request=request)
    return result


@router.put("/{organization_id}",
            status_code=201,
            response_model=OrganizationInDB)
async def update_organization(*,
                              organization_id: int,
                              request: OrganizationUpdate,
                              db: AsyncSession = Depends(get_db)
                              ) -> dict:
    """Редактирование данных организации"""
    obj = await services.organization_service.get(db=db, id=organization_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Организация не найдена"
        )
    result = await services.organization_service.update(db=db, db_obj=obj, request=request)
    return result


@router.delete("/{organization_id}",
               status_code=200)
async def delete_organization(*,
                              organization_id: int,
                              db: AsyncSession = Depends(get_db)
                              ) -> dict:
    """Удаление организации"""
    obj = await services.organization_service.get(db=db, id=organization_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Организация не найдена"
        )
    result = await services.organization_service.remove(db=db, db_obj=obj)
    return result
