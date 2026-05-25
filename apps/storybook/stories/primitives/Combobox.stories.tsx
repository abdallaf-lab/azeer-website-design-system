import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox, FormField, type ComboboxOption } from "@azeer/ui";

const channels: ComboboxOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "voice", label: "Voice" },
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
  { value: "instagram", label: "Instagram" },
  { value: "messenger", label: "Messenger" },
  { value: "telegram", label: "Telegram" },
];

const agents: ComboboxOption[] = [
  { value: "sara", label: "Sara Khan", group: "Agents" },
  { value: "ali", label: "Ali Hassan", group: "Agents" },
  { value: "maria", label: "Maria Lopez", group: "Agents" },
  { value: "john", label: "John Smith", group: "Agents" },
  { value: "emma", label: "Emma Stone", group: "Agents" },
  { value: "support", label: "Customer Support", group: "Teams" },
  { value: "sales", label: "Sales", group: "Teams" },
  { value: "billing", label: "Billing", group: "Teams" },
];

const meta: Meta<typeof Combobox> = {
  title: "Primitives/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Searchable single-select — Popover + cmdk composition",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    options: channels,
    placeholder: "Pick a channel",
    size: "md",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Combobox {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 280 }}>
      <Combobox options={channels} size="sm" placeholder="sm — 32 px" />
      <Combobox options={channels} size="md" placeholder="md — 40 px (default)" />
      <Combobox options={channels} size="lg" placeholder="lg — 48 px" />
    </div>
  ),
};

export const Grouped: Story = {
  name: "Grouped options",
  render: () => (
    <div style={{ width: 320 }}>
      <Combobox
        options={agents}
        placeholder="Assign to…"
        searchPlaceholder="Search agents or teams…"
      />
    </div>
  ),
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  render: () => (
    <div style={{ width: 320 }}>
      <FormField
        label="Default sending channel"
        required
        helper="Used for outbound campaigns."
      >
        <Combobox options={channels} defaultValue="whatsapp" />
      </FormField>
    </div>
  ),
};

export const Controlled: Story = {
  name: "Controlled with display",
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [value, setValue] = React.useState<string | undefined>("voice");
    return (
      <div className="flex flex-col gap-3" style={{ width: 320 }}>
        <Combobox
          options={channels}
          value={value}
          onValueChange={setValue}
          placeholder="Pick a channel"
        />
        <p className="text-body-sm text-fg-muted">
          Selected: <code className="font-mono">{value ?? "(none)"}</code>
        </p>
      </div>
    );
  },
};

export const DisabledItem: Story = {
  name: "With disabled item",
  render: () => (
    <div style={{ width: 280 }}>
      <Combobox
        options={[
          { value: "starter", label: "Starter" },
          { value: "pro", label: "Pro" },
          { value: "enterprise", label: "Enterprise (contact sales)", disabled: true },
        ]}
        placeholder="Pick a plan"
      />
    </div>
  ),
};

export const ManyOptions: Story = {
  name: "Many options — type to filter",
  parameters: { controls: { disable: true } },
  render: () => {
    const big: ComboboxOption[] = Array.from({ length: 60 }).map((_, i) => ({
      value: `country-${i}`,
      label: `Country ${i + 1}`,
    }));
    return (
      <div style={{ width: 320 }}>
        <Combobox
          options={big}
          placeholder="Pick a country"
          searchPlaceholder="Type a country…"
        />
      </div>
    );
  },
};
