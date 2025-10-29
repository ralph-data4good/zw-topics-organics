// Resources adapter - mock implementation
// TODO: Replace with Supabase queries when ready

import { RESOURCES } from '../data';
import type { Resource, Tag } from '../types';

export interface ResourceFilters {
  search?: string;
  topics?: Tag[];
}

export async function fetchResources(filters?: ResourceFilters): Promise<Resource[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let results = [...RESOURCES];
  
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
  
  // Sort by publish date (newest first)
  results.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  return results;
}

export async function fetchResourceBySlug(slug: string): Promise<Resource | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return RESOURCES.find(resource => resource.slug === slug) || null;
}

