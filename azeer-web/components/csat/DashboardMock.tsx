"use client";

import { ArrowUpRight, ArrowDownRight, Star, Smile, Meh, AlertTriangle } from "lucide-react";
import { useLocale } from "./locale-context";
import { cn } from "@/lib/utils";

const distribution = [
  { star: 5, pct: 58 },
  { star: 4, pct: 22 },
  { star: 3, pct: 9 },
  { star: 2, pct: 6 },
  { star: 1, pct: 5 },
];

const trend = [3.9, 4.0, 3.8, 4.1, 4.2, 4.3, 4.25, 4.4, 4.5, 4.55, 4.6];

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const w = 100;
  const h = 28;
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d - min) / (max - min || 1)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-7 w-full", className)} preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke="#7C64FE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Kpi({
  label,
  value,
  suffix,
  delta,
  up,
  spark,
}: {
  label: string;
  value: string;
  suffix?: string;
  delta: string;
  up: boolean;
  spark?: boolean;
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white p-4">
      <div className="text-[13px] font-medium text-zinc-500">{label}</div>
      <div className="mt-1 flex items-end gap-1" dir="ltr">
        <span className="text-[28px] font-semibold leading-none text-zinc-900 tabular-nums">{value}</span>
        {suffix ? <span className="pb-0.5 text-[15px] text-zinc-400">{suffix}</span> : null}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-[13px] font-medium",
            up ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
          )}
          dir="ltr"
        >
          {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
          {delta}
        </span>
        {spark ? <Sparkline data={trend} className="ms-2 max-w-[72px]" /> : null}
      </div>
    </div>
  );
}

export function DashboardMock({ className }: { className?: string }) {
  const { t } = useLocale();
  const d = t.dashboard;
  const bucketMeta = [
    { icon: <Smile className="size-4" />, tone: "positive" as const, value: "1,027" },
    { icon: <Meh className="size-4" />, tone: "neutral" as const, value: "116" },
    { icon: <AlertTriangle className="size-4" />, tone: "risk" as const, value: "141" },
  ];
  return (
    <div className={cn("overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50", className)}>
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
        <span className="ms-3 inline-flex items-center gap-2 rounded-sm bg-zinc-100 px-2 py-1 text-[12px] text-zinc-500" dir="ltr">
          app.azeer.ai/csat
        </span>
        <span className="ms-auto rounded-full bg-brand-muted px-2.5 py-1 text-[12px] font-medium text-brand">
          {d.range}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label={d.kpis[0]} value="4.6" suffix="/5" delta="+0.4" up spark />
          <Kpi label={d.kpis[1]} value="62" suffix="%" delta="+8 pts" up />
          <Kpi label={d.kpis[2]} value="1,284" delta="+19%" up />
          <Kpi label={d.kpis[3]} value="38" delta="−12" up />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-5">
          <div className="rounded-md border border-zinc-200 bg-white p-4 lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-medium text-zinc-700">{d.distribution}</span>
              <span className="text-[12px] text-zinc-400">{d.responses}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {distribution.map((row) => (
                <div key={row.star} className="flex items-center gap-3">
                  <span className="flex w-9 items-center gap-0.5 text-[12px] font-medium text-zinc-500 tabular-nums">
                    {row.star}
                    <Star className="size-3 text-amber" fill="#FFC857" strokeWidth={0} />
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        row.star >= 4 ? "bg-brand" : row.star === 3 ? "bg-zinc-300" : "bg-[var(--color-danger)]"
                      )}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-end text-[12px] text-zinc-400 tabular-nums">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2">
            {bucketMeta.map((b, i) => (
              <Bucket key={i} icon={b.icon} tone={b.tone} label={d.buckets[i].label} value={b.value} note={d.buckets[i].note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bucket({
  icon,
  label,
  value,
  note,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  tone: "positive" | "neutral" | "risk";
}) {
  const toneCls = {
    positive: "text-[var(--color-success)] bg-green-50",
    neutral: "text-zinc-500 bg-zinc-100",
    risk: "text-[var(--color-danger)] bg-red-50",
  }[tone];
  return (
    <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-white p-3.5">
      <span className={cn("inline-flex size-8 items-center justify-center rounded-md", toneCls)}>{icon}</span>
      <div className="min-w-0">
        <div className="truncate text-[13px] font-medium text-zinc-700">{label}</div>
        <div className="text-[12px] text-zinc-400">{note}</div>
      </div>
      <span className="ms-auto text-[18px] font-semibold text-zinc-900 tabular-nums">{value}</span>
    </div>
  );
}

export function HeroDashboard({ className }: { className?: string }) {
  const { t } = useLocale();
  const d = t.dashboard;
  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="ms-auto inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[12px] font-medium text-[var(--color-success)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success)]" />
            </span>
            {d.live}
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <Kpi label={d.kpis[0]} value="4.6" suffix="/5" delta="+0.4" up spark />
            <Kpi label={d.kpis[1]} value="62" suffix="%" delta="+8 pts" up />
          </div>
          <div className="mt-3 rounded-md border border-zinc-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-medium text-zinc-700">{d.ratings}</span>
              <span className="text-[12px] text-zinc-400">{d.today}</span>
            </div>
            <div className="flex flex-col gap-2">
              {distribution.slice(0, 3).map((row) => (
                <div key={row.star} className="flex items-center gap-2">
                  <span className="flex w-7 items-center gap-0.5 text-[12px] text-zinc-500 tabular-nums">
                    {row.star}
                    <Star className="size-3 text-amber" fill="#FFC857" strokeWidth={0} />
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={cn("h-full rounded-full", row.star >= 4 ? "bg-brand" : "bg-zinc-300")}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -start-4 hidden w-[220px] rounded-md border border-zinc-200 bg-white p-3 sm:block">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-muted text-[12px] font-semibold text-brand">
            LM
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-3 text-amber" fill="#FFC857" strokeWidth={0} />
              ))}
            </div>
            <div className="truncate text-[11px] text-zinc-400">{d.toastNew}</div>
          </div>
        </div>
        <p className="mt-1.5 text-[12px] leading-snug text-zinc-600">&ldquo;{d.toastQuote}&rdquo;</p>
      </div>
    </div>
  );
}
