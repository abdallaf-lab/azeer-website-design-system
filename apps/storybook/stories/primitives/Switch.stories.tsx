import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, Label, Switch } from "@azeer/ui";

const meta: Meta<typeof Switch> = {
  title: "Primitives/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Stateful on/off toggle — single canonical size (36 × 20 track / 16 × 16 thumb)",
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: "Disabled + checked",
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  name: "With inline label",
  parameters: { controls: { disable: true } },
  render: () => (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <Switch defaultChecked />
      <span className="text-body-md text-fg-default">Two-factor authentication</span>
    </label>
  ),
};

export const WithLabelAdjacent: Story = {
  name: "Label + Switch (id-bound)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="2fa" defaultChecked />
      <Label htmlFor="2fa">Two-factor authentication</Label>
    </div>
  ),
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="Auto-archive closed conversations"
        helper="Move closed conversations to the archive after 30 days."
      >
        <Switch defaultChecked />
      </FormField>
    </div>
  ),
};

export const Disabled_WithReason: Story = {
  name: "Disabled — with reason",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="Two-factor authentication"
        helper="Verify your email first to enable this."
      >
        <Switch disabled />
      </FormField>
    </div>
  ),
};
