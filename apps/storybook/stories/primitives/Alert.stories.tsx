import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@azeer/ui";

const meta: Meta<typeof Alert> = {
  title: "Primitives/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "5 variants — block-level intent callout (info / success / warning / destructive / ai)",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "destructive", "ai"],
    },
    title: { control: "text" },
    dismissible: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "info",
    title: "Scheduled maintenance",
    dismissible: false,
    children: "Scheduled maintenance Friday 2:00 AM UTC — 15 min downtime expected.",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Template approved",
    children: "Your WhatsApp template was approved and is ready to send.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Approaching SMS quota",
    children: "8,247 of 10,000 messages used this month. Top up to avoid interruption.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Webhook failing",
    children: "Webhook returned 502 on the last 12 attempts. Check your endpoint.",
  },
};

export const AI: Story = {
  args: {
    variant: "ai",
    title: "Drafted with AI",
    children: "Review before sending — AI can be inaccurate.",
  },
};

export const Dismissible: Story = {
  args: { dismissible: true },
};

export const TitleOnly: Story = {
  args: { variant: "success", title: "Saved", children: undefined },
};

export const AllVariants: Story = {
  name: "All variants",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 }}>
      <Alert variant="info" title="Scheduled maintenance">
        Friday 2:00 AM UTC — 15 min downtime expected.
      </Alert>
      <Alert variant="success" title="Template approved">
        Your WhatsApp template is ready to send.
      </Alert>
      <Alert variant="warning" title="Approaching SMS quota">
        8,247 of 10,000 messages used this month.
      </Alert>
      <Alert variant="destructive" title="Webhook failing">
        Returned 502 on the last 12 attempts. Check your endpoint.
      </Alert>
      <Alert variant="ai" title="Drafted with AI">
        Review before sending — AI can be inaccurate.
      </Alert>
    </div>
  ),
};
