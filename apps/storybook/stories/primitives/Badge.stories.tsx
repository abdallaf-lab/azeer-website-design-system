import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@azeer/ui";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "7 variants × 2 sizes — the inline-metadata primitive",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "destructive", "accent", "outline"],
      table: { defaultValue: { summary: "neutral" } },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "md" } },
    },
    removable: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "neutral",
    size: "md",
    removable: false,
    children: "Default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Info: Story = { args: { variant: "info", children: "Beta" } };
export const Success: Story = { args: { variant: "success", children: "Active" } };
export const Warning: Story = { args: { variant: "warning", children: "Pending" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Failed" } };
export const Accent: Story = { args: { variant: "accent", children: "Pro" } };
export const Outline: Story = { args: { variant: "outline", children: "WhatsApp" } };

export const AllVariants: Story = {
  name: "All variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="neutral">Default</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="accent">Pro</Badge>
      <Badge variant="outline">WhatsApp</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium (default)</Badge>
    </div>
  ),
};

export const Removable: Story = {
  args: { variant: "outline", removable: true, children: "WhatsApp" },
};

export const FilterChips: Story = {
  name: "Filter chips (composition)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="outline" removable removeLabel="Remove channel filter">
        All channels
      </Badge>
      <Badge variant="outline" removable removeLabel="Remove status filter">
        Active
      </Badge>
      <Badge variant="outline" removable removeLabel="Remove date filter">
        Last 7 days
      </Badge>
    </div>
  ),
};

export const UserTags: Story = {
  name: "User-applied tags",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="accent" removable removeLabel="Remove VIP tag">
        VIP
      </Badge>
      <Badge variant="accent" removable removeLabel="Remove Important tag">
        Important
      </Badge>
      <Badge variant="neutral" removable removeLabel="Remove Auto-assigned tag">
        Auto-assigned
      </Badge>
    </div>
  ),
};
