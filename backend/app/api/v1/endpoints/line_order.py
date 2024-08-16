from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.schemas.line_order import LineOrder
from app.core.database import get_db

router = APIRouter()


@router.get("/", response_model=LineOrder)
async def get_orders(db: AsyncSession = Depends(get_db)):
    # objects = await crud.organization.get_organiztions_filter(db=db)
    # result = objects
    # return result
    pass
