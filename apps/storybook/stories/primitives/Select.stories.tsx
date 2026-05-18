import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FormField,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Select",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "≤7 static options — use Combobox for larger / searchable lists",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="whatsapp">WhatsApp</SelectItem>
          <SelectItem value="voice">Voice</SelectItem>
          <SelectItem value="sms">SMS</SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 240 }}>
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="sm — 32 px" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger size="md">
          <SelectValue placeholder="md — 40 px (default)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger size="lg">
          <SelectValue placeholder="lg — 48 px" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithLabel: Story = {
  name: "Inside FormField",
  render: () => (
    <div style={{ width: 320 }}>
      <FormField label="Default sending channel" required helper="Used for outbound campaigns.">
        <Select defaultValue="whatsapp">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="voice">Voice</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  ),
};

export const Grouped: Story = {
  name: "Grouped + separator",
  render: () => (
    <div style={{ width: 280 }}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Assign to…" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Agents</SelectLabel>
            <SelectItem value="sara">Sara Khan</SelectItem>
            <SelectItem value="ali">Ali Hassan</SelectItem>
            <SelectItem value="maria">Maria Lopez</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Teams</SelectLabel>
            <SelectItem value="support">Customer Support</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Select disabled defaultValue="whatsapp">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="whatsapp">WhatsApp</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const DisabledItem: Story = {
  name: "With disabled item",
  render: () => (
    <div style={{ width: 240 }}>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise" disabled>Enterprise (contact sales)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
