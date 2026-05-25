import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@azeer/ui";

const meta: Meta<typeof Spinner> = {
  title: "Primitives/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "3 sizes — action feedback for ≤2-second operations",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "16 / 20 / 24 px",
      table: { defaultValue: { summary: "md" } },
    },
    label: {
      control: "text",
      description: "Visually-hidden label announced by screen readers",
    },
  },
  args: {
    size: "md",
    label: "Loading",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const AllSizes: Story = {
  name: "All sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const InColorContext: Story = {
  name: "Inherits currentColor",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <span style={{ color: "var(--color-fg-default)" }}>
        <Spinner />
      </span>
      <span style={{ color: "var(--color-accent-fill)" }}>
        <Spinner />
      </span>
      <span style={{ color: "var(--color-danger-text)" }}>
        <Spinner />
      </span>
    </div>
  ),
};
