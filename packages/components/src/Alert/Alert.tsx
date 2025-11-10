import React from 'react';
import clsx from 'clsx';

export interface AlertProps {
  /** Alert 변형 */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  /** 제목 */
  title?: string;
  /** 자식 요소 (메시지) */
  children: React.ReactNode;
  /** 닫기 버튼 표시 여부 */
  closable?: boolean;
  /** 닫기 핸들러 */
  onClose?: () => void;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Alert 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 알림 컴포넌트
 * 중요한 정보나 상태 메시지를 표시
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="성공">
 *   작업이 성공적으로 완료되었습니다.
 * </Alert>
 *
 * <Alert variant="error" closable onClose={handleClose}>
 *   오류가 발생했습니다.
 * </Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  children,
  closable = false,
  onClose,
  className,
}) => {
  const baseClasses = `
    p-4 
    rounded-lg 
    border
    flex
    items-start
    gap-3
  `;

  // TODO: tokens 사용하여 컬러 적용

  const variantClasses = {
    default: `
      bg-slate-50 
      border-slate-200
      text-slate-900
    `,
    success: `
      bg-emerald-50 
      border-emerald-200
      text-emerald-900
    `,
    error: `
      bg-red-50 
      border-red-200
      text-red-900
    `,
    warning: `
      bg-amber-50 
      border-amber-200
      text-amber-900
    `,
    info: `
      bg-blue-50 
      border-blue-200
      text-blue-900
    `,
  };

  const iconClasses = {
    default: 'text-slate-600',
    success: 'text-emerald-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  const icons = {
    default: '●',
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ',
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      {/* 아이콘 */}
      <div
        className={clsx(
          'flex-shrink-0 font-bold text-lg leading-none pt-0.5',
          iconClasses[variant]
        )}
      >
        {icons[variant]}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-sm mb-1">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>

      {/* 닫기 버튼 */}
      {closable && onClose && (
        <button
          onClick={onClose}
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
      )}
    </div>
  );
};

export default Alert;
