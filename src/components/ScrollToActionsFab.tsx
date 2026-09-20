import { useEffect, useState } from 'react';
import { ChevronDown } from '@zwa/icons';

const TARGET_ID = 'quick-actions';

export function ScrollToActionsFab() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(TARGET_ID);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    document.getElementById(TARGET_ID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to Quick Actions"
      className="fixed bottom-5 left-1/2 z-30 flex min-h-11 -translate-x-1/2 items-center gap-1.5 rounded-full border border-primary/20 bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:bottom-8"
    >
      <span>Quick actions</span>
      <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
    </button>
  );
}
