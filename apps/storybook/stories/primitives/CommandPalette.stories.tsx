import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Archive,
  ArrowRight,
  BookOpen,
  Inbox,
  Megaphone,
  Pin,
  Plus,
  Reply,
  Settings,
  Star,
  Users,
} from "lucide-react";
import {
  Button,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPalette,
  CommandSeparator,
  Icon,
  Kbd,
} from "@azeer/ui";

const meta: Meta<typeof CommandPalette> = {
  title: "Primitives/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "cmdk + Dialog composition — DS-locked ⌘K global shortcut",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    enableGlobalShortcut: { control: "boolean" },
  },
  args: {
    size: "md",
    enableGlobalShortcut: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-body-md text-fg-default">
          Press <Kbd>⌘K</Kbd> (or <Kbd>Ctrl+K</Kbd>) — or click the button.
        </p>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <CommandPalette {...args} open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Reply} size={14} aria-hidden="true" />
                Reply to conversation
                <span className="ms-auto">
                  <Kbd>R</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Star} size={14} aria-hidden="true" />
                Star conversation
                <span className="ms-auto">
                  <Kbd>S</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Pin} size={14} aria-hidden="true" />
                Pin to top
                <span className="ms-auto">
                  <Kbd>P</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Archive} size={14} aria-hidden="true" />
                Archive
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Inbox} size={14} aria-hidden="true" />
                Go to Inbox
                <span className="ms-auto">
                  <Kbd>g</Kbd> <Kbd>i</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Users} size={14} aria-hidden="true" />
                Go to Contacts
                <span className="ms-auto">
                  <Kbd>g</Kbd> <Kbd>c</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Megaphone} size={14} aria-hidden="true" />
                Go to Outbound
                <span className="ms-auto">
                  <Kbd>g</Kbd> <Kbd>o</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={BookOpen} size={14} aria-hidden="true" />
                Go to Knowledge
                <span className="ms-auto">
                  <Kbd>g</Kbd> <Kbd>k</Kbd>
                </span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Settings} size={14} aria-hidden="true" />
                Open settings
                <span className="ms-auto">
                  <Kbd>g</Kbd> <Kbd>s</Kbd>
                </span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Plus} size={14} aria-hidden="true" />
                Invite teammate
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandPalette>
      </div>
    );
  },
};

export const Minimal: Story = {
  name: "Minimal — just navigation",
  parameters: { controls: { disable: true } },
  render: function MinimalStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open palette</Button>
        <CommandPalette open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Where do you want to go?" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Inbox} size={14} aria-hidden="true" />
                Inbox
                <Icon icon={ArrowRight} size={14} aria-hidden="true" className="ms-auto text-fg-muted" />
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Users} size={14} aria-hidden="true" />
                Contacts
                <Icon icon={ArrowRight} size={14} aria-hidden="true" className="ms-auto text-fg-muted" />
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Icon icon={Settings} size={14} aria-hidden="true" />
                Settings
                <Icon icon={ArrowRight} size={14} aria-hidden="true" className="ms-auto text-fg-muted" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandPalette>
      </>
    );
  },
};

export const ShortcutDisabled: Story = {
  name: "Without global ⌘K shortcut",
  parameters: { controls: { disable: true } },
  render: function NoShortcutStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-3 items-center">
        <p className="text-body-sm text-fg-muted">
          Pressing ⌘K won't open this palette — only the button does.
        </p>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <CommandPalette open={open} onOpenChange={setOpen} enableGlobalShortcut={false}>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              <CommandItem>One option</CommandItem>
              <CommandItem>Another option</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandPalette>
      </div>
    );
  },
};
