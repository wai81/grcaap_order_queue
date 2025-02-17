from fastapi import APIRouter

from app.api.v1.endpoints import organization, line_order, dashboard

api_router = APIRouter()
api_router.include_router(organization.router, prefix="/organizations", tags=["organizations"])
api_router.include_router(line_order.router, prefix="/line_orders", tags=["line_orders"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
