import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionRails } from "@azeer/website-ui";

const meta: Meta<typeof SectionRails> = {
  title: "Website/Layout/SectionRails",
  component: SectionRails,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Architectural section wrapper — vertical rails + bottom border. Stacks into continuous page guides.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionRails>;

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-bg-default p-6">
      <h3 className="text-mkt-heading-sm text-content-emphasis">{title}</h3>
      <p className="text-mkt-body-sm text-content-subtle">{body}</p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SectionRails id="hero">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-mkt-display-md text-content-emphasis">
          Turn every conversation into a closed deal
        </h1>
        <p className="max-w-2xl text-mkt-body-lg text-content-subtle">
          Azeer unifies WhatsApp, Voice, SMS, email, and social into one AI-assisted workspace — so
          your team replies faster and customers stay happy.
        </p>
      </div>
    </SectionRails>
  ),
};

export const Compact: Story = {
  render: () => (
    <SectionRails id="feature" density="compact">
      <div className="flex flex-col gap-2">
        <h2 className="text-mkt-heading-md text-content-emphasis">AI agents</h2>
        <p className="max-w-prose text-mkt-body text-content-subtle">
          Deflect repetitive questions and draft replies your team sends in a click.
        </p>
      </div>
    </SectionRails>
  ),
};

export const Spacious: Story = {
  render: () => (
    <SectionRails id="pricing" density="spacious">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-mkt-caption uppercase text-accent-text">Pricing</span>
          <h2 className="text-mkt-display-md text-content-emphasis">Simple, scalable plans</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card title="Starter" body="For small teams getting organized across channels." />
          <Card title="Growth" body="For scaling support and sales teams." />
          <Card title="Enterprise" body="For organizations with security and scale needs." />
        </div>
      </div>
    </SectionRails>
  ),
};

export const NoBottomBorder: Story = {
  name: "No bottom border",
  render: () => (
    <SectionRails id="cta" showBottomBorder={false}>
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-mkt-heading-lg text-content-emphasis">The last section on a page</h2>
        <p className="max-w-2xl text-mkt-body text-content-subtle">
          Drop the bottom border on the final section so it sits flush above the footer.
        </p>
      </div>
    </SectionRails>
  ),
};

export const MultipleStacked: Story = {
  name: "Multiple stacked (page rhythm)",
  render: () => (
    <>
      <SectionRails id="hero">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-mkt-display-md text-content-emphasis">One inbox for every channel</h1>
          <p className="max-w-2xl text-mkt-body-lg text-content-subtle">
            Reply faster, everywhere your customers are.
          </p>
        </div>
      </SectionRails>
      <SectionRails id="features" density="compact">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card title="Unified inbox" body="Every channel in one threaded view." />
          <Card title="AI agents" body="Resolve common questions automatically." />
          <Card title="Automations" body="Route, tag, and escalate on autopilot." />
        </div>
      </SectionRails>
      <SectionRails id="cta" showBottomBorder={false}>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-mkt-heading-lg text-content-emphasis">
            Ready to unify your conversations?
          </h2>
          <p className="max-w-2xl text-mkt-body text-content-subtle">
            Start free in minutes — no credit card required.
          </p>
        </div>
      </SectionRails>
    </>
  ),
};

export const WithSemanticTag: Story = {
  name: "Semantic tag (article)",
  render: () => (
    <SectionRails as="article" id="post">
      <div className="mx-auto flex max-w-prose flex-col gap-4">
        <h1 className="text-mkt-display-md text-content-emphasis">Designing tasks for AI agents</h1>
        <p className="text-mkt-body text-content-subtle">
          A practical guide to breaking operations into steps an agent can own end to end.
        </p>
      </div>
    </SectionRails>
  ),
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <SectionRails id="hero-ar">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-mkt-display-md text-content-emphasis">حوّل كل محادثة إلى عملية بيع</h1>
          <p className="max-w-2xl text-mkt-body-lg text-content-subtle">
            يوحّد أزير واتساب والمكالمات والرسائل والبريد ووسائل التواصل في مساحة عمل واحدة مدعومة
            بالذكاء الاصطناعي.
          </p>
        </div>
      </SectionRails>
    </div>
  ),
};
