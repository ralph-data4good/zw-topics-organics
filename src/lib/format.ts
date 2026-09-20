// Number formatting utilities following ZWA design system

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${formatNumber(value * 100, decimals)}%`;
}

// Mock currency formatting (would integrate with actual currency data)
export function getCurrencyCode(country: string): string {
  const currencyMap: Record<string, string> = {
    'Philippines': 'PHP',
    'Indonesia': 'IDR',
    'Thailand': 'THB',
    'Singapore': 'SGD',
    'Vietnam': 'VND',
    'Malaysia': 'MYR',
    'Cambodia': 'KHR',
    'Taiwan': 'TWD',
  };
  return currencyMap[country] || 'USD';
}

export function formatCurrency(value: number, country: string, decimals: number = 0): string {
  const currencyCode = getCurrencyCode(country);
  const formatted = formatNumber(value, decimals);
  
  // Simple currency symbol mapping
  const symbolMap: Record<string, string> = {
    'PHP': '₱',
    'IDR': 'Rp',
    'THB': '฿',
    'SGD': 'S$',
    'VND': '₫',
    'MYR': 'RM',
    'KHR': '៛',
    'TWD': 'NT$',
    'USD': '$',
  };
  
  const symbol = symbolMap[currencyCode] || currencyCode;
  return `${symbol}${formatted}`;
}

export function formatDate(dateString: string): string {
  const trimmed = dateString.trim();

  // Month-only values from CSV (YYYY-MM) — show "February 2025"
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    const [year, month] = trimmed.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, 1));
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(date);
  }

  // Full dates stored as YYYY-MM-01 from month-only publishing dates
  if (/^\d{4}-\d{2}-01$/.test(trimmed)) {
    const [year, month] = trimmed.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, 1));
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(date);
  }

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return trimmed;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

