import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@design-system/components';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="부서를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">개발자</SelectItem>
        <SelectItem value="design">디자이너</SelectItem>
        <SelectItem value="marketing">마케터</SelectItem>
        <SelectItem value="sales">영업자</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="과일을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>과일</SelectLabel>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="orange">오렌지</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>채소</SelectLabel>
          <SelectItem value="carrot">당근</SelectItem>
          <SelectItem value="potato">감자</SelectItem>
          <SelectItem value="tomato">토마토</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="design">
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="부서를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">개발자</SelectItem>
        <SelectItem value="design">디자이너</SelectItem>
        <SelectItem value="marketing">마케터</SelectItem>
        <SelectItem value="sales">영업자</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="부서를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">개발자</SelectItem>
        <SelectItem value="design">디자이너</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="부서를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">개발자</SelectItem>
        <SelectItem value="design" disabled>
          디자이너 (선택 불가)
        </SelectItem>
        <SelectItem value="marketing">마케터</SelectItem>
        <SelectItem value="sales">영업자</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-[200px]">
        <SelectValue placeholder="작은 셀렉트" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">옵션 1</SelectItem>
        <SelectItem value="2">옵션 2</SelectItem>
        <SelectItem value="3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Large: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="lg" className="w-[320px]">
        <SelectValue placeholder="큰 셀렉트" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">옵션 1</SelectItem>
        <SelectItem value="2">옵션 2</SelectItem>
        <SelectItem value="3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="space-y-2">
      <Select>
        <SelectTrigger error className="w-[280px]">
          <SelectValue placeholder="부서를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dev">개발자</SelectItem>
          <SelectItem value="design">디자이너</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-red-500">부서를 선택해주세요.</p>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="전체 너비 셀렉트" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">옵션 1</SelectItem>
          <SelectItem value="2">옵션 2</SelectItem>
          <SelectItem value="3">옵션 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">부서</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="부서를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dev">개발팀</SelectItem>
            <SelectItem value="design">디자인팀</SelectItem>
            <SelectItem value="marketing">마케팅팀</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">직급</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="직급을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="junior">주니어</SelectItem>
            <SelectItem value="senior">시니어</SelectItem>
            <SelectItem value="lead">리드</SelectItem>
            <SelectItem value="manager">매니저</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">국가</label>
        <Select>
          <SelectTrigger error className="w-full">
            <SelectValue placeholder="국가를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>아시아</SelectLabel>
              <SelectItem value="kr">대한민국</SelectItem>
              <SelectItem value="jp">일본</SelectItem>
              <SelectItem value="cn">중국</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>유럽</SelectLabel>
              <SelectItem value="uk">영국</SelectItem>
              <SelectItem value="fr">프랑스</SelectItem>
              <SelectItem value="de">독일</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>아메리카</SelectLabel>
              <SelectItem value="us">미국</SelectItem>
              <SelectItem value="ca">캐나다</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-red-500">국가를 선택해주세요.</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
