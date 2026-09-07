# NER-SHIELD AI — REST & WebSocket API Specification

Base URL: `http://localhost:8000`  
Swagger UI: `http://localhost:8000/api/docs`  
ReDoc: `http://localhost:8000/api/redoc`  

---

## 1. Authentication
- `POST /api/auth/login`
  - Body: `{"email": "admin@nershield.gov.in", "password": "NerShield@2024"}`
  - Response: `{"access_token": "...", "token_type": "bearer", "role": "super_admin", "user_id": "USR-001"}`
- `GET /api/auth/me`

## 2. Fleet Telemetry
- `GET /api/vehicles`
  - Query params: `state` (e.g. `AS`, `ML`, `AR`), `status` (`moving`, `idle`, `delayed`, `at_risk`), `risk` (`critical`, `high`, `low`)
- `GET /api/vehicles/{id}`
- `PATCH /api/vehicles/{id}/location`
  - Query params: `lat`, `lon`, `speed`

## 3. Shipments & Logistics
- `GET /api/shipments`
  - Query params: `priority` (`critical`, `high`, `normal`), `status` (`in_transit`, `delayed`, `pending`)
- `POST /api/shipments`
  - Automatic AI vehicle assignment and ETA computation if `vehicle_id` is omitted.
- `GET /api/shipments/{id}`

## 4. Accessibility & Corridors
- `GET /api/accessibility/roads`
  - Query params: `status` (`accessible`, `restricted`, `high_risk`, `blocked`)
- `GET /api/accessibility/summary`
  - Aggregated stats across all 8 North Eastern states.

## 5. Routes & Optimization
- `GET /api/routes/compare?shipment_id=SHP-MED-2041`
  - Returns Route A (current disrupted) vs Route B (AI recommended bypass).
- `POST /api/routes/optimize`
  - Multi-stop risk-weighted routing query.

## 6. Hazards & Incidents
- `GET /api/incidents`
  - Query params: `severity`, `status`
- `POST /api/incidents`
  - Publishes incident, updates road accessibility score, and generates alerts.

## 7. Field Reports (Edge / Offline Sync)
- `GET /api/field-reports`
- `POST /api/field-reports`
  - Ingests reports queued offline from mobile field devices.

## 8. Alerts & Warnings
- `GET /api/alerts`
- `PATCH /api/alerts/{id}/acknowledge`

## 9. Analytics & Reporting
- `GET /api/analytics/kpis`
- `GET /api/analytics/monthly`
- `GET /api/analytics/state-summary`

## 10. AI Copilot & Disruption Simulation
- `POST /api/copilot/query`
  - Body: `{"query": "Which shipments are at risk?"}`
- `POST /api/simulation/run`
  - Body: `{"road_id": "NH-27", "hazard_type": "landslide", "severity": "critical", "duration_hours": 12}`

## 11. WebSocket Live Stream
- `WS /ws/telemetry`
  - Live GPS ping stream, real-time alert broadcasts, and dynamic reroute events.
