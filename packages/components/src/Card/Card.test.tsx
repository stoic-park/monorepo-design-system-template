import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  describe('렌더링', () => {
    it('기본 Card가 렌더링되어야 함', () => {
      render(<Card>카드 내용</Card>);
      expect(screen.getByText('카드 내용')).toBeInTheDocument();
    });

    it('children이 렌더링되어야 함', () => {
      render(
        <Card>
          <h3>제목</h3>
          <p>내용</p>
        </Card>
      );
      expect(screen.getByText('제목')).toBeInTheDocument();
      expect(screen.getByText('내용')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('default variant가 적용되어야 함', () => {
      const { container } = render(<Card variant="default">Default</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white', 'border', 'border-slate-200');
    });

    it('bordered variant가 적용되어야 함', () => {
      const { container } = render(<Card variant="bordered">Bordered</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white', 'border', 'border-slate-200');
    });

    it('elevated variant가 적용되어야 함', () => {
      const { container } = render(<Card variant="elevated">Elevated</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-sm');
    });
  });

  describe('패딩', () => {
    it('none 패딩이 적용되어야 함', () => {
      const { container } = render(<Card padding="none">No Padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('p-3', 'p-4', 'p-6');
    });

    it('small 패딩이 적용되어야 함', () => {
      const { container } = render(<Card padding="sm">Small</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-3');
    });

    it('medium 패딩이 적용되어야 함', () => {
      const { container } = render(<Card padding="md">Medium</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-4');
    });

    it('large 패딩이 적용되어야 함', () => {
      const { container } = render(<Card padding="lg">Large</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });
  });

  describe('스타일', () => {
    it('rounded-lg 클래스가 적용되어야 함', () => {
      const { container } = render(<Card>Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-lg');
    });

    it('transition-shadow 클래스가 적용되어야 함', () => {
      const { container } = render(<Card>Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('transition-shadow');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      const { container } = render(<Card className="custom-card">Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card');
    });
  });

  describe('ref 전달', () => {
    it('ref가 div 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Card ref={ref}>Card</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
