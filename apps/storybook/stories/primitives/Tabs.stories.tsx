import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@azeer/ui";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Underline-only style — pill tabs banned per DS canon",
    },
  },
  argTypes: {
    defaultValue: { control: "text" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
  args: {
    defaultValue: "open",
    orientation: "horizontal",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-[600px]">
      <TabsList>
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="snoozed">Snoozed</TabsTrigger>
        <TabsTrigger value="closed">Closed</TabsTrigger>
      </TabsList>
      <TabsContent value="open">
        <p className="text-body-md text-fg-default">
          12 open conversations. Reply latency averaging 4 minutes.
        </p>
      </TabsContent>
      <TabsContent value="snoozed">
        <p className="text-body-md text-fg-default">
          3 conversations snoozed until tomorrow.
        </p>
      </TabsContent>
      <TabsContent value="closed">
        <p className="text-body-md text-fg-default">
          247 conversations closed this week.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  name: "With disabled tab",
  render: () => (
    <Tabs defaultValue="general" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing (Pro plan)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p className="text-body-md text-fg-default">General settings.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="text-body-md text-fg-default">Notification preferences.</p>
      </TabsContent>
      <TabsContent value="integrations">
        <p className="text-body-md text-fg-default">Connected integrations.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  name: "Wider tab strip",
  render: () => (
    <Tabs defaultValue="all" className="w-[800px]">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="mine">Assigned to me</TabsTrigger>
        <TabsTrigger value="team">Team inbox</TabsTrigger>
        <TabsTrigger value="mentions">Mentions</TabsTrigger>
        <TabsTrigger value="vip">VIP</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p className="text-body-md text-fg-default">All conversations.</p>
      </TabsContent>
      <TabsContent value="mine">
        <p className="text-body-md text-fg-default">Assigned to you.</p>
      </TabsContent>
      <TabsContent value="team">
        <p className="text-body-md text-fg-default">Shared with your team.</p>
      </TabsContent>
      <TabsContent value="mentions">
        <p className="text-body-md text-fg-default">Mentions of @sara.</p>
      </TabsContent>
      <TabsContent value="vip">
        <p className="text-body-md text-fg-default">VIP-tagged conversations.</p>
      </TabsContent>
      <TabsContent value="archived">
        <p className="text-body-md text-fg-default">Archived conversations.</p>
      </TabsContent>
    </Tabs>
  ),
};
