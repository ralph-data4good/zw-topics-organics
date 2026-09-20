import { Link } from 'react-router-dom';
import { Container } from '@zwa/ui';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { ReactNode } from 'react';

export function Privacy() {
  usePageTitle('Data Privacy');

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: 'Topics', href: '/' },
          { label: 'Organics', href: '/' },
          { label: 'Data Privacy' },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-fg md:text-3xl">Privacy Notice</h1>
        <p className="mb-8 text-sm text-fg-muted">Last updated: 11 September 2025</p>

        <p className="mb-6 text-base leading-relaxed text-fg">
          This Privacy Notice explains how we collect, use, disclose, and protect personal data across
          our websites and tools. Please read it alongside our{' '}
          <Link to="/terms" className="font-medium text-primary hover:underline">
            Terms of Service
          </Link>
          .
        </p>

        <Section title="1) Who we are and how this Notice applies">
          <p>
            Zero Waste Asia is a GAIA Asia Pacific and Asia Home of Solutions Collective initiative that
            aggregates and visualizes zero waste knowledge contributed by members and the public. This
            Notice applies to all users, including those in the Philippines and Indonesia.
          </p>
        </Section>

        <Section title="2) Summary (key points)">
          <ul>
            <li>
              We collect only what is needed to provide the service, keep the community safe, and meet
              legal obligations.
            </li>
            <li>
              Users control account information and may request access, correction, deletion, or
              portability subject to legal limits.
            </li>
            <li>We do not sell personal data and do not run third-party advertising trackers.</li>
            <li>
              Community safety is a priority: avoid uploading sensitive personal data (for example,
              government IDs or exact home addresses).
            </li>
          </ul>
        </Section>

        <Section title="3) What we collect">
          <ul>
            <li>
              Account and profile data: name, email, password (hashed), country, language, and optional
              fields.
            </li>
            <li>
              Organization verification data when “Verified by Org” is requested.
            </li>
            <li>Contributions such as resource listings, directory entries, and images.</li>
            <li>Community signals: endorsements and flags, including reason codes and timestamps.</li>
            <li>
              Device and usage data: IP address (truncated where feasible), browser/OS, pages viewed,
              referral, and timestamps for security and analytics.
            </li>
            <li>Communications you send to us (support, privacy, or security reports).</li>
          </ul>
        </Section>

        <Section title="4) Why we collect it">
          <ul>
            <li>Provide and improve the service (accounts, submissions, search, display).</li>
            <li>Community safety and integrity (verification, moderation, abuse prevention).</li>
            <li>Security (fraud monitoring, access control, audit logs, incident response).</li>
            <li>Privacy-preserving analytics (no third-party ad tracking).</li>
            <li>Legal compliance and transactional communications.</li>
          </ul>
        </Section>

        <Section title="5) Legal bases for processing">
          <p>
            Depending on the activity, we rely on consent for optional features, contract to provide
            core features, legitimate interests to keep services secure and useful, and legal
            obligation or public interest when retention or disclosure is required.
          </p>
        </Section>

        <Section title="6) Children and vulnerable persons">
          <p>
            Services are for general audiences. If under 18, use only with parental or guardian consent.
            Avoid submitting information that could identify or endanger vulnerable individuals or
            groups.
          </p>
        </Section>

        <Section title="7) Sharing and disclosure">
          <ul>
            <li>
              Service providers (processors) for hosting, email, analytics, error monitoring, and file
              storage—bound by contracts to protect data.
            </li>
            <li>
              Limited sharing with named organizations to confirm affiliation for verification
              requests.
            </li>
            <li>Public content: contributions and visible profile fields may be displayed publicly.</li>
            <li>
              Legal and safety disclosures when required by law or to protect users, communities, and
              services.
            </li>
          </ul>
        </Section>

        <Section title="8) International transfers">
          <p>
            We may process data on infrastructure outside your country. When transferring personal data
            internationally, we apply appropriate safeguards so your rights travel with your data,
            including compliance with Indonesia’s PDP Law Article 56 where applicable.
          </p>
        </Section>

        <Section title="9) How long we keep information">
          <ul>
            <li>
              Account data: retained for the life of the account; delete or anonymize within 90 days
              after closure unless legal retention applies.
            </li>
            <li>Community signals and moderation logs: about 24 months.</li>
            <li>Server logs and security telemetry: about 12 months.</li>
            <li>Backups: rolling retention up to 90 days.</li>
            <li>Published contributions: retained while published.</li>
          </ul>
        </Section>

        <Section title="10) Your choices and rights">
          <p>Subject to local law, you may request:</p>
          <ul>
            <li>Access, rectification, and deletion</li>
            <li>Restriction or objection to certain processing</li>
            <li>Portability of structured, machine-readable data where feasible</li>
            <li>Withdrawal of consent for consent-based processing</li>
          </ul>
          <p>Identity may be verified before certain requests are fulfilled. Target response time: 30 days.</p>
        </Section>

        <Section title="11) How to exercise rights and how to complain">
          <p>
            Contact{' '}
            <a href="mailto:report@zerowaste.asia" className="font-medium text-primary hover:underline">
              report@zerowaste.asia
            </a>{' '}
            with your request and the email tied to your account.
          </p>
          <ul>
            <li>Philippines: National Privacy Commission</li>
            <li>Indonesia: Ministry of Communication and Informatics (Kominfo)</li>
          </ul>
        </Section>

        <Section title="12) Security measures">
          <p>
            We use encryption in transit, least-privilege access with admin 2FA where applicable, audit
            logging, secure development practices, and incident response. Report security issues to
            report@zerowaste.asia. Where a notifiable personal data breach occurs, we aim to notify the
            relevant authority and affected individuals within 72 hours of knowledge or discovery, in
            line with applicable Philippine and Indonesian requirements.
          </p>
        </Section>

        <Section title="13) Community safety and sensitive data">
          <ul>
            <li>
              Avoid uploading government IDs, precise home addresses of private individuals, or
              medical/financial records.
            </li>
            <li>
              When mapping facilities connected to vulnerable communities, use generalized locations or
              organizational contacts and obtain consent where needed.
            </li>
            <li>Use flagging tools to report content that may expose people to risk.</li>
          </ul>
        </Section>

        <Section title="14) Cookies and similar technologies">
          <ul>
            <li>Essential: login sessions and security (cannot be turned off).</li>
            <li>Preferences: language and accessibility settings (optional).</li>
            <li>Analytics: first-party or privacy-preserving analytics; no third-party ad trackers.</li>
          </ul>
        </Section>

        <Section title="15) Data about other people">
          <p>
            Only submit information about others with consent or another legal basis, and only if
            sharing will not put them at risk. Anonymize where possible.
          </p>
        </Section>

        <Section title="16) Automated decision-making">
          <p>
            No legally significant decisions are made solely by automated processing. Community
            verification thresholds are automated signals; admins can review and override decisions.
            Appeals may be submitted via report@zerowaste.asia.
          </p>
        </Section>

        <Section title="17) Changes to this Notice">
          <p>
            The “Last updated” date shows the latest revision. For material changes, notice will be
            provided through the service or by email. Continued use after changes indicates acceptance.
          </p>
        </Section>

        <Section title="18) Contact">
          <ul>
            <li>
              General:{' '}
              <a href="mailto:hello@zerowaste.asia" className="font-medium text-primary hover:underline">
                hello@zerowaste.asia
              </a>
            </li>
            <li>
              Privacy, reports, and other concerns:{' '}
              <a href="mailto:report@zerowaste.asia" className="font-medium text-primary hover:underline">
                report@zerowaste.asia
              </a>
            </li>
            <li>
              Data Protection Officer:{' '}
              <a href="mailto:dpo@zerowaste.asia" className="font-medium text-primary hover:underline">
                dpo@zerowaste.asia
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-fg-muted">
            Adapted from{' '}
            <a
              href="https://zerowaste.asia/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              zerowaste.asia/privacy
            </a>
            .
          </p>
        </Section>
      </article>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold text-fg">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed text-fg-muted [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
