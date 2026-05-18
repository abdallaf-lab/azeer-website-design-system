import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  FormField,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Popover",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Floating panel — white-overlay surface, --elev-2, no arrow",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-heading-sm text-fg-default">Dimensions</h4>
          <p className="text-body-sm text-fg-muted">
            Set the dimensions for this contact card.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const InlineForm: Story = {
  name: "Inline form composition",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Edit display name</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3">
          <FormField label="Display name" helper="Shown to teammates in the inbox.">
            <Input defaultValue="Sara Khan" />
          </FormField>
          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button variant="ghost" size="sm">Cancel</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button size="sm">Save</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Sides: Story = {
  name: "Placement sides",
  render: () => (
    <div className="flex gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-48 p-3 text-body-sm">
          Opens above the trigger.
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-48 p-3 text-body-sm">
          Opens below the trigger (default).
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-48 p-3 text-body-sm">
          Opens to the start side.
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-48 p-3 text-body-sm">
          Opens to the end side.
        </PopoverContent>
      </Popover>
    </div>
  ),
};
