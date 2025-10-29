// Breadcrumbs component
import { Link } from 'react-router-dom';
import { ChevronRight } from '@zwa/icons';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4 text-fg-muted" />}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-primary hover:underline focus-ring rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-fg font-medium' : 'text-fg-muted'}>
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

