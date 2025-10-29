// Container component following ZWA design system
// Shim for @zwa/ui Container
// TODO: replace with @zwa/ui when available

import { type HTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={clsx('max-w-6xl mx-auto px-4 py-8', className)} {...props}>
      {children}
    </div>
  );
}

