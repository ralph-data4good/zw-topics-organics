// Header component following ZWA patterns
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from '@zwa/icons';
import { Button } from '@zwa/ui';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-header-bg border-b border-zwa-blue-700 sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 focus-ring rounded">
            <div className="text-white font-bold text-lg">Zero Waste Asia</div>
            <span className="hidden md:inline text-zwa-gold-400 text-sm">| Organics</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-white hover:text-zwa-gold-400 transition-colors text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Home
            </Link>
            <Link
              to="/map"
              className="text-white hover:text-zwa-gold-400 transition-colors text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Map & Directory
            </Link>
            <Link
              to="/resources"
              className="text-white hover:text-zwa-gold-400 transition-colors text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Resources
            </Link>
            <Link
              to="/calculator"
              className="text-white hover:text-zwa-gold-400 transition-colors text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Calculator
            </Link>
            <Link
              to="/helpdesk"
              className="text-white hover:text-zwa-gold-400 transition-colors text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Help Desk
            </Link>
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link to="/campaign/methane-pledge">
              <Button variant="primary" size="sm">
                Take the Pledge
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus-ring rounded p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zwa-blue-700">
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-zwa-gold-400 transition-colors font-medium py-2 focus-ring rounded"
              >
                Home
              </Link>
              <Link
                to="/map"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-zwa-gold-400 transition-colors font-medium py-2 focus-ring rounded"
              >
                Map & Directory
              </Link>
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-zwa-gold-400 transition-colors font-medium py-2 focus-ring rounded"
              >
                Resources
              </Link>
              <Link
                to="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-zwa-gold-400 transition-colors font-medium py-2 focus-ring rounded"
              >
                Calculator
              </Link>
              <Link
                to="/helpdesk"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-zwa-gold-400 transition-colors font-medium py-2 focus-ring rounded"
              >
                Help Desk
              </Link>
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

