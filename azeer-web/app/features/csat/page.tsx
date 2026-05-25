import type { Metadata } from "next";
import { LocaleProvider } from "@/components/csat/locale-context";
import { DemoProvider } from "@/components/csat/demo-context";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhatsAppFab } from "@/components/csat/WhatsAppFab";
import { StickyCta } from "@/components/csat/StickyCta";
import {
  Hero,
  ProblemSection,
  SolutionBridge,
  DashboardSection,
  SurveyUxSection,
  LeaderboardSection,
  RecoverySection,
  ScoringSection,
  VerticalsSection,
  HowItWorksSection,
  IntegrationsSection,
  ProofSection,
  FaqSection,
  FinalCta,
  SiteFooter,
} from "@/components/csat/sections";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "WhatsApp CSAT Surveys, Automated",
  description:
    "Auto-send CSAT surveys after every WhatsApp chat. Live dashboard, agent leaderboard, daily recovery list. Arabic + English.",
};

const SITE_URL = "https://azeer.ai";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Azeer",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
    },
    {
      "@type": "Product",
      name: "Azeer CSAT",
      description:
        "WhatsApp-native customer satisfaction surveys with a live dashboard, agent leaderboard, and an automated recovery workflow.",
      brand: { "@type": "Brand", name: "Azeer" },
      category: "Customer experience software",
      url: `${SITE_URL}/features/csat`,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        price: "0",
        description: "Included in all paid Azeer plans.",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: dict.en.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CsatPage() {
  return (
    <LocaleProvider>
      <DemoProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main>
          <Hero />
          <ProblemSection />
          <SolutionBridge />
          <DashboardSection />
          <SurveyUxSection />
          <LeaderboardSection />
          <RecoverySection />
          <ScoringSection />
          <VerticalsSection />
          <HowItWorksSection />
          <IntegrationsSection />
          <ProofSection />
          <FaqSection />
          <FinalCta />
        </main>
        <SiteFooter />
        <StickyCta />
        <WhatsAppFab />
      </DemoProvider>
    </LocaleProvider>
  );
}
