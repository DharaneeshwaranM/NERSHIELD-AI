"""
NER-SHIELD AI — FastAPI Backend
Main application entry point
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware

from app.core.config import settings
from app.database.session import engine, Base
from app.api import (
    auth, users, vehicles, shipments, routes_api,
    accessibility, incidents, alerts, analytics,
    tracking, simulation, copilot, field_reports, districts
)
from app.core.websocket_manager import websocket_router

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)
logger = logging.getLogger("ner_shield")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    logger.info("🚀 Starting NER-SHIELD AI Backend...")
    # Create DB tables if not exist (migrations handle production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("✅ Database ready")
    logger.info("✅ NER-SHIELD AI is live")
    yield
    logger.info("⛔ Shutting down NER-SHIELD AI...")


app = FastAPI(
    title="NER-SHIELD AI API",
    description="""
## North Eastern Region Smart Logistics & Accessibility Intelligence Platform

**Team:** BYTE BUILDERS  
**SIH Problem Statement:** SIH26002  
**Organization:** Ministry of Development of North Eastern Region (MDoNER)

### Features
- 🗺 Real-time accessibility intelligence
- 🚚 Fleet and shipment tracking  
- 🧭 AI-powered route optimization
- ⚠ Dynamic re-routing on disruptions
- 📊 Predictive ETA and delay analytics
- 🤖 AI Copilot for logistics decisions
- 🧪 What-If disruption simulator
- 📍 District-level intelligence dashboard
    """,
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# ── Middleware ─────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API Routers ────────────────────────────────────────────────
app.include_router(auth.router,          prefix="/api/auth",         tags=["Authentication"])
app.include_router(users.router,         prefix="/api/users",        tags=["Users"])
app.include_router(vehicles.router,      prefix="/api/vehicles",     tags=["Fleet"])
app.include_router(shipments.router,     prefix="/api/shipments",    tags=["Shipments"])
app.include_router(routes_api.router,    prefix="/api/routes",       tags=["Routes"])
app.include_router(accessibility.router, prefix="/api/accessibility",tags=["Accessibility"])
app.include_router(incidents.router,     prefix="/api/incidents",    tags=["Incidents"])
app.include_router(field_reports.router, prefix="/api/field-reports",tags=["Field Reports"])
app.include_router(alerts.router,        prefix="/api/alerts",       tags=["Alerts"])
app.include_router(analytics.router,     prefix="/api/analytics",    tags=["Analytics"])
app.include_router(tracking.router,      prefix="/api/tracking",     tags=["Tracking"])
app.include_router(simulation.router,    prefix="/api/simulation",   tags=["Simulation"])
app.include_router(copilot.router,       prefix="/api/copilot",      tags=["AI Copilot"])
app.include_router(districts.router,     prefix="/api/districts",    tags=["Districts"])
app.include_router(websocket_router,                                  tags=["WebSocket"])

# ── Static Files ───────────────────────────────────────────────
import os
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/", tags=["Health"])
async def root():
    return {
        "service": "NER-SHIELD AI API",
        "version": "1.0.0",
        "status": "operational",
        "team": "BYTE BUILDERS",
        "sih": "SIH26002",
    }


@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "services": {
            "api": "online",
            "database": "connected",
            "ai_engine": "online",
            "websocket": "active",
        }
    }
