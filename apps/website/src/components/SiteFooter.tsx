import { AzeerLogo, Footer, NewsletterSignup } from "@azeer/website-ui";
import { AtSign, Globe, Mail, Rss } from "@/lib/icons";
import { LocaleSwitcher } from "./LocaleSwitcher";

/**
 * SiteFooter — the marketing footer assembled from the DS `Footer`, with a
 * newsletter capture island in the brand slot. Server Component (the
 * NewsletterSignup is a client island nested inside).
 */
export function SiteFooter() {
  return (
    <Footer
      logo={<AzeerLogo className="text-lg" />}
      description="One workspace for every customer conversation — WhatsApp, Voice, SMS, email, and social, with AI built in."
      brandSlot={
        <NewsletterSignup
          title="Stay in the loop"
          description="Product updates and CX playbooks, monthly. No spam."
          buttonLabel="Subscribe"
          note="By subscribing you agree to our Privacy Policy."
        />
      }
      social={[
        { icon: Globe, href: "https://azeer.example", label: "Azeer website" },
        { icon: AtSign, href: "https://x.com/azeer", label: "Azeer on X" },
        { icon: Rss, href: "/blog/rss.xml", label: "Azeer blog RSS feed" },
        { icon: Mail, href: "mailto:hello@azeer.example", label: "Email Azeer" },
      ]}
      columns={[
        {
          title: "Product",
          links: [
            { label: "Shared Inbox", href: "/product/inbox" },
            { label: "Voice & Calls", href: "/product/voice" },
            { label: "AI Agents", href: "/product/ai" },
            { label: "Workflows", href: "/product/workflows" },
            { label: "Analytics", href: "/product/analytics" },
          ],
        },
        {
          title: "Solutions",
          links: [
            { label: "Retail", href: "/solutions/retail" },
            { label: "Banking", href: "/solutions/banking" },
            { label: "Support teams", href: "/solutions/support" },
            { label: "Sales teams", href: "/solutions/sales" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Documentation", href: "/docs" },
            { label: "Guides", href: "/guides" },
            { label: "Blog", href: "/blog" },
            { label: "Help Center", href: "/help" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Customers", href: "/customers" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ]}
      legal={
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>© 2026 Azeer, Inc. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <LocaleSwitcher />
          </span>
        </span>
      }
      bottomLinks={[
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
        { label: "Security", href: "/security" },
        { label: "Status", href: "https://status.azeer.example" },
      ]}
    />
  );
}
