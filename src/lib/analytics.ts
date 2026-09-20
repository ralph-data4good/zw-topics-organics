/** Lightweight client-side conversion tracking (localStorage). */

export type ConversionEvent =
  | 'calculator_open'
  | 'academy_join'
  | 'congress_schedule'
  | 'congress_details'
  | 'congress_livestream'
  | 'cities_network'
  | 'methane_pledge_sign'
  | 'resource_click'
  | 'resources_browse'
  | 'resource_contribute'
  | 'helpdesk_submit'
  | 'map_explore';

export interface ConversionMetric {
  event: ConversionEvent;
  label: string;
  count: number;
  lastAt: string | null;
}

const STORAGE_KEY = 'zwa-organics-conversions';
const SESSION_KEY = 'zwa-organics-session-id';

const EVENT_LABELS: Record<ConversionEvent, string> = {
  calculator_open: 'Calculator opens',
  academy_join: 'Join the Academy',
  congress_schedule: 'Congress – Schedule',
  congress_details: 'Congress – More details',
  congress_livestream: 'Congress – Livestream',
  cities_network: 'Explore Cities Network',
  methane_pledge_sign: 'Sign Methane Pledge',
  resource_click: 'Featured resource clicks',
  resources_browse: 'Browse resources (ZWA)',
  resource_contribute: 'Contribute resource',
  helpdesk_submit: 'Help Desk submissions',
  map_explore: 'Map & Directory explores',
};

type Store = Partial<Record<ConversionEvent, { count: number; lastAt: string }>>;

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function trackConversion(event: ConversionEvent): void {
  try {
    getOrCreateSessionId();
    const store = readStore();
    const prev = store[event];
    store[event] = {
      count: (prev?.count ?? 0) + 1,
      lastAt: new Date().toISOString(),
    };
    writeStore(store);
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
}

export function getConversionMetrics(): ConversionMetric[] {
  const store = readStore();
  return (Object.keys(EVENT_LABELS) as ConversionEvent[]).map(event => ({
    event,
    label: EVENT_LABELS[event],
    count: store[event]?.count ?? 0,
    lastAt: store[event]?.lastAt ?? null,
  }));
}

export function resetConversionMetrics(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTotalConversions(): number {
  return getConversionMetrics().reduce((sum, m) => sum + m.count, 0);
}
