import type { Meta, StoryObj } from "@storybook/react-vite";
import { CTASection, type CTAStat } from "@azeer/website-ui";
import { ArrowUpRight, MessageSquare } from "lucide-react";

const meta: Meta<typeof CTASection> = {
  title: "Website/CTA/CTASection",
  component: CTASection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof CTASection>;

const ecomStats: CTAStat[] = [
  {
    id: "recovery",
    value: "38%",
    description: "average increase in cart recovery after switching to Azeer",
  },
  {
    id: "agent",
    value: "2.4x",
    description: "more conversations handled per agent with AI assistance",
  },
  {
    id: "response",
    value: "<2 min",
    description: "average response time across WhatsApp and other channels",
  },
];

const ecomPrimary = { label: "Start free trial", href: "/signup", icon: ArrowUpRight };
const ecomSecondary = { label: "Talk to sales", href: "/contact", icon: MessageSquare };

export const Default: Story = {
  name: "Default — e-commerce",
  render: () => (
    <CTASection primaryCTA={ecomPrimary} secondaryCTA={ecomSecondary} stats={ecomStats} />
  ),
};

export const HealthcareFocused: Story = {
  name: "Healthcare-focused",
  render: () => (
    <CTASection
      title="Ready to fill your clinic's calendar?"
      description="Azeer handles appointment confirmations, 24h reminders, and post-visit follow-ups over WhatsApp — HIPAA-ready and bilingual out of the box."
      primaryCTA={{ label: "Book a demo", href: "/demo", icon: ArrowUpRight }}
      secondaryCTA={{ label: "Talk to sales", href: "/contact", icon: MessageSquare }}
      stats={[
        { id: "noshow", value: "38%", description: "fewer no-shows across pilot clinics" },
        { id: "engagement", value: "2.4x", description: "patient engagement on reminders" },
        { id: "compliance", value: "HIPAA", description: "ready for healthcare deployments" },
      ]}
    />
  ),
};

export const WithSectionHeader: Story = {
  name: "With SectionHeader label",
  render: () => (
    <CTASection
      primaryCTA={ecomPrimary}
      secondaryCTA={ecomSecondary}
      stats={ecomStats}
      showSectionHeader
      sectionHeader={{
        title: "Get started",
        description: "Start free or talk to our team about a custom rollout.",
      }}
    />
  ),
};

export const NoSecondaryCTA: Story = {
  name: "Primary CTA only (focused conversion)",
  render: () => (
    <CTASection primaryCTA={ecomPrimary} secondaryCTA={null} stats={ecomStats} />
  ),
};

export const FourStats: Story = {
  name: "Four stats",
  render: () => (
    <CTASection
      primaryCTA={ecomPrimary}
      secondaryCTA={ecomSecondary}
      stats={[
        ...ecomStats,
        {
          id: "scale",
          value: "100K+",
          description: "WhatsApp messages handled monthly across pilot brands",
        },
      ]}
    />
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion",
  parameters: {
    docs: {
      description: {
        story:
          "The CTASection is a Server Component with no decorative motion of its own. Under `prefers-reduced-motion: reduce`, the inner SectionHeader canvas (when shown) is omitted; everything else renders identically.",
      },
    },
  },
  render: () => (
    <CTASection
      primaryCTA={ecomPrimary}
      secondaryCTA={ecomSecondary}
      stats={ecomStats}
      showSectionHeader
    />
  ),
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <CTASection
        title="هل أنت جاهز لتحويل المحادثات إلى إيرادات؟"
        description="ابدأ تجربتك المجانية لمدة ١٤ يوماً — دون الحاجة إلى بطاقة ائتمان. اربط متجرك في سلة أو زد خلال دقائق، أو تواصل مع فريقنا لإطلاق مخصّص لعلامتك."
        primaryCTA={{ label: "ابدأ تجربة مجانية", href: "/signup", icon: ArrowUpRight }}
        secondaryCTA={{ label: "تواصل مع المبيعات", href: "/contact", icon: MessageSquare }}
        stats={[
          {
            id: "recovery",
            value: "38%",
            description: "زيادة متوسطة في استرداد السلال بعد التحول إلى أزير",
          },
          {
            id: "agent",
            value: "2.4x",
            description: "محادثات يديرها الموظف الواحد بمساعدة الذكاء الاصطناعي",
          },
          {
            id: "response",
            value: "<2 min",
            description: "متوسط وقت الرد عبر واتساب والقنوات الأخرى",
          },
        ]}
      />
    </div>
  ),
};
