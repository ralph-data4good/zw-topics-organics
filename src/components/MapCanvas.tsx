// MapCanvas component with MapLibre GL JS
// Note: This is a simplified version. In production, add full clustering support with @mapbox/supercluster
import { useEffect, useRef, useState } from 'react';
import type { DirectoryEntry } from '@/lib/types';

export interface MapCanvasProps {
  entries: DirectoryEntry[];
  onEntryClick?: (entry: DirectoryEntry) => void;
}

export function MapCanvas({ entries, onEntryClick }: MapCanvasProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Note: MapLibre GL JS would be initialized here
    // For this demo, we'll show a placeholder with entry markers
    setMapLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-full bg-neutral-100 rounded-lg overflow-hidden">
      {/* Map Placeholder */}
      <div
        ref={mapContainerRef}
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zwa-blue-100 to-green-500/10"
      >
        {!mapLoaded ? (
          <div className="text-fg-muted">Loading map...</div>
        ) : (
          <div className="relative w-full h-full">
            {/* Simplified marker display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{entries.length}</div>
                <div className="text-sm text-fg-muted">Organics Locations</div>
                <div className="mt-4 text-xs text-fg-muted max-w-xs">
                  Map integration ready. In production, this would show an interactive MapLibre GL JS map with clustering.
                </div>
              </div>
            </div>

            {/* Mock markers */}
            {entries.slice(0, 5).map((entry, idx) => (
              <button
                key={entry.id}
                onClick={() => onEntryClick?.(entry)}
                className="absolute w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform focus-ring"
                style={{
                  left: `${20 + idx * 15}%`,
                  top: `${30 + idx * 10}%`,
                }}
                aria-label={entry.name}
              >
                <span className="sr-only">{entry.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Controls Placeholder */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="w-10 h-10 bg-bg rounded-lg shadow-md flex items-center justify-center hover:bg-bg-muted transition-colors focus-ring">
          <span className="text-xl font-bold text-fg">+</span>
        </button>
        <button className="w-10 h-10 bg-bg rounded-lg shadow-md flex items-center justify-center hover:bg-bg-muted transition-colors focus-ring">
          <span className="text-xl font-bold text-fg">−</span>
        </button>
      </div>
    </div>
  );
}

