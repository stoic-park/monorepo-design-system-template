import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('렌더링', () => {
    it('기본 Alert가 렌더링되어야 함', () => {
      render(<Alert>기본 메시지</Alert>);
      expect(screen.getByText('기본 메시지')).toBeInTheDocument();
    });

    it('제목이 있을 때 제목이 렌더링되어야 함', () => {
      render(<Alert title="알림">메시지 내용</Alert>);
      expect(screen.getByText('알림')).toBeInTheDocument();
      expect(screen.getByText('메시지 내용')).toBeInTheDocument();
    });

    it('제목이 없을 때 메시지만 렌더링되어야 함', () => {
      render(<Alert>메시지만</Alert>);
      expect(screen.getByText('메시지만')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('default variant가 적용되어야 함', () => {
      const { container } = render(<Alert variant="default">메시지</Alert>);
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toHaveClass('bg-slate-50');
      expect(alertDiv).toHaveClass('border-slate-200');
    });

    it('success variant가 적용되어야 함', () => {
      const { container } = render(<Alert variant="success">성공</Alert>);
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toHaveClass('bg-emerald-50');
      expect(alertDiv).toHaveClass('border-emerald-200');
    });

    it('error variant가 적용되어야 함', () => {
      const { container } = render(<Alert variant="error">에러</Alert>);
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toHaveClass('bg-red-50');
      expect(alertDiv).toHaveClass('border-red-200');
    });

    it('warning variant가 적용되어야 함', () => {
      const { container } = render(<Alert variant="warning">경고</Alert>);
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toHaveClass('bg-amber-50');
      expect(alertDiv).toHaveClass('border-amber-200');
    });

    it('info variant가 적용되어야 함', () => {
      const { container } = render(<Alert variant="info">정보</Alert>);
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toHaveClass('bg-blue-50');
      expect(alertDiv).toHaveClass('border-blue-200');
    });
  });

  describe('아이콘', () => {
    it('각 variant마다 다른 아이콘이 표시되어야 함', () => {
      const { rerender, container } = render(
        <Alert variant="success">성공</Alert>
      );
      expect(container.textContent).toContain('✓');

      rerender(<Alert variant="error">에러</Alert>);
      expect(container.textContent).toContain('✕');

      rerender(<Alert variant="warning">경고</Alert>);
      expect(container.textContent).toContain('⚠');

      rerender(<Alert variant="info">정보</Alert>);
      expect(container.textContent).toContain('ⓘ');

      rerender(<Alert variant="default">기본</Alert>);
      expect(container.textContent).toContain('●');
    });
  });

  describe('닫기 버튼', () => {
    it('closable이 false일 때 닫기 버튼이 없어야 함', () => {
      render(<Alert closable={false}>메시지</Alert>);
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });

    it('closable이 true일 때 닫기 버튼이 있어야 함', () => {
      const onClose = vi.fn();
      render(
        <Alert closable onClose={onClose}>
          메시지
        </Alert>
      );
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('닫기 버튼 클릭 시 onClose가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Alert closable onClose={onClose}>
          메시지
        </Alert>
      );

      const closeButton = screen.getByLabelText('Close');
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      const { container } = render(
        <Alert className="custom-class">메시지</Alert>
      );
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toHaveClass('custom-class');
    });
  });

  describe('접근성', () => {
    it('적절한 시맨틱 구조를 가져야 함', () => {
      const { container } = render(<Alert title="제목">내용</Alert>);
      const alertDiv = container.firstChild as HTMLElement;
      expect(alertDiv).toBeInstanceOf(HTMLDivElement);
    });

    it('닫기 버튼에 aria-label이 있어야 함', () => {
      const onClose = vi.fn();
      render(
        <Alert closable onClose={onClose}>
          메시지
        </Alert>
      );
      const closeButton = screen.getByLabelText('Close');
      expect(closeButton).toHaveAttribute('aria-label', 'Close');
    });
  });

  describe('복잡한 children', () => {
    it('React 노드를 children으로 받을 수 있어야 함', () => {
      render(
        <Alert title="복잡한 내용">
          <div>
            <p>첫번째 줄</p>
            <p>두번째 줄</p>
          </div>
        </Alert>
      );
      expect(screen.getByText('첫번째 줄')).toBeInTheDocument();
      expect(screen.getByText('두번째 줄')).toBeInTheDocument();
    });
  });
});
