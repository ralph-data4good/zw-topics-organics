// Select component following ZWA design system
// Shim for @zwa/ui Select
// TODO: replace with @zwa/ui when available

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from './icons';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            'w-full h-11 px-4 pr-10 rounded-lg border bg-bg text-fg text-base appearance-none',
            'focus-ring transition-all duration-200',
            error ? 'border-red-500' : 'border-border hover:border-primary/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-fg-muted pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';

