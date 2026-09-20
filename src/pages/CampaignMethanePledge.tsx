// Campaign page - Methane Pledge
import { Container, Section, SectionTitle, Button, Card, CardContent, Accordion, type AccordionItemData } from '@zwa/ui';
import { Leaf, Network, Users } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { METHANE_PLEDGE_CAMPAIGN } from '@/lib/data';
import { formatNumber } from '@/lib/format';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { trackConversion } from '@/lib/analytics';

export function CampaignMethanePledge() {
  usePageTitle('The Methane Pledge');

  const faqItems: AccordionItemData[] =
    METHANE_PLEDGE_CAMPAIGN.faqs?.map((faq, index) => ({
      id: `faq-${index}`,
      title: faq.question,
      content: <p className="text-sm leading-relaxed sm:text-base">{faq.answer}</p>,
    })) || [];

  return (
    <div>
      {/* Hero Banner with Image */}
      <div className="relative min-h-[420px] overflow-hidden sm:min-h-[500px] md:min-h-[560px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070')",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <Container className="relative flex h-full flex-col justify-center py-10 sm:py-16 md:py-20">
          <Breadcrumbs
            items={[
              { label: 'Topics', href: '/' },
              { label: 'Organics', href: '/' },
              { label: 'The Methane Pledge' },
            ]}
          />
          <div className="mb-4 mt-4 sm:mb-6 sm:mt-8">
            <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/90 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20">
                <Leaf className="h-7 w-7 text-white sm:h-10 sm:w-10" />
              </div>
              <h1 className="text-2xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
                {METHANE_PLEDGE_CAMPAIGN.title}
              </h1>
            </div>
          </div>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-white drop-shadow-md sm:mb-8 sm:text-lg md:text-xl">
            {METHANE_PLEDGE_CAMPAIGN.summary}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href={METHANE_PLEDGE_CAMPAIGN.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackConversion('methane_pledge_sign')}
            >
              <Button variant="primary" size="lg" className="w-full shadow-xl sm:w-auto">
                <Leaf className="h-5 w-5" />
                {METHANE_PLEDGE_CAMPAIGN.ctaLabel}
              </Button>
            </a>
            <a
              href={EXTERNAL_LINKS.citiesNetwork}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              onClick={() => trackConversion('cities_network')}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white bg-white/10 text-white shadow-xl backdrop-blur-sm hover:bg-white hover:text-fg sm:w-auto"
              >
                <Network className="h-5 w-5" />
                Explore the Cities Network
              </Button>
            </a>
          </div>
          <p className="mt-6 text-xs text-white/80">
            Source:{' '}
            <a
              href="https://www.no-burn.org/the-cities-methane-pledge/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zwa-gold-400 hover:underline"
            >
              GAIA - Global Alliance for Incinerator Alternatives
            </a>
          </p>
        </Container>
      </div>

      <Container>
        {/* Stats Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-fg mb-6">Campaign Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METHANE_PLEDGE_CAMPAIGN.stats.map((stat, index) => (
              <Card key={index} className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {formatNumber(stat.value, 0)}
                  </div>
                  <p className="text-sm text-fg-muted">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why It Matters - with image */}
        <Section className="mb-12">
          <SectionTitle>Why Methane Matters</SectionTitle>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="prose prose-sm max-w-none">
                <p className="text-fg-muted leading-relaxed mb-4">
                  Methane (CH₄) is a powerful greenhouse gas responsible for roughly 30% of global temperature rise since pre-industrial times. While it doesn't last as long in the atmosphere as CO₂, methane is over 80 times more potent at warming over a 20-year period.
                </p>
                <p className="text-fg-muted leading-relaxed">
                  Organic waste in landfills is a major source of methane emissions. When food waste, yard trimmings, and other organics decompose without oxygen in landfills, they release methane into the atmosphere. By diverting these materials through composting or other sustainable methods, we can dramatically reduce emissions while creating valuable soil amendments.
                </p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg border border-border">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070" 
                alt="Landfill waste"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-muted rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-green-500 mb-2">40-60%</div>
              <p className="text-sm text-fg-muted">
                of municipal solid waste in Asia is organic material
              </p>
            </div>
            <div className="bg-bg-muted rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-2">0.5 t</div>
              <p className="text-sm text-fg-muted">
                CO₂e avoided per tonne of organics diverted from landfills
              </p>
            </div>
            <div className="bg-bg-muted rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-secondary mb-2">12%</div>
              <p className="text-sm text-fg-muted">
                of global methane emissions come from landfills
              </p>
            </div>
          </div>
        </Section>

        {/* How to Participate - with images */}
        <Section className="mb-12">
          <SectionTitle>How to Participate</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-md border border-border">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070" 
                alt="Community pledge"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-bg">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-fg mb-2">Take the Pledge</h3>
                <p className="text-fg-muted leading-relaxed text-sm">
                  Commit to diverting organic waste from landfills in your household, organization, or community. Every action counts toward reducing methane emissions.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md border border-border">
              <img 
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070" 
                alt="Composting solutions"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-bg">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-fg mb-2">Implement Solutions</h3>
                <p className="text-fg-muted leading-relaxed text-sm">
                  Start composting, participate in organic waste collection programs, or advocate for policy changes in your area. Use our resources and toolkits to get started.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md border border-border">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070" 
                alt="Community collaboration"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-bg">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-fg mb-2">Track & Share</h3>
                <p className="text-fg-muted leading-relaxed text-sm">
                  Use our calculator to estimate your impact and share your progress with the community. Inspire others to join the movement toward zero organic waste to landfill.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-fg mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion items={faqItems} />
          </div>
        )}

        {/* CTA Section */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-primary/5">
          <CardContent className="p-5 text-center sm:p-8 md:p-10">
            <Users className="mx-auto mb-4 h-12 w-12 text-green-500 sm:h-16 sm:w-16" />
            <h3 className="mb-3 text-xl font-bold text-fg sm:text-2xl">Join the Community</h3>
            <p className="mx-auto mb-6 max-w-2xl text-sm text-fg-muted sm:text-base">
              Be part of a growing movement of individuals, organizations, and cities committed to reducing methane emissions through organic waste diversion.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={METHANE_PLEDGE_CAMPAIGN.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('methane_pledge_sign')}
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Leaf className="h-5 w-5" />
                  {METHANE_PLEDGE_CAMPAIGN.ctaLabel}
                </Button>
              </a>
              <a
                href={EXTERNAL_LINKS.citiesNetwork}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('cities_network')}
              >
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Network className="h-5 w-5" />
                  Explore the Cities Network
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

