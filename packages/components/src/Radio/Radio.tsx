import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';

// RadioGroup (Root)
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  children: React.ReactNode;
  error?: boolean;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, error, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={clsx('grid gap-2', className)}
    {...props}
  />
));

RadioGroup.displayName = 'RadioGroup';

// RadioGroupItem
export interface RadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    'asChild'
  > {
  label?: string;
  description?: string;
  error?: boolean;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, error, disabled, ...props }, ref) => {
  const baseClasses = clsx(
    'w-4 h-4 rounded-full border-2',
    'transition-all duration-200',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:border-slate-900 data-[state=checked]:bg-slate-900',
    'flex items-center justify-center'
  );

  const stateClasses = error
    ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
    : 'border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-2';

  const RadioElement = (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={clsx(baseClasses, stateClasses, className)}
      disabled={disabled}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
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
});

RadioGroupItem.displayName = 'RadioGroupItem';

// 이전 API와의 호환성을 위한 Radio alias (deprecated)
export const Radio = RadioGroupItem;
Radio.displayName = 'Radio';

export default RadioGroup;
