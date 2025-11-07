import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@design-system/components';
import React from 'react';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {},
  render: () => (
    <div className="w-96">
      <p className="text-sm">ì²?ë²ˆì§¸ ?¹ì…˜</p>
      <Divider />
      <p className="text-sm">??ë²ˆì§¸ ?¹ì…˜</p>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: '?ëŠ”',
    labelPosition: 'center',
  },
  render: (args) => (
    <div className="w-96">
      <p className="text-sm">ë¡œê·¸??/p>
      <Divider {...args} />
      <p className="text-sm">?Œì…œ ë¡œê·¸??/p>
    </div>
  ),
};

export const LabelLeft: Story = {
  args: {
    label: 'ì¶”ê? ?µì…˜',
    labelPosition: 'left',
  },
  render: (args) => (
    <div className="w-96">
      <Divider {...args} />
    </div>
  ),
};

export const LabelRight: Story = {
  args: {
    label: '??ë³´ê¸°',
    labelPosition: 'right',
  },
  render: (args) => (
    <div className="w-96">
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: () => (
    <div className="flex items-center h-20">
      <span className="text-sm">?¼ìª½</span>
      <Divider orientation="vertical" />
      <span className="text-sm">ê°€?´ë°</span>
      <Divider orientation="vertical" />
      <span className="text-sm">?¤ë¥¸ìª?/span>
    </div>
  ),
};

export const InCard: Story = {
  args: {},
  render: () => (
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-bold mb-2">ì¹´ë“œ ?œëª©</h3>
      <p className="text-sm text-gray-600 mb-4">ì²?ë²ˆì§¸ ?¹ì…˜???´ìš©?…ë‹ˆ??</p>

      <Divider />

      <h3 className="text-lg font-bold mb-2">??ë²ˆì§¸ ?¹ì…˜</h3>
      <p className="text-sm text-gray-600 mb-4">??ë²ˆì§¸ ?¹ì…˜???´ìš©?…ë‹ˆ??</p>

      <Divider label="ì¶”ê? ?•ë³´" />

      <p className="text-sm text-gray-600">??ë²ˆì§¸ ?¹ì…˜???´ìš©?…ë‹ˆ??</p>
    </div>
  ),
};
