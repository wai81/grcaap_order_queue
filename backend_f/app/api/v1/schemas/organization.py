from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class OrganizationBase(BaseModel):
    id: int
    title: str
    fullname: str


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(OrganizationBase):
    is_active: bool


class OrganizationInDB(OrganizationBase):
    is_active: bool
    created_at: Optional[datetime]

    class ConfigDict:
        from_attributes = True
