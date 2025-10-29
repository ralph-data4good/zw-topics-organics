// Map + Directory page
import { useState, useEffect } from 'react';
import { Container, Button, Spinner } from '@zwa/ui';
import { Grid3x3, List, SlidersHorizontal, X } from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MapCanvas } from '@/components/MapCanvas';
import { DirectoryFilters } from '@/components/DirectoryFilters';
import { DirectoryList } from '@/components/DirectoryList';
import { fetchDirectoryEntries, type DirectoryFilters as Filters } from '@/lib/adapters/directory';
import type { DirectoryEntry } from '@/lib/types';
import { announceToScreenReader } from '@zwa/a11y';
import { clsx } from 'clsx';

export function MapDirectory() {
  usePageTitle('Map & Directory');

  const [entries, setEntries] = useState<DirectoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: '',
    type: undefined,
    country: '',
    tags: ['organics'],
  });

  const [tempFilters, setTempFilters] = useState({
    search: '',
    type: '' as DirectoryEntry['type'] | '',
    country: '',
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setIsLoading(true);
    const data = await fetchDirectoryEntries(filters);
    setEntries(data);
    setIsLoading(false);
    announceToScreenReader(`${data.length} directory entries found`);
  };

  const handleApplyFilters = () => {
    setFilters({
      search: tempFilters.search,
      type: tempFilters.type || undefined,
      country: tempFilters.country,
      tags: ['organics'],
    });
    setShowFilters(false);
    loadEntries();
  };

  const handleClearFilters = () => {
    setTempFilters({ search: '', type: '', country: '' });
    setFilters({ search: '', type: undefined, country: '', tags: ['organics'] });
    loadEntries();
  };

  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Topics', href: '/' },
            { label: 'Organics', href: '/' },
            { label: 'Map & Directory' },
          ]}
        />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-fg mb-2">
              Organics Directory
            </h1>
            <p className="text-sm text-fg-muted">
              Showing <strong>{entries.length}</strong> of <strong>{entries.length}</strong> entries
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden md:flex border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-2 rounded focus-ring transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-fg-muted hover:text-fg'
                )}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  'p-2 rounded focus-ring transition-colors',
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-fg-muted hover:text-fg'
                )}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Map Toggle */}
            <Button
              variant={showMap ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setShowMap(!showMap)}
              className="hidden lg:flex"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>

            {/* Filters Toggle (Mobile) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </Button>
          </div>
        </div>
      </Container>

      <Container className="!py-0">
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <DirectoryFilters
                search={tempFilters.search}
                type={tempFilters.type}
                country={tempFilters.country}
                onSearchChange={value => setTempFilters(prev => ({ ...prev, search: value }))}
                onTypeChange={value => setTempFilters(prev => ({ ...prev, type: value }))}
                onCountryChange={value => setTempFilters(prev => ({ ...prev, country: value }))}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-bg p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-fg">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded hover:bg-bg-muted focus-ring"
                    aria-label="Close filters"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <DirectoryFilters
                  search={tempFilters.search}
                  type={tempFilters.type}
                  country={tempFilters.country}
                  onSearchChange={value => setTempFilters(prev => ({ ...prev, search: value }))}
                  onTypeChange={value => setTempFilters(prev => ({ ...prev, type: value }))}
                  onCountryChange={value => setTempFilters(prev => ({ ...prev, country: value }))}
                  onApply={handleApplyFilters}
                  onClear={handleClearFilters}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Map */}
            {showMap && (
              <div className="h-96 mb-6 rounded-lg overflow-hidden border border-border">
                <MapCanvas entries={entries} />
              </div>
            )}

            {/* Directory List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Spinner size="lg" />
              </div>
            ) : (
              <DirectoryList entries={entries} viewMode={viewMode} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

