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
  { label: '선택하세요', value: '' },
  { label: '개발자', value: 'dev' },
  { label: '디자이너', value: 'design' },
  { label: '마케터', value: 'marketing' },
  { label: '영업자', value: 'sales' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: '부서',
    options: defaultOptions,
  },
};

export const Error: Story = {
  args: {
    label: '부서',
    options: defaultOptions,
    error: true,
    errorMessage: '부서를 선택해주세요.',
  },
};

export const Disabled: Story = {
  args: {
    label: '부서',
    options: defaultOptions,
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: '부서',
    options: defaultOptions,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Small: Story = {
  args: {
    label: '부서',
    options: defaultOptions,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: '부서',
    options: defaultOptions,
    size: 'lg',
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: '부서',
    options: [
      { label: '선택하세요', value: '' },
      { label: '개발자', value: 'dev' },
      { label: '디자이너 (선택 불가)', value: 'design', disabled: true },
      { label: '마케터', value: 'marketing' },
    ],
  },
};
