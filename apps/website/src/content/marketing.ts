import type {
  ComplianceItem,
  FAQItem,
  FeatureGridItem,
  IntegrationItem,
  LogoCloudItem,
  PricingPlan,
  Stat,
  Testimonial,
} from "@azeer/website-ui";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  BookOpen,
  FileText,
  Languages,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Plug,
  ShieldCheck,
  Workflow,
  Boxes,
  Zap,
} from "@/lib/icons";

export const stats: Stat[] = [
  { value: "2.4B+", label: "Messages routed", description: "across all channels in 2025" },
  { value: "99.99%", label: "Uptime SLA", description: "platform availability" },
  { value: "<30s", label: "Median first reply", description: "with AI-assisted routing" },
  { value: "60%", label: "Auto-resolved", description: "of repetitive questions" },
];

export const features: FeatureGridItem[] = [
  {
    icon: MessageSquare,
    title: "Unified inbox",
    description:
      "WhatsApp, Voice, SMS, email, and social land in one threaded workspace — no tab-switching.",
  },
  {
    icon: Bot,
    title: "AI agents",
    description:
      "Deflect repetitive questions and draft replies your team can send in one click.",
  },
  {
    icon: Workflow,
    title: "Automations",
    description:
      "Route, tag, and escalate with rules that respect SLAs and business hours.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track volume, CSAT, and team load with dashboards your ops team will actually use.",
  },
  {
    icon: Plug,
    title: "Integrations",
    description:
      "Sync with your CRM, helpdesk, and data warehouse so context follows the customer.",
  },
  {
    icon: Languages,
    title: "Arabic & RTL, first-class",
    description:
      "Fully mirrored layouts, IBM Plex Arabic typography, and bidi-safe IDs out of the box.",
  },
];

export const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo per seat",
    description: "For small teams getting organized across channels.",
    features: [
      "Up to 3 channels",
      "Shared inbox & assignments",
      "5,000 conversations / mo",
      "Email support",
    ],
    cta: { label: "Start free trial", href: "/signup?plan=starter" },
  },
  {
    name: "Growth",
    price: "$99",
    period: "/mo per seat",
    description: "For scaling support and sales teams.",
    featured: true,
    badge: "Most popular",
    features: [
      "Unlimited channels",
      "AI agents & assist",
      "50,000 conversations / mo",
      "Workflows & SLAs",
      "Priority support",
    ],
    cta: { label: "Start free trial", href: "/signup?plan=growth" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with security and scale needs.",
    features: [
      "SSO & SCIM",
      "Dedicated infrastructure",
      "Custom data residency",
      "99.99% uptime SLA",
      "Named CSM",
    ],
    cta: { label: "Talk to sales", href: "/contact-sales" },
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Which channels does Azeer support?",
    answer:
      "WhatsApp, Voice, SMS, email, Instagram, Messenger, and Telegram — all in one threaded inbox, with more added regularly.",
  },
  {
    question: "How does AI-assisted resolution work?",
    answer:
      "AI agents handle repetitive questions automatically and draft suggested replies for everything else. Your team stays in control and can edit before sending.",
  },
  {
    question: "Is Arabic and RTL fully supported?",
    answer:
      "Yes — RTL is a release gate, not an afterthought. Layouts mirror automatically, Arabic uses IBM Plex Sans Arabic, and IDs/phone numbers stay correctly bidi-isolated.",
  },
  {
    question: "Can I bring my own number?",
    answer:
      "You can port existing numbers or provision new ones in supported regions, including WhatsApp Business API senders.",
  },
  {
    question: "What does pricing include?",
    answer:
      "Every plan includes the shared inbox, assignments, and analytics. Growth and Enterprise add AI agents, workflows, and higher conversation volumes.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced four tools with Azeer and cut our median first response time from 12 minutes to under 30 seconds.",
    authorName: "Layla Haddad",
    authorRole: "Head of Support, Marsool",
    rating: 5,
  },
  {
    quote:
      "The Arabic experience is the best we've seen in any SaaS — our agents finally have a tool that feels native.",
    authorName: "Omar Khaled",
    authorRole: "CX Lead, Sahm",
    rating: 5,
  },
  {
    quote:
      "AI agents quietly resolve the boring half of our volume, so the team can focus on conversations that matter.",
    authorName: "Nora Al-Otaibi",
    authorRole: "Director of Operations, Tamr",
    rating: 5,
  },
];

export const compliance: ComplianceItem[] = [
  { icon: ShieldCheck, label: "SOC 2 Type II", description: "Audited annually" },
  { icon: Lock, label: "GDPR", description: "EU data protection" },
  { icon: BadgeCheck, label: "ISO 27001", description: "Information security" },
  { icon: FileText, label: "HIPAA", description: "Healthcare ready" },
];

export const integrations: IntegrationItem[] = [
  { name: "Salesforce", icon: Boxes, href: "/integrations/salesforce" },
  { name: "HubSpot", icon: BarChart3, href: "/integrations/hubspot" },
  { name: "Zendesk", icon: MessageSquare, href: "/integrations/zendesk" },
  { name: "Slack", icon: Workflow, href: "/integrations/slack" },
  { name: "Shopify", icon: Boxes, href: "/integrations/shopify" },
  { name: "Stripe", icon: BarChart3, href: "/integrations/stripe" },
  { name: "Zapier", icon: Plug, href: "/integrations/zapier" },
  { name: "Twilio", icon: Phone, href: "/integrations/twilio" },
];

export const trustedLogos: LogoCloudItem[] = [
  { src: "/logos/acme.svg", alt: "Acme" },
  { src: "/logos/globex.svg", alt: "Globex" },
  { src: "/logos/initech.svg", alt: "Initech" },
  { src: "/logos/umbra.svg", alt: "Umbra" },
  { src: "/logos/hooli.svg", alt: "Hooli" },
];

export const pillars = [
  { icon: Zap, title: "Live in a day", description: "Connect channels and import contacts in minutes." },
  { icon: ShieldCheck, title: "Secure by default", description: "SSO, audit logs, and data residency controls." },
  { icon: BookOpen, title: "Docs that respect you", description: "Clear APIs, SDKs, and copy-paste examples." },
  { icon: Mail, title: "Human support", description: "Real engineers, fast — not a deflection bot." },
];
