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

/* Prices from 12 Nov 2026: the earlier list prices less 20%, rounded to the way each
   currency is quoted (whole units, one decimal for OMR).
   Earlier list, for the record:
     USD monthly 15 / 29 / 49 / 99 / 129      annual 12 / 24 / 39 / 79 / 109
     OMR monthly 7.9 / 14.9 / 22.9 / 41.9 / 55.9   annual 5.9 / 11.9 / 18.9 / 34.9 / 45.9
     LKR monthly 4,999 / 9,999 / 15,999 / 28,999 / 38,999   annual users x Rs 3,999
     QAR monthly 55 / 106 / 178 / 360 / 470   annual 44 / 87 / 142 / 288 / 397 */
export const PRICES: Record<Currency, CurrencyBlock> = {
  usd: { symbol: '$',      decimals: 0, monthly: [12, 23, 39, 79, 103],           annual: [10, 19, 31, 63, 87] },
  omr: { symbol: '\uFDFC ', decimals: 3, monthly: [6.3, 11.9, 18.3, 33.5, 44.7],    annual: [4.7, 9.5, 15.1, 27.9, 36.7] },
  // LKR annual list = users x Rs 3,199 (Solo rate), as before with the old Solo rate.
  lkr: { symbol: 'Rs ',    decimals: 0, monthly: [3999, 7999, 12799, 23199, 31199], annual: [3199, 9597, 15995, 31990, 47985] },
  qar: { symbol: 'QR ',    decimals: 2, monthly: [44, 85, 142, 288, 376],          annual: [35, 70, 114, 230, 318] },
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
