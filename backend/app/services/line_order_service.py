from datetime import timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.schemas.line_order import LineOrderCreate, LineOrderUpdate
from app.models.line_order import LineOrder
from app.models.organization import Organization
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


line_order_service = LineOrderService(LineOrder)
