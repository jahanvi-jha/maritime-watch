export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type IncidentStatus = 'INVESTIGATING' | 'VERIFIED' | 'MONITORING'

export type OilSpillIncident = {
  id: string; title: string; location: string; region: string; severity: Severity; status: IncidentStatus
  detectedAt: string; areaKm2: number; confidence: number; source: string; coordinates: [number, number]
  description: string; vessels: string[]; ingestion: { label: string; value: number; done: boolean }[]
  sar: { acquisition: string; polarization: string; orbit: string; scene: string }
}
export type AISVessel = { id: string; name: string; type: string; mmsi: string; flag: string; speed: number; course: number; distance: string; risk: Severity | 'CLEAR'; coordinates: [number, number] }
export type TransectPlotData = { distance: number; sar: number; yolo: number }

export const incidents: OilSpillIncident[] = [
  { id:'MS-260826-014', title:'Possible Oil Discharge', location:'Manila Bay, Philippines', region:'WESTERN PACIFIC', severity:'CRITICAL', status:'INVESTIGATING', detectedAt:'08:42:17 UTC', areaKm2:3.84, confidence:94, source:'Sentinel-1 SAR / YOLO v8', coordinates:[14.58,120.94], description:'Anomalous low-backscatter signature with elongated morphology detected adjacent to a high-traffic anchorage.', vessels:['MV Pacific Dawn','MT Silver Crest'], ingestion:[{label:'SAR scene received',value:100,done:true},{label:'Radiometric correction',value:100,done:true},{label:'YOLO segmentation',value:100,done:true},{label:'Human verification',value:62,done:false}], sar:{acquisition:'26 Aug 2026 · 08:38 UTC',polarization:'VV / VH',orbit:'Ascending 18742',scene:'S1A_IW_GRDH_1SDV'}, },
  { id:'MS-260826-011', title:'Surface Anomaly', location:'Strait of Malacca', region:'INDIAN OCEAN', severity:'HIGH', status:'VERIFIED', detectedAt:'07:18:03 UTC', areaKm2:1.26, confidence:88, source:'Sentinel-1 SAR / ResNet-50', coordinates:[2.41,101.72], description:'Compact surface anomaly detected within the northern shipping lane. Pattern consistent with light hydrocarbon sheen.', vessels:['MV Northern Star'], ingestion:[{label:'SAR scene received',value:100,done:true},{label:'Radiometric correction',value:100,done:true},{label:'YOLO segmentation',value:100,done:true},{label:'Human verification',value:100,done:true}], sar:{acquisition:'26 Aug 2026 · 07:15 UTC',polarization:'VV',orbit:'Descending 08211',scene:'S1B_IW_GRDH_1SDV'}, },
  { id:'MS-260826-008', title:'Possible Wake Signature', location:'Singapore Strait', region:'SOUTH CHINA SEA', severity:'MEDIUM', status:'MONITORING', detectedAt:'05:56:44 UTC', areaKm2:0.48, confidence:72, source:'Sentinel-1 SAR / YOLO v8', coordinates:[1.21,103.78], description:'Low-confidence wake-like signature tracked for change detection against recent AIS activity.', vessels:['MT Ocean Lantern'], ingestion:[{label:'SAR scene received',value:100,done:true},{label:'Radiometric correction',value:100,done:true},{label:'YOLO segmentation',value:86,done:false},{label:'Human verification',value:0,done:false}], sar:{acquisition:'26 Aug 2026 · 05:54 UTC',polarization:'VV / VH',orbit:'Ascending 18737',scene:'S1A_IW_GRDH_1SDV'}, },
]

export const vessels: AISVessel[] = [
 {id:'IMO 9724610',name:'MV Pacific Dawn',type:'Container Ship',mmsi:'636019842',flag:'Liberia',speed:12.4,course:142,distance:'1.8 km',risk:'CRITICAL',coordinates:[14.57,120.95]},
 {id:'IMO 9317804',name:'MT Silver Crest',type:'Oil/Chemical Tanker',mmsi:'477112300',flag:'Hong Kong',speed:8.7,course:318,distance:'4.2 km',risk:'HIGH',coordinates:[14.61,120.91]},
 {id:'IMO 9781122',name:'MV Northern Star',type:'Bulk Carrier',mmsi:'563104200',flag:'Singapore',speed:10.2,course:76,distance:'14.6 km',risk:'MEDIUM',coordinates:[2.39,101.76]},
]
export const transectData: TransectPlotData[] = Array.from({length:18},(_,i)=>({distance:i*0.4,sar: i>8&&i<14 ? -19-(i%3)*1.6 : -11-(i%4)*.8,yolo:i>8&&i<14 ? 0.84-(i%2)*.08 : 0.08+(i%3)*.03}))
export const getIncident = (id:string) => incidents.find((item)=>item.id===id) ?? incidents[0]
export const severityClass = (severity: Severity | 'CLEAR') => ({CRITICAL:'bg-red-50 text-red-700 border-red-200',HIGH:'bg-orange-50 text-orange-700 border-orange-200',MEDIUM:'bg-amber-50 text-amber-700 border-amber-200',LOW:'bg-slate-50 text-slate-600 border-slate-200',CLEAR:'bg-emerald-50 text-emerald-700 border-emerald-200'}[severity])

export type { IncidentStatus }
