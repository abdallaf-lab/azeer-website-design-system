import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, FormField, Label } from "@azeer/ui";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Multi-select toggle — single canonical size (16 × 16). Supports indeterminate.",
    },
  },
  argTypes: {
    checked: {
      control: "select",
      options: [false, true, "indeterminate"],
    },
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

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
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
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <Checkbox defaultChecked />
      <span className="text-body-md text-fg-default">Send weekly summary</span>
    </label>
  ),
};

export const Group: Story = {
  name: "Checkbox group",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <Checkbox defaultChecked />
        <span className="text-body-md text-fg-default">WhatsApp</span>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <Checkbox defaultChecked />
        <span className="text-body-md text-fg-default">Voice</span>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <Checkbox />
        <span className="text-body-md text-fg-default">SMS</span>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <Checkbox />
        <span className="text-body-md text-fg-default">Email</span>
      </label>
    </div>
  ),
};

export const SelectAllPattern: Story = {
  name: "Select-all pattern (indeterminate)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <Checkbox checked="indeterminate" />
        <span className="text-label-md text-fg-default">All channels</span>
      </label>
      <div className="flex flex-col gap-2 ps-6">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <Checkbox defaultChecked />
          <span className="text-body-md text-fg-default">WhatsApp</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <Checkbox defaultChecked />
          <span className="text-body-md text-fg-default">Voice</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <Checkbox />
          <span className="text-body-md text-fg-default">SMS</span>
        </label>
      </div>
    </div>
  ),
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="Marketing emails"
        helper="We'll send up to 2 emails per month — you can unsubscribe anytime."
      >
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <Checkbox />
          <Label className="cursor-pointer">Opt in</Label>
        </label>
      </FormField>
    </div>
  ),
};
