"use client";

import * as React from "react";
import { X, Check, Loader2, Calendar } from "lucide-react";
import { Button, buttonClasses } from "@/components/primitives";
import { LogoMark } from "@/components/Logo";
import { useLocale } from "./locale-context";
import { cn } from "@/lib/utils";

const CALENDLY_BASE = "https://calendly.com/azeer/csat-demo";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadDialog({
  open,
  onClose,
  source,
}: {
  open: boolean;
  onClose: () => void;
  source: string;
}) {
  const { t } = useLocale();
  const L = t.lead;
  const [status, setStatus] = React.useState<Status>("idle");
  const [scheduleUrl, setScheduleUrl] = React.useState(CALENDLY_BASE);
  const firstFieldRef = React.useRef<HTMLInputElement>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  React.useEffect(() => {
    if (open) setStatus("idle");
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company_url")) return; // honeypot tripped

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      industry: String(data.get("industry") || ""),
      volume: String(data.get("volume") || ""),
      source,
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      const params = new URLSearchParams({ name: payload.name, email: payload.email, a1: payload.company });
      setScheduleUrl(`${CALENDLY_BASE}?${params.toString()}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[1300] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        className="relative z-10 max-h-[92vh] w-full max-w-[600px] overflow-y-auto rounded-t-lg bg-white p-6 sm:rounded-lg sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={L.close}
          className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100"
        >
          <X className="size-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <Check className="size-6 text-[var(--color-success)]" />
            </span>
            <h2 className="text-[22px] font-semibold text-zinc-900">{L.successTitle}</h2>
            <p className="mt-2 max-w-sm text-[15px] text-zinc-500">{L.successDesc}</p>
            <a
              href={scheduleUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonClasses({ variant: "brand", size: "lg" }), "mt-6")}
            >
              <Calendar className="size-5" />
              {L.continue}
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <div>
                <h2 id="lead-title" className="text-[20px] font-semibold text-zinc-900">{L.title}</h2>
                <p className="text-[13px] text-zinc-500">{L.sub}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={L.name} className="sm:col-span-2">
                <input ref={firstFieldRef} name="name" required autoComplete="name" className={inputCls} placeholder={L.namePh} />
              </Field>
              <Field label={L.email}>
                <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder={L.emailPh} />
              </Field>
              <Field label={L.company}>
                <input name="company" required autoComplete="organization" className={inputCls} placeholder={L.companyPh} />
              </Field>
              <Field label={L.industry}>
                <select name="industry" required defaultValue="" className={inputCls}>
                  <option value="" disabled>{L.select}</option>
                  {L.industryOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label={L.volume} hint={L.optional}>
                <select name="volume" defaultValue="" className={inputCls}>
                  <option value="">{L.select}</option>
                  {L.volumeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div className="sm:col-span-2">
                {status === "error" && (
                  <p className="mb-3 text-[13px] text-[var(--color-danger)]">{L.error}</p>
                )}
                <Button type="submit" variant="brand" size="lg" disabled={status === "submitting"} className="w-full">
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      {L.submitting}
                    </>
                  ) : (
                    L.submit
                  )}
                </Button>
                <p className="mt-3 text-center text-[12px] text-zinc-400">{L.privacy}</p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-sm border border-zinc-200 bg-white px-3 text-[15px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[13px] font-medium text-zinc-700">
        {label}
        {hint ? <span className="ms-1 font-normal text-zinc-400">({hint})</span> : null}
      </span>
      {children}
    </label>
  );
}
