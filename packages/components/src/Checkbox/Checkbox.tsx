import React from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 체크박스 라벨 */
  label?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 설명 텍스트 */
  description?: string;
}

/**
 * Checkbox 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 체크박스 컴포넌트
 *
 * @example
 * ```tsx
 * <Checkbox label="동의합니다" />
 * <Checkbox label="약관 동의" error errorMessage="필수 항목입니다" />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      errorMessage,
      description,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseCheckboxClasses = `
      w-4 h-4 
      rounded 
      border-2 
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

    const checkboxClasses = `
      ${baseCheckboxClasses}
      ${error ? errorClasses : normalClasses}
      ${className}
    `.trim();

    const CheckboxElement = (
      <input
        ref={ref}
        type="checkbox"
        className={checkboxClasses}
        disabled={disabled}
        {...props}
      />
    );

    // 라벨이 없으면 체크박스만 반환
    if (!label && !description) {
      return CheckboxElement;
    }

    // 라벨이 있으면 라벨과 함께 반환
    return (
      <div className="flex flex-col gap-1">
        <label
          className={`
            flex items-start gap-2
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          {CheckboxElement}
          <div className="flex flex-col gap-0.5">
            {label && (
              <span
                className={`
                  text-sm font-medium select-none
                  ${error ? 'text-red-900' : 'text-gray-900'}
                `}
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
        {error && errorMessage && (
          <span className="text-xs text-red-500 ml-6">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
