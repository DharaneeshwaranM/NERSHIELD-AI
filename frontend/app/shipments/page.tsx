'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { SHIPMENTS } from '@/lib/demoData';
import { Package, Clock, MapPin, Truck, AlertTriangle, Plus, Filter, TrendingUp } from 'lucide-react';

const PRIORITY_COLORS: Record<string, { color: string; bg: string }> = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  high:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  normal:   { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  low:      { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};
const STATUS_COLORS: Record<string, string> = {
  in_transit: '#60a5fa', pending: '#94a3b8', delayed: '#f59e0b', delivered: '#10b981',
};
const CARGO_ICONS: Record<string, string> = {
  Medicine: '💊', Food: '🌾', 'Construction Material': '🏗', 'Emergency Supplies': '🆘',
  'Agricultural Produce': '🌿', 'Essential Commodities': '⛽',
};

function ShipmentCard({ s }: { s: typeof SHIPMENTS[0] }) {
  const p = PRIORITY_COLORS[s.priority];
  const sc = STATUS_COLORS[s.status] || '#94a3b8';
  const delayPct = Math.round(s.delayProb * 100);
  return (
    <div className="card" style={{ borderLeft: `3px solid ${p.color}` }}>
      <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{CARGO_ICONS[s.type] || '📦'}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{s.id}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>{s.type} · {s.weightKg.toLocaleString()}kg</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{ background: p.bg, color: p.color, padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
            {s.priority.toUpperCase()}
          </span>
          <span style={{ color: sc, fontSize: 11, fontWeight: 600 }}>
            {s.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>
      <div style={{ padding: '10px 18px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <div style={{ flex: 1, background: '#0d1526', borderRadius: 7, padding: '7px 10px' }}>
            <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>📍 Origin</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.origin}</div>
          </div>
          <div style={{ flex: 1, background: '#0d1526', borderRadius: 7, padding: '7px 10px' }}>
            <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>🎯 Destination</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.destination}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
          <div style={{ background: '#0d1526', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa' }}>{s.vehicle}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>Vehicle</div>
          </div>
          <div style={{ background: '#0d1526', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9' }}>{s.eta || 'Pending'}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>ETA</div>
          </div>
          <div style={{ background: '#0d1526', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9' }}>{s.distanceKm}km</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>Distance</div>
          </div>
        </div>
        {/* Delay probability bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 4 }}>
            <span>Delay Probability</span>
            <span style={{ color: delayPct > 60 ? '#ef4444' : delayPct > 30 ? '#f59e0b' : '#10b981', fontWeight: 700 }}>{delayPct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{
              width: `${delayPct}%`,
              background: delayPct > 60 ? 'linear-gradient(90deg,#ef4444,#dc2626)' : delayPct > 30 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : 'linear-gradient(90deg,#10b981,#059669)',
            }} />
          </div>
        </div>
        {s.priority === 'critical' && (
          <div style={{ marginTop: 8, padding: '5px 10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, fontSize: 11, color: '#f87171', display: 'flex', alignItems: 'center', gap: 5 }}>
            <AlertTriangle size={11} />
            Critical shipment — Priority routing active
          </div>
        )}
      </div>
    </div>
  );
}

function CreateShipmentModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: 560, maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="card-header">
          <span style={{ fontSize: 15, fontWeight: 700 }}>Create New Shipment</span>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Cargo Type</label>
              <select className="form-input">
                <option>Medicine</option><option>Food</option>
                <option>Construction Material</option><option>Emergency Supplies</option>
                <option>Agricultural Produce</option><option>Essential Commodities</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-input">
                <option value="critical">🔴 Critical</option>
                <option value="high">🟡 High</option>
                <option value="normal">🔵 Normal</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Origin</label>
              <select className="form-input">
                <option>Guwahati Regional Hub</option>
                <option>Shillong Distribution Centre</option>
                <option>Dimapur Depot</option>
                <option>Agartala Cold Storage</option>
                <option>Aizawl Depot</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Destination District</label>
              <select className="form-input">
                <option>Tawang District Hospital</option>
                <option>Churachandpur Depot</option>
                <option>Mon District HQ</option>
                <option>North Sikkim PHC</option>
                <option>East Garo Hills</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input className="form-input" type="number" placeholder="e.g. 1200" />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Deadline</label>
              <input className="form-input" type="datetime-local" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Cargo Items Description</label>
            <textarea className="form-input" placeholder="e.g. Antibiotics 500 units, IV Fluids 200 bags, Surgical Kits 50 sets" />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              🤖 Let AI Assign Vehicle & Route
            </button>
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: '#64748b', textAlign: 'center' }}>
            AI will select optimal vehicle and route based on priority, capacity, accessibility, and delivery deadline.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShipmentsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = SHIPMENTS.filter(s => {
    if (priorityFilter !== 'all' && s.priority !== priorityFilter) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    return true;
  });

  const criticalCount = SHIPMENTS.filter(s => s.priority === 'critical').length;
  const delayedCount  = SHIPMENTS.filter(s => s.status === 'delayed').length;

  return (
    <AppLayout title="Shipment Management" subtitle="Track and manage all cargo movements">
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Total', value: SHIPMENTS.length, color: '#60a5fa' },
            { label: 'Critical', value: criticalCount, color: '#ef4444' },
            { label: 'In Transit', value: SHIPMENTS.filter(s => s.status === 'in_transit').length, color: '#10b981' },
            { label: 'Delayed', value: delayedCount, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', alignItems: 'center' }}>
          <Filter size={13} color="#64748b" />
          <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }} value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="in_transit">In Transit</option>
            <option value="pending">Pending</option>
            <option value="delayed">Delayed</option>
          </select>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={14} /> New Shipment
          </button>
        </div>
      </div>

      {/* Shipment Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(s => <ShipmentCard key={s.id} s={s} />)}
      </div>

      {showCreate && <CreateShipmentModal onClose={() => setShowCreate(false)} />}
    </AppLayout>
  );
}
