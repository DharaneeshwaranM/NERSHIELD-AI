'use client';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const [demoActive, setDemoActive] = useState(false);

  const handleDemoMode = () => {
    setDemoActive(true);
    setTimeout(() => setDemoActive(false), 30000);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} subtitle={subtitle} onDemoMode={handleDemoMode} demoActive={demoActive} />
        <div className="page-container">
          {demoActive && (
            <div className="demo-banner" style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: 700 }}>🎬 DEMO MODE ACTIVE</span>
              — Simulating full SIH scenario: vehicle movement → incident → rerouting → alert chain
              <span style={{ marginLeft: 'auto', opacity: 0.7 }}>Auto-stops in 30s</span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
