import React from 'react';
import clsx from 'clsx';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드 크기
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 에러 상태
   */
  error?: boolean;
  /**
   * 에러 메시지
   */
  errorMessage?: string;
  /**
   * 레이블
   */
  label?: string;
  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;
}

/**
 * DBDS Input Component
 *
 * 미니멀한 흑백 디자인의 입력 필드 컴포넌트
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      errorMessage,
      label,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      'border transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50',
      'placeholder:text-slate-400'
    );

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-5 py-3 text-lg rounded-lg',
    };

    const stateStyles = error
      ? 'border-red-500 bg-red-50 focus:ring-red-400'
      : 'border-slate-200 bg-white focus:ring-slate-400 focus:border-slate-300';

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={clsx('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-slate-900">{label}</label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={clsx(
            baseStyles,
            sizeStyles[size],
            stateStyles,
            widthStyles,
            className
          )}
          {...props}
        />
        {error && errorMessage && (
          <span className="text-sm text-red-600">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
