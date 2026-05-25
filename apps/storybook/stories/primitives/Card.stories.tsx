import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from "@azeer/ui";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Resting surface — border-only elevation, locked padding presets",
    },
  },
  argTypes: {
    padding: { control: "radio", options: ["default", "compact", "none"] },
  },
  args: {
    padding: "default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Conversation attributes</CardTitle>
        <CardDescription>System fields applied to every inbound message.</CardDescription>
      </CardHeader>
      <CardBody>
        <div>Id · Channel · Brand · Language · Priority</div>
      </CardBody>
      <CardFooter>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const Compact: Story = {
  args: { padding: "compact" },
  render: Default.render,
};

export const NoPadding: Story = {
  name: "Padding=none (composer owns layout)",
  args: { padding: "none" },
  render: (args) => (
    <Card {...args} style={{ width: 400 }}>
      <div style={{ padding: 20 }}>
        <CardTitle>Custom layout</CardTitle>
        <CardDescription>The card supplies surface + border; padding is yours.</CardDescription>
      </div>
      <Separator decorative={false} />
      <div style={{ padding: 20 }}>
        <CardBody>
          <div>Useful for cards with edge-to-edge media or tables.</div>
        </CardBody>
      </div>
    </Card>
  ),
};

export const WithBadge: Story = {
  name: "With badge in header",
  parameters: { controls: { disable: true } },
  render: () => (
    <Card style={{ width: 400 }}>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardTitle>WhatsApp Business API</CardTitle>
          <Badge variant="success">Active</Badge>
        </div>
        <CardDescription>Connected · Last sync 2 minutes ago</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Disconnect
        </Button>
        <Button variant="secondary" size="sm">
          Manage
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ContactCard: Story = {
  name: "Contact card composition",
  parameters: { controls: { disable: true } },
  render: () => (
    <Card style={{ width: 360 }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar alt="Sara Khan" name="Sara Khan" size="lg" presence="online" />
          <div>
            <CardTitle>Sara Khan</CardTitle>
            <CardDescription>VIP · Customer Support</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Badge variant="accent">VIP</Badge>
          <Badge variant="neutral">English</Badge>
          <Badge variant="outline">Last seen 2 min ago</Badge>
        </div>
      </CardBody>
      <CardFooter>
        <Button size="sm">Reply</Button>
      </CardFooter>
    </Card>
  ),
};
