import React from 'react';
import clsx from 'clsx';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 라벨 */
  label?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 설명 텍스트 */
  description?: string;
}

/**
 * Radio 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 라디오 버튼
 *
 * @example
 * ```tsx
 * <Radio name="option" value="1" label="옵션 1" />
 * <Radio name="option" value="2" label="옵션 2" />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, description, className = '', disabled, ...props }, ref) => {
    const baseRadioClasses = `
      w-4 h-4 
      transition-all 
      duration-200
      cursor-pointer
      disabled:cursor-not-allowed
      disabled:opacity-50
    `;

    const normalClasses = `
      border-gray-300
      text-black
      focus:ring-2 
      focus:ring-black
      focus:ring-offset-2
      hover:border-gray-400
    `;

    const errorClasses = `
      border-red-500
      text-red-500
      focus:ring-2
      focus:ring-red-500
      focus:ring-offset-2
    `;

    const radioClasses = clsx(
      baseRadioClasses,
      error ? errorClasses : normalClasses,
      className
    );

    const RadioElement = (
      <input
        ref={ref}
        type="radio"
        className={radioClasses}
        disabled={disabled}
        {...props}
      />
    );

    // 라벨이 없으면 라디오만 반환
    if (!label && !description) {
      return RadioElement;
    }

    // 라벨이 있으면 라벨과 함께 반환
    return (
      <label
        className={clsx(
          'flex items-start gap-2',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        )}
      >
        {RadioElement}
        <div className="flex flex-col gap-0.5">
          {label && (
            <span
              className={clsx(
                'text-sm font-medium select-none',
                error ? 'text-red-900' : 'text-gray-900'
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500 select-none">
              {description}
            </span>
          )}
        </div>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
