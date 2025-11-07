import React from 'react';
import clsx from 'clsx';

export interface SpinnerProps {
  /** 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 색상 */
  variant?: 'default' | 'primary' | 'white';
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Spinner 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 로딩 인디케이터
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" />
 * <Spinner variant="white" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const variantClasses = {
    default: 'border-gray-300 border-t-gray-900',
    primary: 'border-gray-300 border-t-black',
    white: 'border-white/30 border-t-white',
  };

  return (
    <div
      className={clsx(
        'inline-block',
        'rounded-full',
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="로딩 중"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};

export default Spinner;
