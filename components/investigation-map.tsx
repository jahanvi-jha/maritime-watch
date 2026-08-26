"use client"

import { useEffect } from 'react'
import { Circle, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { OilSpillIncident } from '@/services/mockData'

function FollowIncident({ incident }: { incident: OilSpillIncident }) { const map = useMap(); useEffect(() => { map.flyTo(incident.coordinates, 8, { duration: .8 }) }, [map, incident.id]); return null }
const incidentIcon = L.divIcon({ className: 'origin-marker', html: '<span>!</span>', iconSize: [24, 24], iconAnchor: [12, 12] })
export default function InvestigationMap({ incident }: { incident: OilSpillIncident }) { return <MapContainer center={incident.coordinates} zoom={8} scrollWheelZoom className="h-[430px] w-full"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" subdomains={["a", "b", "c"]} maxZoom={19} /><FollowIncident incident={incident} /><Circle center={incident.coordinates} radius={Math.max(12000, incident.areaKm2 * 1800)} pathOptions={{ color: '#0284c7', fillColor: '#dc2626', fillOpacity: .45, weight: 3 }} /><Circle center={incident.coordinates} radius={Math.max(19000, incident.areaKm2 * 2500)} pathOptions={{ color: '#38bdf8', fill: false, weight: 2, dashArray: '8 7' }} /><Marker position={incident.coordinates} icon={incidentIcon}><Tooltip permanent direction="top">{incident.id} · {incident.location}</Tooltip></Marker><Polyline positions={incident.route} pathOptions={{ color: '#0284c7', weight: 2, dashArray: '5 6' }} /></MapContainer> }
