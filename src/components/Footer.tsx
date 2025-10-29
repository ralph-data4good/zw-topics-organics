// Footer component following ZWA patterns
import { Link } from 'react-router-dom';
import { Mail, Globe, Leaf } from '@zwa/icons';

export function Footer() {
  return (
    <footer className="bg-header-bg text-white border-t border-zwa-blue-700 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Zero Waste Asia
            </h3>
            <p className="text-sm text-zwa-blue-400 leading-relaxed">
              Building a sustainable future through waste reduction, organics diversion, and circular economy solutions across Asia.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Topics</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Organics
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Reuse
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Reduction
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/map" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/helpdesk" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
                  Help Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@zerowasteasia.org"
                  className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://zerowasteasia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Main Website
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/campaign/methane-pledge">
                <button className="bg-secondary hover:bg-secondary-dark text-secondary-contrast px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  Join the Movement
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zwa-blue-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zwa-blue-400">
            © {new Date().getFullYear()} Zero Waste Asia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-zwa-blue-400 hover:text-zwa-gold-400 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

