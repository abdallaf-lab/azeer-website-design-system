import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonText,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Skeleton",
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Content-shaped placeholders — reserves layout while data loads",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Generic: Story = {
  name: "Skeleton (generic)",
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 320 }}>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-10 w-10 rounded-full" rounded="full" />
    </div>
  ),
};

export const Text: Story = {
  name: "SkeletonText (cycling widths)",
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 360 }}>
      <SkeletonText lines={3} />
      <SkeletonText lines={5} lineHeight="lg" gap="loose" />
      <SkeletonText lines={2} lineHeight="sm" gap="tight" lastLineWidth={60} />
    </div>
  ),
};

export const Avatars: Story = {
  name: "SkeletonAvatar — all sizes",
  render: () => (
    <div className="flex items-center gap-3">
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
      <SkeletonAvatar size="2xl" />
      <SkeletonAvatar size="lg" shape="rounded" />
    </div>
  ),
};

export const Card: Story = {
  name: "SkeletonCard (composed)",
  render: () => (
    <div className="flex flex-col" style={{ width: 360 }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
};

export const ConversationListPattern: Story = {
  name: "Conversation list — initial load",
  render: () => (
    <div
      className="flex flex-col rounded-xl border border-border-default bg-surface overflow-hidden"
      style={{ width: 380 }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b border-border-divider last:border-b-0">
          <SkeletonCard />
        </div>
      ))}
    </div>
  ),
};

export const InspectorPattern: Story = {
  name: "Inspector card — initial load",
  render: () => (
    <div
      className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface p-5"
      style={{ width: 320 }}
    >
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="lg" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <SkeletonText lines={4} lineHeight="sm" />
    </div>
  ),
};
