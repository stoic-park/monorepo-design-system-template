import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@design-system/components';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: '? νƒ?μ„Έ??, value: '' },
  { label: 'κ°λ°?€', value: 'dev' },
  { label: '?”μ?Έν?', value: 'design' },
  { label: 'λ§μ??…ν?', value: 'marketing' },
  { label: '?μ—…?€', value: 'sales' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'λ¶€??,
    options: defaultOptions,
  },
};

export const Error: Story = {
  args: {
    label: 'λ¶€??,
    options: defaultOptions,
    error: true,
    errorMessage: 'λ¶€?λ? ? νƒ?΄μ£Ό?Έμ”.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'λ¶€??,
    options: defaultOptions,
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'λ¶€??,
    options: defaultOptions,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Small: Story = {
  args: {
    label: 'λ¶€??,
    options: defaultOptions,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'λ¶€??,
    options: defaultOptions,
    size: 'lg',
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'λ¶€??,
    options: [
      { label: '? νƒ?μ„Έ??, value: '' },
      { label: 'κ°λ°?€', value: 'dev' },
      { label: '?”μ?Έν? (? νƒ λ¶κ?)', value: 'design', disabled: true },
      { label: 'λ§μ??…ν?', value: 'marketing' },
    ],
  },
};
