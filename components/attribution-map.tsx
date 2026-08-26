"use client"

import { useEffect } from 'react'
import { Circle, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { OilSpillIncident } from '@/services/mockData'

function FollowRoute({ incident }: { incident: OilSpillIncident }) { const map = useMap(); useEffect(() => { map.flyTo(incident.coordinates, 8, { duration: .8 }) }, [map, incident.id]); return null }
function waypointIcon(step: number) { return L.divIcon({ className: 'waypoint-marker', html: `<span>${step}</span>`, iconSize: [24, 24], iconAnchor: [12, 12] }) }
export default function AttributionMap({ incident }: { incident: OilSpillIncident }) { return <MapContainer center={incident.coordinates} zoom={8} scrollWheelZoom className="h-[430px] w-full"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" subdomains={["a", "b", "c"]} maxZoom={19} /><FollowRoute incident={incident} /><Polyline positions={incident.route} pathOptions={{ color: '#16a34a', weight: 4 }} />{incident.waypoints.map(point => <Marker key={point.step} position={point.position} icon={waypointIcon(point.step)}><Tooltip>{point.timestamp} · {point.speed}</Tooltip></Marker>)}<Polyline positions={incident.estimatedVector} pathOptions={{ color: '#d97706', weight: 3, dashArray: '9 8' }} /><Circle center={incident.coordinates} radius={Math.max(8000, incident.areaKm2 * 1300)} pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: .3, weight: 2 }}><Tooltip permanent>COMPUTED SPILL ORIGIN</Tooltip></Circle></MapContainer> }
