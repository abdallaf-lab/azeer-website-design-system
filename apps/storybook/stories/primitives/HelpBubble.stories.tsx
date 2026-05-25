import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookOpen, MessageCircle } from "lucide-react";
import { Button, HelpBubble } from "@azeer/ui";

const meta: Meta<typeof HelpBubble> = {
  title: "Primitives/HelpBubble",
  component: HelpBubble,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle: "Fixed bottom-end 44×44 help affordance — mounted once at the app root",
    },
  },
  argTypes: {
    hasNotification: { control: "boolean" },
  },
  args: {
    hasNotification: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="h-[500px] relative bg-canvas">
      <p className="absolute top-4 start-4 text-body-md text-fg-muted">
        Look at the bottom-end corner ↘
      </p>
      <HelpBubble {...args} aria-label="Open help">
        <div className="flex flex-col gap-3">
          <h3 className="text-heading-sm text-fg-default m-0">Need help?</h3>
          <p className="text-body-md text-fg-muted m-0">
            Browse our docs or chat with support — we usually reply in under
            5 minutes during business hours.
          </p>
          <div className="flex gap-2">
            <Button size="sm">Start a chat</Button>
            <Button size="sm" variant="secondary">
              Browse docs
            </Button>
          </div>
        </div>
      </HelpBubble>
    </div>
  ),
};

export const WithNotification: Story = {
  name: "With notification dot",
  args: { hasNotification: true },
  render: Default.render,
};

export const CustomIcon: Story = {
  name: "Chat-style icon",
  render: () => (
    <div className="h-[500px] relative bg-canvas">
      <HelpBubble
        icon={MessageCircle}
        aria-label="Chat with support"
        hasNotification
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-heading-sm text-fg-default m-0">Chat with support</h3>
          <p className="text-body-md text-fg-muted m-0">
            Average reply time: 3 minutes.
          </p>
          <Button size="sm">Start a chat</Button>
        </div>
      </HelpBubble>
    </div>
  ),
};

export const DocsBubble: Story = {
  name: "Docs-style (different content)",
  render: () => (
    <div className="h-[500px] relative bg-canvas">
      <HelpBubble icon={BookOpen} aria-label="Open documentation">
        <div className="flex flex-col gap-2">
          <h3 className="text-heading-sm text-fg-default m-0">Documentation</h3>
          <ul className="flex flex-col gap-1 text-body-md p-0 m-0 list-none">
            <li>
              <a
                href="#"
                className="text-accent-fill underline-offset-4 hover:underline"
              >
                Getting started
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-accent-fill underline-offset-4 hover:underline"
              >
                Channels &amp; integrations
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-accent-fill underline-offset-4 hover:underline"
              >
                API reference
              </a>
            </li>
          </ul>
        </div>
      </HelpBubble>
    </div>
  ),
};
