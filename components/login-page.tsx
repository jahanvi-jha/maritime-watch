"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Anchor,
  Eye,
  EyeOff,
  Lock,
  Radar,
  Satellite,
  Search,
  Settings,
  Ship,
  ShieldCheck,
  User,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_STORAGE_KEY } from "@/components/auth-guard";

type Role = "analyst" | "officer" | "investigator" | "admin";

const roles: { id: Role; label: string; icon: typeof User }[] = [
  { id: "analyst", label: "Analyst", icon: User },
  { id: "officer", label: "Maritime Officer", icon: Anchor },
  { id: "investigator", label: "Investigator", icon: Search },
  { id: "admin", label: "Administrator", icon: Settings },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState<Role>("analyst");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    router.push("/");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#062033] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[120%] w-[70%] rotate-[-8deg] rounded-[40%] bg-[#0284c7]/10 blur-2xl" />
        <div className="absolute left-[6%] top-[8%] h-[85%] w-[55%] rounded-[45%_55%_60%_40%/50%_40%_60%_50%] bg-slate-800/40" />
        <svg
          className="absolute inset-0 size-full opacity-40"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M8 12 L38 42 L28 78"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.2"
            strokeDasharray="1.2 1.2"
          />
        </svg>
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 pt-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-sm bg-[#0284c7] text-white">
            <Anchor className="size-4" />
          </div>
          <div>
            <div className="text-sm font-black tracking-[0.14em]">
              MARISCOPE{" "}
              <span className="font-normal text-slate-400">
                / MARITIME AUTHORITY
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Operational geospatial intelligence portal
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
          <ShieldCheck className="size-4 text-sky-400" />
          <div className="text-right leading-tight">
            <div className="text-[10px] font-bold tracking-wider">NTRO</div>
            <div className="text-[9px] text-slate-400">SIH 2026</div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-84px)] flex-col justify-center px-6 lg:flex-row lg:items-center lg:px-10">
        <div className="max-w-xl py-10 lg:py-0">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-300">
            <Radar className="size-3 text-sky-400 animate-pulse" />
            SATELLITE + AIS FUSION
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            SATELLITE + AIS <br />
            MARITIME INTELLIGENCE <br />
            <span className="text-sky-400">PLATFORM</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            AI-powered oil spill detection and vessel attribution using
            satellite imagery and AIS data correlations.
          </p>

          <div className="relative mt-10 flex h-40 items-center justify-center rounded-xl border border-white/5">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-dashed border-red-500/60">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-600/20" />
                <span className="size-3 rounded-full bg-red-600" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-red-400">
                OIL SPILL
              </span>
            </div>
            <div className="absolute right-4 top-2 flex items-center gap-1.5 rounded-md bg-slate-900/90 px-2 py-1 text-[9px] font-semibold text-slate-100 shadow">
              <Ship className="size-3 text-sky-400" /> VESSEL_03 · 14.7 kn
            </div>
            <div className="absolute left-2 bottom-2 flex items-center gap-1.5 rounded-md bg-slate-900/90 px-2 py-1 text-[9px] font-semibold text-slate-100 shadow">
              <Ship className="size-3 text-sky-400" /> VESSEL_01 · 12.4 kn
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
              <Satellite className="mt-0.5 size-4 text-sky-400" />
              <div>
                <div className="text-[11px] font-bold">Satellite online</div>
                <div className="text-[10px] text-slate-400">
                  Data stream active
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
              <Wifi className="mt-0.5 size-4 text-sky-400" />
              <div>
                <div className="text-[11px] font-bold">AIS active</div>
                <div className="text-[10px] text-slate-400">
                  Live vessel tracking
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
              <ShieldCheck className="mt-0.5 size-4 text-sky-400" />
              <div>
                <div className="text-[11px] font-bold">System secure</div>
                <div className="text-[10px] text-slate-400">
                  Encrypted connection
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-10 lg:ml-auto lg:py-0">
          <div className="w-[380px] max-w-full rounded-2xl bg-gradient-to-b from-white to-slate-50 p-7 text-slate-900 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#0284c7] text-white">
                <Lock className="size-5" />
              </div>
              <h2 className="mt-3 text-lg font-black tracking-wide">
                SECURE LOGIN
              </h2>
              <span className="mt-2 h-0.5 w-8 rounded-full bg-[#0284c7]" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  User ID / Email
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
                  <Input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your user ID or email"
                    className="h-9 pl-8 text-sm focus-visible:border-sky-600 focus-visible:ring-sky-600/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-9 pl-8 pr-8 text-sm focus-visible:border-sky-600 focus-visible:ring-sky-600/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="size-3.5" />
                    ) : (
                      <Eye className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-3.5 rounded border-slate-300"
                  />
                  Remember me
                </label>
                <a href="#" className="font-medium text-sky-700 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-9 w-full bg-[#0284c7] text-xs font-bold tracking-wide hover:bg-[#0369a1]"
              >
                <Lock data-icon="inline-start" className="size-3.5" />
                {submitting ? "Signing in..." : "Secure Login"}
              </Button>

              <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                OR
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <div>
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Login as
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRole(id)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-[11px] font-medium transition-colors ${
                        role === id
                          ? "border-sky-600 bg-sky-50 text-sky-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="size-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="size-3" />
              This is a secure government system.
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 pb-4 text-center text-[10px] text-slate-500">
        © 2026 NTRO. All rights reserved.
      </footer>
    </main>
  );
}
