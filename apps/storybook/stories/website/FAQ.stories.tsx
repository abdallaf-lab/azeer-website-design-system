import type { Meta, StoryObj } from "@storybook/react-vite";
import { FAQ } from "@azeer/website-ui";
import { faqs } from "./_fixtures";

const meta: Meta<typeof FAQ> = {
  title: "Website/FAQ",
  component: FAQ,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Q&A list on the DS Accordion. Single-open + collapsible by default." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleOpen: Story = {
  render: () => (
    <FAQ
      eyebrow="FAQ"
      title="Questions, answered"
      description="Everything you need to know before getting started."
      items={faqs}
    />
  ),
};

export const MultipleOpen: Story = {
  name: "Multiple open",
  render: () => <FAQ title="Frequently asked questions" items={faqs} multiple />,
};
