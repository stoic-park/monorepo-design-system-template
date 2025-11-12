import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('렌더링이 정상적으로 되어야 함', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('label이 표시되어야 함', () => {
    render(<Checkbox label="동의합니다" />);
    expect(screen.getByText('동의합니다')).toBeInTheDocument();
  });

  it('description이 표시되어야 함', () => {
    render(<Checkbox label="약관 동의" description="이용약관에 동의합니다" />);
    expect(screen.getByText('이용약관에 동의합니다')).toBeInTheDocument();
  });

  it('클릭 시 체크/체크 해제가 되어야 함', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox label="동의" onCheckedChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('checked prop으로 상태를 제어할 수 있어야 함', () => {
    const { rerender } = render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked={true} />);
    expect(checkbox).toBeChecked();
  });

  it('defaultChecked prop으로 초기 상태를 설정할 수 있어야 함', () => {
    render(<Checkbox defaultChecked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('disabled 상태가 적용되어야 함', () => {
    render(<Checkbox label="동의" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('disabled 상태에서 클릭이 불가능해야 함', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox label="동의" disabled onCheckedChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('error 상태가 표시되어야 함', () => {
    render(<Checkbox label="약관 동의" error errorMessage="필수 항목입니다" />);
    expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
  });

  it('label 클릭으로 체크박스를 토글할 수 있어야 함', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Checkbox label="동의합니다" onCheckedChange={handleChange} />);

    const label = screen.getByText('동의합니다');
    await user.click(label);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('indeterminate 상태를 지원해야 함', () => {
    render(<Checkbox checked="indeterminate" label="부분 선택" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
  });

  it('required prop이 적용되어야 함', () => {
    render(<Checkbox required />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('커스텀 className이 적용되어야 함', () => {
    render(<Checkbox className="custom-class" data-testid="custom-checkbox" />);
    const checkbox = screen.getByTestId('custom-checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('name prop이 적용되어야 함', () => {
    render(<Checkbox name="agreement" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'agreement');
  });

  it('value prop이 적용되어야 함', () => {
    render(<Checkbox value="terms" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('value', 'terms');
  });

  it('여러 체크박스가 독립적으로 작동해야 함', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Checkbox label="옵션 1" data-testid="checkbox-1" />
        <Checkbox label="옵션 2" data-testid="checkbox-2" />
        <Checkbox label="옵션 3" data-testid="checkbox-3" />
      </div>
    );

    const checkbox1 = screen.getByTestId('checkbox-1');
    const checkbox2 = screen.getByTestId('checkbox-2');

    await user.click(checkbox1);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
  });

  it('form 제출 시 값이 전달되어야 함', () => {
    const handleSubmit = vi.fn((e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      return formData.get('agree');
    });

    render(
      <form onSubmit={handleSubmit}>
        <Checkbox name="agree" value="yes" defaultChecked />
        <button type="submit">제출</button>
      </form>
    );

    const submitButton = screen.getByText('제출');
    submitButton.click();

    expect(handleSubmit).toHaveBeenCalled();
  });
});
