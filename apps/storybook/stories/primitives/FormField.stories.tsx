import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, Input, Textarea } from "@azeer/ui";

const meta: Meta<typeof FormField> = {
  title: "Primitives/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Canonical 4-slot form anatomy — label + control + helper/error, auto-wired",
    },
  },
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    optional: { control: "boolean" },
  },
  args: {
    label: "Email address",
    helper: "We'll send a verification code to this address.",
    error: "",
    required: false,
    optional: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <FormField {...args} error={args.error || undefined}>
        <Input type="email" placeholder="you@company.com" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: Default.render,
};

export const WithError: Story = {
  name: "Validation error",
  args: {
    required: true,
    error: "Email is required.",
  },
  render: Default.render,
};

export const Optional: Story = {
  name: "Marked optional",
  args: {
    label: "Phone number",
    optional: true,
    helper: "We'll send a verification code via SMS.",
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <FormField {...args} error={args.error || undefined}>
        <Input type="tel" placeholder="+966 50 555 0142" />
      </FormField>
    </div>
  ),
};

export const DisabledWithReason: Story = {
  name: "Disabled — with reason",
  args: {
    label: "Two-factor authentication",
    helper: "Verify your email first to enable this.",
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <FormField {...args} error={args.error || undefined}>
        <Input disabled />
      </FormField>
    </div>
  ),
};

export const ReadOnly: Story = {
  name: "Read-only field",
  args: {
    label: "Account ID",
    helper: "Generated when your workspace was created.",
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <FormField {...args} error={args.error || undefined}>
        <Input defaultValue="acct_8f3kdo10" readOnly />
      </FormField>
    </div>
  ),
};

export const WithTextarea: Story = {
  name: "With Textarea",
  args: {
    label: "Note",
    helper: "Maximum 280 characters.",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <FormField {...args} error={args.error || undefined}>
        <Textarea placeholder="Write a note about this conversation…" />
      </FormField>
    </div>
  ),
};

export const FormSection: Story = {
  name: "Form section composition",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <FormField
        label="Full name"
        required
        helper="As shown on your government ID."
      >
        <Input placeholder="Sara Khan" />
      </FormField>

      <FormField
        label="Email address"
        required
        error="Email is required."
      >
        <Input type="email" placeholder="you@company.com" />
      </FormField>

      <FormField
        label="Phone number"
        optional
        helper="We'll send a verification code via SMS."
      >
        <Input type="tel" placeholder="+966 50 555 0142" />
      </FormField>

      <FormField label="Note" helper="Maximum 280 characters.">
        <Textarea placeholder="Write a note…" />
      </FormField>
    </div>
  ),
};
