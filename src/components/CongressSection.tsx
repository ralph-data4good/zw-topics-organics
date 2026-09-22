import { Button } from '@zwa/ui';
import { Calendar, ExternalLink, Video } from '@zwa/icons';
import { CONGRESS_EVENT, EXTERNAL_LINKS } from '@/lib/constants';
import { trackConversion } from '@/lib/analytics';

const BG = `${import.meta.env.BASE_URL}congress-bg.png`;
const PARTNERS = `${import.meta.env.BASE_URL}congress-partners.png`;

export function CongressSection() {
  const livestream = EXTERNAL_LINKS.congress.livestream;

  return (
    <section
      className="relative mb-10 overflow-hidden rounded-xl border border-border sm:mb-12"
      aria-labelledby="congress-heading"
    >
      {/* Soft organics photo — sits behind content, fades into the page */}
      <div
        className="pointer-events-none absolute inset-0 bg-[length:min(720px,110%)] bg-right-top bg-no-repeat opacity-90 sm:bg-[length:min(820px,95%)]"
        style={{ backgroundImage: `url(${BG})` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/95 to-bg/40 sm:to-bg/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/80 to-transparent"
        aria-hidden
      />

      <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
            2nd Regional Organics Congress
          </p>
          <h2
            id="congress-heading"
            className="text-xl font-bold leading-tight text-fg sm:text-2xl md:text-3xl"
          >
            {CONGRESS_EVENT.title}
          </h2>
          <p className="mt-3 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
            <span>{CONGRESS_EVENT.dates}</span>
            <span aria-hidden>·</span>
            <span>{CONGRESS_EVENT.location}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
            {CONGRESS_EVENT.about}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
            {livestream ? (
              <a
                href={livestream}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                onClick={() => trackConversion('congress_livestream')}
              >
                <Button variant="primary" size="sm" className="w-full sm:w-auto">
                  <Video className="h-4 w-4" />
                  Livestream Link
                </Button>
              </a>
            ) : (
              <Button
                variant="primary"
                size="sm"
                disabled
                className="w-full sm:w-auto"
                title="Livestream link coming soon"
              >
                <Video className="h-4 w-4" />
                Livestream (Soon)
              </Button>
            )}
            <a
              href={EXTERNAL_LINKS.congress.schedule}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackConversion('congress_schedule')}
            >
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </a>
            <a
              href={EXTERNAL_LINKS.congress.moreDetails}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackConversion('congress_details')}
            >
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                <ExternalLink className="h-4 w-4" />
                More Details
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-5 max-w-md sm:mt-6">
          <p className="mb-2 text-xs leading-relaxed text-fg-muted sm:text-sm">
            Made possible through the generous support of our partners:
          </p>
          <img
            src={PARTNERS}
            alt="Partner logos: Global Methane Hub, Sequoia Climate Foundation, um Fund, and Plastic Solutions Fund"
            className="w-full max-w-sm rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
