import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  describe('렌더링', () => {
    it('기본 Typography가 렌더링되어야 함', () => {
      render(<Typography>텍스트</Typography>);
      expect(screen.getByText('텍스트')).toBeInTheDocument();
    });

    it('children이 렌더링되어야 함', () => {
      render(<Typography>Hello World</Typography>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('h1 variant가 적용되어야 함', () => {
      render(<Typography variant="h1">Heading 1</Typography>);
      const element = screen.getByText('Heading 1');
      expect(element.tagName).toBe('H1');
      expect(element).toHaveClass('text-5xl', 'font-bold');
    });

    it('h2 variant가 적용되어야 함', () => {
      render(<Typography variant="h2">Heading 2</Typography>);
      const element = screen.getByText('Heading 2');
      expect(element.tagName).toBe('H2');
      expect(element).toHaveClass('text-4xl', 'font-bold');
    });

    it('h3 variant가 적용되어야 함', () => {
      render(<Typography variant="h3">Heading 3</Typography>);
      const element = screen.getByText('Heading 3');
      expect(element.tagName).toBe('H3');
      expect(element).toHaveClass('text-3xl', 'font-semibold');
    });

    it('body1 variant가 적용되어야 함', () => {
      render(<Typography variant="body1">Body 1</Typography>);
      const element = screen.getByText('Body 1');
      expect(element.tagName).toBe('P');
      expect(element).toHaveClass('text-base');
    });

    it('body2 variant가 적용되어야 함', () => {
      render(<Typography variant="body2">Body 2</Typography>);
      const element = screen.getByText('Body 2');
      expect(element).toHaveClass('text-sm');
    });

    it('caption variant가 적용되어야 함', () => {
      render(<Typography variant="caption">Caption</Typography>);
      const element = screen.getByText('Caption');
      expect(element).toHaveClass('text-xs');
    });
  });

  describe('HTML 요소 커스터마이징', () => {
    it('as prop으로 HTML 요소를 변경할 수 있어야 함', () => {
      render(
        <Typography as="span" variant="h1">
          Span
        </Typography>
      );
      const element = screen.getByText('Span');
      expect(element.tagName).toBe('SPAN');
    });

    it('h1 variant는 기본적으로 h1 태그여야 함', () => {
      render(<Typography variant="h1">H1</Typography>);
      expect(screen.getByText('H1').tagName).toBe('H1');
    });

    it('body variant는 기본적으로 p 태그여야 함', () => {
      render(<Typography variant="body1">Body</Typography>);
      expect(screen.getByText('Body').tagName).toBe('P');
    });
  });

  describe('색상', () => {
    it('primary 색상이 적용되어야 함', () => {
      render(<Typography color="primary">Primary</Typography>);
      expect(screen.getByText('Primary')).toHaveClass('text-black');
    });

    it('secondary 색상이 적용되어야 함', () => {
      render(<Typography color="secondary">Secondary</Typography>);
      expect(screen.getByText('Secondary')).toHaveClass('text-gray-600');
    });

    it('disabled 색상이 적용되어야 함', () => {
      render(<Typography color="disabled">Disabled</Typography>);
      expect(screen.getByText('Disabled')).toHaveClass('text-gray-400');
    });
  });

  describe('폰트 굵기', () => {
    it('light weight가 적용되어야 함', () => {
      render(<Typography weight="light">Light</Typography>);
      expect(screen.getByText('Light')).toHaveClass('font-light');
    });

    it('normal weight가 적용되어야 함', () => {
      render(<Typography weight="normal">Normal</Typography>);
      expect(screen.getByText('Normal')).toHaveClass('font-normal');
    });

    it('medium weight가 적용되어야 함', () => {
      render(<Typography weight="medium">Medium</Typography>);
      expect(screen.getByText('Medium')).toHaveClass('font-medium');
    });

    it('semibold weight가 적용되어야 함', () => {
      render(<Typography weight="semibold">Semibold</Typography>);
      expect(screen.getByText('Semibold')).toHaveClass('font-semibold');
    });

    it('bold weight가 적용되어야 함', () => {
      render(<Typography weight="bold">Bold</Typography>);
      expect(screen.getByText('Bold')).toHaveClass('font-bold');
    });
  });

  describe('정렬', () => {
    it('left 정렬이 적용되어야 함', () => {
      render(<Typography align="left">Left</Typography>);
      expect(screen.getByText('Left')).toHaveClass('text-left');
    });

    it('center 정렬이 적용되어야 함', () => {
      render(<Typography align="center">Center</Typography>);
      expect(screen.getByText('Center')).toHaveClass('text-center');
    });

    it('right 정렬이 적용되어야 함', () => {
      render(<Typography align="right">Right</Typography>);
      expect(screen.getByText('Right')).toHaveClass('text-right');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      render(<Typography className="custom-typo">Text</Typography>);
      expect(screen.getByText('Text')).toHaveClass('custom-typo');
    });
  });
});
