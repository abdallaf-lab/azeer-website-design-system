import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ConfirmDialog } from "@azeer/ui";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Primitives/ConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Locked destructive / irreversible confirmation pattern (Errors.md Rule 2)",
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    destructive: { control: "boolean" },
  },
  args: {
    title: "Delete conversation?",
    description:
      "Sara Khan will be removed from your contact list. This cannot be undone.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    destructive: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Destructive: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      onConfirm={() => console.log("Confirmed")}
      trigger={<Button variant="destructive">Delete</Button>}
    />
  ),
};

export const NonDestructive: Story = {
  name: "Primary (non-destructive)",
  args: {
    title: "Send broadcast?",
    description: "1,284 contacts will receive this message immediately.",
    confirmLabel: "Send",
    destructive: false,
  },
  render: (args) => (
    <ConfirmDialog
      {...args}
      onConfirm={() => console.log("Confirmed")}
      trigger={<Button>Send broadcast</Button>}
    />
  ),
};

export const DiscardChanges: Story = {
  name: "Discard unsaved changes",
  args: {
    title: "Discard unsaved changes?",
    description: "Your edits will be lost if you leave without saving.",
    confirmLabel: "Discard",
    cancelLabel: "Keep editing",
    destructive: true,
  },
  render: (args) => (
    <ConfirmDialog
      {...args}
      onConfirm={() => console.log("Discarded")}
      trigger={<Button variant="ghost">Leave page</Button>}
    />
  ),
};

export const Controlled: Story = {
  name: "Controlled (programmatic open)",
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-3 items-start">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Trigger from parent
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Close conversation?"
          description="This will move the conversation to your archive."
          confirmLabel="Close"
          destructive
          onConfirm={() => {
            console.log("Confirmed");
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
