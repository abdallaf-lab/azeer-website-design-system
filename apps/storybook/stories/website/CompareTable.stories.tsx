import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompareTable } from "@azeer/website-ui";

const meta: Meta<typeof CompareTable> = {
  title: "Website/CompareTable",
  component: CompareTable,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Plan/feature comparison matrix. Booleans render as check/dash; strings verbatim." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CompareTable
      eyebrow="Compare"
      title="Compare every plan"
      columns={[{ name: "Starter" }, { name: "Growth", highlight: true }, { name: "Enterprise" }]}
      groups={[
        {
          label: "Channels & inbox",
          rows: [
            { feature: "Channels", values: ["3", "Unlimited", "Unlimited"] },
            { feature: "Shared inbox & assignments", values: [true, true, true] },
            { feature: "Conversations / mo", values: ["5,000", "50,000", "Custom"] },
            { feature: "Mobile apps", values: [true, true, true] },
          ],
        },
        {
          label: "Automation & AI",
          rows: [
            { feature: "Workflows & routing", values: [false, true, true] },
            { feature: "AI agents", values: [false, true, true] },
            { feature: "SLA management", values: [false, true, true] },
          ],
        },
        {
          label: "Security & support",
          rows: [
            { feature: "SSO & SCIM", values: [false, false, true] },
            { feature: "Custom data residency", values: [false, false, true] },
            { feature: "Uptime SLA", values: ["—", "99.9%", "99.99%"] },
            { feature: "Support", values: ["Email", "Priority", "Named CSM"] },
          ],
        },
      ]}
    />
  ),
};
