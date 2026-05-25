import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, toast } from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Toast",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Sonner under the hood — locked durations, top-end (auto-RTL), max 3 visible",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Success: Story = {
  name: "success — 3 s",
  render: () => (
    <Button onClick={() => toast.success("Message sent")}>Show success</Button>
  ),
};

export const Info: Story = {
  name: "info — 4 s",
  render: () => (
    <Button variant="secondary" onClick={() => toast.info("Sync started in background")}>
      Show info
    </Button>
  ),
};

export const Warning: Story = {
  name: "warning — 5 s",
  render: () => (
    <Button
      variant="secondary"
      onClick={() => toast.warning("Approaching SMS quota (8,247 / 10,000)")}
    >
      Show warning
    </Button>
  ),
};

export const ErrorToast: Story = {
  name: "error — persistent",
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast.error("Webhook returned 502", {
          action: { label: "Retry", onClick: () => toast.success("Retried") },
        })
      }
    >
      Show error
    </Button>
  ),
};

export const Loading: Story = {
  name: "loading — until dismissed",
  render: () => (
    <Button
      variant="secondary"
      onClick={() => {
        const id = toast.loading("Sending broadcast…");
        setTimeout(() => {
          toast.dismiss(id);
          toast.success("Broadcast sent to 1,284 contacts");
        }, 2000);
      }}
    >
      Show loading → success
    </Button>
  ),
};

export const AI: Story = {
  name: "ai — Sparkles in brand indigo",
  render: () => (
    <Button onClick={() => toast.ai("AI summary ready", { description: "Generated in 1.2 seconds" })}>
      Show AI toast
    </Button>
  ),
};

export const PromiseToast: Story = {
  name: "promise — auto loading → success/error",
  render: () => (
    <div className="flex gap-3">
      <Button
        onClick={() =>
          toast.promise(
            new Promise<number>((resolve) => setTimeout(() => resolve(1284), 1500)),
            {
              loading: "Sending broadcast…",
              success: (count) => `Broadcast sent to ${count} contacts`,
              error: "Couldn't send broadcast — try again",
            },
          )
        }
      >
        Promise (resolves)
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.promise(
            new Promise((_, reject) => setTimeout(() => reject(new Error("502")), 1500)),
            {
              loading: "Sending broadcast…",
              success: "Done",
              error: "Couldn't send broadcast — try again",
            },
          )
        }
      >
        Promise (rejects)
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  name: "With description",
  render: () => (
    <Button
      onClick={() =>
        toast.success("Template approved", {
          description: "Your WhatsApp template is ready to send.",
        })
      }
    >
      Show with description
    </Button>
  ),
};

export const StackMaxThree: Story = {
  name: "Stack rule — max 3 visible",
  parameters: { controls: { disable: true } },
  render: () => (
    <Button
      onClick={() => {
        toast.success("Toast 1 — newest at top");
        setTimeout(() => toast.info("Toast 2"), 250);
        setTimeout(() => toast.warning("Toast 3"), 500);
        setTimeout(() => toast.error("Toast 4 — pushes oldest out"), 750);
        setTimeout(() => toast.success("Toast 5 — pushes another"), 1000);
      }}
    >
      Fire 5 toasts
    </Button>
  ),
};

export const AllVariants: Story = {
  name: "All variants (one of each)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button size="sm" onClick={() => toast.success("Saved")}>success</Button>
      <Button size="sm" variant="secondary" onClick={() => toast.info("Synced")}>info</Button>
      <Button size="sm" variant="secondary" onClick={() => toast.warning("Approaching quota")}>warning</Button>
      <Button size="sm" variant="destructive" onClick={() => toast.error("Webhook 502")}>error</Button>
      <Button size="sm" variant="ghost" onClick={() => toast.ai("AI ready")}>ai</Button>
    </div>
  ),
};
