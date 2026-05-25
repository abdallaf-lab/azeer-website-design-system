import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileInput, FormField } from "@azeer/ui";

const meta: Meta<typeof FileInput> = {
  title: "Primitives/FileInput",
  component: FileInput,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Drop zone + click-to-browse — single-file in v1, multi-file deferred to v1.2",
    },
  },
  argTypes: {
    accept: { control: "text" },
    disabled: { control: "boolean" },
    maxSize: { control: "number" },
    helper: { control: "text" },
  },
  args: {
    accept: "image/*",
    disabled: false,
    helper: "PNG, JPG up to 5 MB",
    maxSize: 5 * 1024 * 1024,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [file, setFile] = React.useState<File | null>(null);
    return (
      <div style={{ width: 400 }}>
        <FileInput {...args} value={file} onValueChange={setFile} />
      </div>
    );
  },
};

export const AnyFile: Story = {
  name: "Any file type",
  args: { accept: undefined, helper: "Any file up to 25 MB", maxSize: 25 * 1024 * 1024 },
  render: function AnyStory(args) {
    const [file, setFile] = React.useState<File | null>(null);
    return (
      <div style={{ width: 400 }}>
        <FileInput {...args} value={file} onValueChange={setFile} />
      </div>
    );
  },
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  render: function FFStory() {
    const [file, setFile] = React.useState<File | null>(null);
    return (
      <div style={{ width: 400 }}>
        <FormField
          label="Avatar"
          optional
          helper="Square images work best. Up to 2 MB."
        >
          <FileInput
            accept="image/png,image/jpeg"
            maxSize={2 * 1024 * 1024}
            value={file}
            onValueChange={setFile}
            helper="PNG or JPG"
          />
        </FormField>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: function DisabledStory(args) {
    return (
      <div style={{ width: 400 }}>
        <FileInput {...args} value={null} />
      </div>
    );
  },
};

export const PreFilled: Story = {
  name: "With pre-selected file",
  parameters: { controls: { disable: true } },
  render: function PreStory() {
    const [file, setFile] = React.useState<File | null>(() => {
      // Fabricate a File for demo purposes
      return new File(["fake content"], "attachment.pdf", { type: "application/pdf" });
    });
    return (
      <div style={{ width: 400 }}>
        <FileInput value={file} onValueChange={setFile} accept=".pdf" />
      </div>
    );
  },
};
