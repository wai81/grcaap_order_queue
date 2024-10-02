from fastapi_pagination import Page
from fastapi_pagination.ext.async_sqlalchemy import paginate
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.filters.organization import OrganizationFilter
from app.api.v1.schemas.organization import OrganizationCreate, OrganizationUpdate
from app.models.organization import Organization
from app.services.base_service import BaseService


class OrganizationService(BaseService[Organization, OrganizationCreate, OrganizationUpdate]):

    async def get_list(
            self, db: AsyncSession, *,
            filters: OrganizationFilter,
    ) -> Page[Organization]:
        query = select(self.model)
        query = filters.filter(query)
        query = filters.sort(query)
        result = await paginate(db, query=query)

        return result


organization_service = OrganizationService(Organization)
