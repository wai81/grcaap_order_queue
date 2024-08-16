from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload

from app.api.v1.schemas.organization import OrganizationCreate, OrganizationUpdate
from app.models.organization import Organization
from app.services.crud.base import CRUDBase


class CRUDOrganization(CRUDBase[Organization, OrganizationCreate, OrganizationUpdate]):
     async def get_by_id(self, db: AsyncSession, organization_id: int) -> Organization:
         query = select(Organization). \
             where(Organization.id == id). \
             options(joinedload('subunits'))

         result = await db.execute(query)
         return result.scalar()



organization = CRUDOrganization[Organization]
