import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { Icon, ToggleGroup, ToggleGroupItem } from "@azeer/ui";

/**
 * Radix ToggleGroup.Root props are a `single | multiple` discriminated union,
 * which Storybook's `StoryObj` can't represent (it collapses `args` to `never`).
 * We type the Meta against an explicit, flattened args surface and bake the
 * discriminant into each story's `render`.
 */
type ToggleGroupArgs = {
  type?: "single" | "multiple";
  disabled?: boolean;
  defaultValue?: string | string[];
};

const meta: Meta<ToggleGroupArgs> = {
  title: "Primitives/ToggleGroup",
  component: ToggleGroup as Meta<ToggleGroupArgs>["component"],
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Segmented control — single-select (mutually exclusive) or multi-select (composer)",
    },
  },
  argTypes: {
    type: { control: "radio", options: ["single", "multiple"] },
    disabled: { control: "boolean" },
  },
  args: {
    type: "single",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  name: "Single — one of three (alignment)",
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" size="icon-sm" aria-label="Align left">
        <Icon icon={AlignLeft} size={14} aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" size="icon-sm" aria-label="Align center">
        <Icon icon={AlignCenter} size={14} aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" size="icon-sm" aria-label="Align right">
        <Icon icon={AlignRight} size={14} aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultiSelect: Story = {
  name: "Multiple — composer toolbar pattern",
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" size="icon-sm" aria-label="Bold">
        <Icon icon={Bold} size={14} aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" size="icon-sm" aria-label="Italic">
        <Icon icon={Italic} size={14} aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" size="icon-sm" aria-label="Underline">
        <Icon icon={Underline} size={14} aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const LabelSegmented: Story = {
  name: "Single + label segmented (view picker)",
  render: () => (
    <ToggleGroup type="single" defaultValue="month">
      <ToggleGroupItem value="day" size="sm">Day</ToggleGroupItem>
      <ToggleGroupItem value="week" size="sm">Week</ToggleGroupItem>
      <ToggleGroupItem value="month" size="sm">Month</ToggleGroupItem>
      <ToggleGroupItem value="year" size="sm">Year</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" disabled>
      <ToggleGroupItem value="left" size="icon-sm" aria-label="Align left">
        <Icon icon={AlignLeft} size={14} aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" size="icon-sm" aria-label="Align center">
        <Icon icon={AlignCenter} size={14} aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" size="icon-sm" aria-label="Align right">
        <Icon icon={AlignRight} size={14} aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
