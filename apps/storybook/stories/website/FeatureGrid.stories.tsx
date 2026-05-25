import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureGrid } from "@azeer/website-ui";
import { features } from "./_fixtures";

const meta: Meta<typeof FeatureGrid> = {
  title: "Website/FeatureGrid",
  component: FeatureGrid,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Icon-led grid of capabilities. 2 / 3 / 4 columns; cells become links with `href`." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumn: Story = {
  render: () => (
    <FeatureGrid
      eyebrow="Why Azeer"
      title="Everything your team needs to reply faster"
      description="A complete customer-conversation platform — not another point tool to stitch together."
      items={features}
      columns={3}
    />
  ),
};

export const TwoColumn: Story = {
  render: () => (
    <FeatureGrid title="Built for scale" items={features.slice(0, 4)} columns={2} tone="surface" />
  ),
};
