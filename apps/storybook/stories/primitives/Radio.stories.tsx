import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, Label, RadioGroup, RadioGroupItem } from "@azeer/ui";

const meta: Meta<typeof RadioGroup> = {
  title: "Primitives/Radio",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Single-select group — RadioGroup + RadioGroupItem, arrow-key navigation",
    },
  },
  argTypes: {
    defaultValue: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    defaultValue: "whatsapp",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="whatsapp" id="r-whatsapp" />
        <Label htmlFor="r-whatsapp" className="cursor-pointer">
          WhatsApp
        </Label>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="voice" id="r-voice" />
        <Label htmlFor="r-voice" className="cursor-pointer">
          Voice
        </Label>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="sms" id="r-sms" />
        <Label htmlFor="r-sms" className="cursor-pointer">
          SMS
        </Label>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="email" id="r-email" />
        <Label htmlFor="r-email" className="cursor-pointer">
          Email
        </Label>
      </label>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const DisabledItem: Story = {
  name: "One item disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup defaultValue="card">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="card" id="p-card" />
        <Label htmlFor="p-card" className="cursor-pointer">
          Card
        </Label>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="bank" id="p-bank" />
        <Label htmlFor="p-bank" className="cursor-pointer">
          Bank transfer
        </Label>
      </label>
      <label className="inline-flex items-center gap-2 cursor-not-allowed">
        <RadioGroupItem value="crypto" id="p-crypto" disabled />
        <Label htmlFor="p-crypto" className="cursor-not-allowed">
          Crypto <span className="text-fg-muted">(not available in your region)</span>
        </Label>
      </label>
    </RadioGroup>
  ),
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField label="Sending channel" required>
        <RadioGroup defaultValue="whatsapp">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="whatsapp" id="ff-r-whatsapp" />
            <Label htmlFor="ff-r-whatsapp" className="cursor-pointer">
              WhatsApp
            </Label>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="sms" id="ff-r-sms" />
            <Label htmlFor="ff-r-sms" className="cursor-pointer">
              SMS
            </Label>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="email" id="ff-r-email" />
            <Label htmlFor="ff-r-email" className="cursor-pointer">
              Email
            </Label>
          </label>
        </RadioGroup>
      </FormField>
    </div>
  ),
};
