"""
NER-SHIELD AI — Copilot Query API Endpoints
"""
from fastapi import APIRouter
from app.schemas.schemas import CopilotQuery, CopilotAnswer
from data.demo.demo_data import COPILOT_RESPONSES

router = APIRouter()


@router.post("/query", response_model=CopilotAnswer)
async def query_copilot(req: CopilotQuery):
    q = req.query.lower()
    answer = ""
    suggestions = [
        "Which shipments are at risk?",
        "Show blocked routes",
        "Safest route to Tawang"
    ]
    actions = []

    if "shipment" in q:
        answer = COPILOT_RESPONSES.get("which shipments are at risk", "")
        actions.append({"label": "View Shipments Board", "href": "/shipments"})
    elif "block" in q or "route" in q or "road" in q:
        answer = COPILOT_RESPONSES.get("show blocked routes", "")
        actions.append({"label": "View Road Accessibility", "href": "/accessibility"})
    elif "vehicle" in q:
        answer = COPILOT_RESPONSES.get("which vehicles are delayed", "")
        actions.append({"label": "Fleet Telemetry", "href": "/fleet"})
    elif "tawang" in q:
        answer = COPILOT_RESPONSES.get("safest route to tawang", "")
        actions.append({"label": "Compare Alternate Corridors", "href": "/routes"})
    elif "district" in q:
        answer = COPILOT_RESPONSES.get("districts lowest accessibility", "")
        actions.append({"label": "Districts Matrix", "href": "/districts"})
    else:
        answer = "I am monitoring 8 North Eastern states, 15 vehicles, and real-time road conditions. Ask about delayed medicine shipments, road closures, or scenario simulations."
        actions.append({"label": "View Control Tower", "href": "/dashboard"})

    return CopilotAnswer(
        answer=answer,
        suggestions=suggestions,
        recommended_actions=actions
    )
