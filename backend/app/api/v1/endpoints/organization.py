from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.schemas.organization import Organization
from app.core.database import get_db


router = APIRouter()


@router.get("/", response_model=Organization)
async def get_organizations(db: AsyncSession = Depends(get_db)):
    # objects = await crud.organization
    # result = objects
    # return result
    pass

