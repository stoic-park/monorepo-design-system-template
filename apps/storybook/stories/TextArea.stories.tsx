import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@design-system/components';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '?´ìš©???…ë ¥?˜ì„¸??,
  },
};

export const WithLabel: Story = {
  args: {
    label: '?¤ëª…',
    placeholder: '?ì„¸???¤ëª…???…ë ¥?˜ì„¸??,
    rows: 5,
  },
};

export const Error: Story = {
  args: {
    label: '?¤ëª…',
    placeholder: '?´ìš©???…ë ¥?˜ì„¸??,
    error: true,
    errorMessage: '?¤ëª…???…ë ¥?´ì£¼?¸ìš”.',
  },
};

export const Disabled: Story = {
  args: {
    label: '?¤ëª…',
    placeholder: 'ë¹„í™œ?±í™”??,
    disabled: true,
  },
};

export const NoResize: Story = {
  args: {
    label: 'ê³ ì • ?¬ê¸°',
    placeholder: 'ë¦¬ì‚¬?´ì¦ˆ ë¶ˆê?',
    resize: 'none',
  },
};

export const HorizontalResize: Story = {
  args: {
    label: 'ê°€ë¡?ë¦¬ì‚¬?´ì¦ˆ',
    placeholder: 'ê°€ë¡œë¡œë§??¬ê¸° ì¡°ì ˆ ê°€??,
    resize: 'horizontal',
  },
};

export const LargeTextArea: Story = {
  args: {
    label: 'ê¸??´ìš©',
    placeholder: 'ê¸??´ìš©???…ë ¥?˜ì„¸??,
    rows: 10,
  },
};
