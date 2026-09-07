'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '../../components/AppLayout';
import {
  Truck, Package, AlertTriangle, Road, Clock, Navigation,
  TrendingUp, TrendingDown, Minus, Activity, Bot,
  Zap, CheckCircle, XCircle, LucideIcon
} from 'lucide-react';
import {
  KPI, ACTIVITY_FEED, ALERTS, VEHICLES, SHIPMENTS,
  ROADS, INCIDENTS, MONTHLY_ANALYTICS
} from '../../lib/demoData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

// Dynamically import map to avoid SSR issues
const NERMap = dynamic(() => import('../../components/NERMap'), { ssr: false, loading: () => (
  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1b2e', borderRadius: 16 }}>
    <div style={{ color: '#94a3b8', fontSize: 13 }}>Loading map…</div>
  </div>
)});

// ── KPI Card ────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, value, sub, variant, trend }: {
  icon: LucideIcon; label: string; value: string | number; sub?: string; variant?: string; trend?: 'up' | 'down' | 'stable';
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#94a3b8';

  return (
    <div className={`kpi-card ${variant || ''}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color="#94a3b8" />
        </div>
        {trend && <TrendIcon size={14} color={trendColor} />}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#f1f5f9', lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: sub ? 4 : 0 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#64748b' }}>{sub}</div>}
    </div>
  );
}

// ── Activity Feed Item ──────────────────────────────────────────
const ACTIVITY_COLORS: Record<string, string> = {
  vehicle_alert: '#f97316', incident: '#ef4444', eta_update: '#f59e0b',
  field_report: '#3b82f6', rerouting: '#6366f1', accessibility: '#ef4444',
  delivery: '#10b981', optimization: '#06b6d4', weather: '#f59e0b',
};
const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  vehicle_alert: Truck, incident: AlertTriangle, eta_update: Clock,
  field_report: Activity, rerouting: Navigation, accessibility: Navigation,
  delivery: CheckCircle, optimization: Bot, weather: Zap,
};

function ActivityItem({ item }: { item: typeof ACTIVITY_FEED[0] }) {
  const color = ACTIVITY_COLORS[item.type] || '#94a3b8';
  const Icon = ACTIVITY_ICONS[item.type] || Activity;
  const time = new Date(item.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(31,45,74,0.5)' }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
        <Icon size={13} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>{item.message}</p>
        <span style={{ fontSize: 10, color: '#475569' }}>{time}</span>
      </div>
    </div>
  );
}

// ── Alert Summary ───────────────────────────────────────────────
function AlertRow({ alert }: { alert: typeof ALERTS[0] }) {
  const colors: Record<string, string> = { critical: '#ef4444', high: '#f59e0b', medium: '#f97316', low: '#3b82f6' };
  const color = colors[alert.severity] || '#94a3b8';
  return (
    <div className={`alert-card ${alert.severity}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 4 }}>
            {alert.severity.toUpperCase()} — {alert.title}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{alert.message}</div>
          <div style={{ fontSize: 11, color: '#60a5fa', fontStyle: 'italic' }}>
            💡 {alert.recommendation}
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap', marginTop: 2 }}>
          {new Date(alert.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {!alert.acknowledged && (
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 10, background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>
            ● UNACKNOWLEDGED
          </span>
        </div>
      )}
    </div>
  );
}

// ── Road Status ─────────────────────────────────────────────────
function RoadStatus({ road }: { road: typeof ROADS[0] }) {
  const statusColors: Record<string, string> = { accessible: '#10b981', restricted: '#f59e0b', high_risk: '#f97316', blocked: '#ef4444' };
  const color = statusColors[road.status] || '#94a3b8';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(31,45,74,0.4)' }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{road.name}</div>
        <div style={{ fontSize: 10, color: '#64748b' }}>{road.weather} · {road.incidents} incident{road.incidents !== 1 ? 's' : ''}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color }}>{road.score}</div>
        <div style={{ fontSize: 9, color: '#64748b' }}>SCORE</div>
      </div>
    </div>
  );
}

// ── Main Dashboard ──────────────────────────────────────────────
export default function DashboardPage() {
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const updateTime = () => setLiveTime(new Date().toLocaleTimeString('en-IN'));
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  const criticalAlerts = ALERTS.filter(a => !a.acknowledged);
  const criticalShipments = SHIPMENTS.filter(s => s.priority === 'critical');
  const movingVehicles = VEHICLES.filter(v => v.status === 'moving').length;
  const atRiskVehicles = VEHICLES.filter(v => v.status === 'at_risk' || v.status === 'delayed').length;

  return (
    <AppLayout title="NER Control Tower" subtitle={`Live · ${liveTime}`}>
      {/* KPI Grid */}
      <div className="grid-kpi" style={{ marginBottom: 20 }}>
        <KpiCard icon={Truck}        label="Active Vehicles"     value={movingVehicles}           sub={`${atRiskVehicles} at risk`}            variant="info"    trend="stable" />
        <KpiCard icon={Package}      label="Active Shipments"    value={KPI.activeShipments}       sub={`${criticalShipments.length} critical`} variant="info"    trend="up"     />
        <KpiCard icon={AlertTriangle}label="Critical Incidents"  value={KPI.criticalIncidents}     sub="Requiring immediate action"             variant="danger"  trend="down"   />
        <KpiCard icon={XCircle}      label="Blocked Roads"       value={KPI.blockedRoads}          sub="Full road closures"                     variant="danger"  trend="stable" />
        <KpiCard icon={Clock}        label="Delayed Deliveries"  value={KPI.delayedDeliveries}     sub="ETA breach risk"                        variant="warning" trend="down"   />
        <KpiCard icon={Navigation}   label="At-Risk Routes"      value={KPI.atRiskRoutes}          sub="Score below 60/100"                     variant="warning" trend="stable" />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, marginBottom: 16 }}>
        {/* Map */}
        <div className="card" style={{ height: 480 }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Navigation size={16} color="#60a5fa" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>Live NER Intelligence Map</span>
            </div>
            <div className="live-indicator">
              <span className="live-dot" /> LIVE
            </div>
          </div>
          <div style={{ height: 'calc(100% - 61px)' }}>
            <NERMap />
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* AI Recommendations */}
          <div className="card">
            <div className="card-header" style={{ padding: '14px 18px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bot size={15} color="#06b6d4" />
                <span style={{ fontSize: 13, fontWeight: 700 }}>AI Recommendation</span>
              </div>
            </div>
            <div style={{ padding: '12px 18px' }}>
              <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#06b6d4', marginBottom: 6 }}>CRITICAL — NH-27 LANDSLIDE</div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                  Route NH-27 has active landslide at km 847. <strong style={{ color: '#f1f5f9' }}>5 vehicles</strong> currently on this route.
                  Recommended alternate via <strong style={{ color: '#34d399' }}>Alt Corridor B</strong> adds 35km but reduces delay by 42 minutes.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-success btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Accept</button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Review</button>
              </div>
            </div>
          </div>

          {/* Road Status Quick View */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header" style={{ padding: '14px 18px 12px' }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Route Accessibility</span>
              <span style={{ fontSize: 11, color: '#64748b' }}>Live scores</span>
            </div>
            <div style={{ padding: '4px 18px 14px' }}>
              {ROADS.slice(0, 8).map(r => <RoadStatus key={r.id} road={r} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Activity Feed */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={15} color="#60a5fa" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Live Activity Feed</span>
            </div>
            <div className="live-indicator"><span className="live-dot" /> LIVE</div>
          </div>
          <div style={{ padding: '4px 20px', maxHeight: 320, overflowY: 'auto' }}>
            {ACTIVITY_FEED.map(a => <ActivityItem key={a.id} item={a} />)}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontSize: 13, fontWeight: 700 }}>Active Alerts</span>
            <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>{criticalAlerts.length} UNREAD</span>
          </div>
          <div style={{ padding: '12px 16px', maxHeight: 320, overflowY: 'auto' }}>
            {ALERTS.map(a => <AlertRow key={a.id} alert={a} />)}
          </div>
        </div>

        {/* Delivery Trends Chart */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontSize: 13, fontWeight: 700 }}>Delivery Trends</span>
            <span style={{ fontSize: 11, color: '#64748b' }}>Apr – Sep 2024</span>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY_ANALYTICS} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gOnTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gDelayed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1f2d4a', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="onTime"  name="On Time"  stroke="#10b981" fill="url(#gOnTime)"  strokeWidth={2} />
                <Area type="monotone" dataKey="delayed" name="Delayed"  stroke="#ef4444" fill="url(#gDelayed)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>

            {/* Summary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              {[
                { label: 'Fleet Utilization',  value: `${KPI.fleetUtilizationPct}%`,  color: '#60a5fa' },
                { label: 'On-time Delivery',   value: `${KPI.onTimeDeliveryPct}%`,    color: '#34d399' },
                { label: 'Avg Accessibility',  value: `${KPI.avgAccessibilityScore}/100`, color: '#fbbf24' },
                { label: 'Pending Sync',       value: `${KPI.pendingFieldReports}`,   color: '#f97316' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
