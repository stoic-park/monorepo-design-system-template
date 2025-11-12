import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast';
import { act } from 'react';

// 테스트용 컴포넌트
const TestComponent = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success('Success message', 'Success')}>
        Show Success
      </button>
      <button onClick={() => toast.error('Error message', 'Error')}>
        Show Error
      </button>
      <button onClick={() => toast.warning('Warning message', 'Warning')}>
        Show Warning
      </button>
      <button onClick={() => toast.info('Info message', 'Info')}>Show Info</button>
      <button
        onClick={() =>
          toast.addToast({
            variant: 'default',
            message: 'Custom message',
            duration: 5000,
          })
        }
      >
        Show Custom
      </button>
    </div>
  );
};

describe('Toast', () => {
  it('ToastProvider가 렌더링되어야 함', () => {
    render(
      <ToastProvider>
        <div>Content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('useToast hook이 Provider 외부에서 에러를 발생시켜야 함', () => {
    // 콘솔 에러 숨기기
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      const Component = () => {
        useToast();
        return null;
      };
      render(<Component />);
    }).toThrow('useToast must be used within ToastProvider');

    consoleSpy.mockRestore();
  });

  it('success 토스트가 표시되어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('error 토스트가 표시되어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Error');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('warning 토스트가 표시되어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Warning');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
  });

  it('info 토스트가 표시되어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Info');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });
  });

  it('커스텀 토스트가 표시되어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Custom');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Custom message')).toBeInTheDocument();
    });
  });

  it('닫기 버튼으로 토스트를 닫을 수 있어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  it('여러 토스트를 동시에 표시할 수 있어야 함', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Success'));
    await user.click(screen.getByText('Show Error'));
    await user.click(screen.getByText('Show Warning'));

    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
  });

  it('title 없이 message만 표시할 수 있어야 함', async () => {
    const user = userEvent.setup();

    const SimpleComponent = () => {
      const toast = useToast();
      return (
        <button onClick={() => toast.addToast({ variant: 'info', message: 'Just message' })}>
          Show
        </button>
      );
    };

    render(
      <ToastProvider>
        <SimpleComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show'));

    await waitFor(() => {
      expect(screen.getByText('Just message')).toBeInTheDocument();
    });
  });
});
