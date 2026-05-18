import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldGroup, FormField, TimePicker } from "@azeer/ui";

const meta: Meta<typeof TimePicker> = {
  title: "Primitives/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Minute-precision time entry — native input[type=time] in DS chrome",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    step: { control: "number" },
    min: { control: "text" },
    max: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    step: 60,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [time, setTime] = React.useState<string>("");
    return (
      <div className="flex flex-col gap-3" style={{ width: 220 }}>
        <TimePicker {...args} value={time} onValueChange={setTime} />
        <p className="text-body-sm text-fg-muted">
          Raw value: <code className="font-mono">{time || "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: function SizesStory() {
    const [t1, setT1] = React.useState("09:00");
    const [t2, setT2] = React.useState("14:30");
    const [t3, setT3] = React.useState("18:45");
    return (
      <div className="flex flex-col gap-3" style={{ width: 220 }}>
        <TimePicker size="sm" value={t1} onValueChange={setT1} />
        <TimePicker size="md" value={t2} onValueChange={setT2} />
        <TimePicker size="lg" value={t3} onValueChange={setT3} />
      </div>
    );
  },
};

export const Prefilled: Story = {
  name: "Pre-filled (controlled)",
  render: function PrefilledStory(args) {
    const [time, setTime] = React.useState("14:30");
    return (
      <div style={{ width: 220 }}>
        <TimePicker {...args} value={time} onValueChange={setTime} />
      </div>
    );
  },
};

export const SecondsPrecision: Story = {
  name: "Seconds precision (step=1)",
  parameters: { controls: { disable: true } },
  render: function SecondsStory() {
    const [time, setTime] = React.useState("14:30:45");
    return (
      <div className="flex flex-col gap-2" style={{ width: 260 }}>
        <TimePicker step={1} value={time} onValueChange={setTime} />
        <p className="text-body-sm text-fg-muted">
          <code className="font-mono">step=1</code> exposes a seconds field in the native picker.
        </p>
      </div>
    );
  },
};

export const ConstrainedWindow: Story = {
  name: "Constrained business hours",
  parameters: { controls: { disable: true } },
  render: function ConstrainedStory() {
    const [time, setTime] = React.useState("");
    return (
      <div className="flex flex-col gap-2" style={{ width: 260 }}>
        <TimePicker
          value={time}
          onValueChange={setTime}
          min="09:00"
          max="17:00"
        />
        <p className="text-body-sm text-fg-muted">
          09:00 — 17:00 enforced by <code className="font-mono">min</code> / <code className="font-mono">max</code>.
        </p>
      </div>
    );
  },
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  render: function FFStory() {
    const [time, setTime] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    return (
      <div style={{ width: 320 }}>
        <FormField
          label="Pick-up time"
          required
          helper="Choose any time during business hours."
          error={touched && !time ? "Pick a time." : undefined}
        >
          <TimePicker
            value={time}
            onValueChange={(v) => {
              setTime(v);
              setTouched(true);
            }}
            min="09:00"
            max="17:00"
          />
        </FormField>
      </div>
    );
  },
};

export const DateAndTimeGroup: Story = {
  name: "Inside FieldGroup with DatePicker",
  parameters: { controls: { disable: true } },
  render: function GroupStory() {
    const [time, setTime] = React.useState("14:30");
    return (
      <div style={{ width: 380 }}>
        <FieldGroup
          label="Departure"
          helper="Date + time of departure."
        >
          <input
            type="date"
            className="h-10 px-3 text-body-md border border-border-strong rounded-md bg-surface text-fg-default flex-1 outline-none focus:outline-none focus-visible:outline-none focus-visible:border-border-focus"
            defaultValue="2026-05-17"
          />
          <TimePicker value={time} onValueChange={setTime} className="w-32" />
        </FieldGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={{ width: 220 }}>
      <TimePicker {...args} defaultValue="09:00" />
    </div>
  ),
};

export const Invalid: Story = {
  name: "Invalid state (aria-invalid)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2" style={{ width: 260 }}>
      <TimePicker defaultValue="" aria-invalid />
      <p className="text-body-xs text-danger-text">
        Pick a time.
      </p>
    </div>
  ),
};
