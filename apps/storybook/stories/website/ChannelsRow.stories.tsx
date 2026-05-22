import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChannelsRow } from "@azeer/website-ui";

const meta: Meta<typeof ChannelsRow> = {
  title: "Website/ChannelsRow",
  component: ChannelsRow,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Supported messaging channels via the DS ChannelIcon (brand-tinted tokens)." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ChannelsRow
      eyebrow="Omnichannel"
      title="Meet customers where they are"
      description="Connect every channel and manage them from one threaded workspace."
    />
  ),
};

export const Subset: Story = {
  render: () => (
    <ChannelsRow
      title="Messaging channels"
      channels={["whatsapp", "sms", "email", "telegram"]}
    />
  ),
};
