import React, { useEffect } from 'react';
import clsx from 'clsx';

export interface ModalProps {
  /** 모달 열림 상태 */
  open: boolean;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 제목 */
  title?: string;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 배경 클릭 시 닫기 */
  closeOnBackdrop?: boolean;
  /** ESC 키로 닫기 */
  closeOnEsc?: boolean;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Modal 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 모달 다이얼로그
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={handleClose} title="제목">
 *   <Modal.Body>
 *     내용
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={handleClose}>닫기</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> & {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({
  open,
  onClose,
  title,
  children,
  closeOnBackdrop = true,
  closeOnEsc = true,
  size = 'md',
  className,
}) => {
  // ESC 키 처리
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose, closeOnEsc]);

  // body scroll 제어
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        'flex items-center justify-center',
        'bg-black/50',
        'p-4'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          'bg-white rounded-lg shadow-lg border border-slate-200',
          'w-full',
          sizeClasses[size],
          'flex flex-col',
          'max-h-[90vh]',
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className={clsx(
                'w-8 h-8',
                'flex items-center justify-center',
                'rounded-md',
                'hover:bg-slate-100',
                'transition-colors',
                'text-slate-400 hover:text-slate-600'
              )}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

/**
 * Modal Body
 */
export const ModalBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={clsx('p-6', className)}>{children}</div>;
};

/**
 * Modal Footer
 */
export const ModalFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-end gap-2 p-6 border-t border-slate-200 bg-slate-50',
        className
      )}
    >
      {children}
    </div>
  );
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
