import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@design-system/components';
import React from 'react';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    closable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ê¸°ë³¸ ?Œë¦¼ ë©”ì‹œì§€?…ë‹ˆ??',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: '?±ê³µ',
    children: '?‘ì—…???±ê³µ?ìœ¼ë¡??„ë£Œ?˜ì—ˆ?µë‹ˆ??',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: '?¤ë¥˜',
    children: '?‘ì—…??ì²˜ë¦¬?˜ëŠ” ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'ê²½ê³ ',
    children: '???‘ì—…?€ ?˜ëŒë¦????†ìŠµ?ˆë‹¤. ? ì¤‘?˜ê²Œ ? íƒ?´ì£¼?¸ìš”.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: '?ˆë‚´',
    children: '?ˆë¡œ??ê¸°ëŠ¥??ì¶”ê??˜ì—ˆ?µë‹ˆ?? ?•ì¸?´ë³´?¸ìš”.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    children: '?œëª© ?†ëŠ” ?Œë¦¼ ë©”ì‹œì§€?…ë‹ˆ??',
  },
};

export const Closable: Story = {
  args: {
    variant: 'info',
    title: '?«ì„ ???ˆëŠ” ?Œë¦¼',
    children: '?¤ë¥¸ìª?X ë²„íŠ¼???´ë¦­?˜ì—¬ ?«ì„ ???ˆìŠµ?ˆë‹¤.',
    closable: true,
    onClose: () => alert('Alert closed'),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'ê¸??´ìš©???Œë¦¼',
    children: `
      ?´ê²ƒ?€ ê¸??´ìš©???Œë¦¼ ë©”ì‹œì§€?…ë‹ˆ?? 
      ?¬ëŸ¬ ì¤„ì— ê±¸ì³???œì‹œ?????ˆìœ¼ë©?
      ?¬ìš©?ì—ê²?ì¤‘ìš”???•ë³´ë¥??„ë‹¬?˜ëŠ” ???¬ìš©?©ë‹ˆ??
      ëª¨ë“  ?´ìš©??ê¹”ë”?˜ê²Œ ?•ë ¬?˜ì–´ ?œì‹œ?©ë‹ˆ??
    `,
    closable: true,
  },
};

export const AllVariants: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Alert variant="default" title="Default">
        ê¸°ë³¸ ?Œë¦¼ ë©”ì‹œì§€?…ë‹ˆ??
      </Alert>
      <Alert variant="success" title="Success">
        ?‘ì—…???±ê³µ?ìœ¼ë¡??„ë£Œ?˜ì—ˆ?µë‹ˆ??
      </Alert>
      <Alert variant="error" title="Error">
        ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.
      </Alert>
      <Alert variant="warning" title="Warning">
        ê²½ê³  ë©”ì‹œì§€?…ë‹ˆ??
      </Alert>
      <Alert variant="info" title="Info">
        ?•ë³´ ë©”ì‹œì§€?…ë‹ˆ??
      </Alert>
    </div>
  ),
};
