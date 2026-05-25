import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@azeer/ui";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Multiline text-entry — single canonical size, vertically resizable",
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 12 } },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: {
    placeholder: "Write a note…",
    rows: 3,
    disabled: false,
    readOnly: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
      <Textarea placeholder="Default state" />
      <Textarea placeholder="Invalid state" aria-invalid="true" />
      <Textarea defaultValue="Verified description" readOnly />
      <Textarea placeholder="Disabled" disabled />
    </div>
  ),
};

export const LongerDefault: Story = {
  name: "6 rows",
  args: { rows: 6 },
  render: Default.render,
};
