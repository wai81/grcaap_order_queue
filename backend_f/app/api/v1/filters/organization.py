from typing import Optional, List

from fastapi_filter.contrib.sqlalchemy import Filter

from app.models.organization import Organization


class OrganizationFilter(Filter):
    q: Optional[str] = None
    id__in: Optional[List[int]] = None
    order_by: Optional[list[str]] = ['id']

    class Constants(Filter.Constants):
        model = Organization
        search_field_name = "q"
        search_model_fields = ["title"]

    class Config:
        populate_by_name = True
