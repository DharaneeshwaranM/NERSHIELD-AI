"""
NER-SHIELD AI — Incidents API Endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.schemas import IncidentOut, IncidentCreate
from data.demo.demo_data import INCIDENTS

router = APIRouter()

incidents_cache = list(INCIDENTS)


@router.get("/", response_model=List[IncidentOut])
async def list_incidents(
    severity: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    results = incidents_cache
    if severity and severity != "all":
        results = [i for i in results if i.get("severity") == severity]
    if status and status != "all":
        results = [i for i in results if i.get("status") == status]
    return results


@router.post("/", response_model=IncidentOut)
async def report_incident(i_in: IncidentCreate):
    from datetime import datetime
    new_inc = i_in.model_dump()
    new_inc["id"] = f"INC-00{len(incidents_cache) + 1}"
    new_inc["verified"] = True
    new_inc["status"] = "active"
    new_inc["accessibility_impact"] = -25
    new_inc["created_at"] = datetime.utcnow()
    incidents_cache.insert(0, new_inc)
    return new_inc
