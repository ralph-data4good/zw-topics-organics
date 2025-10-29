// Toast component following ZWA design system
// Shim for @zwa/ui Toast
// TODO: replace with @zwa/ui when available

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, AlertCircle, X } from './icons';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 10);

    // Auto close
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <AlertCircle className="h-5 w-5 text-primary" />,
  };

  return (
    <div
      role="alert"
      className={clsx(
        'fixed bottom-6 right-6 z-50 max-w-md',
        'flex items-start gap-3 p-4 rounded-lg shadow-lg border',
        'bg-bg border-border',
        'transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}
    >
      {icons[type]}
      <p className="flex-1 text-sm text-fg">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-fg-muted hover:text-fg focus-ring rounded"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Toast container hook
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; props: Omit<ToastProps, 'onClose'> }>>([]);

  const showToast = (props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, props }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return {
    toasts,
    showToast,
    ToastContainer: () => (
      <>
        {toasts.map(({ id, props }) => (
          <Toast key={id} {...props} onClose={() => removeToast(id)} />
        ))}
      </>
    ),
  };
}

