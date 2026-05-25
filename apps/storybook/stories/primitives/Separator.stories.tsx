import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@azeer/ui";

const meta: Meta<typeof Separator> = {
  title: "Primitives/Separator",
  component: Separator,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "1 px divider — horizontal or vertical, decorative by default",
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    decorative: {
      control: "boolean",
      description: "true → role=\"none\"; false → role=\"separator\" + aria-orientation",
      table: { defaultValue: { summary: "true" } },
    },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 360, color: "var(--color-fg-default)" }}>
      <p style={{ marginBlock: 0, font: "var(--text-body-md)" }}>Above the divider.</p>
      <div style={{ paddingBlock: 12 }}>
        <Separator {...args} />
      </div>
      <p style={{ marginBlock: 0, font: "var(--text-body-md)" }}>Below the divider.</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        height: 32,
        color: "var(--color-fg-default)",
        font: "var(--text-body-sm)",
      }}
    >
      <span>Item A</span>
      <Separator {...args} />
      <span>Item B</span>
      <Separator {...args} />
      <span>Item C</span>
    </div>
  ),
};

export const Semantic: Story = {
  name: "Semantic (decorative=false)",
  args: { decorative: false },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360, display: "grid", gap: 12, color: "var(--color-fg-default)" }}>
      <div style={{ font: "var(--text-body-md)" }}>Inbox · Mentions · Created by you</div>
      <Separator decorative={false} />
      <div style={{ font: "var(--text-body-md)" }}>Open · Snoozed · Closed</div>
    </div>
  ),
};
