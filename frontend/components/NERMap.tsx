'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VEHICLES, INCIDENTS, DISTRICTS, ROADS } from '@/lib/demoData';

// Fix Leaflet default icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Create colored div icons for vehicles
function createVehicleIcon(status: string) {
  const colors: Record<string, string> = {
    moving:   '#10b981', idle:     '#94a3b8', delayed: '#f59e0b',
    at_risk:  '#f97316', arrived:  '#6366f1', offline: '#64748b',
  };
  const color = colors[status] || '#94a3b8';
  return L.divIcon({
    html: `<div style="width:20px;height:20px;background:${color};border:3px solid rgba(255,255,255,0.9);border-radius:50%;box-shadow:0 0 10px ${color}88;position:relative;">
      <div style="position:absolute;inset:0;border-radius:50%;background:${color};animation:ping 1.5s ease infinite;opacity:0.5"></div>
    </div>`,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function createIncidentIcon(severity: string) {
  const colors: Record<string, string> = { critical: '#ef4444', high: '#f97316', medium: '#f59e0b', low: '#3b82f6' };
  const color = colors[severity] || '#94a3b8';
  return L.divIcon({
    html: `<div style="width:24px;height:24px;background:${color}22;border:2px solid ${color};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:13px;">⚠</div>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

// NE India bounds
const NE_CENTER: [number, number] = [26.0, 93.0];
const NE_BOUNDS: [[number, number], [number, number]] = [[20.0, 87.0], [30.0, 97.5]];

// Simulated route polylines
const ROUTE_LINES = [
  { id: 'NH-27',  color: '#f59e0b', points: [[26.1445,91.7362],[26.3464,92.6844],[26.0930,93.5497],[25.8000,93.8000],[25.6701,94.1077]] as [number,number][] },
  { id: 'NH-8',   color: '#10b981', points: [[25.5788,91.8933],[25.4343,92.1816],[23.9408,91.9882]] as [number,number][] },
  { id: 'NH-54',  color: '#10b981', points: [[24.8333,92.7789],[23.7271,92.7176],[22.8882,92.7327]] as [number,number][] },
  { id: 'SH-12',  color: '#f97316', points: [[27.3314,88.6138],[27.5000,88.5000],[27.9000,88.4333]] as [number,number][] },
  { id: 'MDR-1',  color: '#ef4444', points: [[27.0844,93.6053],[27.2000,93.2000],[27.5859,91.8594]] as [number,number][] },
  { id: 'ALT-1',  color: '#06b6d4', points: [[26.1445,91.7362],[26.6000,92.8000],[26.7509,94.2037]] as [number,number][], dashed: true },
];

export default function NERMap() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  return (
    <MapContainer
      center={NE_CENTER}
      zoom={7}
      maxBounds={NE_BOUNDS}
      style={{ height: '100%', width: '100%', background: '#0d1b2e' }}
      zoomControl={true}
    >
      <LayersControl position="topright">
        {/* Base map */}
        <LayersControl.BaseLayer checked name="Dark Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a>'
          />
        </LayersControl.BaseLayer>

        {/* Route Network Layer */}
        <LayersControl.Overlay checked name="Road Network">
          <>
            {ROUTE_LINES.map(route => (
              <Polyline
                key={route.id}
                positions={route.points}
                color={route.color}
                weight={3}
                opacity={0.85}
                dashArray={route.dashed ? '8, 6' : undefined}
              >
                <Popup>
                  <div style={{ background: '#111827', color: '#f1f5f9', padding: 8, borderRadius: 6, minWidth: 160 }}>
                    <strong style={{ color: '#60a5fa' }}>{route.id}</strong>
                    <br />
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>
                      {route.dashed ? '⚡ Alternative Route' : '🛣 Active Corridor'}
                    </span>
                  </div>
                </Popup>
              </Polyline>
            ))}
          </>
        </LayersControl.Overlay>

        {/* Vehicles Layer */}
        <LayersControl.Overlay checked name="Fleet Vehicles">
          <>
            {VEHICLES.map(v => (
              <Marker
                key={v.id}
                position={[v.lat, v.lon]}
                icon={createVehicleIcon(v.status)}
                eventHandlers={{ click: () => setSelectedVehicle(v.id) }}
              >
                <Popup>
                  <div style={{ background: '#111827', color: '#f1f5f9', padding: 10, borderRadius: 8, minWidth: 200 }}>
                    <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>{v.reg}</div>
                    <div style={{ fontSize: 12, marginBottom: 2 }}>Driver: {v.driver}</div>
                    <div style={{ fontSize: 12, marginBottom: 2 }}>Speed: {v.speed} km/h</div>
                    <div style={{ fontSize: 12, marginBottom: 2 }}>Fuel: {v.fuel}%</div>
                    <div style={{ fontSize: 12, marginBottom: 2 }}>Route: {v.route}</div>
                    {v.eta && <div style={{ fontSize: 12 }}>ETA: {v.eta}</div>}
                    <div style={{ marginTop: 6, padding: '3px 8px', borderRadius: 99, display: 'inline-block', fontSize: 10, fontWeight: 700,
                      background: v.status === 'moving' ? 'rgba(16,185,129,0.2)' : v.status === 'at_risk' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: v.status === 'moving' ? '#34d399' : v.status === 'at_risk' ? '#fb923c' : '#fbbf24',
                    }}>
                      {v.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        </LayersControl.Overlay>

        {/* Incidents Layer */}
        <LayersControl.Overlay checked name="Incidents">
          <>
            {INCIDENTS.map(inc => (
              <Marker key={inc.id} position={[inc.lat, inc.lon]} icon={createIncidentIcon(inc.severity)}>
                <Popup>
                  <div style={{ background: '#111827', color: '#f1f5f9', padding: 10, borderRadius: 8, minWidth: 220 }}>
                    <div style={{ fontWeight: 700, color: '#f87171', marginBottom: 4 }}>
                      {inc.type.replace('_', ' ').toUpperCase()}
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{inc.description}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Road: {inc.road}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Severity: {inc.severity}</div>
                    <div style={{ fontSize: 11, color: inc.verified ? '#34d399' : '#fbbf24', marginTop: 4 }}>
                      {inc.verified ? '✓ Verified' : '⏳ Awaiting Verification'}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        </LayersControl.Overlay>

        {/* Districts Layer */}
        <LayersControl.Overlay checked name="Districts">
          <>
            {DISTRICTS.map(d => {
              const color = d.accessibility > 75 ? '#10b981' : d.accessibility > 55 ? '#f59e0b' : d.accessibility > 40 ? '#f97316' : '#ef4444';
              return (
                <CircleMarker
                  key={d.id}
                  center={[d.lat, d.lon]}
                  radius={d.remoteness === 'urban' ? 12 : d.remoteness === 'medium' ? 8 : 6}
                  color={color}
                  fillColor={color}
                  fillOpacity={0.2}
                  weight={2}
                >
                  <Popup>
                    <div style={{ background: '#111827', color: '#f1f5f9', padding: 10, borderRadius: 8, minWidth: 180 }}>
                      <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>{d.name}</div>
                      <div style={{ fontSize: 12 }}>State: {d.state}</div>
                      <div style={{ fontSize: 12 }}>Accessibility: <span style={{ color, fontWeight: 700 }}>{d.accessibility}/100</span></div>
                      <div style={{ fontSize: 12 }}>Active Vehicles: {d.vehicles}</div>
                      <div style={{ fontSize: 12 }}>Open Incidents: {d.incidents}</div>
                      <div style={{ fontSize: 12 }}>Critical Shipments: {d.criticalShipments}</div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </>
        </LayersControl.Overlay>

        {/* Risk Zones */}
        <LayersControl.Overlay name="Risk Zones">
          <>
            {INCIDENTS.filter(i => i.severity === 'critical' || i.severity === 'high').map(inc => (
              <CircleMarker
                key={`risk-${inc.id}`}
                center={[inc.lat, inc.lon]}
                radius={30}
                color="#ef4444"
                fillColor="#ef4444"
                fillOpacity={0.08}
                weight={1}
                dashArray="4,4"
              />
            ))}
          </>
        </LayersControl.Overlay>
      </LayersControl>

      {/* Map Legend */}
      <div style={{
        position: 'absolute', bottom: 30, left: 10, zIndex: 1000,
        background: 'rgba(17,24,39,0.92)', backdropFilter: 'blur(8px)',
        border: '1px solid #1f2d4a', borderRadius: 10, padding: '10px 14px',
        fontSize: 11, color: '#94a3b8',
      }}>
        <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 8, fontSize: 12 }}>NER Map Legend</div>
        {[
          { color: '#10b981', label: 'Accessible Route / Moving Vehicle' },
          { color: '#f59e0b', label: 'Restricted / Delayed' },
          { color: '#f97316', label: 'High Risk / At Risk' },
          { color: '#ef4444', label: 'Blocked / Critical Incident' },
          { color: '#06b6d4', label: 'Alternative Route (dashed)' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: l.color, flexShrink: 0 }} />
            <span>{l.label}</span>
          </div>
        ))}
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #1f2d4a', fontSize: 10, color: '#475569', fontStyle: 'italic' }}>
          ⚠ Demo data — Not official government records
        </div>
      </div>
    </MapContainer>
  );
}
