import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  describe('렌더링', () => {
    it('open이 false일 때 렌더링되지 않아야 함', () => {
      const { container } = render(
        <Modal open={false} onClose={vi.fn()}>
          <div>내용</div>
        </Modal>
      );
      expect(container.firstChild).toBeNull();
    });

    it('open이 true일 때 렌더링되어야 함', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <div>모달 내용</div>
        </Modal>
      );
      expect(screen.getByText('모달 내용')).toBeInTheDocument();
    });

    it('title이 있을 때 title이 렌더링되어야 함', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="모달 제목">
          <div>내용</div>
        </Modal>
      );
      expect(screen.getByText('모달 제목')).toBeInTheDocument();
    });
  });

  describe('크기', () => {
    it('medium 크기가 기본값이어야 함', () => {
      const { container } = render(
        <Modal open={true} onClose={vi.fn()}>
          <div>내용</div>
        </Modal>
      );
      const modal = container.querySelector('.max-w-lg');
      expect(modal).toBeInTheDocument();
    });

    it('small 크기가 적용되어야 함', () => {
      const { container } = render(
        <Modal open={true} onClose={vi.fn()} size="sm">
          <div>내용</div>
        </Modal>
      );
      const modal = container.querySelector('.max-w-md');
      expect(modal).toBeInTheDocument();
    });

    it('large 크기가 적용되어야 함', () => {
      const { container } = render(
        <Modal open={true} onClose={vi.fn()} size="lg">
          <div>내용</div>
        </Modal>
      );
      const modal = container.querySelector('.max-w-2xl');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('닫기 동작', () => {
    it('닫기 버튼 클릭 시 onClose가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal open={true} onClose={onClose} title="제목">
          <div>내용</div>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close');
      await user.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('ESC 키 누르면 onClose가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal open={true} onClose={onClose}>
          <div>내용</div>
        </Modal>
      );

      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closeOnEsc가 false면 ESC 키로 닫히지 않아야 함', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal open={true} onClose={onClose} closeOnEsc={false}>
          <div>내용</div>
        </Modal>
      );

      await user.keyboard('{Escape}');
      expect(onClose).not.toHaveBeenCalled();
    });

    it('배경 클릭 시 onClose가 호출되어야 함', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      const { container } = render(
        <Modal open={true} onClose={onClose}>
          <div>내용</div>
        </Modal>
      );

      const backdrop = container.querySelector('.fixed.inset-0');
      if (backdrop) {
        await user.click(backdrop);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('closeOnBackdrop이 false면 배경 클릭으로 닫히지 않아야 함', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      const { container } = render(
        <Modal open={true} onClose={onClose} closeOnBackdrop={false}>
          <div>내용</div>
        </Modal>
      );

      const backdrop = container.querySelector('.fixed.inset-0');
      if (backdrop) {
        await user.click(backdrop);
        expect(onClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Body Scroll 제어', () => {
    it('모달이 열릴 때 body scroll이 hidden이어야 함', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <div>내용</div>
        </Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('모달이 닫힐 때 body scroll이 복원되어야 함', () => {
      const { rerender } = render(
        <Modal open={true} onClose={vi.fn()}>
          <div>내용</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal open={false} onClose={vi.fn()}>
          <div>내용</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Compound Components', () => {
    it('Modal.Body가 렌더링되어야 함', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Body>Body 내용</Modal.Body>
        </Modal>
      );
      expect(screen.getByText('Body 내용')).toBeInTheDocument();
    });

    it('Modal.Footer가 렌더링되어야 함', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <Modal.Footer>Footer 내용</Modal.Footer>
        </Modal>
      );
      expect(screen.getByText('Footer 내용')).toBeInTheDocument();
    });

    it('Body와 Footer를 함께 사용할 수 있어야 함', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="제목">
          <Modal.Body>본문</Modal.Body>
          <Modal.Footer>푸터</Modal.Footer>
        </Modal>
      );
      expect(screen.getByText('제목')).toBeInTheDocument();
      expect(screen.getByText('본문')).toBeInTheDocument();
      expect(screen.getByText('푸터')).toBeInTheDocument();
    });
  });

  describe('커스텀 className', () => {
    it('추가 className이 적용되어야 함', () => {
      const { container } = render(
        <Modal open={true} onClose={vi.fn()} className="custom-modal">
          <div>내용</div>
        </Modal>
      );
      const modal = container.querySelector('.custom-modal');
      expect(modal).toBeInTheDocument();
    });
  });
});
