// Resources adapter - merges mock data with admin-uploaded resources
// TODO: Replace with Supabase queries when ready

import type { Resource, Tag } from '../types';
import { getAllResources } from '../admin-store';

export interface ResourceFilters {
  search?: string;
  topics?: Tag[];
}

export async function fetchResources(filters?: ResourceFilters): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 200));

  let results = getAllResources();

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    results = results.filter(
      resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.summary.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.topics && filters.topics.length > 0) {
    results = results.filter(resource =>
      filters.topics!.some(topic => resource.topics.includes(topic))
    );
  }

  return results;
}

export async function fetchResourceBySlug(slug: string): Promise<Resource | null> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return getAllResources().find(resource => resource.slug === slug) || null;
}
