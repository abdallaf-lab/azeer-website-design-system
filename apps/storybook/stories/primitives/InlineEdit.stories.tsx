import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InlineEdit } from "@azeer/ui";

const meta: Meta<typeof InlineEdit> = {
  title: "Primitives/InlineEdit",
  component: InlineEdit,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Click-to-edit pattern — Enter commits, Esc cancels",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    placeholder: "Empty",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = React.useState("Marketing campaigns Q4");
    return (
      <div style={{ width: 480 }}>
        <InlineEdit {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
};

export const SettingsTitle: Story = {
  name: "Settings title pattern",
  parameters: { controls: { disable: true } },
  render: function TitleStory() {
    const [value, setValue] = React.useState("Customer Support team");
    return (
      <div className="flex flex-col gap-1" style={{ width: 480 }}>
        <span className="text-label-xs text-fg-muted uppercase">TEAM NAME</span>
        <InlineEdit
          value={value}
          onValueChange={setValue}
          textClassName="text-heading-md"
          ariaLabel="Edit team name"
        />
      </div>
    );
  },
};

export const WithValidation: Story = {
  name: "With validation (can't be empty)",
  parameters: { controls: { disable: true } },
  render: function ValidatedStory() {
    const [value, setValue] = React.useState("Sara Khan");
    return (
      <div style={{ width: 480 }}>
        <InlineEdit
          value={value}
          onValueChange={setValue}
          validate={(v) => {
            if (v.trim() === "") return "Name can't be empty.";
            if (v.length > 80) return "Maximum 80 characters.";
            return null;
          }}
        />
      </div>
    );
  },
};

export const EmptyValue: Story = {
  name: "Empty value (placeholder shown)",
  parameters: { controls: { disable: true } },
  render: function EmptyStory() {
    const [value, setValue] = React.useState("");
    return (
      <div style={{ width: 480 }}>
        <InlineEdit
          value={value}
          onValueChange={setValue}
          placeholder="Click to add a description"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: () => (
    <div style={{ width: 480 }}>
      <InlineEdit value="Read-only value" disabled />
    </div>
  ),
};
