import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyButton } from "@azeer/ui";

const meta: Meta<typeof CopyButton> = {
  title: "Primitives/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Clipboard write + Toast feedback — Inspector-friendly icon-ghost default",
    },
  },
  argTypes: {
    size: { control: "select", options: ["icon-sm", "icon-md", "sm", "md"] },
    variant: { control: "select", options: ["ghost", "secondary"] },
    value: { control: "text" },
    successMessage: { control: "text" },
  },
  args: {
    value: "+966505550142",
    successMessage: "Copied",
    size: "icon-sm",
    variant: "ghost",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InspectorRow: Story = {
  name: "Inspector row pattern (ID + copy)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 320 }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-sunken">
        <span className="text-label-xs text-fg-muted uppercase w-24">ID</span>
        <code className="font-mono text-body-sm text-fg-default flex-1 truncate">
          conv_8f3kdo10x
        </code>
        <CopyButton value="conv_8f3kdo10x" successMessage="Conversation ID copied" />
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-sunken">
        <span className="text-label-xs text-fg-muted uppercase w-24">PHONE</span>
        <span className="bidi-isolate font-mono tabular-nums text-body-sm text-fg-default flex-1">
          +966 50 555 0142
        </span>
        <CopyButton value="+966505550142" successMessage="Phone number copied" />
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-sunken">
        <span className="text-label-xs text-fg-muted uppercase w-24">API KEY</span>
        <code className="font-mono text-body-sm text-fg-default flex-1 truncate">
          ak_8f3k…
        </code>
        <CopyButton
          value="ak_8f3kdo10xyzabcdef12345"
          successMessage="API key copied"
          successDescription="Don't share this with anyone."
        />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With visible label",
  args: { variant: "secondary", size: "sm" },
  render: (args) => <CopyButton {...args}>Copy ID</CopyButton>,
};

export const InlineAdjacentToCode: Story = {
  name: "Inline alongside a code block",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <code className="font-mono text-body-md text-fg-default px-2 py-1 rounded-sm bg-code-bg border border-code-border">
        npm install @azeer/ui
      </code>
      <CopyButton value="npm install @azeer/ui" successMessage="Command copied" />
    </div>
  ),
};
