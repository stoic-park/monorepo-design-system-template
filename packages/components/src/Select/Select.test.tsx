import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './Select';

describe('Select', () => {
  const renderSelect = (props = {}) => {
    return render(
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="과일을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="orange">오렌지</SelectItem>
        </SelectContent>
      </Select>
    );
  };

  it('렌더링이 정상적으로 되어야 함', () => {
    renderSelect();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('placeholder가 표시되어야 함', () => {
    renderSelect();
    expect(screen.getByText('과일을 선택하세요')).toBeInTheDocument();
  });

  it('클릭 시 옵션 목록이 열려야 함', async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(screen.getByRole('option', { name: '사과' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '바나나' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '오렌지' })).toBeInTheDocument();
  });

  it('옵션 선택 시 값이 변경되어야 함', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="과일을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const appleOption = screen.getByRole('option', { name: '사과' });
    await user.click(appleOption);

    expect(handleChange).toHaveBeenCalledWith('apple');
  });

  it('disabled 상태가 적용되어야 함', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="과일을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('size prop이 적용되어야 함', () => {
    render(
      <Select>
        <SelectTrigger size="sm" data-testid="small-trigger">
          <SelectValue placeholder="작은 셀렉트" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">테스트</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('small-trigger');
    expect(trigger).toHaveClass('h-9');
  });

  it('error 상태가 적용되어야 함', () => {
    render(
      <Select>
        <SelectTrigger error data-testid="error-trigger">
          <SelectValue placeholder="에러 상태" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">테스트</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('error-trigger');
    expect(trigger).toHaveClass('border-red-500');
  });

  it('SelectGroup과 SelectLabel이 함께 작동해야 함', async () => {
    const user = userEvent.setup();

    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="음식 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>과일</SelectLabel>
            <SelectItem value="apple">사과</SelectItem>
            <SelectItem value="banana">바나나</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>채소</SelectLabel>
            <SelectItem value="carrot">당근</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(screen.getByText('과일')).toBeInTheDocument();
    expect(screen.getByText('채소')).toBeInTheDocument();
  });

  it('disabled된 옵션은 선택할 수 없어야 함', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="enabled">활성화됨</SelectItem>
          <SelectItem value="disabled" disabled>
            비활성화됨
          </SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const disabledOption = screen.getByRole('option', { name: '비활성화됨' });
    expect(disabledOption).toHaveAttribute('data-disabled');
  });

  it('defaultValue가 설정되어야 함', () => {
    render(
      <Select defaultValue="banana">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText('바나나')).toBeInTheDocument();
  });

  it('커스텀 className이 적용되어야 함', () => {
    render(
      <Select>
        <SelectTrigger className="custom-class" data-testid="custom-trigger">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">테스트</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toHaveClass('custom-class');
  });
});
