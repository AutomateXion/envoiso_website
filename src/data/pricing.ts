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

/* Prices from 14 Nov 2026, per plan, per month, as set in the "XionERP plan prices" sheet.
   The basis was USD 4.99 per user billed annually, with 20% off plans of more than 3 users;
   the figures below are the sheet's, and some were then set by hand (round LKR monthly,
   whole QAR annual, .99 OMR annual), so they no longer follow one formula.
   Earlier prices (12 Nov 2026, list less 20%), for the record:
     USD monthly 14.9 / 19 / 39 / 79 / 99      annual 9 / 19 / 29 / 59 / 89
     OMR monthly 6.299 / 11.899 / 18.299 / 33.499 / 44.699   annual 4.699 / 9.499 / 15.099 / 27.899 / 36.699
     LKR monthly 3,999 / 7,999 / 12,799 / 23,199 / 31,199    annual 3,199 / 9,599 / 15,999 / 31,989 / 47,989
     QAR monthly 49 / 89 / 139 / 289 / 379     annual 39 / 69 / 119 / 229 / 319 */
export const PRICES: Record<Currency, CurrencyBlock> = {
  usd: { symbol: '$',      decimals: 2, monthly: [5.99, 17.99, 24.99, 49.99, 74.99], annual: [4.99, 14.99, 21.99, 39.99, 59.99] },
  omr: { symbol: '\uFDFC ', decimals: 3, monthly: [2.299, 7.299, 9.609, 19.219, 28.829], annual: [1.99, 4.99, 6.99, 14.99, 22.99] },
  lkr: { symbol: 'Rs ',    decimals: 0, monthly: [3000, 9000, 15000, 30000, 45000], annual: [1999, 5999, 9999, 19990, 29999] },
  qar: { symbol: 'QR ',    decimals: 2, monthly: [21.99, 68.99, 90.99, 181.99, 272.99], annual: [19, 49, 69, 139, 199] },
};

// Seasonal offer: 50% off the first year on any annual plan. Ended 12 Nov 2026.
// Before switching it on again, re-set PROMO_FIRST_YEAR below: those first-year
// prices were worked out from the earlier list prices and no longer match.
export const PROMO = {
  active: false,
  label: '50% off your first year',
  detail: 'Sign up for an annual plan and pay half price for your first 12 months — then the standard annual rate applies from year two.',
  discount: 0.5,
};

export function formatAmount(value: number, currency: Currency): string {
  const { decimals } = PRICES[currency];
  if (decimals === 0 || (decimals === 1 && Number.isInteger(value))) {
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
