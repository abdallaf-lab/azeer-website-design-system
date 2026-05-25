import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner, Button } from "@azeer/ui";

const meta: Meta<typeof Banner> = {
  title: "Primitives/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle: "Shell-level system message — 48 px, content-level, intent-tinted",
    },
  },
  argTypes: {
    intent: {
      control: "select",
      options: ["accent", "info", "success", "warning", "destructive"],
    },
    title: { control: "text" },
    dismissible: { control: "boolean" },
  },
  args: {
    intent: "accent",
    title: "Your trial expires in 3 days",
    children: "Upgrade to keep your data and team access.",
    dismissible: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Trial: Story = {
  name: "Trial expiring (accent — default)",
  render: (args) => (
    <Banner
      {...args}
      action={<Button size="sm">Upgrade now</Button>}
    />
  ),
};

export const Maintenance: Story = {
  args: {
    intent: "info",
    title: "Scheduled maintenance",
    children: "Friday 2:00 AM UTC — 15 min downtime expected.",
  },
  render: (args) => <Banner {...args} dismissible />,
};

export const QuotaWarning: Story = {
  name: "Quota warning",
  args: {
    intent: "warning",
    title: "Approaching SMS quota",
    children: "8,247 of 10,000 messages used this month.",
  },
  render: (args) => (
    <Banner {...args} action={<Button size="sm" variant="secondary">Top up</Button>} />
  ),
};

export const PastDue: Story = {
  name: "Past-due billing",
  args: {
    intent: "destructive",
    title: "Subscription past due",
    children: "Update your payment to keep using Azeer.",
  },
  render: (args) => (
    <Banner {...args} action={<Button size="sm">Update payment</Button>} />
  ),
};

export const FeatureAnnouncement: Story = {
  name: "Feature announcement",
  args: {
    intent: "accent",
    title: "New",
    children: "AI Summary is now available in your plan.",
    dismissible: true,
  },
};

export const TitleOnly: Story = {
  args: {
    intent: "success",
    title: "Webhook reconnected — receiving events again.",
    children: undefined,
    dismissible: true,
  },
};

export const Controlled: Story = {
  name: "Controlled dismiss",
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="flex flex-col">
        {open ? (
          <Banner
            intent="accent"
            title="Your trial expires in 3 days"
            dismissible
            onDismiss={() => setOpen(false)}
            action={<Button size="sm">Upgrade now</Button>}
          >
            Upgrade to keep your data.
          </Banner>
        ) : (
          <div className="p-4 text-body-sm text-fg-muted">
            (Banner dismissed —{" "}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-accent-fill underline-offset-4 hover:underline cursor-pointer"
            >
              show it again
            </button>
            )
          </div>
        )}
      </div>
    );
  },
};

export const AllIntents: Story = {
  name: "All intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col">
      <Banner intent="info" title="Maintenance">
        Friday 2:00 AM UTC — 15 min downtime.
      </Banner>
      <Banner intent="success" title="Webhook reconnected.">{}</Banner>
      <Banner intent="warning" title="Approaching quota">
        8,247 / 10,000 messages used.
      </Banner>
      <Banner intent="destructive" title="Past due">
        Update your payment.
      </Banner>
      <Banner intent="accent" title="Your trial expires in 3 days">
        Upgrade now to keep your data.
      </Banner>
    </div>
  ),
};
