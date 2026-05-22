import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@azeer/ui";

/**
 * Radix Accordion.Root props are a `single | multiple` discriminated union,
 * which Storybook's `StoryObj` can't represent (it collapses `args` to `never`).
 * We type the Meta against an explicit, flattened args surface and bake the
 * discriminant into each story's `render`.
 */
type AccordionArgs = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
};

const meta: Meta<AccordionArgs> = {
  title: "Primitives/Accordion",
  component: Accordion as Meta<AccordionArgs>["component"],
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Border-divider disclosure — replaces banned Collapsible / Disclosure primitives",
    },
  },
  argTypes: {
    type: { control: "radio", options: ["single", "multiple"] },
    collapsible: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleCollapsible: Story = {
  name: "Single + collapsible (FAQ)",
  render: () => (
    <Accordion type="single" collapsible className="w-[560px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>How do I connect a channel?</AccordionTrigger>
        <AccordionContent>
          Go to Settings → Channels → Connect, and follow the OAuth flow. Most
          channels (WhatsApp, Voice, SMS) verify within seconds.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What's the SMS quota?</AccordionTrigger>
        <AccordionContent>
          10,000 outbound SMS per month on Starter; 50,000 on Pro. Inbound is
          unlimited on all plans.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Does Azeer support RTL languages?</AccordionTrigger>
        <AccordionContent>
          Yes — Arabic UI is fully supported with logical layout mirroring,
          IBM Plex Arabic typography, and bidi-isolated phone numbers / IDs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: "Multiple — many open at once",
  render: () => (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-3"]}
      className="w-[560px]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>
          Open by default. Multiple items can be open simultaneously when
          `type="multiple"`.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>Closed by default. Click to expand.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section C</AccordionTrigger>
        <AccordionContent>Also open by default.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Single: Story = {
  name: "Single — no collapse (always one open)",
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-[560px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Step 1 — Connect</AccordionTrigger>
        <AccordionContent>Set up the first channel.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Step 2 — Invite</AccordionTrigger>
        <AccordionContent>Add your teammates.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Step 3 — Customize</AccordionTrigger>
        <AccordionContent>Set business hours and routing.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
