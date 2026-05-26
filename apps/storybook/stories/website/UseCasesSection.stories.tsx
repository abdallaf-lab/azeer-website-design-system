import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HeartPulse,
  Headphones,
  ShoppingCart,
  Stethoscope,
  Store,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { UseCasesSection } from "@azeer/website-ui";

const meta: Meta<typeof UseCasesSection> = {
  title: "Website/UseCases/UseCasesSection",
  component: UseCasesSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof UseCasesSection>;

/**
 * Token-only placeholder visual for Storybook. Production should pass real
 * product screenshots/videos via the `visual` prop on each tab.
 */
function PlaceholderVisual({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="relative size-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--brand-primary)_18%,transparent),transparent_70%)]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="rounded-2xl border border-border-subtle bg-bg-default p-4 shadow-elev-2">
          <Icon className="size-12 text-accent-text" aria-hidden="true" />
        </div>
        <span className="text-mkt-body-sm font-medium text-content-emphasis">{label}</span>
        <span className="text-mkt-caption text-content-muted">
          placeholder — replace with real product screenshot
        </span>
      </div>
    </div>
  );
}

const defaultTabs = [
  {
    id: "ecommerce",
    name: "E-commerce Brands",
    icon: <ShoppingCart />,
    title: "Recover abandoned carts on autopilot",
    description:
      "Azeer detects abandoned carts in your Salla or Zid store, sends personalized WhatsApp reminders with discount codes, and tracks recovery — all without your team lifting a finger. Brands recover 35–40% of abandoned revenue.",
    learnMoreLink: { href: "/use-cases/ecommerce" },
    visual: <PlaceholderVisual icon={ShoppingCart} label="E-commerce" />,
    testimonials: [
      {
        id: "ecom-1",
        quote: "Cart recovery jumped 38% in our first month. Best ROI of any tool we've adopted.",
        author: "Founder",
        role: "Bayt Al-Sweet",
      },
      {
        id: "ecom-2",
        quote: "Our team stopped firefighting WhatsApp DMs. AI handles 70% of the routine asks.",
        author: "Operations Lead",
        role: "NoorTech Beauty",
      },
      {
        id: "ecom-3",
        quote: "Setup took 2 hours. Within a week, our retention metrics transformed.",
        author: "Co-founder",
        role: "Asateer Fashion",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare Clinics",
    icon: <HeartPulse />,
    title: "Cut no-shows by 38% across your clinic",
    description:
      "Azeer confirms appointments via WhatsApp, sends prep info, and handles rescheduling — automatically. Dental, dermatology, and multi-specialty clinics see no-show rates drop and slot utilization rise without adding staff.",
    learnMoreLink: { href: "/use-cases/healthcare" },
    visual: <PlaceholderVisual icon={HeartPulse} label="Healthcare" />,
    testimonials: [
      {
        id: "hc-1",
        quote:
          "No-shows dropped from 22% to 14% in 6 weeks. Effectively added 8 patients per week per clinic.",
        author: "Practice Manager",
        role: "Andalusia Dental Group",
      },
      {
        id: "hc-2",
        quote: "Patients prefer WhatsApp over calls. Our front desk reclaimed 3 hours per day.",
        author: "Director",
        role: "Sahara Wellness Clinics",
      },
      {
        id: "hc-3",
        quote: "HIPAA-ready out of the box. Our compliance audit went smoothly.",
        author: "IT Lead",
        role: "Riyadh Medical Network",
      },
    ],
  },
  {
    id: "sales",
    name: "Sales Teams",
    icon: <TrendingUp />,
    title: "Qualify leads while you sleep",
    description:
      "Azeer's AI agents engage inbound WhatsApp leads 24/7, qualify them with custom criteria, and hand off hot prospects to your sales team with full context. Convert more conversations into pipeline.",
    learnMoreLink: { href: "/use-cases/sales" },
    visual: <PlaceholderVisual icon={TrendingUp} label="Sales" />,
    testimonials: [
      {
        id: "sales-1",
        quote:
          "We qualify 3x more leads per week with zero added headcount. Sales loves the context handoffs.",
        author: "Sales Director",
        role: "Tamkeen Holdings",
      },
      {
        id: "sales-2",
        quote: "AI catches leads we'd miss at 11pm. Pipeline up 45% YoY.",
        author: "VP Sales",
        role: "GulfTech Solutions",
      },
    ],
  },
  {
    id: "support",
    name: "Customer Support",
    icon: <Headphones />,
    title: "Handle 70% of tickets automatically",
    description:
      "Azeer's AI agents resolve FAQs, track orders, process returns, and escalate complex cases — across WhatsApp, email, voice, and SMS. Your team focuses on the 30% that genuinely needs human judgment.",
    learnMoreLink: { href: "/use-cases/support" },
    visual: <PlaceholderVisual icon={Headphones} label="Support" />,
    testimonials: [
      {
        id: "sup-1",
        quote: "Support volume tripled. Headcount didn't. AI handles the repetitive 70%.",
        author: "Head of CX",
        role: "Salla Plus",
      },
      {
        id: "sup-2",
        quote: "Bilingual responses in Arabic and English without translation lag.",
        author: "Support Manager",
        role: "Zid Merchants",
      },
    ],
  },
];

export const Default: Story = {
  name: "Default — 4 tabs",
  render: () => <UseCasesSection tabs={defaultTabs} />,
};

export const EcommerceFocused: Story = {
  name: "E-commerce-focused (3 variants)",
  render: () => (
    <UseCasesSection
      sectionHeader={{ title: "For e-commerce brands" }}
      heroTitle="Built for Salla, Zid, and direct-to-consumer brands"
      tabs={[
        {
          id: "b2c",
          name: "B2C Brands",
          icon: <Store />,
          title: "Recover abandoned carts on autopilot",
          description:
            "Personalized WhatsApp follow-ups with timed discount codes. Brands recover 35–40% of abandoned revenue.",
          learnMoreLink: { href: "/use-cases/ecommerce/b2c" },
          visual: <PlaceholderVisual icon={Store} label="B2C Brands" />,
          testimonials: defaultTabs[0].testimonials,
        },
        {
          id: "sme",
          name: "SME Merchants",
          icon: <ShoppingCart />,
          title: "Scale support without scaling headcount",
          description:
            "AI handles 70% of order-status and refund questions; your team handles the rest in one inbox.",
          learnMoreLink: { href: "/use-cases/ecommerce/sme" },
          visual: <PlaceholderVisual icon={ShoppingCart} label="SME Merchants" />,
          testimonials: defaultTabs[3].testimonials,
        },
        {
          id: "marketplace",
          name: "Marketplace Sellers",
          icon: <TrendingUp />,
          title: "Multi-store conversations, one workspace",
          description:
            "Sell on Salla AND Zid AND your own site? Azeer threads every channel + every store into one inbox.",
          learnMoreLink: { href: "/use-cases/ecommerce/marketplace" },
          visual: <PlaceholderVisual icon={TrendingUp} label="Marketplace" />,
        },
      ]}
    />
  ),
};

export const HealthcareFocused: Story = {
  name: "Healthcare-focused (3 variants)",
  render: () => (
    <UseCasesSection
      sectionHeader={{ title: "For healthcare clinics" }}
      heroTitle="HIPAA-ready conversations for dental, specialty, and dermatology clinics"
      tabs={[
        {
          id: "dental",
          name: "Dental Clinics",
          icon: <Stethoscope />,
          title: "Cut no-shows across every chair",
          description:
            "WhatsApp confirmations, 24h reminders, and post-visit follow-ups. No-shows drop, utilization rises.",
          learnMoreLink: { href: "/use-cases/healthcare/dental" },
          visual: <PlaceholderVisual icon={Stethoscope} label="Dental" />,
          testimonials: defaultTabs[1].testimonials,
        },
        {
          id: "specialty",
          name: "Multi-specialty",
          icon: <HeartPulse />,
          title: "Route patients to the right doctor, automatically",
          description:
            "AI triages inbound messages by symptom and routes to the right specialist's schedule — no front-desk lift.",
          learnMoreLink: { href: "/use-cases/healthcare/specialty" },
          visual: <PlaceholderVisual icon={HeartPulse} label="Multi-specialty" />,
        },
        {
          id: "derm",
          name: "Dermatology",
          icon: <HeartPulse />,
          title: "Pre-visit prep that drops walk-out rates",
          description:
            "Aftercare instructions over WhatsApp + reminder workflows tuned for cosmetic procedures.",
          learnMoreLink: { href: "/use-cases/healthcare/dermatology" },
          visual: <PlaceholderVisual icon={HeartPulse} label="Dermatology" />,
        },
      ]}
    />
  ),
};

export const TwoTabs: Story = {
  name: "Two tabs",
  render: () => <UseCasesSection tabs={defaultTabs.slice(0, 2)} />,
};

export const NoAutoRotation: Story = {
  name: "No auto-rotation (manual nav)",
  render: () => <UseCasesSection tabs={defaultTabs} autoRotateInterval={0} />,
};

export const WithoutTestimonials: Story = {
  name: "Without testimonials",
  render: () => <UseCasesSection tabs={defaultTabs} showTestimonials={false} />,
};

export const ReducedMotion: Story = {
  name: "Reduced motion (no rotation, static testimonials)",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, tab auto-rotation is disabled (manual nav only) and TestimonialStack renders cards at their initial stacked positions without animation. Toggle your OS setting to verify.",
      },
    },
  },
  render: () => <UseCasesSection tabs={defaultTabs} />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <UseCasesSection
        sectionHeader={{
          title: "حالات الاستخدام",
          description: "طرق عملية يُمكّن بها أزير الفرق التي تتعامل مباشرة مع العملاء.",
        }}
        heroTitle="اكتشف كيف يقود أزير النجاح لكل فريق"
        tabs={[
          {
            id: "ecommerce",
            name: "تجارة إلكترونية",
            icon: <ShoppingCart />,
            title: "استرجع السلال المتروكة تلقائياً",
            description:
              "يكتشف أزير السلال المتروكة في متجر سلة أو زد، ويرسل تذكيرات مخصصة عبر واتساب مع أكواد خصم، ويتتبع الاسترداد — كل ذلك دون أن يحرّك فريقك ساكناً.",
            learnMoreLink: { label: "اعرف المزيد", href: "/use-cases/ecommerce" },
            visual: <PlaceholderVisual icon={ShoppingCart} label="تجارة إلكترونية" />,
            testimonials: [
              {
                id: "ar-ecom-1",
                quote: "ارتفع استرداد السلال بنسبة 38% في الشهر الأول. أفضل عائد على الاستثمار.",
                author: "المؤسس",
                role: "بيت الحلويات",
              },
              {
                id: "ar-ecom-2",
                quote: "توقف فريقنا عن المعاناة مع واتساب. الذكاء الاصطناعي يتولى 70% من الأسئلة.",
                author: "مدير العمليات",
                role: "نور تك بيوتي",
              },
            ],
          },
          {
            id: "healthcare",
            name: "عيادات",
            icon: <HeartPulse />,
            title: "خفّض الغياب بنسبة 38% في عيادتك",
            description:
              "يؤكد أزير المواعيد عبر واتساب ويُرسل معلومات التحضير ويتولى إعادة الجدولة تلقائياً.",
            learnMoreLink: { label: "اعرف المزيد", href: "/use-cases/healthcare" },
            visual: <PlaceholderVisual icon={HeartPulse} label="عيادات" />,
            testimonials: [
              {
                id: "ar-hc-1",
                quote: "انخفض الغياب من 22% إلى 14% خلال 6 أسابيع.",
                author: "مدير الممارسة",
                role: "مجموعة الأندلس لطب الأسنان",
              },
            ],
          },
          {
            id: "sales",
            name: "مبيعات",
            icon: <TrendingUp />,
            title: "تأهيل العملاء المحتملين بينما أنت نائم",
            description:
              "وكلاء الذكاء الاصطناعي يتفاعلون مع العملاء المحتملين على واتساب 24/7 ويسلّمونهم لفريقك مع السياق الكامل.",
            learnMoreLink: { label: "اعرف المزيد", href: "/use-cases/sales" },
            visual: <PlaceholderVisual icon={TrendingUp} label="مبيعات" />,
          },
          {
            id: "support",
            name: "دعم",
            icon: <Headphones />,
            title: "تعامل مع 70% من التذاكر تلقائياً",
            description: "وكلاء الذكاء الاصطناعي يحلّون الأسئلة الشائعة ويتتبعون الطلبات.",
            learnMoreLink: { label: "اعرف المزيد", href: "/use-cases/support" },
            visual: <PlaceholderVisual icon={Headphones} label="دعم" />,
          },
        ]}
      />
    </div>
  ),
};
