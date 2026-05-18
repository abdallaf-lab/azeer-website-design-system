import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "@azeer/ui";

const meta: Meta<typeof Pagination> = {
  title: "Primitives/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Intercom-style — prev / numbered pages / next. No jump-to-page input.",
    },
  },
  argTypes: {
    pageCount: { control: { type: "number", min: 1, max: 100 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
    disabled: { control: "boolean" },
  },
  args: {
    pageCount: 10,
    siblingCount: 1,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function PaginationStory(args) {
    const [page, setPage] = React.useState(1);
    return (
      <Pagination
        {...args}
        page={page}
        onPageChange={setPage}
      />
    );
  },
};

export const FewPages: Story = {
  name: "Few pages (no ellipsis)",
  args: { pageCount: 5 },
  render: function PaginationStory(args) {
    const [page, setPage] = React.useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  name: "Many pages (with ellipses)",
  args: { pageCount: 50 },
  render: function PaginationStory(args) {
    const [page, setPage] = React.useState(25);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const AtFirstPage: Story = {
  name: "At first page (prev disabled)",
  args: { pageCount: 10 },
  render: function PaginationStory(args) {
    const [page, setPage] = React.useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const AtLastPage: Story = {
  name: "At last page (next disabled)",
  args: { pageCount: 10 },
  render: function PaginationStory(args) {
    const [page, setPage] = React.useState(10);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const TwoSiblings: Story = {
  name: "Wider siblingCount (2)",
  args: { pageCount: 30, siblingCount: 2 },
  render: function PaginationStory(args) {
    const [page, setPage] = React.useState(15);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
