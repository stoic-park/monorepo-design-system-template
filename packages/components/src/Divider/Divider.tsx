import React from 'react';
import clsx from 'clsx';

export interface DividerProps {
  /** 방향 */
  orientation?: 'horizontal' | 'vertical';
  /** 라벨 (horizontal일 때만) */
  label?: string;
  /** 라벨 정렬 (horizontal일 때만) */
  labelPosition?: 'left' | 'center' | 'right';
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Divider 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 구분선 컴포넌트
 * 콘텐츠 영역을 시각적으로 분리
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider label="또는" labelPosition="center" />
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  labelPosition = 'center',
  className,
}) => {
  // 수평 구분선
  if (orientation === 'horizontal') {
    // 라벨이 없는 경우
    if (!label) {
      return (
        <hr
          className={clsx('border-0 border-t border-gray-200 my-4', className)}
        />
      );
    }

    // 라벨이 있는 경우
    const justifyClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    return (
      <div
        className={clsx(
          'flex items-center my-4',
          justifyClasses[labelPosition],
          className
        )}
      >
        {labelPosition !== 'left' && (
          <div className="flex-1 border-t border-gray-200" />
        )}
        <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
          {label}
        </span>
        {labelPosition !== 'right' && (
          <div className="flex-1 border-t border-gray-200" />
        )}
      </div>
    );
  }

  // 수직 구분선
  return (
    <div
      className={clsx('inline-block w-px h-full bg-gray-200 mx-4', className)}
    />
  );
};

export default Divider;
