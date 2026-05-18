import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, FormField, PinInput, toast } from "@azeer/ui";

const meta: Meta<typeof PinInput> = {
  title: "Primitives/PinInput",
  component: PinInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "N-digit code entry primitive for 2FA / OTP / verification flows",
    },
  },
  argTypes: {
    length: { control: { type: "number", min: 3, max: 10, step: 1 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    mask: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    length: 6,
    size: "md",
    mask: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col items-center gap-3">
        <PinInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          Value: <code className="font-mono">{value || "(empty)"}</code>
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: function SizesStory() {
    const [v1, setV1] = React.useState("");
    const [v2, setV2] = React.useState("");
    const [v3, setV3] = React.useState("");
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-label-xs uppercase text-fg-muted">sm</span>
          <PinInput size="sm" value={v1} onValueChange={setV1} />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-label-xs uppercase text-fg-muted">md (default)</span>
          <PinInput size="md" value={v2} onValueChange={setV2} />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-label-xs uppercase text-fg-muted">lg</span>
          <PinInput size="lg" value={v3} onValueChange={setV3} />
        </div>
      </div>
    );
  },
};

export const FourDigit: Story = {
  name: "4-digit (PIN style)",
  args: { length: 4 },
  render: function FourStory(args) {
    const [value, setValue] = React.useState("");
    return <PinInput {...args} value={value} onValueChange={setValue} />;
  },
};

export const EightDigit: Story = {
  name: "8-digit (long code)",
  args: { length: 8, size: "sm" },
  render: function EightStory(args) {
    const [value, setValue] = React.useState("");
    return <PinInput {...args} value={value} onValueChange={setValue} />;
  },
};

export const Masked: Story = {
  name: "Masked (sensitive code)",
  args: { mask: true },
  render: function MaskedStory(args) {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col items-center gap-3">
        <PinInput {...args} value={value} onValueChange={setValue} />
        <p className="text-body-sm text-fg-muted">
          Use for recovery codes / passcodes where over-the-shoulder reading is a risk.
        </p>
      </div>
    );
  },
};

export const OnComplete: Story = {
  name: "Auto-submit on complete",
  parameters: { controls: { disable: true } },
  render: function CompleteStory() {
    const [value, setValue] = React.useState("");
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col items-center gap-3">
        <PinInput
          value={value}
          onValueChange={setValue}
          onComplete={(code) => {
            setSubmitted(code);
            toast.success("Code verified", { description: `Submitted: ${code}` });
          }}
        />
        <p className="text-body-sm text-fg-muted">
          Last submitted:{" "}
          <code className="font-mono">{submitted ?? "(none)"}</code>
        </p>
      </div>
    );
  },
};

export const Invalid: Story = {
  name: "Invalid (wrong code)",
  parameters: { controls: { disable: true } },
  render: function InvalidStory() {
    const [value, setValue] = React.useState("123456");
    return (
      <div className="flex flex-col items-center gap-2">
        <PinInput value={value} onValueChange={setValue} aria-invalid />
        <p className="text-body-xs text-danger-text">
          The code you entered is incorrect.
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: function DisabledStory(args) {
    return <PinInput {...args} defaultValue="1234" />;
  },
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  parameters: { controls: { disable: true } },
  render: function FFStory() {
    const [code, setCode] = React.useState("");
    return (
      <div style={{ width: 400 }}>
        <FormField
          label="Verification code"
          required
          helper="We sent a 6-digit code to +966 50 555 ****."
        >
          <PinInput value={code} onValueChange={setCode} />
        </FormField>
      </div>
    );
  },
};

export const TwoFactorFlow: Story = {
  name: "Realistic flow — verify + resend",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: function FlowStory() {
    const [code, setCode] = React.useState("");
    const [status, setStatus] = React.useState<
      "idle" | "verifying" | "error" | "success"
    >("idle");

    const verify = (value: string) => {
      setStatus("verifying");
      setTimeout(() => {
        if (value === "123456") {
          setStatus("success");
          toast.success("Verified");
        } else {
          setStatus("error");
          toast.error("Wrong code", {
            description: "Try 123456 for this demo.",
          });
        }
      }, 500);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="w-[420px] flex flex-col items-center gap-5 p-8 bg-surface border border-border-subtle rounded-lg shadow-elev-2">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h2 className="text-heading-md text-fg-default">
              Enter verification code
            </h2>
            <p className="text-body-sm text-fg-muted">
              We sent a 6-digit code to{" "}
              <span className="text-fg-default">mahmoud@twerlo.com</span>
            </p>
          </div>
          <PinInput
            value={code}
            onValueChange={(v) => {
              setCode(v);
              setStatus("idle");
            }}
            onComplete={verify}
            autoFocus
            aria-invalid={status === "error"}
          />
          {status === "error" && (
            <p className="text-body-xs text-danger-text">
              Wrong code. Try again or request a new one.
            </p>
          )}
          {status === "success" && (
            <p className="text-body-xs text-success-text">
              Verified. Redirecting…
            </p>
          )}
          <div className="flex items-center gap-2 text-body-sm text-fg-muted">
            Didn't get it?
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toast.info("Code re-sent", {
                  description: "Check your inbox.",
                })
              }
            >
              Resend code
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
