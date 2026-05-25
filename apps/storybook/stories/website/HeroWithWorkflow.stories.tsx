import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroWithWorkflow } from "@azeer/website-ui";
import {
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle,
  DollarSign,
  HeartPulse,
  MessageSquare,
  Percent,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const meta: Meta<typeof HeroWithWorkflow> = {
  title: "Website/Hero/HeroWithWorkflow",
  component: HeroWithWorkflow,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "The full Path-C hero — SectionRails + DottedCanvas + staggered entrances + a WorkflowItem chain.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroWithWorkflow>;

const ecommerceWorkflow = [
  {
    type: "input" as const,
    icon: <ShoppingCart />,
    title: "Cart abandoned",
    description: "Customer left 2 items 15 minutes ago.",
    time: "0.0 sec",
  },
  {
    type: "action" as const,
    icon: <MessageSquare />,
    title: "WhatsApp reminder sent",
    description: "AI-personalized message with a 10% off code.",
    time: "12 sec",
    aiAssisted: true,
    showBeam: true,
  },
  {
    type: "output" as const,
    icon: <CheckCircle />,
    title: "Cart recovered",
    description: "Customer completed checkout. +SAR 285 recovered.",
    time: "2 min",
  },
];

const healthcareWorkflow = [
  {
    type: "input" as const,
    icon: <Calendar />,
    title: "Appointment booked",
    description: "Patient confirmed visit for Tuesday 2 PM.",
    time: "0.0 sec",
  },
  {
    type: "action" as const,
    icon: <Bell />,
    title: "24h reminder sent",
    description: "WhatsApp with location, doctor name, and prep info.",
    time: "1 day",
    aiAssisted: true,
  },
  {
    type: "output" as const,
    icon: <ShieldCheck />,
    title: "No-show prevented",
    description: "Patient confirmed attendance. Slot saved.",
    time: "2 min",
  },
];

export const Default: Story = {
  name: "Default — e-commerce (cart recovery)",
  render: () => <HeroWithWorkflow workflow={ecommerceWorkflow} />,
};

export const Healthcare: Story = {
  render: () => (
    <HeroWithWorkflow
      eyebrowBadge={{
        icon: <HeartPulse className="size-4 text-accent-text" aria-hidden="true" />,
        label: "For healthcare teams",
        accent: true,
      }}
      title="Reduce no-shows by 38% across your clinics"
      description="Azeer sends WhatsApp confirmations, reminders, and prep info — so patients show up and your slots stay full."
      primaryCTA={{ label: "Book a demo", href: "/demo", icon: ArrowUpRight }}
      secondaryCTA={{ label: "See pricing", href: "/pricing", icon: DollarSign }}
      workflow={healthcareWorkflow}
    />
  ),
};

export const TwoStep: Story = {
  name: "Two-step workflow",
  render: () => (
    <HeroWithWorkflow
      title="From message to resolved — in one step"
      workflow={[
        {
          type: "input" as const,
          icon: <MessageSquare />,
          title: "New WhatsApp message",
          description: "A customer asks about their order.",
          time: "0.0 sec",
        },
        {
          type: "output" as const,
          icon: <CheckCircle />,
          title: "AI resolves & replies",
          description: "Answered and logged — no agent needed.",
          time: "8 sec",
          aiAssisted: true,
        },
      ]}
    />
  ),
};

export const WithFourSteps: Story = {
  name: "Four-step workflow (scalability)",
  parameters: {
    docs: {
      description: {
        story:
          "The component maps any 2–4 steps. Note: at four 330px cards the single row exceeds the 1280px rails on wide screens — a wrapped/cascade four-step layout is Stage-2B work.",
      },
    },
  },
  render: () => (
    <HeroWithWorkflow
      workflow={[
        {
          type: "input" as const,
          icon: <ShoppingCart />,
          title: "Cart abandoned",
          description: "Customer left 2 items 15 minutes ago.",
          time: "0.0 sec",
        },
        {
          type: "action" as const,
          icon: <MessageSquare />,
          title: "Reminder sent",
          description: "AI-personalized nudge with the cart contents.",
          time: "12 sec",
          aiAssisted: true,
        },
        {
          type: "action" as const,
          icon: <Percent />,
          title: "Discount offered",
          description: "A 10% code, sent after 1 hour with no reply.",
          time: "1 hr",
          aiAssisted: true,
          showBeam: true,
        },
        {
          type: "output" as const,
          icon: <CheckCircle />,
          title: "Cart recovered",
          description: "Customer completed checkout. +SAR 285 recovered.",
          time: "2 min",
        },
      ]}
    />
  ),
};

export const Spacious: Story = {
  name: "Spacious density",
  render: () => <HeroWithWorkflow density="spacious" workflow={ecommerceWorkflow} />,
};

export const NoDottedCanvas: Story = {
  name: "Without dotted canvas",
  render: () => <HeroWithWorkflow showDottedCanvas={false} workflow={ecommerceWorkflow} />,
};

export const NoSecondaryCTA: Story = {
  name: "Primary CTA only",
  render: () => <HeroWithWorkflow secondaryCTA={null} workflow={ecommerceWorkflow} />,
};

export const ReducedMotion: Story = {
  name: "Reduced motion (entrances skipped)",
  parameters: {
    docs: {
      description: {
        story:
          "Every entrance runs through MotionPreset, so under `prefers-reduced-motion: reduce` the headline/CTAs/cards appear instantly and the BorderBeam + ConnectorArrows render statically (arrows fully drawn). Toggle your OS setting to verify.",
      },
    },
  },
  render: () => <HeroWithWorkflow workflow={ecommerceWorkflow} />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <HeroWithWorkflow
        eyebrowBadge={{
          icon: <Sparkles className="size-4 text-accent-text" aria-hidden="true" />,
          label: "جديد · وكلاء الذكاء الاصطناعي",
          accent: true,
        }}
        title="حوّل كل محادثة إلى مبيعات مكتملة"
        description="أزير يجمع واتساب والصوت والرسائل النصية والبريد الإلكتروني ووسائل التواصل في مساحة عمل واحدة مدعومة بالذكاء الاصطناعي — ليرد فريقك أسرع ويبقى عملاؤك سعداء."
        primaryCTA={{ label: "ابدأ الآن", href: "/signup", icon: ArrowUpRight }}
        secondaryCTA={{ label: "اطّلع على الأسعار", href: "/pricing", icon: DollarSign }}
        workflow={[
          {
            type: "input" as const,
            icon: <ShoppingCart />,
            title: "السلة متروكة",
            description: "ترك العميل عنصرين في السلة قبل ١٥ دقيقة.",
            time: "٠٫٠ ثانية",
          },
          {
            type: "action" as const,
            icon: <MessageSquare />,
            title: "تذكير عبر واتساب",
            description: "رسالة مخصّصة مع كود خصم ١٠٪.",
            time: "١٢ ثانية",
            aiAssisted: true,
            showBeam: true,
          },
          {
            type: "output" as const,
            icon: <CheckCircle />,
            title: "السلة مستردة",
            description: "أتمّ العميل الدفع. +٢٨٥ ريال مستردة.",
            time: "دقيقتان",
          },
        ]}
      />
    </div>
  ),
};
