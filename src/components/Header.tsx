// Header component following ZWA patterns
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from '@zwa/icons';
import { Button } from '@zwa/ui';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { trackConversion } from '@/lib/analytics';

const SITE_LOGO = `${import.meta.env.BASE_URL}zwa-organics-logo.png`;

type NavItem =
  | { label: string; to: string; external?: false }
  | { label: string; href: string; external: true; track?: 'map_explore' | 'resources_browse' };

const NAV_LINKS: NavItem[] = [
  { to: '/', label: 'Home' },
  {
    label: 'Map & Directory',
    href: EXTERNAL_LINKS.directory,
    external: true,
    track: 'map_explore',
  },
  {
    label: 'Resources',
    href: EXTERNAL_LINKS.resources,
    external: true,
    track: 'resources_browse',
  },
  { to: '/helpdesk', label: 'Help Desk' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass =
    'focus-ring rounded px-2 py-1 text-sm font-medium text-white transition-colors hover:text-zwa-gold-400';
  const mobileLinkClass =
    'focus-ring rounded px-2 py-3 font-medium text-white transition-colors hover:text-zwa-gold-400';

  return (
    <header className="sticky top-0 z-40 border-b border-zwa-blue-700 bg-header-bg shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link to="/" className="focus-ring min-w-0 shrink rounded py-1">
            <img
              src={SITE_LOGO}
              alt="Zero Waste Asia | Organics"
              className="h-8 w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-10 sm:max-w-[280px]"
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map(link =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  onClick={() => link.track && trackConversion(link.track)}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.to} to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Link to="/campaign/methane-pledge">
              <Button variant="primary" size="sm">
                Take the Pledge
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus-ring rounded p-2 text-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-zwa-blue-700 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(link =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mobileLinkClass}
                    onClick={() => {
                      link.track && trackConversion(link.track);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                to="/campaign/methane-pledge"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2"
              >
                <Button variant="primary" size="sm" className="w-full">
                  Take the Pledge
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
