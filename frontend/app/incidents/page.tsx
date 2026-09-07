'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { INCIDENTS } from '@/lib/demoData';
import { AlertTriangle, MapPin, Clock, User, CheckCircle, RefreshCw, Camera, Plus } from 'lucide-react';

const INCIDENT_TYPES: Record<string, string> = {
  landslide: '🏔', flooding: '🌊', bridge_damage: '🌉', road_damage: '🛣',
  heavy_traffic: '🚦', weather_obstruction: '🌨', vehicle_incident: '🚛', other: '❓',
};
const SEVERITY_COLORS: Record<string, { color: string; bg: string }> = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  high:     { color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  medium:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  low:      { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
};

function IncidentCard({ inc }: { inc: typeof INCIDENTS[0] }) {
  const cfg = SEVERITY_COLORS[inc.severity];
  const time = new Date(inc.timestamp).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="card" style={{ borderLeft: `3px solid ${cfg.color}` }}>
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{INCIDENT_TYPES[inc.type] || '❓'}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>
                {inc.type.replace(/_/g, ' ').toUpperCase()}
              </span>
              <span style={{ background: cfg.bg, color: cfg.color, padding: '1px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
                {inc.severity.toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#64748b' }}>
              {inc.road} · {inc.district} · {inc.state}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 'column', alignItems: 'flex-end', gap: 4 }}>
          {inc.verified ? (
            <span style={{ color: '#34d399', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle size={12} /> Verified
            </span>
          ) : (
            <span style={{ color: '#fbbf24', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <RefreshCw size={12} /> Pending Verification
            </span>
          )}
          <span style={{ fontSize: 10, color: '#475569' }}>{time}</span>
        </div>
      </div>
      <div style={{ padding: '4px 18px 14px', borderTop: '1px solid rgba(31,45,74,0.5)' }}>
        <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, marginBottom: 10 }}>{inc.description}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748b' }}>
            <MapPin size={11} /> {inc.lat.toFixed(3)}°N, {inc.lon.toFixed(3)}°E
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748b' }}>
            <User size={11} /> {inc.reportedBy}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              background: inc.status === 'active' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
              color: inc.status === 'active' ? '#f87171' : '#fbbf24',
              padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700,
            }}>
              ● {inc.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#60a5fa' }}>
          Accessibility impact: <span style={{ color: '#f87171', fontWeight: 700 }}>{inc.accessibilityImpact} points</span>
        </div>
      </div>
    </div>
  );
}

function FieldReportModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => { setUploading(false); setSubmitted(true); }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: 540, maxHeight: '90vh', overflowY: 'auto' }}>
        {submitted ? (
          <div style={{ padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>Report Submitted</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>AI validation in progress…</div>
            <div style={{ padding: '12px 16px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, fontSize: 12, color: '#94a3b8', marginBottom: 20, textAlign: 'left' }}>
              <div>1. ✅ Field Report received</div>
              <div>2. 🤖 AI Validation running…</div>
              <div>3. ⏳ Accessibility score update pending</div>
              <div>4. ⏳ Affected route identification pending</div>
              <div>5. ⏳ Alert generation pending</div>
            </div>
            <button onClick={onClose} className="btn btn-primary" style={{ justifyContent: 'center' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <span style={{ fontSize: 14, fontWeight: 700 }}>📋 Field Incident Report</span>
              <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Incident Type</label>
                  <select className="form-input" required>
                    <option>Road Blockage</option><option>Landslide</option><option>Flood</option>
                    <option>Bridge Issue</option><option>Road Damage</option><option>Heavy Traffic</option>
                    <option>Vehicle Incident</option><option>Weather Obstruction</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Severity</label>
                  <select className="form-input" required>
                    <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Affected Road / Route</label>
                <select className="form-input" required>
                  <option>NH-27</option><option>NH-8</option><option>NH-29</option>
                  <option>NH-37</option><option>NH-54</option><option>SH-12</option>
                  <option>MDR-1</option><option>MDR-2</option><option>MDR-3</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">GPS Location</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" placeholder="Latitude (e.g. 26.3464)" style={{ flex: 1 }} />
                  <input className="form-input" placeholder="Longitude (e.g. 93.5497)" style={{ flex: 1 }} />
                  <button type="button" className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                    <MapPin size={13} /> Auto
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Incident Description</label>
                <textarea className="form-input" required placeholder="Describe the road condition, obstruction type, estimated extent, and immediate impact on traffic..." />
              </div>
              <div className="form-group">
                <label className="form-label">Upload Photographs</label>
                <div style={{ border: '2px dashed var(--bg-border)', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', color: '#64748b', fontSize: 13 }}>
                  <Camera size={24} style={{ margin: '0 auto 8px', display: 'block', color: '#475569' }} />
                  <div>Click to upload or drag photos here</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG, WEBP · Max 10MB · AI will analyze for incident classification</div>
                </div>
              </div>
              <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#94a3b8', marginBottom: 14 }}>
                <strong style={{ color: '#06b6d4' }}>Offline Mode:</strong> If network is unavailable, this report will be saved locally and synchronized when connectivity returns.
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={uploading}>
                {uploading ? 'Submitting & Notifying Control Room…' : '📤 Submit Field Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function IncidentsPage() {
  const [showReport, setShowReport] = useState(false);
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = INCIDENTS.filter(i => severityFilter === 'all' || i.severity === severityFilter);

  return (
    <AppLayout title="Incident Management" subtitle="Field reports and road disruption tracking">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {['critical','high','medium','low'].map(s => {
            const cfg = SEVERITY_COLORS[s];
            const cnt = INCIDENTS.filter(i => i.severity === s).length;
            return (
              <div key={s} style={{ background: cfg.bg, border: `1px solid ${cfg.color}40`, borderRadius: 10, padding: '10px 16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setSeverityFilter(s)}>
                <div style={{ fontSize: 20, fontWeight: 800, color: cfg.color }}>{cnt}</div>
                <div style={{ fontSize: 11, color: cfg.color, textTransform: 'capitalize' }}>{s}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <select className="form-input" style={{ width: 'auto', height: 36, fontSize: 12 }} value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}>
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="btn btn-primary" onClick={() => setShowReport(true)}>
            <Plus size={14} /> Report Incident
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
        {filtered.map(i => <IncidentCard key={i.id} inc={i} />)}
      </div>

      {showReport && <FieldReportModal onClose={() => setShowReport(false)} />}
    </AppLayout>
  );
}
