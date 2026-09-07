"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { DISTRICTS, NE_STATES, ROADS, VEHICLES, SHIPMENTS } from "@/lib/demoData";
import { 
  MapPin, 
  Search, 
  Filter, 
  ShieldAlert, 
  Truck, 
  Package, 
  AlertTriangle, 
  Building2, 
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function DistrictsPage() {
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedRemoteness, setSelectedRemoteness] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDistrict, setActiveDistrict] = useState<typeof DISTRICTS[0] | null>(DISTRICTS[0]);

  const filteredDistricts = DISTRICTS.filter(d => {
    if (selectedState !== "ALL" && d.state !== selectedState) return false;
    if (selectedRemoteness !== "ALL" && d.remoteness !== selectedRemoteness) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const stateObj = NE_STATES.find(s => s.id === d.state);
      return (
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        (stateObj?.name.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

  const getStateName = (code: string) => NE_STATES.find(s => s.id === code)?.name || code;

  return (
    <AppLayout title="Districts Accessibility & Vulnerability Matrix" subtitle="Multi-criteria infrastructure ratings, remoteness indicators, and supply corridor links across all 8 NE states">
      <div className="p-6 space-y-6">
        
        {/* Top Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search district, state, ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-56"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>State:</span>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="bg-transparent text-cyan-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">All 8 States</option>
                {NE_STATES.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">{s.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Remoteness:</span>
              <select
                value={selectedRemoteness}
                onChange={e => setSelectedRemoteness(e.target.value)}
                className="bg-transparent text-cyan-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">All Levels</option>
                <option value="urban" className="bg-slate-900 text-slate-200">Urban Center</option>
                <option value="medium" className="bg-slate-900 text-slate-200">Medium Accessibility</option>
                <option value="remote" className="bg-slate-900 text-slate-200">Remote / Mountainous</option>
                <option value="very_remote" className="bg-slate-900 text-slate-200">Very Remote / Border</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Showing <strong className="text-cyan-400">{filteredDistricts.length}</strong> of {DISTRICTS.length} Key Monitored Districts</span>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Districts Grid List */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDistricts.length === 0 ? (
              <div className="col-span-2 p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40 text-cyan-400" />
                <p className="text-sm">No districts found matching current filters.</p>
              </div>
            ) : (
              filteredDistricts.map(d => {
                const isSelected = activeDistrict?.id === d.id;
                const score = d.accessibility;
                const scoreColor = score >= 75 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400";
                const ringBg = score >= 75 ? "stroke-emerald-500" : score >= 50 ? "stroke-amber-500" : "stroke-red-500";

                return (
                  <div
                    key={d.id}
                    onClick={() => setActiveDistrict(d)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected 
                        ? "bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/30" 
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                            {d.id}
                          </span>
                          <span className="text-xs text-slate-400">{getStateName(d.state)}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{d.name}</h4>
                      </div>

                      {/* Score circle */}
                      <div className="flex flex-col items-center">
                        <span className={`text-lg font-extrabold ${scoreColor}`}>{score}</span>
                        <span className="text-[9px] text-slate-500 uppercase font-semibold">Score</span>
                      </div>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Truck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{d.vehicles} trucks</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span>{d.incidents} hazards</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Package className="w-3.5 h-3.5 text-amber-400" />
                        <span>{d.criticalShipments} priority</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {d.remoteness.replace("_", " ")}
                      </span>
                      <span className="text-cyan-400 flex items-center gap-0.5 font-medium group-hover:underline">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* District Profile & Vulnerability Drill-down */}
          <div className="lg:col-span-4 sticky top-6 space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              District Logistics Profile
            </h3>

            {activeDistrict ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-2xl">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-cyan-400">{activeDistrict.id}</span>
                    <span className="text-slate-400">{getStateName(activeDistrict.state)}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-white">{activeDistrict.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Coordinates: {activeDistrict.lat.toFixed(4)}° N, {activeDistrict.lon.toFixed(4)}° E
                  </p>
                </div>

                {/* Big Score Card */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase">Accessibility Index</span>
                    <p className={`text-3xl font-extrabold mt-0.5 ${
                      activeDistrict.accessibility >= 75 ? "text-emerald-400" :
                      activeDistrict.accessibility >= 50 ? "text-amber-400" : "text-red-400"
                    }`}>
                      {activeDistrict.accessibility}<span className="text-sm text-slate-500">/100</span>
                    </p>
                  </div>
                  <div className="text-right text-xs space-y-1">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block">
                      {activeDistrict.remoteness.replace("_", " ")}
                    </span>
                    <p className="text-[11px] text-slate-500">Updated 10 min ago</p>
                  </div>
                </div>

                {/* Key Infrastructure & Risk Factors */}
                <div className="space-y-3 text-xs">
                  <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Vulnerability Factors
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Terrain Classification:</span>
                      <span className="text-slate-200 font-medium">Hilly / Sub-Himalayan</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Monsoon Vulnerability:</span>
                      <span className="text-amber-400 font-medium">High (Landslides)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Cellular Coverage:</span>
                      <span className="text-cyan-400 font-medium">Partial 4G / Satellite</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Nearest Supply Depot:</span>
                      <span className="text-slate-200 font-medium">Guwahati / Tezpur Hub</span>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                  <Link
                    href={`/dashboard?lat=${activeDistrict.lat}&lon=${activeDistrict.lon}`}
                    className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold text-center transition-all shadow-md shadow-cyan-950 flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Locate on GIS Control Map
                  </Link>

                  <Link
                    href="/routes"
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium text-center transition-all"
                  >
                    View Inbound Supply Routes
                  </Link>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500">
                Select a district to view detailed vulnerability analysis.
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
