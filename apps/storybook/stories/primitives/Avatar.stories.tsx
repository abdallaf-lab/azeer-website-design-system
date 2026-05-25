import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup } from "@azeer/ui";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "2 shapes × 6 sizes — circles for people, rounded for organizations",
    },
  },
  argTypes: {
    shape: { control: "radio", options: ["circle", "rounded"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    presence: {
      control: "select",
      options: [undefined, "online", "away", "busy", "offline"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    name: { control: "text" },
  },
  args: {
    shape: "circle",
    size: "md",
    alt: "Sara Khan",
    name: "Sara Khan",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitialsFallback: Story = {
  name: "Initials fallback",
  args: { src: undefined },
};

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/150?img=12" },
};

export const Shapes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar shape="circle" size="lg" alt="Sara Khan" name="Sara Khan" />
        <span style={{ font: "var(--text-body-xs)", color: "var(--color-fg-muted)" }}>
          People → circle
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Avatar shape="rounded" size="lg" alt="Acme Inc" name="Acme Inc" />
        <span style={{ font: "var(--text-body-xs)", color: "var(--color-fg-muted)" }}>
          Orgs → rounded
        </span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar size="xs" alt="A B" name="A B" />
      <Avatar size="sm" alt="B C" name="B C" />
      <Avatar size="md" alt="C D" name="C D" />
      <Avatar size="lg" alt="D E" name="D E" />
      <Avatar size="xl" alt="E F" name="E F" />
      <Avatar size="2xl" alt="F G" name="F G" />
    </div>
  ),
};

export const Presence: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar alt="A B" name="A B" presence="online" />
      <Avatar alt="B C" name="B C" presence="away" />
      <Avatar alt="C D" name="C D" presence="busy" />
      <Avatar alt="D E" name="D E" presence="offline" />
    </div>
  ),
};

export const Group: Story = {
  name: "AvatarGroup",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <AvatarGroup max={3}>
        <Avatar alt="Sara Khan" name="Sara Khan" />
        <Avatar alt="Ali Hassan" name="Ali Hassan" />
        <Avatar alt="Maria Lopez" name="Maria Lopez" />
        <Avatar alt="John Smith" name="John Smith" />
        <Avatar alt="Emma Stone" name="Emma Stone" />
      </AvatarGroup>
      <AvatarGroup max={5} size="sm">
        <Avatar alt="Sara Khan" name="Sara Khan" />
        <Avatar alt="Ali Hassan" name="Ali Hassan" />
        <Avatar alt="Maria Lopez" name="Maria Lopez" />
      </AvatarGroup>
    </div>
  ),
};
