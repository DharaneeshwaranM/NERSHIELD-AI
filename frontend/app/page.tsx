'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Zap, Map, Truck, BarChart3, Bot, ArrowRight, Eye, Lock, Mail, AlertTriangle } from 'lucide-react';

const DEMO_USERS = [
  { email: 'admin@nershield.gov.in',     role: 'Government Administrator', color: '#1a56db' },
  { email: 'control@nershield.gov.in',   role: 'Control Room Operator',    color: '#06b6d4' },
  { email: 'logistics@nershield.gov.in', role: 'Logistics Manager',        color: '#10b981' },
  { email: 'field@nershield.gov.in',     role: 'Field Officer',            color: '#f59e0b' },
];

const FEATURES = [
  { icon: Map,       label: 'Accessibility Intelligence', desc: 'Real-time road & bridge accessibility scoring across 8 NE states' },
  { icon: Truck,     label: 'Fleet & Shipment Tracking',  desc: 'Live GPS tracking for all vehicles and critical cargo' },
  { icon: Zap,       label: 'Dynamic Re-routing',         desc: 'AI detects disruptions and instantly calculates safer routes' },
  { icon: BarChart3, label: 'Predictive Analytics',       desc: 'ETA prediction, delay probability, and risk forecasting' },
  { icon: Bot,       label: 'AI Logistics Copilot',       desc: 'Natural language assistant for logistics decision support' },
  { icon: AlertTriangle, label: 'What-If Simulator',     desc: 'Simulate disruptions and analyze impact before they happen' },
];

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@nershield.gov.in');
  const [password, setPassword] = useState('NerShield@2024');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Demo: accept any of the preset emails with the correct password
    const validUser = DEMO_USERS.find(u => u.email === email);
    await new Promise(r => setTimeout(r, 800));
    if (validUser && password === 'NerShield@2024') {
      localStorage.setItem('ner_user', JSON.stringify({ email, role: validUser.role }));
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Use the demo accounts below.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex' }}>
      {/* Left Panel — Brand & Features */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg, #0a0e1a 0%, #0f1729 40%, #0d1e3d 100%)',
        padding: '48px 56px',
        borderRight: '1px solid var(--bg-border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: -100, left: -100,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: -100,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 56, position: 'relative' }}>
          <div style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, #1a56db, #06b6d4)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(26,86,219,0.4)',
          }}>
            <Shield size={28} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
              NER-SHIELD AI
            </div>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Northeast Region Smart Logistics Intelligence
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ position: 'relative', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(26,86,219,0.15)',
            border: '1px solid rgba(26,86,219,0.3)',
            borderRadius: 99, padding: '5px 14px',
            fontSize: 11, fontWeight: 700, color: '#60a5fa',
            letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 20,
          }}>
            <Zap size={11} />
            SIH26002 — Smart Automation | MDoNER
          </div>

          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, color: '#f1f5f9', marginBottom: 16 }}>
            See the Network.<br />
            <span style={{ background: 'linear-gradient(135deg, #1a56db, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Predict Disruptions.
            </span><br />
            Optimize Logistics.
          </h1>

          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7, maxWidth: 480 }}>
            An AI-powered logistics and accessibility intelligence platform designed to improve transportation 
            visibility, route resilience and essential-supply movement across India&apos;s North Eastern Region.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, position: 'relative' }}>
          {FEATURES.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.label} style={{
                background: 'rgba(15,23,41,0.8)',
                border: '1px solid var(--bg-border)',
                borderRadius: 12, padding: '14px 16px',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, background: 'rgba(26,86,219,0.15)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={14} color="#60a5fa" />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>{f.label}</span>
                </div>
                <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom badges */}
        <div style={{ display: 'flex', gap: 12, marginTop: 28, position: 'relative' }}>
          {['AI + GIS', 'GPS Tracking', 'Real-time Intelligence', 'Offline-First'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: 99, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#06b6d4',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Panel — Login */}
      <div style={{
        width: 480, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '48px 48px',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>
            Access Control Tower
          </h2>
          <p style={{ fontSize: 13, color: '#64748b' }}>
            Sign in to your NER-SHIELD AI account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email / Username</label>
            <div style={{ position: 'relative' }}>
              <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: 38 }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: 38, paddingRight: 38 }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <Eye size={14} />
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }} disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                Authenticating...
              </span>
            ) : (
              <>Enter Control Tower <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        {/* Demo Accounts */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#64748b', marginBottom: 12, textAlign: 'center' }}>
            Demo Accounts — Password: NerShield@2024
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DEMO_USERS.map(u => (
              <button key={u.email} onClick={() => setEmail(u.email)} style={{
                background: email === u.email ? 'rgba(26,86,219,0.1)' : 'var(--bg-input)',
                border: `1px solid ${email === u.email ? 'rgba(26,86,219,0.4)' : 'var(--bg-border)'}`,
                borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.15s',
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{u.role}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{u.email}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: u.color }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, padding: '14px 16px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
          <strong style={{ color: '#06b6d4' }}>⚠ Demo Mode:</strong> All data shown is simulated for the Smart India Hackathon (SIH26002) prototype. 
          This does not represent real government records or actual logistics data.
        </div>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 11, color: '#475569' }}>
          Team BYTE BUILDERS · SIH26002 · MDoNER · Smart Automation
        </div>
      </div>
    </div>
  );
}
