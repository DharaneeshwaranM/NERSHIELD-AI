"""
NER-SHIELD AI — Comprehensive Demo Data
Realistic synthetic data for all 8 North Eastern states.
Clearly labeled as DEMO/SIMULATED data.

NOTE: This data is generated for demonstration purposes only.
It does NOT represent real government records, actual vehicle registrations,
or official road/infrastructure data.
"""
import random
from datetime import datetime, timedelta, timezone
from typing import Any

# ── NE India States & Districts ─────────────────────────────────────────────
NE_STATES = [
    {"id": "AS", "name": "Assam", "capital": "Dispur", "area_km2": 78438, "lat": 26.2006, "lon": 92.9376},
    {"id": "AR", "name": "Arunachal Pradesh", "capital": "Itanagar", "area_km2": 83743, "lat": 28.2180, "lon": 94.7278},
    {"id": "MN", "name": "Manipur", "capital": "Imphal", "area_km2": 22327, "lat": 24.6637, "lon": 93.9063},
    {"id": "ML", "name": "Meghalaya", "capital": "Shillong", "area_km2": 22429, "lat": 25.4670, "lon": 91.3662},
    {"id": "MZ", "name": "Mizoram", "capital": "Aizawl", "area_km2": 21081, "lat": 23.1645, "lon": 92.9376},
    {"id": "NL", "name": "Nagaland", "capital": "Kohima", "area_km2": 16579, "lat": 26.1584, "lon": 94.5624},
    {"id": "SK", "name": "Sikkim", "capital": "Gangtok", "area_km2": 7096, "lat": 27.5330, "lon": 88.5122},
    {"id": "TR", "name": "Tripura", "capital": "Agartala", "area_km2": 10486, "lat": 23.9408, "lon": 91.9882},
]

NE_DISTRICTS = [
    # Assam
    {"id": "AS-KAM", "state": "AS", "name": "Kamrup", "lat": 26.1445, "lon": 91.7362, "population": 1517234, "remoteness": "medium"},
    {"id": "AS-GWH", "state": "AS", "name": "Kamrup Metropolitan (Guwahati)", "lat": 26.1445, "lon": 91.7362, "population": 1253938, "remoteness": "urban"},
    {"id": "AS-DIG", "state": "AS", "name": "Dibrugarh", "lat": 27.4728, "lon": 94.9120, "population": 757088, "remoteness": "medium"},
    {"id": "AS-JOR", "state": "AS", "name": "Jorhat", "lat": 26.7509, "lon": 94.2037, "population": 1092256, "remoteness": "medium"},
    {"id": "AS-TIN", "state": "AS", "name": "Tinsukia", "lat": 27.4897, "lon": 95.3557, "population": 1327929, "remoteness": "medium"},
    {"id": "AS-NAL", "state": "AS", "name": "Nagaon", "lat": 26.3464, "lon": 92.6844, "population": 2823007, "remoteness": "medium"},
    {"id": "AS-CAC", "state": "AS", "name": "Cachar", "lat": 24.8333, "lon": 92.7789, "population": 1736617, "remoteness": "medium"},
    {"id": "AS-KAR", "state": "AS", "name": "Karbi Anglong", "lat": 26.0930, "lon": 93.5497, "population": 813311, "remoteness": "remote"},
    # Arunachal Pradesh
    {"id": "AR-ITA", "state": "AR", "name": "Papum Pare (Itanagar)", "lat": 27.0844, "lon": 93.6053, "population": 209829, "remoteness": "urban"},
    {"id": "AR-TAW", "state": "AR", "name": "Tawang", "lat": 27.5859, "lon": 91.8594, "population": 49977, "remoteness": "very_remote"},
    {"id": "AR-DIG", "state": "AR", "name": "Dibang Valley", "lat": 28.2756, "lon": 96.2785, "population": 7948, "remoteness": "very_remote"},
    {"id": "AR-CHA", "state": "AR", "name": "Changlang", "lat": 27.1292, "lon": 95.7352, "population": 147951, "remoteness": "remote"},
    {"id": "AR-LOW", "state": "AR", "name": "Lower Subansiri", "lat": 27.7500, "lon": 93.8500, "population": 83030, "remoteness": "remote"},
    # Manipur
    {"id": "MN-IMP", "state": "MN", "name": "Imphal West", "lat": 24.8170, "lon": 93.9368, "population": 517992, "remoteness": "urban"},
    {"id": "MN-CHU", "state": "MN", "name": "Churachandpur", "lat": 24.3333, "lon": 93.6833, "population": 274143, "remoteness": "remote"},
    {"id": "MN-UKH", "state": "MN", "name": "Ukhrul", "lat": 25.1000, "lon": 94.3667, "population": 183115, "remoteness": "very_remote"},
    {"id": "MN-SEN", "state": "MN", "name": "Senapati", "lat": 25.2578, "lon": 93.9745, "population": 479148, "remoteness": "remote"},
    # Meghalaya
    {"id": "ML-SHI", "state": "ML", "name": "East Khasi Hills (Shillong)", "lat": 25.5788, "lon": 91.8933, "population": 825922, "remoteness": "urban"},
    {"id": "ML-JAI", "state": "ML", "name": "West Jaintia Hills", "lat": 25.4343, "lon": 92.1816, "population": 294116, "remoteness": "medium"},
    {"id": "ML-GAS", "state": "ML", "name": "East Garo Hills", "lat": 25.5247, "lon": 90.6667, "population": 317917, "remoteness": "remote"},
    {"id": "ML-RIB", "state": "ML", "name": "Ri Bhoi", "lat": 26.1000, "lon": 92.0333, "population": 258380, "remoteness": "medium"},
    # Mizoram
    {"id": "MZ-AIZ", "state": "MZ", "name": "Aizawl", "lat": 23.7271, "lon": 92.7176, "population": 404996, "remoteness": "urban"},
    {"id": "MZ-LUN", "state": "MZ", "name": "Lunglei", "lat": 22.8882, "lon": 92.7327, "population": 162199, "remoteness": "remote"},
    {"id": "MZ-SER", "state": "MZ", "name": "Serchhip", "lat": 23.3000, "lon": 92.8500, "population": 64937, "remoteness": "remote"},
    # Nagaland
    {"id": "NL-KOH", "state": "NL", "name": "Kohima", "lat": 25.6701, "lon": 94.1077, "population": 267988, "remoteness": "urban"},
    {"id": "NL-DIH", "state": "NL", "name": "Dimapur", "lat": 25.9066, "lon": 93.7271, "population": 379769, "remoteness": "urban"},
    {"id": "NL-MON", "state": "NL", "name": "Mon", "lat": 26.7333, "lon": 95.0000, "population": 250260, "remoteness": "very_remote"},
    {"id": "NL-PHE", "state": "NL", "name": "Phek", "lat": 25.6839, "lon": 94.4667, "population": 163294, "remoteness": "remote"},
    # Sikkim
    {"id": "SK-GAN", "state": "SK", "name": "East Sikkim (Gangtok)", "lat": 27.3314, "lon": 88.6138, "population": 281293, "remoteness": "urban"},
    {"id": "SK-NAM", "state": "SK", "name": "North Sikkim", "lat": 27.9000, "lon": 88.4333, "population": 43709, "remoteness": "very_remote"},
    {"id": "SK-MAN", "state": "SK", "name": "South Sikkim", "lat": 27.1500, "lon": 88.4000, "population": 146850, "remoteness": "medium"},
    # Tripura
    {"id": "TR-AGA", "state": "TR", "name": "West Tripura (Agartala)", "lat": 23.8315, "lon": 91.2868, "population": 1724619, "remoteness": "urban"},
    {"id": "TR-GOH", "state": "TR", "name": "Gomati", "lat": 23.4000, "lon": 91.4833, "population": 443529, "remoteness": "medium"},
    {"id": "TR-DHA", "state": "TR", "name": "Dhalai", "lat": 23.7500, "lon": 91.9500, "population": 374710, "remoteness": "remote"},
]

# ── Road Corridors ───────────────────────────────────────────────────────────
ROADS = [
    {"id": "NH-27", "name": "NH-27 (East-West Corridor)", "states": ["AS", "MN", "NL"], "length_km": 1806, "type": "National Highway", "lanes": 4, "surface": "Bitumen"},
    {"id": "NH-8",  "name": "NH-8 (Shillong-Agartala)", "states": ["ML", "TR"], "length_km": 365, "type": "National Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "NH-29", "name": "NH-29 (Dimapur-Kohima)", "states": ["NL"], "length_km": 74, "type": "National Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "NH-37", "name": "NH-37 (Assam-Meghalaya)", "states": ["AS", "ML"], "length_km": 382, "type": "National Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "NH-54", "name": "NH-54 (Silchar-Aizawl)", "states": ["AS", "MZ"], "length_km": 386, "type": "National Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "NH-44", "name": "NH-44 (Imphal-Moreh)", "states": ["MN"], "length_km": 113, "type": "National Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "NH-40", "name": "NH-40 (Shillong-Dawki)", "states": ["ML"], "length_km": 64, "type": "National Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "SH-2",  "name": "SH-2 (Tezpur-Bhalukpong)", "states": ["AS", "AR"], "length_km": 173, "type": "State Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "SH-5",  "name": "SH-5 (Jorhat-Mariani)", "states": ["AS"], "length_km": 27, "type": "State Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "SH-12", "name": "SH-12 (Gangtok-Nathu La)", "states": ["SK"], "length_km": 53, "type": "State Highway", "lanes": 2, "surface": "Bitumen"},
    {"id": "MDR-1",  "name": "Tawang Mountain Road", "states": ["AR"], "length_km": 200, "type": "Major District Road", "lanes": 1, "surface": "Concrete"},
    {"id": "MDR-2",  "name": "Kohima-Pfutsero Road", "states": ["NL"], "length_km": 67, "type": "Major District Road", "lanes": 1, "surface": "Concrete"},
    {"id": "MDR-3",  "name": "Churachandpur-Singhat Road", "states": ["MN"], "length_km": 90, "type": "Major District Road", "lanes": 1, "surface": "Gravel"},
    {"id": "ALT-1",  "name": "Alternative Corridor B (via Haflong)", "states": ["AS", "MN"], "length_km": 245, "type": "Alternative Route", "lanes": 1, "surface": "Bitumen"},
    {"id": "ALT-2",  "name": "Alternative Corridor C (via Jowai)", "states": ["ML", "TR"], "length_km": 312, "type": "Alternative Route", "lanes": 1, "surface": "Bitumen"},
]

# ── Bridges ──────────────────────────────────────────────────────────────────
BRIDGES = [
    {"id": "BR-001", "name": "Saraighat Bridge", "road": "NH-27", "district": "AS-KAM", "lat": 26.1718, "lon": 91.6586, "length_m": 1492, "capacity_tons": 40, "year_built": 1962, "condition": "fair"},
    {"id": "BR-002", "name": "Bogibeel Bridge", "road": "NH-37", "district": "AS-DIG", "lat": 27.2642, "lon": 94.9026, "length_m": 4940, "capacity_tons": 60, "year_built": 2018, "condition": "good"},
    {"id": "BR-003", "name": "Barak River Bridge", "road": "NH-54", "district": "AS-CAC", "lat": 24.7671, "lon": 92.8579, "length_m": 340, "capacity_tons": 30, "year_built": 1985, "condition": "poor"},
    {"id": "BR-004", "name": "Imphal River Bridge", "road": "NH-44", "district": "MN-IMP", "lat": 24.8170, "lon": 93.9368, "length_m": 180, "capacity_tons": 25, "year_built": 1990, "condition": "fair"},
    {"id": "BR-005", "name": "Umiam River Bridge", "road": "NH-40", "district": "ML-RIB", "lat": 25.6820, "lon": 91.9200, "length_m": 220, "capacity_tons": 30, "year_built": 1995, "condition": "good"},
    {"id": "BR-006", "name": "Teesta Bridge Sikkim", "road": "SH-12", "district": "SK-GAN", "lat": 27.3314, "lon": 88.6138, "length_m": 150, "capacity_tons": 20, "year_built": 1988, "condition": "critical"},
    {"id": "BR-007", "name": "Howrah Bridge Agartala", "road": "NH-8", "district": "TR-AGA", "lat": 23.8000, "lon": 91.3000, "length_m": 90, "capacity_tons": 35, "year_built": 2005, "condition": "good"},
    {"id": "BR-008", "name": "Brahmaputra Tributary Bridge", "road": "SH-2", "district": "AS-KAM", "lat": 26.5000, "lon": 92.0000, "length_m": 280, "capacity_tons": 28, "year_built": 1978, "condition": "poor"},
]

# ── Vehicles (Fleet) ─────────────────────────────────────────────────────────
VEHICLES = [
    {"id": "VH-001", "reg": "AS-01-4582", "type": "Heavy Truck", "capacity_tons": 20, "driver": "Rajesh Kumar", "driver_id": "DRV-001", "state": "AS", "district": "AS-GWH", "lat": 26.1445, "lon": 91.7362, "speed_kmh": 48, "fuel_pct": 78, "status": "moving"},
    {"id": "VH-002", "reg": "AS-05-7821", "type": "Medium Truck", "capacity_tons": 10, "driver": "Biren Singh", "driver_id": "DRV-002", "state": "AS", "district": "AS-JOR", "lat": 26.7509, "lon": 94.2037, "speed_kmh": 0, "fuel_pct": 52, "status": "idle"},
    {"id": "VH-003", "reg": "MN-01-2341", "type": "Light Van", "capacity_tons": 3, "driver": "Thoithoi Meitei", "driver_id": "DRV-003", "state": "MN", "district": "MN-IMP", "lat": 24.8170, "lon": 93.9368, "speed_kmh": 35, "fuel_pct": 91, "status": "moving"},
    {"id": "VH-004", "reg": "ML-02-9914", "type": "Ambulance", "capacity_tons": 1, "driver": "Pynhunlang Khongwir", "driver_id": "DRV-004", "state": "ML", "district": "ML-SHI", "lat": 25.5788, "lon": 91.8933, "speed_kmh": 65, "fuel_pct": 88, "status": "moving"},
    {"id": "VH-005", "reg": "NL-01-3300", "type": "Heavy Truck", "capacity_tons": 18, "driver": "Neizo Angami", "driver_id": "DRV-005", "state": "NL", "district": "NL-KOH", "lat": 25.6701, "lon": 94.1077, "speed_kmh": 0, "fuel_pct": 35, "status": "delayed"},
    {"id": "VH-006", "reg": "AR-01-0812", "type": "Medium Truck", "capacity_tons": 8, "driver": "Dorjee Khandu", "driver_id": "DRV-006", "state": "AR", "district": "AR-ITA", "lat": 27.0844, "lon": 93.6053, "speed_kmh": 28, "fuel_pct": 66, "status": "at_risk"},
    {"id": "VH-007", "reg": "SK-01-5544", "type": "Light Van", "capacity_tons": 4, "driver": "Pemba Sherpa", "driver_id": "DRV-007", "state": "SK", "district": "SK-GAN", "lat": 27.3314, "lon": 88.6138, "speed_kmh": 40, "fuel_pct": 72, "status": "moving"},
    {"id": "VH-008", "reg": "TR-03-4422", "type": "Heavy Truck", "capacity_tons": 22, "driver": "Sukanta Das", "driver_id": "DRV-008", "state": "TR", "district": "TR-AGA", "lat": 23.8315, "lon": 91.2868, "speed_kmh": 55, "fuel_pct": 84, "status": "moving"},
    {"id": "VH-009", "reg": "MZ-01-6701", "type": "Medium Truck", "capacity_tons": 12, "driver": "Lalnunmawia", "driver_id": "DRV-009", "state": "MZ", "district": "MZ-AIZ", "lat": 23.7271, "lon": 92.7176, "speed_kmh": 0, "fuel_pct": 43, "status": "offline"},
    {"id": "VH-010", "reg": "AS-08-1199", "type": "Refrigerator Truck", "capacity_tons": 15, "driver": "Mrinmoy Borah", "driver_id": "DRV-010", "state": "AS", "district": "AS-DIG", "lat": 27.4728, "lon": 94.9120, "speed_kmh": 52, "fuel_pct": 60, "status": "moving"},
    {"id": "VH-011", "reg": "NL-02-7788", "type": "Heavy Truck", "capacity_tons": 20, "driver": "Khekiho Yeptho", "driver_id": "DRV-011", "state": "NL", "district": "NL-DIH", "lat": 25.9066, "lon": 93.7271, "speed_kmh": 44, "fuel_pct": 77, "status": "moving"},
    {"id": "VH-012", "reg": "MN-03-3301", "type": "Light Van", "capacity_tons": 2, "driver": "Wahengbam Singh", "driver_id": "DRV-012", "state": "MN", "district": "MN-CHU", "lat": 24.3333, "lon": 93.6833, "speed_kmh": 0, "fuel_pct": 20, "status": "arrived"},
    {"id": "VH-013", "reg": "AS-12-5571", "type": "Heavy Truck", "capacity_tons": 25, "driver": "Pranab Gogoi", "driver_id": "DRV-013", "state": "AS", "district": "AS-NAL", "lat": 26.3464, "lon": 92.6844, "speed_kmh": 50, "fuel_pct": 55, "status": "moving"},
    {"id": "VH-014", "reg": "AR-03-2255", "type": "Medium Truck", "capacity_tons": 10, "driver": "Tamo Riba", "driver_id": "DRV-014", "state": "AR", "district": "AR-TAW", "lat": 27.5859, "lon": 91.8594, "speed_kmh": 18, "fuel_pct": 33, "status": "at_risk"},
    {"id": "VH-015", "reg": "ML-04-6634", "type": "Heavy Truck", "capacity_tons": 18, "driver": "Phibahun Diengdoh", "driver_id": "DRV-015", "state": "ML", "district": "ML-GAS", "lat": 25.5247, "lon": 90.6667, "speed_kmh": 38, "fuel_pct": 68, "status": "moving"},
]

# ── Shipments ─────────────────────────────────────────────────────────────────
SHIPMENTS = [
    {
        "id": "SHP-MED-2041", "type": "Medicine", "priority": "critical",
        "origin": "AS-GWH", "destination": "AR-TAW", "vehicle": "VH-006",
        "weight_kg": 1200, "items": "Antibiotics, IV Fluids, Surgical Supplies",
        "deadline": "2024-09-07T12:00:00Z", "status": "in_transit",
        "eta": "2024-09-07T10:42:00Z", "delay_prob": 0.73,
        "route": "NH-27", "distance_km": 580
    },
    {
        "id": "SHP-FOOD-0192", "type": "Food", "priority": "high",
        "origin": "AS-GWH", "destination": "MN-CHU", "vehicle": "VH-003",
        "weight_kg": 8500, "items": "Rice, Dal, Edible Oil",
        "deadline": "2024-09-07T18:00:00Z", "status": "in_transit",
        "eta": "2024-09-07T15:30:00Z", "delay_prob": 0.32,
        "route": "NH-27", "distance_km": 340
    },
    {
        "id": "SHP-CONS-0441", "type": "Construction Material", "priority": "normal",
        "origin": "NL-DIH", "destination": "NL-MON", "vehicle": "VH-011",
        "weight_kg": 15000, "items": "Cement, Steel Bars, Sand",
        "deadline": "2024-09-08T09:00:00Z", "status": "in_transit",
        "eta": "2024-09-07T22:00:00Z", "delay_prob": 0.18,
        "route": "MDR-2", "distance_km": 180
    },
    {
        "id": "SHP-EMG-0033", "type": "Emergency Supplies", "priority": "critical",
        "origin": "ML-SHI", "destination": "ML-GAS", "vehicle": "VH-015",
        "weight_kg": 3200, "items": "Disaster Relief Kits, Tarpaulins, Water Purifiers",
        "deadline": "2024-09-07T08:00:00Z", "status": "delayed",
        "eta": "2024-09-07T09:30:00Z", "delay_prob": 0.91,
        "route": "NH-37", "distance_km": 195
    },
    {
        "id": "SHP-AGR-1122", "type": "Agricultural Produce", "priority": "high",
        "origin": "TR-AGA", "destination": "AS-CAC", "vehicle": "VH-008",
        "weight_kg": 12000, "items": "Tea, Pineapple, Ginger",
        "deadline": "2024-09-07T20:00:00Z", "status": "in_transit",
        "eta": "2024-09-07T17:45:00Z", "delay_prob": 0.25,
        "route": "NH-8", "distance_km": 220
    },
    {
        "id": "SHP-MED-1999", "type": "Medicine", "priority": "critical",
        "origin": "AS-GWH", "destination": "SK-NAM", "vehicle": "VH-007",
        "weight_kg": 800, "items": "Vaccines, Cold-chain Medicines",
        "deadline": "2024-09-07T14:00:00Z", "status": "in_transit",
        "eta": "2024-09-07T13:20:00Z", "delay_prob": 0.44,
        "route": "SH-12", "distance_km": 310
    },
    {
        "id": "SHP-FUEL-0088", "type": "Essential Commodities", "priority": "high",
        "origin": "AS-DIG", "destination": "AR-DIG", "vehicle": "VH-010",
        "weight_kg": 18000, "items": "Diesel, LPG Cylinders",
        "deadline": "2024-09-08T06:00:00Z", "status": "in_transit",
        "eta": "2024-09-08T04:30:00Z", "delay_prob": 0.15,
        "route": "NH-37", "distance_km": 420
    },
    {
        "id": "SHP-FOOD-0330", "type": "Food", "priority": "normal",
        "origin": "TR-AGA", "destination": "TR-DHA", "vehicle": "VH-013",
        "weight_kg": 9200, "items": "Rations, PDS Items",
        "deadline": "2024-09-08T12:00:00Z", "status": "pending",
        "eta": "2024-09-08T10:00:00Z", "delay_prob": 0.12,
        "route": "NH-8", "distance_km": 165
    },
    {
        "id": "SHP-CONS-0882", "type": "Construction Material", "priority": "low",
        "origin": "MZ-AIZ", "destination": "MZ-LUN", "vehicle": "VH-009",
        "weight_kg": 11500, "items": "Roofing Sheets, Timber",
        "deadline": "2024-09-09T18:00:00Z", "status": "pending",
        "eta": None, "delay_prob": 0.08,
        "route": "NH-54", "distance_km": 240
    },
    {
        "id": "SHP-MED-0055", "type": "Medicine", "priority": "critical",
        "origin": "ML-SHI", "destination": "MZ-SER", "vehicle": "VH-004",
        "weight_kg": 600, "items": "Surgical Kits, Antiseptics, PPE",
        "deadline": "2024-09-07T16:00:00Z", "status": "in_transit",
        "eta": "2024-09-07T14:50:00Z", "delay_prob": 0.38,
        "route": "NH-54", "distance_km": 290
    },
]

# ── Incidents ─────────────────────────────────────────────────────────────────
INCIDENTS = [
    {
        "id": "INC-001", "type": "landslide", "severity": "critical",
        "road": "NH-27", "district": "AS-KAR", "state": "AS",
        "lat": 26.0930, "lon": 93.5497,
        "description": "Major landslide blocking NH-27 near Diphu. Estimated 200m of road buried under debris. Clearance expected in 6-8 hours.",
        "reported_by": "FO-AS-003", "verified": True,
        "timestamp": "2024-09-07T06:30:00Z",
        "affected_roads": ["NH-27"],
        "accessibility_impact": -45,
        "status": "active"
    },
    {
        "id": "INC-002", "type": "flooding", "severity": "high",
        "road": "NH-8", "district": "ML-JAI", "state": "ML",
        "lat": 25.4343, "lon": 92.1816,
        "description": "Flash flooding on NH-8 near Jowai. Road submerged under 60cm water. Single-lane possible for light vehicles only.",
        "reported_by": "FO-ML-001", "verified": True,
        "timestamp": "2024-09-07T04:15:00Z",
        "affected_roads": ["NH-8"],
        "accessibility_impact": -30,
        "status": "active"
    },
    {
        "id": "INC-003", "type": "bridge_damage", "severity": "critical",
        "road": "SH-12", "district": "SK-GAN", "state": "SK",
        "lat": 27.3314, "lon": 88.6138,
        "description": "Structural cracks detected on Teesta Bridge. Load limit reduced to 10 tons. Heavy vehicles restricted.",
        "reported_by": "FO-SK-001", "verified": True,
        "timestamp": "2024-09-06T22:00:00Z",
        "affected_roads": ["SH-12"],
        "accessibility_impact": -25,
        "status": "active"
    },
    {
        "id": "INC-004", "type": "road_damage", "severity": "medium",
        "road": "MDR-3", "district": "MN-CHU", "state": "MN",
        "lat": 24.3333, "lon": 93.6833,
        "description": "Multiple potholes and road surface deterioration on Churachandpur-Singhat Road. Speed limit advisory: 20 kmph.",
        "reported_by": "FO-MN-002", "verified": False,
        "timestamp": "2024-09-07T05:45:00Z",
        "affected_roads": ["MDR-3"],
        "accessibility_impact": -15,
        "status": "active"
    },
    {
        "id": "INC-005", "type": "heavy_traffic", "severity": "low",
        "road": "NH-27", "district": "AS-NAL", "state": "AS",
        "lat": 26.3464, "lon": 92.6844,
        "description": "Heavy vehicle congestion at Nagaon bypass. Approx 2km queue. Estimated clearance: 45 minutes.",
        "reported_by": "FO-AS-001", "verified": True,
        "timestamp": "2024-09-07T07:00:00Z",
        "affected_roads": ["NH-27"],
        "accessibility_impact": -10,
        "status": "active"
    },
    {
        "id": "INC-006", "type": "weather_obstruction", "severity": "high",
        "road": "MDR-1", "district": "AR-TAW", "state": "AR",
        "lat": 27.5859, "lon": 91.8594,
        "description": "Heavy snowfall and fog on Tawang Mountain Road. Visibility below 50m. Road passable only for 4WD vehicles.",
        "reported_by": "FO-AR-001", "verified": True,
        "timestamp": "2024-09-07T03:30:00Z",
        "affected_roads": ["MDR-1"],
        "accessibility_impact": -35,
        "status": "active"
    },
    {
        "id": "INC-007", "type": "vehicle_incident", "severity": "medium",
        "road": "NH-29", "district": "NL-KOH", "state": "NL",
        "lat": 25.6701, "lon": 94.1077,
        "description": "Truck breakdown blocking one lane on NH-29 near Kohima. Towing vehicle dispatched. ETA for clearance: 90 minutes.",
        "reported_by": "FO-NL-001", "verified": True,
        "timestamp": "2024-09-07T07:45:00Z",
        "affected_roads": ["NH-29"],
        "accessibility_impact": -12,
        "status": "resolving"
    },
]

# ── Alerts ────────────────────────────────────────────────────────────────────
ALERTS = [
    {
        "id": "ALT-001", "severity": "critical", "type": "route_blocked",
        "title": "NH-27 Major Landslide — Critical Route Disruption",
        "message": "Landslide at km 847 near Diphu blocking NH-27. 7 vehicles and 13 shipments affected. Immediate rerouting required.",
        "incident_id": "INC-001", "road": "NH-27",
        "affected_vehicles": ["VH-001", "VH-002", "VH-013"],
        "affected_shipments": ["SHP-FOOD-0192", "SHP-MED-2041"],
        "recommendation": "Re-route 3 vehicles through Alternative Corridor B (via Haflong). Distance increase: +35km. ETA impact: +42min.",
        "timestamp": "2024-09-07T06:32:00Z", "acknowledged": False
    },
    {
        "id": "ALT-002", "severity": "high", "type": "bridge_restricted",
        "title": "Teesta Bridge Load Restriction — Heavy Vehicles Barred",
        "message": "Structural cracks on Teesta Bridge (SH-12) reduce load limit to 10 tons. VH-007 carrying 12-ton load must reroute.",
        "incident_id": "INC-003", "road": "SH-12",
        "affected_vehicles": ["VH-007"],
        "affected_shipments": ["SHP-MED-1999"],
        "recommendation": "Reroute VH-007 via NH-10 Teesta Valley Road. Distance: +22km. ETA impact: +28min.",
        "timestamp": "2024-09-06T22:05:00Z", "acknowledged": False
    },
    {
        "id": "ALT-003", "severity": "high", "type": "shipment_at_risk",
        "title": "Critical Shipment SHP-EMG-0033 — Deadline Risk",
        "message": "Emergency supplies to Tura (Garo Hills) delayed due to NH-37 flooding. Current delay probability: 91%. Deadline breach imminent.",
        "incident_id": "INC-002", "road": "NH-37",
        "affected_vehicles": ["VH-015"],
        "affected_shipments": ["SHP-EMG-0033"],
        "recommendation": "Authorize priority convoy escort. Contact District Collector Garo Hills for emergency landing strip authorization.",
        "timestamp": "2024-09-07T04:20:00Z", "acknowledged": True
    },
    {
        "id": "ALT-004", "severity": "medium", "type": "weather_risk",
        "title": "Tawang Corridor — Severe Weather Advisory",
        "message": "Heavy snowfall and fog conditions on MDR-1 (Tawang Mountain Road). VH-006 and VH-014 in high-risk zone.",
        "incident_id": "INC-006", "road": "MDR-1",
        "affected_vehicles": ["VH-006", "VH-014"],
        "affected_shipments": ["SHP-MED-2041"],
        "recommendation": "Advise drivers to halt at Dirang until visibility improves. ETA delay: +2-4 hours. Issue weather advisory.",
        "timestamp": "2024-09-07T03:35:00Z", "acknowledged": False
    },
    {
        "id": "ALT-005", "severity": "low", "type": "delivery_delay",
        "title": "VH-005 Fuel Alert — Low Fuel in Remote Zone",
        "message": "VH-005 reporting 35% fuel at Kohima. Next fuel station 80km away. Risk of breakdown in remote corridor.",
        "incident_id": None, "road": "NH-29",
        "affected_vehicles": ["VH-005"],
        "affected_shipments": [],
        "recommendation": "Dispatch fuel support vehicle from Dimapur depot. ETA to VH-005: 2h 15min.",
        "timestamp": "2024-09-07T07:50:00Z", "acknowledged": False
    },
]

# ── Accessibility Scores ──────────────────────────────────────────────────────
ACCESSIBILITY_DATA = [
    {"road": "NH-27", "score": 54, "status": "high_risk", "weather": "moderate_rain", "traffic": "heavy", "road_condition": "fair", "incidents": 2, "trend": "declining"},
    {"road": "NH-8",  "score": 68, "status": "restricted", "weather": "heavy_rain", "traffic": "moderate", "road_condition": "good", "incidents": 1, "trend": "stable"},
    {"road": "NH-29", "score": 77, "status": "accessible", "weather": "clear", "traffic": "light", "road_condition": "good", "incidents": 1, "trend": "stable"},
    {"road": "NH-37", "score": 61, "status": "restricted", "weather": "heavy_rain", "traffic": "moderate", "road_condition": "fair", "incidents": 1, "trend": "declining"},
    {"road": "NH-54", "score": 82, "status": "accessible", "weather": "light_rain", "traffic": "light", "road_condition": "good", "incidents": 0, "trend": "improving"},
    {"road": "NH-44", "score": 88, "status": "accessible", "weather": "clear", "traffic": "light", "road_condition": "good", "incidents": 0, "trend": "stable"},
    {"road": "NH-40", "score": 74, "status": "accessible", "weather": "moderate_rain", "traffic": "moderate", "road_condition": "good", "incidents": 0, "trend": "stable"},
    {"road": "SH-2",  "score": 79, "status": "accessible", "weather": "clear", "traffic": "light", "road_condition": "fair", "incidents": 0, "trend": "improving"},
    {"road": "SH-12", "score": 46, "status": "high_risk", "weather": "clear", "traffic": "light", "road_condition": "critical", "incidents": 1, "trend": "critical"},
    {"road": "MDR-1", "score": 31, "status": "blocked", "weather": "snowfall_fog", "traffic": "very_low", "road_condition": "poor", "incidents": 1, "trend": "critical"},
    {"road": "MDR-2", "score": 65, "status": "restricted", "weather": "clear", "traffic": "light", "road_condition": "fair", "incidents": 0, "trend": "stable"},
    {"road": "MDR-3", "score": 58, "status": "restricted", "weather": "light_rain", "traffic": "light", "road_condition": "poor", "incidents": 1, "trend": "declining"},
    {"road": "ALT-1", "score": 85, "status": "accessible", "weather": "moderate_rain", "traffic": "very_low", "road_condition": "good", "incidents": 0, "trend": "stable"},
    {"road": "ALT-2", "score": 80, "status": "accessible", "weather": "light_rain", "traffic": "very_low", "road_condition": "good", "incidents": 0, "trend": "stable"},
]

# ── Weather Data (Demo) ────────────────────────────────────────────────────────
WEATHER_DATA = [
    {"state": "AS",  "condition": "moderate_rain", "temp_c": 26, "humidity_pct": 89, "wind_kmh": 18, "visibility_km": 6, "rainfall_mm": 12},
    {"state": "AR",  "condition": "snowfall_fog",  "temp_c": -2, "humidity_pct": 95, "wind_kmh": 35, "visibility_km": 0.5, "rainfall_mm": 0},
    {"state": "MN",  "condition": "light_rain",    "temp_c": 24, "humidity_pct": 82, "wind_kmh": 12, "visibility_km": 8, "rainfall_mm": 5},
    {"state": "ML",  "condition": "heavy_rain",    "temp_c": 22, "humidity_pct": 95, "wind_kmh": 22, "visibility_km": 3, "rainfall_mm": 35},
    {"state": "MZ",  "condition": "light_rain",    "temp_c": 23, "humidity_pct": 80, "wind_kmh": 10, "visibility_km": 10, "rainfall_mm": 4},
    {"state": "NL",  "condition": "clear",         "temp_c": 25, "humidity_pct": 72, "wind_kmh": 8,  "visibility_km": 15, "rainfall_mm": 0},
    {"state": "SK",  "condition": "clear",         "temp_c": 18, "humidity_pct": 68, "wind_kmh": 14, "visibility_km": 20, "rainfall_mm": 0},
    {"state": "TR",  "condition": "moderate_rain", "temp_c": 27, "humidity_pct": 88, "wind_kmh": 15, "visibility_km": 7, "rainfall_mm": 18},
]

# ── Analytics Data ────────────────────────────────────────────────────────────
ANALYTICS_MONTHLY = [
    {"month": "Apr", "deliveries": 142, "delayed": 28, "on_time": 114, "avg_eta_hrs": 6.2, "incidents": 12},
    {"month": "May", "deliveries": 158, "delayed": 31, "on_time": 127, "avg_eta_hrs": 5.8, "incidents": 15},
    {"month": "Jun", "deliveries": 134, "delayed": 42, "on_time": 92,  "avg_eta_hrs": 7.4, "incidents": 24},
    {"month": "Jul", "deliveries": 121, "delayed": 55, "on_time": 66,  "avg_eta_hrs": 8.9, "incidents": 38},
    {"month": "Aug", "deliveries": 128, "delayed": 49, "on_time": 79,  "avg_eta_hrs": 8.1, "incidents": 31},
    {"month": "Sep", "deliveries": 67,  "delayed": 18, "on_time": 49,  "avg_eta_hrs": 7.2, "incidents": 14},
]

DISTRICT_ANALYTICS = [
    {"district": "Guwahati",  "state": "AS", "deliveries": 89, "incidents": 3,  "accessibility": 82, "active_vehicles": 6, "critical_shipments": 2},
    {"district": "Imphal",    "state": "MN", "deliveries": 45, "incidents": 2,  "accessibility": 74, "active_vehicles": 3, "critical_shipments": 1},
    {"district": "Shillong",  "state": "ML", "deliveries": 62, "incidents": 4,  "accessibility": 68, "active_vehicles": 4, "critical_shipments": 2},
    {"district": "Kohima",    "state": "NL", "deliveries": 38, "incidents": 5,  "accessibility": 77, "active_vehicles": 2, "critical_shipments": 0},
    {"district": "Itanagar",  "state": "AR", "deliveries": 29, "incidents": 7,  "accessibility": 55, "active_vehicles": 2, "critical_shipments": 1},
    {"district": "Gangtok",   "state": "SK", "deliveries": 41, "incidents": 2,  "accessibility": 71, "active_vehicles": 2, "critical_shipments": 1},
    {"district": "Agartala",  "state": "TR", "deliveries": 74, "incidents": 1,  "accessibility": 88, "active_vehicles": 3, "critical_shipments": 0},
    {"district": "Aizawl",    "state": "MZ", "deliveries": 33, "incidents": 3,  "accessibility": 79, "active_vehicles": 1, "critical_shipments": 0},
    {"district": "Tawang",    "state": "AR", "deliveries": 8,  "incidents": 9,  "accessibility": 31, "active_vehicles": 1, "critical_shipments": 1},
    {"district": "Churachandpur", "state": "MN", "deliveries": 19, "incidents": 4, "accessibility": 58, "active_vehicles": 1, "critical_shipments": 0},
]

# ── Activity Feed ──────────────────────────────────────────────────────────────
ACTIVITY_FEED = [
    {"id": "ACT-001", "type": "vehicle_alert", "severity": "critical", "message": "Vehicle AS-01-4582 entered high-risk corridor NH-27", "timestamp": "2024-09-07T08:02:00Z", "entity_id": "VH-001"},
    {"id": "ACT-002", "type": "incident",      "severity": "critical", "message": "Road disruption detected: Landslide on NH-27 near Karbi Anglong", "timestamp": "2024-09-07T06:32:00Z", "entity_id": "INC-001"},
    {"id": "ACT-003", "type": "eta_update",    "severity": "medium",   "message": "Shipment SHP-MED-2041 ETA updated from 10:00 to 10:42 due to route risk", "timestamp": "2024-09-07T07:15:00Z", "entity_id": "SHP-MED-2041"},
    {"id": "ACT-004", "type": "field_report",  "severity": "high",     "message": "Field Officer Thoithoi Meitei reported flooding on NH-8 near Jowai", "timestamp": "2024-09-07T04:15:00Z", "entity_id": "INC-002"},
    {"id": "ACT-005", "type": "rerouting",     "severity": "medium",   "message": "AI rerouted VH-007 via NH-10 to avoid Teesta Bridge load restriction", "timestamp": "2024-09-06T22:10:00Z", "entity_id": "VH-007"},
    {"id": "ACT-006", "type": "accessibility", "severity": "critical", "message": "MDR-1 (Tawang Road) accessibility score dropped to 31 — BLOCKED status", "timestamp": "2024-09-07T03:30:00Z", "entity_id": "MDR-1"},
    {"id": "ACT-007", "type": "delivery",      "severity": "info",     "message": "Shipment SHP-FOOD-0330 successfully delivered to Churachandpur", "timestamp": "2024-09-07T06:00:00Z", "entity_id": "SHP-FOOD-0330"},
    {"id": "ACT-008", "type": "vehicle_alert", "severity": "medium",   "message": "VH-005 low fuel alert — 35% remaining in remote zone near Kohima", "timestamp": "2024-09-07T07:50:00Z", "entity_id": "VH-005"},
    {"id": "ACT-009", "type": "optimization",  "severity": "info",     "message": "AI optimizer assigned 4 pending shipments to available fleet — utilization: 84%", "timestamp": "2024-09-07T07:00:00Z", "entity_id": None},
    {"id": "ACT-010", "type": "weather",       "severity": "high",     "message": "Severe weather alert: Heavy rainfall forecast for Meghalaya — 3 routes at risk", "timestamp": "2024-09-07T05:00:00Z", "entity_id": None},
    {"id": "ACT-011", "type": "field_report",  "severity": "medium",   "message": "Field Officer reported road damage on MDR-3 (Churachandpur-Singhat)", "timestamp": "2024-09-07T05:45:00Z", "entity_id": "INC-004"},
    {"id": "ACT-012", "type": "incident",      "severity": "medium",   "message": "Truck breakdown cleared on NH-29 — road fully operational", "timestamp": "2024-09-07T06:50:00Z", "entity_id": "INC-007"},
]

# ── Route Optimization Demo Results ──────────────────────────────────────────
ROUTE_OPTIONS = {
    "SHP-MED-2041": {
        "routes": [
            {
                "id": "ROUTE-A",
                "name": "NH-27 Direct (Current)",
                "distance_km": 580, "eta_hrs": 8.5,
                "risk_score": 78, "accessibility_score": 54,
                "delay_probability": 0.73, "via": ["Guwahati", "Nagaon", "Diphu", "Dirang", "Tawang"],
                "recommended": False, "reason_not_recommended": "Active landslide at km 847. High delay probability.",
            },
            {
                "id": "ROUTE-B",
                "name": "Alt Corridor B + SH-2 (Recommended)",
                "distance_km": 615, "eta_hrs": 7.8,
                "risk_score": 22, "accessibility_score": 87,
                "delay_probability": 0.18, "via": ["Guwahati", "Tezpur", "Bhalukpong", "Bomdila", "Dirang", "Tawang"],
                "recommended": True,
                "ai_reasoning": "Route avoids active landslide on NH-27. Although 35km longer, the risk score is 72% lower and estimated arrival is 42 minutes earlier due to absence of disruption delays. Accessibility score 87 vs 54. Recommended for critical medicine shipment.",
            },
        ]
    }
}

# ── ETA Predictions ───────────────────────────────────────────────────────────
ETA_PREDICTIONS = {
    "VH-006": {
        "vehicle_id": "VH-006",
        "shipment": "SHP-MED-2041",
        "current_position": {"lat": 27.0844, "lon": 93.6053},
        "destination": {"lat": 27.5859, "lon": 91.8594, "name": "Tawang District Hospital"},
        "distance_remaining_km": 245,
        "predicted_eta": "10:42",
        "original_eta": "10:00",
        "delay_probability": 0.73,
        "expected_delay_min": 42,
        "confidence": 0.81,
        "reasons": ["Heavy rainfall en route", "Reduced road accessibility on MDR-1 (31/100)", "Historical average delay in this corridor: 38min"],
        "ai_note": "AI-assisted prediction based on GPS position, road conditions, weather data, and historical travel patterns. Confidence: 81%."
    }
}

# ── KPI Summary ───────────────────────────────────────────────────────────────
KPI_SUMMARY = {
    "active_vehicles": 10,
    "active_shipments": 8,
    "critical_incidents": 3,
    "blocked_roads": 1,
    "delayed_deliveries": 2,
    "at_risk_routes": 4,
    "total_vehicles": 15,
    "total_shipments": 10,
    "fleet_utilization_pct": 78,
    "on_time_delivery_pct": 68,
    "avg_accessibility_score": 67,
    "pending_field_reports": 3,
    "last_updated": "2024-09-07T08:05:00Z",
    "data_source": "DEMO - Simulated Data for SIH Prototype"
}
