import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatsBand } from "@azeer/website-ui";
import { stats } from "./_fixtures";

const meta: Meta<typeof StatsBand> = {
  title: "Website/StatsBand",
  component: StatsBand,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "A row of headline metrics — figure in the display tier, label beneath." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StatsBand eyebrow="Proven at scale" title="Numbers teams trust" stats={stats} />
  ),
};

export const OnSurface: Story = {
  render: () => <StatsBand stats={stats} tone="surface" />,
};
