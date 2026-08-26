"use client"
import { useMemo, useState } from 'react'
import { incidents, vessels, transectData, getIncident } from '@/services/mockData'
export function useSpillIncidents(){ const [query,setQuery]=useState(''); const [severity,setSeverity]=useState('ALL'); const filtered=useMemo(()=>incidents.filter(i=>(severity==='ALL'||i.severity===severity)&&`${i.title} ${i.location} ${i.id}`.toLowerCase().includes(query.toLowerCase())),[query,severity]); return {incidents:filtered,allIncidents:incidents,query,setQuery,severity,setSeverity} }
export function useVesselStream(){ return {vessels,connected:true,updatedAt:'08:44:02 UTC'} }
export function useIncidentAnalytics(id:string){ return {incident:getIncident(id),transectData} }
