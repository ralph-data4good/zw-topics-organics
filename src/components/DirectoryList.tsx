// Directory list component
import { Card, CardContent, Badge } from '@zwa/ui';
import { MapPin, Globe, CheckCircle2, Building2, Users, Factory } from '@zwa/icons';
import type { DirectoryEntry } from '@/lib/types';
import { clsx } from 'clsx';

export interface DirectoryListProps {
  entries: DirectoryEntry[];
  onEntryClick?: (entry: DirectoryEntry) => void;
  viewMode: 'grid' | 'list';
}

export function DirectoryList({ entries, onEntryClick, viewMode }: DirectoryListProps) {
  const typeIcons = {
    facility: Factory,
    initiative: Users,
    organization: Building2,
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-fg-muted opacity-30" />
        <p className="text-fg-muted">No entries found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        viewMode === 'grid' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'
      )}
    >
      {entries.map(entry => {
        const Icon = typeIcons[entry.type];
        return (
          <Card
            key={entry.id}
            hover
            onClick={() => onEntryClick?.(entry)}
            className="cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-fg line-clamp-1">
                      {entry.name}
                    </h3>
                    {entry.verified && (
                      <Badge variant="verified">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-fg-muted mb-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {entry.location.city && `${entry.location.city}, `}
                      {entry.location.country}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="default">{entry.type}</Badge>
                    {entry.tags.map(tag => (
                      <Badge key={tag} variant="green">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {entry.summary && (
                    <p className="text-sm text-fg-muted line-clamp-2 mb-3">
                      {entry.summary}
                    </p>
                  )}

                  {entry.website && (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline focus-ring rounded"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

