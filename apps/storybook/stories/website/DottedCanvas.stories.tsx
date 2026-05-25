import type { Meta, StoryObj } from "@storybook/react-vite";
import { DottedCanvas, SectionRails } from "@azeer/website-ui";

const meta: Meta<typeof DottedCanvas> = {
  title: "Website/Layout/DottedCanvas",
  component: DottedCanvas,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Brand-tinted dot background with optional radial edge-fade and parallax. Pure CSS.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DottedCanvas>;

function SampleContent({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
      <span className="text-mkt-caption uppercase text-accent-text">{eyebrow}</span>
      <h2 className="text-mkt-display-md text-content-emphasis">{title}</h2>
      <p className="max-w-2xl text-mkt-body-lg text-content-subtle">{body}</p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <DottedCanvas>
      <SampleContent
        eyebrow="For commerce & care"
        title="Built for storefronts and clinics alike"
        body="Azeer keeps every customer conversation — sales or support — in one AI-assisted workspace."
      />
    </DottedCanvas>
  ),
};

export const NoFade: Story = {
  name: "No fade (dots to edges)",
  render: () => (
    <DottedCanvas fade={false}>
      <SampleContent
        eyebrow="Full bleed"
        title="Dots carry to the edges"
        body="With the radial mask disabled, the grid stays uniform across the whole canvas."
      />
    </DottedCanvas>
  ),
};

export const TightDensity: Story = {
  name: "Tight density (16px)",
  render: () => (
    <DottedCanvas density="tight">
      <SampleContent
        eyebrow="Density · tight"
        title="A finer, denser field"
        body="16px spacing reads as a crisp technical grid behind dense layouts."
      />
    </DottedCanvas>
  ),
};

export const LooseDensity: Story = {
  name: "Loose density (24px)",
  render: () => (
    <DottedCanvas density="loose">
      <SampleContent
        eyebrow="Density · loose"
        title="An airier, calmer field"
        body="24px spacing gives a softer backdrop for spacious hero sections."
      />
    </DottedCanvas>
  ),
};

export const HighIntensity: Story = {
  name: "High intensity (20%)",
  render: () => (
    <DottedCanvas intensity={20}>
      <SampleContent
        eyebrow="Intensity · 20"
        title="A more present pattern"
        body="Higher intensity makes the indigo dots clearly visible for bold sections."
      />
    </DottedCanvas>
  ),
};

export const LowIntensity: Story = {
  name: "Low intensity (5%)",
  render: () => (
    <DottedCanvas intensity={5}>
      <SampleContent
        eyebrow="Intensity · 5"
        title="A whisper of texture"
        body="At 5% the dots are barely-there — depth without distraction."
      />
    </DottedCanvas>
  ),
};

export const NoParallax: Story = {
  name: "No parallax (scrolls with content)",
  parameters: {
    docs: {
      description: {
        story:
          "With parallax off, the dot layer scrolls with the content instead of staying pinned to the viewport. (Scroll the page to compare with the default.)",
      },
    },
  },
  render: () => (
    <DottedCanvas parallax={false}>
      <SampleContent
        eyebrow="Parallax · off"
        title="Grid moves with the page"
        body="Prefer this on iOS or inside transformed ancestors where background-attachment: fixed misbehaves."
      />
    </DottedCanvas>
  ),
};

export const WithSectionRails: Story = {
  name: "Inside SectionRails (composition)",
  render: () => (
    <SectionRails id="hero">
      <DottedCanvas rounded height="420px">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="text-mkt-caption uppercase text-accent-text">For e-commerce teams</span>
          <h2 className="text-mkt-display-md text-content-emphasis">
            Recover more carts, automatically
          </h2>
          <p className="max-w-2xl text-mkt-body-lg text-content-subtle">
            Azeer follows up on abandoned checkouts over WhatsApp and SMS, with replies your team
            approves in a tap.
          </p>
        </div>
      </DottedCanvas>
    </SectionRails>
  ),
};

export const HeroPreview: Story = {
  name: "Hero preview (full use case)",
  render: () => (
    <DottedCanvas height="600px">
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="text-mkt-caption uppercase text-accent-text">For healthcare teams</span>
        <h1 className="text-mkt-display-lg text-content-emphasis">
          Book, remind, and follow up — on autopilot
        </h1>
        <p className="max-w-2xl text-mkt-body-lg text-content-subtle">
          Azeer handles appointment booking, reminders, and post-visit follow-ups across WhatsApp
          and SMS, so your front desk can focus on patients.
        </p>
      </div>
    </DottedCanvas>
  ),
};
