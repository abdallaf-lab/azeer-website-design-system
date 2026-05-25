import type * as React from "react";
import { Icon } from "@azeer/ui";
import { Container, Eyebrow, Section, SectionHeading, cn } from "@azeer/website-ui";
import {
  Bell,
  Bot,
  CalendarCheck,
  Megaphone,
  MessageCircle,
  RefreshCw,
  TrendingUp,
  Workflow,
} from "@/lib/icons";

/**
 * Bespoke, token-only marketing visuals for the clinic landing page. Each is a
 * Server Component built from product surface/intent tokens — no images, no
 * hardcoded color. They give the feature-splits real, specific media instead of
 * a generic screenshot, and read correctly under RTL (logical properties only).
 */

/** Shared frame: the cohesive "panel" wrapper every visual sits in. */
function VisualCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-default bg-surface p-6 shadow-elev-2",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 50% 0%, var(--color-accent-bg-subtle), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * OrchestrationSteps — the "how revenue orchestration works" section.
 * ──────────────────────────────────────────────────────────────────────── */

const steps = [
  {
    icon: MessageCircle,
    title: "Patients message your WhatsApp",
    body: "From an ad, Google, Instagram, or your saved clinic number — every patient lands in one place. Nothing to install on their side.",
  },
  {
    icon: Bot,
    title: "Azeer answers, books & collects",
    body: "In Arabic or English, day or night. It offers real open slots, takes a refundable deposit, and confirms the appointment instantly.",
  },
  {
    icon: TrendingUp,
    title: "They show up — and you see the revenue",
    body: "Automatic reminders and no-show recovery keep chairs full. Every conversation is tied back to booked, paid revenue.",
  },
];

export function OrchestrationSteps() {
  return (
    <Section id="how-it-works" tone="surface">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          display
          centered
          eyebrow={<Eyebrow icon={Workflow}>How it works</Eyebrow>}
          title="From a WhatsApp message to money in the chair"
          description="Azeer orchestrates the whole journey — answer, book, collect, remind, recover — so no revenue leaks between the message and the appointment."
          className="mx-auto"
        />
        <ol className="relative grid gap-6 lg:grid-cols-3">
          {/* Connecting rail (desktop) */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-9 hidden h-px bg-border-divider lg:block"
          />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-4 rounded-2xl border border-border-default bg-surface p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-fill text-fg-on-accent shadow-elev-1">
                <Icon icon={step.icon} size={24} aria-hidden="true" />
              </span>
              <span className="flex items-center gap-2">
                <span className="text-label-xs text-accent-text">Step {i + 1}</span>
              </span>
              <h3 className="text-heading-sm text-fg-default">{step.title}</h3>
              <p className="text-body-sm text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * AfterHoursVisual — bookings-by-hour, evening highlighted.
 * ──────────────────────────────────────────────────────────────────────── */

const hours = [
  { h: "9a", v: 18 },
  { h: "11a", v: 26 },
  { h: "1p", v: 22 },
  { h: "3p", v: 30 },
  { h: "5p", v: 38 },
  { h: "7p", v: 64, after: true },
  { h: "9p", v: 88, after: true },
  { h: "11p", v: 72, after: true },
];

export function AfterHoursVisual() {
  return (
    <VisualCard>
      <div className="flex items-baseline justify-between">
        <span className="text-label-xs text-fg-subtle">Bookings by hour</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg-subtle px-2.5 py-1 text-body-xs font-medium text-accent-text">
          <Icon icon={CalendarCheck} size={14} aria-hidden="true" />
          41% after hours
        </span>
      </div>
      <div className="mt-5 flex h-40 items-end gap-2">
        {hours.map((bar) => (
          <span key={bar.h} className="flex flex-1 flex-col items-center gap-2">
            <span
              className={cn(
                "w-full rounded-t-md",
                bar.after ? "bg-accent-fill" : "bg-accent-bg-subtle",
              )}
              style={{ height: `${bar.v}%` }}
            />
            <span className="text-body-xs text-fg-subtle">
              <span dir="ltr">{bar.h}</span>
            </span>
          </span>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-body-sm text-fg-muted">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-fill" />
        Your busiest booking window starts after the front desk goes home.
      </p>
    </VisualCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * DepositVisual — no-show rate, with/without deposits.
 * ──────────────────────────────────────────────────────────────────────── */

function NoShowBar({
  label,
  pct,
  intent,
}: {
  label: string;
  pct: number;
  intent: "danger" | "success";
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-body-sm">
        <span className="text-fg-default">{label}</span>
        <span
          className={cn(
            "font-semibold",
            intent === "danger" ? "text-danger-text" : "text-success-text",
          )}
        >
          {pct}% no-show
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-sunken">
        <span
          className={cn(
            "block h-full rounded-full",
            intent === "danger" ? "bg-danger-fill" : "bg-success-fill",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function DepositVisual() {
  return (
    <VisualCard>
      <span className="text-label-xs text-fg-subtle">No-show rate</span>
      <div className="mt-5 flex flex-col gap-5">
        <NoShowBar label="Without deposits" pct={31} intent="danger" />
        <NoShowBar label="With Azeer deposits" pct={12} intent="success" />
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-success-border bg-success-bg-subtle px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-fill text-fg-on-success">
          <Icon icon={TrendingUp} size={20} aria-hidden="true" />
        </span>
        <p className="text-body-sm text-fg-default">
          A small refundable deposit turns a “maybe” into a kept appointment.
        </p>
      </div>
    </VisualCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * ReactivationVisual — a recall campaign in flight.
 * ──────────────────────────────────────────────────────────────────────── */

export function ReactivationVisual() {
  return (
    <VisualCard>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-label-xs text-fg-subtle">
          <Icon icon={Megaphone} size={14} aria-hidden="true" />
          Recall campaign
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg-subtle px-2.5 py-1 text-body-xs font-medium text-success-text">
          <Icon icon={RefreshCw} size={14} aria-hidden="true" />
          Sending
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-border-divider bg-surface-sunken p-4">
        <p className="text-body-sm text-fg-default">
          “Hi Noura — it’s been 6 months since your last cleaning at Lumière. Want
          your usual Wednesday evening slot with Dr. Lina? Reply{" "}
          <strong className="font-semibold">YES</strong> and we’ll book it.”
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[
          { k: "Audience", v: "420" },
          { k: "Replied", v: "96" },
          { k: "Booked", v: "+27" },
        ].map((item, i) => (
          <div
            key={item.k}
            className={cn(
              "rounded-xl border p-3",
              i === 2
                ? "border-accent-border bg-accent-bg-subtle"
                : "border-border-divider bg-surface",
            )}
          >
            <dd
              className={cn(
                "text-heading-sm",
                i === 2 ? "text-accent-text" : "text-fg-default",
              )}
            >
              {item.v}
            </dd>
            <dt className="text-body-xs text-fg-muted">{item.k}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-center gap-2 text-body-sm text-fg-muted">
        <Icon icon={Bell} size={16} aria-hidden="true" className="text-accent-text" />
        Overdue patients, re-engaged automatically — no front-desk hours spent.
      </p>
    </VisualCard>
  );
}
