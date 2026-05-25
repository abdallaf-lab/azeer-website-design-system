import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays, subDays } from "date-fns";
import { arSA } from "date-fns/locale/ar-SA";
import { DatePicker, FormField } from "@azeer/ui";

const meta: Meta<typeof DatePicker> = {
  title: "Primitives/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Gregorian-only single-date picker — react-day-picker + date-fns",
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    displayFormat: { control: "text" },
  },
  args: {
    placeholder: "Pick a date",
    size: "md",
    disabled: false,
    displayFormat: "PPP",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 280 }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: function SizesStory() {
    const [d1, setD1] = React.useState<Date | undefined>();
    const [d2, setD2] = React.useState<Date | undefined>();
    const [d3, setD3] = React.useState<Date | undefined>();
    return (
      <div className="flex flex-col gap-3" style={{ width: 280 }}>
        <DatePicker value={d1} onValueChange={setD1} size="sm" placeholder="sm — 32 px" />
        <DatePicker value={d2} onValueChange={setD2} size="md" placeholder="md — 40 px (default)" />
        <DatePicker value={d3} onValueChange={setD3} size="lg" placeholder="lg — 48 px" />
      </div>
    );
  },
};

export const Prefilled: Story = {
  name: "Pre-filled with a Date",
  render: function PrefilledStory(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 4, 17));
    return (
      <div style={{ width: 280 }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
};

export const ConstrainedRange: Story = {
  name: "Constrained range (next 30 days only)",
  parameters: { controls: { disable: true } },
  render: function RangeStory() {
    const today = new Date();
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="flex flex-col gap-2" style={{ width: 320 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          fromDate={today}
          toDate={addDays(today, 30)}
          placeholder="Pick a date in the next 30 days"
        />
        <p className="text-body-sm text-fg-muted">
          Disabled dates outside the window.
        </p>
      </div>
    );
  },
};

export const DisabledMatcher: Story = {
  name: "Disable weekends",
  parameters: { controls: { disable: true } },
  render: function WeekendStory() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="flex flex-col gap-2" style={{ width: 320 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          disabledMatcher={(d) => {
            const day = d.getDay();
            return day === 0 || day === 6;
          }}
          placeholder="Weekday only"
        />
        <p className="text-body-sm text-fg-muted">
          Saturday + Sunday disabled via `disabledMatcher`.
        </p>
      </div>
    );
  },
};

export const InsideFormField: Story = {
  name: "Inside FormField",
  render: function FFStory() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 360 }}>
        <FormField
          label="Date of birth"
          required
          helper="Used to verify your account."
        >
          <DatePicker
            value={date}
            onValueChange={setDate}
            placeholder="MM / DD / YYYY"
            toDate={new Date()}
          />
        </FormField>
      </div>
    );
  },
};

export const ArabicLocale: Story = {
  name: "Arabic locale (Gregorian + Arabic month names)",
  parameters: { controls: { disable: true } },
  render: function ArabicStory() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 4, 17));
    return (
      <div lang="ar" dir="rtl" style={{ fontFamily: "var(--font-arabic)", width: 320 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          locale={arSA}
          displayFormat="d MMMM yyyy"
        />
      </div>
    );
  },
};

export const PastOnly: Story = {
  name: "Past dates only",
  parameters: { controls: { disable: true } },
  render: function PastStory() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          toDate={subDays(new Date(), 1)}
          placeholder="Pick a past date"
        />
      </div>
    );
  },
};
