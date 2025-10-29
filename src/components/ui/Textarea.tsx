// Textarea component following ZWA design system
// Shim for @zwa/ui Textarea
// TODO: replace with @zwa/ui when available

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'w-full min-h-[120px] px-4 py-3 rounded-lg border bg-bg text-fg text-base',
          'placeholder:text-fg-muted resize-y',
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

Textarea.displayName = 'Textarea';

