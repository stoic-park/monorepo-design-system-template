import React from 'react';
import clsx from 'clsx';

export interface BadgeProps {
  /** Badge 변형 */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  /** Badge 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 자식 요소 */
  children: React.ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Badge 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 배지 컴포넌트
 * 상태 표시와 라벨링에 사용
 *
 * @example
 * ```tsx
 * <Badge variant="success">완료</Badge>
 * <Badge variant="error">에러</Badge>
 * <Badge variant="warning">대기</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
}) => {
  const baseClasses = `
    inline-flex 
    items-center 
    justify-center 
    rounded-full 
    font-medium
    whitespace-nowrap
    transition-colors
  `;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const variantClasses = {
    default: `
      bg-gray-100 
      text-gray-800 
      border border-gray-300
    `,
    success: `
      bg-green-50 
      text-green-800 
      border border-green-200
    `,
    error: `
      bg-red-50 
      text-red-800 
      border border-red-200
    `,
    warning: `
      bg-amber-50 
      text-amber-800 
      border border-amber-200
    `,
    info: `
      bg-blue-50 
      text-blue-800 
      border border-blue-200
    `,
  };

  return (
    <span
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
