import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('렌더링', () => {
    it('기본 Badge가 렌더링되어야 함', () => {
      render(<Badge>배지</Badge>);
      expect(screen.getByText('배지')).toBeInTheDocument();
    });

    it('children이 렌더링되어야 함', () => {
      render(<Badge>Success</Badge>);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('default variant가 적용되어야 함', () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('success variant가 적용되어야 함', () => {
      const { container } = render(<Badge variant="success">성공</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-green-50', 'text-green-800');
    });

    it('error variant가 적용되어야 함', () => {
      const { container } = render(<Badge variant="error">에러</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-red-50', 'text-red-800');
    });

    it('warning variant가 적용되어야 함', () => {
      const { container } = render(<Badge variant="warning">경고</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-amber-50', 'text-amber-800');
    });

    it('info variant가 적용되어야 함', () => {
      const { container } = render(<Badge variant="info">정보</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-blue-50', 'text-blue-800');
    });
  });

  describe('크기', () => {
    it('small 크기가 적용되어야 함', () => {
      const { container } = render(<Badge size="sm">Small</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('medium 크기가 적용되어야 함', () => {
      const { container } = render(<Badge size="md">Medium</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });

    it('large 크기가 적용되어야 함', () => {
      const { container } = render(<Badge size="lg">Large</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      const { container } = render(
        <Badge className="custom-badge">Badge</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-badge');
    });
  });

  describe('스타일', () => {
    it('rounded-full 클래스가 적용되어야 함', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded-full');
    });

    it('inline-flex 클래스가 적용되어야 함', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('inline-flex');
    });
  });
});
