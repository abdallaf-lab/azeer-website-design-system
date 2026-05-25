import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Home,
  Inbox,
  Megaphone,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import {
  Avatar,
  Badge,
  PrimaryRail,
  PrimaryRailItem,
  usePrimaryRail,
} from "@azeer/ui";

const meta: Meta<typeof PrimaryRail> = {
  title: "Primitives/PrimaryRail",
  component: PrimaryRail,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "L1 chromeless rail — 196 px expanded / 56 px collapsed · hover to expand · pin to lock",
    },
  },
  argTypes: {
    defaultPinned: { control: "boolean" },
  },
  args: {
    defaultPinned: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* ─────── Demo helpers ─────────────────────────────────────────────────── */

const Logo = () => (
  <img
    src="/azeer-brand.svg"
    alt="Azeer"
    width={28}
    height={28}
    className="h-7 w-7 shrink-0"
  />
);

/** Footer reads live `collapsed` from the rail's context so it can swap
 *  between compact and expanded presentations as the rail auto-collapses. */
function Footer() {
  const { collapsed } = usePrimaryRail();
  return (
    <>
      <PrimaryRailItem
        icon={Bell}
        label="Notifications"
        trailing={collapsed ? null : <Badge size="sm" variant="destructive">3</Badge>}
      />
      <PrimaryRailItem icon={Settings} label="Settings" />
      <button
        type="button"
        className="inline-flex items-center gap-3 px-3 h-ctrl-md rounded-md cursor-pointer hover:bg-state-hover"
        aria-label={collapsed ? "Sara Khan" : undefined}
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
}

const RailDemo = ({ defaultPinned }: { defaultPinned: boolean }) => (
  <div className="h-screen bg-canvas flex">
    <PrimaryRail defaultPinned={defaultPinned} logo={<Logo />} footer={<Footer />}>
      <PrimaryRailItem icon={Home} label="Home" />
      <PrimaryRailItem icon={Inbox} label="Inbox" active trailing={<Badge size="sm" variant="accent">12</Badge>} />
      <PrimaryRailItem icon={Sparkles} label="AI Agent" />
      <PrimaryRailItem icon={Users} label="Contacts" />
      <PrimaryRailItem icon={Megaphone} label="Broadcast" />
      <PrimaryRailItem icon={ShoppingBag} label="Ecommerce-Apps" />
    </PrimaryRail>
    <div className="flex-1 flex items-center justify-center text-fg-muted text-body-md">
      ← Hover the rail to expand. Click the pin (top-right of the rail) to lock it open.
    </div>
  </div>
);

/* ─────── Stories ──────────────────────────────────────────────────────── */

export const Default: Story = {
  name: "Hover to expand",
  render: (args) => <RailDemo defaultPinned={args.defaultPinned ?? false} />,
};

export const StartPinned: Story = {
  name: "Pinned by default",
  args: { defaultPinned: true },
  render: (args) => <RailDemo defaultPinned={args.defaultPinned ?? true} />,
};

/** Legacy controlled mode — pass `collapsed` directly. Bypasses the
 *  hover-pin behavior; consumer fully owns the collapse state. */
export const Controlled: Story = {
  name: "Controlled (legacy)",
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
      <div className="h-screen bg-canvas flex">
        <PrimaryRail
          collapsed={collapsed}
          logo={<Logo />}
          footer={
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="inline-flex items-center gap-3 px-3 h-ctrl-md rounded-md cursor-pointer hover:bg-state-hover text-fg-muted text-body-md"
              aria-label={collapsed ? "Expand rail" : "Collapse rail"}
            >
              {collapsed ? "▶" : "◀ Collapse"}
            </button>
          }
        >
          <PrimaryRailItem icon={Home} label="Home" collapsed={collapsed} />
          <PrimaryRailItem icon={Inbox} label="Inbox" active collapsed={collapsed} />
          <PrimaryRailItem icon={Users} label="Contacts" collapsed={collapsed} />
        </PrimaryRail>
        <div className="flex-1 flex items-center justify-center text-fg-muted text-body-md">
          Click the bottom button to toggle.
        </div>
      </div>
    );
  },
};
