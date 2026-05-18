import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Star, Underline } from "lucide-react";
import { Icon, Toggle } from "@azeer/ui";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Single pressable — off ⇄ on. Use ToggleGroup for mutually exclusive choices.",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"],
    },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    pressed: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Toggle {...args}>Pin</Toggle>,
};

export const Pressed: Story = {
  args: { defaultPressed: true },
  render: (args) => <Toggle {...args}>Pinned</Toggle>,
};

export const IconOnly: Story = {
  name: "Icon-only (composer toolbar pattern)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-1">
      <Toggle size="icon-sm" aria-label="Bold">
        <Icon icon={Bold} size={14} aria-hidden="true" />
      </Toggle>
      <Toggle size="icon-sm" aria-label="Italic" defaultPressed>
        <Icon icon={Italic} size={14} aria-hidden="true" />
      </Toggle>
      <Toggle size="icon-sm" aria-label="Underline">
        <Icon icon={Underline} size={14} aria-hidden="true" />
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" defaultPressed>Small</Toggle>
      <Toggle size="md" defaultPressed>Medium</Toggle>
      <Toggle size="lg" defaultPressed>Large</Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Toggle {...args}>Disabled</Toggle>,
};

export const WithIconAndLabel: Story = {
  name: "Icon + label",
  parameters: { controls: { disable: true } },
  render: () => (
    <Toggle defaultPressed>
      <Icon icon={Star} size={16} aria-hidden="true" /> Star
    </Toggle>
  ),
};
