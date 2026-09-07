"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ROADS, INCIDENTS } from "@/lib/demoData";
import { 
  Wifi, 
  WifiOff, 
  MapPin, 
  Camera, 
  Mic, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Upload, 
  Check,
  ShieldCheck,
  Smartphone
} from "lucide-react";

interface OfflineReport {
  id: string;
  type: string;
  severity: string;
  road: string;
  description: string;
  lat: number;
  lon: number;
  timestamp: string;
  status: "queued" | "synced";
  photoAttached?: boolean;
}

export default function FieldOfficerPage() {
  const [isOffline, setIsOffline] = useState(false);
  const [gpsLocked, setGpsLocked] = useState(true);
  const [currentCoords, setCurrentCoords] = useState({ lat: 26.0930, lon: 93.5497 });
  const [photoAttached, setPhotoAttached] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Form State
  const [hazardType, setHazardType] = useState("landslide");
  const [severity, setSeverity] = useState("high");
  const [road, setRoad] = useState("NH-27");
  const [description, setDescription] = useState("");
  const [officerId, setOfficerId] = useState("FO-AS-003");

  // Offline Queue
  const [queue, setQueue] = useState<OfflineReport[]>([
    {
      id: "REP-OFF-901",
      type: "Flooding",
      severity: "high",
      road: "NH-8 (Jowai Pass)",
      description: "Water level rose 40cm across low-lying culvert.",
      lat: 25.4343,
      lon: 92.1816,
      timestamp: "10 mins ago",
      status: "queued",
      photoAttached: true
    },
    {
      id: "REP-OFF-902",
      type: "Rockfall",
      severity: "medium",
      road: "MDR-3 (Churachandpur)",
      description: "Minor rockfall on single lane. Passenger vehicles passing slowly.",
      lat: 24.3333,
      lon: 93.6833,
      timestamp: "25 mins ago",
      status: "queued",
      photoAttached: false
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide a brief description of the incident.");
      return;
    }

    const newReport: OfflineReport = {
      id: `REP-${isOffline ? "OFF" : "LIVE"}-${Math.floor(1000 + Math.random() * 9000)}`,
      type: hazardType.toUpperCase(),
      severity,
      road,
      description,
      lat: currentCoords.lat,
      lon: currentCoords.lon,
      timestamp: "Just now",
      status: isOffline ? "queued" : "synced",
      photoAttached
    };

    setQueue(prev => [newReport, ...prev]);
    setDescription("");
    setPhotoAttached(false);

    if (!isOffline) {
      alert("Report successfully submitted to NER-SHIELD Central Command!");
    } else {
      alert("Device is offline. Report stored securely in local SQLite storage. Will auto-sync when network returns.");
    }
  };

  const handleSyncAll = () => {
    if (isOffline) {
      alert("Cannot sync: Device is in offline mode. Please reconnect first.");
      return;
    }
    setSyncing(true);
    setTimeout(() => {
      setQueue(prev => prev.map(r => ({ ...r, status: "synced" })));
      setSyncing(false);
      alert("All offline reports synchronized with Central Command database!");
    }, 1200);
  };

  const queuedCount = queue.filter(r => r.status === "queued").length;

  return (
    <AppLayout title="Field Officer Offline Portal" subtitle="Edge-first reporting workstation optimized for low-bandwidth, mountainous, and disconnected field conditions">
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        
        {/* Connection & Edge Status Bar */}
        <div className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isOffline 
            ? "bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-950/20" 
            : "bg-emerald-950/30 border-emerald-500/30"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isOffline ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
            }`}>
              {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  {isOffline ? "OFFLINE MODE ACTIVE" : "CONNECTED TO CENTRAL CLOUD"}
                </h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  isOffline ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}>
                  {isOffline ? "Local SQLite Buffer" : "WebSocket 4G/Sat"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isOffline 
                  ? "Reports are cryptographically cached locally and will auto-retransmit upon network recovery." 
                  : "Live bi-directional synchronization enabled with MDoNER control room."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isOffline 
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" 
                  : "bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700"
              }`}
            >
              {isOffline ? "Reconnect Network" : "Simulate Offline Mode"}
            </button>

            {queuedCount > 0 && !isOffline && (
              <button
                onClick={handleSyncAll}
                disabled={syncing}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-950"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
                <span>Sync Queue ({queuedCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* GPS Sensor Strip */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="font-semibold text-white">Hardware GPS Fix:</span>
            <span className="font-mono text-cyan-400">{currentCoords.lat.toFixed(4)}° N, {currentCoords.lon.toFixed(4)}° E</span>
            <span className="text-slate-500">(Accuracy: ±3.8m)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Officer: <strong className="text-slate-200">{officerId}</strong></span>
            <span>Battery: <strong className="text-emerald-400">88%</strong></span>
            <span>Local Storage: <strong className="text-slate-200">12 MB / 512 MB</strong></span>
          </div>
        </div>

        {/* Reporting Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Submission Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                Rapid Field Incident Dispatch
              </h3>
              <span className="text-[11px] text-slate-500">Auto-tagged with GPS & Timestamp</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hazard Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Hazard Category</label>
                  <select
                    value={hazardType}
                    onChange={e => setHazardType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="landslide">Landslide / Debris Flow</option>
                    <option value="flooding">Flash Flooding / Submergence</option>
                    <option value="bridge_damage">Bridge Structural Damage</option>
                    <option value="road_damage">Road Sinking / Cave-in</option>
                    <option value="snow_block">Heavy Snow / Ice Hazard</option>
                    <option value="tree_fall">Fallen Tree / Electric Pole</option>
                  </select>
                </div>

                {/* Corridor */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Corridor / Highway</label>
                  <select
                    value={road}
                    onChange={e => setRoad(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    {ROADS.map(r => (
                      <option key={r.id} value={r.id}>{r.id} — {r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Severity Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Hazard Severity Assessment</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "critical", label: "Critical (Closed)" },
                    { id: "high", label: "High (Restricted)" },
                    { id: "medium", label: "Medium (Slow)" },
                    { id: "low", label: "Low (Advisory)" }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeverity(s.id)}
                      className={`p-2 rounded-xl border text-[11px] font-medium text-center transition-all ${
                        severity === s.id
                          ? "bg-red-500/20 border-red-500/50 text-red-300 shadow-sm"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Field Notes & Ground Conditions</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe obstruction length, water depth, estimated clearance time, or vehicle impassability..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Multimedia Attachments */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setPhotoAttached(!photoAttached)}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    photoAttached 
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" 
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  {photoAttached ? "Geo-Tagged Photo Attached" : "Capture Evidence Photo"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isRecording 
                      ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse" 
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {isRecording ? "Recording Voice Memo..." : "Record Audio Note"}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isOffline ? "Save Report to Offline Queue" : "Transmit Report to Control Tower"}
              </button>

            </form>
          </div>

          {/* Offline Queue & Recent Sync History */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Local Report Cache ({queue.length})
              </h3>
              <span className="text-[11px] text-slate-500">{queuedCount} awaiting sync</span>
            </div>

            <div className="space-y-3">
              {queue.map(report => (
                <div
                  key={report.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">{report.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1 ${
                      report.status === "synced" 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                    }`}>
                      {report.status === "synced" ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {report.status === "synced" ? "Synced to Cloud" : "Local Queue"}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{report.type}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300 font-normal">{report.road}</span>
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{report.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <span className="font-mono">{report.lat.toFixed(4)}°, {report.lon.toFixed(4)}°</span>
                    <span>{report.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
