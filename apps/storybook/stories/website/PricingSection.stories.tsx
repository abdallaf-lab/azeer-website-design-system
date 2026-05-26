import type { Meta, StoryObj } from "@storybook/react-vite";
import { PricingSection, type PricingSectionPlan } from "@azeer/website-ui";

const meta: Meta<typeof PricingSection> = {
  title: "Website/Pricing/PricingSection",
  component: PricingSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

const azeerPlans: PricingSectionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams getting started with WhatsApp-led operations.",
    monthlyPrice: 99,
    yearlyPrice: 64,
    currency: "SAR",
    period: "user/month",
    features: [
      "Up to 3 team members",
      "WhatsApp + 1 additional channel",
      "Basic AI agent (FAQs only)",
      "100 conversations / month",
      "Email support",
    ],
    cta: { label: "Start free trial", href: "/signup?plan=starter", variant: "secondary" },
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing brands managing multi-channel customer revenue.",
    monthlyPrice: 299,
    yearlyPrice: 194,
    currency: "SAR",
    period: "user/month",
    features: [
      "Up to 10 team members",
      "All channels (WhatsApp, Voice, SMS, Email)",
      "Advanced AI agents with custom training",
      "Unlimited conversations",
      "Workflow automation (10 active journeys)",
      "Salla & Zid integrations",
      "Priority support",
    ],
    cta: { label: "Start free trial", href: "/signup?plan=growth", variant: "primary" },
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "scale",
    name: "Scale",
    description: "For enterprises with complex operations across verticals.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: "",
    period: "",
    customPriceLabel: "Contact sales",
    inheritanceLabel: "Everything in Growth, plus:",
    features: [
      "Unlimited team members",
      "Healthcare compliance (HIPAA-ready)",
      "Custom integrations & API access",
      "Dedicated success manager",
      "SLA + 24/7 support",
      "Multi-brand management",
    ],
    cta: { label: "Contact sales", href: "/contact-sales", variant: "primary" },
  },
];

export const Default: Story = {
  name: "Default — 3 plans, monthly",
  render: () => <PricingSection plans={azeerPlans} />,
};

export const MonthlyView: Story = {
  name: "Monthly view (explicit)",
  render: () => <PricingSection plans={azeerPlans} defaultBillingPeriod="monthly" />,
};

export const YearlyView: Story = {
  name: "Yearly view (discounted)",
  render: () => <PricingSection plans={azeerPlans} defaultBillingPeriod="yearly" />,
};

export const TwoPlans: Story = {
  name: "Two plans (Starter + Growth)",
  render: () => <PricingSection plans={azeerPlans.slice(0, 2)} />,
};

export const EnterpriseFocused: Story = {
  name: "Enterprise-focused (Scale highlighted)",
  parameters: {
    docs: {
      description: {
        story: "Tilts the visual emphasis toward the Scale plan + `customPriceLabel` pricing.",
      },
    },
  },
  render: () => (
    <PricingSection
      title="Plans built for the way enterprises run"
      description="Configurable to your compliance, integrations, and SLA needs."
      plans={[
        { ...azeerPlans[0], cta: { ...azeerPlans[0].cta, variant: "secondary" } },
        {
          ...azeerPlans[1],
          highlighted: false,
          badge: undefined,
          cta: { ...azeerPlans[1].cta, variant: "secondary" },
        },
        {
          ...azeerPlans[2],
          highlighted: true,
          badge: "Best value",
        },
      ]}
    />
  ),
};

export const NoBillingToggle: Story = {
  name: "No billing toggle (single-billing scenario)",
  render: () => <PricingSection plans={azeerPlans} showBillingToggle={false} />,
};

export const ReducedMotion: Story = {
  name: "Reduced motion (BorderBeam + canvas off)",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, the SectionHeader canvas is omitted and the highlighted plan's BorderBeam renders nothing. The toggle and prices still function — only decorative motion is removed. Toggle your OS setting to verify.",
      },
    },
  },
  render: () => <PricingSection plans={azeerPlans} />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <PricingSection
        sectionHeader={{
          title: "الأسعار",
          description: "خطط مرنة تواكب نمو إيراد محادثات عملائك.",
        }}
        title="خطط تنمو مع إيراداتك"
        description="اختر الخطة المناسبة لمرحلة فريقك اليوم — رقّ فقط عندما تتجاوز حدودها."
        plans={[
          {
            id: "starter",
            name: "مبتدئ",
            description: "للفرق الصغيرة التي تبدأ بعمليات تعتمد على واتساب.",
            monthlyPrice: 99,
            yearlyPrice: 64,
            currency: "ر.س",
            period: "مستخدم/شهر",
            features: [
              "حتى ٣ أعضاء في الفريق",
              "واتساب + قناة إضافية واحدة",
              "وكيل ذكاء اصطناعي أساسي",
              "١٠٠ محادثة شهرياً",
              "دعم عبر البريد",
            ],
            cta: { label: "ابدأ تجربة مجانية", href: "/signup", variant: "secondary" },
          },
          {
            id: "growth",
            name: "النمو",
            description: "للعلامات التجارية النامية التي تدير إيرادات متعددة القنوات.",
            monthlyPrice: 299,
            yearlyPrice: 194,
            currency: "ر.س",
            period: "مستخدم/شهر",
            features: [
              "حتى ١٠ أعضاء",
              "جميع القنوات (واتساب، مكالمات، رسائل، بريد)",
              "وكلاء ذكاء اصطناعي متقدمون",
              "محادثات غير محدودة",
              "أتمتة سير العمل (١٠ رحلات نشطة)",
              "تكاملات سلة وزد",
              "دعم ذو أولوية",
            ],
            cta: { label: "ابدأ تجربة مجانية", href: "/signup", variant: "primary" },
            highlighted: true,
            badge: "الأكثر شيوعاً",
          },
          {
            id: "scale",
            name: "المؤسسات",
            description: "للمؤسسات ذات العمليات المعقدة عبر القطاعات.",
            monthlyPrice: 0,
            yearlyPrice: 0,
            currency: "",
            period: "",
            customPriceLabel: "تواصل مع المبيعات",
            inheritanceLabel: "كل ما في النمو، بالإضافة إلى:",
            features: [
              "أعضاء غير محدودين",
              "جاهز لـ HIPAA للرعاية الصحية",
              "تكاملات مخصصة وواجهات API",
              "مدير نجاح مخصص",
              "اتفاقية مستوى خدمة + دعم على مدار الساعة",
              "إدارة علامات متعددة",
            ],
            cta: { label: "تواصل مع المبيعات", href: "/contact-sales", variant: "primary" },
          },
        ]}
      />
    </div>
  ),
};
