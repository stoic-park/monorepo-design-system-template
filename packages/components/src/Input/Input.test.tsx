import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('렌더링', () => {
    it('기본 Input이 렌더링되어야 함', () => {
      render(<Input placeholder="입력하세요" />);
      expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
    });

    it('label이 있을 때 label이 렌더링되어야 함', () => {
      render(<Input label="이름" />);
      expect(screen.getByText('이름')).toBeInTheDocument();
    });

    it('label이 없을 때 input만 렌더링되어야 함', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('크기', () => {
    it('small 크기가 적용되어야 함', () => {
      render(<Input size="sm" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('medium 크기가 적용되어야 함', () => {
      render(<Input size="md" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('large 크기가 적용되어야 함', () => {
      render(<Input size="lg" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-5', 'py-3', 'text-lg');
    });
  });

  describe('에러 상태', () => {
    it('error가 true일 때 에러 스타일이 적용되어야 함', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500', 'bg-red-50');
    });

    it('에러 메시지가 표시되어야 함', () => {
      render(<Input error errorMessage="필수 항목입니다" />);
      expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
    });

    it('error가 false일 때 에러 메시지가 표시되지 않아야 함', () => {
      render(<Input error={false} errorMessage="에러 메시지" />);
      expect(screen.queryByText('에러 메시지')).not.toBeInTheDocument();
    });
  });

  describe('전체 너비', () => {
    it('fullWidth가 true일 때 w-full 클래스가 적용되어야 함', () => {
      render(<Input fullWidth />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('w-full');
    });
  });

  describe('비활성화', () => {
    it('disabled 속성이 적용되어야 함', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('disabled 상태에서 입력이 불가능해야 함', async () => {
      const user = userEvent.setup();
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(input).toHaveValue('');
    });
  });

  describe('입력 동작', () => {
    it('텍스트 입력이 가능해야 함', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');
      expect(input).toHaveValue('Hello');
    });

    it('onChange 이벤트가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Input onChange={onChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'A');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('타입', () => {
    it('type="password"일 때 password input이 렌더링되어야 함', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });

    it('type="email"일 때 email input이 렌더링되어야 함', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      render(<Input className="custom-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input');
    });
  });

  describe('ref 전달', () => {
    it('ref가 input 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
