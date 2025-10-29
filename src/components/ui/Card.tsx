// Card component following ZWA design system
// Shim for @zwa/ui Card
// TODO: replace with @zwa/ui when available

import { type HTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-border bg-bg shadow-md',
        hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('p-6 pt-4 border-t border-border-muted', className)} {...props}>
      {children}
    </div>
  );
}

