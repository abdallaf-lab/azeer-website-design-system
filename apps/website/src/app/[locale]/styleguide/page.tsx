import type { Metadata } from "next";
import {
  Container,
  DarkCTA,
  Eyebrow,
  PrimaryButton,
  ProductFrame,
  PromoPill,
  Section,
  SectionHeading,
  SecondaryButton,
} from "@azeer/website-ui";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductMock } from "@/components/ProductMock";
import { ArrowRight, Sparkles, Bot, Workflow } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Style guide",
  description:
    "Living reference for the Dub-grade marketing primitives on the Azeer brand.",
};

/**
 * /[locale]/styleguide — a living reference that exercises every new marketing
 * token + primitive (so Tailwind generates the utilities and the build compiles
 * them). Renders in both LTR (/en) and RTL (/ar). Additive — no existing
 * marketing content is changed.
 */
export default function StyleGuidePage() {
  return (
    <>
      <SiteNavbar />
      <main>
        {/* Hero: dot-grid + brand radial wash + marketing display scale */}
        <section className="relative w-full overflow-hidden bg-dot-grid py-24 md:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-brand" />
          <Container className="relative flex flex-col items-center gap-6 text-center">
            <PromoPill>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              New · Dub-grade marketing system
            </PromoPill>
            <h1 className="mx-auto max-w-reading text-balance text-mkt-display-xl text-content-emphasis">
              Patterns from Dub, on the Azeer brand
            </h1>
            <p className="mx-auto max-w-reading text-pretty text-mkt-body-lg text-content-subtle">
              One typeface, weight-driven hierarchy, airy spacing, borders-first
              elevation, and ring-expand interactions — all on our brand color
              and fonts.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton action={{ label: "Start free trial", href: "/signup", icon: ArrowRight }} />
              <SecondaryButton action={{ label: "Book a demo", href: "/demo" }} />
            </div>
          </Container>
        </section>

        {/* Product frame + display heading */}
        <Section tone="surface">
          <Container className="flex flex-col gap-12">
            <SectionHeading
              display
              centered
              eyebrow={<Eyebrow icon={Sparkles}>Anatomy</Eyebrow>}
              title="Display scale, lightly weighted"
              description="The marketing scale tops out at Medium (500) — light at large sizes, the Dub way."
            />
            <ProductFrame className="mx-auto w-full max-w-content">
              <ProductMock label="Azeer · Shared inbox" />
            </ProductFrame>
          </Container>
        </Section>

        {/* Feature cards on neutral semantic tokens */}
        <Section tone="canvas">
          <Container className="grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle md:grid-cols-3">
            {[
              { icon: Bot, title: "AI agents", body: "Deflect repetitive questions across every channel." },
              { icon: Workflow, title: "Automations", body: "Route, tag, and escalate with SLA-aware rules." },
              { icon: Sparkles, title: "Arabic-first", body: "Mirrored layouts and same-metric Arabic type." },
            ].map((f) => (
              <div key={f.title} className="flex flex-col gap-3 bg-bg-default p-6">
                <f.icon className="h-6 w-6 text-accent-text" aria-hidden="true" />
                <h3 className="text-mkt-heading-sm text-content-emphasis">{f.title}</h3>
                <p className="text-mkt-body-sm text-content-subtle">{f.body}</p>
              </div>
            ))}
          </Container>
        </Section>

        <DarkCTA
          title="Ready to unify your conversations?"
          description="Start free in minutes — no credit card required."
          primaryCta={{ label: "Start free trial", href: "/signup", icon: ArrowRight }}
          secondaryCta={{ label: "Talk to sales", href: "/contact-sales" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
