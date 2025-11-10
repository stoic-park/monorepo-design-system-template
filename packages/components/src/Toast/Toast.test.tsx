import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './Toast';

// 테스트용 컴포넌트
const ToastTester = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success('성공 메시지')}>Success</button>
      <button onClick={() => toast.error('에러 메시지')}>Error</button>
      <button onClick={() => toast.warning('경고 메시지')}>Warning</button>
      <button onClick={() => toast.info('정보 메시지')}>Info</button>
      <button onClick={() => toast.success('제목 포함', '성공')}>
        With Title
      </button>
    </div>
  );
};

describe('Toast', () => {
  describe('ToastProvider', () => {
    it('children이 렌더링되어야 함', () => {
      render(
        <ToastProvider>
          <div>App Content</div>
        </ToastProvider>
      );
      expect(screen.getByText('App Content')).toBeInTheDocument();
    });
  });

  describe('useToast hook', () => {
    it('success toast가 표시되어야 함', async () => {
      render(
        <ToastProvider>
          <ToastTester />
        </ToastProvider>
      );

      const button = screen.getByText('Success');
      await userEvent.click(button);

      await waitFor(
        () => {
          expect(screen.getByText('성공 메시지')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it('error toast가 표시되어야 함', async () => {
      render(
        <ToastProvider>
          <ToastTester />
        </ToastProvider>
      );

      const button = screen.getByText('Error');
      await userEvent.click(button);

      await waitFor(
        () => {
          expect(screen.getByText('에러 메시지')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it('warning toast가 표시되어야 함', async () => {
      render(
        <ToastProvider>
          <ToastTester />
        </ToastProvider>
      );

      const button = screen.getByText('Warning');
      await userEvent.click(button);

      await waitFor(
        () => {
          expect(screen.getByText('경고 메시지')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it('info toast가 표시되어야 함', async () => {
      render(
        <ToastProvider>
          <ToastTester />
        </ToastProvider>
      );

      const button = screen.getByText('Info');
      await userEvent.click(button);

      await waitFor(
        () => {
          expect(screen.getByText('정보 메시지')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it('title과 함께 toast가 표시되어야 함', async () => {
      render(
        <ToastProvider>
          <ToastTester />
        </ToastProvider>
      );

      const button = screen.getByText('With Title');
      await userEvent.click(button);

      await waitFor(
        () => {
          expect(screen.getByText('성공')).toBeInTheDocument();
          expect(screen.getByText('제목 포함')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('자동 제거', () => {
    it.skip('3초 후 toast가 자동으로 제거되어야 함 (manual test)', () => {
      // 실제 브라우저에서 수동으로 테스트
      // fakeTimers와 userEvent 충돌 이슈로 인해 skip
    });
  });

  describe('Context 에러', () => {
    it('ToastProvider 없이 useToast 사용 시 에러가 발생해야 함', () => {
      const TestComponent = () => {
        expect(() => useToast()).toThrow(
          'useToast must be used within ToastProvider'
        );
        return null;
      };

      render(<TestComponent />);
    });
  });
});
