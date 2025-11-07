import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@dbds/components';
import React from 'react';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '완료',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: '에러',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: '대기',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: '정보',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-gray-600">실행 중:</span>
        <Badge variant="info">Running</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-gray-600">성공:</span>
        <Badge variant="success">Success</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-gray-600">실패:</span>
        <Badge variant="error">Failed</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-20 text-sm text-gray-600">대기:</span>
        <Badge variant="warning">Pending</Badge>
      </div>
    </div>
  ),
};
