"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { SYSTEM_HEALTH, NE_STATES } from "@/lib/demoData";
import { 
  Users, 
  Settings, 
  Sliders, 
  Database, 
  ShieldCheck, 
  Server, 
  Activity, 
  RefreshCw, 
  UserPlus, 
  Check, 
  Lock, 
  Cpu, 
  FileCode,
  Sparkles
} from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  state: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRecord[]>([
    { id: "USR-001", name: "Dr. Arvind Sharma", email: "admin@nershield.gov.in", role: "Super Admin (MDoNER)", state: "Central", status: "active", lastLogin: "10 mins ago" },
    { id: "USR-002", name: "R. Lyngdoh", email: "control.meghalaya@nershield.gov.in", role: "State Logistics Controller", state: "Meghalaya", status: "active", lastLogin: "1 hour ago" },
    { id: "USR-003", name: "Biren Gogoi", email: "fleet.assam@nershield.gov.in", role: "Fleet Operations Manager", state: "Assam", status: "active", lastLogin: "35 mins ago" },
    { id: "USR-004", name: "T. Khandu", email: "field.arunachal@nershield.gov.in", role: "Field Disaster Officer", state: "Arunachal Pradesh", status: "active", lastLogin: "3 hours ago" },
    { id: "USR-005", name: "N. Angami", email: "logistics.nagaland@nershield.gov.in", role: "Regional Logistics Partner", state: "Nagaland", status: "active", lastLogin: "Yesterday" }
  ]);

  // AI Hyperparameters
  const [etaPenaltyWeight, setEtaPenaltyWeight] = useState(1.4);
  const [weatherSensitivity, setWeatherSensitivity] = useState(1.8);
  const [rerouteThresholdKm, setRerouteThresholdKm] = useState(35);
  const [autoRerouteEnabled, setAutoRerouteEnabled] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);

  // New user modal state
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Field Disaster Officer");
  const [newUserState, setNewUserState] = useState("Assam");

  const handleSaveAIParams = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: UserRecord = {
      id: `USR-00${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      state: newUserState,
      status: "active",
      lastLogin: "Never"
    };

    setUsers([...users, newUser]);
    setIsAddingUser(false);
    setNewUserName("");
    setNewUserEmail("");
  };

  return (
    <AppLayout title="Platform Administration & SIH Control Tower" subtitle="Manage government roles, configure multi-criteria AI models, and monitor distributed infrastructure">
      <div className="p-6 space-y-8">
        
        {/* Infrastructure & Service Health Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              Microservices & Infrastructure Telemetry
            </h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational (99.98% Uptime)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "FastAPI Backend", status: "Healthy", ping: "24ms", color: "text-emerald-400", border: "border-emerald-500/20" },
              { name: "PostGIS Spatial DB", status: "Active", ping: "12ms", color: "text-emerald-400", border: "border-emerald-500/20" },
              { name: "Redis Telemetry Bus", status: "Connected", ping: "3ms", color: "text-emerald-400", border: "border-emerald-500/20" },
              { name: "AI Inference Engine", status: "Online", ping: "85ms", color: "text-cyan-400", border: "border-cyan-500/20" },
              { name: "IMD Weather Feeds", status: "Syncing", ping: "140ms", color: "text-emerald-400", border: "border-emerald-500/20" },
              { name: "Edge Field Gateway", status: "Standby", ping: "18ms", color: "text-amber-400", border: "border-amber-500/20" }
            ].map(svc => (
              <div key={svc.name} className={`bg-slate-900/60 border ${svc.border} rounded-xl p-3 space-y-1`}>
                <p className="text-[11px] text-slate-400 font-medium truncate">{svc.name}</p>
                <p className={`text-sm font-bold ${svc.color}`}>{svc.status}</p>
                <p className="text-[10px] text-slate-500 font-mono">RTT: {svc.ping}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: AI Tuning & Users */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* User Management */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Authorized Government & Logistics Personnels
                </h3>
                <p className="text-xs text-slate-400">Role-based access control (RBAC) across central and state authorities</p>
              </div>

              <button
                onClick={() => setIsAddingUser(!isAddingUser)}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-950"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add User
              </button>
            </div>

            {/* Add User Form Drawer */}
            {isAddingUser && (
              <form onSubmit={handleAddUser} className="p-4 bg-slate-950/80 border border-slate-700 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Register Operational Account</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Official Email (.gov.in / partner)"
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="State Logistics Controller">State Logistics Controller</option>
                    <option value="Fleet Operations Manager">Fleet Operations Manager</option>
                    <option value="Field Disaster Officer">Field Disaster Officer</option>
                    <option value="Regional Logistics Partner">Regional Logistics Partner</option>
                  </select>
                  <select
                    value={newUserState}
                    onChange={e => setNewUserState(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {NE_STATES.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Confirm Registration
                  </button>
                </div>
              </form>
            )}

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Role & Jurisdiction</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-800/40">
                      <td className="p-3">
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-cyan-300 font-medium">{u.role}</div>
                        <div className="text-[11px] text-slate-500">{u.state}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right text-slate-400 font-mono text-[11px]">
                        {u.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Model Hyperparameter Tuning */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  AI Model Weights & Policy Tuning
                </h3>
                <p className="text-xs text-slate-400">Live calibration for ETA and Dijkstra accessibility weights</p>
              </div>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="space-y-4">
              
              {/* ETA Hazard Penalty Weight */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">ETA Hazard Penalty Multiplier</span>
                  <span className="font-mono text-cyan-400 font-bold">{etaPenaltyWeight}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.1"
                  value={etaPenaltyWeight}
                  onChange={e => setEtaPenaltyWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <p className="text-[10px] text-slate-500">Scales travel time inflation for roads with active landslides or floods.</p>
              </div>

              {/* Weather Sensitivity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">IMD Rainfall Vulnerability Sensitivity</span>
                  <span className="font-mono text-cyan-400 font-bold">{weatherSensitivity}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.1"
                  value={weatherSensitivity}
                  onChange={e => setWeatherSensitivity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <p className="text-[10px] text-slate-500">Higher sensitivity preemptively downgrades road scores during heavy rainfall.</p>
              </div>

              {/* Max Detour Threshold */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Max Permitted AI Detour Distance</span>
                  <span className="font-mono text-cyan-400 font-bold">+{rerouteThresholdKm} km</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={rerouteThresholdKm}
                  onChange={e => setRerouteThresholdKm(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <p className="text-[10px] text-slate-500">Autonomous rerouting will reject bypasses exceeding this extra distance limit.</p>
              </div>

              {/* Auto Reroute Toggle */}
              <div className="pt-2 flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">Autonomous Rerouting Dispatch</p>
                  <p className="text-[10px] text-slate-400">Push alternative routes directly to vehicle drivers</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoRerouteEnabled(!autoRerouteEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${autoRerouteEnabled ? "bg-cyan-500" : "bg-slate-700"}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${autoRerouteEnabled ? "left-6" : "left-1"}`} />
                </button>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveAIParams}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-950 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                {savedSettings ? "Parameters Saved & Deployed to Cluster!" : "Apply Calibration Parameters"}
              </button>

            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
