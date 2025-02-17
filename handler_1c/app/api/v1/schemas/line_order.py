from datetime import datetime, date
from typing import Optional

from pydantic import BaseModel
from pydantic.types import UUID4


class LineOrderBase(BaseModel):
    order_number: str
    adress_object: Optional[str]
    costumer_contact_phone: str
    order_create_date: datetime
    departure: Optional[bool] # Это поле может быть True, False или None
    departure_date: Optional[date]
    completion_date: Optional[date]
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


class LineOrderResponse(BaseModel):
    id: UUID4
    order_number: str
    adress_object: Optional[str]
    order_create_date: datetime
    costumer_contact_phone: str
    organization_id: int
    departure: Optional[bool] # Это поле может быть True, False или None 
    departure_date: Optional[date]
    completion_date: Optional[date]
    is_completed: bool
    created_at: datetime
    row_num: int

    class ConfigDict:
        from_attributes = True



class LineOrderChangeStatus(BaseModel):
    is_completed: bool


class OrderCountByOrganization(BaseModel):
    order_date: date
    # organization_id: int
    count_orders: int

class OrderCountBySatus(BaseModel):
    count_orders: int
    completed_orders: int
    not_completed_orders: int

class OrderCountBySatusByDate(OrderCountBySatus):
    order_date: date
    # count_orders: int
    # completed_orders: int
    # not_completed_orders: int

