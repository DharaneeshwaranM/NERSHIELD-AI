"""
NER-SHIELD AI — Fleet Vehicles API Endpoints
Provides real-time GPS tracking, vehicle telemetry, fuel levels, and risk status.
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.schemas import VehicleOut, VehicleCreate
from data.demo.demo_data import VEHICLES

router = APIRouter()

# In-memory working copy
vehicles_cache = list(VEHICLES)


@router.get("/", response_model=List[VehicleOut])
async def list_vehicles(
    state: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    risk: Optional[str] = Query(None)
):
    results = vehicles_cache
    if state and state.upper() != "ALL":
        results = [v for v in results if v.get("state") == state.upper()]
    if status:
        results = [v for v in results if v.get("status") == status]
    if risk:
        results = [v for v in results if v.get("risk_level") == risk]
    return results


@router.get("/{vehicle_id}", response_model=VehicleOut)
async def get_vehicle(vehicle_id: str):
    for v in vehicles_cache:
        if v["id"] == vehicle_id:
            return v
    raise HTTPException(status_code=404, detail="Vehicle not found")


@router.post("/", response_model=VehicleOut)
async def create_vehicle(v_in: VehicleCreate):
    v_dict = v_in.model_dump()
    vehicles_cache.append(v_dict)
    return v_dict


@router.patch("/{vehicle_id}/location")
async def update_location(vehicle_id: str, lat: float, lon: float, speed: float = 40.0):
    for v in vehicles_cache:
        if v["id"] == vehicle_id:
            v["latitude"] = lat
            v["longitude"] = lon
            v["speed_kmh"] = speed
            return {"status": "updated", "vehicle_id": vehicle_id, "lat": lat, "lon": lon}
    raise HTTPException(status_code=404, detail="Vehicle not found")
