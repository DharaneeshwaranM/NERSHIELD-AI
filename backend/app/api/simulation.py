"""
NER-SHIELD AI — What-If Disaster Simulation API Endpoints
"""
from fastapi import APIRouter
from app.schemas.schemas import SimulationRequest, SimulationResponse

router = APIRouter()


@router.post("/run", response_model=SimulationResponse)
async def run_disaster_simulation(req: SimulationRequest):
    penalty = 1.5 if req.severity == "critical" else 1.2 if req.severity == "high" else 0.9
    detour = 42.0 if req.road_id == "NH-27" else 35.0
    delay_min = int((req.duration_hours * 2.5 + detour * 0.8) * penalty)
    liters = round(detour * 2.4, 1)

    return SimulationResponse(
        scenario=f"Disaster Blockage: {req.hazard_type.upper()} on {req.road_id}",
        affected_vehicles_count=3,
        affected_shipments_count=4,
        accessibility_drop=int(-35 * penalty),
        avg_delay_minutes=delay_min,
        recommended_bypass=f"Alt Corridor B via Haflong (Assam Hills)",
        detour_km=detour,
        fuel_overhead_liters=liters,
        estimated_cost_inr=round(liters * 94 + 6500, 2)
    )
