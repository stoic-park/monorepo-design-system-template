import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '@design-system/components';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Radio',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <RadioGroupItem value="1" label="옵션 1" />
      <RadioGroupItem value="2" label="옵션 2" />
      <RadioGroupItem value="3" label="옵션 3" />
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="basic">
      <RadioGroupItem
        value="basic"
        label="베이직 플랜"
        description="개인 사용자를 위한 기본 플랜"
      />
      <RadioGroupItem
        value="pro"
        label="프로 플랜"
        description="전문가를 위한 고급 기능 제공"
      />
      <RadioGroupItem
        value="enterprise"
        label="엔터프라이즈 플랜"
        description="팀과 조직을 위한 맞춤형 솔루션"
      />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <RadioGroupItem value="1" label="활성화됨" />
      <RadioGroupItem value="2" label="비활성화됨" disabled />
      <RadioGroupItem value="3" label="활성화됨" />
    </RadioGroup>
  ),
};

export const DisabledSelected: Story = {
  render: () => (
    <RadioGroup defaultValue="2">
      <RadioGroupItem value="1" label="옵션 1" />
      <RadioGroupItem value="2" label="선택 + 비활성화" disabled />
      <RadioGroupItem value="3" label="옵션 3" />
    </RadioGroup>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="space-y-2">
      <RadioGroup>
        <RadioGroupItem value="1" label="옵션 1" error />
        <RadioGroupItem value="2" label="옵션 2" error />
      </RadioGroup>
      <p className="text-xs text-red-500">하나를 선택해주세요</p>
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <RadioGroup defaultValue="1" className="flex gap-4">
      <RadioGroupItem value="1" />
      <RadioGroupItem value="2" />
      <RadioGroupItem value="3" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="Y" className="flex gap-6">
      <RadioGroupItem value="Y" label="예" />
      <RadioGroupItem value="N" label="아니오" />
    </RadioGroup>
  ),
};

export const SizeOptions: Story = {
  render: () => (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold text-sm mb-3">사이즈 선택</h3>
      <RadioGroup defaultValue="M">
        <RadioGroupItem value="XS" label="XS" description="매우 작음" />
        <RadioGroupItem value="S" label="S" description="작음" />
        <RadioGroupItem value="M" label="M" description="보통 (가장 인기)" />
        <RadioGroupItem value="L" label="L" description="큼" />
        <RadioGroupItem value="XL" label="XL" description="매우 큼" />
      </RadioGroup>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`선택된 결제 방법: ${paymentMethod}`);
    };

    return (
      <form onSubmit={handleSubmit} className="p-6 border rounded-lg max-w-md space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">결제 방법 선택</h3>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <RadioGroupItem
              value="card"
              label="신용카드"
              description="Visa, MasterCard, AMEX 사용 가능"
            />
            <RadioGroupItem
              value="bank"
              label="무통장 입금"
              description="입금 확인 후 주문이 처리됩니다"
            />
            <RadioGroupItem
              value="phone"
              label="휴대폰 결제"
              description="통신사를 통한 간편 결제"
            />
            <RadioGroupItem
              value="kakao"
              label="카카오페이"
              description="카카오톡으로 간편하게 결제"
            />
          </RadioGroup>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          다음 단계
        </button>
      </form>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div className="p-4 space-y-4">
        <div className="text-sm">
          <strong>선택된 값:</strong> {value}
        </div>

        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="option1" label="옵션 1" />
          <RadioGroupItem value="option2" label="옵션 2" />
          <RadioGroupItem value="option3" label="옵션 3" />
        </RadioGroup>

        <div className="flex gap-2">
          <button
            onClick={() => setValue('option1')}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            옵션 1 선택
          </button>
          <button
            onClick={() => setValue('option2')}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            옵션 2 선택
          </button>
        </div>
      </div>
    );
  },
};
