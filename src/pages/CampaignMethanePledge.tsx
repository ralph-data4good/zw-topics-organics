// Campaign page - Methane Pledge
import { Container, Section, SectionTitle, Button, Card, CardContent, Accordion, type AccordionItemData } from '@zwa/ui';
import { Leaf, Share2, Users } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { METHANE_PLEDGE_CAMPAIGN } from '@/lib/data';
import { formatNumber } from '@/lib/format';

export function CampaignMethanePledge() {
  usePageTitle('The Methane Pledge');

  const faqItems: AccordionItemData[] =
    METHANE_PLEDGE_CAMPAIGN.faqs?.map((faq, index) => ({
      id: `faq-${index}`,
      title: faq.question,
      content: <p className="text-base leading-relaxed">{faq.answer}</p>,
    })) || [];

  const handleShare = async () => {
    const url = window.location.href;
    const text = 'Join me in taking the Methane Pledge to reduce organic waste emissions!';

    if (navigator.share) {
      try {
        await navigator.share({ title: METHANE_PLEDGE_CAMPAIGN.title, text, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-500/20 via-primary/10 to-transparent border-b border-border">
        <Container className="py-16 md:py-20">
          <Breadcrumbs
            items={[
              { label: 'Topics', href: '/' },
              { label: 'Organics', href: '/' },
              { label: 'The Methane Pledge' },
            ]}
          />
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-xl bg-green-500 flex items-center justify-center">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-fg">
              {METHANE_PLEDGE_CAMPAIGN.title}
            </h1>
          </div>
          <p className="text-lg text-fg-muted leading-relaxed max-w-3xl mb-8">
            {METHANE_PLEDGE_CAMPAIGN.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={METHANE_PLEDGE_CAMPAIGN.ctaHref} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                <Leaf className="h-5 w-5" />
                {METHANE_PLEDGE_CAMPAIGN.ctaLabel}
              </Button>
            </a>
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
              Share This Campaign
            </Button>
          </div>
          <p className="text-xs text-fg-muted mt-4">
            Source: <a href="https://www.no-burn.org/the-cities-methane-pledge/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GAIA - Global Alliance for Incinerator Alternatives</a>
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

        {/* Why It Matters */}
        <Section className="mb-12">
          <SectionTitle>Why Methane Matters</SectionTitle>
          <div className="prose prose-sm max-w-none">
            <p className="text-fg-muted leading-relaxed mb-4">
              Methane (CH₄) is a powerful greenhouse gas responsible for roughly 30% of global temperature rise since pre-industrial times. While it doesn't last as long in the atmosphere as CO₂, methane is over 80 times more potent at warming over a 20-year period.
            </p>
            <p className="text-fg-muted leading-relaxed mb-6">
              Organic waste in landfills is a major source of methane emissions. When food waste, yard trimmings, and other organics decompose without oxygen in landfills, they release methane into the atmosphere. By diverting these materials through composting or other sustainable methods, we can dramatically reduce emissions while creating valuable soil amendments.
            </p>
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
          </div>
        </Section>

        {/* How to Participate */}
        <Section className="mb-12">
          <SectionTitle>How to Participate</SectionTitle>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fg mb-2">Take the Pledge</h3>
                <p className="text-fg-muted leading-relaxed">
                  Commit to diverting organic waste from landfills in your household, organization, or community. Every action counts toward reducing methane emissions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fg mb-2">Implement Solutions</h3>
                <p className="text-fg-muted leading-relaxed">
                  Start composting, participate in organic waste collection programs, or advocate for policy changes in your area. Use our resources and toolkits to get started.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fg mb-2">Track & Share</h3>
                <p className="text-fg-muted leading-relaxed">
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
        <Card className="bg-gradient-to-br from-green-500/10 to-primary/5 border-green-500/30">
          <CardContent className="p-8 md:p-10 text-center">
            <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-fg mb-3">
              Join the Community
            </h3>
            <p className="text-base text-fg-muted mb-6 max-w-2xl mx-auto">
              Be part of a growing movement of individuals, organizations, and cities committed to reducing methane emissions through organic waste diversion.
            </p>
            <a href={METHANE_PLEDGE_CAMPAIGN.ctaHref}>
              <Button variant="primary" size="lg">
                <Leaf className="h-5 w-5" />
                {METHANE_PLEDGE_CAMPAIGN.ctaLabel}
              </Button>
            </a>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

