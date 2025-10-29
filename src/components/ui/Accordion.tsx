// Accordion component following ZWA design system
// Shim for @zwa/ui Accordion
// TODO: replace with @zwa/ui when available

import { useState, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from './icons';

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={clsx('space-y-3', className)}>
      {items.map(item => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className="border border-border rounded-lg bg-bg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-bg-muted transition-all focus-ring"
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg font-semibold text-fg pr-4">
                {item.title}
              </span>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 text-fg-muted flex-shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 md:px-6 pb-4 md:pb-6 text-fg-muted leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

