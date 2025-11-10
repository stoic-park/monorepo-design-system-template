import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('렌더링', () => {
    it('기본 Checkbox가 렌더링되어야 함', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('label이 있을 때 label이 렌더링되어야 함', () => {
      render(<Checkbox label="동의합니다" />);
      expect(screen.getByText('동의합니다')).toBeInTheDocument();
    });

    it('description이 있을 때 description이 렌더링되어야 함', () => {
      render(<Checkbox label="약관" description="자세한 설명" />);
      expect(screen.getByText('자세한 설명')).toBeInTheDocument();
    });

    it('label 없이 checkbox만 렌더링되어야 함', () => {
      const { container } = render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.parentElement?.tagName).toBe('DIV');
    });
  });

  describe('체크 상태', () => {
    it('기본적으로 체크되지 않아야 함', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('defaultChecked가 true일 때 체크되어야 함', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('클릭 시 체크 상태가 변경되어야 함', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="동의" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('에러 상태', () => {
    it('error가 true일 때 에러 스타일이 적용되어야 함', () => {
      render(<Checkbox label="동의" error />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('border-red-500');
    });

    it('에러 메시지가 표시되어야 함', () => {
      render(<Checkbox label="동의" error errorMessage="필수 항목입니다" />);
      expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
    });

    it('error가 false일 때 에러 메시지가 표시되지 않아야 함', () => {
      render(<Checkbox error={false} errorMessage="에러" />);
      expect(screen.queryByText('에러')).not.toBeInTheDocument();
    });
  });

  describe('비활성화', () => {
    it('disabled 속성이 적용되어야 함', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('disabled 상태에서 체크가 변경되지 않아야 함', async () => {
      const user = userEvent.setup();
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('이벤트', () => {
    it('onChange 이벤트가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Checkbox onChange={onChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('checkbox role을 가져야 함', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('label 클릭 시 checkbox가 체크되어야 함', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="동의합니다" />);

      const label = screen.getByText('동의합니다');
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await user.click(label);
      expect(checkbox).toBeChecked();
    });
  });

  describe('ref 전달', () => {
    it('ref가 input 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });
  });
});
