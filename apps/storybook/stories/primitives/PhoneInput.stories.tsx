import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, PhoneInput } from "@azeer/ui";

const meta: Meta<typeof PhoneInput> = {
  title: "Primitives/PhoneInput",
  component: PhoneInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "E.164 storage + international display via libphonenumber-js",
    },
  },
  argTypes: {
    defaultCountry: { control: "select", options: ["SA", "AE", "EG", "US", "GB", "FR", "DE"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    defaultCountry: "SA",
    size: "md",
    placeholder: "+966 50 555 0142",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    return (
      <div className="flex flex-col gap-3" style={{ width: 320 }}>
        <PhoneInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          E.164: <code className="font-mono">{value ?? "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  name: "Pre-filled with E.164",
  render: function PrefilledStory(args) {
    const [value, setValue] = React.useState<string | undefined>("+966505550142");
    return (
      <div className="flex flex-col gap-3" style={{ width: 320 }}>
        <PhoneInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          E.164: <code className="font-mono">{value ?? "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  render: function FFStory() {
    const [value, setValue] = React.useState<string | undefined>();
    const [touched, setTouched] = React.useState(false);
    return (
      <div style={{ width: 360 }}>
        <FormField
          label="Phone number"
          required
          helper="We'll send a verification code via SMS."
          error={touched && !value ? "Enter a valid phone number." : undefined}
        >
          <PhoneInput
            value={value}
            onValueChange={(v) => {
              setValue(v);
              setTouched(true);
            }}
            placeholder="+966 50 555 0142"
          />
        </FormField>
      </div>
    );
  },
};

export const InsideArabicProse: Story = {
  name: "Inside Arabic prose (bidi-isolated)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      lang="ar"
      dir="rtl"
      style={{
        fontFamily: "var(--font-arabic)",
        color: "var(--color-fg-default)",
        maxWidth: 480,
      }}
      className="flex flex-col gap-3"
    >
      <p className="text-body-md">
        أدخل رقم الهاتف للتحقق من حسابك. سنرسل رمز التحقق عبر رسالة نصية.
      </p>
      <PhoneInput defaultValue="+966505550142" />
      <p className="text-body-sm text-fg-muted">
        الرقم يبقى LTR تلقائياً.
      </p>
    </div>
  ),
};
