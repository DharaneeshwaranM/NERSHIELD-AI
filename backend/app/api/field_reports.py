"""
NER-SHIELD AI — Field Reports & Edge Sync API Endpoints
"""
from typing import List
from datetime import datetime
from fastapi import APIRouter
from app.schemas.schemas import FieldReportOut, FieldReportCreate

router = APIRouter()

FIELD_REPORTS_DB = [
    {
        "id": "REP-001",
        "hazard_type": "Landslide",
        "severity": "critical",
        "road_id": "NH-27",
        "description": "Massive rockfall blocking both lanes near Diphu. Water logging.",
        "latitude": 26.0930,
        "longitude": 93.5497,
        "reported_by": "FO-AS-003",
        "status": "synced",
        "photo_url": "/uploads/landslide_diphu.jpg",
        "created_at": datetime.utcnow()
    },
    {
        "id": "REP-002",
        "hazard_type": "Flooding",
        "severity": "high",
        "road_id": "NH-8",
        "description": "Flash flooding near Jowai. 60cm water over road.",
        "latitude": 25.4343,
        "longitude": 92.1816,
        "reported_by": "FO-ML-001",
        "status": "synced",
        "photo_url": None,
        "created_at": datetime.utcnow()
    }
]


@router.get("/", response_model=List[FieldReportOut])
async def list_field_reports():
    return FIELD_REPORTS_DB


@router.post("/", response_model=FieldReportOut)
async def submit_field_report(report_in: FieldReportCreate):
    rep_dict = report_in.model_dump()
    rep_dict["id"] = f"REP-00{len(FIELD_REPORTS_DB) + 1}"
    rep_dict["status"] = "synced"
    rep_dict["created_at"] = datetime.utcnow()
    FIELD_REPORTS_DB.insert(0, rep_dict)
    return rep_dict
