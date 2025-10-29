// Badge component following ZWA design system
// Shim for @zwa/ui Badge
// TODO: replace with @zwa/ui when available

import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-pill',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-fg border border-neutral-200',
        primary: 'bg-zwa-blue-100 text-primary border border-primary/20',
        secondary: 'bg-zwa-gold-400/20 text-secondary-dark border border-secondary/20',
        green: 'bg-green-500/10 text-green-500 border border-green-500/20',
        verified: 'bg-green-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={clsx(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

