import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  describe('렌더링', () => {
    it('기본 horizontal Divider가 렌더링되어야 함', () => {
      const { container } = render(<Divider />);
      const hr = container.querySelector('hr');
      expect(hr).toBeInTheDocument();
    });

    it('label이 있을 때 label이 렌더링되어야 함', () => {
      render(<Divider label="또는" />);
      expect(screen.getByText('또는')).toBeInTheDocument();
    });
  });

  describe('방향', () => {
    it('horizontal 방향이 기본값이어야 함', () => {
      const { container } = render(<Divider />);
      const hr = container.querySelector('hr');
      expect(hr).toBeInTheDocument();
    });

    it('vertical 방향이 적용되어야 함', () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass('w-px', 'h-full');
    });
  });

  describe('라벨 위치', () => {
    it('center 정렬이 기본값이어야 함', () => {
      const { container } = render(<Divider label="가운데" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('justify-center');
    });

    it('left 정렬이 적용되어야 함', () => {
      const { container } = render(
        <Divider label="왼쪽" labelPosition="left" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('justify-start');
    });

    it('right 정렬이 적용되어야 함', () => {
      const { container } = render(
        <Divider label="오른쪽" labelPosition="right" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('justify-end');
    });
  });

  describe('스타일', () => {
    it('horizontal divider에 border-t 클래스가 있어야 함', () => {
      const { container } = render(<Divider />);
      const hr = container.querySelector('hr');
      expect(hr).toHaveClass('border-t', 'border-gray-200');
    });

    it('vertical divider에 bg-gray-200 클래스가 있어야 함', () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass('bg-gray-200');
    });
  });

  describe('커스텀 className', () => {
    it('horizontal divider에 추가 className이 적용되어야 함', () => {
      const { container } = render(<Divider className="custom-divider" />);
      const hr = container.querySelector('hr');
      expect(hr).toHaveClass('custom-divider');
    });

    it('vertical divider에 추가 className이 적용되어야 함', () => {
      const { container } = render(
        <Divider orientation="vertical" className="custom-vertical" />
      );
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass('custom-vertical');
    });
  });
});
