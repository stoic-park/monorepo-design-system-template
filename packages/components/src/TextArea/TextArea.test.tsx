import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('렌더링', () => {
    it('기본 TextArea가 렌더링되어야 함', () => {
      render(<TextArea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('label이 있을 때 label이 렌더링되어야 함', () => {
      render(<TextArea label="설명" />);
      expect(screen.getByText('설명')).toBeInTheDocument();
    });

    it('placeholder가 렌더링되어야 함', () => {
      render(<TextArea placeholder="내용을 입력하세요" />);
      expect(
        screen.getByPlaceholderText('내용을 입력하세요')
      ).toBeInTheDocument();
    });
  });

  describe('rows', () => {
    it('기본 rows가 4여야 함', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '4');
    });

    it('rows prop이 적용되어야 함', () => {
      render(<TextArea rows={10} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '10');
    });
  });

  describe('resize', () => {
    it('vertical resize가 기본값이어야 함', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-y');
    });

    it('none resize가 적용되어야 함', () => {
      render(<TextArea resize="none" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-none');
    });

    it('horizontal resize가 적용되어야 함', () => {
      render(<TextArea resize="horizontal" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-x');
    });

    it('both resize가 적용되어야 함', () => {
      render(<TextArea resize="both" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize');
    });
  });

  describe('에러 상태', () => {
    it('error가 true일 때 에러 스타일이 적용되어야 함', () => {
      render(<TextArea error />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-red-500');
    });

    it('에러 메시지가 표시되어야 함', () => {
      render(<TextArea label="설명" error errorMessage="필수 항목입니다" />);
      expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
    });

    it('error가 false일 때 에러 메시지가 표시되지 않아야 함', () => {
      render(<TextArea error={false} errorMessage="에러" />);
      expect(screen.queryByText('에러')).not.toBeInTheDocument();
    });
  });

  describe('전체 너비', () => {
    it('fullWidth가 기본값 true여야 함', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('w-full');
    });

    it('fullWidth가 false일 때 w-full이 없어야 함', () => {
      render(<TextArea fullWidth={false} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveClass('w-full');
    });
  });

  describe('비활성화', () => {
    it('disabled 속성이 적용되어야 함', () => {
      render(<TextArea disabled />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
    });

    it('disabled 상태에서 입력이 불가능해야 함', async () => {
      const user = userEvent.setup();
      render(<TextArea disabled />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'test');
      expect(textarea).toHaveValue('');
    });
  });

  describe('입력 동작', () => {
    it('텍스트 입력이 가능해야 함', async () => {
      const user = userEvent.setup();
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'Hello World');
      expect(textarea).toHaveValue('Hello World');
    });

    it('여러 줄 입력이 가능해야 함', async () => {
      const user = userEvent.setup();
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'Line 1{Enter}Line 2');
      expect(textarea).toHaveValue('Line 1\nLine 2');
    });

    it('onChange 이벤트가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<TextArea onChange={onChange} />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'A');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      render(<TextArea className="custom-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-textarea');
    });
  });

  describe('ref 전달', () => {
    it('ref가 textarea 요소에 전달되어야 함', () => {
      const ref = { current: null as HTMLTextAreaElement | null };
      render(<TextArea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });
});
