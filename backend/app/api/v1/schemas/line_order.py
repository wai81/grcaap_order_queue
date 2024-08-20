from datetime import datetime

from pydantic import BaseModel, UUID4


class LineOrderBase(BaseModel):
    order_number: str
    order_create_date: datetime
    is_completed: bool


class LineOrderCreate(LineOrderBase):
    organization_id: int


class LineOrderUpdate(LineOrderBase):
    pass


class LineOrderInDB(LineOrderBase):
    id: UUID4
    organization_id: int

    class ConfigDict:
        from_attributes = True
