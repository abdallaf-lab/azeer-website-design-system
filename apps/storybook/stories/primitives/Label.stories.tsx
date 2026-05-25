import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Label } from "@azeer/ui";

const meta: Meta<typeof Label> = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Form control label — top-aligned, sentence case, locked typography",
    },
  },
  argTypes: {
    required: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Email address",
    required: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithInput: Story = {
  name: "Wired to an input",
  args: { children: "Email address", required: true },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}>
      <Label htmlFor="email-demo" required={args.required}>
        {args.children}
      </Label>
      <Input
        id="email-demo"
        type="email"
        placeholder="you@company.com"
        aria-required={args.required}
      />
    </div>
  ),
};

export const Examples: Story = {
  name: "Examples",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label>Full name</Label>
      <Label required>Email address</Label>
      <Label>API key</Label>
      <Label required>Webhook URL</Label>
    </div>
  ),
};
