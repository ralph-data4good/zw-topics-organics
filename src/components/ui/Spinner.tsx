// Spinner component following ZWA design system
// Shim for @zwa/ui Spinner
// TODO: replace with @zwa/ui when available

import { Loader2 } from './icons';
import { clsx } from 'clsx';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2
      className={clsx('animate-spin text-primary', sizeClasses[size], className)}
      aria-label="Loading"
    />
  );
}

