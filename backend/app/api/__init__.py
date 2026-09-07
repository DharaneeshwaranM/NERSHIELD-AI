"""
NER-SHIELD AI — API Routers Package
"""
from app.api import (
    auth,
    users,
    vehicles,
    shipments,
    routes_api,
    accessibility,
    incidents,
    alerts,
    analytics,
    tracking,
    simulation,
    copilot,
    field_reports,
    districts,
)

__all__ = [
    "auth",
    "users",
    "vehicles",
    "shipments",
    "routes_api",
    "accessibility",
    "incidents",
    "alerts",
    "analytics",
    "tracking",
    "simulation",
    "copilot",
    "field_reports",
    "districts",
]
