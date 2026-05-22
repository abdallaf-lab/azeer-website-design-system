import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlogCard } from "@azeer/website-ui";

const meta: Meta<typeof BlogCard> = {
  title: "Website/BlogCard",
  component: BlogCard,
  parameters: {
    layout: "padded",
    docs: { subtitle: "A single article preview — cover, category, title, excerpt, and a meta row. The whole card is one link." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const posts = [
  {
    title: "The 2026 CX benchmark report",
    href: "#",
    excerpt: "We analyzed 2.4 billion conversations to find what separates fast teams from the rest.",
    category: "Research",
    date: "May 12, 2026",
    readingTime: "9 min read",
    authorName: "Layla Haddad",
  },
  {
    title: "WhatsApp at scale: a practical playbook",
    href: "#",
    excerpt: "Templates, opt-ins, and rate limits — run high-volume WhatsApp support without getting blocked.",
    category: "Playbook",
    date: "Apr 28, 2026",
    readingTime: "7 min read",
    authorName: "Omar Khaled",
  },
  {
    title: "Designing for RTL & Arabic from day one",
    href: "#",
    excerpt: "Why logical CSS, same-metric font pairing, and bidi isolation should be release gates.",
    category: "Design",
    date: "Apr 10, 2026",
    readingTime: "6 min read",
    authorName: "Nora Al-Otaibi",
  },
];

export const Grid: Story = {
  render: () => (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.title}>
          <BlogCard {...p} />
        </li>
      ))}
    </ul>
  ),
};

export const WithCover: Story = {
  name: "With cover image",
  render: () => (
    <div className="max-w-sm">
      <BlogCard {...posts[0]} imageSrc="/logos/globex.svg" imageAlt="Cover" />
    </div>
  ),
};
