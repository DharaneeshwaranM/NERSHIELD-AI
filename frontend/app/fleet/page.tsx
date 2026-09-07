'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { VEHICLES } from '@/lib/demoData';
import { Truck, Gauge, Battery, MapPin, Navigation, User, Package, ChevronRight, Filter } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  moving: '#10b981', idle: '#94a3b8', delayed: '#f59e0b',
  at_risk: '#f97316', arrived: '#6366f1', offline: '#64748b',
};

function VehicleCard({ v, onSelect }: { v: typeof VEHICLES[0]; onSelect: () => void }) {
  const color = STATUS_COLORS[v.status] || '#94a3b8';
  const fuelColor = v.fuel > 50 ? '#10b981' : v.fuel > 25 ? '#f59e0b' : '#ef4444';
  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={onSelect}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={16} color={color} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>{v.reg}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>{v.type} · {v.capacity}T</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ background: `${color}18`, color, border: `1px solid ${color}40`, padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
            ● {v.status.replace('_', ' ').toUpperCase()}
          </span>
          <ChevronRight size={14} color="#64748b" />
        </div>
      </div>
      <div style={{ padding: '12px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <div style={{ background: '#0d1526', borderRadius: 7, padding: '8px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <User size={11} color="#64748b" />
              <span style={{ fontSize: 10, color: '#64748b' }}>Driver</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.driver}</div>
          </div>
          <div style={{ background: '#0d1526', borderRadius: 7, padding: '8px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <Navigation size={11} color="#64748b" />
              <span style={{ fontSize: 10, color: '#64748b' }}>Route</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{v.route}</div>
          </div>
          <div style={{ background: '#0d1526', borderRadius: 7, padding: '8px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <Gauge size={11} color="#64748b" />
              <span style={{ fontSize: 10, color: '#64748b' }}>Speed</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{v.speed} km/h</div>
          </div>
          <div style={{ background: '#0d1526', borderRadius: 7, padding: '8px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <Battery size={11} color={fuelColor} />
              <span style={{ fontSize: 10, color: '#64748b' }}>Fuel</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: fuelColor }}>{v.fuel}%</div>
          </div>
        </div>
        {/* Fuel bar */}
        <div className="progress-bar" style={{ marginBottom: 8 }}>
          <div className="progress-fill" style={{ width: `${v.fuel}%`, background: `linear-gradient(90deg, ${fuelColor}, ${fuelColor}99)` }} />
        </div>
        {v.eta && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
            <span>ETA: <strong style={{ color: '#f1f5f9' }}>{v.eta}</strong></span>
            {v.shipment && <span style={{ color: '#60a5fa' }}>{v.shipment}</span>}
          </div>
        )}
        {v.riskLevel === 'critical' && (
          <div style={{ marginTop: 8, padding: '5px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, fontSize: 11, color: '#f87171' }}>
            🔴 Critical risk — Immediate attention required
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleDetailPanel({ v, onClose }: { v: typeof VEHICLES[0]; onClose: () => void }) {
  const color = STATUS_COLORS[v.status];
  return (
    <div className="card" style={{ position: 'sticky', top: 20 }}>
      <div className="card-header">
        <span style={{ fontSize: 14, fontWeight: 700 }}>Vehicle Details</span>
        <button onClick={onClose} className="btn btn-ghost btn-sm">✕ Close</button>
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '14px 16px', background: `${color}10`, borderRadius: 10, border: `1px solid ${color}30` }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={26} color={color} />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>{v.reg}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>{v.type}</div>
            <span style={{ background: `${color}18`, color, padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
              ● {v.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {[
          { label: 'Driver Name',      value: v.driver },
          { label: 'Current District', value: v.district },
          { label: 'Active Route',     value: v.route },
          { label: 'Current Speed',    value: `${v.speed} km/h` },
          { label: 'Fuel Level',       value: `${v.fuel}%` },
          { label: 'Load Capacity',    value: `${v.capacity} tonnes` },
          { label: 'Active Shipment',  value: v.shipment || 'None' },
          { label: 'ETA',              value: v.eta || 'N/A' },
          { label: 'Risk Level',       value: v.riskLevel.toUpperCase() },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(31,45,74,0.5)', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>{row.label}</span>
            <span style={{ color: '#f1f5f9', fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}

        <div style={{ marginTop: 14, padding: '10px 12px', background: '#0d1526', borderRadius: 8, fontSize: 11, color: '#64748b' }}>
          <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>GPS Coordinates</div>
          <div>Lat: {v.lat.toFixed(4)}° N · Lon: {v.lon.toFixed(4)}° E</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <button className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>View on Map</button>
          <button className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>Contact Driver</button>
          <button className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>Reroute Vehicle</button>
          <button className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>Track History</button>
        </div>
      </div>
    </div>
  );
}

export default function FleetPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const selectedVehicle = VEHICLES.find(v => v.id === selected);
  const filtered = VEHICLES.filter(v => statusFilter === 'all' || v.status === statusFilter);

  const stats = {
    moving:  VEHICLES.filter(v => v.status === 'moving').length,
    delayed: VEHICLES.filter(v => v.status === 'delayed').length,
    at_risk: VEHICLES.filter(v => v.status === 'at_risk').length,
    idle:    VEHICLES.filter(v => v.status === 'idle').length,
    offline: VEHICLES.filter(v => v.status === 'offline').length,
  };

  return (
    <AppLayout title="Fleet Tracking" subtitle="Live vehicle monitoring across NE Region">
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {Object.entries(stats).map(([status, count]) => (
          <div key={status} style={{
            background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 10,
            padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: STATUS_COLORS[status] }} />
            <span style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9' }}>{count}</span>
            <span style={{ fontSize: 12, color: '#94a3b8', textTransform: 'capitalize' }}>{status.replace('_', ' ')}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Filter size={14} color="#64748b" />
          <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Vehicles</option>
            <option value="moving">Moving</option>
            <option value="delayed">Delayed</option>
            <option value="at_risk">At Risk</option>
            <option value="idle">Idle</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedVehicle ? '1fr 360px' : '1fr', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, alignContent: 'start' }}>
          {filtered.map(v => (
            <VehicleCard key={v.id} v={v} onSelect={() => setSelected(selected === v.id ? null : v.id)} />
          ))}
        </div>
        {selectedVehicle && <VehicleDetailPanel v={selectedVehicle} onClose={() => setSelected(null)} />}
      </div>
    </AppLayout>
  );
}
