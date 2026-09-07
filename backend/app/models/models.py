"""
NER-SHIELD AI — SQLAlchemy Database Models
Covers users, fleet vehicles, shipments, roads, incidents, alerts, districts, and field reports.
"""
from datetime import datetime
import json
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, Enum
)
from sqlalchemy.orm import relationship
from app.database.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    role = Column(String(50), default="field_officer")  # super_admin, control_room, logistics_manager, field_officer
    state = Column(String(50), default="Central")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(String(50), primary_key=True, index=True)
    reg_number = Column(String(50), unique=True, nullable=False)
    vehicle_type = Column(String(50), default="Medium Truck")
    capacity_tons = Column(Float, default=10.0)
    driver_name = Column(String(100), nullable=False)
    driver_phone = Column(String(20), nullable=True)
    state = Column(String(10), nullable=False)
    district_id = Column(String(50), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    speed_kmh = Column(Float, default=0.0)
    fuel_pct = Column(Integer, default=100)
    status = Column(String(30), default="idle")  # moving, idle, delayed, at_risk, arrived, offline
    current_route = Column(String(50), nullable=True)
    current_shipment_id = Column(String(50), nullable=True)
    eta = Column(String(20), nullable=True)
    risk_level = Column(String(20), default="low")  # low, medium, high, critical
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(String(50), primary_key=True, index=True)
    shipment_type = Column(String(50), default="Medicine")  # Medicine, Food, Emergency Supplies, etc.
    priority = Column(String(20), default="normal")        # critical, high, normal, low
    origin = Column(String(150), nullable=False)
    destination = Column(String(150), nullable=False)
    vehicle_id = Column(String(50), ForeignKey("vehicles.id"), nullable=True)
    weight_kg = Column(Float, default=1000.0)
    items_description = Column(Text, nullable=True)
    deadline = Column(DateTime, nullable=True)
    status = Column(String(30), default="pending")  # pending, in_transit, delayed, delivered, cancelled
    eta = Column(String(20), nullable=True)
    delay_probability = Column(Float, default=0.0)
    route = Column(String(50), nullable=True)
    distance_km = Column(Float, default=100.0)
    created_at = Column(DateTime, default=datetime.utcnow)


class Road(Base):
    __tablename__ = "roads"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    road_type = Column(String(50), default="National Highway")
    score = Column(Integer, default=75)  # 0 to 100
    status = Column(String(30), default="accessible")  # accessible, restricted, high_risk, blocked
    weather = Column(String(50), default="clear")
    traffic = Column(String(30), default="light")
    incidents_count = Column(Integer, default=0)
    length_km = Column(Float, default=100.0)
    trend = Column(String(20), default="stable")
    updated_at = Column(DateTime, default=datetime.utcnow)


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String(50), primary_key=True, index=True)
    incident_type = Column(String(50), nullable=False)  # landslide, flooding, bridge_damage, road_damage, weather
    severity = Column(String(20), default="medium")     # critical, high, medium, low
    road_id = Column(String(50), nullable=False)
    district_id = Column(String(50), nullable=True)
    state = Column(String(10), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(Text, nullable=False)
    reported_by = Column(String(50), nullable=True)
    verified = Column(Boolean, default=False)
    status = Column(String(30), default="active")  # active, resolving, resolved
    accessibility_impact = Column(Integer, default=-20)
    created_at = Column(DateTime, default=datetime.utcnow)


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String(50), primary_key=True, index=True)
    severity = Column(String(20), default="medium")
    alert_type = Column(String(50), nullable=False)
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    incident_id = Column(String(50), nullable=True)
    affected_vehicles_json = Column(Text, default="[]")
    affected_shipments_json = Column(Text, default="[]")
    recommendation = Column(Text, nullable=True)
    acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    @property
    def affected_vehicles(self):
        try:
            return json.loads(self.affected_vehicles_json or "[]")
        except:
            return []

    @property
    def affected_shipments(self):
        try:
            return json.loads(self.affected_shipments_json or "[]")
        except:
            return []


class District(Base):
    __tablename__ = "districts"

    id = Column(String(50), primary_key=True, index=True)
    state = Column(String(10), nullable=False)
    name = Column(String(150), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    remoteness = Column(String(30), default="medium")  # urban, medium, remote, very_remote
    accessibility = Column(Integer, default=70)
    vehicles = Column(Integer, default=0)
    incidents = Column(Integer, default=0)
    critical_shipments = Column(Integer, default=0)


class FieldReport(Base):
    __tablename__ = "field_reports"

    id = Column(String(50), primary_key=True, index=True)
    hazard_type = Column(String(50), nullable=False)
    severity = Column(String(20), default="medium")
    road_id = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    reported_by = Column(String(50), default="Field Officer")
    status = Column(String(30), default="synced")  # queued, synced, verified
    photo_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
