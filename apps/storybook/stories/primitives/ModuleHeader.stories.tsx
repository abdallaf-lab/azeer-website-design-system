import type { Meta, StoryObj } from "@storybook/react-vite";
import { Filter, Plus } from "lucide-react";
import { Badge, Button, Icon, ModuleHeader } from "@azeer/ui";

const meta: Meta<typeof ModuleHeader> = {
  title: "Primitives/ModuleHeader",
  component: ModuleHeader,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "64 px header inside the Main card — scrolls with content, not viewport-fixed",
    },
  },
  argTypes: {
    title: { control: "text" },
    meta: { control: "text" },
  },
  args: {
    title: "Inbox",
    meta: "12 open conversations",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="rounded-xl border border-border-default bg-surface overflow-hidden" style={{ width: 800 }}>
      <ModuleHeader {...args} />
      <div className="p-6 text-body-md text-fg-default">
        Module body content goes here.
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  name: "With trailing actions",
  args: {
    title: "Contacts",
    meta: "847 total · 12 added this week",
  },
  render: (args) => (
    <div className="rounded-xl border border-border-default bg-surface overflow-hidden" style={{ width: 800 }}>
      <ModuleHeader
        {...args}
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon icon={Filter} size={14} aria-hidden="true" />
              Filter
            </Button>
            <Button size="sm">
              <Icon icon={Plus} size={14} aria-hidden="true" />
              Add contact
            </Button>
          </>
        }
      />
      <div className="p-6 text-body-md text-fg-default">
        Module body content.
      </div>
    </div>
  ),
};

export const TitleOnly: Story = {
  name: "Title only (no meta or actions)",
  args: { title: "Settings", meta: undefined },
  render: Default.render,
};

export const WithBadge: Story = {
  name: "Title with inline badge",
  args: { title: undefined, meta: "Beta build · v0.6.2" },
  render: (args) => (
    <div className="rounded-xl border border-border-default bg-surface overflow-hidden" style={{ width: 800 }}>
      <ModuleHeader
        {...args}
        title={
          <span className="inline-flex items-center gap-2">
            Fin AI Agent
            <Badge variant="accent" size="sm">Beta</Badge>
          </span>
        }
      />
      <div className="p-6 text-body-md text-fg-default">Module body.</div>
    </div>
  ),
};
