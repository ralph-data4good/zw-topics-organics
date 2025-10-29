// Home page - Organics Topic Microsite
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Accordion, type AccordionItemData } from '@zwa/ui';
import { Leaf, MapIcon, Calculator as CalculatorIcon, Search, Calendar, ArrowRight, ExternalLink } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { RESOURCES } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export function Home() {
  usePageTitle('Organics');

  const featuredResources = RESOURCES.slice(0, 3);

  const actionItems: AccordionItemData[] = [
    {
      id: 'search-info',
      title: 'Search Directory & Information',
      content: (
        <div>
          <p className="mb-4">
            Find composting facilities, organic waste initiatives, and organizations working on organics diversion across Asia.
          </p>
          <Link to="/map">
            <Button variant="secondary" size="sm">
              <MapIcon className="h-4 w-4" />
              Explore Map & Directory
            </Button>
          </Link>
        </div>
      ),
    },
    {
      id: 'library',
      title: 'Resource Library',
      content: (
        <div>
          <p className="mb-4">
            Access toolkits, case studies, and research on organic waste management and composting best practices.
          </p>
          <Link to="/resources">
            <Button variant="secondary" size="sm">
              <Search className="h-4 w-4" />
              Browse Resources
            </Button>
          </Link>
        </div>
      ),
    },
    {
      id: 'calendar',
      title: 'Festival Calendar',
      content: (
        <div>
          <p className="mb-4">
            Join upcoming events, workshops, and webinars focused on organic waste reduction and composting.
          </p>
          <Button variant="secondary" size="sm" disabled>
            <Calendar className="h-4 w-4" />
            View Calendar (Coming Soon)
          </Button>
        </div>
      ),
    },
    {
      id: 'tools',
      title: 'Tools & Calculators',
      content: (
        <div>
          <p className="mb-4">
            Calculate the impact of organic waste diversion and estimate methane emission reductions from your program.
          </p>
          <Link to="/calculator">
            <Button variant="secondary" size="sm">
              <CalculatorIcon className="h-4 w-4" />
              Open Calculator
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-header-bg text-white">
        <Container className="py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: 'Topics', href: '/' },
              { label: 'Organics' },
            ]}
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Turning Food Waste into
            <br />
            <span className="text-green-500">Climate Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-zwa-blue-400 leading-relaxed max-w-3xl mb-8">
            Organic waste represents 40-60% of municipal solid waste in Asia. When diverted from landfills through composting and sustainable treatment, it becomes a powerful tool for methane reduction and soil health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/campaign/methane-pledge">
              <Button variant="primary" size="lg">
                <Leaf className="h-5 w-5" />
                Take the Methane Pledge
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-header-bg">
                <MapIcon className="h-5 w-5" />
                Explore Directory
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container>
        {/* Action Accordion */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">Quick Actions</h2>
          <Accordion items={actionItems} defaultOpen={['search-info']} />
        </div>

        {/* KPI Card */}
        <Card className="mb-12 bg-gradient-to-br from-green-500/10 to-primary/10 border-green-500/20">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-xl bg-green-500 flex items-center justify-center">
                  <MapIcon className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {10}+
                </div>
                <p className="text-lg text-fg-muted mb-1">
                  Organics Facilities & Initiatives
                </p>
                <p className="text-sm text-fg-muted">
                  Across 8 countries in Asia-Pacific region
                </p>
              </div>
              <div>
                <Link to="/map">
                  <Button variant="secondary">
                    View on Map
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Resources */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-fg">Featured Resources</h2>
            <Link to="/resources">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <Link key={resource.id} to={`/resources/${resource.slug}`}>
                <Card hover className="h-full">
                  {resource.cover && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                      <img
                        src={resource.cover}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {resource.topics.map(topic => (
                        <Badge key={topic} variant="green">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-fg mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-fg-muted mb-3 line-clamp-2">
                      {resource.summary}
                    </p>
                    <p className="text-xs text-fg-muted">{formatDate(resource.publishDate)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Calculator Teaser */}
        <Card className="mb-12 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-xl bg-primary flex items-center justify-center">
                  <CalculatorIcon className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-fg mb-2">
                  Organics Diversion Calculator
                </h3>
                <p className="text-base text-fg-muted">
                  Calculate the environmental impact of your organic waste diversion program. Estimate annual tonnage diverted and methane emissions avoided.
                </p>
              </div>
              <div>
                <Link to="/calculator">
                  <Button variant="secondary" size="lg">
                    <CalculatorIcon className="h-5 w-5" />
                    Open Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Band */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">Take Action</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card hover className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
              <CardContent className="p-8">
                <Leaf className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-fg mb-3">The Methane Pledge</h3>
                <p className="text-base text-fg-muted mb-6">
                  Join thousands of individuals and organizations committed to reducing methane emissions through organic waste diversion.
                </p>
                <Link to="/campaign/methane-pledge">
                  <Button variant="primary">
                    Learn More & Join
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-gradient-to-br from-secondary/10 to-transparent border-secondary/30">
              <CardContent className="p-8">
                <ExternalLink className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold text-fg mb-3">Need Help?</h3>
                <p className="text-base text-fg-muted mb-6">
                  Our team of experts can help you plan and implement organic waste management programs in your community.
                </p>
                <Link to="/helpdesk">
                  <Button variant="secondary">
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

