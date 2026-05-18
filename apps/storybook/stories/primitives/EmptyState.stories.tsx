import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart3, FileQuestion, Inbox, Lock, Search, Sparkles, Users } from "lucide-react";
import { Button, EmptyState } from "@azeer/ui";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "5-slot canonical layout — icon + headline + 1-sentence body + optional CTAs",
    },
  },
  argTypes: {
    size: { control: "radio", options: ["inline", "page"] },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    icon: Inbox,
    title: "No conversations yet",
    description: "When customers reach out on WhatsApp, Voice, or Instagram, they'll appear here.",
    size: "inline",
    action: (
      <Button>Connect a channel</Button>
    ),
    secondaryAction: (
      <a
        className="text-accent-fill underline-offset-4 hover:underline text-body-md"
        href="#"
      >
        Learn how it works
      </a>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineFirstTime: Story = {
  name: "Inline — first-time Inbox",
};

export const PageFirstTime: Story = {
  name: "Page — first-time route",
  args: { size: "page" },
};

export const FilterNoResults: Story = {
  name: "Filter / search no results",
  args: {
    icon: Search,
    title: "No results",
    description: "No conversations match \"acme\". Try a different search or check spelling.",
    action: undefined,
    secondaryAction: (
      <a
        className="text-accent-fill underline-offset-4 hover:underline text-body-md"
        href="#"
      >
        Clear filter
      </a>
    ),
  },
};

export const PermissionDenied: Story = {
  name: "Permission denied",
  args: {
    icon: Lock,
    title: "You don't have access",
    description: "This view is restricted to admins. Contact your workspace owner to request access.",
    action: undefined,
    secondaryAction: (
      <a
        className="text-accent-fill underline-offset-4 hover:underline text-body-md"
        href="#"
      >
        Contact admin
      </a>
    ),
  },
};

export const FirstTimeReports: Story = {
  name: "First-time reports",
  args: {
    icon: BarChart3,
    title: "No reports available",
    description: "Reports populate after your first week of activity.",
    action: undefined,
    secondaryAction: (
      <a
        className="text-accent-fill underline-offset-4 hover:underline text-body-md"
        href="#"
      >
        Read docs
      </a>
    ),
  },
};

export const FirstTimeContacts: Story = {
  name: "First-time contacts",
  args: {
    icon: Users,
    title: "No contacts yet",
    description: "Add a contact manually or import a CSV to get started.",
    action: <Button>Add a contact</Button>,
    secondaryAction: (
      <a
        className="text-accent-fill underline-offset-4 hover:underline text-body-md"
        href="#"
      >
        Import from CSV
      </a>
    ),
  },
};

export const NoAISuggestions: Story = {
  name: "No AI suggestions",
  args: {
    icon: Sparkles,
    title: "No AI suggestions",
    description: "AI couldn't find a similar past response. Try drafting manually.",
    action: undefined,
    secondaryAction: undefined,
  },
};

export const Fallback: Story = {
  name: "Generic fallback",
  args: {
    icon: FileQuestion,
    title: "Nothing to show",
    description: "When this view has content, it'll appear here.",
    action: undefined,
    secondaryAction: undefined,
  },
};
