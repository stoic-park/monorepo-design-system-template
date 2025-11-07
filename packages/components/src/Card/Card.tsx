import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 카드 변형 스타일
   */
  variant?: 'default' | 'bordered' | 'elevated';
  /**
   * 패딩 크기
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

/**
 * DBDS Card Component
 *
 * 미니멀한 흑백 디자인의 카드 컴포넌트
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', padding = 'md', className, children, ...props },
    ref
  ) => {
    const baseStyles = 'rounded-lg transition-shadow';

    const variantStyles = {
      default: 'bg-white border border-slate-200',
      bordered: 'bg-white border border-slate-200',
      elevated: 'bg-white border border-slate-200 shadow-sm hover:shadow-md',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
