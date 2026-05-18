import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea, Separator } from "@azeer/ui";

const meta: Meta<typeof ScrollArea> = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Themed scrollbar — DS-tokenized 8 px thumb, fade on idle",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea
      className="h-64 w-72 rounded-lg border border-border-default bg-surface"
    >
      <div className="p-4">
        <h4 className="text-heading-sm text-fg-default mb-2">Tags</h4>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i}>
            <div className="text-body-md text-fg-default py-1.5">
              Tag #{i + 1}
            </div>
            {i < 39 ? <Separator /> : null}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="max-w-[480px] whitespace-nowrap rounded-lg border border-border-default bg-surface">
      <div className="flex w-max gap-3 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="inline-flex h-32 w-32 items-center justify-center rounded-md border border-border-default bg-surface-sunken text-body-sm text-fg-muted"
          >
            Card #{i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const InsideCard: Story = {
  name: "Inside a Card-like surface",
  render: () => (
    <div className="rounded-xl border border-border-default bg-surface p-0">
      <div className="border-b border-border-divider px-5 py-3">
        <h3 className="text-heading-sm text-fg-default">Conversation activity</h3>
      </div>
      <ScrollArea className="h-72">
        <div className="px-5 py-3">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="text-body-md text-fg-default py-2">
              Event #{i + 1} — Sara Khan replied to the customer.
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
