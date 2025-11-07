import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@design-system/components';
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
    label: '?™ì˜?©ë‹ˆ??,
  },
};

export const WithDescription: Story = {
  args: {
    label: '?½ê????™ì˜?©ë‹ˆ??,
    description: '?œë¹„???´ìš©?½ê? ë°?ê°œì¸?•ë³´ ì²˜ë¦¬ë°©ì¹¨???™ì˜?©ë‹ˆ??',
  },
};

export const Error: Story = {
  args: {
    label: '?„ìˆ˜ ?™ì˜ ??ª©',
    error: true,
    errorMessage: '?„ìˆ˜ ??ª©?…ë‹ˆ??',
  },
};

export const Disabled: Story = {
  args: {
    label: 'ë¹„í™œ?±í™”??,
    disabled: true,
  },
};

export const Checked: Story = {
  args: {
    label: '? íƒ??,
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
      <Checkbox label="?µì…˜ 1" defaultChecked />
      <Checkbox label="?µì…˜ 2" />
      <Checkbox label="?µì…˜ 3" />
      <Checkbox label="?µì…˜ 4 (ë¹„í™œ?±í™”)" disabled />
    </div>
  ),
};
