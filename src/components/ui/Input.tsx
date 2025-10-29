// Input component following ZWA design system
// Shim for @zwa/ui Input
// TODO: replace with @zwa/ui when available

import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full h-11 px-4 rounded-lg border bg-bg text-fg text-base',
          'placeholder:text-fg-muted',
          'focus-ring transition-all duration-200',
          error ? 'border-red-500' : 'border-border hover:border-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

