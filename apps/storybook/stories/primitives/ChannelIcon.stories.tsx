import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, CHANNELS, ChannelIcon } from "@azeer/ui";

const meta: Meta<typeof ChannelIcon> = {
  title: "Primitives/ChannelIcon",
  component: ChannelIcon,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Channel mark — icon + brand color. Placeholders until brand SVGs land.",
    },
  },
  argTypes: {
    channel: { control: "select", options: CHANNELS },
    size: { control: "select", options: [12, 14, 16, 20, 24] },
    decorative: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    channel: "whatsapp",
    size: 16,
    decorative: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllChannels: Story = {
  name: "All channels",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
      {CHANNELS.map((c) => (
        <div
          key={c}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ChannelIcon channel={c} size={24} />
          <span style={{ font: "var(--text-body-xs)", color: "var(--color-fg-muted)" }}>
            {c}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ChannelIcon channel="whatsapp" size={12} />
      <ChannelIcon channel="whatsapp" size={14} />
      <ChannelIcon channel="whatsapp" size={16} />
      <ChannelIcon channel="whatsapp" size={20} />
      <ChannelIcon channel="whatsapp" size={24} />
    </div>
  ),
};

export const InsideBadge: Story = {
  name: "Inside a Badge (filter chip pattern)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CHANNELS.map((c) => (
        <Badge key={c} variant="outline" removable>
          <ChannelIcon channel={c} size={12} decorative />
          <span style={{ textTransform: "capitalize" }}>{c}</span>
        </Badge>
      ))}
    </div>
  ),
};
