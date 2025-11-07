import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, Button } from '@design-system/components';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdrop: {
      control: 'boolean',
    },
    closeOnEsc: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { open: false, onClose: () => {}, children: '' },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>ëª¨ë‹¬ ?´ê¸°</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="ëª¨ë‹¬ ?œëª©">
          <Modal.Body>
            <p>ëª¨ë‹¬ ?´ìš©?…ë‹ˆ??</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              ì·¨ì†Œ
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              ?•ì¸
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  args: { open: false, onClose: () => {}, children: '' },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>?‘ì? ëª¨ë‹¬</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="?‘ì? ëª¨ë‹¬"
          size="sm"
        >
          <Modal.Body>
            <p>?‘ì? ?¬ê¸°??ëª¨ë‹¬?…ë‹ˆ??</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>?«ê¸°</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  args: { open: false, onClose: () => {}, children: '' },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>??ëª¨ë‹¬</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="??ëª¨ë‹¬"
          size="lg"
        >
          <Modal.Body>
            <p className="mb-4">???¬ê¸°??ëª¨ë‹¬?…ë‹ˆ??</p>
            <p className="text-sm text-gray-600">
              ë§ì? ?´ìš©???œì‹œ?????ˆìŠµ?ˆë‹¤. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              ì·¨ì†Œ
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              ?•ì¸
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const NoBackdropClose: Story = {
  args: { open: false, onClose: () => {}, children: '' },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>ë°°ê²½ ?´ë¦­?¼ë¡œ ?«ê¸° ë¶ˆê?</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="ë°°ê²½ ?´ë¦­ ë¹„í™œ?±í™”"
          closeOnBackdrop={false}
        >
          <Modal.Body>
            <p>ë°°ê²½???´ë¦­?´ë„ ëª¨ë‹¬???«íˆì§€ ?ŠìŠµ?ˆë‹¤.</p>
            <p className="text-sm text-gray-600 mt-2">
              X ë²„íŠ¼?´ë‚˜ ?˜ë‹¨ ë²„íŠ¼?¼ë¡œë§??«ì„ ???ˆìŠµ?ˆë‹¤.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>?«ê¸°</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  args: { open: false, onClose: () => {}, children: '' },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>ê¸??´ìš© ëª¨ë‹¬</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="ê¸??´ìš©??ëª¨ë‹¬"
        >
          <Modal.Body>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-2">
                {i + 1}. ?¤í¬ë¡?ê°€?¥í•œ ê¸??´ìš©?…ë‹ˆ?? Lorem ipsum dolor sit
                amet.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>?«ê¸°</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const ConfirmDialog: Story = {
  args: { open: false, onClose: () => {}, children: '' },
  render: () => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
      alert('?? œ?˜ì—ˆ?µë‹ˆ??);
      setOpen(false);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          ?? œ
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="?? œ ?•ì¸"
          size="sm"
        >
          <Modal.Body>
            <p>?•ë§ ?? œ?˜ì‹œê² ìŠµ?ˆê¹Œ?</p>
            <p className="text-sm text-gray-600 mt-2">
              ???‘ì—…?€ ?˜ëŒë¦????†ìŠµ?ˆë‹¤.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              ì·¨ì†Œ
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              ?? œ
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
