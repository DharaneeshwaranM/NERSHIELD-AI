"""
NER-SHIELD AI — Alerts API Endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.schemas import AlertOut
from data.demo.demo_data import ALERTS

router = APIRouter()

alerts_cache = list(ALERTS)


@router.get("/", response_model=List[AlertOut])
async def list_alerts(
    severity: Optional[str] = Query(None),
    acknowledged: Optional[bool] = Query(None)
):
    results = alerts_cache
    if severity and severity != "all":
        results = [a for a in results if a.get("severity") == severity]
    if acknowledged is not None:
        results = [a for a in results if a.get("acknowledged") == acknowledged]
    return results


@router.patch("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str):
    for a in alerts_cache:
        if a["id"] == alert_id:
            a["acknowledged"] = True
            return {"status": "success", "alert_id": alert_id, "acknowledged": True}
    raise HTTPException(status_code=404, detail="Alert not found")
