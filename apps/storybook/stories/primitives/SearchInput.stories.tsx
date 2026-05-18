import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "@azeer/ui";

const meta: Meta<typeof SearchInput> = {
  title: "Primitives/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Input + leading Search icon + trailing X clear",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    placeholder: "Search conversations…",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [q, setQ] = React.useState("");
    return (
      <div style={{ width: 320 }}>
        <SearchInput {...args} value={q} onValueChange={setQ} />
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: function SizesStory() {
    const [q1, setQ1] = React.useState("");
    const [q2, setQ2] = React.useState("");
    const [q3, setQ3] = React.useState("");
    return (
      <div className="flex flex-col gap-3" style={{ width: 320 }}>
        <SearchInput size="sm" value={q1} onValueChange={setQ1} placeholder="sm — 32 px" />
        <SearchInput size="md" value={q2} onValueChange={setQ2} placeholder="md — 40 px (default)" />
        <SearchInput size="lg" value={q3} onValueChange={setQ3} placeholder="lg — 48 px" />
      </div>
    );
  },
};

export const WithValue: Story = {
  name: "With value (X visible)",
  parameters: { controls: { disable: true } },
  render: function WithValueStory() {
    const [q, setQ] = React.useState("acme corporation");
    return (
      <div style={{ width: 320 }}>
        <SearchInput value={q} onValueChange={setQ} />
      </div>
    );
  },
};

export const Toolbar: Story = {
  name: "Inbox toolbar pattern",
  parameters: { controls: { disable: true } },
  render: function ToolbarStory() {
    const [q, setQ] = React.useState("");
    return (
      <div
        className="flex items-center gap-2 p-3 border border-border-default rounded-lg bg-surface"
        style={{ width: 480 }}
      >
        <SearchInput
          size="sm"
          value={q}
          onValueChange={setQ}
          placeholder="Search inbox…"
          className="flex-1"
        />
        <span className="text-body-sm text-fg-muted shrink-0">
          {q ? "Searching…" : "12 conversations"}
        </span>
      </div>
    );
  },
};
