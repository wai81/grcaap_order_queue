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
    adress_object__ilike: Optional[str] = Field(alias='adress_object__like',default=None)
    # order_create_date: Optional[datetime] = Field(alias='order_create_date', default=None)
    # organization: Optional[OrganizationFilter] = FilterDepends(with_prefix('organization', OrganizationFilter))
    organization_id__in: Optional[list[int]] = Field(default=None)
    departure__in: Optional[list[bool]] = Field(default=None)
    is_completed__in: Optional[list[bool]] = Field(default=None)

    class Constants(Filter.Constants):
        model = LineOrder
        search_model_fields = ["order_number"]

    @classmethod  
    def custom_filter(cls, query, filters):  
        if filters.adress_object__like:
            # фильтрация по полю adress_object без учета регистра ilike
            query = query.where(LineOrder.adress_object.ilike(f'%{filters.adress_object__ilike}%'))
        
        return query  

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


class OrderLineFilter(Filter):
    order_by: Optional[list[str]] = Field(default=None)
    order_number: Optional[str] = Field(default=None)
    adress_object__like: Optional[str] = Field(default=None)
    organization_id__in: Optional[list[int]] = Field(default=None)
    order_create_date__gte: Optional[datetime] = Field(alias='order_create_date_gte', default=None)
    order_create_date__lte: Optional[datetime] = Field(alias='order_create_date_lte', default=None)
    # is_completed__in: Optional[list[bool]] = Field(default=None)
    departure__in: Optional[list[bool]] = Field(default=None)

    class Constants(Filter.Constants):
        model = LineOrder
        search_model_fields = ["order_number"]
    
    @classmethod  
    def custom_filter(cls, query, filters, subquery):  
        """  
        Применяет кастомные фильтры к запросу.  
        """  
        # Фильтр по ID организации (если указан)  
        if filters.organization_id__in:  # Проверяем наличие фильтра  
            query = query.where(subquery.c.organization_id.in_(filters.organization_id__in))  

        # Фильтр по номеру заказа (если указан)  
        if filters.order_number:  
            query = query.where(subquery.c.order_number == filters.order_number)  

        # Фильтр по датам создания заказа  
        if filters.order_create_date__gte:  
            query = query.where(subquery.c.order_create_date >= filters.order_create_date__gte)  

        if filters.order_create_date__lte:  
            query = query.where(subquery.c.order_create_date <= filters.order_create_date__lte) 
        
        if filters.adress_object__like:
            # фильтрация по полю adress_object без учета регистра ilike
            query = query.where(subquery.c.adress_object.ilike(f'%{filters.adress_object__like}%'))

        if filters.departure__in:
              query = query.where(subquery.c.departure.in_(filters.departure__in))  

        return query  

    class Config:
        populate_by_name = True
