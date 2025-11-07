import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, Button } from '@dbds/components';

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
            <p>모달 내용입니다.</p>
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
            <p>작은 크기의 모달입니다.</p>
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
            <p className="mb-4">큰 크기의 모달입니다.</p>
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
              확인
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
        <Button onClick={() => setOpen(true)}>배경 클릭으로 닫기 불가</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="배경 클릭 비활성화"
          closeOnBackdrop={false}
        >
          <Modal.Body>
            <p>배경을 클릭해도 모달이 닫히지 않습니다.</p>
            <p className="text-sm text-gray-600 mt-2">
              X 버튼이나 하단 버튼으로만 닫을 수 있습니다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>닫기</Button>
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
        <Button onClick={() => setOpen(true)}>긴 내용 모달</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="긴 내용의 모달"
        >
          <Modal.Body>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-2">
                {i + 1}. 스크롤 가능한 긴 내용입니다. Lorem ipsum dolor sit
                amet.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>닫기</Button>
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
      alert('삭제되었습니다');
      setOpen(false);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          삭제
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="삭제 확인"
          size="sm"
        >
          <Modal.Body>
            <p>정말 삭제하시겠습니까?</p>
            <p className="text-sm text-gray-600 mt-2">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
