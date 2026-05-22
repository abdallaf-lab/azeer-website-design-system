import type { Metadata } from "next";
import {
  CompareTable,
  CTABanner,
  FAQ,
  PricingCalculator,
  PricingCards,
} from "@azeer/website-ui";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight } from "@/lib/icons";
import { faqs, plans } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, scalable pricing for teams of every size. Start free, then grow into AI agents, workflows, and enterprise security.",
};

export default function PricingPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <PricingCards
          eyebrow="Pricing"
          title="Simple, scalable pricing"
          description="Start free. Upgrade when you need AI agents, workflows, and enterprise security."
          plans={plans}
        />

        <PricingCalculator
          eyebrow="Estimate"
          title="Estimate your monthly cost"
          description="Plug in your team size and volume to see a ballpark on the Growth plan."
          seatPrice={99}
          conversationPrice={0.01}
          cta={{ label: "Start free trial", href: "/signup" }}
        />

        <CompareTable
          eyebrow="Compare"
          title="Compare every plan"
          columns={[
            { name: "Starter" },
            { name: "Growth", highlight: true },
            { name: "Enterprise" },
          ]}
          groups={[
            {
              label: "Channels & inbox",
              rows: [
                { feature: "Channels", values: ["3", "Unlimited", "Unlimited"] },
                { feature: "Shared inbox & assignments", values: [true, true, true] },
                { feature: "Conversations / mo", values: ["5,000", "50,000", "Custom"] },
                { feature: "Mobile apps", values: [true, true, true] },
              ],
            },
            {
              label: "Automation & AI",
              rows: [
                { feature: "Workflows & routing", values: [false, true, true] },
                { feature: "AI agents", values: [false, true, true] },
                { feature: "SLA management", values: [false, true, true] },
              ],
            },
            {
              label: "Security & support",
              rows: [
                { feature: "SSO & SCIM", values: [false, false, true] },
                { feature: "Custom data residency", values: [false, false, true] },
                { feature: "Uptime SLA", values: ["—", "99.9%", "99.99%"] },
                { feature: "Support", values: ["Email", "Priority", "Named CSM"] },
              ],
            },
          ]}
          tone="surface"
        />

        <FAQ
          eyebrow="FAQ"
          title="Pricing questions"
          items={faqs}
        />

        <CTABanner
          title="Try Azeer free for 14 days"
          description="No credit card required. Cancel anytime."
          primaryCta={{ label: "Start free trial", href: "/signup", icon: ArrowRight }}
          secondaryCta={{ label: "Talk to sales", href: "/contact-sales" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
