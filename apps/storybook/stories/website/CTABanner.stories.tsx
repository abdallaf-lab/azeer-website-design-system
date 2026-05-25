import type { Meta, StoryObj } from "@storybook/react-vite";
import { CTABanner } from "@azeer/website-ui";
import { ArrowRight } from "./_fixtures";

const meta: Meta<typeof CTABanner> = {
  title: "Website/CTABanner",
  component: CTABanner,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Closing conversion band on an inverse (default), accent, or surface tone." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Inverse: Story = {
  render: () => (
    <CTABanner
      title="Ready to unify your conversations?"
      description="Start free in minutes — no credit card required."
      primaryCta={{ label: "Start free trial", href: "#", icon: ArrowRight }}
      secondaryCta={{ label: "Talk to sales", href: "#" }}
    />
  ),
};

export const Accent: Story = {
  render: () => (
    <CTABanner
      tone="accent"
      title="Get the next post in your inbox"
      description="Monthly, no spam. Unsubscribe anytime."
      primaryCta={{ label: "Subscribe", href: "#", icon: ArrowRight }}
    />
  ),
};

export const Surface: Story = {
  render: () => (
    <CTABanner
      tone="surface"
      centered={false}
      title="Talk to our team"
      description="See how Azeer fits your workflow with a guided demo."
      primaryCta={{ label: "Book a demo", href: "#", icon: ArrowRight }}
      secondaryCta={{ label: "Read the docs", href: "#" }}
    />
  ),
};
