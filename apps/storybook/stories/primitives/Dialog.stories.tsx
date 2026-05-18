import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  Input,
  Textarea,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Dialog",
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Modal — sm 480 / md 640 / lg 800, centered, --elev-3",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a teammate</DialogTitle>
          <DialogDescription>
            They'll get an email with instructions to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <FormField label="Email address" required>
            <Input type="email" placeholder="teammate@company.com" />
          </FormField>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </DialogClose>
          <Button size="sm">Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  name: "All sizes",
  render: () => (
    <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm">sm (480)</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Small dialog</DialogTitle>
            <DialogDescription>Locked at 480 px wide.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm">md (640)</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Medium dialog</DialogTitle>
            <DialogDescription>The default — 640 px wide.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm">lg (800)</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Large dialog</DialogTitle>
            <DialogDescription>Locked at 800 px — for content-heavy modals.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const WithForm: Story = {
  name: "Form composition",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your display name and bio. Changes are visible to teammates.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <FormField label="Display name" required>
              <Input defaultValue="Sara Khan" />
            </FormField>
            <FormField label="Bio" optional helper="Up to 280 characters.">
              <Textarea defaultValue="Customer Support · MENA region" rows={3} />
            </FormField>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </DialogClose>
          <Button size="sm">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  name: "Long content (body scrolls)",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Terms of service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Last updated May 16, 2026.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-3 pb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i}>
                Section {i + 1}. By using Azeer, you agree to be bound by these
                terms. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </DialogClose>
          <Button size="sm">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
