import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@dbds/components';
import React from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '동의합니다',
  },
};

export const WithDescription: Story = {
  args: {
    label: '약관에 동의합니다',
    description: '서비스 이용약관 및 개인정보 처리방침에 동의합니다.',
  },
};

export const Error: Story = {
  args: {
    label: '필수 동의 항목',
    error: true,
    errorMessage: '필수 항목입니다.',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화됨',
    disabled: true,
  },
};

export const Checked: Story = {
  args: {
    label: '선택됨',
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Group: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="옵션 1" defaultChecked />
      <Checkbox label="옵션 2" />
      <Checkbox label="옵션 3" />
      <Checkbox label="옵션 4 (비활성화)" disabled />
    </div>
  ),
};
