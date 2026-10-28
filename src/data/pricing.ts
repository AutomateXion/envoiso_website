export type Currency = 'usd' | 'omr' | 'lkr' | 'qar';

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
  usd: { symbol: '$',      decimals: 0, monthly: [15, 29, 49, 99, 129],          annual: [12, 24, 39, 79, 109] },
  omr: { symbol: '\uFDFC ', decimals: 3, monthly: [7.9, 14.9, 22.9, 41.9, 55.9],    annual: [5.9, 11.9, 18.9, 34.9, 45.9] },
  // LKR annual list = users x Rs 3,999 (Solo rate), so the strike-through shows the real per-user discount.
  lkr: { symbol: 'Rs ',    decimals: 0, monthly: [4999, 9999, 15999, 28999, 38999], annual: [3999, 11997, 19995, 39990, 59985] },
  // Proposed from the USD peg (~3.64 QAR/USD), rounded to whole riyals.
  // TODO: confirm/adjust these against your intended Qatar go-to-market pricing.
  qar: { symbol: 'QR ',    decimals: 2, monthly: [55, 106, 178, 360, 470],         annual: [44, 87, 142, 288, 397] },
};

// Seasonal offer: 50% off the first year on any annual plan.
export const PROMO = {
  active: true,
  label: '50% off your first year',
  detail: 'Sign up for an annual plan and pay half price for your first 12 months — then the standard annual rate applies from year two.',
  discount: 0.5,
};

export function formatAmount(value: number, currency: Currency): string {
  const { decimals } = PRICES[currency];
  if (decimals === 0) {
    return Math.round(value).toLocaleString('en-US');
  }
  return value.toFixed(decimals);
}

// First-year prices that differ from the flat 50% discount, by currency and
// tier index (0 Solo … 4 Enterprise). Anything not listed here gets PROMO.discount.
export const PROMO_FIRST_YEAR: Partial<Record<Currency, Record<number, number>>> = {
  usd: { 2: 23, 3: 55, 4: 96 },   // Business, Growth, Enterprise (standard 39 / 79 / 109)
  qar: { 2: 82, 3: 199, 4: 349 }, // Business, Growth, Enterprise (standard 142 / 288 / 397)
  omr: { 2: 10.9, 3: 21.9, 4: 36.9 }, // Business, Growth, Enterprise (standard 18.9 / 34.9 / 45.9)
  lkr: { 1: 4000, 2: 7500, 3: 17500, 4: 26250 }, // Team 4,000; Business 7,500; Growth & Enterprise at Rs 1,750/user
};

export function promoAmount(value: number, currency?: Currency, tierIndex?: number): number {
  if (currency !== undefined && tierIndex !== undefined) {
    const fixed = PROMO_FIRST_YEAR[currency]?.[tierIndex];
    if (fixed !== undefined) return fixed;
  }
  return value * (1 - PROMO.discount);
}
