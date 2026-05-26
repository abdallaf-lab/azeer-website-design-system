import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeaturesBentoGrid } from "@azeer/website-ui";
import { Bell, MessageSquare, Sparkles } from "lucide-react";

const meta: Meta<typeof FeaturesBentoGrid> = {
  title: "Website/Features/FeaturesBentoGrid",
  component: FeaturesBentoGrid,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof FeaturesBentoGrid>;

export const Default: Story = {
  name: "Default — 5-cell bento",
  render: () => <FeaturesBentoGrid />,
};

export const CustomFeatures: Story = {
  name: "Custom features (3 cells)",
  render: () => (
    <FeaturesBentoGrid
      sectionHeader={{
        title: "Three pillars",
        description: "Pick any subset of the platform that matters to your team today.",
      }}
      features={[
        {
          title: "Unified Inbox",
          description: "Every channel in one threaded view.",
          visual: (
            <div className="flex h-57 items-center justify-center text-content-muted">
              <MessageSquare className="size-16" aria-hidden="true" />
            </div>
          ),
        },
        {
          title: "AI Assist",
          description: "Drafted replies you approve in a tap.",
          visual: (
            <div className="flex h-57 items-center justify-center text-content-muted">
              <Sparkles className="size-16" aria-hidden="true" />
            </div>
          ),
        },
        {
          title: "Smart Reminders",
          description: "Confirmations and follow-ups, automated.",
          visual: (
            <div className="flex h-57 items-center justify-center text-content-muted">
              <Bell className="size-16" aria-hidden="true" />
            </div>
          ),
        },
      ]}
    />
  ),
};

export const EcommerceFocused: Story = {
  name: "E-commerce focused",
  render: () => (
    <FeaturesBentoGrid
      sectionHeader={{
        title: "Built for Salla & Zid",
        description:
          "Cart recovery, order updates, and post-purchase journeys — pre-built for the GCC's leading e-commerce platforms.",
      }}
    />
  ),
};

export const HealthcareFocused: Story = {
  name: "Healthcare focused",
  render: () => (
    <FeaturesBentoGrid
      sectionHeader={{
        title: "Built for clinics",
        description:
          "Appointment confirmations, 24h reminders, and post-visit follow-ups — HIPAA-ready, in Arabic and English.",
      }}
    />
  ),
};

export const NoCanvas: Story = {
  name: "Without header canvas",
  parameters: {
    docs: {
      description: {
        story: "The `sectionHeader` prop forwards `showCanvas={false}` to disable the flicker.",
      },
    },
  },
  render: () => (
    <FeaturesBentoGrid
      sectionHeader={{
        title: "Features",
        description: "Same content, no flicker — for pages where adjacent imagery competes.",
        showCanvas: false,
      }}
    />
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, the header canvas is omitted; visuals are static by design (Rule #16, no continuous animation). Toggle your OS setting to verify.",
      },
    },
  },
  render: () => <FeaturesBentoGrid />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <FeaturesBentoGrid
        sectionHeader={{
          title: "المزايا",
          description:
            "ارفع كفاءة فريقك بمساحة عمل مدعومة بالذكاء الاصطناعي توحّد كل محادثة مع عملائك.",
        }}
        features={[
          {
            title: "توحيد القنوات",
            description:
              "وحّد واتساب والمكالمات والرسائل النصية والبريد الإلكتروني في مساحة عمل واحدة مدعومة بالذكاء الاصطناعي.",
            visual: (
              <div className="flex h-57 items-center justify-center text-content-muted">
                <MessageSquare className="size-16" aria-hidden="true" />
              </div>
            ),
          },
          {
            title: "وكلاء الذكاء الاصطناعي",
            description:
              "وكلاء يجيبون على الأسئلة الشائعة ويصعّدون الاستفسارات المعقدة — على مدار الساعة بالعربية والإنجليزية.",
            visual: (
              <div className="flex h-57 items-center justify-center text-content-muted">
                <Sparkles className="size-16" aria-hidden="true" />
              </div>
            ),
          },
          {
            title: "أتمتة سير العمل",
            description:
              "صمم رحلات تستعيد السلال المتروكة وتؤكد المواعيد وتعيد إشراك العملاء تلقائياً.",
            visual: (
              <div className="flex h-57 items-center justify-center text-content-muted">
                <Bell className="size-16" aria-hidden="true" />
              </div>
            ),
          },
          {
            title: "قوالب متعددة الفئات",
            description:
              "قوالب جاهزة للتجارة الإلكترونية (سلة، زد) والرعاية الصحية (مجموعات العيادات، سلاسل الأسنان).",
            visual: (
              <div className="flex h-57 items-center justify-center text-content-muted">
                <Sparkles className="size-16" aria-hidden="true" />
              </div>
            ),
            gridSpan: "wide" as const,
          },
          {
            title: "الامتثال والثقة",
            description:
              "متوافق مع GDPR وجاهز لـ HIPAA للعيادات الصحية، مع سجلات تدقيق كاملة وإدارة موافقة العملاء.",
            visual: (
              <div className="flex h-57 items-center justify-center text-content-muted">
                <MessageSquare className="size-16" aria-hidden="true" />
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};
