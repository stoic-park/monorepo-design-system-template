import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@design-system/components';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Checkbox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Checkbox label="동의합니다" />,
};

export const WithDescription: Story = {
  render: () => (
    <Checkbox
      label="이용약관에 동의합니다"
      description="서비스 이용약관 및 개인정보 처리방침에 동의합니다"
    />
  ),
};

export const Checked: Story = {
  render: () => <Checkbox label="선택됨" defaultChecked />,
};

export const Disabled: Story = {
  render: () => <Checkbox label="비활성화됨" disabled />,
};

export const DisabledChecked: Story = {
  render: () => <Checkbox label="비활성화 + 선택됨" disabled defaultChecked />,
};

export const Error: Story = {
  render: () => (
    <Checkbox
      label="필수 동의 항목"
      error
      errorMessage="필수 항목입니다"
    />
  ),
};

export const WithoutLabel: Story = {
  render: () => <Checkbox />,
};

export const Indeterminate: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox checked="indeterminate" label="부분 선택됨" />
      <Checkbox
        checked="indeterminate"
        label="일부 옵션 선택"
        description="전체 선택되지 않은 상태입니다"
      />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <h3 className="font-semibold text-sm mb-2">옵션 선택</h3>
      <Checkbox label="옵션 1" defaultChecked />
      <Checkbox label="옵션 2" />
      <Checkbox label="옵션 3" />
      <Checkbox label="옵션 4 (비활성화)" disabled />
    </div>
  ),
};

export const SelectAll: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState([false, false, false]);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate =
      checkedItems.some(Boolean) && !allChecked ? 'indeterminate' : allChecked;

    return (
      <div className="flex flex-col gap-3 p-4 border rounded-lg max-w-md">
        <Checkbox
          label="전체 선택"
          checked={isIndeterminate}
          onCheckedChange={(checked) => {
            setCheckedItems([
              checked === true,
              checked === true,
              checked === true,
            ]);
          }}
        />
        <div className="h-px bg-gray-200 my-1" />
        <div className="pl-6 flex flex-col gap-3">
          <Checkbox
            label="옵션 1"
            checked={checkedItems[0]}
            onCheckedChange={(checked) => {
              setCheckedItems([checked === true, checkedItems[1], checkedItems[2]]);
            }}
          />
          <Checkbox
            label="옵션 2"
            checked={checkedItems[1]}
            onCheckedChange={(checked) => {
              setCheckedItems([checkedItems[0], checked === true, checkedItems[2]]);
            }}
          />
          <Checkbox
            label="옵션 3"
            checked={checkedItems[2]}
            onCheckedChange={(checked) => {
              setCheckedItems([checkedItems[0], checkedItems[1], checked === true]);
            }}
          />
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      terms: false,
      privacy: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`제출: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="p-6 border rounded-lg max-w-md space-y-4">
        <h3 className="font-semibold text-lg mb-4">회원가입</h3>

        <Checkbox
          label="뉴스레터 수신 동의 (선택)"
          description="최신 소식과 이벤트 정보를 받아보실 수 있습니다"
          checked={formData.newsletter}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, newsletter: checked === true })
          }
        />

        <Checkbox
          label="이용약관 동의 (필수)"
          checked={formData.terms}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, terms: checked === true })
          }
          error={!formData.terms}
          errorMessage={!formData.terms ? '필수 항목입니다' : undefined}
        />

        <Checkbox
          label="개인정보 처리방침 동의 (필수)"
          checked={formData.privacy}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, privacy: checked === true })
          }
          error={!formData.privacy}
          errorMessage={!formData.privacy ? '필수 항목입니다' : undefined}
        />

        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formData.terms || !formData.privacy}
        >
          가입하기
        </button>
      </form>
    );
  },
};
