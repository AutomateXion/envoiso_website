export type Currency = 'usd' | 'omr' | 'lkr';

export const SEAT_TIERS = [
  { name: 'Solo',       users: '1 user',   sub: 'For founders & one-person businesses.' },
  { name: 'Team',       users: '3 users',  sub: 'For small teams getting organised.' },
  { name: 'Business',   users: '5 users',  sub: 'For growing trading & service teams.', popular: true },
  { name: 'Growth',     users: '10 users', sub: 'For scaling operations across departments.' },
  { name: 'Enterprise', users: '15 users', sub: 'For established multi-team businesses.' },
];

interface CurrencyBlock {
  symbol: string;
  decimals: number;
  monthly: number[];
  annual: number[];
}

export const PRICES: Record<Currency, CurrencyBlock> = {
  usd: { symbol: '$',      decimals: 0, monthly: [18, 35, 59, 107, 143],          annual: [15, 29, 49, 89, 119] },
  omr: { symbol: '\uFDFC ', decimals: 3, monthly: [7.9, 14.9, 22.9, 41.9, 55.9],    annual: [5.9, 11.9, 18.9, 34.9, 45.9] },
  lkr: { symbol: 'Rs ',    decimals: 0, monthly: [4999, 9999, 15999, 28999, 38999], annual: [3999, 7999, 12999, 23999, 31999] },
};

// Seasonal offer: 50% off the first 6 months on any annual plan.
export const PROMO = {
  active: true,
  label: '50% off your first 6 months',
  detail: 'Sign up for an annual plan and pay half price for your first 6 months — then the standard annual rate applies.',
  discount: 0.5,
};

export function formatAmount(value: number, currency: Currency): string {
  const { decimals } = PRICES[currency];
  if (decimals === 0) {
    return Math.round(value).toLocaleString('en-US');
  }
  return value.toFixed(decimals);
}

export function promoAmount(value: number): number {
  return value * (1 - PROMO.discount);
}
