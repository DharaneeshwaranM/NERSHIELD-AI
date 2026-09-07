"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { MONTHLY_ANALYTICS, NE_STATES, DISTRICTS, KPI, ROADS, INCIDENTS } from "@/lib/demoData";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Calendar, 
  Filter, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2,
  MapPin,
  Sparkles
} from "lucide-react";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last_6_months");
  const [selectedState, setSelectedState] = useState("ALL");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  // State-wise accessibility average
  const stateAccessibilityData = NE_STATES.map(st => {
    const dists = DISTRICTS.filter(d => d.state === st.id);
    const avgScore = dists.length > 0 
      ? Math.round(dists.reduce((acc, curr) => acc + curr.accessibility, 0) / dists.length)
      : 70;
    return {
      state: st.name.split(" ")[0],
      code: st.id,
      accessibility: avgScore,
      vehicles: dists.reduce((acc, curr) => acc + curr.vehicles, 0),
      incidents: dists.reduce((acc, curr) => acc + curr.incidents, 0)
    };
  });

  // Incident type distribution
  const incidentCounts: Record<string, number> = {};
  INCIDENTS.forEach(inc => {
    const formatted = inc.type.replace("_", " ").toUpperCase();
    incidentCounts[formatted] = (incidentCounts[formatted] || 0) + 1;
  });
  const incidentTypeData = Object.entries(incidentCounts).map(([name, value]) => ({ name, value }));

  const COLORS = ["#06b6d4", "#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

  const handleExport = (format: "csv" | "pdf") => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportModalOpen(false);
      alert(`NER Logistics Report exported successfully as ${format.toUpperCase()}. File downloaded to local system.`);
    }, 1200);
  };

  return (
    <AppLayout title="Executive Analytics & Strategic Insights" subtitle="Predictive logistics metrics, regional accessibility heatmaps, and multi-state delivery performance">
      <div className="p-6 space-y-6">
        
        {/* Top Filter & Export Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Timeframe:</span>
              <select 
                value={dateRange} 
                onChange={e => setDateRange(e.target.value)}
                className="bg-transparent text-cyan-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="last_30_days" className="bg-slate-900 text-slate-200">Last 30 Days</option>
                <option value="last_6_months" className="bg-slate-900 text-slate-200">Last 6 Months (FY 24-25)</option>
                <option value="last_year" className="bg-slate-900 text-slate-200">Last 12 Months</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span>Region:</span>
              <select 
                value={selectedState} 
                onChange={e => setSelectedState(e.target.value)}
                className="bg-transparent text-cyan-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">All 8 NE States</option>
                {NE_STATES.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setExportModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-cyan-950/30 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            Generate Strategic Report
          </button>
        </div>

        {/* High-Level KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">On-Time Delivery Rate</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> +4.2% MoM
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">68.4%</span>
              <span className="text-xs text-slate-400 font-medium">target: 80%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68.4%' }}></div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">Average Transit Time</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <TrendingDown className="w-3.5 h-3.5" /> -45 min
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">7.2 hrs</span>
              <span className="text-xs text-slate-400 font-medium">across mountain corridors</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">Avg Accessibility Index</span>
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> Monsoon Impact
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400">67.1<span className="text-lg text-slate-400">/100</span></span>
              <span className="text-xs text-slate-400 font-medium">8 states weighted</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">AI Rerouting Success</span>
              <span className="text-cyan-400 flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> 94.2%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">128</span>
              <span className="text-xs text-slate-400 font-medium">disruptions bypassed</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>

        {/* Charts Row 1: Delivery Volume & Delay Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Delivery Volume & Reliability Trend</h3>
                <p className="text-xs text-slate-400">Monthly on-time vs delayed dispatches across North Eastern corridors</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                  <span>On-Time</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                  <span>Delayed</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px", color: "#f8fafc" }}
                  />
                  <Bar dataKey="onTime" name="On Time" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="delayed" name="Delayed" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Active Hazard Distribution</h3>
              <p className="text-xs text-slate-400">By incident severity classification</p>
            </div>

            <div className="h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px", color: "#f8fafc" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {incidentTypeData.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className="truncate">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Charts Row 2: State Accessibility Comparison & Corridor Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">State Accessibility Index Comparison</h3>
              <p className="text-xs text-slate-400">Average multi-criteria infrastructure rating (0–100)</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateAccessibilityData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis type="category" dataKey="state" stroke="#94a3b8" fontSize={11} tickLine={false} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px", color: "#f8fafc" }}
                  />
                  <Bar dataKey="accessibility" name="Accessibility Score" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Corridor Incident Frequency & Transit Delays</h3>
              <p className="text-xs text-slate-400">Average transit duration vs reported disruptions</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px", color: "#f8fafc" }}
                  />
                  <Area type="monotone" dataKey="avgEtaHrs" name="Avg Transit (Hrs)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="incidents" name="Incidents Count" stroke="#f43f5e" fill="#e11d48" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Export Modal */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  Export Strategic Logistics Report
                </h3>
                <button
                  onClick={() => setExportModalOpen(false)}
                  className="text-slate-400 hover:text-slate-200 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Generate an executive compliance brief for MDoNER & State Disaster Management Authorities containing vehicle telemetry, accessibility scores, and disrupted shipments.
              </p>

              <div className="space-y-3">
                <button
                  disabled={exporting}
                  onClick={() => handleExport("pdf")}
                  className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-400">Executive PDF Brief</p>
                      <p className="text-xs text-slate-400">Includes charts, AI recommendations & incident log</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">~2.4 MB</span>
                </button>

                <button
                  disabled={exporting}
                  onClick={() => handleExport("csv")}
                  className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-400">Raw Data CSV Dataset</p>
                      <p className="text-xs text-slate-400">Full vehicle GPS, district scores, shipment records</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">~850 KB</span>
                </button>
              </div>

              {exporting && (
                <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl text-center text-xs text-cyan-300 animate-pulse">
                  Compiling telemetry data & formatting charts...
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  disabled={exporting}
                  onClick={() => setExportModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
