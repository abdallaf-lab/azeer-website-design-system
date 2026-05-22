import type { Meta, StoryObj } from "@storybook/react-vite";
import { NewsletterSignup } from "@azeer/website-ui";

const meta: Meta<typeof NewsletterSignup> = {
  title: "Website/NewsletterSignup",
  component: NewsletterSignup,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Email capture (Input + Button). Validates, then swaps to a success confirmation. Try submitting an invalid then a valid email.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <NewsletterSignup
        title="Stay in the loop"
        description="Product updates and CX playbooks, monthly. No spam."
        buttonLabel="Subscribe"
        note="By subscribing you agree to our Privacy Policy."
      />
    </div>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div className="w-[360px] max-w-full">
      <NewsletterSignup
        stacked
        title="Join the newsletter"
        buttonLabel="Sign up"
      />
    </div>
  ),
};
