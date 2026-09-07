"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ROADS, VEHICLES, SHIPMENTS } from "@/lib/demoData";
import { 
  Play, 
  AlertTriangle, 
  Truck, 
  Package, 
  Compass, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface SimulationResult {
  road: string;
  hazard: string;
  severity: string;
  durationHrs: number;
  affectedVehicles: string[];
  affectedShipments: string[];
  delayAverageMins: number;
  accessibilityImpact: number;
  recommendedBypass: string;
  extraDistanceKm: number;
  fuelOverheadLiters: number;
  costImpactInr: number;
}

export default function SimulatorPage() {
  const [selectedRoad, setSelectedRoad] = useState("NH-27");
  const [selectedHazard, setSelectedHazard] = useState("landslide");
  const [severity, setSeverity] = useState("critical");
  const [durationHrs, setDurationHrs] = useState(12);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>({
    road: "NH-27 (East-West Corridor)",
    hazard: "Major Landslide Blockage",
    severity: "critical",
    durationHrs: 12,
    affectedVehicles: ["VH-001 (AS-01-4582)", "VH-002 (AS-05-7821)", "VH-013 (AS-12-5571)"],
    affectedShipments: ["SHP-FOOD-0192 (Churachandpur)", "SHP-MED-2041 (Tawang Hospital)", "SHP-FUEL-0088 (Dibang)"],
    delayAverageMins: 48,
    accessibilityImpact: -38,
    recommendedBypass: "Alternative Corridor B via Haflong–Lanka Expressway",
    extraDistanceKm: 42,
    fuelOverheadLiters: 110,
    costImpactInr: 18500
  });

  const [applied, setApplied] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setApplied(false);

    setTimeout(() => {
      const roadObj = ROADS.find(r => r.id === selectedRoad) || ROADS[0];
      const matchedVehicles = VEHICLES.filter(v => v.route === selectedRoad || Math.random() > 0.6);
      const matchedShipments = SHIPMENTS.filter(s => s.route === selectedRoad || Math.random() > 0.5);

      const penaltyMult = severity === "critical" ? 1.5 : severity === "high" ? 1.2 : 0.8;
      const extraKm = Math.round(25 + Math.random() * 30);
      const delayMin = Math.round((durationHrs * 2.5 + extraKm * 0.8) * penaltyMult);

      setResult({
        road: `${roadObj.id} — ${roadObj.name}`,
        hazard: selectedHazard.toUpperCase().replace("_", " "),
        severity,
        durationHrs,
        affectedVehicles: matchedVehicles.slice(0, 3).map(v => `${v.id} (${v.reg})`),
        affectedShipments: matchedShipments.slice(0, 3).map(s => `${s.id} (${s.destination})`),
        delayAverageMins: delayMin,
        accessibilityImpact: -Math.round(25 * penaltyMult),
        recommendedBypass: selectedRoad === "NH-27" 
          ? "Alt Corridor B via Haflong (Assam Hills)"
          : selectedRoad === "MDR-1"
          ? "SH-2 via Bhalukpong–Bomdila Highway"
          : "NH-10 Teesta Valley Bypass",
        extraDistanceKm: extraKm,
        fuelOverheadLiters: Math.round(extraKm * 2.4),
        costImpactInr: Math.round(extraKm * 2.4 * 94 + 6500)
      });

      setIsRunning(false);
    }, 900);
  };

  return (
    <AppLayout title="What-If Disaster & Corridor Simulator" subtitle="Predict multi-vehicle impacts, calculate rerouting feasibility, and test resilience against natural hazards">
      <div className="p-6 space-y-6">
        
        {/* Intro banner */}
        <div className="p-4 bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border border-cyan-500/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Disaster Resilience Modeling Engine</h3>
              <p className="text-xs text-slate-400">Simulate flash floods, landslides, and bridge outages to preemptively route essential medicine and food supplies.</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold">
            Monte Carlo Routing v2.4
          </span>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Scenario Configuration Controls */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Configure Simulated Event
            </h3>

            {/* Target Road */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Corridor / Arterial Road</label>
              <select
                value={selectedRoad}
                onChange={e => setSelectedRoad(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {ROADS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.id} — {r.name} (Current Score: {r.score})
                  </option>
                ))}
              </select>
            </div>

            {/* Hazard Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Disruption Hazard Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "landslide", label: "Mountain Landslide" },
                  { id: "flooding", label: "River Flash Flood" },
                  { id: "bridge_collapse", label: "Bridge Damage" },
                  { id: "snow_block", label: "Snowstorm / Blizzard" }
                ].map(h => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHazard(h.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                      selectedHazard === h.id
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Blockage Severity</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "critical", label: "Total Closure" },
                  { id: "high", label: "Heavy Restr." },
                  { id: "medium", label: "Single Lane" }
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeverity(s.id)}
                    className={`p-2 rounded-xl border text-xs font-medium text-center transition-all ${
                      severity === s.id
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Duration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Estimated Clearance Duration</span>
                <span className="font-mono text-cyan-400 font-bold">{durationHrs} hours</span>
              </div>
              <input
                type="range"
                min="2"
                max="48"
                step="2"
                value={durationHrs}
                onChange={e => setDurationHrs(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>2 hrs (Minor)</span>
                <span>24 hrs (Major)</span>
                <span>48 hrs (Critical)</span>
              </div>
            </div>

            {/* Run button */}
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-950 flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Computing Multi-Modal Impact Matrix...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute AI Simulation</span>
                </>
              )}
            </button>
          </div>

          {/* Simulation Output & Impact Analysis */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Simulated Impact Assessment
              </h3>
              {result && (
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  Scenario: {result.hazard}
                </span>
              )}
            </div>

            {result ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                
                {/* Top Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 font-medium">Avg Delay Impact</p>
                    <p className="text-xl font-bold text-amber-400 mt-1 flex items-baseline gap-1">
                      +{result.delayAverageMins} <span className="text-xs text-slate-400">min</span>
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 font-medium">Accessibility Delta</p>
                    <p className="text-xl font-bold text-red-400 mt-1">
                      {result.accessibilityImpact} pts
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 font-medium">Bypass Detour</p>
                    <p className="text-xl font-bold text-cyan-400 mt-1 flex items-baseline gap-1">
                      +{result.extraDistanceKm} <span className="text-xs text-slate-400">km</span>
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 font-medium">Fuel & Cost Delta</p>
                    <p className="text-xl font-bold text-slate-200 mt-1 flex items-baseline gap-1">
                      ₹{result.costImpactInr.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* AI Rerouting Recommendation Card */}
                <div className="p-4 bg-gradient-to-r from-emerald-950/30 to-cyan-950/30 border border-emerald-500/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Autonomous Bypass Corridor Identified
                    </span>
                    <span className="text-[11px] text-emerald-300 font-mono">Resilience Score: 91/100</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{result.recommendedBypass}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI optimizer verified bridge load limits and road gradients along this bypass. No active landslides reported within 45km. All essential medicine shipments will maintain thermal integrity.
                  </p>
                </div>

                {/* Affected Fleet & Shipments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      Trapped / At-Risk Vehicles ({result.affectedVehicles.length})
                    </h5>
                    <div className="space-y-1">
                      {result.affectedVehicles.map((v, i) => (
                        <div key={i} className="text-xs p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-300 font-mono">
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-amber-400" />
                      Priority Shipments Impacted ({result.affectedShipments.length})
                    </h5>
                    <div className="space-y-1">
                      {result.affectedShipments.map((s, i) => (
                        <div key={i} className="text-xs p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-300 font-mono">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    {applied ? "✅ Preemptive reroute instructions transmitted to fleet drivers" : "Simulated contingency ready for operational deployment"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setApplied(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        applied
                          ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50"
                          : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {applied ? "Contingency Active" : "Apply Preemptive Reroute"}
                    </button>
                    <Link
                      href="/routes"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-all"
                    >
                      Route Details
                    </Link>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500 space-y-2">
                <AlertTriangle className="w-8 h-8 mx-auto opacity-40 text-amber-400" />
                <p className="text-sm">Configure a scenario on the left and click &quot;Execute AI Simulation&quot;.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
