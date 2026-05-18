import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, NumberInput } from "@azeer/ui";

const meta: Meta<typeof NumberInput> = {
  title: "Primitives/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Numeric entry with stepper — type=\"text\" + inputMode=\"numeric\" (DS bans type=\"number\")",
    },
  },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    showStepper: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showStepper: true,
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = React.useState<number | undefined>(50);
    return (
      <div className="flex flex-col gap-3" style={{ width: 240 }}>
        <NumberInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          Value: <code className="font-mono">{value ?? "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const NoStepper: Story = {
  name: "Without stepper buttons",
  args: { showStepper: false },
  render: function NoStepperStory(args) {
    const [value, setValue] = React.useState<number | undefined>(0);
    return (
      <div className="flex flex-col gap-3" style={{ width: 240 }}>
        <NumberInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          Arrow keys still nudge by step. Value: <code className="font-mono">{value ?? "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const QuotaPattern: Story = {
  name: "Quota field (large range)",
  args: { min: 0, max: 100000, step: 100 },
  render: function QuotaStory(args) {
    const [value, setValue] = React.useState<number | undefined>(10000);
    return (
      <div style={{ width: 320 }}>
        <FormField
          label="Monthly SMS quota"
          required
          helper="Hard cap on outbound SMS per billing cycle. Step of 100."
        >
          <NumberInput {...args} value={value} onValueChange={setValue} />
        </FormField>
      </div>
    );
  },
};

export const ClampOnBlur: Story = {
  name: "Clamp on blur (try 150)",
  args: { min: 0, max: 100, step: 5 },
  render: function ClampStory(args) {
    const [value, setValue] = React.useState<number | undefined>(50);
    return (
      <div className="flex flex-col gap-3" style={{ width: 240 }}>
        <NumberInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          Type 150 + blur → clamps to 100. Value: <code className="font-mono">{value ?? "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: () => (
    <div style={{ width: 240 }}>
      <NumberInput value={42} disabled />
    </div>
  ),
};
