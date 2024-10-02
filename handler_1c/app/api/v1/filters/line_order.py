from typing import Optional

from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter

from app.api.v1.filters.organization import OrganizationFilter
from app.models.line_order import LineOrder


class OrderFilter(Filter):
    order_number: Optional[str]
    organization: Optional[OrganizationFilter] = FilterDepends(with_prefix('organization', OrganizationFilter))

    class Constants(Filter.Constants):
        model = LineOrder
        search_model_fields = "order_number"
        search_model_fields = ["order_number"]

    class Config:
        populate_by_name = True
