import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Calendar,
  Cloud,
  Database,
  Camera,
  MessageCircle,
  Phone,
  PieChart,
  ShoppingBag,
  ShoppingCart,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { IntegrationsSection, type IntegrationsSectionItem } from "@azeer/website-ui";

const meta: Meta<typeof IntegrationsSection> = {
  title: "Website/Integrations/IntegrationsSection",
  component: IntegrationsSection,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof IntegrationsSection>;

/** Token-only logo placeholder — replace with a real `currentColor` SVG in production. */
function Placeholder({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="size-5 text-accent-text" aria-hidden="true" />;
}

const defaultIntegrations: IntegrationsSectionItem[] = [
  {
    id: "salla",
    name: "Salla",
    logo: <Placeholder icon={ShoppingBag} />,
    category: "E-commerce",
    description:
      "Connect your Salla store. Sync orders, abandoned carts, and customer data automatically — all updates flow through WhatsApp.",
    link: { href: "/integrations/salla" },
    featured: true,
  },
  {
    id: "zid",
    name: "Zid",
    logo: <Placeholder icon={Store} />,
    category: "E-commerce",
    description:
      "Recover abandoned carts and send order updates via WhatsApp from your Zid store. Full bilingual support.",
    link: { href: "/integrations/zid" },
    featured: true,
  },
  {
    id: "shopify",
    name: "Shopify",
    logo: <Placeholder icon={ShoppingCart} />,
    category: "E-commerce",
    description:
      "Bring your Shopify products into WhatsApp. Orders, fulfillment, and customer service in one place.",
    link: { href: "/integrations/shopify" },
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    logo: <Placeholder icon={MessageCircle} />,
    category: "Messaging",
    description:
      "Native WhatsApp integration via Meta's official Cloud API. Verified business profile, broadcasts, and template messages.",
    link: { href: "/integrations/whatsapp" },
  },
  {
    id: "instagram",
    name: "Camera DM",
    logo: <Placeholder icon={Camera} />,
    category: "Messaging",
    description:
      "Manage Camera conversations alongside WhatsApp. One inbox for all your customer messages.",
    link: { href: "/integrations/instagram" },
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    logo: <Placeholder icon={Database} />,
    category: "CRM & Sales",
    description:
      "Sync customer interactions to Zoho automatically. Conversation history, deal updates, and pipeline insights stay in one place.",
    link: { href: "/integrations/zoho" },
  },
  {
    id: "hubspot",
    name: "HubSpot",
    logo: <Placeholder icon={PieChart} />,
    category: "CRM & Sales",
    description:
      "Two-way sync with HubSpot contacts and deals. Conversations enrich your CRM with WhatsApp insights.",
    link: { href: "/integrations/hubspot" },
  },
  {
    id: "salesforce",
    name: "Salesforce",
    logo: <Placeholder icon={Cloud} />,
    category: "CRM & Sales",
    description:
      "Enterprise-grade Salesforce integration. Custom fields, workflows, and reports — all from your WhatsApp conversations.",
    link: { href: "/integrations/salesforce" },
  },
  {
    id: "twilio",
    name: "Twilio Voice",
    logo: <Placeholder icon={Phone} />,
    category: "Healthcare & Voice",
    description:
      "Voice agents for clinics that need phone + WhatsApp coverage. AI handles routine calls in Arabic and English.",
    link: { href: "/integrations/twilio" },
  },
  {
    id: "calendly",
    name: "Calendly",
    logo: <Placeholder icon={Calendar} />,
    category: "Healthcare & Voice",
    description:
      "Patients and clients book appointments via WhatsApp. Calendar sync, reminders, and rescheduling — all hands-free.",
    link: { href: "/integrations/calendly" },
  },
];

export const Default: Story = {
  name: "Default — 10 integrations, 4 categories",
  render: () => <IntegrationsSection integrations={defaultIntegrations} />,
};

export const Lean: Story = {
  name: "Lean (4 integrations)",
  render: () => <IntegrationsSection integrations={defaultIntegrations.slice(0, 4)} />,
};

export const EcommerceFocused: Story = {
  name: "E-commerce focused",
  render: () => (
    <IntegrationsSection
      sectionHeader={{ title: "E-commerce integrations" }}
      heroTitle="Built for Salla, Zid, and Shopify"
      heroDescription="Cart recovery, order updates, and post-purchase journeys — pre-built for the GCC's leading e-commerce platforms."
      integrations={defaultIntegrations.filter((i) => i.category === "E-commerce")}
    />
  ),
};

export const HealthcareFocused: Story = {
  name: "Healthcare focused",
  render: () => (
    <IntegrationsSection
      sectionHeader={{ title: "Clinic integrations" }}
      heroTitle="Connect your clinic stack"
      heroDescription="Voice + WhatsApp + scheduling — Azeer connects with the tools clinic operators already use."
      integrations={[
        defaultIntegrations.find((i) => i.id === "twilio")!,
        defaultIntegrations.find((i) => i.id === "calendly")!,
        defaultIntegrations.find((i) => i.id === "whatsapp")!,
        {
          ...defaultIntegrations.find((i) => i.id === "zoho")!,
          category: "Healthcare & Voice",
          description:
            "Sync patient interactions to Zoho automatically — appointment status, follow-up flags, and post-visit notes.",
        },
      ]}
    />
  ),
};

export const GroupedByCategory: Story = {
  name: "Grouped by category",
  render: () => <IntegrationsSection integrations={defaultIntegrations} groupByCategory />,
};

export const NoSectionHeader: Story = {
  name: "No SectionHeader (hero is primary)",
  render: () => (
    <IntegrationsSection integrations={defaultIntegrations} showSectionHeader={false} />
  ),
};

export const NoHeroCTA: Story = {
  name: "No hero CTA (cards-only)",
  render: () => <IntegrationsSection integrations={defaultIntegrations} showHeroCTA={false} />,
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <IntegrationsSection
        sectionHeader={{
          title: "التكاملات",
          description: "أزير يتصل بالأدوات التي يستخدمها فريقك بالفعل.",
        }}
        heroTitle="اربط أزير ببقية أدواتك"
        heroDescription="تكاملات جاهزة للتجارة الإلكترونية وإدارة علاقات العملاء والمراسلة والمواعيد — إضافةً إلى واجهة برمجية لكل شيء آخر."
        heroCTA={{ label: "عرض كل التكاملات", href: "/integrations" }}
        integrations={[
          {
            id: "salla",
            name: "سلة",
            logo: <Placeholder icon={ShoppingBag} />,
            category: "تجارة إلكترونية",
            description:
              "اربط متجرك في سلة. مزامنة الطلبات والسلال المتروكة وبيانات العملاء تلقائياً — كل التحديثات تتدفق عبر واتساب.",
            link: { label: "اعرف المزيد", href: "/integrations/salla" },
            featured: true,
          },
          {
            id: "zid",
            name: "زد",
            logo: <Placeholder icon={Store} />,
            category: "تجارة إلكترونية",
            description:
              "استرجع السلال المتروكة وأرسل تحديثات الطلبات عبر واتساب من متجرك في زد. دعم كامل بالعربية والإنجليزية.",
            link: { label: "اعرف المزيد", href: "/integrations/zid" },
            featured: true,
          },
          {
            id: "shopify",
            name: "Shopify",
            logo: <Placeholder icon={ShoppingCart} />,
            category: "تجارة إلكترونية",
            description:
              "اجلب منتجات Shopify إلى واتساب. الطلبات والتنفيذ وخدمة العملاء في مكان واحد.",
            link: { label: "اعرف المزيد", href: "/integrations/shopify" },
          },
          {
            id: "whatsapp",
            name: "واتساب للأعمال API",
            logo: <Placeholder icon={MessageCircle} />,
            category: "مراسلة",
            description:
              "تكامل واتساب الأصلي عبر واجهة Meta السحابية الرسمية. ملف عمل موثّق وقدرة بث ورسائل قوالب.",
            link: { label: "اعرف المزيد", href: "/integrations/whatsapp" },
          },
          {
            id: "instagram",
            name: "رسائل إنستغرام",
            logo: <Placeholder icon={Camera} />,
            category: "مراسلة",
            description:
              "أدر محادثات إنستغرام بجانب واتساب. صندوق وارد واحد لكل رسائل عملائك.",
            link: { label: "اعرف المزيد", href: "/integrations/instagram" },
          },
          {
            id: "zoho",
            name: "Zoho CRM",
            logo: <Placeholder icon={Database} />,
            category: "إدارة علاقات العملاء",
            description:
              "مزامنة تفاعلات العملاء مع Zoho تلقائياً. سجل المحادثات، تحديثات الصفقات، ورؤى خط الأنابيب.",
            link: { label: "اعرف المزيد", href: "/integrations/zoho" },
          },
          {
            id: "hubspot",
            name: "HubSpot",
            logo: <Placeholder icon={PieChart} />,
            category: "إدارة علاقات العملاء",
            description:
              "مزامنة ثنائية الاتجاه مع جهات اتصال وصفقات HubSpot. المحادثات تُثري نظام إدارة العملاء.",
            link: { label: "اعرف المزيد", href: "/integrations/hubspot" },
          },
          {
            id: "salesforce",
            name: "Salesforce",
            logo: <Placeholder icon={Cloud} />,
            category: "إدارة علاقات العملاء",
            description:
              "تكامل Salesforce على مستوى المؤسسات. حقول مخصصة، سير عمل، وتقارير — كلها من محادثات واتساب.",
            link: { label: "اعرف المزيد", href: "/integrations/salesforce" },
          },
          {
            id: "twilio",
            name: "Twilio Voice",
            logo: <Placeholder icon={Phone} />,
            category: "رعاية صحية ومكالمات",
            description:
              "وكلاء صوتيون للعيادات التي تحتاج تغطية الهاتف + واتساب. الذكاء الاصطناعي يتعامل مع المكالمات الروتينية بالعربية والإنجليزية.",
            link: { label: "اعرف المزيد", href: "/integrations/twilio" },
          },
          {
            id: "calendly",
            name: "Calendly",
            logo: <Placeholder icon={Calendar} />,
            category: "رعاية صحية ومكالمات",
            description:
              "يحجز المرضى والعملاء المواعيد عبر واتساب. مزامنة التقويم والتذكيرات وإعادة الجدولة — كلها بلا تدخل يدوي.",
            link: { label: "اعرف المزيد", href: "/integrations/calendly" },
          },
        ]}
      />
    </div>
  ),
};
