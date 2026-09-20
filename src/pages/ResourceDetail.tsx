// Resource detail page
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, Badge, Spinner, Section } from '@zwa/ui';
import { ArrowLeft, ExternalLink } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { fetchResourceBySlug } from '@/lib/adapters/resources';
import type { Resource } from '@/lib/types';
import { TOPIC_LABELS } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { trackConversion } from '@/lib/analytics';

export function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadResource(slug);
    }
  }, [slug]);

  const loadResource = async (resourceSlug: string) => {
    setIsLoading(true);
    const data = await fetchResourceBySlug(resourceSlug);
    setResource(data);
    setIsLoading(false);
  };

  usePageTitle(resource?.title || 'Resource');

  if (isLoading) {
    return (
      <Container>
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      </Container>
    );
  }

  if (!resource) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-fg">Resource Not Found</h1>
          <p className="mb-6 text-fg-muted">
            The resource you're looking for doesn't exist or has been removed.
          </p>
          <a
            href={EXTERNAL_LINKS.resources}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('resources_browse')}
          >
            <Button variant="secondary">
              <ExternalLink className="h-5 w-5" />
              Browse Resources
            </Button>
          </a>
        </div>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero */}
      {resource.cover && (
        <div className="h-64 w-full overflow-hidden border-b border-border md:h-96">
          <img
            src={resource.cover}
            alt={resource.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <Container>
        <Breadcrumbs
          items={[
            { label: 'Topics', href: '/' },
            { label: 'Organics', href: '/' },
            { label: resource.title },
          ]}
        />

        <div className="max-w-3xl">
          {/* Back Button */}
          <Link to="/" className="mb-6 inline-block">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* Title & Meta */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {resource.topics.map(topic => (
                <Badge key={topic} variant="green">
                  {TOPIC_LABELS[topic] ?? topic}
                </Badge>
              ))}
            </div>
            <h1 className="mb-4 text-2xl font-bold text-fg md:text-4xl">{resource.title}</h1>
            <p className="mb-2 text-base text-fg-muted">{resource.summary}</p>
            <p className="text-sm text-fg-muted">Published {formatDate(resource.publishDate)}</p>
          </div>

          {/* Content */}
          <Section>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line leading-relaxed text-fg-muted">{resource.content}</p>
            </div>

            {resource.url && (
              <div className="mt-8 border-t border-border pt-8">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="primary">
                    <ExternalLink className="h-5 w-5" />
                    View Full Resource
                  </Button>
                </a>
              </div>
            )}
          </Section>

          {/* Related Resources */}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a
              href={EXTERNAL_LINKS.resources}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('resources_browse')}
            >
              <Button variant="outline" className="w-full sm:w-auto">
                <ExternalLink className="h-4 w-4" />
                Browse All Resources
              </Button>
            </a>
            <a
              href={EXTERNAL_LINKS.contribute}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('resource_contribute')}
            >
              <Button variant="ghost" className="w-full sm:w-auto">
                Contribute Resource
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

