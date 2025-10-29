// MapCanvas component - Interactive Asia-Pacific Map View
import { MapPin } from 'lucide-react';
import type { DirectoryEntry } from '@/lib/types';

export interface MapCanvasProps {
  entries: DirectoryEntry[];
  onEntryClick?: (entry: DirectoryEntry) => void;
}

export function MapCanvas({ entries, onEntryClick }: MapCanvasProps) {
  // Group entries by country
  const countryCounts = entries.reduce((acc, entry) => {
    acc[entry.location.country] = (acc[entry.location.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate position based on approximate coordinates
  const getMarkerPosition = (lat: number, lng: number) => {
    // Simple projection for Asia-Pacific region
    // Center: ~15°N, 105°E
    const centerLat = 15;
    const centerLng = 105;
    const scale = 3;
    
    const x = 50 + (lng - centerLng) * scale;
    const y = 50 - (lat - centerLat) * scale;
    
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`,
    };
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-zwa-blue-50 via-white to-green-500/5 rounded-lg overflow-hidden border-2 border-border">
      {/* Map Background */}
      <div className="absolute inset-0">
        {/* Asia-Pacific Region Outline */}
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 20,20 Q 40,15 60,25 T 80,35 L 85,45 Q 80,55 70,65 L 60,75 Q 45,80 30,75 L 20,65 Q 15,50 20,35 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
        <h3 className="text-sm font-semibold text-fg">Asia-Pacific Organics Network</h3>
        <p className="text-xs text-fg-muted">{entries.length} locations across {Object.keys(countryCounts).length} countries</p>
      </div>

      {/* Map Markers */}
      <div className="absolute inset-0">
        {entries.map((entry) => {
          const position = getMarkerPosition(entry.location.lat, entry.location.lng);
          return (
            <button
              key={entry.id}
              onClick={() => onEntryClick?.(entry)}
              className="absolute transform -translate-x-1/2 -translate-y-full group"
              style={position}
              aria-label={`${entry.name}, ${entry.location.country}`}
            >
              {/* Marker Pin */}
              <div className="relative">
                <MapPin 
                  className="h-8 w-8 text-green-500 drop-shadow-lg group-hover:text-green-600 transition-all group-hover:scale-110" 
                  fill="currentColor"
                />
                {entry.verified && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                )}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white rounded-lg shadow-lg px-3 py-2 whitespace-nowrap border border-border">
                  <p className="text-xs font-semibold text-fg">{entry.name}</p>
                  <p className="text-xs text-fg-muted">
                    {entry.location.city && `${entry.location.city}, `}
                    {entry.location.country}
                  </p>
                  <p className="text-xs text-primary mt-1">{entry.type}</p>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-white" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md">
        <h4 className="text-xs font-semibold text-fg mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-500" fill="currentColor" />
            <span className="text-xs text-fg-muted">Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span className="text-xs text-fg-muted">Verified</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md max-w-xs">
        <p className="text-xs text-fg-muted">
          <strong className="text-fg">Interactive map:</strong> Click markers to view details. Full MapLibre GL integration available for production.
        </p>
      </div>
    </div>
  );
}

