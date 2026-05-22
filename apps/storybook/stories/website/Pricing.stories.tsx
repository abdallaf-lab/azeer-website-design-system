import type { Meta, StoryObj } from "@storybook/react-vite";
import { PricingCalculator, PricingCards } from "@azeer/website-ui";
import { plans } from "./_fixtures";

const meta: Meta = {
  title: "Website/Pricing",
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Plan cards (featured = accent border) and an interactive usage calculator." },
  },
};

export default meta;
type Story = StoryObj;

export const Cards: Story = {
  render: () => (
    <PricingCards
      eyebrow="Pricing"
      title="Simple, scalable pricing"
      description="Start free. Upgrade when you need AI agents, workflows, and enterprise security."
      plans={plans}
    />
  ),
};

export const Calculator: Story = {
  render: () => (
    <PricingCalculator
      eyebrow="Estimate"
      title="Estimate your monthly cost"
      description="Plug in your team size and volume to see a ballpark."
      seatPrice={99}
      conversationPrice={0.01}
      cta={{ label: "Start free trial", href: "#" }}
    />
  ),
};
