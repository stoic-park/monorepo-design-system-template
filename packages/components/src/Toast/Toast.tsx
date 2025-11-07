import React, { createContext, useContext, useState, useCallback } from 'react';
import clsx from 'clsx';

export interface ToastMessage {
  id: string;
  variant: 'default' | 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Toast Provider
 *
 * 앱의 최상위에 래핑하여 전역에서 Toast 사용 가능
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastMessage = {
        id,
        variant: toast.variant || 'default',
        message: toast.message,
        title: toast.title,
        duration: toast.duration ?? 3000,
      };

      setToasts((prev) => [...prev, newToast]);

      // 자동 제거
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => removeToast(id), newToast.duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title?: string) => {
      addToast({ variant: 'success', message, title });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      addToast({ variant: 'error', message, title });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      addToast({ variant: 'warning', message, title });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      addToast({ variant: 'info', message, title });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Toast Hook
 *
 * @example
 * ```tsx
 * const toast = useToast();
 * toast.success('저장되었습니다');
 * toast.error('오류가 발생했습니다');
 * ```
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/**
 * Toast Container (내부 컴포넌트)
 */
const ToastContainer: React.FC<{
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

/**
 * Toast Item (개별 토스트)
 */
const ToastItem: React.FC<{
  toast: ToastMessage;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const variantClasses = {
    default: 'bg-white border-gray-300 text-gray-900',
    success: 'bg-green-50 border-green-300 text-green-900',
    error: 'bg-red-50 border-red-300 text-red-900',
    warning: 'bg-amber-50 border-amber-300 text-amber-900',
    info: 'bg-blue-50 border-blue-300 text-blue-900',
  };

  const icons = {
    default: '●',
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ',
  };

  const iconColors = {
    default: 'text-gray-600',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  return (
    <div
      className={clsx(
        'flex items-start gap-3',
        'min-w-[300px] max-w-md',
        'p-4 rounded-lg',
        'border shadow-lg',
        'pointer-events-auto',
        'animate-slide-in-right',
        variantClasses[toast.variant]
      )}
    >
      <span
        className={clsx(
          'text-lg font-bold flex-shrink-0',
          iconColors[toast.variant]
        )}
      >
        {icons[toast.variant]}
      </span>

      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold text-sm mb-1">{toast.title}</div>
        )}
        <div className="text-sm">{toast.message}</div>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className={clsx(
          'flex-shrink-0',
          'w-5 h-5',
          'flex items-center justify-center',
          'rounded',
          'hover:bg-black/5',
          'transition-colors',
          'text-gray-600 hover:text-gray-900'
        )}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastProvider;
