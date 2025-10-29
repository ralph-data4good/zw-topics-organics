// Resources listing page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Input, Label, Spinner } from '@zwa/ui';
import { Search, ArrowRight } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { fetchResources, type ResourceFilters } from '@/lib/adapters/resources';
import type { Resource, Tag } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { announceToScreenReader } from '@zwa/a11y';

export function Resources() {
  usePageTitle('Resources');

  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ResourceFilters>({
    search: '',
    topics: ['organics'] as Tag[],
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    const data = await fetchResources(filters);
    setResources(data);
    setIsLoading(false);
    announceToScreenReader(`${data.length} resources found`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadResources();
  };

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Topics', href: '/' },
          { label: 'Organics', href: '/' },
          { label: 'Resources' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-fg mb-3">Resource Library</h1>
        <p className="text-base text-fg-muted leading-relaxed">
          Access toolkits, case studies, and research on organic waste management.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">
              Search resources
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Search resources..."
              value={filters.search}
              onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <Button type="submit" variant="secondary">
            <Search className="h-5 w-5" />
            Search
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-sm text-fg-muted">
          Showing <strong>{resources.length}</strong> resource{resources.length !== 1 ? 's' : ''}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-16 w-16 mx-auto mb-4 text-fg-muted opacity-30" />
          <p className="text-fg-muted">No resources found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map(resource => (
            <Card key={resource.id} hover>
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
                <h3 className="text-xl font-bold text-fg mb-2">{resource.title}</h3>
                <p className="text-sm text-fg-muted mb-4 leading-relaxed line-clamp-3">
                  {resource.summary}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-fg-muted">{formatDate(resource.publishDate)}</p>
                  <Link to={`/resources/${resource.slug}`}>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

