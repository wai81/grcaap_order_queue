from typing import Optional
from datetime import datetime, date

from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import Field
from app.api.v1.filters.organization import OrganizationFilter
from app.models.line_order import LineOrder


class OrderListFilter(Filter):
    order_by: Optional[list[str]] = Field(default=None)
    order_number: Optional[str] = Field(default=None)
    # order_create_date: Optional[datetime] = Field(alias='order_create_date', default=None)
    # organization: Optional[OrganizationFilter] = FilterDepends(with_prefix('organization', OrganizationFilter))
    organization_id__in: Optional[list[int]] = Field(default=None)
    is_completed__in: Optional[list[bool]] = Field(default=None)

    class Constants(Filter.Constants):
        model = LineOrder
        search_model_fields = "order_number"
        search_model_fields = ["order_number"]

    class Config:
        populate_by_name = True


class OrderCountFilter(Filter):
    order_create_date__gte: Optional[datetime] = Field(alias='order_create_date_gte', default=None)
    order_create_date__lte: Optional[datetime] = Field(alias='order_create_date_lte', default=None)
    organization_id__in: Optional[list[int]] = Field(default=None)
    is_completed__in: Optional[list[bool]] = Field(default=None)

    class Constants(Filter.Constants):
        model = LineOrder

    class Config:
        extra = "allow"
    #     populate_by_name = True
