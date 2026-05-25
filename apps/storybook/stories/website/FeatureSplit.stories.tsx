import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureSplit } from "@azeer/website-ui";
import { ArrowRight, MockPanel } from "./_fixtures";
import { BarChart3, Bot, Languages, Workflow } from "lucide-react";

const meta: Meta<typeof FeatureSplit> = {
  title: "Website/FeatureSplit",
  component: FeatureSplit,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "A single feature as a two-column story. Alternate `mediaStart` for a zig-zag." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MediaEnd: Story = {
  render: () => (
    <FeatureSplit
      eyebrow="AI agents"
      title="Let AI handle the repetitive half"
      description="Azeer's AI agents resolve common questions automatically and draft replies for the rest."
      bullets={[
        { icon: Bot, title: "Auto-resolution", description: "Deflect FAQs across every channel, 24/7." },
        { icon: Workflow, title: "Suggested replies", description: "One-click drafts grounded in your knowledge base." },
        { icon: BarChart3, title: "Quality insights", description: "See what AI handled and where to improve." },
      ]}
      cta={{ label: "Explore AI agents", href: "#", icon: ArrowRight }}
      media={<MockPanel label="Azeer · AI agent" />}
    />
  ),
};

export const MediaStart: Story = {
  name: "Media on start",
  render: () => (
    <FeatureSplit
      eyebrow="Built for the region"
      title="Arabic and RTL, done right"
      description="Every layout mirrors, typography switches to IBM Plex Sans Arabic, and IDs stay bidi-isolated."
      mediaStart
      tone="surface"
      bullets={[
        { icon: Languages, title: "True RTL mirroring", description: "Logical layout flips end-to-end." },
        { icon: Bot, title: "Arabic-first AI", description: "Understands and replies in natural Arabic." },
      ]}
      cta={{ label: "See it in Arabic", href: "#", icon: ArrowRight }}
      media={<MockPanel label="أزير · الوارد" />}
    />
  ),
};
