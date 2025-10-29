// Directory adapter - mock implementation
// TODO: Replace with Supabase queries when ready

import { DIRECTORY_ENTRIES } from '../data';
import type { DirectoryEntry, Tag } from '../types';

export interface DirectoryFilters {
  search?: string;
  type?: DirectoryEntry['type'];
  country?: string;
  tags?: Tag[];
}

export async function fetchDirectoryEntries(filters?: DirectoryFilters): Promise<DirectoryEntry[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let results = [...DIRECTORY_ENTRIES];
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    results = results.filter(
      entry =>
        entry.name.toLowerCase().includes(searchLower) ||
        entry.summary?.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters?.type) {
    results = results.filter(entry => entry.type === filters.type);
  }
  
  if (filters?.country) {
    results = results.filter(entry => entry.location.country === filters.country);
  }
  
  if (filters?.tags && filters.tags.length > 0) {
    results = results.filter(entry =>
      filters.tags!.some(tag => entry.tags.includes(tag))
    );
  }
  
  return results;
}

export async function fetchDirectoryEntry(id: string): Promise<DirectoryEntry | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return DIRECTORY_ENTRIES.find(entry => entry.id === id) || null;
}

// Get unique countries for filter dropdown
export function getUniqueCountries(): string[] {
  const countries = DIRECTORY_ENTRIES.map(entry => entry.location.country);
  return Array.from(new Set(countries)).sort();
}

