import type { Meta, StoryObj } from "@storybook/react-vite";
import { AzeerLogo, AzeerMark, BrandPattern } from "@azeer/website-ui";

const meta: Meta = {
  title: "Website/Brand",
  parameters: {
    layout: "centered",
    docs: { subtitle: "Brand-book pieces from @azeer/website-ui: the mark, logo lockups, and background patterns." },
  },
};

export default meta;
type Story = StoryObj;

export const Mark: Story = {
  render: () => (
    <div className="flex items-center gap-10">
      <AzeerMark title="Azeer (primary)" className="h-14 text-brand-primary" />
      <AzeerMark title="Azeer (neutral)" className="h-14 text-brand-neutral" />
      <div className="rounded-xl bg-brand-secondary p-5">
        <AzeerMark title="Azeer (inverse)" className="h-14 text-brand-on-secondary" />
      </div>
    </div>
  ),
};

export const Logo: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      <AzeerLogo className="text-3xl" />
      <AzeerLogo variant="stacked" className="text-3xl" />
      <AzeerLogo variant="mark" className="text-3xl" />
      <AzeerLogo tone="black" className="text-3xl" />
      <div className="rounded-xl bg-brand-secondary p-6">
        <AzeerLogo tone="inverse" className="text-3xl" />
      </div>
      <div className="flex items-center gap-8">
        <AzeerLogo wordmark="en" className="text-2xl" />
        <AzeerLogo wordmark="ar" className="text-2xl" />
      </div>
    </div>
  ),
};

export const Patterns: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
      {(["waves", "topographic", "grid", "layers"] as const).map((v) => (
        <div
          key={v}
          className="relative isolate h-48 overflow-hidden rounded-xl border border-border-default bg-surface"
        >
          <BrandPattern variant={v} className="absolute inset-0 text-brand-primary/15" />
          <span className="relative inline-block p-3 text-label-xs text-fg-muted">{v}</span>
        </div>
      ))}
    </div>
  ),
};
