import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectorArrow, cn } from "@azeer/website-ui";

const meta: Meta<typeof ConnectorArrow> = {
  title: "Website/Motion/ConnectorArrow",
  component: ConnectorArrow,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Self-drawing SVG arrow that connects workflow cards. Static under reduced motion; RTL-aware.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectorArrow>;

const STEP_TONE = {
  info: "bg-bg-info text-content-info",
  attention: "bg-bg-attention text-content-attention",
  success: "bg-bg-success text-content-success",
} as const;

function WorkflowCard({
  step,
  tone,
  badge,
  title,
  body,
}: {
  step: string;
  tone: keyof typeof STEP_TONE;
  badge?: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex w-60 flex-col gap-3 rounded-2xl border border-border-subtle bg-bg-default p-5 shadow-elev-1">
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-mkt-caption uppercase",
            STEP_TONE[tone],
          )}
        >
          {step}
        </span>
        {badge ? <span className="text-mkt-caption text-content-subtle">{badge}</span> : null}
      </div>
      <h3 className="text-mkt-heading-sm text-content-emphasis">{title}</h3>
      <p className="text-mkt-body-sm text-content-subtle">{body}</p>
    </div>
  );
}

export const Default: Story = {
  render: () => <ConnectorArrow direction="right" />,
};

export const Down: Story = {
  render: () => <ConnectorArrow direction="down" />,
};

export const Left: Story = {
  name: "Left (reversed flow)",
  render: () => <ConnectorArrow direction="left" />,
};

export const Up: Story = {
  name: "Up (reversed flow)",
  render: () => <ConnectorArrow direction="up" />,
};

export const WithDelay: Story = {
  name: "With delay (0.5s)",
  render: () => <ConnectorArrow direction="right" delay={0.5} />,
};

export const InWorkflow: Story = {
  name: "In workflow — e-commerce (cart recovery)",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Azeer's primary vertical: WhatsApp-led cart recovery for Salla/Zid stores. Input → Action → Output.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <WorkflowCard
        step="Input"
        tone="info"
        badge="🛒 Salla"
        title="Cart abandoned"
        body="Customer left 2 items in their cart 15 minutes ago."
      />
      <ConnectorArrow direction="right" delay={0.3} />
      <WorkflowCard
        step="Action"
        tone="attention"
        badge="✨ Auto"
        title="AI sends WhatsApp reminder"
        body="Personalized message with cart items + 10% off code."
      />
      <ConnectorArrow direction="right" delay={0.7} />
      <WorkflowCard
        step="Output"
        tone="success"
        badge="✅ Won"
        title="Cart recovered"
        body="Customer completed checkout. +SAR 285 recovered."
      />
    </div>
  ),
};

export const InWorkflowHealthcare: Story = {
  name: "In workflow — healthcare (no-show prevention)",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Azeer's second vertical: WhatsApp appointment reminders that prevent no-shows. Input → Action → Output.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <WorkflowCard
        step="Input"
        tone="info"
        title="Appointment booked"
        body="Patient confirmed visit for Tuesday 2 PM."
      />
      <ConnectorArrow direction="right" delay={0.3} />
      <WorkflowCard
        step="Action"
        tone="attention"
        title="24h reminder sent"
        body="WhatsApp message with location, doctor name, prep info."
      />
      <ConnectorArrow direction="right" delay={0.7} />
      <WorkflowCard
        step="Output"
        tone="success"
        title="No-show prevented"
        body="Patient confirmed attendance. Slot saved."
      />
    </div>
  ),
};

export const Stagger: Story = {
  parameters: {
    docs: {
      description: {
        story: "Three arrows draw in sequence via increasing delay (0, 0.4, 0.8s).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {[0, 0.4, 0.8].map((d) => (
        <ConnectorArrow key={d} direction="right" delay={d} />
      ))}
    </div>
  ),
};

export const ReducedMotion: Story = {
  name: "Reduced motion (static, fully drawn)",
  parameters: {
    docs: {
      description: {
        story:
          "Under `prefers-reduced-motion: reduce`, the arrow renders fully drawn with no animation — connectors are functional, so they stay visible. Toggle your OS setting to verify.",
      },
    },
  },
  render: () => <ConnectorArrow direction="right" />,
};

export const RTL: Story = {
  name: "RTL (right points along reading flow)",
  parameters: {
    docs: {
      description: {
        story:
          'In a dir="rtl" context, a direction="right" arrow auto-mirrors to point leftward — along the Arabic reading flow.',
      },
    },
  },
  render: () => (
    <div dir="rtl" className="flex items-center gap-4">
      <span className="text-mkt-body text-content-emphasis">الإدخال</span>
      <ConnectorArrow direction="right" />
      <span className="text-mkt-body text-content-emphasis">المعالجة</span>
    </div>
  ),
};
