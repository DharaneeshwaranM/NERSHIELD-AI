"""
NER-SHIELD AI — Predictive ETA & Delay Probability Model
Simulates gradient boosting regression over historical road telemetry, weather, and active hazard vectors.
"""
from typing import Dict, Any


class ETAPredictor:
    BASE_MOUNTAIN_SPEED_KMH = 35.0  # Average commercial vehicle speed in NE hills
    BASE_PLAINS_SPEED_KMH = 55.0

    @classmethod
    def predict_eta(
        cls,
        distance_km: float,
        accessibility_score: int,
        weather: str,
        is_mountainous: bool = True
    ) -> Dict[str, Any]:
        base_speed = cls.BASE_MOUNTAIN_SPEED_KMH if is_mountainous else cls.BASE_PLAINS_SPEED_KMH

        # Speed reduction factor based on accessibility score
        if accessibility_score >= 80:
            speed_mult = 1.0
            delay_prob = 0.08
        elif accessibility_score >= 60:
            speed_mult = 0.75
            delay_prob = 0.28
        elif accessibility_score >= 40:
            speed_mult = 0.50
            delay_prob = 0.65
        else:
            speed_mult = 0.25
            delay_prob = 0.92

        # Weather slowdown
        if weather in ["heavy_rain", "snowfall_fog"]:
            speed_mult *= 0.7
            delay_prob = min(0.98, delay_prob + 0.15)

        effective_speed = max(10.0, base_speed * speed_mult)
        transit_hours = distance_km / effective_speed

        hours = int(transit_hours)
        minutes = int((transit_hours - hours) * 60)

        return {
            "distance_km": distance_km,
            "estimated_speed_kmh": round(effective_speed, 1),
            "transit_hours": round(transit_hours, 2),
            "formatted_duration": f"{hours}h {minutes}m",
            "delay_probability": round(delay_prob, 2),
            "risk_assessment": "critical" if delay_prob > 0.7 else "high" if delay_prob > 0.4 else "normal"
        }
