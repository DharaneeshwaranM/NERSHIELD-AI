'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { ROUTE_COMPARISON } from '@/lib/demoData';
import { Navigation, CheckCircle, XCircle, ArrowRight, Bot, Zap, MapPin, Clock, Shield, AlertTriangle } from 'lucide-react';

function RouteCard({ route, isSelected, onSelect }: { route: typeof ROUTE_COMPARISON.routes[0]; isSelected: boolean; onSelect: () => void }) {
  const riskColor = route.riskScore > 60 ? '#ef4444' : route.riskScore > 30 ? '#f59e0b' : '#10b981';
  const accColor  = route.accessibilityScore > 75 ? '#10b981' : route.accessibilityScore > 50 ? '#f59e0b' : '#ef4444';

  return (
    <div onClick={onSelect} style={{
      background: route.recommended ? 'rgba(16,185,129,0.06)' : 'var(--bg-card)',
      border: `2px solid ${route.recommended ? '#10b981' : isSelected ? '#1a56db' : 'var(--bg-border)'}`,
      borderRadius: 16, padding: 0, cursor: 'pointer', transition: 'all 0.2s', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{route.label}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {route.recommended ? (
              <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                ✓ AI RECOMMENDED
              </span>
            ) : (
              <span style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                ✕ NOT RECOMMENDED
              </span>
            )}
          </div>
        </div>
        {route.recommended ? <CheckCircle size={22} color="#10b981" /> : <XCircle size={22} color="#ef4444" />}
      </div>

      {/* Metrics Grid */}
      <div style={{ padding: '14px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'Distance',       value: `${route.distanceKm} km`,             icon: MapPin,  color: '#60a5fa' },
            { label: 'ETA',            value: `${route.etaHrs}h`,                   icon: Clock,   color: '#60a5fa' },
            { label: 'Risk Score',     value: `${route.riskScore}/100`,             icon: AlertTriangle, color: riskColor },
            { label: 'Accessibility',  value: `${route.accessibilityScore}%`,       icon: Shield,  color: accColor  },
          ].map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} style={{ background: '#0d1526', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <Icon size={11} color={m.color} />
                  <span style={{ fontSize: 10, color: '#64748b' }}>{m.label}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: m.color }}>{m.value}</div>
              </div>
            );
          })}
        </div>

        {/* Delay Probability */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 5 }}>
            <span>Delay Probability</span>
            <span style={{ fontWeight: 700, color: route.delayProbability > 0.5 ? '#ef4444' : '#10b981' }}>
              {Math.round(route.delayProbability * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{
              width: `${route.delayProbability * 100}%`,
              background: route.delayProbability > 0.5 ? 'linear-gradient(90deg,#ef4444,#dc2626)' : 'linear-gradient(90deg,#10b981,#059669)',
            }} />
          </div>
        </div>

        {/* Via route */}
        <div style={{ background: '#0d1526', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: '#64748b', marginBottom: 4 }}>Via</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            {route.via.map((point, i) => (
              <span key={point}>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{point}</span>
                {i < route.via.length - 1 && <ArrowRight size={9} color="#475569" style={{ margin: '0 2px' }} />}
              </span>
            ))}
          </div>
        </div>

        {/* Issues or AI reasoning */}
        {'issues' in route && route.issues && (
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '8px 12px' }}>
            {route.issues.map((issue: string) => (
              <div key={issue} style={{ fontSize: 11, color: '#f87171', marginBottom: 2 }}>⚠ {issue}</div>
            ))}
          </div>
        )}
        {'aiReasoning' in route && route.aiReasoning && (
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
              <Bot size={12} color="#34d399" />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#34d399' }}>AI REASONING</span>
            </div>
            <div style={{ fontSize: 11, color: '#86efac', lineHeight: 1.6 }}>{route.aiReasoning}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>('ROUTE-B');
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const runOptimization = () => {
    setOptimizing(true);
    setTimeout(() => { setOptimizing(false); setOptimized(true); }, 2000);
  };

  return (
    <AppLayout title="Route Intelligence" subtitle="AI-powered route optimization and comparison">
      {/* Hero Section */}
      <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, #0f1729, #0d1e3d)' }}>
        <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Bot size={18} color="#06b6d4" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: 1 }}>
                Active Optimization — Shipment SHP-MED-2041
              </span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 6 }}>
              AI Route Recommendation Active
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 600 }}>
              Critical medicine shipment to Tawang District Hospital requires urgent routing. 
              Current route (NH-27) has active landslide. AI has identified a safer alternative.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-success" onClick={runOptimization} disabled={optimizing}>
              {optimizing ? (
                <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Optimizing...</>
              ) : (
                <><Zap size={15} /> Run Optimization</>
              )}
            </button>
          </div>
        </div>
        {optimized && (
          <div style={{ margin: '0 28px 20px', padding: '12px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, fontSize: 13, color: '#34d399' }}>
            ✅ <strong>Optimization complete.</strong> Route B selected. VH-006 rerouting command sent. New ETA: 07:48 (42 minutes earlier than Route A).
          </div>
        )}
      </div>

      {/* Route Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {ROUTE_COMPARISON.routes.map(route => (
          <RouteCard
            key={route.id}
            route={route}
            isSelected={selectedRoute === route.id}
            onSelect={() => setSelectedRoute(route.id)}
          />
        ))}
      </div>

      {/* Multi-Vehicle Optimization */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Navigation size={16} color="#60a5fa" />
            <span style={{ fontSize: 14, fontWeight: 700 }}>Multi-Vehicle Logistics Optimization</span>
          </div>
          <span style={{ fontSize: 11, color: '#64748b' }}>Fleet-wide assignment optimization</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Before */}
            <div style={{ background: '#0d1526', borderRadius: 12, padding: '18px 20px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Before Optimization</div>
              {[
                { label: 'Fleet Utilization', value: '61%',  color: '#f59e0b' },
                { label: 'Unassigned Vehicles', value: '4',  color: '#94a3b8' },
                { label: 'Avg ETA Accuracy',  value: '72%',  color: '#94a3b8' },
                { label: 'At-Risk Shipments', value: '6',    color: '#ef4444' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(31,45,74,0.5)', fontSize: 13 }}>
                  <span style={{ color: '#64748b' }}>{r.label}</span>
                  <span style={{ color: r.color, fontWeight: 700 }}>{r.value}</span>
                </div>
              ))}
            </div>
            {/* After */}
            <div style={{ background: '#0d1526', borderRadius: 12, padding: '18px 20px', border: '1px solid rgba(16,185,129,0.3)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#34d399', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>After AI Optimization</div>
              {[
                { label: 'Fleet Utilization', value: '84%',  color: '#10b981' },
                { label: 'Unassigned Vehicles', value: '1',  color: '#10b981' },
                { label: 'Avg ETA Accuracy',  value: '89%',  color: '#10b981' },
                { label: 'At-Risk Shipments', value: '2',    color: '#10b981' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(31,45,74,0.5)', fontSize: 13 }}>
                  <span style={{ color: '#64748b' }}>{r.label}</span>
                  <span style={{ color: r.color, fontWeight: 700 }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, fontSize: 12, color: '#94a3b8' }}>
            <strong style={{ color: '#06b6d4' }}>AI Note:</strong> Optimization considers vehicle capacity, cargo priority, delivery deadlines, route accessibility scores, and real-time incidents. 
            Results are calculated from demo data — actual production performance depends on real GPS and traffic data.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
