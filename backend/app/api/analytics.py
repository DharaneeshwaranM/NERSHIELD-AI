"""
NER-SHIELD AI — Analytics & KPI API Endpoints
"""
from fastapi import APIRouter
from data.demo.demo_data import KPI, MONTHLY_ANALYTICS, NE_STATES, DISTRICTS

router = APIRouter()


@router.get("/kpis")
async def get_kpis():
    return KPI


@router.get("/monthly")
async def get_monthly_analytics():
    return MONTHLY_ANALYTICS


@router.get("/state-summary")
async def get_state_summary():
    result = []
    for s in NE_STATES:
        dists = [d for d in DISTRICTS if d["state"] == s["id"]]
        avg_score = round(sum(d["accessibility"] for d in dists) / len(dists)) if dists else 70
        result.append({
            "state_id": s["id"],
            "state_name": s["name"],
            "average_accessibility": avg_score,
            "districts_monitored": len(dists),
            "vehicles_active": sum(d["vehicles"] for d in dists),
            "incidents_count": sum(d["incidents"] for d in dists)
        })
    return result
