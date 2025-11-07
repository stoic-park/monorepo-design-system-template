import React from 'react';
import clsx from 'clsx';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 라벨 */
  label?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 리사이즈 옵션 */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * TextArea 컴포넌트
 *
 * DBDS 흑백 미니멀 디자인을 따르는 여러 줄 텍스트 입력
 *
 * @example
 * ```tsx
 * <TextArea
 *   label="설명"
 *   placeholder="내용을 입력하세요"
 *   rows={5}
 * />
 * ```
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      errorMessage,
      fullWidth = true,
      resize = 'vertical',
      className = '',
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      rounded-lg
      border-2
      transition-all
      duration-200
      disabled:bg-gray-50
      disabled:cursor-not-allowed
      disabled:opacity-50
    `;

    const normalClasses = `
      border-gray-300
      text-gray-900
      placeholder:text-gray-400
      focus:outline-none
      focus:ring-2
      focus:ring-black
      focus:border-black
      hover:border-gray-400
    `;

    const errorClasses = `
      border-red-500
      text-red-900
      placeholder:text-red-300
      focus:outline-none
      focus:ring-2
      focus:ring-red-500
      focus:border-red-500
    `;

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const textareaClasses = clsx(
      baseClasses,
      'px-4 py-2 text-base',
      error ? errorClasses : normalClasses,
      resizeClasses[resize],
      fullWidth ? 'w-full' : 'w-auto',
      className
    );

    const TextAreaElement = (
      <textarea
        ref={ref}
        className={textareaClasses}
        disabled={disabled}
        rows={rows}
        {...props}
      />
    );

    // 라벨이 없으면 textarea만 반환
    if (!label) {
      return TextAreaElement;
    }

    // 라벨이 있으면 라벨과 함께 반환
    return (
      <div className={clsx('flex flex-col gap-1', fullWidth && 'w-full')}>
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {TextAreaElement}
        {error && errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
