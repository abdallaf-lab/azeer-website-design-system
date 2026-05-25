import type { Meta, StoryObj } from "@storybook/react-vite";
import { AzeerLogo, Footer, NewsletterSignup } from "@azeer/website-ui";
import {
  footerBottomLinks,
  footerColumns,
  footerSocial,
} from "./_fixtures";

const meta: Meta<typeof Footer> = {
  title: "Website/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Site footer — brand column (logo, blurb, newsletter, social), link columns, and a legal bottom bar.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Footer
      logo={<AzeerLogo className="text-lg" />}
      description="One workspace for every customer conversation — WhatsApp, Voice, SMS, email, and social, with AI built in."
      social={footerSocial}
      columns={footerColumns}
      legal={<>© 2026 Azeer, Inc. All rights reserved.</>}
      bottomLinks={footerBottomLinks}
    />
  ),
};

export const WithNewsletter: Story = {
  name: "With newsletter slot",
  render: () => (
    <Footer
      logo={<AzeerLogo className="text-lg" />}
      description="One workspace for every customer conversation — WhatsApp, Voice, SMS, email, and social, with AI built in."
      brandSlot={
        <NewsletterSignup
          title="Stay in the loop"
          description="Product updates and CX playbooks, monthly."
          buttonLabel="Subscribe"
          note="By subscribing you agree to our Privacy Policy."
        />
      }
      social={footerSocial}
      columns={footerColumns}
      legal={<>© 2026 Azeer, Inc. All rights reserved.</>}
      bottomLinks={footerBottomLinks}
    />
  ),
};
