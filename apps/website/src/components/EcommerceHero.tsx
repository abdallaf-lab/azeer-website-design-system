import type * as React from "react";
import { Icon } from "@azeer/ui";
import {
  Container,
  PromoPill,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@azeer/website-ui";
import { StoreCartThread } from "@/components/StoreCartThread";
import { ArrowRight, Check, Languages } from "@/lib/icons";

/**
 * EcommerceHero — landing hero for the Salla/Zid e-commerce vertical, targeting
 * D2C brand owners in Saudi Arabia. Single goal: book a 15-minute demo.
 *
 * Composed on the established Azeer hero pattern (dot-grid canvas + single-hue
 * `bg-hero-brand` wash + `text-mkt-*` scale + ring-expand marketing buttons),
 * laid out as an asymmetric two-column split: revenue-led copy on the start
 * side, a live WhatsApp cart-recovery thread on the end side. Brand indigo is an
 * accent only; the white-text CTA rides `accent-fill` (via PrimaryButton), never
 * the non-text brand identity color. Logical properties throughout → mirrors
 * cleanly under RTL (/en and /ar). Server Component (CTAs are anchors).
 */

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

export function EcommerceHero() {
  return (
    <Section tone="canvas" className="relative overflow-hidden bg-dot-grid">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-brand" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy column */}
        <div className="flex flex-col items-start">
          <PromoPill>
            <span className="h-2 w-2 rounded-full bg-channel-whatsapp" aria-hidden="true" />
            Works with Salla &amp; Zid · Meta Business Partner
          </PromoPill>

          <h1 className="mt-5 max-w-xl text-balance text-mkt-display-xl text-content-emphasis">
            Turn abandoned carts into paid orders.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-mkt-body-lg text-content-subtle">
            Azeer is the WhatsApp revenue engine for D2C brands on Salla and Zid.
            It recovers abandoned carts, confirms cash-on-delivery orders, and
            brings buyers back. In Arabic and English, on the number your
            customers already message. Built for stores across Saudi Arabia.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton action={{ label: "Book a 15-min demo", href: "/demo", icon: ArrowRight }} />
            <SecondaryButton action={{ label: "Talk to sales", href: "/contact-sales" }} />
          </div>

          <p className="mt-3 text-mkt-body-sm text-content-subtle">
            15 minutes, real numbers from your store. No slides.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <HeroPoint icon={Languages}>Arabic &amp; English</HeroPoint>
            <HeroPoint icon={Check}>Live in days</HeroPoint>
            <HeroPoint icon={Check}>No new app for buyers</HeroPoint>
          </ul>
        </div>

        {/* Media column — live WhatsApp cart-recovery thread */}
        <div className="w-full">
          <StoreCartThread />
        </div>
      </Container>
    </Section>
  );
}
