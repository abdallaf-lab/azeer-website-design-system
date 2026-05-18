import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@azeer/ui";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "One visual style, 3 sizes, state-driven appearance",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    type: {
      control: "select",
      options: ["text", "email", "tel", "url", "password", "search", "number"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: {
    size: "md",
    type: "email",
    placeholder: "you@company.com",
    disabled: false,
    readOnly: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: Default.render,
};

export const Large: Story = {
  args: { size: "lg" },
  render: Default.render,
};

export const AllSizes: Story = {
  name: "All sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Input size="sm" placeholder="sm — 32 px" />
      <Input size="md" placeholder="md — 40 px (default)" />
      <Input size="lg" placeholder="lg — 48 px" />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Input placeholder="Default" />
      <Input placeholder="Invalid" aria-invalid="true" />
      <Input defaultValue="readonly@example.com" readOnly />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};

export const TypeVariations: Story = {
  name: "HTML type variations",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Input type="email" placeholder="email" />
      <Input type="tel" placeholder="+966 50 555 0142" />
      <Input type="url" placeholder="https://example.com" />
      <Input type="password" placeholder="••••••••" defaultValue="secret" />
      <Input type="search" placeholder="search" />
      <Input type="number" placeholder="42" />
    </div>
  ),
};
