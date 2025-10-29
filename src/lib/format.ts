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
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

