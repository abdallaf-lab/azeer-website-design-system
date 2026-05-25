import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, Star } from "lucide-react";
import { Button, Icon, Tooltip, TooltipContent, TooltipTrigger } from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Tooltip",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Dark-surface tooltip — 500 ms open / 100 ms close, 240 px max width",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltips appear after 500 ms.</TooltipContent>
    </Tooltip>
  ),
};

export const OnIconButton: Story = {
  name: "On icon-only button",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-md" variant="ghost" aria-label="Star conversation">
          <Icon icon={Star} size={16} aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Star conversation</TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  name: "All sides",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: 24, placeItems: "center" }}>
      <span />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Top tooltip</TooltipContent>
      </Tooltip>
      <span />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Left tooltip</TooltipContent>
      </Tooltip>
      <span />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Right tooltip</TooltipContent>
      </Tooltip>
      <span />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
      </Tooltip>
      <span />
    </div>
  ),
};

export const LongContent: Story = {
  name: "Long content (max-width 240 px)",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="More info">
          <Icon icon={Info} size={14} aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Conversations close automatically after 30 days of inactivity. Customers
        can re-open them by sending a new message.
      </TooltipContent>
    </Tooltip>
  ),
};
