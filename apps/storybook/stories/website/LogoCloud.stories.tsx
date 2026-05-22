import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoCloud } from "@azeer/website-ui";
import { trustedLogos } from "./_fixtures";

const meta: Meta<typeof LogoCloud> = {
  title: "Website/LogoCloud",
  component: LogoCloud,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "A band of customer/partner logos — calm grayscale that lifts on hover." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LogoCloud title="Trusted by modern support teams" logos={trustedLogos} />,
};

export const FullColor: Story = {
  name: "Always full color",
  render: () => <LogoCloud logos={trustedLogos} muted={false} tone="surface" />,
};
