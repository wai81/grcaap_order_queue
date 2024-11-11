from typing import Optional, List

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import Field
from app.models.organization import Organization


class OrganizationFilter(Filter):
    order_by: Optional[list[str]]  = Field(default=None)
    q: Optional[str] = Field(default=None)
    id__in: Optional[List[int]] = Field(default=None)

    class Constants(Filter.Constants):
        model = Organization
        search_field_name = "q"
        search_model_fields = ["title"]

    class Config:
        populate_by_name = True
