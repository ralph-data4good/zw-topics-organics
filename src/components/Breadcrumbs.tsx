// Breadcrumbs component
import { Link } from 'react-router-dom';
import { ChevronRight } from '@zwa/icons';
import { clsx } from 'clsx';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Use on dark hero backgrounds so the current crumb stays readable */
  variant?: 'default' | 'onDark';
}

export function Breadcrumbs({ items, variant = 'default' }: BreadcrumbsProps) {
  const onDark = variant === 'onDark';

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className={clsx('h-4 w-4', onDark ? 'text-white/60' : 'text-fg-muted')}
                />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={clsx(
                    'focus-ring rounded',
                    onDark
                      ? 'text-zwa-blue-400 hover:text-zwa-gold-400 hover:underline'
                      : 'text-primary hover:underline'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast && onDark
                      ? 'rounded-full border border-zwa-gold-400/80 bg-zwa-gold-400/10 px-3 py-0.5 font-semibold text-zwa-gold-400'
                      : isLast
                        ? 'font-medium text-fg'
                        : 'text-fg-muted'
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
