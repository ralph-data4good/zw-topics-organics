// Directory filters component
import { Input, Label, Select, Button } from '@zwa/ui';
import { Search, Filter, X } from '@zwa/icons';
import type { DirectoryEntry } from '@/lib/types';
import { getUniqueCountries } from '@/lib/adapters/directory';

export interface DirectoryFiltersProps {
  search: string;
  type: DirectoryEntry['type'] | '';
  country: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: DirectoryEntry['type'] | '') => void;
  onCountryChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export function DirectoryFilters({
  search,
  type,
  country,
  onSearchChange,
  onTypeChange,
  onCountryChange,
  onApply,
  onClear,
}: DirectoryFiltersProps) {
  const countries = getUniqueCountries();
  const hasFilters = search || type || country;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          value={type}
          onChange={e => onTypeChange(e.target.value as DirectoryEntry['type'] | '')}
        >
          <option value="">All Types</option>
          <option value="facility">Facility</option>
          <option value="initiative">Initiative</option>
          <option value="organization">Organization</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Select
          id="country"
          value={country}
          onChange={e => onCountryChange(e.target.value)}
        >
          <option value="">All Countries</option>
          {countries.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <Button onClick={onApply} variant="secondary" className="w-full">
        <Search className="h-5 w-5" />
        Apply Filters
      </Button>
    </div>
  );
}

