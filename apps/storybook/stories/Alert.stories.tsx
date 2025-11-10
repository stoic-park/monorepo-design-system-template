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
    children: '기본 알림 메시지입니다',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: '성공',
    children: '작업이 성공적으로 완료되었습니다',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: '오류',
    children: '작업을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '경고',
    children: '이 작업은 되돌릴 수 없습니다. 신중하게 선택해주세요.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: '안내',
    children: '새로운 기능이 추가되었습니다. 확인해보세요.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    children: '제목 없는 알림 메시지입니다',
  },
};

export const Closable: Story = {
  args: {
    variant: 'info',
    title: '닫을 수 있는 알림',
    children: '오른쪽 X 버튼을 클릭하여 닫을 수 있습니다.',
    closable: true,
    onClose: () => alert('Alert closed'),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: '긴 내용의 알림',
    children: `
      이것은 긴 내용의 알림 메시지입니다. 
      여러 줄에 걸쳐서 표시할 수 있으며
      사용자에게 중요한 정보를 전달하는 데 사용됩니다.
      모든 내용이 깔끔하게 정렬되어 표시됩니다.
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
        기본 알림 메시지입니다
      </Alert>
      <Alert variant="success" title="Success">
        작업이 성공적으로 완료되었습니다
      </Alert>
      <Alert variant="error" title="Error">
        오류가 발생했습니다.
      </Alert>
      <Alert variant="warning" title="Warning">
        경고 메시지입니다
      </Alert>
      <Alert variant="info" title="Info">
        정보 메시지입니다
      </Alert>
    </div>
  ),
};
