// ─────────────────────────────────────────────────────────────
// NER-SHIELD AI — Complete Demo Data Store
// NOTE: All data is SIMULATED for SIH prototype demonstration.
// This does NOT represent official government records.
// ─────────────────────────────────────────────────────────────

export const NE_STATES = [
  { id: "AS", name: "Assam",               capital: "Dispur",   lat: 26.2006, lon: 92.9376, area: 78438 },
  { id: "AR", name: "Arunachal Pradesh",   capital: "Itanagar", lat: 28.2180, lon: 94.7278, area: 83743 },
  { id: "MN", name: "Manipur",             capital: "Imphal",   lat: 24.6637, lon: 93.9063, area: 22327 },
  { id: "ML", name: "Meghalaya",           capital: "Shillong", lat: 25.4670, lon: 91.3662, area: 22429 },
  { id: "MZ", name: "Mizoram",             capital: "Aizawl",   lat: 23.1645, lon: 92.9376, area: 21081 },
  { id: "NL", name: "Nagaland",            capital: "Kohima",   lat: 26.1584, lon: 94.5624, area: 16579 },
  { id: "SK", name: "Sikkim",              capital: "Gangtok",  lat: 27.5330, lon: 88.5122, area:  7096 },
  { id: "TR", name: "Tripura",             capital: "Agartala", lat: 23.9408, lon: 91.9882, area: 10486 },
];

export const DISTRICTS = [
  { id: "AS-GWH", state: "AS", name: "Kamrup Metro (Guwahati)", lat: 26.1445, lon: 91.7362, remoteness: "urban",       accessibility: 82, vehicles: 6, incidents: 3, criticalShipments: 2 },
  { id: "AS-DIG", state: "AS", name: "Dibrugarh",               lat: 27.4728, lon: 94.9120, remoteness: "medium",      accessibility: 74, vehicles: 2, incidents: 1, criticalShipments: 0 },
  { id: "AS-JOR", state: "AS", name: "Jorhat",                  lat: 26.7509, lon: 94.2037, remoteness: "medium",      accessibility: 78, vehicles: 1, incidents: 0, criticalShipments: 0 },
  { id: "AS-NAL", state: "AS", name: "Nagaon",                  lat: 26.3464, lon: 92.6844, remoteness: "medium",      accessibility: 65, vehicles: 2, incidents: 2, criticalShipments: 0 },
  { id: "AS-CAC", state: "AS", name: "Cachar (Silchar)",        lat: 24.8333, lon: 92.7789, remoteness: "medium",      accessibility: 71, vehicles: 1, incidents: 1, criticalShipments: 0 },
  { id: "AS-KAR", state: "AS", name: "Karbi Anglong",           lat: 26.0930, lon: 93.5497, remoteness: "remote",      accessibility: 54, vehicles: 0, incidents: 2, criticalShipments: 0 },
  { id: "AR-ITA", state: "AR", name: "Papum Pare (Itanagar)",   lat: 27.0844, lon: 93.6053, remoteness: "urban",       accessibility: 72, vehicles: 2, incidents: 1, criticalShipments: 1 },
  { id: "AR-TAW", state: "AR", name: "Tawang",                  lat: 27.5859, lon: 91.8594, remoteness: "very_remote", accessibility: 31, vehicles: 1, incidents: 2, criticalShipments: 1 },
  { id: "AR-CHA", state: "AR", name: "Changlang",               lat: 27.1292, lon: 95.7352, remoteness: "remote",      accessibility: 63, vehicles: 0, incidents: 0, criticalShipments: 0 },
  { id: "MN-IMP", state: "MN", name: "Imphal West",             lat: 24.8170, lon: 93.9368, remoteness: "urban",       accessibility: 79, vehicles: 3, incidents: 1, criticalShipments: 1 },
  { id: "MN-CHU", state: "MN", name: "Churachandpur",           lat: 24.3333, lon: 93.6833, remoteness: "remote",      accessibility: 58, vehicles: 1, incidents: 2, criticalShipments: 0 },
  { id: "ML-SHI", state: "ML", name: "East Khasi Hills (Shillong)", lat: 25.5788, lon: 91.8933, remoteness: "urban",   accessibility: 68, vehicles: 4, incidents: 2, criticalShipments: 2 },
  { id: "ML-GAS", state: "ML", name: "East Garo Hills",         lat: 25.5247, lon: 90.6667, remoteness: "remote",      accessibility: 55, vehicles: 1, incidents: 3, criticalShipments: 1 },
  { id: "MZ-AIZ", state: "MZ", name: "Aizawl",                  lat: 23.7271, lon: 92.7176, remoteness: "urban",       accessibility: 81, vehicles: 1, incidents: 1, criticalShipments: 0 },
  { id: "NL-KOH", state: "NL", name: "Kohima",                  lat: 25.6701, lon: 94.1077, remoteness: "urban",       accessibility: 77, vehicles: 2, incidents: 2, criticalShipments: 0 },
  { id: "NL-DIH", state: "NL", name: "Dimapur",                 lat: 25.9066, lon: 93.7271, remoteness: "urban",       accessibility: 80, vehicles: 2, incidents: 1, criticalShipments: 0 },
  { id: "SK-GAN", state: "SK", name: "East Sikkim (Gangtok)",   lat: 27.3314, lon: 88.6138, remoteness: "urban",       accessibility: 71, vehicles: 2, incidents: 2, criticalShipments: 1 },
  { id: "SK-NAM", state: "SK", name: "North Sikkim",            lat: 27.9000, lon: 88.4333, remoteness: "very_remote", accessibility: 44, vehicles: 0, incidents: 1, criticalShipments: 1 },
  { id: "TR-AGA", state: "TR", name: "West Tripura (Agartala)", lat: 23.8315, lon: 91.2868, remoteness: "urban",       accessibility: 88, vehicles: 3, incidents: 0, criticalShipments: 0 },
  { id: "TR-DHA", state: "TR", name: "Dhalai",                  lat: 23.7500, lon: 91.9500, remoteness: "remote",      accessibility: 63, vehicles: 0, incidents: 1, criticalShipments: 0 },
];

export const ROADS = [
  { id: "NH-27",  name: "NH-27 (East-West Corridor)",  score: 54, status: "high_risk",  weather: "moderate_rain", traffic: "heavy",     incidents: 2, length_km: 1806, type: "National Highway", trend: "declining" },
  { id: "NH-8",   name: "NH-8 (Shillong–Agartala)",    score: 68, status: "restricted", weather: "heavy_rain",    traffic: "moderate",  incidents: 1, length_km:  365, type: "National Highway", trend: "stable"    },
  { id: "NH-29",  name: "NH-29 (Dimapur–Kohima)",      score: 77, status: "accessible", weather: "clear",         traffic: "light",     incidents: 1, length_km:   74, type: "National Highway", trend: "stable"    },
  { id: "NH-37",  name: "NH-37 (Assam–Meghalaya)",     score: 61, status: "restricted", weather: "heavy_rain",    traffic: "moderate",  incidents: 1, length_km:  382, type: "National Highway", trend: "declining" },
  { id: "NH-54",  name: "NH-54 (Silchar–Aizawl)",      score: 82, status: "accessible", weather: "light_rain",   traffic: "light",     incidents: 0, length_km:  386, type: "National Highway", trend: "improving" },
  { id: "NH-44",  name: "NH-44 (Imphal–Moreh)",        score: 88, status: "accessible", weather: "clear",         traffic: "light",     incidents: 0, length_km:  113, type: "National Highway", trend: "stable"    },
  { id: "NH-40",  name: "NH-40 (Shillong–Dawki)",      score: 74, status: "accessible", weather: "moderate_rain", traffic: "moderate",  incidents: 0, length_km:   64, type: "National Highway", trend: "stable"    },
  { id: "SH-2",   name: "SH-2 (Tezpur–Bhalukpong)",   score: 79, status: "accessible", weather: "clear",         traffic: "light",     incidents: 0, length_km:  173, type: "State Highway",    trend: "improving" },
  { id: "SH-12",  name: "SH-12 (Gangtok–Nathu La)",   score: 46, status: "high_risk",  weather: "clear",         traffic: "light",     incidents: 1, length_km:   53, type: "State Highway",    trend: "critical"  },
  { id: "MDR-1",  name: "Tawang Mountain Road",         score: 31, status: "blocked",    weather: "snowfall_fog",  traffic: "very_low",  incidents: 1, length_km:  200, type: "District Road",    trend: "critical"  },
  { id: "MDR-2",  name: "Kohima–Pfutsero Road",         score: 65, status: "restricted", weather: "clear",         traffic: "light",     incidents: 0, length_km:   67, type: "District Road",    trend: "stable"    },
  { id: "MDR-3",  name: "Churachandpur–Singhat Road",   score: 58, status: "restricted", weather: "light_rain",   traffic: "light",     incidents: 1, length_km:   90, type: "District Road",    trend: "declining" },
  { id: "ALT-1",  name: "Alt Corridor B (via Haflong)", score: 85, status: "accessible", weather: "moderate_rain", traffic: "very_low",  incidents: 0, length_km:  245, type: "Alternative",      trend: "stable"    },
  { id: "ALT-2",  name: "Alt Corridor C (via Jowai)",   score: 80, status: "accessible", weather: "light_rain",   traffic: "very_low",  incidents: 0, length_km:  312, type: "Alternative",      trend: "stable"    },
];

export const VEHICLES = [
  { id: "VH-001", reg: "AS-01-4582", type: "Heavy Truck",       capacity: 20, driver: "Rajesh Kumar",         state: "AS", district: "AS-NAL", lat: 26.3464, lon: 92.6844, speed: 48, fuel: 78, status: "moving",   route: "NH-27", shipment: "SHP-FOOD-0192", eta: "15:30", riskLevel: "medium" },
  { id: "VH-002", reg: "AS-05-7821", type: "Medium Truck",      capacity: 10, driver: "Biren Singh",           state: "AS", district: "AS-JOR", lat: 26.7509, lon: 94.2037, speed:  0, fuel: 52, status: "idle",     route: "NH-37", shipment: null,           eta: null,    riskLevel: "low"    },
  { id: "VH-003", reg: "MN-01-2341", type: "Light Van",         capacity:  3, driver: "Thoithoi Meitei",       state: "MN", district: "MN-IMP", lat: 24.8170, lon: 93.9368, speed: 35, fuel: 91, status: "moving",   route: "NH-27", shipment: "SHP-FOOD-0192", eta: "15:30", riskLevel: "low"    },
  { id: "VH-004", reg: "ML-02-9914", type: "Ambulance",         capacity:  1, driver: "Pynhunlang Khongwir",   state: "ML", district: "ML-SHI", lat: 25.5788, lon: 91.8933, speed: 65, fuel: 88, status: "moving",   route: "NH-54", shipment: "SHP-MED-0055", eta: "14:50", riskLevel: "low"    },
  { id: "VH-005", reg: "NL-01-3300", type: "Heavy Truck",       capacity: 18, driver: "Neizo Angami",           state: "NL", district: "NL-KOH", lat: 25.6701, lon: 94.1077, speed:  0, fuel: 35, status: "delayed",  route: "NH-29", shipment: "SHP-CONS-0441", eta: "22:00", riskLevel: "high"   },
  { id: "VH-006", reg: "AR-01-0812", type: "Medium Truck",      capacity:  8, driver: "Dorjee Khandu",          state: "AR", district: "AR-ITA", lat: 27.0844, lon: 93.6053, speed: 28, fuel: 66, status: "at_risk",  route: "MDR-1", shipment: "SHP-MED-2041", eta: "10:42", riskLevel: "critical"},
  { id: "VH-007", reg: "SK-01-5544", type: "Light Van",         capacity:  4, driver: "Pemba Sherpa",           state: "SK", district: "SK-GAN", lat: 27.3314, lon: 88.6138, speed: 40, fuel: 72, status: "moving",   route: "SH-12", shipment: "SHP-MED-1999", eta: "13:20", riskLevel: "high"   },
  { id: "VH-008", reg: "TR-03-4422", type: "Heavy Truck",       capacity: 22, driver: "Sukanta Das",            state: "TR", district: "TR-AGA", lat: 23.8315, lon: 91.2868, speed: 55, fuel: 84, status: "moving",   route: "NH-8",  shipment: "SHP-AGR-1122", eta: "17:45", riskLevel: "low"    },
  { id: "VH-009", reg: "MZ-01-6701", type: "Medium Truck",      capacity: 12, driver: "Lalnunmawia",            state: "MZ", district: "MZ-AIZ", lat: 23.7271, lon: 92.7176, speed:  0, fuel: 43, status: "offline",  route: "NH-54", shipment: "SHP-CONS-0882", eta: null,    riskLevel: "low"    },
  { id: "VH-010", reg: "AS-08-1199", type: "Refrigerator Truck",capacity: 15, driver: "Mrinmoy Borah",          state: "AS", district: "AS-DIG", lat: 27.4728, lon: 94.9120, speed: 52, fuel: 60, status: "moving",   route: "NH-37", shipment: "SHP-FUEL-0088", eta: "04:30", riskLevel: "low"    },
  { id: "VH-011", reg: "NL-02-7788", type: "Heavy Truck",       capacity: 20, driver: "Khekiho Yeptho",         state: "NL", district: "NL-DIH", lat: 25.9066, lon: 93.7271, speed: 44, fuel: 77, status: "moving",   route: "MDR-2", shipment: "SHP-CONS-0441", eta: "22:00", riskLevel: "medium" },
  { id: "VH-012", reg: "MN-03-3301", type: "Light Van",         capacity:  2, driver: "Wahengbam Singh",         state: "MN", district: "MN-CHU", lat: 24.3333, lon: 93.6833, speed:  0, fuel: 20, status: "arrived",  route: "MDR-3", shipment: null,           eta: null,    riskLevel: "low"    },
  { id: "VH-013", reg: "AS-12-5571", type: "Heavy Truck",       capacity: 25, driver: "Pranab Gogoi",            state: "AS", district: "AS-NAL", lat: 26.3464, lon: 92.8000, speed: 50, fuel: 55, status: "moving",   route: "NH-8",  shipment: "SHP-FOOD-0330", eta: "10:00", riskLevel: "low"    },
  { id: "VH-014", reg: "AR-03-2255", type: "Medium Truck",      capacity: 10, driver: "Tamo Riba",               state: "AR", district: "AR-TAW", lat: 27.5859, lon: 91.8594, speed: 18, fuel: 33, status: "at_risk",  route: "MDR-1", shipment: "SHP-MED-2041", eta: "10:42", riskLevel: "critical"},
  { id: "VH-015", reg: "ML-04-6634", type: "Heavy Truck",       capacity: 18, driver: "Phibahun Diengdoh",       state: "ML", district: "ML-GAS", lat: 25.5247, lon: 90.6667, speed: 38, fuel: 68, status: "delayed",  route: "NH-37", shipment: "SHP-EMG-0033", eta: "09:30", riskLevel: "critical"},
];

export const SHIPMENTS = [
  { id: "SHP-MED-2041",  type: "Medicine",             priority: "critical", origin: "Guwahati Regional Hub", destination: "Tawang District Hospital", vehicle: "VH-006", weightKg: 1200, items: "Antibiotics, IV Fluids, Surgical Supplies",    deadline: "2024-09-07T12:00Z", status: "in_transit", eta: "10:42", delayProb: 0.73, route: "MDR-1", distanceKm: 580 },
  { id: "SHP-FOOD-0192", type: "Food",                 priority: "high",     origin: "Guwahati Regional Hub", destination: "Churachandpur Depot",       vehicle: "VH-003", weightKg: 8500, items: "Rice, Dal, Edible Oil",                         deadline: "2024-09-07T18:00Z", status: "in_transit", eta: "15:30", delayProb: 0.32, route: "NH-27", distanceKm: 340 },
  { id: "SHP-CONS-0441", type: "Construction Material",priority: "normal",   origin: "Dimapur Depot",         destination: "Mon District HQ",           vehicle: "VH-011", weightKg:15000, items: "Cement, Steel Bars",                            deadline: "2024-09-08T09:00Z", status: "in_transit", eta: "22:00", delayProb: 0.18, route: "MDR-2", distanceKm: 180 },
  { id: "SHP-EMG-0033",  type: "Emergency Supplies",   priority: "critical", origin: "Shillong Distribution",  destination: "Tura CHC",                  vehicle: "VH-015", weightKg: 3200, items: "Disaster Relief Kits, Water Purifiers",         deadline: "2024-09-07T08:00Z", status: "delayed",    eta: "09:30", delayProb: 0.91, route: "NH-37", distanceKm: 195 },
  { id: "SHP-AGR-1122",  type: "Agricultural Produce", priority: "high",     origin: "Agartala Cold Storage",  destination: "Silchar Market Hub",        vehicle: "VH-008", weightKg:12000, items: "Tea, Pineapple, Ginger",                       deadline: "2024-09-07T20:00Z", status: "in_transit", eta: "17:45", delayProb: 0.25, route: "NH-8",  distanceKm: 220 },
  { id: "SHP-MED-1999",  type: "Medicine",             priority: "critical", origin: "Guwahati Regional Hub", destination: "North Sikkim PHC",           vehicle: "VH-007", weightKg:  800, items: "Vaccines, Cold-chain Medicines",                deadline: "2024-09-07T14:00Z", status: "in_transit", eta: "13:20", delayProb: 0.44, route: "SH-12", distanceKm: 310 },
  { id: "SHP-FUEL-0088", type: "Essential Commodities",priority: "high",     origin: "Dibrugarh Depot",        destination: "Dibang Valley Storage",     vehicle: "VH-010", weightKg:18000, items: "Diesel, LPG Cylinders",                        deadline: "2024-09-08T06:00Z", status: "in_transit", eta: "04:30", delayProb: 0.15, route: "NH-37", distanceKm: 420 },
  { id: "SHP-FOOD-0330", type: "Food",                 priority: "normal",   origin: "Agartala",               destination: "Dhalai District Store",     vehicle: "VH-013", weightKg: 9200, items: "Rations, PDS Items",                            deadline: "2024-09-08T12:00Z", status: "pending",    eta: "10:00", delayProb: 0.12, route: "NH-8",  distanceKm: 165 },
  { id: "SHP-CONS-0882", type: "Construction Material",priority: "low",      origin: "Aizawl Depot",           destination: "Lunglei District",          vehicle: "VH-009", weightKg:11500, items: "Roofing Sheets, Timber",                       deadline: "2024-09-09T18:00Z", status: "pending",    eta: null,    delayProb: 0.08, route: "NH-54", distanceKm: 240 },
  { id: "SHP-MED-0055",  type: "Medicine",             priority: "critical", origin: "Shillong Distribution",  destination: "Serchhip Hospital",         vehicle: "VH-004", weightKg:  600, items: "Surgical Kits, Antiseptics, PPE",              deadline: "2024-09-07T16:00Z", status: "in_transit", eta: "14:50", delayProb: 0.38, route: "NH-54", distanceKm: 290 },
];

export const INCIDENTS = [
  { id: "INC-001", type: "landslide",         severity: "critical", road: "NH-27",  district: "AS-KAR", state: "AS", lat: 26.0930, lon: 93.5497, description: "Major landslide blocking NH-27 near Diphu. 200m of road buried. Clearance ETA: 6–8 hours.", reportedBy: "FO-AS-003", verified: true,  timestamp: "2024-09-07T06:30Z", affectedRoads: ["NH-27"], status: "active",    accessibilityImpact: -45 },
  { id: "INC-002", type: "flooding",          severity: "high",     road: "NH-8",   district: "ML-JAI", state: "ML", lat: 25.4343, lon: 92.1816, description: "Flash flooding near Jowai. Road submerged 60cm. Light vehicles only.",                       reportedBy: "FO-ML-001", verified: true,  timestamp: "2024-09-07T04:15Z", affectedRoads: ["NH-8"],  status: "active",    accessibilityImpact: -30 },
  { id: "INC-003", type: "bridge_damage",     severity: "critical", road: "SH-12",  district: "SK-GAN", state: "SK", lat: 27.3314, lon: 88.6138, description: "Structural cracks on Teesta Bridge. Load limit reduced to 10 tons. Heavy vehicles restricted.", reportedBy: "FO-SK-001", verified: true,  timestamp: "2024-09-06T22:00Z", affectedRoads: ["SH-12"], status: "active",    accessibilityImpact: -25 },
  { id: "INC-004", type: "road_damage",       severity: "medium",   road: "MDR-3",  district: "MN-CHU", state: "MN", lat: 24.3333, lon: 93.6833, description: "Multiple potholes on Churachandpur–Singhat Road. Speed advisory: 20 kmph.",                 reportedBy: "FO-MN-002", verified: false, timestamp: "2024-09-07T05:45Z", affectedRoads: ["MDR-3"], status: "active",    accessibilityImpact: -15 },
  { id: "INC-005", type: "heavy_traffic",     severity: "low",      road: "NH-27",  district: "AS-NAL", state: "AS", lat: 26.3464, lon: 92.6844, description: "Heavy vehicle congestion at Nagaon bypass. 2km queue. ETA clearance: 45 min.",              reportedBy: "FO-AS-001", verified: true,  timestamp: "2024-09-07T07:00Z", affectedRoads: ["NH-27"], status: "active",    accessibilityImpact: -10 },
  { id: "INC-006", type: "weather_obstruction",severity:"high",     road: "MDR-1",  district: "AR-TAW", state: "AR", lat: 27.5859, lon: 91.8594, description: "Heavy snowfall and fog on Tawang Road. Visibility <50m. 4WD only.",                        reportedBy: "FO-AR-001", verified: true,  timestamp: "2024-09-07T03:30Z", affectedRoads: ["MDR-1"], status: "active",    accessibilityImpact: -35 },
  { id: "INC-007", type: "vehicle_incident",  severity: "medium",   road: "NH-29",  district: "NL-KOH", state: "NL", lat: 25.6701, lon: 94.1077, description: "Truck breakdown blocking NH-29. Towing vehicle dispatched. Clearance ETA: 90 min.",        reportedBy: "FO-NL-001", verified: true,  timestamp: "2024-09-07T07:45Z", affectedRoads: ["NH-29"], status: "resolving", accessibilityImpact: -12 },
];

export const ALERTS = [
  { id: "ALT-001", severity: "critical", type: "route_blocked",    title: "NH-27 Landslide — Critical Route Disruption",                  message: "Landslide at km 847 near Diphu. 3 vehicles, 5 shipments affected. Immediate rerouting required.",     incidentId: "INC-001", affectedVehicles: ["VH-001","VH-002","VH-013"], affectedShipments: ["SHP-FOOD-0192","SHP-MED-2041"], recommendation: "Re-route via Alt Corridor B. Distance: +35km. ETA impact: +42min.", timestamp: "2024-09-07T06:32Z", acknowledged: false },
  { id: "ALT-002", severity: "high",     type: "bridge_restricted", title: "Teesta Bridge Load Restriction — Heavy Vehicles Barred",       message: "Structural cracks reduce load limit to 10 tons. VH-007 must reroute.",                                   incidentId: "INC-003", affectedVehicles: ["VH-007"],                   affectedShipments: ["SHP-MED-1999"],               recommendation: "Reroute via NH-10 Teesta Valley. Distance: +22km. ETA: +28min.",    timestamp: "2024-09-06T22:05Z", acknowledged: false },
  { id: "ALT-003", severity: "high",     type: "shipment_at_risk",  title: "Critical Shipment SHP-EMG-0033 — Deadline Risk",               message: "Emergency supplies delayed. Delay probability: 91%. Deadline breach imminent.",                            incidentId: "INC-002", affectedVehicles: ["VH-015"],                   affectedShipments: ["SHP-EMG-0033"],               recommendation: "Authorize priority escort. Contact District Collector Garo Hills.",   timestamp: "2024-09-07T04:20Z", acknowledged: true  },
  { id: "ALT-004", severity: "medium",   type: "weather_risk",      title: "Tawang Corridor — Severe Weather Advisory",                    message: "Snowfall and fog conditions. VH-006 and VH-014 in high-risk zone.",                                       incidentId: "INC-006", affectedVehicles: ["VH-006","VH-014"],          affectedShipments: ["SHP-MED-2041"],               recommendation: "Halt vehicles at Dirang until visibility improves. Delay: 2–4h.",    timestamp: "2024-09-07T03:35Z", acknowledged: false },
  { id: "ALT-005", severity: "low",      type: "vehicle_alert",     title: "VH-005 Low Fuel — Remote Zone Risk",                           message: "VH-005 at 35% fuel. Next fuel station 80km away.",                                                        incidentId: null,      affectedVehicles: ["VH-005"],                   affectedShipments: [],                             recommendation: "Dispatch fuel support from Dimapur depot. ETA to VH-005: 2h 15min.", timestamp: "2024-09-07T07:50Z", acknowledged: false },
];

export const ACTIVITY_FEED = [
  { id: "ACT-001", type: "vehicle_alert", severity: "critical", message: "Vehicle AS-01-4582 entered high-risk corridor NH-27",                           timestamp: "2024-09-07T08:02Z", entityId: "VH-001"       },
  { id: "ACT-002", type: "incident",      severity: "critical", message: "Road disruption: Landslide on NH-27 near Karbi Anglong",                       timestamp: "2024-09-07T06:32Z", entityId: "INC-001"      },
  { id: "ACT-003", type: "eta_update",    severity: "medium",   message: "Shipment SHP-MED-2041 ETA updated 10:00 → 10:42 due to route risk",            timestamp: "2024-09-07T07:15Z", entityId: "SHP-MED-2041" },
  { id: "ACT-004", type: "field_report",  severity: "high",     message: "Field Officer reported flooding on NH-8 near Jowai",                           timestamp: "2024-09-07T04:15Z", entityId: "INC-002"      },
  { id: "ACT-005", type: "rerouting",     severity: "medium",   message: "AI rerouted VH-007 via NH-10 — Teesta Bridge load restriction",                timestamp: "2024-09-06T22:10Z", entityId: "VH-007"       },
  { id: "ACT-006", type: "accessibility", severity: "critical", message: "MDR-1 (Tawang Road) accessibility score dropped to 31 — BLOCKED",              timestamp: "2024-09-07T03:30Z", entityId: "MDR-1"        },
  { id: "ACT-007", type: "delivery",      severity: "info",     message: "Shipment SHP-FOOD-0330 delivered to Churachandpur — on time",                  timestamp: "2024-09-07T06:00Z", entityId: "SHP-FOOD-0330"},
  { id: "ACT-008", type: "vehicle_alert", severity: "medium",   message: "VH-005 low fuel alert — 35% remaining in remote zone near Kohima",             timestamp: "2024-09-07T07:50Z", entityId: "VH-005"       },
  { id: "ACT-009", type: "optimization",  severity: "info",     message: "AI optimizer assigned 4 shipments to fleet — vehicle utilization now 84%",     timestamp: "2024-09-07T07:00Z", entityId: null           },
  { id: "ACT-010", type: "weather",       severity: "high",     message: "Severe weather: Heavy rainfall forecast Meghalaya — 3 routes at risk",         timestamp: "2024-09-07T05:00Z", entityId: null           },
  { id: "ACT-011", type: "field_report",  severity: "medium",   message: "Road damage reported on MDR-3 (Churachandpur–Singhat) — unverified",          timestamp: "2024-09-07T05:45Z", entityId: "INC-004"      },
  { id: "ACT-012", type: "incident",      severity: "info",     message: "Truck breakdown NH-29 — towing dispatched, clearance ETA 90 min",              timestamp: "2024-09-07T07:45Z", entityId: "INC-007"      },
];

export const KPI = {
  activeVehicles:       10,
  activeShipments:       8,
  criticalIncidents:     3,
  blockedRoads:          1,
  delayedDeliveries:     2,
  atRiskRoutes:          4,
  totalVehicles:        15,
  totalShipments:       10,
  fleetUtilizationPct:  78,
  onTimeDeliveryPct:    68,
  avgAccessibilityScore: 67,
  pendingFieldReports:   3,
  lastUpdated: "2024-09-07T08:05Z",
};

export const MONTHLY_ANALYTICS = [
  { month: "Apr", deliveries: 142, delayed: 28, onTime: 114, avgEtaHrs: 6.2, incidents: 12 },
  { month: "May", deliveries: 158, delayed: 31, onTime: 127, avgEtaHrs: 5.8, incidents: 15 },
  { month: "Jun", deliveries: 134, delayed: 42, onTime:  92, avgEtaHrs: 7.4, incidents: 24 },
  { month: "Jul", deliveries: 121, delayed: 55, onTime:  66, avgEtaHrs: 8.9, incidents: 38 },
  { month: "Aug", deliveries: 128, delayed: 49, onTime:  79, avgEtaHrs: 8.1, incidents: 31 },
  { month: "Sep", deliveries:  67, delayed: 18, onTime:  49, avgEtaHrs: 7.2, incidents: 14 },
];

export const WEATHER = [
  { state: "AS", condition: "moderate_rain", temp: 26, humidity: 89, wind: 18, visibility: 6  },
  { state: "AR", condition: "snowfall_fog",  temp: -2, humidity: 95, wind: 35, visibility: 0.5},
  { state: "MN", condition: "light_rain",    temp: 24, humidity: 82, wind: 12, visibility: 8  },
  { state: "ML", condition: "heavy_rain",    temp: 22, humidity: 95, wind: 22, visibility: 3  },
  { state: "MZ", condition: "light_rain",    temp: 23, humidity: 80, wind: 10, visibility: 10 },
  { state: "NL", condition: "clear",         temp: 25, humidity: 72, wind:  8, visibility: 15 },
  { state: "SK", condition: "clear",         temp: 18, humidity: 68, wind: 14, visibility: 20 },
  { state: "TR", condition: "moderate_rain", temp: 27, humidity: 88, wind: 15, visibility: 7  },
];

export const ROUTE_COMPARISON = {
  shipmentId: "SHP-MED-2041",
  routes: [
    {
      id: "ROUTE-A", label: "Route A — NH-27 Direct (Current)",
      distanceKm: 580, etaHrs: 8.5, riskScore: 78, accessibilityScore: 54,
      delayProbability: 0.73, recommended: false,
      via: ["Guwahati", "Nagaon", "Diphu", "Dirang", "Tawang"],
      issues: ["Active landslide at km 847", "High delay probability: 73%"],
    },
    {
      id: "ROUTE-B", label: "Route B — Alt Corridor B + SH-2 (Recommended)",
      distanceKm: 615, etaHrs: 7.8, riskScore: 22, accessibilityScore: 87,
      delayProbability: 0.18, recommended: true,
      via: ["Guwahati", "Tezpur", "Bhalukpong", "Bomdila", "Dirang", "Tawang"],
      aiReasoning: "This route avoids the active landslide on NH-27 (km 847). Although 35km longer, the risk score is 72% lower and the predicted arrival is 42 minutes earlier due to absence of disruption delays. Accessibility score: 87 vs 54. Strongly recommended for critical medicine shipment SHP-MED-2041.",
    },
  ],
};

export const COPILOT_RESPONSES: Record<string, string> = {
  "which shipments are at risk": "Currently **3 shipments** are at high risk:\n\n1. **SHP-MED-2041** (Medicine → Tawang) — Delay probability: 73%. Route MDR-1 blocked by snowfall.\n2. **SHP-EMG-0033** (Emergency → Tura) — Delay probability: 91%. Deadline breach imminent.\n3. **SHP-MED-1999** (Vaccines → N. Sikkim) — Delay probability: 44%. Bridge load restriction on SH-12.",
  "show blocked routes": "Currently **1 route is BLOCKED** and **3 routes are HIGH RISK**:\n\n🔴 **BLOCKED:** MDR-1 (Tawang Mountain Road) — Accessibility: 31/100. Snowfall + fog.\n🟠 **HIGH RISK:** NH-27 — Score: 54. Active landslide near Diphu.\n🟠 **HIGH RISK:** SH-12 — Score: 46. Teesta Bridge structural damage.\n🟡 **RESTRICTED:** NH-37 — Score: 61. Flash flooding near Jowai.",
  "which vehicles are delayed": "**2 vehicles** are currently delayed and **2 are at risk**:\n\n⚠️ **VH-005 (NL-01-3300)** — Delayed on NH-29 near Kohima. Low fuel (35%). Fuel support dispatched.\n⚠️ **VH-015 (ML-04-6634)** — Delayed on NH-37. Carrying critical shipment SHP-EMG-0033.\n🔴 **VH-006 (AR-01-0812)** — At risk on MDR-1. Carrying medicine to Tawang.\n🔴 **VH-014 (AR-03-2255)** — At risk on MDR-1. Snowfall conditions.",
  "safest route to tawang": "Analyzing route options to Tawang...\n\n✅ **Recommended: Alt Corridor B via Tezpur + SH-2**\n- Distance: 615 km (+35 km)\n- ETA: 7h 48min (-42 min faster)\n- Risk Score: 22/100 (Low)\n- Accessibility: 87/100\n\n❌ **Avoid: NH-27 Direct**\n- Distance: 580 km\n- ETA: 8h 30min (with delays)\n- Risk Score: 78/100 (Critical)\n- Active landslide at km 847",
  "districts lowest accessibility": "Districts with lowest accessibility scores:\n\n1. **Tawang (AR)** — 31/100 🔴 — Snowfall, fog, MDR-1 blocked\n2. **North Sikkim (SK)** — 44/100 🔴 — Remote, bridge restriction\n3. **Karbi Anglong (AS)** — 54/100 🟠 — Active landslide\n4. **East Garo Hills (ML)** — 55/100 🟠 — Flooding\n5. **Churachandpur (MN)** — 58/100 🟠 — Road damage",
  "what if nh27 blocked": "**What-If Analysis: NH-27 Fully Blocked**\n\nImpact Assessment:\n- 🚚 Affected Vehicles: **5** (VH-001, VH-002, VH-005, VH-013, VH-014)\n- 📦 Affected Shipments: **7** (including 2 critical medicine shipments)\n- ⏱ Average ETA Impact: **+48 minutes**\n- 🔄 Available Alternate Routes: Alt Corridor B, NH-37 bypass\n\n**AI Recommendation:** Activate Alternative Corridor B immediately. Pre-position fuel support at Tezpur junction.",
};

export const SYSTEM_HEALTH = {
  gpsService:   { status: "online",   label: "GPS Service"   },
  weatherApi:   { status: "online",   label: "Weather API"   },
  aiEngine:     { status: "online",   label: "AI Engine"     },
  database:     { status: "healthy",  label: "Database"      },
  websocket:    { status: "connected",label: "WebSocket"     },
  fieldSync:    { status: "pending",  label: "Field Sync",  pendingCount: 3 },
};
