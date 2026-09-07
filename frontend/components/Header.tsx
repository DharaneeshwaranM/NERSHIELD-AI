'use client';
import { useState } from 'react';
import { Bell, Search, User, Play, ChevronDown, Wifi, WifiOff } from 'lucide-react';
import { ALERTS } from '@/lib/demoData';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onDemoMode?: () => void;
  demoActive?: boolean;
}

export default function Header({ title, subtitle, onDemoMode, demoActive }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const unreadAlerts = ALERTS.filter(a => !a.acknowledged).length;

  return (
    <header className="header">
      {/* Left: Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{title}</h1>
          {subtitle && (
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 400 }}>{subtitle}</span>
          )}
        </div>
        <div className="live-indicator">
          <span className="live-dot" />
          LIVE MONITORING ACTIVE
        </div>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 1, maxWidth: 380, margin: '0 24px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            className="form-input"
            style={{ paddingLeft: 36, fontSize: 13, height: 38 }}
            placeholder="Search vehicles, shipments, routes, districts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* State filter */}
        <select className="form-input" style={{ width: 'auto', height: 38, paddingRight: 32, fontSize: 13 }}>
          <option value="">All States</option>
          <option>Assam</option>
          <option>Arunachal Pradesh</option>
          <option>Manipur</option>
          <option>Meghalaya</option>
          <option>Mizoram</option>
          <option>Nagaland</option>
          <option>Sikkim</option>
          <option>Tripura</option>
        </select>

        {/* Demo Mode Button */}
        <button
          onClick={onDemoMode}
          className={`btn btn-sm ${demoActive ? 'btn-success' : 'btn-primary'}`}
          style={{ gap: 6 }}
        >
          <Play size={13} />
          {demoActive ? 'Demo Running...' : 'Demo Mode'}
        </button>

        {/* Alerts Bell */}
        <div style={{ position: 'relative' }}>
          <button className="btn btn-ghost btn-icon" style={{ position: 'relative' }}>
            <Bell size={18} />
            {unreadAlerts > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 16, height: 16,
                background: '#ef4444', color: 'white',
                borderRadius: '50%', fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {unreadAlerts}
              </span>
            )}
          </button>
        </div>

        {/* Connection status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#10b981' }}>
          <Wifi size={14} />
          <span>Connected</span>
        </div>

        {/* User */}
        <button className="btn btn-ghost" style={{ gap: 8, padding: '6px 12px' }}>
          <div style={{
            width: 30, height: 30,
            background: 'linear-gradient(135deg, #1a56db, #06b6d4)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'white',
          }}>
            CA
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>Control Room</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>Operator</div>
          </div>
          <ChevronDown size={14} style={{ color: '#64748b' }} />
        </button>
      </div>
    </header>
  );
}
