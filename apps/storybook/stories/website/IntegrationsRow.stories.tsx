import type { Meta, StoryObj } from "@storybook/react-vite";
import { IntegrationsRow } from "@azeer/website-ui";
import { ArrowRight, integrations } from "./_fixtures";

const meta: Meta<typeof IntegrationsRow> = {
  title: "Website/IntegrationsRow",
  component: IntegrationsRow,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Tile grid of supported integrations with an optional “see all” CTA." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <IntegrationsRow
      eyebrow="Integrations"
      title="Connects to your stack"
      description="Bring context from the tools you already use."
      integrations={integrations}
      cta={{ label: "Browse all integrations", href: "#", icon: ArrowRight }}
    />
  ),
};
