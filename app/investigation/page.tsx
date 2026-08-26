"use client";

import dynamic from "next/dynamic";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Crosshair,
  Database,
  Gauge,
  MapPin,
  Radar,
  Waves,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AuthorityHeader from "@/components/authority-header";
import IncidentQueuePanel from "@/components/incident-queue-panel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { investigationRecord } from "@/services/mockData";

const InvestigationMap = dynamic(
  () => import("@/components/investigation-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[430px] items-center justify-center bg-[#111827] text-xs text-slate-300">
        Loading tactical GIS layer...
      </div>
    ),
  },
);
const chartConfig: ChartConfig = {
  backscatter: { label: "Pixel backscatter", color: "#0284c7" },
  baseline: { label: "Open water baseline", color: "#94a3b8" },
};
const field = (label: string, value: string) => (
  <div className="border-b border-slate-700 py-2">
    <dt className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
      {label}
    </dt>
    <dd className="mt-1 font-mono text-xs text-slate-100">{value}</dd>
  </div>
);

export default function InvestigationPage() {
  const record = investigationRecord;
  return (
    <main className="authority-light min-h-screen bg-slate-50 text-slate-900">
      <AuthorityHeader active="investigation" />
      <div className="mx-auto max-w-[1600px] p-3 lg:p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-slate-700 pb-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-sky-400">
              <Radar className="size-3" /> Spill characterization / SAR analysis
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              MARITIME INCIDENT DOSSIER: {record.dossier}
            </h1>
          </div>
          <div className="flex gap-2 font-mono text-[10px] text-slate-400">
            <span className="border border-slate-700 px-2 py-1">
              CASE STATUS: ACTIVE
            </span>
            <span className="border border-slate-700 px-2 py-1">
              CLASSIFICATION: OPERATIONAL
            </span>
          </div>
        </div>
        <div className="grid gap-3 xl:grid-cols-[280px_minmax(0,1fr)_330px]">
          <div className="space-y-3">
          <IncidentQueuePanel />
          <Card className="rounded-sm border-slate-700 bg-[#1e293b] text-slate-100 shadow-none">
            <CardHeader className="border-b border-slate-700 px-4 py-3">
              <CardTitle className="text-xs uppercase tracking-wider">
                Spill characterization
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <dl>
                {field("Target coordinates", "13.2451° N, 80.3412° E")}
                {field("Timestamp of detection", record.timestamp)}
                {field(
                  "Confidence rating",
                  `${record.confidence}% · ${record.model}`,
                )}
                {field("Estimated age", record.estimatedAge)}
                {field("Total area", record.totalArea)}
                {field("Estimated perimeter", record.perimeter)}
                {field("Slick length", record.slickLength)}
                {field("Maximum width", record.maxWidth)}
              </dl>
              <div className="mt-5 border-t border-slate-700 pt-3">
                <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Geometry assessment
                </div>
                <div className="flex items-center gap-2 text-xs text-red-400">
                  <Crosshair className="size-4" /> High-confidence hydrocarbon
                  signature
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
          <Card className="overflow-hidden rounded-sm border-slate-700 bg-[#1e293b] shadow-none">
            <CardHeader className="border-b border-slate-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-wider">
                  Tactical GIS / slick contours
                </CardTitle>
                <span className="font-mono text-[10px] text-slate-400">
                  EPSG:4326 · LIVE VIEW
                </span>
              </div>
            </CardHeader>
            <div className="p-0">
              <InvestigationMap />
            </div>
            <div className="flex items-center gap-4 border-t border-slate-700 px-4 py-2 text-[9px] uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <i className="size-2 rounded-full bg-red-600" /> Slick core
              </span>
              <span className="flex items-center gap-1.5">
                <i className="size-2 rounded-full border border-sky-400" />{" "}
                Confidence contour
              </span>
            </div>
          </Card>
          <Card className="rounded-sm border-slate-700 bg-[#1e293b] shadow-none">
            <CardHeader className="border-b border-slate-700 px-4 py-3">
              <CardTitle className="text-xs uppercase tracking-wider">
                SAR acquisition
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <div className="relative h-44 overflow-hidden border border-slate-600 bg-slate-800">
                <img
                  src={record.sarImage}
                  alt="Processed raw SAR acquisition"
                  className="size-full object-cover grayscale"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 px-2 py-1 font-mono text-[9px] text-slate-200">
                  S1 · 29 JAN 2017 · 06:42 UTC
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-3">
                {field("Sensor", record.sensor)}
                {field("Polarization", record.polarization)}
                {field("Scene mode", "IW GRDH")}
                {field("Processing", "RTC / terrain corrected")}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Card className="rounded-sm border-slate-700 bg-[#1e293b] shadow-none">
            <CardHeader className="border-b border-slate-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Activity className="size-4 text-sky-400" /> SAR transect
                  profile
                </CardTitle>
                <span className="font-mono text-[10px] text-slate-400">
                  PIXEL VALUE / BACKSCATTER INTENSITY DROP
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-3 py-3">
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <LineChart
                  accessibilityLayer
                  data={record.transect}
                  margin={{ left: 10, right: 15, top: 10, bottom: 4 }}
                >
                  <CartesianGrid stroke="#334155" strokeDasharray="2 3" />
                  <XAxis
                    dataKey="distance"
                    tick={{ fill: "#94a3b8", fontSize: 9 }}
                    label={{
                      value: "Transect distance (km)",
                      position: "insideBottom",
                      fill: "#94a3b8",
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 9 }}
                    domain={[-32, -6]}
                    label={{
                      value: "dB",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#94a3b8",
                      fontSize: 10,
                    }}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <ReferenceLine
                    y={-10.8}
                    stroke="#64748b"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="backscatter"
                    stroke="#0284c7"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="rounded-sm border-slate-700 bg-[#1e293b] shadow-none">
            <CardHeader className="border-b border-slate-700 px-4 py-3">
              <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider">
                <Waves className="size-4 text-sky-400" /> Hindcast analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <div className="mb-3 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
                <span>Estimated point of origin</span>
                <ArrowDownRight className="size-4 text-amber-500" />
                <span>Current slick centroid</span>
              </div>
              <div className="relative mb-4 h-1 bg-slate-700">
                <div className="absolute left-0 top-0 h-1 w-1/2 bg-sky-500" />
                <i className="absolute left-1/2 -top-1 size-3 rounded-full bg-red-600 ring-2 ring-red-600/30" />
              </div>
              <div className="grid grid-cols-7 gap-1">
                {record.hindcast.map((step, i) => (
                  <div
                    key={step.label}
                    className={`border px-1 py-2 text-center ${i === 3 ? "border-red-500 bg-red-950/40 text-red-300" : "border-slate-700 text-slate-400"}`}
                  >
                    <div className="text-[9px] font-bold">{step.label}</div>
                    <div className="mt-1 font-mono text-[8px]">
                      {step.offset}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-wider text-slate-400">
                <Clock3 className="size-3" /> Reverse hydrodynamic drift vector
                · confidence 0.81
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
