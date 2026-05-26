import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "@azeer/website-ui";

const meta: Meta<typeof SectionHeader> = {
  title: "Website/Layout/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Uppercase section label over a brand-tinted flickering canvas. Used above every Stage-2B section.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  render: () => (
    <SectionHeader
      title="Features"
      description="Boost your team's efficiency with an AI-assisted workspace that unifies every customer conversation."
    />
  ),
};

export const LongDescription: Story = {
  name: "Long description",
  render: () => (
    <SectionHeader
      title="What you get"
      description="Azeer unifies WhatsApp, Voice, SMS, email, and social into one AI-assisted workspace, with pre-built journeys for e-commerce (Salla, Zid) and healthcare (clinics, dental chains) — so your team replies faster, customers stay happy, and your operations scale without adding headcount."
    />
  ),
};

export const NoCanvas: Story = {
  name: "No canvas (cleaner contexts)",
  render: () => (
    <SectionHeader
      showCanvas={false}
      title="Pricing"
      description="Simple, predictable plans — billed per active conversation, not per seat."
    />
  ),
};

export const NormalIntensity: Story = {
  name: "Subtle vs normal intensity",
  parameters: {
    docs: {
      description: {
        story:
          "Same header rendered twice — once at `subtle` (default, 0.05/0.06) and once at `normal` (0.08/0.08) — to compare canvas density.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col">
      <SectionHeader
        title="Subtle (default)"
        description="maxOpacity 0.05 · flickerChance 0.06"
        canvasIntensity="subtle"
      />
      <SectionHeader
        title="Normal"
        description="maxOpacity 0.08 · flickerChance 0.08"
        canvasIntensity="normal"
      />
    </div>
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion (canvas omitted)",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, the canvas is omitted entirely. The border-y + uppercase label + description remain. Toggle your OS setting to verify.",
      },
    },
  },
  render: () => (
    <SectionHeader
      title="Features"
      description="The flickering background is decorative — gone for users who prefer reduced motion."
    />
  ),
};
