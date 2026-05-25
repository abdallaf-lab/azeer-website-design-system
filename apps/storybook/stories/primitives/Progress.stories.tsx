import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "@azeer/ui";

const meta: Meta<typeof Progress> = {
  title: "Primitives/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Linear bar — known duration or step count. Indeterminate when value is null.",
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    intent: { control: "select", options: ["primary", "success", "warning", "destructive"] },
  },
  args: {
    value: 45,
    intent: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Progress {...args} />
    </div>
  ),
};

export const Intents: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 360 }}>
      <div>
        <div className="text-body-sm text-fg-muted mb-1">primary — uploading</div>
        <Progress value={42} intent="primary" />
      </div>
      <div>
        <div className="text-body-sm text-fg-muted mb-1">success — verified</div>
        <Progress value={100} intent="success" />
      </div>
      <div>
        <div className="text-body-sm text-fg-muted mb-1">warning — quota 80%</div>
        <Progress value={80} intent="warning" />
      </div>
      <div>
        <div className="text-body-sm text-fg-muted mb-1">destructive — quota exceeded</div>
        <Progress value={96} intent="destructive" />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <div className="text-body-sm text-fg-muted mb-1">value=null — animated, unknown duration</div>
      <Progress value={null} />
    </div>
  ),
};

export const QuotaIndicator: Story = {
  name: "Quota indicator",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-1.5" style={{ width: 360 }}>
      <div className="flex items-center justify-between text-body-sm">
        <span className="text-fg-default">SMS quota</span>
        <span className="text-fg-muted tabular-nums">8,247 / 10,000</span>
      </div>
      <Progress value={82.47} intent="warning" />
      <p className="text-body-xs text-fg-muted">82% used. Top up to avoid interruption.</p>
    </div>
  ),
};

export const UploadProgress: Story = {
  name: "Live upload (auto-increment)",
  parameters: { controls: { disable: true } },
  render: function UploadStory() {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
      if (value >= 100) return;
      const timer = setTimeout(() => setValue((v) => Math.min(100, v + 5)), 400);
      return () => clearTimeout(timer);
    }, [value]);
    return (
      <div className="flex flex-col gap-1.5" style={{ width: 360 }}>
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-fg-default">Uploading attachment.pdf</span>
          <span className="text-fg-muted tabular-nums">{value}%</span>
        </div>
        <Progress value={value === 100 ? value : value} intent={value === 100 ? "success" : "primary"} />
      </div>
    );
  },
};
