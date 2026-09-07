"""
NER-SHIELD AI — Accessibility Scoring Engine
Multi-criteria composite algorithm for North Eastern mountainous road networks.

Formula:
  Accessibility Score = 100 - (
      W_hazard * HazardPenalty
    + W_weather * WeatherPenalty
    + W_slope * TerrainPenalty
    + W_traffic * TrafficPenalty
  )
Bounded strictly between [0, 100].
"""
from typing import Dict, Any, List


class AccessibilityScorer:
    # Default weights calibrated for Himalayan / Sub-Himalayan monsoon conditions
    W_HAZARD = 0.40
    W_WEATHER = 0.25
    W_TERRAIN = 0.20
    W_TRAFFIC = 0.15

    WEATHER_SEVERITY = {
        "clear": 0.0,
        "light_rain": 15.0,
        "moderate_rain": 35.0,
        "heavy_rain": 65.0,
        "snowfall_fog": 85.0,
    }

    TRAFFIC_SEVERITY = {
        "very_low": 0.0,
        "light": 10.0,
        "moderate": 25.0,
        "heavy": 55.0,
        "jammed": 90.0,
    }

    HAZARD_PENALTIES = {
        "landslide": 80.0,
        "flooding": 70.0,
        "bridge_damage": 75.0,
        "road_damage": 40.0,
        "weather_obstruction": 50.0,
        "vehicle_incident": 30.0,
    }

    @classmethod
    def calculate_score(
        cls,
        weather: str,
        traffic: str,
        incidents: List[Dict[str, Any]],
        slope_pct: float = 12.0
    ) -> Dict[str, Any]:
        weather_penalty = cls.WEATHER_SEVERITY.get(weather.lower(), 20.0)
        traffic_penalty = cls.TRAFFIC_SEVERITY.get(traffic.lower(), 15.0)

        # Max hazard penalty from active incidents on segment
        hazard_penalty = 0.0
        for inc in incidents:
            itype = inc.get("type", "").lower()
            pen = cls.HAZARD_PENALTIES.get(itype, 30.0)
            if inc.get("severity") == "critical":
                pen *= 1.25
            hazard_penalty = max(hazard_penalty, pen)

        # Terrain / steep slope risk (Himalayan passes have slopes > 15%)
        terrain_penalty = min(slope_pct * 3.0, 50.0)

        composite_deduction = (
            cls.W_HAZARD * hazard_penalty
            + cls.W_WEATHER * weather_penalty
            + cls.W_TERRAIN * terrain_penalty
            + cls.W_TRAFFIC * traffic_penalty
        )

        score = max(0, min(100, round(100 - composite_deduction)))

        if score >= 75:
            status = "accessible"
        elif score >= 55:
            status = "restricted"
        elif score >= 35:
            status = "high_risk"
        else:
            status = "blocked"

        return {
            "score": score,
            "status": status,
            "components": {
                "hazard_penalty": round(hazard_penalty, 1),
                "weather_penalty": round(weather_penalty, 1),
                "terrain_penalty": round(terrain_penalty, 1),
                "traffic_penalty": round(traffic_penalty, 1),
            }
        }
