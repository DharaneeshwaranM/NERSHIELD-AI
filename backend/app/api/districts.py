"""
NER-SHIELD AI — Districts API Endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, Query
from data.demo.demo_data import DISTRICTS

router = APIRouter()


@router.get("/")
async def list_districts(
    state: Optional[str] = Query(None),
    remoteness: Optional[str] = Query(None)
):
    results = DISTRICTS
    if state and state.upper() != "ALL":
        results = [d for d in results if d["state"] == state.upper()]
    if remoteness and remoteness != "ALL":
        results = [d for d in results if d.get("remoteness") == remoteness]
    return results


@router.get("/{district_id}")
async def get_district(district_id: str):
    for d in DISTRICTS:
        if d["id"] == district_id:
            return d
    return {"error": "District not found"}
