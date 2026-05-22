import {
  AzeerLogo,
  CtaButton,
  MegaMenuProduct,
  MegaMenuResources,
  MegaMenuSolutions,
  Navbar,
} from "@azeer/website-ui";
import {
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  FileText,
  GraduationCap,
  Headphones,
  LifeBuoy,
  MessageSquare,
  Newspaper,
  Phone,
  Plug,
  Sparkles,
  Workflow,
  ShieldCheck,
  Globe,
  Zap,
} from "@/lib/icons";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * SiteNavbar — assembles the DS `Navbar` (client) with server-rendered
 * mega-menu panels. Stays a Server Component: the panels are built here and
 * handed to the client Navbar as already-rendered React nodes, so the Lucide
 * icon component refs are consumed during this server render (never serialized
 * across the client boundary).
 */
export function SiteNavbar({ activeLabel }: { activeLabel?: string } = {}) {
  return (
    <Navbar
      logo={
        <a href="/" aria-label="Azeer home" className="inline-flex">
          <AzeerLogo className="text-xl" />
        </a>
      }
      items={[
        {
          label: "Product",
          active: activeLabel === "Product",
          menu: (
            <MegaMenuProduct
              items={[
                {
                  icon: MessageSquare,
                  title: "Shared Inbox",
                  description: "Every channel in one threaded view.",
                  href: "/product/inbox",
                },
                {
                  icon: Phone,
                  title: "Voice & Calls",
                  description: "Cloud telephony with routing and IVR.",
                  href: "/product/voice",
                },
                {
                  icon: Bot,
                  title: "AI Agents",
                  description: "Resolve common questions automatically.",
                  href: "/product/ai",
                },
                {
                  icon: Workflow,
                  title: "Workflows",
                  description: "Automate routing, tagging, and SLAs.",
                  href: "/product/workflows",
                },
                {
                  icon: BarChart3,
                  title: "Analytics",
                  description: "Track volume, CSAT, and team load.",
                  href: "/product/analytics",
                },
                {
                  icon: Plug,
                  title: "Integrations",
                  description: "Connect your CRM, helpdesk, and data.",
                  href: "/product/integrations",
                },
              ]}
              highlight={
                <div className="flex flex-col gap-2">
                  <span className="text-label-xs text-fg-subtle">What&apos;s new</span>
                  <span className="text-label-md text-fg-default">
                    AI Agents, now in GA
                  </span>
                  <span className="text-body-xs text-fg-muted">
                    Auto-resolve up to 60% of repetitive questions across channels.
                  </span>
                  <a
                    href="/product/ai"
                    className="text-body-sm text-accent-text hover:text-accent-fill"
                  >
                    Read more →
                  </a>
                </div>
              }
            />
          ),
        },
        {
          label: "Solutions",
          active: activeLabel === "Solutions",
          menu: (
            <MegaMenuSolutions
              groups={[
                {
                  label: "By industry",
                  items: [
                    { icon: Globe, label: "Retail & e-commerce", href: "/solutions/retail" },
                    { icon: Building2, label: "Banking & fintech", href: "/solutions/banking" },
                    { icon: Headphones, label: "Healthcare", href: "/healthcare" },
                    { icon: GraduationCap, label: "Education", href: "/solutions/education" },
                  ],
                },
                {
                  label: "By team",
                  items: [
                    { icon: LifeBuoy, label: "Support", href: "/solutions/support" },
                    { icon: BarChart3, label: "Sales", href: "/solutions/sales" },
                    { icon: Sparkles, label: "Marketing", href: "/solutions/marketing" },
                  ],
                },
                {
                  label: "By size",
                  items: [
                    { icon: Zap, label: "Startups", href: "/solutions/startups" },
                    { icon: ShieldCheck, label: "Enterprise", href: "/solutions/enterprise" },
                  ],
                },
              ]}
            />
          ),
        },
        {
          label: "Resources",
          active: activeLabel === "Resources",
          menu: (
            <MegaMenuResources
              links={[
                {
                  icon: BookOpen,
                  title: "Documentation",
                  description: "Guides, APIs, and SDKs.",
                  href: "/docs",
                },
                {
                  icon: FileText,
                  title: "Guides",
                  description: "Playbooks for support and sales.",
                  href: "/guides",
                },
                {
                  icon: Newspaper,
                  title: "Blog",
                  description: "Product news and best practices.",
                  href: "/blog",
                },
                {
                  icon: LifeBuoy,
                  title: "Help Center",
                  description: "Answers and troubleshooting.",
                  href: "/help",
                },
              ]}
              featured={{
                label: "Featured",
                items: [
                  { label: "The 2026 CX benchmark report", href: "/blog/cx-benchmark-2026" },
                  { label: "WhatsApp at scale: a playbook", href: "/blog/whatsapp-playbook" },
                  { label: "Designing for RTL & Arabic", href: "/blog/rtl-arabic" },
                ],
              }}
            />
          ),
        },
        { label: "Pricing", href: "/pricing", active: activeLabel === "Pricing" },
      ]}
      actions={
        <>
          <LocaleSwitcher />
          <CtaButton
            action={{ label: "Log in", href: "/login" }}
            variant="ghost"
            size="md"
          />
          <CtaButton
            action={{ label: "Get started", href: "/signup" }}
            variant="primary"
            size="md"
          />
        </>
      }
    />
  );
}
