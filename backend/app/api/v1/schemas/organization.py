from datetime import datetime

from pydantic import BaseModel


class OrganizationBase(BaseModel):
    id: int
    title: str
    fullname: str


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(OrganizationBase):
    is_active: bool


class Organization(OrganizationBase):
    is_active: bool
    created_at: datetime

    class ConfigDict:
        from_attributes = True
