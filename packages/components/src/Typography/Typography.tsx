import React from 'react';
import clsx from 'clsx';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML 요소 타입
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /**
   * 텍스트 변형
   */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption';
  /**
   * 텍스트 색상
   */
  color?: 'primary' | 'secondary' | 'disabled';
  /**
   * 폰트 굵기
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * 텍스트 정렬
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

/**
 * DBDS Typography Component
 *
 * 미니멀한 흑백 디자인의 타이포그래피 컴포넌트
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant = 'body1',
      color = 'primary',
      weight,
      align = 'left',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // as가 명시되지 않으면 variant에 따라 자동 설정
    const Component = as || (variant.startsWith('h') ? variant : 'p');

    const variantStyles = {
      h1: 'text-5xl font-bold leading-tight',
      h2: 'text-4xl font-bold leading-tight',
      h3: 'text-3xl font-semibold leading-snug',
      h4: 'text-2xl font-semibold leading-snug',
      h5: 'text-xl font-medium leading-normal',
      h6: 'text-lg font-medium leading-normal',
      body1: 'text-base leading-normal',
      body2: 'text-sm leading-normal',
      caption: 'text-xs leading-tight',
    };

    const colorStyles = {
      primary: 'text-black',
      secondary: 'text-gray-600',
      disabled: 'text-gray-400',
    };

    const weightStyles = weight
      ? {
          light: 'font-light',
          normal: 'font-normal',
          medium: 'font-medium',
          semibold: 'font-semibold',
          bold: 'font-bold',
        }[weight]
      : '';

    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    return React.createElement(
      Component,
      {
        ref,
        className: clsx(
          variantStyles[variant],
          colorStyles[color],
          weightStyles,
          alignStyles[align],
          className
        ),
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';
