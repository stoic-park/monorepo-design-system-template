import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('렌더링', () => {
    it('기본 Spinner가 렌더링되어야 함', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('sr-only 텍스트가 있어야 함', () => {
      render(<Spinner />);
      expect(screen.getByText('로딩 중...')).toBeInTheDocument();
    });
  });

  describe('크기', () => {
    it('small 크기가 적용되어야 함', () => {
      render(<Spinner size="sm" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-4', 'h-4', 'border-2');
    });

    it('medium 크기가 적용되어야 함', () => {
      render(<Spinner size="md" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-8', 'h-8', 'border-2');
    });

    it('large 크기가 적용되어야 함', () => {
      render(<Spinner size="lg" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-12', 'h-12');
    });

    it('xl 크기가 적용되어야 함', () => {
      render(<Spinner size="xl" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-16', 'h-16', 'border-4');
    });
  });

  describe('Variants', () => {
    it('default variant가 적용되어야 함', () => {
      render(<Spinner variant="default" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('border-gray-300', 'border-t-gray-900');
    });

    it('primary variant가 적용되어야 함', () => {
      render(<Spinner variant="primary" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('border-gray-300', 'border-t-black');
    });

    it('white variant가 적용되어야 함', () => {
      render(<Spinner variant="white" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('border-t-white');
    });
  });

  describe('애니메이션', () => {
    it('animate-spin 클래스가 적용되어야 함', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('animate-spin');
    });

    it('rounded-full 클래스가 적용되어야 함', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('rounded-full');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      render(<Spinner className="custom-spinner" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-spinner');
    });
  });

  describe('접근성', () => {
    it('role="status"가 있어야 함', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('aria-label이 있어야 함', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', '로딩 중');
    });

    it('스크린 리더용 텍스트가 있어야 함', () => {
      const { container } = render(<Spinner />);
      const srOnly = container.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent('로딩 중...');
    });
  });
});
