"""
NER-SHIELD AI — Live GPS Telemetry & Tracking Stream Endpoints
"""
from fastapi import APIRouter
from data.demo.demo_data import VEHICLES

router = APIRouter()


@router.get("/fleet")
async def get_live_tracking():
    return {
        "active_transponders": len(VEHICLES),
        "tracking_protocol": "MQTT/WebSocket",
        "positions": [
            {
                "id": v["id"],
                "reg": v["reg"],
                "lat": v["lat"],
                "lon": v["lon"],
                "speed": v["speed"],
                "status": v["status"],
                "route": v.get("route")
            }
            for v in VEHICLES
        ]
    }
