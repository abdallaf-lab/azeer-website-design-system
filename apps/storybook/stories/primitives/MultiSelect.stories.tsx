import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect, FormField, type ComboboxOption } from "@azeer/ui";

const channels: ComboboxOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "voice", label: "Voice" },
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
  { value: "instagram", label: "Instagram" },
  { value: "messenger", label: "Messenger" },
  { value: "telegram", label: "Telegram" },
];

const tags: ComboboxOption[] = [
  { value: "vip", label: "VIP", group: "Priority" },
  { value: "important", label: "Important", group: "Priority" },
  { value: "follow-up", label: "Follow up", group: "Priority" },
  { value: "english", label: "English", group: "Language" },
  { value: "arabic", label: "Arabic", group: "Language" },
  { value: "french", label: "French", group: "Language" },
  { value: "spanish", label: "Spanish", group: "Language" },
  { value: "automated", label: "Auto-assigned", group: "System" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Primitives/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Searchable multi-select — selected values render as removable badges",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    maxVisible: { control: { type: "number", min: 1, max: 10 } },
  },
  args: {
    options: channels,
    placeholder: "Filter by channel",
    size: "md",
    disabled: false,
    maxVisible: 4,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MultiSelect {...args} />
    </div>
  ),
};

export const WithDefaults: Story = {
  name: "With defaultValue",
  render: () => (
    <div style={{ width: 360 }}>
      <MultiSelect
        options={channels}
        defaultValue={["whatsapp", "voice"]}
        placeholder="Filter by channel"
      />
    </div>
  ),
};

export const Grouped: Story = {
  name: "Grouped (tag picker)",
  render: () => (
    <div style={{ width: 400 }}>
      <MultiSelect
        options={tags}
        defaultValue={["vip", "english"]}
        placeholder="Apply tags…"
        searchPlaceholder="Search tags…"
      />
    </div>
  ),
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="Channels"
        required
        helper="Select all channels this template applies to."
      >
        <MultiSelect options={channels} defaultValue={["whatsapp"]} />
      </FormField>
    </div>
  ),
};

export const OverflowCollapse: Story = {
  name: "Overflow collapse — +N more",
  render: () => (
    <div style={{ width: 360 }}>
      <MultiSelect
        options={channels}
        defaultValue={["whatsapp", "voice", "sms", "email", "instagram", "messenger"]}
        maxVisible={3}
        placeholder="Channels"
      />
    </div>
  ),
};

export const Controlled: Story = {
  name: "Controlled with display",
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [value, setValue] = React.useState<string[]>(["whatsapp"]);
    return (
      <div className="flex flex-col gap-3" style={{ width: 400 }}>
        <MultiSelect
          options={channels}
          value={value}
          onValueChange={setValue}
          placeholder="Pick channels"
        />
        <p className="text-body-sm text-fg-muted">
          Selected: <code className="font-mono">[{value.map((v) => `"${v}"`).join(", ")}]</code>
        </p>
      </div>
    );
  },
};
