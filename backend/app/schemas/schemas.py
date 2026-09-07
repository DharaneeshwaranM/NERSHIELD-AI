"""
NER-SHIELD AI — Pydantic Schemas
Validation and serialization schemas for all API requests and responses.
"""
from typing import List, Optional, Any, Dict
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: str
    full_name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "field_officer"
    state: str = "Central"


class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str
    state: str
    is_active: bool

    class Config:
        from_attributes = True


# Vehicle Schemas
class VehicleCreate(BaseModel):
    id: str
    reg_number: str
    vehicle_type: str
    capacity_tons: float
    driver_name: str
    driver_phone: Optional[str] = None
    state: str
    district_id: Optional[str] = None
    latitude: float
    longitude: float
    speed_kmh: float = 0.0
    fuel_pct: int = 100
    status: str = "idle"
    current_route: Optional[str] = None
    risk_level: str = "low"


class VehicleOut(VehicleCreate):
    current_shipment_id: Optional[str] = None
    eta: Optional[str] = None

    class Config:
        from_attributes = True


# Shipment Schemas
class ShipmentCreate(BaseModel):
    id: str
    shipment_type: str
    priority: str
    origin: str
    destination: str
    vehicle_id: Optional[str] = None
    weight_kg: float
    items_description: Optional[str] = None
    deadline: Optional[datetime] = None
    status: str = "pending"
    route: Optional[str] = None
    distance_km: float = 100.0


class ShipmentOut(ShipmentCreate):
    eta: Optional[str] = None
    delay_probability: float = 0.0

    class Config:
        from_attributes = True


# Road & Accessibility Schemas
class RoadOut(BaseModel):
    id: str
    name: str
    road_type: str
    score: int
    status: str
    weather: str
    traffic: str
    incidents_count: int
    length_km: float
    trend: str

    class Config:
        from_attributes = True


# Incident Schemas
class IncidentCreate(BaseModel):
    incident_type: str
    severity: str
    road_id: str
    district_id: Optional[str] = None
    state: str
    latitude: float
    longitude: float
    description: str
    reported_by: Optional[str] = None


class IncidentOut(IncidentCreate):
    id: str
    verified: bool
    status: str
    accessibility_impact: int
    created_at: datetime

    class Config:
        from_attributes = True


# Alert Schemas
class AlertOut(BaseModel):
    id: str
    severity: str
    alert_type: str
    title: str
    message: str
    incident_id: Optional[str] = None
    affected_vehicles: List[str] = []
    affected_shipments: List[str] = []
    recommendation: Optional[str] = None
    acknowledged: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Field Report Schemas
class FieldReportCreate(BaseModel):
    hazard_type: str
    severity: str
    road_id: str
    description: str
    latitude: float
    longitude: float
    reported_by: Optional[str] = "Field Officer"
    photo_url: Optional[str] = None


class FieldReportOut(FieldReportCreate):
    id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Copilot & Simulator
class CopilotQuery(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None


class CopilotAnswer(BaseModel):
    answer: str
    suggestions: List[str] = []
    recommended_actions: List[Dict[str, str]] = []


class SimulationRequest(BaseModel):
    road_id: str
    hazard_type: str
    severity: str
    duration_hours: int


class SimulationResponse(BaseModel):
    scenario: str
    affected_vehicles_count: int
    affected_shipments_count: int
    accessibility_drop: int
    avg_delay_minutes: int
    recommended_bypass: str
    detour_km: float
    fuel_overhead_liters: float
    estimated_cost_inr: float
