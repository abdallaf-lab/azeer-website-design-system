import type { Meta, StoryObj } from "@storybook/react-vite";
import { VerticalSwitcher } from "@azeer/website-ui";
import { MockPanel } from "./_fixtures";

const meta: Meta<typeof VerticalSwitcher> = {
  title: "Website/VerticalSwitcher",
  component: VerticalSwitcher,
  parameters: {
    layout: "fullscreen",
    docs: { subtitle: "Tabbed section that swaps tailored content per industry vertical (DS Tabs)." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Panel({ headline, body, points, label }: { headline: string; body: string; points: string[]; label: string }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-4">
        <h3 className="text-heading-lg text-fg-default">{headline}</h3>
        <p className="text-body-md text-fg-muted">{body}</p>
        <ul className="mt-2 flex flex-col gap-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-body-sm text-fg-default">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-fill" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <MockPanel label={label} />
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <VerticalSwitcher
      eyebrow="By industry"
      title="Tuned to how you work"
      description="The same platform, shaped to your team's playbook."
      verticals={[
        {
          value: "retail",
          label: "Retail",
          content: (
            <Panel
              headline="Turn conversations into orders"
              body="Answer pre-sales questions, recover carts, and handle returns — all from WhatsApp and chat."
              points={["Broadcast offers within policy limits", "Order status and tracking replies", "Cart recovery automations"]}
              label="Azeer · Retail"
            />
          ),
        },
        {
          value: "banking",
          label: "Banking",
          content: (
            <Panel
              headline="Secure, compliant support"
              body="Verify identity, resolve disputes, and keep an auditable trail across every interaction."
              points={["Identity verification flows", "Audit logs and data residency", "Role-based access controls"]}
              label="Azeer · Banking"
            />
          ),
        },
        {
          value: "healthcare",
          label: "Healthcare",
          content: (
            <Panel
              headline="Care that scales"
              body="Book appointments, send reminders, and answer questions while keeping data protected."
              points={["Appointment scheduling", "Automated reminders", "HIPAA-ready handling"]}
              label="Azeer · Healthcare"
            />
          ),
        },
      ]}
    />
  ),
};
