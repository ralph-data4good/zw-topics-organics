// Home page - Organics Topic Microsite
import { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Accordion, type AccordionItemData } from '@zwa/ui';
import {
  Leaf,
  MapIcon,
  Calculator as CalculatorIcon,
  Search,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Upload,
} from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { formatDate } from '@/lib/format';
import { TOPIC_LABELS } from '@/lib/types';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CongressSection } from '@/components/CongressSection';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { trackConversion } from '@/lib/analytics';
import { getFeaturedResourcesSnapshot, subscribeAdminStore } from '@/lib/admin-store';

export function Home() {
  usePageTitle('Organics');

  const featuredResources = useSyncExternalStore(
    subscribeAdminStore,
    getFeaturedResourcesSnapshot,
    getFeaturedResourcesSnapshot
  );

  const actionItems: AccordionItemData[] = [
    {
      id: 'search-info',
      title: 'Search Directory & Information',
      content: (
        <div>
          <p className="mb-4 text-sm sm:text-base">
            Find composting facilities, organic waste initiatives, and organizations working on organics diversion across Asia.
          </p>
          <a
            href={EXTERNAL_LINKS.directory}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('map_explore')}
          >
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              <MapIcon className="h-4 w-4" />
              Explore Map & Directory
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      ),
    },
    {
      id: 'library',
      title: 'Resource Library',
      content: (
        <div>
          <p className="mb-4 text-sm sm:text-base">
            Access toolkits, case studies, and research on organic waste management and composting best practices.
          </p>
          <a
            href={EXTERNAL_LINKS.resources}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('resources_browse')}
          >
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              <Search className="h-4 w-4" />
              Browse Resources
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      ),
    },
    {
      id: 'tools',
      title: 'Tools & Calculators',
      content: (
        <div>
          <p className="mb-4 text-sm sm:text-base">
            Calculate the impact of organic waste diversion and estimate methane emission reductions from your program.
          </p>
          <a
            href={EXTERNAL_LINKS.calculator}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('calculator_open')}
          >
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              <CalculatorIcon className="h-4 w-4" />
              Open Calculator
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-organics.png)` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-header-bg/75" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-header-bg/90 via-header-bg/70 to-header-bg/45"
          aria-hidden
        />
        <Container className="relative py-10 sm:py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: 'Topics', href: '/' },
              { label: 'Organics' },
            ]}
          />
          <h1 className="mb-4 text-3xl font-extrabold leading-tight drop-shadow-sm sm:mb-6 sm:text-4xl md:text-6xl">
            Turning Food Waste into
            <br />
            <span className="text-green-500">Climate Solutions</span>
          </h1>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-white/90 sm:mb-8 sm:text-lg md:text-xl">
            Organic waste represents 40-60% of municipal solid waste in Asia. When diverted from landfills through composting and sustainable treatment, it becomes a powerful tool for methane reduction and soil health.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link to="/campaign/methane-pledge" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Leaf className="h-5 w-5" />
                Take the Methane Pledge
              </Button>
            </Link>
            <a
              href={EXTERNAL_LINKS.directory}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackConversion('map_explore')}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white hover:text-header-bg sm:w-auto"
              >
                <MapIcon className="h-5 w-5" />
                Explore Directory
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        {/* Regional Organics Congress */}
        <CongressSection />

        {/* Action Accordion */}
        <div className="mb-10 sm:mb-12">
          <h2 className="mb-4 text-xl font-bold text-fg sm:mb-6 sm:text-2xl md:text-3xl">Quick Actions</h2>
          <Accordion items={actionItems} defaultOpen={['search-info']} />
        </div>

        {/* Join the Academy */}
        <Card className="mb-10 border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent sm:mb-12">
          <CardContent className="p-5 sm:p-8 md:p-10">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary sm:h-20 sm:w-20">
                  <GraduationCap className="h-8 w-8 text-secondary-contrast sm:h-10 sm:w-10" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="mb-2 text-xl font-bold text-fg sm:text-2xl">Join the Academy</h3>
                <p className="text-sm text-fg-muted sm:text-base">
                  Learn organics management as climate action through Zero Waste Asia&apos;s online course—practical training for cities, practitioners, and advocates.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <a
                  href={EXTERNAL_LINKS.academy}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('academy_join')}
                >
                  <Button variant="primary" size="lg" className="w-full md:w-auto">
                    <GraduationCap className="h-5 w-5" />
                    Join the Academy
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Resources */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-fg sm:text-2xl md:text-3xl">Featured Resources</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href={EXTERNAL_LINKS.contribute}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('resource_contribute')}
              >
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Upload className="h-4 w-4" />
                  Contribute Resource
                </Button>
              </a>
              <a
                href={EXTERNAL_LINKS.resources}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('resources_browse')}
              >
                <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                  View All
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {featuredResources.map(resource => (
              <Link
                key={resource.id}
                to={`/resources/${resource.slug}`}
                onClick={() => trackConversion('resource_click')}
              >
                <Card hover className="h-full">
                  {resource.cover && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                      <img
                        src={resource.cover}
                        alt={resource.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {resource.topics.map(topic => (
                        <Badge key={topic} variant="green">
                          {TOPIC_LABELS[topic] ?? topic}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-base font-bold text-fg sm:text-lg">
                      {resource.title}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-fg-muted">{resource.summary}</p>
                    <p className="text-xs text-fg-muted">{formatDate(resource.publishDate)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Calculator Teaser */}
        <Card className="mb-10 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent sm:mb-12">
          <CardContent className="p-5 sm:p-8 md:p-10">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary sm:h-20 sm:w-20">
                  <CalculatorIcon className="h-8 w-8 text-white sm:h-10 sm:w-10" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="mb-2 text-xl font-bold text-fg sm:text-2xl">Organics Diversion Calculator</h3>
                <p className="text-sm text-fg-muted sm:text-base">
                  Calculate the environmental impact of your organic waste diversion program. Estimate annual tonnage diverted and methane emissions avoided.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <a
                  href={EXTERNAL_LINKS.calculator}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('calculator_open')}
                >
                  <Button variant="secondary" size="lg" className="w-full md:w-auto">
                    <CalculatorIcon className="h-5 w-5" />
                    Open Calculator
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Band */}
        <div className="mb-10 sm:mb-12">
          <h2 className="mb-4 text-xl font-bold text-fg sm:mb-6 sm:text-2xl md:text-3xl">Take Action</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <Card hover className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
              <CardContent className="p-5 sm:p-8">
                <Leaf className="mb-4 h-10 w-10 text-green-500 sm:h-12 sm:w-12" />
                <h3 className="mb-3 text-lg font-bold text-fg sm:text-xl">The Methane Pledge</h3>
                <p className="mb-6 text-sm text-fg-muted sm:text-base">
                  Join thousands of individuals and organizations committed to reducing methane emissions through organic waste diversion.
                </p>
                <Link to="/campaign/methane-pledge">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Learn More & Join
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent">
              <CardContent className="p-5 sm:p-8">
                <ExternalLink className="mb-4 h-10 w-10 text-secondary sm:h-12 sm:w-12" />
                <h3 className="mb-3 text-lg font-bold text-fg sm:text-xl">Need Help?</h3>
                <p className="mb-6 text-sm text-fg-muted sm:text-base">
                  Our team of experts can help you plan and implement organic waste management programs in your community.
                </p>
                <Link to="/helpdesk">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Contact Help Desk
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
