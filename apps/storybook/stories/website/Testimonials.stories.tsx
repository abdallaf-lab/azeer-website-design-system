import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestimonialGrid, TestimonialQuote } from "@azeer/website-ui";
import { testimonials } from "./_fixtures";

const meta: Meta = {
  title: "Website/Testimonials",
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Customer proof: a grid of quotes (with ratings + avatars) and a single pull-quote." },
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  render: () => (
    <TestimonialGrid
      eyebrow="Loved by CX teams"
      title="Don't take our word for it"
      testimonials={testimonials}
    />
  ),
};

export const Quote: Story = {
  render: () => (
    <TestimonialQuote
      quote="We replaced four tools with Azeer and cut our median first response time from 12 minutes to under 30 seconds."
      authorName="Layla Haddad"
      authorRole="Head of Support, Marsool"
    />
  ),
};
