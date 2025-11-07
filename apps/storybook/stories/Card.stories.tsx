import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@dbds/components';
import React from 'react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">
          This is a default card with minimal styling.
        </p>
      </div>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Bordered Card</h3>
        <p className="text-gray-600">
          This card has a subtle border for definition.
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
        <p className="text-gray-600">
          This card has a shadow to appear elevated from the background.
        </p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    variant: 'bordered',
    padding: 'none',
    children: (
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Custom Padding</h3>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    variant: 'bordered',
    children: 'Small padding card',
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    variant: 'bordered',
    children: 'Large padding card',
  },
};

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <Card variant="default">
        <h3 className="font-semibold mb-1">Default</h3>
        <p className="text-sm text-gray-600">Clean and simple</p>
      </Card>
      <Card variant="bordered">
        <h3 className="font-semibold mb-1">Bordered</h3>
        <p className="text-sm text-gray-600">With subtle border</p>
      </Card>
      <Card variant="elevated">
        <h3 className="font-semibold mb-1">Elevated</h3>
        <p className="text-sm text-gray-600">With shadow effect</p>
      </Card>
    </div>
  ),
};

export const ProductCard: Story = {
  args: { children: '' },
  render: () => (
    <Card variant="elevated" padding="none" className="w-64">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">Product Name</h3>
        <p className="text-sm text-gray-600 mb-3">Brief product description</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">$99</span>
          <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </Card>
  ),
};
