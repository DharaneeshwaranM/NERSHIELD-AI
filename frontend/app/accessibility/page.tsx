'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { ROADS, INCIDENTS } from '@/lib/demoData';
import { Filter, Map, AlertTriangle, TrendingDown, TrendingUp, RefreshCw, Info } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  accessible: { label: 'Accessible', color: '#10b981', bg: 'rgba(16,185,129,0.1)',  dot: '#10b981' },
  restricted:  { label: 'Restricted', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', dot: '#f59e0b' },
  high_risk:   { label: 'High Risk',  color: '#f97316', bg: 'rgba(249,115,22,0.1)', dot: '#f97316' },
  blocked:     { label: 'Blocked',    color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   dot: '#ef4444' },
};

const WEATHER_ICONS: Record<string, string> = {
  clear: '☀️', light_rain: '🌦', moderate_rain: '🌧', heavy_rain: '⛈', snowfall_fog: '🌨', very_low: '🌫',
};

function ScoreRing({ score }: { score: number }) {
  const color = score > 75 ? '#10b981' : score > 55 ? '#f59e0b' : score > 35 ? '#f97316' : '#ef4444';
  const r = 24; const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="64" height="64" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="#1f2d4a" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ fontSize: 14, fontWeight: 800, color }}>{score}</div>
    </div>
  );
}

function RoadCard({ road }: { road: typeof ROADS[0] }) {
  const cfg = STATUS_CONFIG[road.status];
  const trend = road.trend;
  const TrendIcon = trend === 'improving' ? TrendingUp : trend === 'declining' || trend === 'critical' ? TrendingDown : RefreshCw;
  const trendColor = trend === 'improving' ? '#10b981' : trend === 'declining' || trend === 'critical' ? '#ef4444' : '#94a3b8';

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ background: cfg.bg, borderBottom: `3px solid ${cfg.color}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <ScoreRing score={road.score} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {road.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 99 }}>
              ● {cfg.label.toUpperCase()}
            </span>
            <span style={{ fontSize: 11, color: '#64748b' }}>{road.type}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: trendColor, fontSize: 11, fontWeight: 600 }}>
          <TrendIcon size={13} />
          <span>{trend}</span>
        </div>
      </div>
      <div style={{ padding: '12px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
          {[
            { label: 'Weather', value: `${WEATHER_ICONS[road.weather] || '🌤'} ${road.weather.replace('_', ' ')}` },
            { label: 'Traffic',  value: road.traffic.replace('_', ' ') },
            { label: 'Incidents', value: `${road.incidents} active` },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: '#0d1526', borderRadius: 6, padding: '6px 8px' }}>
              <div style={{ fontSize: 11, color: '#f1f5f9', fontWeight: 600 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0d1526', borderRadius: 6, overflow: 'hidden', height: 5 }}>
          <div style={{ height: '100%', width: `${road.score}%`, background: `linear-gradient(90deg, ${STATUS_CONFIG[road.status].color}, ${STATUS_CONFIG[road.score > 75 ? 'accessible' : road.score > 55 ? 'restricted' : 'high_risk'].color})`, borderRadius: 6, transition: 'width 0.5s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#475569', marginTop: 3 }}>
          <span>0</span><span>Accessibility Score</span><span>100</span>
        </div>
      </div>
    </div>
  );
}

export default function AccessibilityPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  const filtered = ROADS.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const counts = {
    accessible: ROADS.filter(r => r.status === 'accessible').length,
    restricted:  ROADS.filter(r => r.status === 'restricted').length,
    high_risk:   ROADS.filter(r => r.status === 'high_risk').length,
    blocked:     ROADS.filter(r => r.status === 'blocked').length,
  };

  return (
    <AppLayout title="Accessibility Intelligence" subtitle="Live road & corridor accessibility scoring">
      {/* Status Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {(Object.entries(STATUS_CONFIG) as [string, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([key, cfg]) => (
          <button key={key} onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)} style={{
            background: statusFilter === key ? cfg.bg : 'var(--bg-card)',
            border: `1px solid ${statusFilter === key ? cfg.color : 'var(--bg-border)'}`,
            borderRadius: 14, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: cfg.color, marginBottom: 4 }}>
              {counts[key as keyof typeof counts]}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: cfg.color }}>{cfg.label}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
              {key === 'accessible' ? 'Fully operational routes' :
               key === 'restricted' ? 'Partial access only' :
               key === 'high_risk'  ? 'Elevated disruption risk' :
               'Completely blocked'}
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center' }}>
        <Filter size={14} color="#64748b" />
        <span style={{ fontSize: 12, color: '#64748b', marginRight: 4 }}>Filter by:</span>
        <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="accessible">Accessible</option>
          <option value="restricted">Restricted</option>
          <option value="high_risk">High Risk</option>
          <option value="blocked">Blocked</option>
        </select>
        <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }} value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
          <option value="all">All States</option>
          <option>Assam</option><option>Arunachal Pradesh</option><option>Manipur</option>
          <option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option>
          <option>Sikkim</option><option>Tripura</option>
        </select>
        <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }}>
          <option value="all">All Road Types</option>
          <option>National Highway</option>
          <option>State Highway</option>
          <option>District Road</option>
          <option>Alternative Route</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#64748b' }}>
          Showing {filtered.length} of {ROADS.length} routes
        </span>
      </div>

      {/* Route Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 20 }}>
        {filtered.map(road => <RoadCard key={road.id} road={road} />)}
      </div>

      {/* Accessibility Scoring Methodology */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Info size={15} color="#60a5fa" />
            <span style={{ fontSize: 13, fontWeight: 700 }}>AI Accessibility Scoring Methodology</span>
          </div>
          <span style={{ fontSize: 11, color: '#64748b' }}>Transparent AI — How scores are calculated</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { factor: 'Road Condition',        weight: '25%', icon: '🛣' },
              { factor: 'Weather Impact',         weight: '20%', icon: '🌧' },
              { factor: 'Active Incidents',       weight: '20%', icon: '⚠' },
              { factor: 'Traffic Density',        weight: '15%', icon: '🚦' },
              { factor: 'Bridge Condition',       weight: '10%', icon: '🌉' },
              { factor: 'Historical Reliability', weight: '10%', icon: '📊' },
            ].map(f => (
              <div key={f.factor} style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '10px 14px', border: '1px solid var(--bg-border)' }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{f.factor}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#60a5fa' }}>{f.weight}</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>weight</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(6,182,212,0.06)', borderRadius: 8, border: '1px solid rgba(6,182,212,0.2)', fontSize: 12, color: '#94a3b8' }}>
            <strong style={{ color: '#06b6d4' }}>Note:</strong> Accessibility scores are AI-assisted estimates based on available field data, weather feeds, and historical patterns. 
            Scores are updated every 15 minutes in the production system. Always verify with field officers before critical decisions.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
