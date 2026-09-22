// Footer component following ZWA patterns
import { Link } from 'react-router-dom';
import {
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from '@zwa/icons';
import { EXTERNAL_LINKS } from '@/lib/constants';

const ZWA_LOGO = `${import.meta.env.BASE_URL}zwa-logo-white.png`;

const upcomingTopics = [
  'Just Transition',
  'Plastic Policy',
  'Zero Waste Finance',
] as const;

const socialLinks = [
  { label: 'Facebook', href: EXTERNAL_LINKS.social.facebook, Icon: Facebook },
  { label: 'Instagram', href: EXTERNAL_LINKS.social.instagram, Icon: Instagram },
  { label: 'YouTube', href: EXTERNAL_LINKS.social.youtube, Icon: Youtube },
  { label: 'LinkedIn', href: EXTERNAL_LINKS.social.linkedin, Icon: Linkedin },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zwa-blue-700 bg-header-bg text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <Link to="/" className="mb-4 inline-block max-w-full">
              <img
                src={ZWA_LOGO}
                alt="Zero Waste Asia"
                className="h-14 w-auto max-w-full object-contain object-left sm:h-16 md:h-[4.25rem]"
              />
            </Link>
            <p className="text-sm leading-relaxed text-zwa-blue-400">
              ZeroWaste.Asia is an online platform that centralizes zero waste knowledge,
              resources, and tools across Asia Pacific and beyond in one place.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Topics</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-zwa-blue-400 transition-colors hover:text-zwa-gold-400"
                >
                  Organics
                </Link>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.reuseTopic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zwa-blue-400 transition-colors hover:text-zwa-gold-400"
                >
                  Reuse
                </a>
              </li>
              {upcomingTopics.map(topic => (
                <li key={topic}>
                  <span
                    className="cursor-default text-sm text-zwa-blue-400/50"
                    aria-disabled="true"
                  >
                    {topic}{' '}
                    <span className="text-xs font-medium uppercase tracking-wide">
                      (Soon)
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Connect</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/helpdesk"
                  className="flex items-center gap-2 text-sm text-zwa-blue-400 transition-colors hover:text-zwa-gold-400"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.gaiaWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zwa-blue-400 transition-colors hover:text-zwa-gold-400"
                >
                  <Globe className="h-4 w-4" />
                  GAIA Website
                </a>
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zwa-blue-700 text-zwa-blue-400 transition-colors hover:border-zwa-gold-400 hover:text-zwa-gold-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-4">
              <a
                href={EXTERNAL_LINKS.joinGaia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-contrast transition-all hover:bg-secondary-dark"
              >
                Join GAIA
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zwa-blue-700 pt-6 md:flex-row">
          <p className="text-sm text-zwa-blue-400">
            © {new Date().getFullYear()} Zero Waste Asia. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/terms"
              className="text-sm text-zwa-blue-400 transition-colors hover:text-zwa-gold-400"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-zwa-blue-400 transition-colors hover:text-zwa-gold-400"
            >
              Data Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
