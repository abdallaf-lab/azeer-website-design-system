import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AzeerLogo,
  CtaButton,
  MegaMenuProduct,
  MegaMenuResources,
  MegaMenuSolutions,
  Navbar,
} from "@azeer/website-ui";
import {
  productMenuItems,
  resourceLinks,
  solutionGroups,
} from "./_fixtures";

const meta: Meta<typeof Navbar> = {
  title: "Website/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      subtitle:
        "Marketing top bar — plain links + mega-menu triggers, with a responsive mobile drawer. Hover or click a trigger to open its panel.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Navbar
      sticky={false}
      logo={<AzeerLogo className="text-xl" />}
      items={[
        { label: "Product", menu: <MegaMenuProduct items={productMenuItems} /> },
        { label: "Solutions", menu: <MegaMenuSolutions groups={solutionGroups} /> },
        {
          label: "Resources",
          menu: (
            <MegaMenuResources
              links={resourceLinks}
              featured={{
                label: "Featured",
                items: [
                  { label: "The 2026 CX benchmark report", href: "#" },
                  { label: "WhatsApp at scale: a playbook", href: "#" },
                  { label: "Designing for RTL & Arabic", href: "#" },
                ],
              }}
            />
          ),
        },
        { label: "Pricing", href: "#pricing" },
      ]}
      actions={
        <>
          <CtaButton action={{ label: "Log in", href: "#login" }} variant="ghost" size="md" />
          <CtaButton action={{ label: "Get started", href: "#signup" }} variant="primary" size="md" />
        </>
      }
    />
  ),
};
