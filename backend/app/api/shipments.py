"""
NER-SHIELD AI — Shipments Management API Endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.schemas import ShipmentOut, ShipmentCreate
from data.demo.demo_data import SHIPMENTS, VEHICLES

router = APIRouter()

shipments_cache = list(SHIPMENTS)


@router.get("/", response_model=List[ShipmentOut])
async def list_shipments(
    priority: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    results = shipments_cache
    if priority and priority != "all":
        results = [s for s in results if s.get("priority") == priority]
    if status and status != "all":
        results = [s for s in results if s.get("status") == status]
    return results


@router.get("/{shipment_id}", response_model=ShipmentOut)
async def get_shipment(shipment_id: str):
    for s in shipments_cache:
        if s["id"] == shipment_id:
            return s
    raise HTTPException(status_code=404, detail="Shipment not found")


@router.post("/", response_model=ShipmentOut)
async def create_shipment(s_in: ShipmentCreate):
    s_dict = s_in.model_dump()
    
    # AI Auto-Assignment logic if no vehicle assigned
    if not s_dict.get("vehicle_id"):
        # Pick first available vehicle
        available = [v for v in VEHICLES if v["status"] in ["idle", "moving"]]
        if available:
            s_dict["vehicle_id"] = available[0]["id"]
            s_dict["eta"] = "6h 15m"
            s_dict["delay_probability"] = 0.12

    shipments_cache.insert(0, s_dict)
    return s_dict
