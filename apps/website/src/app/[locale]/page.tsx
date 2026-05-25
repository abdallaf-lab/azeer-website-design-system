import type { Metadata } from "next";
import type * as React from "react";
import { Icon } from "@azeer/ui";
import {
  Container,
  ComplianceBand,
  DarkCTA,
  FAQ,
  FeatureGrid,
  FeatureSplit,
  PrimaryButton,
  PromoPill,
  Section,
  SecondaryButton,
  StatsBand,
  TestimonialGrid,
  TrustBadges,
} from "@azeer/website-ui";
import { LandingNav } from "@/components/LandingNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppThread } from "@/components/WhatsAppThread";
import {
  AfterHoursVisual,
  DepositVisual,
  OrchestrationSteps,
  ReactivationVisual,
} from "@/components/clinic-visuals";
import {
  capabilities,
  closingBadges,
  compliance,
  faqs,
  markets,
  specialties,
  stats,
  testimonials,
} from "@/content/clinics";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CreditCard,
  Languages,
  MapPin,
  RefreshCw,
  Sparkles,
} from "@/lib/icons";

export const metadata: Metadata = {
  title: "WhatsApp revenue orchestration for GCC clinics",
  description:
    "Azeer turns every WhatsApp message into a booked, paid appointment. The WhatsApp revenue engine for clinics across Saudi, the UAE, and the Gulf — booking, deposits, reminders, and no-show recovery in Arabic and English, 24/7.",
  openGraph: {
    title: "Azeer — WhatsApp revenue orchestration for GCC clinics",
    description:
      "Turn every WhatsApp message into a booked, paid appointment. Booking, deposits, reminders, and no-show recovery — in Arabic and English, around the clock.",
  },
};

/** A single hero trust point (icon + label). */
function HeroPoint({
  icon,
  children,
}: {
  icon: typeof Check;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-mkt-body-sm text-content-subtle">
      <Icon icon={icon} size={16} aria-hidden="true" className="text-success-text" />
      {children}
    </li>
  );
}

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <Section tone="canvas" className="relative overflow-hidden bg-dot-grid">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-brand" />
          <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start">
              <PromoPill>
                <span className="h-2 w-2 rounded-full bg-channel-whatsapp" aria-hidden="true" />
                WhatsApp Business API · Meta Business Partner
              </PromoPill>
              <h1 className="mt-5 max-w-xl text-balance text-mkt-display-xl text-content-emphasis">
                Turn every WhatsApp message into a booked, paid appointment.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-mkt-body-lg text-content-subtle">
                Azeer is the WhatsApp revenue engine for clinics across Saudi, the
                UAE, and the wider Gulf. It answers patients in Arabic and English,
                fills your calendar, collects deposits, and wins back no-shows —
                around the clock.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton action={{ label: "Book a demo", href: "/demo", icon: ArrowRight }} />
                <SecondaryButton action={{ label: "See how it works", href: "#how-it-works" }} />
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                <HeroPoint icon={Languages}>Arabic &amp; English</HeroPoint>
                <HeroPoint icon={Check}>Live in days</HeroPoint>
                <HeroPoint icon={Check}>No new app for patients</HeroPoint>
              </ul>
            </div>

            <div className="w-full">
              <WhatsAppThread />
            </div>
          </Container>
        </Section>

        {/* ── Trust strip: specialties + markets ───────────────────────── */}
        <Section tone="sunken" className="py-12 md:py-16">
          <Container className="flex flex-col items-center gap-6 text-center">
            <p className="text-label-xs text-fg-subtle">
              Built for clinics across the Gulf
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {specialties.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border-default bg-surface px-3 py-1 text-body-sm text-fg-default"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-body-sm text-fg-muted">
              <Icon icon={MapPin} size={16} aria-hidden="true" className="text-accent-text" />
              {markets.join("  ·  ")}
            </p>
          </Container>
        </Section>

        {/* ── How it works (3-step orchestration) ──────────────────────── */}
        <OrchestrationSteps />

        {/* ── Capabilities grid ────────────────────────────────────────── */}
        <div id="features">
          <FeatureGrid
            marketing
            tone="canvas"
            columns={3}
            eyebrow="What Azeer does"
            title="One engine for the whole patient journey"
            description="Every step from first message to kept appointment — orchestrated on the channel your patients already live on."
            items={capabilities}
          />
        </div>

        {/* ── Feature splits (zig-zag) ─────────────────────────────────── */}
        <FeatureSplit
          marketing
          tone="surface"
          eyebrow="After-hours revenue"
          title="Your busiest booking hours are after you close"
          description="Patients reach out in the evening, on weekends, between meetings. When your front desk is dark, Azeer is still booking — so that demand turns into appointments instead of voicemail."
          bullets={[
            { icon: CalendarCheck, title: "24/7 booking", description: "Real open slots offered the moment a patient asks." },
            { icon: Sparkles, title: "Instant replies", description: "Under 30 seconds, in Arabic or English." },
          ]}
          cta={{ label: "See how it works", href: "#how-it-works", icon: ArrowRight }}
          media={<AfterHoursVisual />}
        />

        <FeatureSplit
          marketing
          mediaStart
          tone="canvas"
          eyebrow="No-show recovery"
          title="Deposits turn “maybe” into “booked”"
          description="A small refundable deposit — paid with Mada, Apple Pay, or card right inside the chat — is the single biggest lever on no-shows. Azeer collects it automatically, so the patients who book are the patients who show."
          bullets={[
            { icon: CreditCard, title: "In-chat payments", description: "Mada, Apple Pay, and cards — no links to chase." },
            { icon: Check, title: "Fewer empty chairs", description: "No-shows cut by more than a third." },
          ]}
          cta={{ label: "Talk to sales", href: "/contact-sales", icon: ArrowRight }}
          media={<DepositVisual />}
        />

        <FeatureSplit
          marketing
          tone="surface"
          eyebrow="Reactivation"
          title="Bring lapsed patients back — automatically"
          description="Your patient list is full of revenue: people overdue for a cleaning, a follow-up, a recall. Azeer re-engages them on WhatsApp with compliant campaigns that book — without spending a single front-desk hour."
          bullets={[
            { icon: RefreshCw, title: "Smart recalls", description: "Reach the right patients at the right interval." },
            { icon: Check, title: "Policy-safe", description: "Sent within WhatsApp template and opt-in rules." },
          ]}
          cta={{ label: "See how it works", href: "#how-it-works", icon: ArrowRight }}
          media={<ReactivationVisual />}
        />

        {/* ── Results ──────────────────────────────────────────────────── */}
        <div id="results">
          <StatsBand
            tone="canvas"
            eyebrow="The results"
            title="Revenue you can measure, not just messages"
            stats={stats}
          />
        </div>

        {/* ── Social proof ─────────────────────────────────────────────── */}
        <TestimonialGrid
          eyebrow="From the chair"
          title="Clinics across the Gulf, booking on autopilot"
          testimonials={testimonials}
        />

        {/* ── Compliance ───────────────────────────────────────────────── */}
        <ComplianceBand
          title="Enterprise-grade trust, built for GCC healthcare"
          items={compliance}
        />

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <FAQ
          eyebrow="FAQ"
          title="Questions clinics ask us"
          description="Everything you need to know before going live on WhatsApp."
          items={faqs}
        />

        {/* ── Closing CTA ──────────────────────────────────────────────── */}
        <DarkCTA
          title="Your patients are already on WhatsApp. Start earning from it."
          description="See how much revenue Azeer can recover for your clinic — book a 20-minute walkthrough."
          primaryCta={{ label: "Book a demo", href: "/demo", icon: ArrowRight }}
          secondaryCta={{ label: "Talk to sales", href: "/contact-sales" }}
          badges={<TrustBadges tone="dark" items={closingBadges} />}
        />
      </main>
      <SiteFooter />
    </>
  );
}
