"use client"

import { useEffect, useState } from 'react'
import { Circle, MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { incidents, vessels } from '@/services/mockData'

function FollowIncident({ selectedId }: { selectedId: string }) {
  const map = useMap()
  useEffect(() => { const incident = incidents.find(item => item.id === selectedId) ?? incidents[0]; map.flyTo(incident.coordinates, 7, { duration: 1.1 }) }, [map, selectedId])
  return null
}

function ZoomLevel() {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())
  useEffect(() => {
    const updateZoom = () => setZoom(map.getZoom())
    map.on('zoomend', updateZoom)
    return () => { map.off('zoomend', updateZoom) }
  }, [map])
  return zoom
}

const vesselIcon = (course: number, active: boolean, zoom: number) => {
  const size = Math.round(Math.max(18, Math.min(42, 12 + zoom * 2.4)))
  return L.divIcon({ className: 'ais-vessel-icon', html: `<div style="transform:rotate(${course}deg);color:${active ? '#087f83' : '#436568'}"><svg width="${size}" height="${size}" viewBox="0 0 26 26" aria-hidden="true"><path d="M13 1 20 21 13 18 6 21Z" fill="currentColor" stroke="#ffffff" stroke-width="1.5"/><path d="M13 4v13" stroke="#ffffff" stroke-width="1"/></svg></div>`, iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

export default function LeafletMap({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const selected = incidents.find(item => item.id === selectedId) ?? incidents[0]
  return <MapContainer center={selected.coordinates} zoom={6} scrollWheelZoom zoomControl className="z-0 h-full min-h-[530px] w-full"><TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" /><FollowIncident selectedId={selectedId} /><ZoomAwareLayers selected={selected} selectedId={selectedId} onSelect={onSelect} /></MapContainer>
}

function ZoomAwareLayers({ selected, selectedId, onSelect }: { selected: typeof incidents[number]; selectedId: string; onSelect: (id: string) => void }) {
  const zoom = ZoomLevel()
  return <>{incidents.map(item => { const active = item.id === selectedId; const radius = Math.max(4200, Math.sqrt(item.areaKm2 / Math.PI) * 1800); return <span key={item.id}><Circle center={item.coordinates} radius={active ? radius * 1.25 : radius} pathOptions={{ color: active ? '#b91c1c' : '#dc2626', fillColor: active ? '#ef4444' : '#f87171', fillOpacity: active ? .3 : .2, weight: active ? 3 : 2, className: 'hazard-pulse' }} eventHandlers={{ click: () => onSelect(item.id) }}><Tooltip>{item.id} · {item.areaKm2} km²</Tooltip></Circle><Circle center={item.coordinates} radius={radius * (active ? 1.75 : 1.45)} pathOptions={{ color: active ? '#ef4444' : '#f87171', fill: false, weight: active ? 2 : 1, opacity: .65, className: 'hazard-pulse-ring' }} eventHandlers={{ click: () => onSelect(item.id) }} /></span> })}{vessels.map(vessel => { const active = selected.vessels.includes(vessel.name); return <Marker key={vessel.id} position={vessel.coordinates} icon={vesselIcon(vessel.course, active, zoom)} opacity={active ? 1 : .58}><Tooltip direction="top">{vessel.name} · {vessel.course}° · {vessel.speed} kn</Tooltip></Marker> })}</>
}
