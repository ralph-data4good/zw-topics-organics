// Label component following ZWA design system
// Shim for @zwa/ui Label
// TODO: replace with @zwa/ui when available

import { type LabelHTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label
      className={clsx('block text-sm font-medium text-fg mb-2', className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

