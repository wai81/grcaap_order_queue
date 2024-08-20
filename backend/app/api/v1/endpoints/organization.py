from typing import List, Any

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app import services
from app.api.v1.schemas.organization import OrganizationInDB, OrganizationCreate, OrganizationUpdate
from app.api.dependencies import get_db
from app.models.organization import Organization

router = APIRouter()


@router.get("/", response_model=List[OrganizationInDB])
async def get_organizations(db: AsyncSession = Depends(get_db)) -> Any:
    objects = await services.organization_service.get_list(db=db)
    result = objects
    return result
