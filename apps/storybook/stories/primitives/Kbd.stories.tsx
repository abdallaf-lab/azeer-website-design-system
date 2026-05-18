import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "@azeer/ui";

const meta: Meta<typeof Kbd> = {
  title: "Primitives/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Keyboard shortcut hint — always LTR, mono-font, locked anatomy",
    },
  },
  argTypes: {
    children: { control: "text" },
  },
  args: {
    children: "⌘K",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Kbd>⌘K</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Ctrl+Shift+P</Kbd>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
    </div>
  ),
};

export const Inline: Story = {
  name: "Inline in prose",
  parameters: { controls: { disable: true } },
  render: () => (
    <p
      style={{
        font: "var(--text-body-md)",
        color: "var(--color-fg-default)",
        maxWidth: 480,
      }}
    >
      Open the command palette with <Kbd>⌘K</Kbd>, navigate with <Kbd>↑</Kbd>{" "}
      and <Kbd>↓</Kbd>, then press <Kbd>Enter</Kbd> to confirm or{" "}
      <Kbd>Esc</Kbd> to dismiss.
    </p>
  ),
};

export const InsideArabicProse: Story = {
  name: "Inside Arabic prose (forced LTR)",
  parameters: { controls: { disable: true } },
  render: () => (
    <p
      lang="ar"
      dir="rtl"
      style={{
        font: "var(--text-body-md)",
        fontFamily: "var(--font-arabic)",
        color: "var(--color-fg-default)",
        maxWidth: 480,
      }}
    >
      افتح لوحة الأوامر باستخدام <Kbd>⌘K</Kbd> ثم اضغط <Kbd>Enter</Kbd>{" "}
      للتأكيد. مفتاح الاختصار يبقى LTR.
    </p>
  ),
};
