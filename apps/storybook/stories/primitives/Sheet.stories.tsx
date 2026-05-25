import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  FormField,
  Input,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Sheet",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Edge-anchored panel — slides from start / end / bottom",
    },
  },
};

export default meta;

type Story = StoryObj;

export const End: Story = {
  name: "Side = end (default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open from end</Button>
      </SheetTrigger>
      <SheetContent side="end">
        <SheetHeader>
          <SheetTitle>Conversation details</SheetTitle>
          <SheetDescription>System fields + tags.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>End-side sheet — mirrors automatically under RTL.</p>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary" size="sm">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Start: Story = {
  name: "Side = start",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open from start</Button>
      </SheetTrigger>
      <SheetContent side="start">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Channel, status, date range.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>Start-side sheet — slides from the start edge of the viewport.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  name: "Side = bottom",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open from bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
          <SheetDescription>Mobile-friendly action picker.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>Bottom sheet — capped at 80 vh max-height.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  name: "Form composition",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Edit conversation</Button>
      </SheetTrigger>
      <SheetContent side="end">
        <SheetHeader>
          <SheetTitle>Edit conversation</SheetTitle>
          <SheetDescription>
            Adjust attributes — changes apply immediately.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="flex flex-col gap-4">
            <FormField label="Subject">
              <Input defaultValue="Delayed shipment for order #18247" />
            </FormField>
            <FormField label="Internal note" optional>
              <Textarea
                defaultValue="VIP customer — escalate to senior agent if escalated."
                rows={4}
              />
            </FormField>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </SheetClose>
          <Button size="sm">Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
