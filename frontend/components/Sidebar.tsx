'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Map, Truck, Package, Navigation, AlertTriangle,
  Bell, BarChart3, Bot, FlaskConical, MapPin, Users,
  Settings, Shield, ChevronRight, Activity, Zap
} from 'lucide-react';
import { SYSTEM_HEALTH } from '@/lib/demoData';

const NAV_ITEMS = [
  { href: '/dashboard',    icon: Home,          label: 'Control Tower',      badge: null     },
  { href: '/accessibility',icon: Map,           label: 'Accessibility',      badge: null     },
  { href: '/fleet',        icon: Truck,         label: 'Fleet Tracking',     badge: null     },
  { href: '/shipments',    icon: Package,       label: 'Shipments',          badge: null     },
  { href: '/routes',       icon: Navigation,    label: 'Route Intelligence', badge: null     },
  { href: '/incidents',    icon: AlertTriangle, label: 'Incidents',          badge: 7        },
  { href: '/alerts',       icon: Bell,          label: 'Alerts',             badge: 4        },
  { href: '/analytics',    icon: BarChart3,     label: 'Analytics',          badge: null     },
  { href: '/copilot',      icon: Bot,           label: 'AI Copilot',         badge: null     },
  { href: '/simulator',    icon: FlaskConical,  label: 'What-If Simulator',  badge: null     },
  { href: '/districts',    icon: MapPin,        label: 'District Intelligence', badge: null  },
  { href: '/field',        icon: Users,         label: 'Field Operations',   badge: 3        },
  { href: '/admin',        icon: Settings,      label: 'Administration',     badge: null     },
];

const STATUS_DOT: Record<string, string> = {
  online:    '#10b981',
  healthy:   '#10b981',
  connected: '#10b981',
  offline:   '#ef4444',
  pending:   '#f59e0b',
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #1a56db, #06b6d4)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(26,86,219,0.4)',
            flexShrink: 0,
          }}>
            <Shield size={20} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
              NER-SHIELD AI
            </div>
            <div style={{ fontSize: 10, color: '#64748b', lineHeight: 1.3 }}>
              Northeast Logistics Intelligence
            </div>
          </div>
        </div>
        {/* Demo banner */}
        <div style={{
          marginTop: 10,
          background: 'rgba(6,182,212,0.1)',
          border: '1px solid rgba(6,182,212,0.25)',
          borderRadius: 6,
          padding: '4px 8px',
          fontSize: 10,
          color: '#06b6d4',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          <Zap size={10} />
          SIH DEMO — Simulated Data
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Operations</div>
        {NAV_ITEMS.slice(0, 5).map(item => (
          <NavLink key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}

        <div className="nav-section-label" style={{ marginTop: 8 }}>Intelligence</div>
        {NAV_ITEMS.slice(5, 11).map(item => (
          <NavLink key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}

        <div className="nav-section-label" style={{ marginTop: 8 }}>Management</div>
        {NAV_ITEMS.slice(11).map(item => (
          <NavLink key={item.href} item={item} active={pathname.startsWith(item.href)} />
        ))}
      </nav>

      {/* System Health */}
      <div className="sidebar-footer">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>
          System Health
        </div>
        {Object.entries(SYSTEM_HEALTH).map(([key, val]) => (
          <div key={key} className="health-item">
            <span style={{ color: '#94a3b8' }}>{val.label}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_DOT[val.status] || '#64748b', display: 'inline-block' }} />
              <span style={{ color: STATUS_DOT[val.status] || '#64748b', fontSize: 11 }}>
                {'pendingCount' in val && val.pendingCount ? `${val.pendingCount} Pending` : val.status}
              </span>
            </span>
          </div>
        ))}

        {/* MDoNER attribution */}
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #1f2d4a', fontSize: 10, color: '#475569', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>BYTE BUILDERS</div>
          <div>SIH26002 | MDoNER</div>
          <div style={{ marginTop: 4, color: '#334155' }}>Team: Smart Automation</div>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ item, active }: { item: typeof NAV_ITEMS[0]; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>
      {item.badge ? (
        <span className="nav-badge">{item.badge}</span>
      ) : active ? (
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
      ) : null}
    </Link>
  );
}
