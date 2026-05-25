import type { Metadata } from "next";
import {
  BlogCard,
  Container,
  CTABanner,
  Section,
  SectionHeading,
} from "@azeer/website-ui";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Blog",
  description: "Product news, CX playbooks, and engineering notes from the Azeer team.",
};

const posts = [
  {
    title: "The 2026 CX benchmark report",
    href: "/blog/cx-benchmark-2026",
    excerpt:
      "We analyzed 2.4 billion conversations to find what separates fast teams from the rest — and what to copy.",
    category: "Research",
    date: "May 12, 2026",
    readingTime: "9 min read",
    authorName: "Layla Haddad",
  },
  {
    title: "WhatsApp at scale: a practical playbook",
    href: "/blog/whatsapp-playbook",
    excerpt:
      "Templates, opt-ins, and rate limits — everything you need to run high-volume WhatsApp support without getting blocked.",
    category: "Playbook",
    date: "Apr 28, 2026",
    readingTime: "7 min read",
    authorName: "Omar Khaled",
  },
  {
    title: "Designing for RTL & Arabic from day one",
    href: "/blog/rtl-arabic",
    excerpt:
      "Why logical CSS, same-metric font pairing, and bidi isolation should be release gates — not polish.",
    category: "Design",
    date: "Apr 10, 2026",
    readingTime: "6 min read",
    authorName: "Nora Al-Otaibi",
  },
  {
    title: "Shipping AI agents you can trust",
    href: "/blog/trustworthy-ai-agents",
    excerpt:
      "Guardrails, grounding, and a human in the loop: how we built auto-resolution that teams actually enable.",
    category: "Engineering",
    date: "Mar 22, 2026",
    readingTime: "11 min read",
    authorName: "Sami Rahman",
  },
  {
    title: "From four tools to one inbox",
    href: "/blog/four-tools-to-one",
    excerpt:
      "A migration story: how Marsool consolidated their stack and cut response time by 95%.",
    category: "Customer story",
    date: "Mar 5, 2026",
    readingTime: "5 min read",
    authorName: "Layla Haddad",
  },
  {
    title: "Inside our 99.99% uptime architecture",
    href: "/blog/uptime-architecture",
    excerpt:
      "Regional failover, queue isolation, and the boring engineering that keeps conversations flowing.",
    category: "Engineering",
    date: "Feb 18, 2026",
    readingTime: "10 min read",
    authorName: "Sami Rahman",
  },
];

export default function BlogPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <Section tone="canvas">
          <Container className="flex flex-col gap-12">
            <SectionHeading
              eyebrow="Blog"
              title="Ideas for better customer conversations"
              description="Product news, CX playbooks, and engineering notes from the Azeer team."
            />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.href}>
                  <BlogCard
                    title={post.title}
                    href={post.href}
                    excerpt={post.excerpt}
                    category={post.category}
                    date={post.date}
                    readingTime={post.readingTime}
                    authorName={post.authorName}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <CTABanner
          tone="accent"
          title="Get the next post in your inbox"
          description="Monthly, no spam. Unsubscribe anytime."
          primaryCta={{ label: "Subscribe", href: "/#newsletter", icon: ArrowRight }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
