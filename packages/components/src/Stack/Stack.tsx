import React from 'react';
import clsx from 'clsx';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 방향
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * 간격 (디자인 토큰 기반)
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /**
   * 정렬
   */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

/**
 * Stack 컴포넌트
 *
 * 디자인 토큰 기반 간격을 제공하는 레이아웃 컴포넌트
 * Tailwind 클래스를 직접 사용하지 않고 일관된 간격 관리
 *
 * @example
 * ```tsx
 * <Stack spacing="lg">
 *   <Button>버튼 1</Button>
 *   <Button>버튼 2</Button>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  className,
  children,
  ...props
}) => {
  // 간격 매핑 (디자인 토큰)
  const spacingMap = {
    xs: direction === 'vertical' ? 'space-y-2' : 'gap-2', // 8px
    sm: direction === 'vertical' ? 'space-y-3' : 'gap-3', // 12px
    md: direction === 'vertical' ? 'space-y-4' : 'gap-4', // 16px
    lg: direction === 'vertical' ? 'space-y-6' : 'gap-6', // 24px
    xl: direction === 'vertical' ? 'space-y-8' : 'gap-8', // 32px
    '2xl': direction === 'vertical' ? 'space-y-12' : 'gap-12', // 48px
    '3xl': direction === 'vertical' ? 'space-y-16' : 'gap-16', // 64px
    '4xl': direction === 'vertical' ? 'space-y-24' : 'gap-24', // 96px
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={clsx(
        direction === 'vertical' ? 'flex flex-col' : 'flex flex-row flex-wrap',
        spacingMap[spacing],
        alignMap[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
