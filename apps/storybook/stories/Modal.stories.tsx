import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  Button,
} from '@design-system/components';

const meta = {
  title: 'Components/Modal',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>모달 제목</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          <p>모달 내용입니다.</p>
          <p className="text-sm text-gray-600 mt-2">
            이곳에 필요한 내용을 작성할 수 있습니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline" style={{ minWidth: '80px' }}>
              취소
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="primary" style={{ minWidth: '80px' }}>
              확인
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>설명이 있는 모달</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <div>
            <ModalTitle>계정 삭제</ModalTitle>
            <ModalDescription>
              이 작업은 되돌릴 수 없습니다. 신중하게 결정해주세요.
            </ModalDescription>
          </div>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          <p>정말로 계정을 삭제하시겠습니까?</p>
          <p className="text-sm text-gray-600 mt-2">
            모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline" style={{ minWidth: '80px' }}>
              취소
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="primary" style={{ minWidth: '80px' }}>
              삭제
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Small: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>작은 모달</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>작은 모달</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          <p>작은 크기의 모달입니다.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button style={{ minWidth: '80px' }}>닫기</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Large: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>큰 모달</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>큰 모달</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          <h3 className="font-semibold mb-2">큰 크기의 모달입니다</h3>
          <p className="text-sm text-gray-600 mb-4">
            많은 내용을 표시할 수 있습니다. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p className="text-sm text-gray-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline" style={{ minWidth: '80px' }}>
              취소
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="primary" style={{ minWidth: '80px' }}>
              확인
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>아주 큰 모달</Button>
      </ModalTrigger>
      <ModalContent size="xl">
        <ModalHeader>
          <ModalTitle>아주 큰 모달</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          <p>XL 크기의 모달입니다. 많은 양의 컨텐츠를 표시할 수 있습니다.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button style={{ minWidth: '80px' }}>닫기</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>긴 내용 모달</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>스크롤 가능한 모달</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-2">
              {i + 1}. 스크롤이 가능한 긴 내용입니다. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          ))}
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button style={{ minWidth: '80px' }}>닫기</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const ConfirmDialog: Story = {
  render: () => {
    const handleConfirm = () => {
      alert('삭제되었습니다');
    };

    return (
      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">삭제</Button>
        </ModalTrigger>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>삭제 확인</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <p>정말 삭제하시겠습니까?</p>
            <p className="text-sm text-gray-600 mt-2">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline" style={{ minWidth: '80px' }}>
                취소
              </Button>
            </ModalClose>
            <ModalClose asChild>
              <Button
                variant="primary"
                style={{ minWidth: '80px' }}
                onClick={handleConfirm}
              >
                삭제
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-x-2">
        <Button onClick={() => setOpen(true)}>외부 버튼으로 열기</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Controlled Modal</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              <p>외부 상태로 제어되는 모달입니다.</p>
              <p className="text-sm text-gray-600 mt-2">
                open과 onOpenChange props를 사용하여 제어합니다.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                style={{ minWidth: '80px' }}
                onClick={() => setOpen(false)}
              >
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>닫기 버튼 없는 모달</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>알림</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>헤더에 닫기 버튼이 없습니다.</p>
          <p className="text-sm text-gray-600 mt-2">
            ESC 키나 하단 버튼으로 닫을 수 있습니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="primary" style={{ minWidth: '80px' }}>
              확인
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`제출됨: ${JSON.stringify(formData)}`);
    };

    return (
      <Modal>
        <ModalTrigger asChild>
          <Button>폼 모달</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>사용자 정보 입력</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">이름</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button
                  variant="outline"
                  style={{ minWidth: '80px' }}
                  type="button"
                >
                  취소
                </Button>
              </ModalClose>
              <Button
                variant="primary"
                style={{ minWidth: '80px' }}
                type="submit"
              >
                저장
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  },
};
