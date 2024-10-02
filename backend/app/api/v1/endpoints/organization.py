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
                            filters: OrganizationFilter = FilterDepends(OrganizationFilter),
                            db: AsyncSession = Depends(get_db)
                            ) -> Any:
    """Получение списка организаций, ТОР"""
    objects = await services.organization_service.get_list(db=db, filters=filters)
    result = objects
    return result

@router.get("/{organization_id}",
            status_code=200,
            response_model=OrganizationInDB)
async def get_organization(*,
                              organization_id: int,
                              db: AsyncSession = Depends(get_db)
                              ) -> dict:
    """Получение организации"""
    obj = await services.organization_service.get(db=db, id=organization_id)
    if not obj:
        raise HTTPException(
            status_code=404, detail=f"Организация не найдена"
        )

    return obj