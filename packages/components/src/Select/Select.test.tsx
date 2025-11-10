import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const mockOptions = [
  { label: '선택하세요', value: '' },
  { label: '옵션 1', value: '1' },
  { label: '옵션 2', value: '2' },
  { label: '옵션 3', value: '3' },
];

describe('Select', () => {
  describe('렌더링', () => {
    it('기본 Select가 렌더링되어야 함', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('options이 렌더링되어야 함', () => {
      render(<Select options={mockOptions} />);
      expect(
        screen.getByRole('option', { name: '선택하세요' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: '옵션 1' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: '옵션 2' })
      ).toBeInTheDocument();
    });

    it('label이 있을 때 label이 렌더링되어야 함', () => {
      render(<Select label="부서" options={mockOptions} />);
      expect(screen.getByText('부서')).toBeInTheDocument();
    });
  });

  describe('선택', () => {
    it('옵션을 선택할 수 있어야 함', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, '1');
      expect(select).toHaveValue('1');
    });

    it('onChange 이벤트가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Select options={mockOptions} onChange={onChange} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, '2');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('크기', () => {
    it('small 크기가 적용되어야 함', () => {
      render(<Select options={mockOptions} size="sm" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('text-sm');
    });

    it('medium 크기가 적용되어야 함', () => {
      render(<Select options={mockOptions} size="md" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('text-base');
    });

    it('large 크기가 적용되어야 함', () => {
      render(<Select options={mockOptions} size="lg" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('text-lg');
    });
  });

  describe('에러 상태', () => {
    it('error가 true일 때 에러 스타일이 적용되어야 함', () => {
      render(<Select options={mockOptions} error />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-red-500');
    });

    it('에러 메시지가 표시되어야 함', () => {
      render(
        <Select
          label="부서"
          options={mockOptions}
          error
          errorMessage="필수 항목입니다"
        />
      );
      expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
    });

    it('error가 false일 때 에러 메시지가 표시되지 않아야 함', () => {
      render(
        <Select options={mockOptions} error={false} errorMessage="에러" />
      );
      expect(screen.queryByText('에러')).not.toBeInTheDocument();
    });
  });

  describe('전체 너비', () => {
    it('fullWidth가 true일 때 w-full 클래스가 적용되어야 함', () => {
      render(<Select options={mockOptions} fullWidth />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('w-full');
    });
  });

  describe('비활성화', () => {
    it('disabled 속성이 적용되어야 함', () => {
      render(<Select options={mockOptions} disabled />);
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
    });

    it('disabled 상태에서 선택이 변경되지 않아야 함', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Select options={mockOptions} disabled onChange={onChange} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, '1');
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('옵션 비활성화', () => {
    it('disabled된 옵션이 비활성화되어야 함', () => {
      const optionsWithDisabled = [
        { label: '선택', value: '' },
        { label: '옵션 1', value: '1', disabled: true },
        { label: '옵션 2', value: '2' },
      ];

      render(<Select options={optionsWithDisabled} />);
      const option1 = screen.getByRole('option', {
        name: '옵션 1',
      }) as HTMLOptionElement;
      expect(option1.disabled).toBe(true);
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      render(<Select options={mockOptions} className="custom-select" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('custom-select');
    });
  });

  describe('ref 전달', () => {
    it('ref가 select 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLSelectElement | null };
      render(<Select options={mockOptions} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });
  });
});
