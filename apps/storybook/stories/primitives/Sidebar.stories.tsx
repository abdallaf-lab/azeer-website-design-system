import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AtSign,
  Hash,
  Inbox,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button, Sidebar, SidebarItem } from "@azeer/ui";

const meta: Meta<typeof Sidebar> = {
  title: "Primitives/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "L2 secondary nav — 230 px white island, rounded-xl, intent-tinted active state",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[600px] bg-canvas p-4">
      <Sidebar title="Inbox">
        <SidebarItem icon={Inbox} label="Your inbox" active trailing="12" />
        <SidebarItem icon={AtSign} label="Mentions" trailing="3" />
        <SidebarItem icon={Star} label="Starred" />
        <SidebarItem icon={Hash} label="Created by you" />
        <SidebarItem icon={Users} label="All conversations" />
      </Sidebar>
    </div>
  ),
};

export const WithFooter: Story = {
  name: "With footer slot",
  render: () => (
    <div className="h-[600px] bg-canvas p-4">
      <Sidebar
        title="Inbox"
        footer={
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Sparkles size={14} aria-hidden="true" /> AI suggestions
          </Button>
        }
      >
        <SidebarItem icon={Inbox} label="Your inbox" active trailing="12" />
        <SidebarItem icon={AtSign} label="Mentions" trailing="3" />
        <SidebarItem icon={Star} label="Starred" />
        <SidebarItem icon={Hash} label="Created by you" />
      </Sidebar>
    </div>
  ),
};

export const MultipleSections: Story = {
  name: "Multiple titled sections",
  render: () => (
    <div className="h-[600px] bg-canvas p-4">
      <Sidebar>
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1.5 text-label-xs text-fg-muted">VIEWS</div>
          <SidebarItem icon={Inbox} label="Your inbox" active trailing="12" />
          <SidebarItem icon={AtSign} label="Mentions" trailing="3" />
          <SidebarItem icon={Star} label="Starred" />
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <div className="px-2 py-1.5 text-label-xs text-fg-muted">TEAM INBOXES</div>
          <SidebarItem icon={Hash} label="Support" trailing="8" />
          <SidebarItem icon={Hash} label="Sales" trailing="2" />
          <SidebarItem icon={Hash} label="Billing" />
        </div>
      </Sidebar>
    </div>
  ),
};
