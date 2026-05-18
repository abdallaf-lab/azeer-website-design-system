import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DatePicker,
  FieldGroup,
  Input,
  NumberInput,
  PhoneInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@azeer/ui";

const meta: Meta<typeof FieldGroup> = {
  title: "Primitives/FieldGroup",
  component: FieldGroup,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Groups related fields under one heavier label + shared helper / error",
    },
  },
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    optional: { control: "boolean" },
    direction: { control: "radio", options: ["row", "column"] },
  },
  args: {
    label: "Phone number",
    helper: "We'll send a verification code via SMS.",
    required: true,
    direction: "row",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PhoneWithCountry: Story = {
  name: "Phone — country code + number",
  render: (args) => (
    <div style={{ width: 400 }}>
      <FieldGroup {...args} error={args.error || undefined}>
        <Select defaultValue="SA">
          <SelectTrigger size="md" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SA">🇸🇦 +966</SelectItem>
            <SelectItem value="AE">🇦🇪 +971</SelectItem>
            <SelectItem value="EG">🇪🇬 +20</SelectItem>
            <SelectItem value="US">🇺🇸 +1</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="tel"
          inputMode="tel"
          placeholder="50 555 0142"
          className="flex-1 bidi-isolate font-mono tabular-nums"
        />
      </FieldGroup>
    </div>
  ),
};

export const DateRange: Story = {
  name: "Date range — start + end",
  render: function DateRangeStory() {
    const [start, setStart] = React.useState<Date | undefined>();
    const [end, setEnd] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 440 }}>
        <FieldGroup label="Report date range" helper="Both dates inclusive.">
          <DatePicker
            value={start}
            onValueChange={setStart}
            placeholder="Start"
          />
          <DatePicker value={end} onValueChange={setEnd} placeholder="End" />
        </FieldGroup>
      </div>
    );
  },
};

export const Currency: Story = {
  name: "Currency — amount + currency code",
  render: function CurrencyStory() {
    const [amount, setAmount] = React.useState<number | undefined>(100);
    return (
      <div style={{ width: 400 }}>
        <FieldGroup label="Top-up amount" optional helper="Minimum 10. Max 10,000.">
          <NumberInput
            value={amount}
            onValueChange={setAmount}
            min={10}
            max={10000}
            step={10}
            showStepper={false}
            className="flex-1"
          />
          <Select defaultValue="USD">
            <SelectTrigger size="md" className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="SAR">SAR</SelectItem>
              <SelectItem value="AED">AED</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>
      </div>
    );
  },
};

export const AddressColumn: Story = {
  name: "Address — column layout",
  args: {
    label: "Billing address",
    direction: "column",
    helper: "Used for tax invoices.",
    required: false,
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <FieldGroup {...args} error={args.error || undefined}>
        <Input placeholder="Street address" />
        <div className="flex gap-2 w-full">
          <Input placeholder="City" className="flex-1" />
          <Input placeholder="Postal code" className="w-32" />
        </div>
        <Select defaultValue="SA">
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SA">Saudi Arabia</SelectItem>
            <SelectItem value="AE">United Arab Emirates</SelectItem>
            <SelectItem value="EG">Egypt</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>
    </div>
  ),
};

export const WithError: Story = {
  name: "With validation error",
  args: {
    error: "Enter a complete phone number including country code.",
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <FieldGroup {...args}>
        <Select defaultValue="SA">
          <SelectTrigger size="md" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SA">🇸🇦 +966</SelectItem>
            <SelectItem value="AE">🇦🇪 +971</SelectItem>
          </SelectContent>
        </Select>
        <PhoneInput placeholder="50 555 0142" aria-invalid className="flex-1" />
      </FieldGroup>
    </div>
  ),
};
