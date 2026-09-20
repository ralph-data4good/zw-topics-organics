/** Client-side admin store — featured, overrides, deletes (localStorage). */

import { RESOURCES } from './data';
import type { Resource, Tag } from './types';

const FEATURED_KEY = 'zwa-organics-featured-ids';
const OVERRIDES_KEY = 'zwa-organics-custom-resources'; // edits + uploads (by id)
const DELETED_KEY = 'zwa-organics-deleted-ids';
const AUTH_KEY = 'zwa-organics-admin-auth';
const STORE_EVENT = 'zwa-organics-admin-store';

let featuredSnapshot: Resource[] = [];

function refreshFeaturedSnapshot() {
  featuredSnapshot = getFeaturedResourcesUncached();
  return featuredSnapshot;
}

function notifyStoreChange() {
  refreshFeaturedSnapshot();
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function subscribeAdminStore(onStoreChange: () => void): () => void {
  const onExternal = () => {
    refreshFeaturedSnapshot();
    onStoreChange();
  };
  window.addEventListener(STORE_EVENT, onStoreChange);
  window.addEventListener('storage', onExternal);
  return () => {
    window.removeEventListener(STORE_EVENT, onStoreChange);
    window.removeEventListener('storage', onExternal);
  };
}

/** Stable snapshot for useSyncExternalStore (same reference until store changes). */
export function getFeaturedResourcesSnapshot(): Resource[] {
  if (featuredSnapshot.length === 0 && typeof localStorage !== 'undefined') {
    refreshFeaturedSnapshot();
  }
  return featuredSnapshot;
}

/** Simple gate for the demo admin. Override with VITE_ADMIN_PASSWORD. */
const ADMIN_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || 'organics-admin';

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1';
  } catch {
    return false;
  }
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, '1');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isCatalogResource(id: string): boolean {
  return RESOURCES.some(r => r.id === id);
}

export function getDeletedIds(): string[] {
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** @deprecated alias — overrides include uploads and edits of catalog items */
export function getCustomResources(): Resource[] {
  return getResourceOverrides();
}

export function getResourceOverrides(): Resource[] {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Resource[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveResourceOverrides(resources: Resource[]): void {
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(resources));
  notifyStoreChange();
}

function defaultFeaturedIds(): string[] {
  return getAllResources()
    .slice(0, 3)
    .map(r => r.id);
}

function isKnownResourceId(id: string): boolean {
  return getAllResources().some(r => r.id === id);
}

export function getFeaturedIds(): string[] {
  try {
    const raw = localStorage.getItem(FEATURED_KEY);
    if (!raw) {
      const defaults = defaultFeaturedIds();
      localStorage.setItem(FEATURED_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const ids = JSON.parse(raw) as string[];
    if (!Array.isArray(ids)) return defaultFeaturedIds();

    const valid = ids.filter(isKnownResourceId);
    if (valid.length === 0) {
      const defaults = defaultFeaturedIds();
      localStorage.setItem(FEATURED_KEY, JSON.stringify(defaults));
      return defaults;
    }
    if (valid.length !== ids.length) {
      localStorage.setItem(FEATURED_KEY, JSON.stringify(valid.slice(0, 3)));
    }
    return valid.slice(0, 3);
  } catch {
    return defaultFeaturedIds();
  }
}

export function setFeaturedIds(ids: string[]): void {
  localStorage.setItem(FEATURED_KEY, JSON.stringify(ids.slice(0, 3)));
  notifyStoreChange();
}

/** Catalog + uploads, with edits applied and deletes removed. */
export function getAllResources(): Resource[] {
  const deleted = new Set(getDeletedIds());
  const overrides = getResourceOverrides();
  const byId = new Map<string, Resource>();

  for (const r of RESOURCES) {
    if (!deleted.has(r.id)) byId.set(r.id, r);
  }
  for (const r of overrides) {
    if (deleted.has(r.id)) continue;
    byId.set(r.id, r);
  }

  return [...byId.values()].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getFeaturedResourcesUncached(): Resource[] {
  const all = getAllResources();
  const featuredIds = getFeaturedIds();
  const byId = new Map(all.map(r => [r.id, r]));
  const featured = featuredIds
    .map(id => byId.get(id))
    .filter((r): r is Resource => Boolean(r));

  if (featured.length > 0) return featured.slice(0, 3);
  return all.slice(0, 3);
}

export function getFeaturedResources(): Resource[] {
  return getFeaturedResourcesUncached();
}

/** Create or update any resource (catalog edit or new upload). */
export function upsertResource(resource: Resource): void {
  const overrides = getResourceOverrides();
  const idx = overrides.findIndex(r => r.id === resource.id);
  const next = [...overrides];
  if (idx >= 0) {
    next[idx] = resource;
  } else {
    next.unshift(resource);
  }

  // Editing a catalog item undeletes it if previously soft-deleted
  const deleted = getDeletedIds().filter(id => id !== resource.id);
  if (deleted.length !== getDeletedIds().length) {
    localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
  }

  try {
    saveResourceOverrides(next);
  } catch (err) {
    if (resource.cover) {
      const withoutCover = { ...resource, cover: undefined };
      if (idx >= 0) next[idx] = withoutCover;
      else next[0] = withoutCover;
      try {
        saveResourceOverrides(next);
        resource.cover = undefined;
        return;
      } catch {
        // fall through
      }
    }
    throw err instanceof Error
      ? err
      : new Error('Could not save resource (browser storage full). Try a smaller cover image.');
  }
}

/** Delete any resource (catalog or uploaded). Catalog items are soft-deleted. */
export function deleteResource(id: string): void {
  const overrides = getResourceOverrides().filter(r => r.id !== id);
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));

  if (isCatalogResource(id)) {
    localStorage.setItem(
      DELETED_KEY,
      JSON.stringify([...new Set([...getDeletedIds(), id])])
    );
  }

  const nextFeatured = getFeaturedIds().filter(fid => fid !== id);
  localStorage.setItem(FEATURED_KEY, JSON.stringify(nextFeatured.slice(0, 3)));
  notifyStoreChange();
}

/** @deprecated use deleteResource */
export function deleteCustomResource(id: string): void {
  deleteResource(id);
}

/** Add to featured (max 3). Drops the oldest featured item if full. */
export function featureResource(id: string): string[] {
  const current = getFeaturedIds().filter(fid => fid !== id);
  const next = [...current, id].slice(-3);
  setFeaturedIds(next);
  return next;
}

export function toggleFeatured(id: string): string[] {
  const current = getFeaturedIds();
  if (current.includes(id)) {
    const next = current.filter(fid => fid !== id);
    setFeaturedIds(next);
    return next;
  }
  return featureResource(id);
}

export function createResourceDraft(partial: {
  title: string;
  summary: string;
  topics: Tag[];
  cover?: string;
  url?: string;
  content?: string;
}): Resource {
  const slugBase = partial.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  const id = `custom_${Date.now().toString(36)}`;
  return {
    id,
    slug: `${slugBase || 'resource'}-${id.slice(-4)}`,
    title: partial.title,
    summary: partial.summary,
    topics: partial.topics.length ? partial.topics : ['organics'],
    publishDate: new Date().toISOString().slice(0, 10),
    cover: partial.cover,
    url: partial.url,
    content: partial.content,
  };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
