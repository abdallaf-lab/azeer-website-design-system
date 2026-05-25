import type { Meta, StoryObj } from "@storybook/react-vite";
import { BorderBeam } from "@azeer/website-ui";
import { Sparkles } from "lucide-react";

const meta: Meta<typeof BorderBeam> = {
  title: "Website/Motion/BorderBeam",
  component: BorderBeam,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Decorative beam that travels an element's border — brand-indigo by default; renders nothing under reduced motion.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BorderBeam>;

// overflow-hidden clips the comet to the rounded shape — opinionated usage
// shown in the story, NOT forced by the component.
const cardClass =
  "relative w-80 overflow-hidden rounded-2xl border border-border-subtle bg-bg-default p-6";

export const Default: Story = {
  render: () => (
    <div className={cardClass}>
      <h3 className="text-mkt-heading-sm text-content-emphasis">AI agents</h3>
      <p className="mt-2 text-mkt-body-sm text-content-subtle">
        Resolve common questions automatically, around the clock.
      </p>
      <BorderBeam />
    </div>
  ),
};

export const OnBadge: Story = {
  name: "On a badge",
  render: () => (
    <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border-subtle bg-bg-muted px-3 py-1 text-mkt-caption text-content-emphasis">
      <Sparkles size={14} aria-hidden="true" className="text-accent-text" />
      New · AI agents
      <BorderBeam size={35} />
    </span>
  ),
};

export const WithGradient: Story = {
  name: "Gradient (indigo → navy)",
  render: () => (
    <div className={cardClass}>
      <h3 className="text-mkt-heading-sm text-content-emphasis">Premium accent</h3>
      <p className="mt-2 text-mkt-body-sm text-content-subtle">
        A two-tone beam fades from brand indigo into deep navy.
      </p>
      <BorderBeam colorFrom="var(--brand-primary)" colorTo="var(--brand-secondary)" />
    </div>
  ),
};

export const Reverse: Story = {
  name: "Reverse (counter-clockwise)",
  render: () => (
    <div className={cardClass}>
      <h3 className="text-mkt-heading-sm text-content-emphasis">Reverse travel</h3>
      <p className="mt-2 text-mkt-body-sm text-content-subtle">
        The same beam, traveling counter-clockwise around the card.
      </p>
      <BorderBeam reverse />
    </div>
  ),
};

export const SlowAndLarge: Story = {
  name: "Slow & large (subtle premium)",
  render: () => (
    <div className={cardClass}>
      <h3 className="text-mkt-heading-sm text-content-emphasis">Subtle &amp; premium</h3>
      <p className="mt-2 text-mkt-body-sm text-content-subtle">
        A larger, slower beam reads as a calm ambient glow.
      </p>
      <BorderBeam size={100} duration={12} />
    </div>
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion (renders nothing)",
  parameters: {
    docs: {
      description: {
        story:
          "BorderBeam is purely decorative, so under `prefers-reduced-motion: reduce` it renders nothing — the card keeps its static border with no beam. Toggle your OS/browser setting to verify.",
      },
    },
  },
  render: () => (
    <div className={cardClass}>
      <h3 className="text-mkt-heading-sm text-content-emphasis">Accessible by default</h3>
      <p className="mt-2 text-mkt-body-sm text-content-subtle">
        With reduced motion requested, the beam is absent and only this border remains.
      </p>
      <BorderBeam />
    </div>
  ),
};
