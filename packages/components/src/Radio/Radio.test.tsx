import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  describe('렌더링', () => {
    it('기본 Radio가 렌더링되어야 함', () => {
      render(<Radio name="test" value="1" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('label이 있을 때 label이 렌더링되어야 함', () => {
      render(<Radio name="test" value="1" label="옵션 1" />);
      expect(screen.getByText('옵션 1')).toBeInTheDocument();
    });

    it('description이 있을 때 description이 렌더링되어야 함', () => {
      render(<Radio name="test" value="1" label="옵션" description="설명" />);
      expect(screen.getByText('설명')).toBeInTheDocument();
    });
  });

  describe('선택 상태', () => {
    it('기본적으로 선택되지 않아야 함', () => {
      render(<Radio name="test" value="1" />);
      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();
    });

    it('defaultChecked가 true일 때 선택되어야 함', () => {
      render(<Radio name="test" value="1" defaultChecked />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('클릭 시 선택되어야 함', async () => {
      const user = userEvent.setup();
      render(<Radio name="test" value="1" label="옵션" />);
      const radio = screen.getByRole('radio');

      expect(radio).not.toBeChecked();
      await user.click(radio);
      expect(radio).toBeChecked();
    });
  });

  describe('에러 상태', () => {
    it('error가 true일 때 에러 스타일이 적용되어야 함', () => {
      render(<Radio name="test" value="1" error />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveClass('border-red-500');
    });

    it('error 상태에서 label 색상이 변경되어야 함', () => {
      render(<Radio name="test" value="1" label="필수 선택" error />);
      const label = screen.getByText('필수 선택');
      expect(label).toHaveClass('text-red-900');
    });
  });

  describe('비활성화', () => {
    it('disabled 속성이 적용되어야 함', () => {
      render(<Radio name="test" value="1" disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });

    it('disabled 상태에서 선택이 변경되지 않아야 함', async () => {
      const user = userEvent.setup();
      render(<Radio name="test" value="1" disabled />);
      const radio = screen.getByRole('radio');

      expect(radio).not.toBeChecked();
      await user.click(radio);
      expect(radio).not.toBeChecked();
    });
  });

  describe('이벤트', () => {
    it('onChange 이벤트가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Radio name="test" value="1" onChange={onChange} />);
      const radio = screen.getByRole('radio');

      await user.click(radio);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('그룹', () => {
    it('같은 name을 가진 radio들은 하나만 선택되어야 함', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Radio name="size" value="sm" label="Small" />
          <Radio name="size" value="md" label="Medium" />
          <Radio name="size" value="lg" label="Large" />
        </div>
      );

      const small = screen.getByLabelText('Small');
      const medium = screen.getByLabelText('Medium');

      await user.click(small);
      expect(small).toBeChecked();
      expect(medium).not.toBeChecked();

      await user.click(medium);
      expect(small).not.toBeChecked();
      expect(medium).toBeChecked();
    });
  });

  describe('접근성', () => {
    it('radio role을 가져야 함', () => {
      render(<Radio name="test" value="1" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('label 클릭 시 radio가 선택되어야 함', async () => {
      const user = userEvent.setup();
      render(<Radio name="test" value="1" label="옵션" />);

      const label = screen.getByText('옵션');
      const radio = screen.getByRole('radio');

      expect(radio).not.toBeChecked();
      await user.click(label);
      expect(radio).toBeChecked();
    });
  });

  describe('ref 전달', () => {
    it('ref가 input 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Radio name="test" value="1" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('radio');
    });
  });
});
