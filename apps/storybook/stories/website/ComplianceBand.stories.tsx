import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComplianceBand } from "@azeer/website-ui";
import { compliance } from "./_fixtures";

const meta: Meta<typeof ComplianceBand> = {
  title: "Website/ComplianceBand",
  component: ComplianceBand,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Trust strip of certifications — shielded chips with short labels." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ComplianceBand title="Enterprise-grade security & compliance" items={compliance} />
  ),
};
