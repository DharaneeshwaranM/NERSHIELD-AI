"""
NER-SHIELD AI — Accessibility Intelligence API Endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, Query
from app.schemas.schemas import RoadOut
from data.demo.demo_data import ROADS, DISTRICTS, KPI

router = APIRouter()


@router.get("/roads")
async def list_roads(status: Optional[str] = Query(None)):
    results = ROADS
    if status and status != "all":
        results = [r for r in results if r["status"] == status]
    return results


@router.get("/summary")
async def get_accessibility_summary():
    total = len(ROADS)
    blocked = len([r for r in ROADS if r["status"] == "blocked"])
    high_risk = len([r for r in ROADS if r["status"] == "high_risk"])
    restricted = len([r for r in ROADS if r["status"] == "restricted"])
    accessible = len([r for r in ROADS if r["status"] == "accessible"])
    avg_score = round(sum(r["score"] for r in ROADS) / total) if total else 70

    return {
        "average_score": avg_score,
        "total_roads": total,
        "accessible_count": accessible,
        "restricted_count": restricted,
        "high_risk_count": high_risk,
        "blocked_count": blocked,
        "monitored_states": 8
    }
