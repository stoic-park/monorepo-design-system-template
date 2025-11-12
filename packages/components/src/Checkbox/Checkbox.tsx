import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'asChild'
  > {
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
 * Radix UI 기반의 체크박스 컴포넌트
 * - indeterminate 상태 지원
 * - 완전한 커스터마이징 가능
 * - 접근성 자동 지원
 *
 * @example
 * ```tsx
 * <Checkbox label="동의합니다" />
 * <Checkbox label="약관 동의" error errorMessage="필수 항목입니다" />
 * <Checkbox checked="indeterminate" label="부분 선택" />
 * ```
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      label,
      error,
      errorMessage,
      description,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      'w-4 h-4',
      'rounded border-2',
      'transition-all duration-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900',
      'data-[state=indeterminate]:bg-slate-900 data-[state=indeterminate]:border-slate-900',
      'flex items-center justify-center'
    );

    const stateClasses = error
      ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
      : 'border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-2';

    const CheckboxElement = (
      <CheckboxPrimitive.Root
        ref={ref}
        className={clsx(baseClasses, stateClasses, className)}
        disabled={disabled}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-white">
          {props.checked === 'indeterminate' ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 7.5H12.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    // 라벨이 없으면 체크박스만 반환
    if (!label && !description) {
      return CheckboxElement;
    }

    // 라벨이 있으면 라벨과 함께 반환
    return (
      <div className="flex flex-col gap-1">
        <label
          className={clsx(
            'flex items-start gap-2',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          )}
        >
          {CheckboxElement}
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
        {error && errorMessage && (
          <span className="text-xs text-red-500 ml-6">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
