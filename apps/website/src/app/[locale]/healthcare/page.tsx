import type { Metadata } from "next";
import {
  DarkCTA,
  FeatureGrid,
  FeatureSplit,
  LogoCloud,
  MarketingHero,
  ProductFrame,
  TestimonialQuote,
  TrustBadges,
} from "@azeer/website-ui";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductMock } from "@/components/ProductMock";
import {
  BadgeCheck,
  Check,
  Clock,
  FileText,
  Languages,
  MessageSquare,
  Plug,
  ShieldCheck,
} from "@/lib/icons";

export const metadata: Metadata = {
  title: "Healthcare",
  description:
    "Azeer's WhatsApp-led automation confirms appointments, reduces no-shows by up to 40%, and re-engages dormant patients — built for clinics and polyclinics across the GCC.",
};

const clinicLogos = [
  { src: "/logos/acme.svg", alt: "Andalus Clinics" },
  { src: "/logos/globex.svg", alt: "Noor Polyclinic" },
  { src: "/logos/initech.svg", alt: "Hayat Dental" },
  { src: "/logos/umbra.svg", alt: "Salma Medical" },
  { src: "/logos/hooli.svg", alt: "Rua Health" },
];

/**
 * Healthcare vertical landing page. Composed entirely from `@azeer/website-ui`
 * marketing primitives on the marketing type scale (`text-mkt-*`), with the
 * brand wash hero. Renders LTR (/en/healthcare) and RTL (/ar/healthcare); every
 * primitive uses logical properties, so the layout mirrors automatically.
 */
export default function HealthcarePage() {
  return (
    <>
      {/* 1. Nav — Solutions marked active */}
      <SiteNavbar activeLabel="Solutions" />

      <main>
        {/* 2 + 3 + 4. Promo pill, hero, and hero product visual */}
        <MarketingHero
          pill={{
            label: "Now SOC 2 Type II certified · Read more",
            href: "/security",
          }}
          eyebrow="For Clinics & Polyclinics"
          title="Stop losing revenue to no-shows"
          description="Azeer's WhatsApp-led automation confirms appointments, reduces no-shows by up to 40%, and re-engages dormant patients — all without adding staff."
          primaryCta={{ label: "Book a demo", href: "/demo" }}
          secondaryCta={{ label: "See how it works", href: "/healthcare#how-it-works" }}
        >
          {/* TODO: replace with real product mockup of the WhatsApp appointment confirmation flow */}
          <ProductFrame>
            <ProductMock label="Azeer · WhatsApp confirmations" />
          </ProductFrame>
        </MarketingHero>

        {/* 5. Logo cloud */}
        <LogoCloud title="Trusted by leading clinics across GCC" logos={clinicLogos} />

        {/* 6. Feature: confirmations */}
        <FeatureSplit
          marketing
          id="how-it-works"
          eyebrow="Automated confirmations"
          title="Patients confirm before the chair sits empty"
          description="Two-way WhatsApp confirmations with smart timing — sent 24h, 4h, and 1h before the appointment. Patients reschedule or cancel with one tap."
          media={
            <ProductFrame>
              {/* TODO: replace with real product mockup of the confirmation flow */}
              <ProductMock label="Azeer · Confirmations" />
            </ProductFrame>
          }
        />
        <FeatureGrid
          marketing
          columns={3}
          items={[
            {
              icon: Languages,
              title: "Arabic-first templates",
              description: "Native Arabic copy approved by Meta.",
            },
            {
              icon: Clock,
              title: "Smart timing",
              description: "Sends at high-open-rate windows per timezone.",
            },
            {
              icon: MessageSquare,
              title: "Self-reschedule",
              description: "Reduces front-desk calls by 60%.",
            },
          ]}
        />

        {/* 7. Feature: re-engagement (media on the start side this time) */}
        <FeatureSplit
          marketing
          mediaStart
          tone="surface"
          eyebrow="Dormant patient revival"
          title="Bring patients back without lifting a finger"
          description="Find patients who haven't visited in 6+ months, segment by treatment type, and send personalized recall campaigns over WhatsApp."
          media={
            <ProductFrame>
              {/* TODO: replace with real product mockup of recall campaigns */}
              <ProductMock label="Azeer · Recall campaigns" />
            </ProductFrame>
          }
        />

        {/* 8. Feature grid: built for healthcare */}
        <FeatureGrid
          marketing
          columns={4}
          eyebrow="Healthcare-grade"
          title="Compliance built in"
          items={[
            {
              icon: ShieldCheck,
              title: "HIPAA-aligned data handling",
              description: "Patient data stays in-region, encrypted at rest.",
            },
            {
              icon: BadgeCheck,
              title: "SOC 2 Type II",
              description: "Annually audited, available on request.",
            },
            {
              icon: FileText,
              title: "Meta-approved templates",
              description: "Pre-built library for healthcare use cases.",
            },
            {
              icon: Plug,
              title: "EMR integrations",
              description: "Two-way sync with major regional EMRs.",
            },
          ]}
        />

        {/* 9. Testimonial */}
        <TestimonialQuote
          marketing
          tone="surface"
          quote="We cut no-shows from 28% to 11% in the first quarter with Azeer. The ROI was obvious by month two."
          authorName="Dr. Sara Al-Mutairi"
          authorRole="Medical Director, Andalus Clinics"
        />

        {/* 10. Dark closing CTA with trust badges */}
        <DarkCTA
          title="See Azeer in your clinic in under 15 minutes"
          description="Live demo, real numbers, Arabic-first from day one."
          primaryCta={{ label: "Book a demo", href: "/demo" }}
          secondaryCta={{ label: "Talk to sales", href: "/contact-sales" }}
          badges={
            <TrustBadges
              tone="dark"
              items={[
                { icon: BadgeCheck, label: "SOC 2 Type II" },
                { icon: ShieldCheck, label: "HIPAA-aligned" },
                { icon: Check, label: "Meta Business Partner" },
              ]}
            />
          }
        />
      </main>

      {/* 11. Footer */}
      <SiteFooter />
    </>
  );
}
