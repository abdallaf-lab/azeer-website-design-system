import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroCentered, HeroSplit, HeroSplitVideo } from "@azeer/website-ui";
import { ArrowRight, MockPanel } from "./_fixtures";

const meta: Meta = {
  title: "Website/Hero",
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Three hero layouts: centered, split, and split with click-to-play video." },
  },
};

export default meta;
type Story = StoryObj;

export const Centered: Story = {
  render: () => (
    <HeroCentered
      eyebrow="New · AI agents"
      title="Customer conversations, finally in one place"
      description="Azeer unifies WhatsApp, Voice, SMS, email and social into a single AI-assisted workspace."
      primaryCta={{ label: "Start free trial", href: "#", icon: ArrowRight }}
      secondaryCta={{ label: "Book a demo", href: "#" }}
    >
      <MockPanel className="mx-auto max-w-4xl" label="Azeer · Shared inbox" />
    </HeroCentered>
  ),
};

export const Split: Story = {
  render: () => (
    <HeroSplit
      eyebrow="One inbox for every channel"
      title="Reply faster, everywhere your customers are"
      description="A complete customer-conversation platform — not another point tool to stitch together."
      primaryCta={{ label: "Start free trial", href: "#", icon: ArrowRight }}
      secondaryCta={{ label: "Book a demo", href: "#" }}
      media={<MockPanel label="Azeer · Shared inbox" />}
    />
  ),
};

export const SplitMediaStart: Story = {
  name: "Split — media on start",
  render: () => (
    <HeroSplit
      eyebrow="Built for the region"
      title="Arabic and RTL, done right"
      description="Every layout mirrors and typography switches to IBM Plex Sans Arabic."
      mediaStart
      primaryCta={{ label: "See it in Arabic", href: "#", icon: ArrowRight }}
      media={<MockPanel label="أزير · الوارد" />}
    />
  ),
};

export const SplitVideo: Story = {
  name: "Split — click-to-play video",
  render: () => (
    <HeroSplitVideo
      eyebrow="Watch the 2-min tour"
      title="See Azeer in action"
      description="From first message to resolved — watch how a conversation flows through Azeer."
      primaryCta={{ label: "Start free trial", href: "#", icon: ArrowRight }}
      posterSrc="/logos/globex.svg"
      posterAlt="Product tour preview"
      videoSrc="https://www.w3.org/2010/05/sintel/trailer.mp4"
    />
  ),
};
