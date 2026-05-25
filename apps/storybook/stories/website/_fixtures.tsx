import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BookOpen,
  Boxes,
  Building2,
  FileText,
  Globe,
  GraduationCap,
  Headphones,
  Languages,
  LifeBuoy,
  Lock,
  Mail,
  MessageSquare,
  Newspaper,
  Phone,
  Plug,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@azeer/website-ui";
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

/** Re-exported here so individual stories don't each import lucide-react. */
export { ArrowRight };

/**
 * MockPanel — a token-only faux product screenshot for hero / feature media
 * slots in stories (no image assets).
 */
export function MockPanel({
  label = "Azeer · Inbox",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border border-border-default bg-surface shadow-elev-2",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 50% 0%, var(--color-accent-bg-subtle), transparent 70%)",
        }}
      />
      <div className="relative flex items-center gap-1.5 border-b border-border-divider bg-surface-sunken px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="ms-2 text-body-xs text-fg-muted">{label}</span>
      </div>
      <div className="relative grid grid-cols-[1.1fr_2fr] gap-4 p-4">
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-7 w-7 shrink-0 rounded-full bg-surface-sunken" />
              <span className="flex flex-1 flex-col gap-1.5">
                <span className="h-2 w-2/3 rounded-full bg-surface-sunken" />
                <span className="h-2 w-1/2 rounded-full bg-surface-sunken" />
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border-divider bg-surface p-4">
          <span className="h-2.5 w-1/3 rounded-full bg-accent-bg-subtle" />
          <span className="h-2.5 w-full rounded-full bg-surface-sunken" />
          <span className="h-2.5 w-5/6 rounded-full bg-surface-sunken" />
          <span className="h-2.5 w-2/3 rounded-full bg-surface-sunken" />
          <span className="mt-3 h-8 w-28 self-end rounded-full bg-accent-fill" />
        </div>
      </div>
    </div>
  );
}

export const productMenuItems = [
  { icon: MessageSquare, title: "Shared Inbox", description: "Every channel in one threaded view.", href: "#inbox" },
  { icon: Phone, title: "Voice & Calls", description: "Cloud telephony with routing and IVR.", href: "#voice" },
  { icon: Bot, title: "AI Agents", description: "Resolve common questions automatically.", href: "#ai" },
  { icon: Workflow, title: "Workflows", description: "Automate routing, tagging, and SLAs.", href: "#workflows" },
  { icon: BarChart3, title: "Analytics", description: "Track volume, CSAT, and team load.", href: "#analytics" },
  { icon: Plug, title: "Integrations", description: "Connect your CRM, helpdesk, and data.", href: "#integrations" },
];

export const solutionGroups = [
  {
    label: "By industry",
    items: [
      { icon: Globe, label: "Retail & e-commerce", href: "#retail" },
      { icon: Building2, label: "Banking & fintech", href: "#banking" },
      { icon: Headphones, label: "Healthcare", href: "#healthcare" },
      { icon: GraduationCap, label: "Education", href: "#education" },
    ],
  },
  {
    label: "By team",
    items: [
      { icon: LifeBuoy, label: "Support", href: "#support" },
      { icon: BarChart3, label: "Sales", href: "#sales" },
      { icon: Sparkles, label: "Marketing", href: "#marketing" },
    ],
  },
  {
    label: "By size",
    items: [
      { icon: Zap, label: "Startups", href: "#startups" },
      { icon: ShieldCheck, label: "Enterprise", href: "#enterprise" },
    ],
  },
];

export const resourceLinks = [
  { icon: BookOpen, title: "Documentation", description: "Guides, APIs, and SDKs.", href: "#docs" },
  { icon: FileText, title: "Guides", description: "Playbooks for support and sales.", href: "#guides" },
  { icon: Newspaper, title: "Blog", description: "Product news and best practices.", href: "#blog" },
  { icon: LifeBuoy, title: "Help Center", description: "Answers and troubleshooting.", href: "#help" },
];

export const features: FeatureGridItem[] = [
  { icon: MessageSquare, title: "Unified inbox", description: "WhatsApp, Voice, SMS, email, and social in one threaded workspace." },
  { icon: Bot, title: "AI agents", description: "Deflect repetitive questions and draft replies your team sends in a click." },
  { icon: Workflow, title: "Automations", description: "Route, tag, and escalate with rules that respect SLAs and hours." },
  { icon: BarChart3, title: "Analytics", description: "Track volume, CSAT, and team load with dashboards ops will use." },
  { icon: Plug, title: "Integrations", description: "Sync with your CRM, helpdesk, and data warehouse." },
  { icon: Languages, title: "Arabic & RTL", description: "Mirrored layouts, Arabic typography, and bidi-safe IDs out of the box." },
];

export const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo per seat",
    description: "For small teams getting organized across channels.",
    features: ["Up to 3 channels", "Shared inbox & assignments", "5,000 conversations / mo", "Email support"],
    cta: { label: "Start free trial", href: "#starter" },
  },
  {
    name: "Growth",
    price: "$99",
    period: "/mo per seat",
    description: "For scaling support and sales teams.",
    featured: true,
    badge: "Most popular",
    features: ["Unlimited channels", "AI agents & assist", "50,000 conversations / mo", "Workflows & SLAs", "Priority support"],
    cta: { label: "Start free trial", href: "#growth" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with security and scale needs.",
    features: ["SSO & SCIM", "Dedicated infrastructure", "Custom data residency", "99.99% uptime SLA", "Named CSM"],
    cta: { label: "Talk to sales", href: "#enterprise" },
  },
];

export const faqs: FAQItem[] = [
  { question: "Which channels does Azeer support?", answer: "WhatsApp, Voice, SMS, email, Instagram, Messenger, and Telegram — all in one threaded inbox." },
  { question: "How does AI-assisted resolution work?", answer: "AI agents handle repetitive questions automatically and draft suggested replies for everything else. Your team stays in control." },
  { question: "Is Arabic and RTL fully supported?", answer: "Yes — RTL is a release gate. Layouts mirror automatically and Arabic uses IBM Plex Sans Arabic." },
  { question: "Can I bring my own number?", answer: "You can port existing numbers or provision new ones in supported regions, including WhatsApp Business API senders." },
];

export const testimonials: Testimonial[] = [
  { quote: "We replaced four tools with Azeer and cut our median first response time from 12 minutes to under 30 seconds.", authorName: "Layla Haddad", authorRole: "Head of Support, Marsool", rating: 5 },
  { quote: "The Arabic experience is the best we've seen in any SaaS — our agents finally have a tool that feels native.", authorName: "Omar Khaled", authorRole: "CX Lead, Sahm", rating: 5 },
  { quote: "AI agents quietly resolve the boring half of our volume, so the team can focus on what matters.", authorName: "Nora Al-Otaibi", authorRole: "Director of Operations, Tamr", rating: 5 },
];

export const stats: Stat[] = [
  { value: "2.4B+", label: "Messages routed", description: "across all channels in 2025" },
  { value: "99.99%", label: "Uptime SLA", description: "platform availability" },
  { value: "<30s", label: "Median first reply", description: "with AI-assisted routing" },
  { value: "60%", label: "Auto-resolved", description: "of repetitive questions" },
];

export const integrations: IntegrationItem[] = [
  { name: "Salesforce", icon: Boxes, href: "#salesforce" },
  { name: "HubSpot", icon: BarChart3, href: "#hubspot" },
  { name: "Zendesk", icon: MessageSquare, href: "#zendesk" },
  { name: "Slack", icon: Workflow, href: "#slack" },
  { name: "Shopify", icon: Boxes, href: "#shopify" },
  { name: "Stripe", icon: BarChart3, href: "#stripe" },
  { name: "Zapier", icon: Plug, href: "#zapier" },
  { name: "Twilio", icon: Phone, href: "#twilio" },
];

export const compliance: ComplianceItem[] = [
  { icon: ShieldCheck, label: "SOC 2 Type II", description: "Audited annually" },
  { icon: Lock, label: "GDPR", description: "EU data protection" },
  { icon: BadgeCheck, label: "ISO 27001", description: "Information security" },
  { icon: FileText, label: "HIPAA", description: "Healthcare ready" },
];

export const trustedLogos: LogoCloudItem[] = [
  { src: "/logos/acme.svg", alt: "Acme" },
  { src: "/logos/globex.svg", alt: "Globex" },
  { src: "/logos/initech.svg", alt: "Initech" },
  { src: "/logos/umbra.svg", alt: "Umbra" },
  { src: "/logos/hooli.svg", alt: "Hooli" },
];

export const footerSocial = [
  { icon: Globe, href: "#", label: "Azeer website" },
  { icon: Mail, href: "#", label: "Email Azeer" },
];

export const footerColumns = [
  { title: "Product", links: [{ label: "Shared Inbox", href: "#" }, { label: "Voice & Calls", href: "#" }, { label: "AI Agents", href: "#" }, { label: "Workflows", href: "#" }] },
  { title: "Solutions", links: [{ label: "Retail", href: "#" }, { label: "Banking", href: "#" }, { label: "Support", href: "#" }, { label: "Sales", href: "#" }] },
  { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Guides", href: "#" }, { label: "Blog", href: "#" }, { label: "Help", href: "#" }] },
  { title: "Company", links: [{ label: "About", href: "#" }, { label: "Customers", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }] },
];

export const footerBottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
  { label: "Status", href: "#" },
];
