// Section component following ZWA design system
// Shim for @zwa/ui Section
// TODO: replace with @zwa/ui when available

import { type HTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={clsx('rounded-xl border border-border bg-bg shadow-md p-6 md:p-10', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={clsx('text-xl md:text-2xl font-bold text-fg mb-3', className)} {...props}>
      {children}
    </h2>
  );
}

export function SectionDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx('text-base text-fg-muted leading-relaxed mb-6', className)} {...props}>
      {children}
    </p>
  );
}

