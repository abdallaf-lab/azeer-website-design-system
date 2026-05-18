import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronDown,
  Copy,
  Forward,
  MailPlus,
  Pin,
  Reply,
  Star,
  Trash2,
} from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  Kbd,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/DropdownMenu",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Canonical menu surface — keyboard-driven, accent-tinted highlight",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          Actions <Icon icon={ChevronDown} size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Icon icon={Reply} size={14} aria-hidden="true" />
          Reply
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon={Forward} size={14} aria-hidden="true" />
          Forward
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon={Copy} size={14} aria-hidden="true" />
          Copy text
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Icon icon={Trash2} size={14} aria-hidden="true" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabelsAndShortcuts: Story = {
  name: "Labels + shortcuts",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          Conversation <Icon icon={ChevronDown} size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon icon={Reply} size={14} aria-hidden="true" />
            Reply
            <DropdownMenuShortcut>
              <Kbd>R</Kbd>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon={Star} size={14} aria-hidden="true" />
            Star
            <DropdownMenuShortcut>
              <Kbd>S</Kbd>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon={Pin} size={14} aria-hidden="true" />
            Pin to top
            <DropdownMenuShortcut>
              <Kbd>P</Kbd>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Forward</DropdownMenuLabel>
        <DropdownMenuItem>
          <Icon icon={MailPlus} size={14} aria-hidden="true" />
          Forward as email
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon={Forward} size={14} aria-hidden="true" />
          Forward to teammate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Icon icon={Trash2} size={14} aria-hidden="true" />
          Delete conversation
          <DropdownMenuShortcut>
            <Kbd>⌘⌫</Kbd>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithDisabled: Story = {
  name: "With disabled item",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          Export <Icon icon={ChevronDown} size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem>Export as JSON</DropdownMenuItem>
        <DropdownMenuItem disabled>Export as PDF (Pro plan)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
