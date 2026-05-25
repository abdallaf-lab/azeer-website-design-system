import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@azeer/ui";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "4 variants × 6 sizes — the locked action primitive",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
      description: "Locked variant set — ESLint enforces the allowlist",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"],
      description: "Locked control sizes — 32 / 40 / 48 px (labels) + icon-* (squares)",
      table: { defaultValue: { summary: "md" } },
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    children: "Save changes",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancel" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Skip" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const AllVariants: Story = {
  name: "All variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  name: "Icon sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="icon-sm" aria-label="Star">
        ★
      </Button>
      <Button size="icon-md" aria-label="Star">
        ★
      </Button>
      <Button size="icon-lg" aria-label="Star">
        ★
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullMatrix: Story = {
  name: "Full matrix",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => {
    const variants = ["primary", "secondary", "ghost", "destructive"] as const;
    const sizes = ["sm", "md", "lg"] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px repeat(3, auto)",
          gap: 12,
          alignItems: "center",
        }}
      >
        <span />
        {sizes.map((s) => (
          <strong
            key={s}
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-fg-muted)",
            }}
          >
            {s}
          </strong>
        ))}
        {variants.map((v) => (
          <React.Fragment key={v}>
            <strong
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-fg-muted)",
              }}
            >
              {v}
            </strong>
            {sizes.map((s) => (
              <Button key={s} variant={v} size={s}>
                {v === "destructive" ? "Delete" : "Save changes"}
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  },
};
