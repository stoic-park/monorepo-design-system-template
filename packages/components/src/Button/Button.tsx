import React from 'react';
import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형 스타일
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'sidebar';
  /**
   * 버튼 크기
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 텍스트 정렬
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 활성화 여부 (sidebar variant에서 사용)
   */
  active?: boolean;
  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

/**
 * DBDS Button Component
 *
 * 미니멀한 흑백 디자인의 버튼 컴포넌트
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      align = 'center',
      fullWidth = false,
      disabled = false,
      active = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // 텍스트 정렬 스타일
    const alignStyles = {
      left: 'justify-start text-left',
      center: 'justify-center text-center',
      right: 'justify-end text-right',
    };

    const baseStyles = clsx(
      'inline-flex items-center',
      alignStyles[align],
      'font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    );

    const variantStyles = {
      primary: clsx(
        'bg-slate-900 text-white shadow-sm',
        'hover:bg-slate-800',
        'focus:ring-slate-400'
      ),
      secondary: clsx(
        'bg-slate-100 text-slate-900',
        'hover:bg-slate-200',
        'focus:ring-slate-400'
      ),
      outline: clsx(
        'border-2 border-slate-200 bg-transparent text-slate-900',
        'hover:bg-slate-50',
        'focus:ring-slate-400'
      ),
      ghost: clsx(
        'bg-transparent text-slate-900',
        'hover:bg-slate-100',
        'focus:ring-slate-400'
      ),
      sidebar: clsx(
        active
          ? 'bg-slate-900 text-white'
          : 'bg-transparent text-slate-700 hover:bg-slate-100'
      ),
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-lg',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
