import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AtSign,
  Bell,
  BookOpen,
  Filter,
  HelpCircle,
  Home,
  Inbox,
  Megaphone,
  Plus,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import {
  AppShell,
  Avatar,
  Badge,
  Banner,
  Button,
  HelpBubble,
  Icon,
  ModuleHeader,
  PrimaryRail,
  PrimaryRailItem,
  ShellPanel,
  Sidebar,
  SidebarItem,
} from "@azeer/ui";

const meta: Meta<typeof AppShell> = {
  title: "Primitives/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle: "The workspace chassis — standard (L1+L2+Main) or objectDetail (5-zone Inbox)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Logo = ({ collapsed }: { collapsed: boolean }) => (
  <div className={`flex items-center ${collapsed ? "justify-center" : ""}`}>
    <img
      src="/azeer-brand.svg"
      alt="Azeer"
      width={28}
      height={28}
      className="h-7 w-7 shrink-0"
    />
  </div>
);

const RailFooter = ({ collapsed }: { collapsed: boolean }) => (
  <>
    <PrimaryRailItem
      icon={Bell}
      label="Notifications"
      collapsed={collapsed}
      trailing={collapsed ? null : <Badge size="sm" variant="destructive">3</Badge>}
    />
    <PrimaryRailItem icon={Settings} label="Settings" collapsed={collapsed} />
    <button
      type="button"
      className={`inline-flex items-center gap-3 h-10 rounded-md cursor-pointer hover:bg-state-hover ${collapsed ? "w-10 justify-center px-0" : "px-3"}`}
    >
      <Avatar size="sm" alt="Sara Khan" name="Sara Khan" presence="online" />
      {!collapsed && (
        <span className="flex-1 text-start truncate text-body-md text-fg-default">
          Sara Khan
        </span>
      )}
    </button>
  </>
);

/* ─────── Standard variant ─────────────────────────────────────────────── */

export const Standard: Story = {
  name: "Standard (3-zone)",
  render: function StandardStory() {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <AppShell
        primaryRail={
          <PrimaryRail
            collapsed={collapsed}
            logo={<Logo collapsed={collapsed} />}
            footer={<RailFooter collapsed={collapsed} />}
          >
            <PrimaryRailItem icon={Home} label="Home" active collapsed={collapsed} />
            <PrimaryRailItem icon={Inbox} label="Inbox" collapsed={collapsed} trailing={collapsed ? null : <Badge size="sm" variant="accent">12</Badge>} />
            <PrimaryRailItem icon={Sparkles} label="AI Agent" collapsed={collapsed} />
            <PrimaryRailItem icon={Users} label="Contacts" collapsed={collapsed} />
            <PrimaryRailItem icon={Megaphone} label="Broadcast" collapsed={collapsed} />
            <PrimaryRailItem icon={ShoppingBag} label="Ecommerce-Apps" collapsed={collapsed} />
          </PrimaryRail>
        }
        sidebar={
          <Sidebar title="Knowledge base">
            <SidebarItem icon={BookOpen} label="All articles" active trailing="247" />
            <SidebarItem icon={Star} label="Featured" trailing="12" />
            <SidebarItem icon={AtSign} label="Drafts" trailing="3" />
            <SidebarItem icon={Users} label="By team" />
          </Sidebar>
        }
        banner={
          <Banner
            intent="accent"
            title="Your trial expires in 3 days"
            action={<Button size="sm">Upgrade now</Button>}
            dismissible
          >
            Upgrade to keep your data and team access.
          </Banner>
        }
        helpBubble={
          <HelpBubble icon={HelpCircle} aria-label="Open help" hasNotification>
            <div className="flex flex-col gap-2">
              <h3 className="text-heading-sm text-fg-default m-0">Need help?</h3>
              <p className="text-body-md text-fg-muted m-0">
                Chat with support — average reply 3 min.
              </p>
              <Button size="sm">Start a chat</Button>
            </div>
          </HelpBubble>
        }
      >
        <ModuleHeader
          title="Knowledge base"
          meta="247 articles · 12 featured"
          actions={
            <>
              <Button variant="secondary" size="sm">
                <Icon icon={Filter} size={14} aria-hidden="true" />
                Filter
              </Button>
              <Button size="sm">
                <Icon icon={Plus} size={14} aria-hidden="true" />
                New article
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={collapsed ? "Expand rail" : "Collapse rail"}
                onClick={() => setCollapsed((c) => !c)}
                className="ms-2"
              >
                {collapsed ? "→" : "←"}
              </Button>
            </>
          }
        />
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-body-md text-fg-default mb-2">
            Module body content goes here. The Main card has{" "}
            <code>rounded-xl</code> corners, a 1 px border, and a white
            surface — the canvas (lavender) shows through the 4 px gutters.
          </p>
          <p className="text-body-md text-fg-muted">
            Click the arrow in the top-right to toggle the L1 rail. Try the
            HelpBubble in the corner. Flip the toolbar to RTL to verify
            mirroring.
          </p>
        </div>
      </AppShell>
    );
  },
};

/* ─────── ObjectDetail variant (Inbox) ─────────────────────────────────── */

export const ObjectDetail: Story = {
  name: "ObjectDetail (Inbox — 5-zone)",
  render: function ObjectDetailStory() {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <AppShell
        variant="objectDetail"
        primaryRail={
          <PrimaryRail
            collapsed={collapsed}
            logo={<Logo collapsed={collapsed} />}
            footer={<RailFooter collapsed={collapsed} />}
          >
            <PrimaryRailItem icon={Home} label="Home" collapsed={collapsed} />
            <PrimaryRailItem icon={Inbox} label="Inbox" active collapsed={collapsed} trailing={collapsed ? null : <Badge size="sm" variant="accent">12</Badge>} />
            <PrimaryRailItem icon={Sparkles} label="AI Agent" collapsed={collapsed} />
            <PrimaryRailItem icon={Users} label="Contacts" collapsed={collapsed} />
            <PrimaryRailItem icon={Megaphone} label="Broadcast" collapsed={collapsed} />
            <PrimaryRailItem icon={ShoppingBag} label="Ecommerce-Apps" collapsed={collapsed} />
          </PrimaryRail>
        }
        folders={
          <ShellPanel width={200} ariaLabel="Folders">
            <div className="p-2 flex flex-col gap-1">
              <div className="px-2 py-1.5 text-label-xs text-fg-muted">VIEWS</div>
              <SidebarItem icon={Inbox} label="Your inbox" active trailing="12" />
              <SidebarItem icon={AtSign} label="Mentions" trailing="3" />
              <SidebarItem icon={Star} label="Starred" />
              <div className="px-2 py-1.5 mt-2 text-label-xs text-fg-muted">TEAMS</div>
              <SidebarItem icon={Users} label="Support" trailing="8" />
              <SidebarItem icon={Users} label="Sales" />
            </div>
          </ShellPanel>
        }
        list={
          <ShellPanel width={280} ariaLabel="Conversation list">
            <div className="p-3 border-b border-border-divider text-label-xs text-fg-muted">
              12 CONVERSATIONS
            </div>
            <div className="flex-1 overflow-y-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 border-b border-border-divider cursor-pointer ${i === 0 ? "bg-accent-bg-subtle" : "hover:bg-state-hover"}`}
                >
                  <Avatar size="sm" alt={`Contact ${i + 1}`} name={`User ${i + 1}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm font-medium text-fg-default truncate">
                        User {i + 1}
                      </span>
                      <span className="text-body-xs text-fg-muted shrink-0 ms-2">
                        {i === 0 ? "now" : `${i * 3} min`}
                      </span>
                    </div>
                    <div className="text-body-xs text-fg-muted truncate">
                      Latest message preview…
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ShellPanel>
        }
        details={
          <ShellPanel width={320} ariaLabel="Details">
            <div className="p-5 border-b border-border-divider">
              <div className="text-label-xs text-fg-muted mb-2">ASSIGNEE</div>
              <div className="flex items-center gap-2">
                <Avatar size="sm" alt="Sara Khan" name="Sara Khan" />
                <span className="text-body-md text-fg-default">Sara Khan</span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-label-xs text-fg-muted mb-2">CONVERSATION ATTRIBUTES</div>
              <dl className="grid grid-cols-2 gap-2 text-body-sm">
                <dt className="text-fg-muted">Id</dt>
                <dd className="text-fg-default font-mono">113962</dd>
                <dt className="text-fg-muted">Channel</dt>
                <dd className="text-fg-default">WhatsApp</dd>
                <dt className="text-fg-muted">Priority</dt>
                <dd><Badge variant="warning" size="sm">High</Badge></dd>
              </dl>
            </div>
          </ShellPanel>
        }
        helpBubble={<HelpBubble aria-label="Open help"><p>Help content</p></HelpBubble>}
      >
        <ModuleHeader
          title="User 1"
          meta="WhatsApp · Customer Support · 12 messages"
          actions={
            <>
              <Button variant="ghost" size="icon-sm" aria-label="Star">
                <Icon icon={Star} size={14} aria-hidden="true" />
              </Button>
              <Button size="sm">Reply</Button>
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={collapsed ? "Expand rail" : "Collapse rail"}
                onClick={() => setCollapsed((c) => !c)}
              >
                {collapsed ? "→" : "←"}
              </Button>
            </>
          }
        />
        <div className="flex-1 overflow-y-auto p-6 bg-canvas">
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-lg p-3 max-w-[70%] ${
                  i % 2 === 0
                    ? "bg-surface border border-border-default self-start"
                    : "bg-accent-fill text-fg-on-accent self-end"
                }`}
              >
                <p className="text-body-md m-0">
                  {i % 2 === 0
                    ? "Hi, I'm checking on order #18247."
                    : "Hello! Let me look that up for you."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  },
};
