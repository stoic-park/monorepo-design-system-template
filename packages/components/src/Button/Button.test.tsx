import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('렌더링', () => {
    it('기본 Button이 렌더링되어야 함', () => {
      render(<Button>클릭</Button>);
      expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
    });

    it('children이 렌더링되어야 함', () => {
      render(<Button>버튼 텍스트</Button>);
      expect(screen.getByText('버튼 텍스트')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('primary variant가 적용되어야 함', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-slate-900');
    });

    it('secondary variant가 적용되어야 함', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-slate-100');
    });

    it('outline variant가 적용되어야 함', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2');
    });

    it('ghost variant가 적용되어야 함', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });

    it('sidebar variant가 적용되어야 함', () => {
      render(<Button variant="sidebar">Sidebar</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });

    it('sidebar variant에서 active가 적용되어야 함', () => {
      render(
        <Button variant="sidebar" active>
          Active
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-slate-900');
    });
  });

  describe('크기', () => {
    it('small 크기가 적용되어야 함', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('medium 크기가 적용되어야 함', () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('large 크기가 적용되어야 함', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('정렬', () => {
    it('left 정렬이 적용되어야 함', () => {
      render(<Button align="left">Left</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('justify-start', 'text-left');
    });

    it('center 정렬이 적용되어야 함', () => {
      render(<Button align="center">Center</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('justify-center', 'text-center');
    });

    it('right 정렬이 적용되어야 함', () => {
      render(<Button align="right">Right</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('justify-end', 'text-right');
    });
  });

  describe('전체 너비', () => {
    it('fullWidth가 true일 때 w-full 클래스가 적용되어야 함', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('fullWidth가 false일 때 w-full 클래스가 없어야 함', () => {
      render(<Button fullWidth={false}>Normal</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('비활성화', () => {
    it('disabled 속성이 적용되어야 함', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('disabled 상태에서 클릭 이벤트가 발생하지 않아야 함', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('이벤트', () => {
    it('클릭 이벤트가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Click Me</Button>);

      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('접근성', () => {
    it('button role을 가져야 함', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('키보드 포커스가 가능해야 함', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('ref 전달', () => {
    it('ref가 button 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
