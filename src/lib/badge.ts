import { MOSAIC } from './badge-mosaic';

/* The Academy badge: a square, one colour and mosaic per course, drawn on a canvas.
   The Academy mark is the real file, never a redrawn one. Keep the colours in step
   with CourseIcon.tsx. */
export type Badge = { id: string; accent: string; k: string; r: string; s: string };
export const BADGES: Record<string, Badge> = {
  'XionERP Certified User': { id: 'fundamentals', accent: '#2563eb', k: 'Certified', r: 'User', s: 'CUSTOMER TRACK · STAGE 1' },
  'XionERP Certified Operations Specialist': { id: 'operations', accent: '#d97706', k: 'Certified', r: 'Operations Specialist', s: 'CUSTOMER TRACK · STAGE 2' },
  'XionERP Certified Finance & Accounting Professional': { id: 'finance', accent: '#059669', k: 'Certified', r: 'Finance & Accounting Professional', s: 'CUSTOMER TRACK · STAGE 3' },
  'XionERP Certified System Administrator': { id: 'admin', accent: '#7c3aed', k: 'Certified', r: 'System Administrator', s: 'CUSTOMER TRACK · STAGE 4' },
  'XionERP Partner Essentials': { id: 'partner', accent: '#0d9488', k: 'Partner', r: 'Essentials', s: 'PARTNER TRACK · STAGE 1' },
  'XionERP Certified Sales Consultant': { id: 'partner-sales', accent: '#ea580c', k: 'Certified', r: 'Sales Consultant', s: 'PARTNER TRACK · STAGE 2' },
  'XionERP Certified Implementation Consultant': { id: 'partner-implementation', accent: '#4f46e5', k: 'Certified', r: 'Implementation Consultant', s: 'PARTNER TRACK · STAGE 3' },
  'XionERP Certified Support Specialist': { id: 'partner-support', accent: '#0284c7', k: 'Certified', r: 'Support Specialist', s: 'PARTNER TRACK · STAGE 4' },
};
export const badgeFor = (courseTitle: string): Badge | undefined => BADGES[courseTitle];

const S = 840, CELL = 84, INK = '#0B1B4A';
const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
  const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('image')); i.src = src;
});

function wrap(x: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(' '); const lines: string[] = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (x.measureText(t).width > max && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur); return lines;
}

export async function drawBadge(b: Badge): Promise<HTMLCanvasElement> {
  try { await Promise.all([document.fonts.load('800 40px Inter'), document.fonts.load('700 20px Inter')]); } catch { /* system fonts */ }
  const c = document.createElement('canvas'); c.width = S; c.height = S;
  const x = c.getContext('2d')!;
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, S, S);
  const cells = MOSAIC[b.id] || [];
  cells.forEach((col, n) => {
    if (!col) return;
    const half = n < 30 ? 0 : 1; const i = n % 30; const cx = (i % 10) * CELL, cy = (Math.floor(i / 10)) * CELL + (half ? S - 3 * CELL : 0);
    x.fillStyle = col; x.fillRect(cx, cy, CELL, CELL);
  });
  x.textBaseline = 'alphabetic'; x.textAlign = 'left';
  // Academy mark and name on the solid bar
  x.font = '800 34px Inter, sans-serif';
  const label = 'XionERP Academy'; const lw = x.measureText(label).width; const m = 60, gap = 16;
  const sx = (S - (m + gap + lw)) / 2;
  x.fillStyle = '#FFFFFF'; x.beginPath(); (x as any).roundRect(sx, (CELL - m) / 2, m, m, 12); x.fill();
  try { const mark = await loadImg('/mark-academy.png'); x.drawImage(mark, sx + 4, (CELL - m) / 2 + 4, m - 8, m - 8); } catch { /* the name alone */ }
  x.fillStyle = '#FFFFFF'; x.fillText(label, sx + m + gap, CELL / 2 + 12);
  // Title
  x.textAlign = 'center';
  x.font = '800 48px Inter, sans-serif'; const rl = wrap(x, b.r, S - 120);
  const kh = 80, rh = 54, sh = 23, g1 = 14, g2 = 26;
  const total = kh + g1 + rl.length * rh + g2 + sh; let y = 3 * CELL + ((S - 6 * CELL) - total) / 2;
  x.fillStyle = INK; x.font = '800 80px Inter, sans-serif'; y += 66; x.fillText(b.k, S / 2, y); y += 14 - 66 + kh;
  x.font = '800 48px Inter, sans-serif';
  rl.forEach((l) => { y += g1 && rl.indexOf(l) === 0 ? g1 : 0; y += 40; x.fillText(l, S / 2, y); y += rh - 40; });
  y += g2 + 16; x.fillStyle = b.accent; x.font = '700 23px Inter, sans-serif'; (x as any).letterSpacing = '3px'; x.fillText(b.s, S / 2, y); (x as any).letterSpacing = '0px';
  return c;
}
