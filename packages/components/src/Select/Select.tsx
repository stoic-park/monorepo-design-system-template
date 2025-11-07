import React from 'react';
import clsx from 'clsx';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** 옵션 목록 */
  options: SelectOption[];
  /** 라벨 */
  label?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Select 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 드롭다운 선택 컴포넌트
 *
 * @example
 * ```tsx
 * <Select
 *   label="부서"
 *   options={[
 *     { label: '선택', value: '' },
 *     { label: '개발팀', value: 'dev' }
 *   ]}
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      error,
      errorMessage,
      fullWidth,
      size = 'md',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      rounded-lg
      border-2
      transition-all
      duration-200
      bg-white
      disabled:bg-gray-50
      disabled:cursor-not-allowed
      disabled:opacity-50
      appearance-none
      bg-no-repeat
    `;

    const sizeClasses = {
      sm: 'pl-3 pr-10 py-1.5 text-sm',
      md: 'pl-4 pr-12 py-2 text-base',
      lg: 'pl-5 pr-14 py-3 text-lg',
    };

    const normalClasses = `
      border-gray-300
      text-gray-900
      focus:outline-none
      focus:ring-2
      focus:ring-black
      focus:border-black
      hover:border-gray-400
    `;

    // 커스텀 드롭다운 아이콘 스타일 (닫힘 상태 - 아래쪽 화살표)
    const bgPositionClasses = {
      sm: 'bg-[length:16px] bg-[right_0.75rem_center]',
      md: 'bg-[length:20px] bg-[right_1rem_center]',
      lg: 'bg-[length:24px] bg-[right_1.25rem_center]',
    };

    const chevronDownIcon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E`;

    // 열림 상태 - 위쪽 화살표
    const chevronUpIcon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 15l7-7 7 7'%3E%3C/path%3E%3C/svg%3E`;

    const errorClasses = `
      border-red-500
      text-red-900
      focus:outline-none
      focus:ring-2
      focus:ring-red-500
      focus:border-red-500
    `;

    const selectClasses = clsx(
      baseClasses,
      sizeClasses[size],
      bgPositionClasses[size],
      error ? errorClasses : normalClasses,
      fullWidth ? 'w-full' : 'w-auto',
      className
    );

    const SelectElement = (
      <select
        ref={ref}
        className={selectClasses}
        style={{
          backgroundImage: `url("${chevronDownIcon}")`,
          // focus 상태에서 위쪽 화살표로 변경
          ...(props.onFocus && {}),
        }}
        onFocus={(e) => {
          (e.target as HTMLSelectElement).style.backgroundImage =
            `url("${chevronUpIcon}")`;
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          (e.target as HTMLSelectElement).style.backgroundImage =
            `url("${chevronDownIcon}")`;
          props.onBlur?.(e);
        }}
        disabled={disabled}
        {...props}
      >
        {options.map((option, index) => (
          <option
            key={`${option.value}-${index}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );

    // 라벨이 없으면 select만 반환
    if (!label) {
      return SelectElement;
    }

    // 라벨이 있으면 라벨과 함께 반환
    return (
      <div className={clsx('flex flex-col gap-1', fullWidth && 'w-full')}>
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {SelectElement}
        {error && errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
