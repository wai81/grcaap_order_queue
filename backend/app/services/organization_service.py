from app.api.v1.schemas.organization import OrganizationCreate, OrganizationUpdate
from app.models.organization import Organization
from app.services.base_service import BaseService


class OrganizationService(BaseService[Organization, OrganizationCreate, OrganizationUpdate]):
    pass


organization_service = OrganizationService(Organization)
