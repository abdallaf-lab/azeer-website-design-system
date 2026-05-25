import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectorArrow, WorkflowItem } from "@azeer/website-ui";
import {
  Bell,
  Calendar,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

const meta: Meta<typeof WorkflowItem> = {
  title: "Website/Hero/WorkflowItem",
  component: WorkflowItem,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Floating workflow card (input/action/output/pending). Composes MotionPreset + optional BorderBeam; chains with ConnectorArrow.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkflowItem>;

export const InputDefault: Story = {
  name: "Input",
  render: () => (
    <WorkflowItem
      type="input"
      icon={<ShoppingCart />}
      title="Cart abandoned"
      description="Customer left 2 items in their cart 15 minutes ago."
      time="0.0 sec"
    />
  ),
};

export const ActionDefault: Story = {
  name: "Action (AI-assisted)",
  render: () => (
    <WorkflowItem
      type="action"
      icon={<MessageSquare />}
      title="AI sends WhatsApp reminder"
      description="Personalized message with cart items + 10% off code."
      time="12 sec"
      aiAssisted
    />
  ),
};

export const OutputDefault: Story = {
  name: "Output",
  render: () => (
    <WorkflowItem
      type="output"
      icon={<CheckCircle />}
      title="Cart recovered"
      description="Customer completed checkout. +SAR 285 recovered."
      time="2 min"
    />
  ),
};

export const PendingDefault: Story = {
  name: "Pending (with Approve)",
  render: () => (
    <WorkflowItem
      type="pending"
      icon={<MessageSquare />}
      title="Reply awaiting approval"
      description="AI drafted a refund response — review before it sends."
    />
  ),
};

export const WithBeam: Story = {
  name: "With BorderBeam (premium)",
  render: () => (
    <WorkflowItem
      type="action"
      icon={<MessageSquare />}
      title="AI sends WhatsApp reminder"
      description="Personalized message with cart items + 10% off code."
      time="12 sec"
      aiAssisted
      showBeam
    />
  ),
};

export const NoMenu: Story = {
  name: "No menu (inline time)",
  render: () => (
    <WorkflowItem
      type="input"
      icon={<ShoppingCart />}
      title="Cart abandoned"
      description="Customer left 2 items in their cart 15 minutes ago."
      time="0.0 sec"
      hasMenu={false}
    />
  ),
};

export const WithCustomContent: Story = {
  name: "With custom content (children)",
  render: () => (
    <WorkflowItem
      type="action"
      icon={<MessageSquare />}
      title="Lead scored"
      description="AI evaluated this inbound lead."
      time="1.8 sec"
      aiAssisted
    >
      <div className="rounded-lg bg-bg-muted p-3">
        <p className="text-mkt-body-sm text-content-subtle">
          Scored 87/100 on cart value, repeat visits, and engagement.
        </p>
      </div>
    </WorkflowItem>
  ),
};

export const HealthcareVertical: Story = {
  name: "In workflow — healthcare",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <WorkflowItem
        type="input"
        icon={<Calendar />}
        title="Appointment booked"
        description="Patient confirmed visit for Tuesday 2 PM."
        time="0.0 sec"
      />
      <ConnectorArrow direction="right" delay={0.3} />
      <WorkflowItem
        type="action"
        icon={<Bell />}
        title="24h reminder sent"
        description="WhatsApp with location, doctor name, and prep info."
        time="1 day"
        aiAssisted
      />
      <ConnectorArrow direction="right" delay={0.7} />
      <WorkflowItem
        type="output"
        icon={<ShieldCheck />}
        title="No-show prevented"
        description="Patient confirmed attendance. Slot saved."
        time="2 min"
      />
    </div>
  ),
};

export const InWorkflow: Story = {
  name: "In workflow — e-commerce (cart recovery)",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <WorkflowItem
        type="input"
        icon={<ShoppingCart />}
        title="Cart abandoned"
        description="Customer left 2 items 15 minutes ago."
        time="0.0 sec"
      />
      <ConnectorArrow direction="right" delay={0.3} />
      <WorkflowItem
        type="action"
        icon={<MessageSquare />}
        title="WhatsApp reminder sent"
        description="AI-personalized message with a 10% off code."
        time="12 sec"
        aiAssisted
        showBeam
      />
      <ConnectorArrow direction="right" delay={0.7} />
      <WorkflowItem
        type="output"
        icon={<CheckCircle />}
        title="Cart recovered"
        description="Customer completed checkout. +SAR 285 recovered."
        time="2 min"
      />
    </div>
  ),
};

export const Stagger: Story = {
  name: "Stagger (sequential reveal)",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Same e-commerce workflow with staggered entrance delays (0, 0.3, 0.6s).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <WorkflowItem
        type="input"
        icon={<ShoppingCart />}
        title="Cart abandoned"
        description="Customer left 2 items 15 minutes ago."
        time="0.0 sec"
        delay={0}
      />
      <ConnectorArrow direction="right" delay={0.3} />
      <WorkflowItem
        type="action"
        icon={<MessageSquare />}
        title="WhatsApp reminder sent"
        description="AI-personalized message with a 10% off code."
        time="12 sec"
        aiAssisted
        delay={0.3}
      />
      <ConnectorArrow direction="right" delay={0.7} />
      <WorkflowItem
        type="output"
        icon={<CheckCircle />}
        title="Cart recovered"
        description="Customer completed checkout. +SAR 285 recovered."
        time="2 min"
        delay={0.6}
      />
    </div>
  ),
};

export const RTL: Story = {
  name: "RTL (Arabic)",
  render: () => (
    <div dir="rtl">
      <WorkflowItem
        type="action"
        icon={<MessageSquare />}
        title="إرسال تذكير عبر واتساب"
        description="رسالة مخصّصة تتضمّن عناصر السلة وكود خصم ١٠٪."
        time="١٢ ثانية"
        aiAssisted
      />
    </div>
  ),
};
