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
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="모달 제목">
          <Modal.Body>
            <p>모달 내용입니다</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              확인
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
        <Button onClick={() => setOpen(true)}>작은 모달</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="작은 모달"
          size="sm"
        >
          <Modal.Body>
            <p>작은 크기의 모달입니다</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>닫기</Button>
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
        <Button onClick={() => setOpen(true)}>큰 모달</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="큰 모달"
          size="lg"
        >
          <Modal.Body>
            <p className="mb-4">큰 크기의 모달입니다</p>
            <p className="text-sm text-gray-600">
              많은 내용을 표시할 수 있습니다. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              ?�인
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
        <Button onClick={() => setOpen(true)}>배경 ?�릭?�로 ?�기 불�?</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="배경 ?�릭 비활?�화"
          closeOnBackdrop={false}
        >
          <Modal.Body>
            <p>배경???�릭?�도 모달???�히지 ?�습?�다.</p>
            <p className="text-sm text-gray-600 mt-2">
              X 버튼?�나 ?�단 버튼?�로�??�을 ???�습?�다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>?�기</Button>
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
        <Button onClick={() => setOpen(true)}>�??�용 모달</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="�??�용??모달"
        >
          <Modal.Body>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-2">
                {i + 1}. ?�크�?가?�한 �??�용?�니?? Lorem ipsum dolor sit
                amet.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>?�기</Button>
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
      alert('확인되었습니다');
      setOpen(false);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          ??��
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="??�� ?�인"
          size="sm"
        >
          <Modal.Body>
            <p>?�말 ??��?�시겠습?�까?</p>
            <p className="text-sm text-gray-600 mt-2">
              ???�업?� ?�돌�????�습?�다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              ??��
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
