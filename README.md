# NER-SHIELD AI 🛡️
### North Eastern Region Smart Logistics & Accessibility Intelligence Platform
**Team:** BYTE BUILDERS  
**SIH Problem Statement:** SIH26002  
**Organization:** Ministry of Development of North Eastern Region (MDoNER)  
**Theme:** Smart Automation | **Category:** Software  

---
prototype:https://nershield-ai.onrender.com/

## 🌟 Executive Overview
The North Eastern Region (NER) of India comprises 8 states characterized by rugged Himalayan terrain, heavy seasonal monsoons, frequent landslides, flash floods, and vulnerable arterial bridges. When key transit corridors (such as NH-27, NH-8, or MDR-1) are disrupted, essential medicine, food rations, and disaster relief can be delayed for days.

**NER-SHIELD AI** is an autonomous logistics and accessibility intelligence platform designed for MDoNER, State Disaster Management Authorities (SDMAs), fleet controllers, and field officers.

### Core Value Deliverables:
1. **Dynamic Accessibility Scoring (0–100):** Real-time composite scoring of road networks accounting for IMD weather, road slope, traffic congestion, and ground hazard reports.
2. **Autonomous Multi-Criteria Rerouting:** Risk-weighted shortest-path bypass calculations that preemptively reroute shipments before trucks enter blocked corridors.
3. **Multi-Hazard Prediction & Disruption Modeling:** Monte Carlo What-If simulator to model bridge outages, heavy snowfall in Tawang, or landslides in Karbi Anglong.
4. **Offline-First Field Officer App:** SQLite-buffered incident reporting station with auto-sync, GPS geocoding, and multimedia evidence capture for disconnected mountain zones.
5. **Generative AI Logistics Copilot:** Domain-tuned LLM assistant for natural language logistics queries, rapid threat summaries, and executive decisions.

---

## 🏗️ Architecture & Technology Stack

```
[ Field Officers (Offline App) ]     [ IoT Fleet Sensors / GPS ]     [ IMD Weather Feeds ]
              │                                   │                           │
              ▼                                   ▼                           ▼
      [ Edge SQLite Sync ]              [ WebSocket Stream ]          [ Weather Adapter ]
              │                                   │                           │
              └───────────────────────┬───────────┴───────────────────────────┘
                                      ▼
                        [ FastAPI Microservices Backend ]
                                      │
               ┌──────────────────────┼──────────────────────┐
               ▼                      ▼                      ▼
      [ PostGIS Spatial DB ]  [ Redis In-Memory ]   [ AI Engine (Scoring, ETA, Dijkstra) ]
               │                      │                      │
               └──────────────────────┼──────────────────────┘
                                      ▼
                   [ Next.js 14 Web Command Center (Turbopack) ]
                                      │
        ┌───────────────┬─────────────┴───────────────┬────────────────┐
        ▼               ▼                             ▼                ▼
   [ Control Tower ] [ GIS Leaflet Map ]       [ Analytics ]    [ AI Copilot ]
```

### Stack Components:
- **Frontend:** Next.js 14 (App Router, Turbopack), React 19, TypeScript, Vanilla CSS design tokens + Tailwind CSS, Recharts, Leaflet.js / OpenStreetMap, Lucide Icons.
- **Backend:** FastAPI, Python 3.11, Pydantic v2, SQLAlchemy (Async), Uvicorn, WebSockets.
- **Database & Spatial:** PostgreSQL 15 + PostGIS (Geographic spatial indexing), Redis 7 (telemetry caching).
- **AI/ML Algorithms:**
  - `AccessibilityScorer`: Multi-criteria weighted matrix of weather, slope, and hazard penalties.
  - `ETAPredictor`: Speed-decay regression model calculating delay probabilities.
  - `RouteOptimizer`: Risk-weighted Dijkstra algorithm incorporating terrain vulnerability.

---

## 🚀 Quick Start Guide

### Option A: Running with Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/DharaneeshwaranM/NERSHIELD-AI.git
   cd ner-shield-ai
   ```

2. Spin up the full-stack cluster:
   ```bash
   docker-compose up --build
   ```

3. Access the platform:
   - **Web Application:** [http://localhost:3000](http://localhost:3000)
   - **FastAPI Interactive Docs:** [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
   - **WebSocket Telemetry:** `ws://localhost:8000/ws/telemetry`

---

### Option B: Local Manual Setup

#### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🔑 Demo Credentials (Role-Based Access)

| Role | Official Email | Password | Scope |
|---|---|---|---|
| **Super Admin (MDoNER)** | `admin@nershield.gov.in` | `NerShield@2024` | All 8 States, AI Calibration, System Config |
| **State Controller** | `control.meghalaya@nershield.gov.in` | `NerShield@2024` | Meghalaya Regional Hub, Rerouting Approvals |
| **Fleet Manager** | `fleet.assam@nershield.gov.in` | `NerShield@2024` | Vehicle Dispatches, Fuel & Telemetry Tracking |
| **Field Officer** | `field.arunachal@nershield.gov.in` | `NerShield@2024` | Offline Reporting, Tawang Road Status |

> **Note:** Quick-login buttons for all 4 profiles are available directly on the landing page for instant evaluation.

---

## 🎯 Smart India Hackathon (SIH) 15-Step Evaluation Scenario

To demonstrate the real-time closed-loop capabilities of NER-SHIELD AI during presentation:

1. **Step 1 — Login:** Click "MDoNER Super Admin" on the landing page to enter the **NER Control Tower**.
2. **Step 2 — Fleet Telemetry:** Notice 15 vehicles tracked across 8 states with live speed, fuel, and route tags.
3. **Step 3 — Interactive Map:** Inspect the Leaflet GIS map showing color-coded road segments (Green: Accessible, Yellow: Restricted, Orange: High Risk, Red: Blocked).
4. **Step 4 — Disruption on NH-27:** Observe the active Landslide incident at km 847 near Diphu (Karbi Anglong).
5. **Step 5 — Threat Detection:** System flags 3 affected vehicles (VH-001, VH-002, VH-013) and 2 critical shipments (Food to Churachandpur & Medicine to Tawang).
6. **Step 6 — Alert Center:** Navigate to `/alerts` to see the automated critical alert generated within 2 seconds.
7. **Step 7 — AI Reroute Recommendation:** Click on the alert to view the autonomous recommendation: *"Re-route via Alt Corridor B (+35km, avoids 4-hour delay)"*.
8. **Step 8 — Side-by-Side Comparison:** Go to `/routes` to inspect Route A vs Route B with before/after delay risk comparisons (73% down to 18%).
9. **Step 9 — What-If Simulator:** Visit `/simulator` to test what happens if heavy snowfall hits MDR-1 in Tawang for 24 hours. The engine calculates impact on fuel, carbon, and transit delays.
10. **Step 10 — Autonomous AI Copilot:** Open `/copilot` and click the chip *"Safest route to Tawang"* or type *"What if NH-27 is blocked?"*.
11. **Step 11 — Offline Field Reporting:** Navigate to `/field`. Toggle "Simulate Offline Mode" to show that field officers in high-altitude passes can record geo-tagged incident reports into a local SQLite queue.
12. **Step 12 — Cloud Reconnect Sync:** Toggle network back online and click "Sync Queue". Reports immediately sync with Central Command.
13. **Step 13 — Districts Vulnerability Matrix:** View `/districts` to see real-time accessibility indexes across 20+ key districts in all 8 states.
14. **Step 14 — Strategic Analytics:** Check `/analytics` to review monthly delivery volumes, on-time rates, and export the official MDoNER compliance brief.
15. **Step 15 — Administrative Calibration:** Open `/admin` to adjust the AI ETA Hazard Penalty multiplier from 1.4x to 2.0x and observe model parameter deployment.

---

## 🛡️ Disclaimer
All data, road segments, vehicle registration numbers, and field personnel names in this prototype are **simulated for the Smart India Hackathon (SIH26002) competition demonstration** and do not represent actual government records.

---
**Developed with pride by Team BYTE BUILDERS for MDoNER.**
