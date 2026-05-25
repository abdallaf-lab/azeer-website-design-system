import type { Meta, StoryObj } from "@storybook/react-vite";
import { MotionPreset } from "@azeer/website-ui";
import { Bot, MessageSquare, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const meta: Meta<typeof MotionPreset> = {
  title: "Website/Motion/MotionPreset",
  component: MotionPreset,
  parameters: {
    layout: "padded",
    docs: {
      subtitle:
        "Entrance fade/blur reveal for marketing sections — RTL-safe, respects prefers-reduced-motion.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MotionPreset>;

/** Real Azeer feature content in a visible card so the reveal is observable. */
function DemoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-md flex-col gap-3 rounded-2xl border border-border-subtle bg-bg-default p-6 shadow-elev-1">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bg-subtle text-accent-text">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3 className="text-mkt-heading-sm text-content-emphasis">{title}</h3>
      <p className="text-mkt-body-sm text-content-subtle">{description}</p>
    </div>
  );
}

const cards = [
  {
    icon: MessageSquare,
    title: "Unified inbox",
    description: "WhatsApp, Voice, SMS, email, and social in one threaded workspace.",
  },
  {
    icon: Bot,
    title: "AI agents",
    description: "Deflect repetitive questions and draft replies your team sends in a click.",
  },
  {
    icon: Workflow,
    title: "Automations",
    description: "Route, tag, and escalate with rules that respect SLAs and working hours.",
  },
];

export const Default: Story = {
  render: () => (
    <MotionPreset>
      <DemoCard {...cards[0]} />
    </MotionPreset>
  ),
};

export const WithBlur: Story = {
  name: "Fade + blur",
  render: () => (
    <MotionPreset blur>
      <DemoCard {...cards[1]} />
    </MotionPreset>
  ),
};

export const WithDelay: Story = {
  name: "With delay (0.3s)",
  render: () => (
    <MotionPreset blur delay={0.3}>
      <DemoCard {...cards[2]} />
    </MotionPreset>
  ),
};

export const Stagger: Story = {
  parameters: {
    docs: {
      description: {
        story: "Sequential reveal by increasing each item's `delay` (0, 0.1, 0.2s).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {cards.map((card, i) => (
        <MotionPreset key={card.title} blur delay={i * 0.1}>
          <DemoCard {...card} />
        </MotionPreset>
      ))}
    </div>
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion (respects OS setting)",
  parameters: {
    docs: {
      description: {
        story:
          "When `prefers-reduced-motion: reduce` is set, MotionPreset renders children instantly with no animation. Toggle your OS/browser setting to verify.",
      },
    },
  },
  render: () => (
    <MotionPreset blur delay={0.3}>
      <DemoCard
        icon={MessageSquare}
        title="Accessible by default"
        description="Animates for most users, but appears instantly when reduced motion is requested."
      />
    </MotionPreset>
  ),
};
