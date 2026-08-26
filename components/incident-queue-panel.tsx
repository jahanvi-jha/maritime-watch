"use client";

import { useState } from "react";
import { Bell, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { incidents, severityClass } from "@/services/mockData";

const queueItems = incidents.slice(0, 3);

export default function IncidentQueuePanel() {
  const [selectedId, setSelectedId] = useState(queueItems[0]?.id ?? "");
  const selected = queueItems.find((item) => item.id === selectedId) ?? queueItems[0];

  if (!selected) return null;

  return (
    <Card className="rounded-sm border-slate-200 bg-white shadow-none">
      <CardHeader className="border-b border-slate-200 px-4 py-3">
        <CardTitle className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-800">
          <span className="flex items-center gap-2"><Bell className="size-4 text-red-600" /> Incident queue</span>
          <Badge className="rounded-sm bg-red-50 text-red-700">TOP 3</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-200">
          {queueItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 ${selected.id === item.id ? "border-l-2 border-red-600 bg-red-50/50" : "border-l-2 border-transparent"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-800">{item.title}</span>
                <Badge variant="outline" className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold ${severityClass(item.severity)}`}>{item.severity}</Badge>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-500"><MapPin className="size-3" />{item.location}</div>
              <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-500"><span>{item.detectedAt}</span><span>{item.confidence}% confidence</span></div>
            </button>
          ))}
        </div>
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Selected spill detail</div>
          <div className="mt-1 flex items-center justify-between gap-2"><div className="text-xs font-bold text-slate-900">{selected.id}</div><div className="font-mono text-[10px] text-slate-600">{selected.areaKm2} km²</div></div>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-600">{selected.description}</p>
          <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-slate-200 pt-2 font-mono text-[9px]"><div><dt className="text-slate-400">COORDINATES</dt><dd className="text-slate-700">{selected.coordinates[0].toFixed(4)}° N, {selected.coordinates[1].toFixed(4)}° E</dd></div><div><dt className="text-slate-400">SOURCE</dt><dd className="text-slate-700">{selected.source}</dd></div><div><dt className="text-slate-400">STATUS</dt><dd className="text-slate-700">{selected.status}</dd></div><div><dt className="text-slate-400">DETECTED</dt><dd className="text-slate-700">{selected.detectedAt}</dd></div></dl>
        </div>
      </CardContent>
    </Card>
  );
}
