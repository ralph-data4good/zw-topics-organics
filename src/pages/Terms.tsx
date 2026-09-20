import { Link } from 'react-router-dom';
import { Container } from '@zwa/ui';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { ReactNode } from 'react';

export function Terms() {
  usePageTitle('Terms of Service');

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: 'Topics', href: '/' },
          { label: 'Organics', href: '/' },
          { label: 'Terms' },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-fg md:text-3xl">Terms of Service</h1>
        <p className="mb-8 text-sm text-fg-muted">Last updated: 11 September 2025</p>

        <p className="mb-6 text-base leading-relaxed text-fg">
          These Terms govern your use of Zero Waste Asia. Please read them alongside our{' '}
          <Link to="/privacy" className="font-medium text-primary hover:underline">
            Privacy Notice
          </Link>
          .
        </p>

        <Section title="1) What this covers">
          <p>
            These Terms govern your use of Zero Waste Asia websites, microsites, and tools, including
            contributing entries, endorsing or flagging community content, and creating an account. By
            using the Service, you agree to these Terms and to our Privacy Notice.
          </p>
        </Section>

        <Section title="2) Who we are">
          <p>
            Zero Waste Asia is a GAIA Asia Pacific and the Asia Home of Solutions Collective initiative
            that aggregates and visualizes zero waste knowledge from members and the public. “We,”
            “our,” and “us” refer to the operators of the platform. The platform may exercise editorial
            discretion to prioritize community safety and data integrity; labels and scores are
            community signals and not guarantees.
          </p>
        </Section>

        <Section title="3) Accounts and access">
          <ul>
            <li>You must create an account to contribute, endorse, or flag content on the main platform.</li>
            <li>
              Roles control admin access (Admin and Super Admin). User types on the frontend include
              Registered or Verified by Organization.
            </li>
            <li>You are responsible for the security of your account. Use a strong password.</li>
            <li>
              You must be legally able to consent to these Terms under your local law. If you are under
              18, you represent that you have parental or guardian consent.
            </li>
          </ul>
        </Section>

        <Section title="4) Organizations and verification">
          <p>
            “Verified by” badges indicate that an account has been validated as belonging to a listed
            organization. A badge is informational and is not an endorsement by Zero Waste Asia. We may
            revoke or suspend verification if we cannot validate affiliation or if we detect abuse.
          </p>
        </Section>

        <Section title="5) Submissions and licenses">
          <p>
            “Content” means any material you submit, including resource listings, directory entries,
            text, data, images, maps, or attachments.
          </p>
          <ul>
            <li>You retain ownership of your Content.</li>
            <li>
              You grant us a worldwide, non-exclusive, royalty-free license to host, cache, index,
              display, adapt for formatting, and distribute your Content through the Service.
            </li>
            <li>
              You may choose to release contributions under a Creative Commons license such as CC BY
              4.0 when that option is available.
            </li>
            <li>
              You confirm that you have the rights to submit the Content and that it does not violate
              third-party rights, confidentiality obligations, or applicable law.
            </li>
          </ul>
        </Section>

        <Section title="6) Community signals and moderation">
          <p>
            Users may endorse or flag entries. Items may display status labels such as Unverified,
            Community-Verified, Verified by Organization, or Staff-Verified. These labels are signals,
            not guarantees. Admins may soft-lock, hide, edit for formatting, request changes, merge
            duplicates, or remove content to protect users and data quality.
          </p>
        </Section>

        <Section title="7) Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>
              Upload malware, perform scraping at a rate that harms the Service, attempt unauthorized
              access, or test security without permission.
            </li>
            <li>
              Submit personal data of other people unless you have consent or a clear legal basis.
            </li>
            <li>Post disinformation, doxxing, threats, or hate content.</li>
            <li>
              Submit or link to illegal content, including content that violates intellectual property
              or privacy laws.
            </li>
          </ul>
        </Section>

        <Section title="8) Data protection and safety">
          <p>
            We apply data minimization, access control, and audit logging, and strive to comply with
            applicable laws, including the Philippines’ Data Privacy Act and Indonesia’s Personal Data
            Protection Law. Do not upload government IDs, exact home addresses of private individuals,
            or other sensitive personal data. See the Privacy Notice for full details.
          </p>
        </Section>

        <Section title="9) Third-party services">
          <p>
            We may use third-party services for hosting, analytics, maps, forms, email, and file
            storage. Your use of those services may be subject to their terms.
          </p>
        </Section>

        <Section title="10) Security and responsible disclosure">
          <p>
            If you discover a security issue, email{' '}
            <a href="mailto:report@zerowaste.asia" className="font-medium text-primary hover:underline">
              report@zerowaste.asia
            </a>{' '}
            with enough detail to reproduce the problem. Please avoid accessing other users’ data or
            disrupting the Service, and give us a reasonable time to fix the issue before public
            disclosure.
          </p>
        </Section>

        <Section title="11) Takedowns and disputes">
          <p>
            Report issues via flagging tools where available, or email report@zerowaste.asia with the
            URL and reason. We may remove or restrict content to comply with law, protect users, or
            preserve data quality.
          </p>
        </Section>

        <Section title="12) Availability and changes">
          <p>
            The Service is provided “as is” and “as available.” We may change features, set limits, or
            stop the Service. We will try to give reasonable notice of material changes where possible.
          </p>
        </Section>

        <Section title="13) Disclaimers">
          <p>
            The Service aggregates information contributed by many parties. We do not guarantee
            accuracy, completeness, or fitness for a particular purpose. Analyses, maps, and
            visualizations may contain errors or be incomplete. Information and tools are for general
            informational and educational purposes only and do not constitute professional or legal
            advice.
          </p>
        </Section>

        <Section title="14) Limitation of liability">
          <p>
            To the extent permitted by law, we will not be liable for indirect, incidental, special,
            consequential, or punitive damages, or for loss of data, profits, goodwill, or other
            intangible losses arising from your use of the Service.
          </p>
        </Section>

        <Section title="15) Termination">
          <p>
            You may stop using the Service at any time. We may suspend or terminate access if you
            violate these Terms or if needed for security, legal, or operational reasons.
          </p>
        </Section>

        <Section title="16) Governing law">
          <p>
            These Terms will be governed by applicable law where the Service is operated and where you
            reside. For users in the Philippines, Philippine law applies on a non-exclusive basis. For
            users in Indonesia, Indonesian law applies on a non-exclusive basis. Mandatory consumer or
            data protection rights in your country still apply.
          </p>
        </Section>

        <Section title="17) Changes to these Terms">
          <p>
            We may update these Terms. We will post the new date at the top and, for material changes,
            notify you through the Service or by email. Continued use after changes means you accept
            the updated Terms.
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
          </ul>
          <p className="mt-4 text-sm text-fg-muted">
            Adapted from{' '}
            <a
              href="https://zerowaste.asia/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              zerowaste.asia/terms-of-service
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
