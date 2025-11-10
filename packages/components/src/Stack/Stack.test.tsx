import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  describe('렌더링', () => {
    it('기본 Stack이 렌더링되어야 함', () => {
      render(
        <Stack>
          <div>항목 1</div>
          <div>항목 2</div>
        </Stack>
      );
      expect(screen.getByText('항목 1')).toBeInTheDocument();
      expect(screen.getByText('항목 2')).toBeInTheDocument();
    });
  });

  describe('방향', () => {
    it('vertical 방향이 기본값이어야 함', () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex', 'flex-col');
    });

    it('horizontal 방향이 적용되어야 함', () => {
      const { container } = render(
        <Stack direction="horizontal">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex', 'flex-row');
    });
  });

  describe('간격', () => {
    it('xs 간격이 적용되어야 함 (vertical)', () => {
      const { container } = render(
        <Stack spacing="xs">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('space-y-2');
    });

    it('sm 간격이 적용되어야 함 (vertical)', () => {
      const { container } = render(
        <Stack spacing="sm">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('space-y-3');
    });

    it('md 간격이 기본값이어야 함 (vertical)', () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('space-y-4');
    });

    it('lg 간격이 적용되어야 함 (vertical)', () => {
      const { container } = render(
        <Stack spacing="lg">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('space-y-6');
    });

    it('xl 간격이 적용되어야 함 (vertical)', () => {
      const { container } = render(
        <Stack spacing="xl">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('space-y-8');
    });

    it('horizontal 방향에서 gap 클래스가 사용되어야 함', () => {
      const { container } = render(
        <Stack direction="horizontal" spacing="md">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('gap-4');
    });
  });

  describe('정렬', () => {
    it('stretch 정렬이 기본값이어야 함', () => {
      const { container } = render(
        <Stack>
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('items-stretch');
    });

    it('start 정렬이 적용되어야 함', () => {
      const { container } = render(
        <Stack align="start">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('items-start');
    });

    it('center 정렬이 적용되어야 함', () => {
      const { container } = render(
        <Stack align="center">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('items-center');
    });

    it('end 정렬이 적용되어야 함', () => {
      const { container } = render(
        <Stack align="end">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('items-end');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      const { container } = render(
        <Stack className="custom-stack">
          <div>Item</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('custom-stack');
    });
  });

  describe('중첩', () => {
    it('Stack을 중첩할 수 있어야 함', () => {
      render(
        <Stack>
          <Stack direction="horizontal">
            <div>중첩 항목</div>
          </Stack>
        </Stack>
      );
      expect(screen.getByText('중첩 항목')).toBeInTheDocument();
    });
  });
});
