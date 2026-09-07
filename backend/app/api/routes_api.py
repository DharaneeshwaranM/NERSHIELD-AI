"""
NER-SHIELD AI — Routes & Optimization API Endpoints
"""
from typing import Dict, Any, List
from fastapi import APIRouter
from data.demo.demo_data import ROUTE_COMPARISON, ROADS

router = APIRouter()


@router.get("/compare")
async def get_route_comparison(shipment_id: str = "SHP-MED-2041"):
    return ROUTE_COMPARISON


@router.post("/optimize")
async def optimize_route(payload: Dict[str, Any]):
    origin = payload.get("origin", "Guwahati")
    destination = payload.get("destination", "Tawang")
    shipment_type = payload.get("shipment_type", "Medicine")

    return {
        "origin": origin,
        "destination": destination,
        "shipment_type": shipment_type,
        "recommended_route": "Alt Corridor B via Tezpur & Bomdila",
        "distance_km": 615,
        "estimated_duration_hours": 7.8,
        "risk_index": 22,
        "avoided_hazards": ["NH-27 Landslide km 847", "Flash flood near Jowai"],
        "confidence_score": 0.94
    }
