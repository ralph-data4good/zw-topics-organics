// Resource detail page
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, Badge, Spinner, Section } from '@zwa/ui';
import { ArrowLeft, ExternalLink } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { fetchResourceBySlug } from '@/lib/adapters/resources';
import type { Resource } from '@/lib/types';
import { formatDate } from '@/lib/format';

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
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-fg mb-4">Resource Not Found</h1>
          <p className="text-fg-muted mb-6">
            The resource you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/resources">
            <Button variant="secondary">
              <ArrowLeft className="h-5 w-5" />
              Back to Resources
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero */}
      {resource.cover && (
        <div className="w-full h-64 md:h-96 overflow-hidden border-b border-border">
          <img
            src={resource.cover}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <Container>
        <Breadcrumbs
          items={[
            { label: 'Topics', href: '/' },
            { label: 'Organics', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: resource.title },
          ]}
        />

        <div className="max-w-3xl">
          {/* Back Button */}
          <Link to="/resources" className="inline-block mb-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Button>
          </Link>

          {/* Title & Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.topics.map(topic => (
                <Badge key={topic} variant="green">
                  {topic}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-fg mb-4">
              {resource.title}
            </h1>
            <p className="text-base text-fg-muted mb-2">{resource.summary}</p>
            <p className="text-sm text-fg-muted">
              Published {formatDate(resource.publishDate)}
            </p>
          </div>

          {/* Content */}
          <Section>
            <div className="prose prose-sm max-w-none">
              <p className="text-fg-muted leading-relaxed whitespace-pre-line">
                {resource.content}
              </p>
            </div>

            {resource.url && (
              <div className="mt-8 pt-8 border-t border-border">
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
          <div className="mt-12">
            <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
            <Link to="/resources">
              <Button variant="outline">
                Browse All Resources
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

