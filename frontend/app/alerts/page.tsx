"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ALERTS, VEHICLES, SHIPMENTS, INCIDENTS } from "@/lib/demoData";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Truck, 
  Package, 
  MapPin, 
  Filter, 
  Check, 
  ExternalLink,
  Volume2,
  VolumeX,
  RefreshCw,
  Search
} from "lucide-react";
import Link from "next/link";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(alerts[0]?.id || null);

  const toggleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: !a.acknowledged } : a));
  };

  const acknowledgeAll = () => {
    setAlerts(prev => prev.map(a => ({ ...a, acknowledged: true })));
  };

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter !== "all" && a.severity !== severityFilter) return false;
    if (statusFilter === "acknowledged" && !a.acknowledged) return false;
    if (statusFilter === "unacknowledged" && a.acknowledged) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q) ||
        a.affectedVehicles.some(v => v.toLowerCase().includes(q)) ||
        a.affectedShipments.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const selectedAlert = alerts.find(a => a.id === selectedAlertId);
  const unackCount = alerts.filter(a => !a.acknowledged).length;
  const criticalCount = alerts.filter(a => a.severity === "critical").length;

  return (
    <AppLayout title="Intelligent Alert Center" subtitle="Real-time multi-hazard warnings, vehicle threat tracking, and automated AI advisory dispatch">
      <div className="p-6 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts, vehicle, shipment..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-slate-950/80 border border-slate-700/80 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 px-2">Severity:</span>
              {["all", "critical", "high", "medium", "low"].map(s => (
                <button
                  key={s}
                  onClick={() => setSeverityFilter(s)}
                  className={`px-2.5 py-1 text-xs rounded font-medium capitalize transition-all ${
                    severityFilter === s 
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 px-2">Status:</span>
              {["all", "unacknowledged", "acknowledged"].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs rounded font-medium capitalize transition-all ${
                    statusFilter === st 
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                soundEnabled 
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-400" 
                  : "bg-slate-800/80 border-slate-700 text-slate-400"
              }`}
              title="Toggle Alert Audio Chime"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Audio Off"}</span>
            </button>

            {unackCount > 0 && (
              <button
                onClick={acknowledgeAll}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Acknowledge All ({unackCount})
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-medium tracking-wider">Active Alerts</p>
              <p className="text-2xl font-bold text-white mt-0.5">{alerts.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-red-900/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-red-400 uppercase font-medium tracking-wider">Critical Severity</p>
              <p className="text-2xl font-bold text-red-400 mt-0.5">{criticalCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-amber-900/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-400 uppercase font-medium tracking-wider">Pending Action</p>
              <p className="text-2xl font-bold text-amber-400 mt-0.5">{unackCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-emerald-900/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-400 uppercase font-medium tracking-wider">Acknowledged</p>
              <p className="text-2xl font-bold text-emerald-400 mt-0.5">{alerts.length - unackCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Master-Detail Alert Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Alert List */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center justify-between">
              <span>Threat Feed ({filteredAlerts.length})</span>
              <span className="text-[11px] text-slate-500">Click an alert to view AI advisory</span>
            </h3>

            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-500">
                <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No alerts match your filter criteria.</p>
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const isSelected = alert.id === selectedAlertId;
                const isCritical = alert.severity === "critical";
                const isHigh = alert.severity === "high";

                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlertId(alert.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected 
                        ? "bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/30" 
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90"
                    }`}
                  >
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          isCritical ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse" :
                          isHigh ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                          alert.severity === "medium" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                          "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{alert.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500">
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${alert.acknowledged ? "bg-slate-600" : "bg-cyan-400 animate-ping"}`} />
                      </div>
                    </div>

                    {/* Title & Message */}
                    <h4 className="text-sm font-semibold text-slate-100 mb-1 leading-snug">{alert.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{alert.message}</p>

                    {/* Impact Badges */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                      <div className="flex items-center gap-3 text-slate-400">
                        {alert.affectedVehicles.length > 0 && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <Truck className="w-3.5 h-3.5 text-cyan-400" />
                            {alert.affectedVehicles.length} vehicles
                          </span>
                        )}
                        {alert.affectedShipments.length > 0 && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <Package className="w-3.5 h-3.5 text-amber-400" />
                            {alert.affectedShipments.length} shipments
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAcknowledge(alert.id);
                        }}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
                          alert.acknowledged 
                            ? "bg-slate-800 text-slate-400 border border-slate-700" 
                            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Alert Detail & Action Panel */}
          <div className="lg:col-span-6 space-y-4 sticky top-6">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Disaster Response & AI Advisory
            </h3>

            {selectedAlert ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-5 shadow-xl">
                
                {/* Header detail */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">{selectedAlert.id}</span>
                    <span className="text-xs text-slate-400">
                      Generated: {new Date(selectedAlert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{selectedAlert.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    {selectedAlert.message}
                  </p>
                </div>

                {/* AI Automated Recommendation */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    Autonomous AI Recommendation
                  </div>
                  <p className="text-sm font-medium text-cyan-100">
                    {selectedAlert.recommendation}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Link
                      href="/routes"
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-950"
                    >
                      Execute Recommended Reroute
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/dashboard"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-all"
                    >
                      View on Control Map
                    </Link>
                  </div>
                </div>

                {/* Affected Entities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Affected Vehicles */}
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-2">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      Affected Vehicles ({selectedAlert.affectedVehicles.length})
                    </h5>
                    {selectedAlert.affectedVehicles.length > 0 ? (
                      <div className="space-y-1.5">
                        {selectedAlert.affectedVehicles.map(vId => {
                          const v = VEHICLES.find(item => item.id === vId);
                          return (
                            <div key={vId} className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded border border-slate-800">
                              <div>
                                <span className="font-mono text-cyan-300 font-semibold">{vId}</span>
                                <span className="text-slate-400 ml-1.5">({v?.reg || "Unknown"})</span>
                              </div>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium capitalize ${
                                v?.riskLevel === "critical" ? "bg-red-500/20 text-red-400" :
                                v?.riskLevel === "high" ? "bg-amber-500/20 text-amber-400" :
                                "bg-blue-500/20 text-blue-400"
                              }`}>
                                {v?.status || "moving"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No fleet vehicles currently in affected zone.</p>
                    )}
                  </div>

                  {/* Affected Shipments */}
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-2">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-amber-400" />
                      Affected Shipments ({selectedAlert.affectedShipments.length})
                    </h5>
                    {selectedAlert.affectedShipments.length > 0 ? (
                      <div className="space-y-1.5">
                        {selectedAlert.affectedShipments.map(sId => {
                          const s = SHIPMENTS.find(item => item.id === sId);
                          return (
                            <div key={sId} className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded border border-slate-800">
                              <div>
                                <span className="font-mono text-amber-300 font-semibold">{sId}</span>
                                <p className="text-[11px] text-slate-400 truncate max-w-[130px]">{s?.destination || "Destination"}</p>
                              </div>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium capitalize ${
                                s?.priority === "critical" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                              }`}>
                                {s?.priority || "normal"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No active cargo assignments in this corridor.</p>
                    )}
                  </div>
                </div>

                {/* Incident Link */}
                {selectedAlert.incidentId && (
                  <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-slate-300">Linked Incident Record:</span>
                      <span className="font-mono text-cyan-400">{selectedAlert.incidentId}</span>
                    </div>
                    <Link
                      href="/incidents"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                    >
                      View Incident Chain
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-500">Status: {selectedAlert.acknowledged ? "Acknowledged by Control Room" : "Pending Acknowledgment"}</span>
                  <button
                    onClick={() => toggleAcknowledge(selectedAlert.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedAlert.acknowledged
                        ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    {selectedAlert.acknowledged ? "Mark Unacknowledged" : "Confirm Acknowledgment"}
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-500">
                Select an alert from the left panel to inspect AI actions.
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
