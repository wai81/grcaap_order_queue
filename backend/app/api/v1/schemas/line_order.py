from datetime import datetime
from typing import Optional

from pydantic import BaseModel, UUID4


class LineOrderBase(BaseModel):
    order_number: str
    costumer_contact_phone: str
    order_create_date: datetime
    is_completed: bool


class LineOrderCreate(LineOrderBase):
    organization_id: int


class LineOrderUpdate(LineOrderBase):
    pass


class LineOrderInDB(LineOrderBase):
    id: UUID4
    organization_id: int
    created_at: datetime

    class ConfigDict:
        from_attributes = True
