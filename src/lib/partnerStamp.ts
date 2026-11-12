/* Draws the partner's own logo and contact details onto the XionERP materials.
   The templates in /media-kit leave a clear area for it; manifest.json says where.
   Text is drawn on a canvas (not with a PDF font) so any name, including Arabic,
   comes out right. */
export interface KitDisplay {
  companyName: string; contactName: string; phone: string; email: string; website: string; address: string;
}
export interface KitMeta { partnerType: 'RESELLER' | 'DISTRIBUTOR'; country: string }

const INK = '#1A2940', MUTED = '#5B7186', NAVY = '#103080', LINE = '#D8E2EC';
const FONT = 'Inter, "Segoe UI", system-ui, -apple-system, "Noto Sans Arabic", sans-serif';

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error('image failed to load'));
    i.src = src;
  });
}

function fit(ctx: CanvasRenderingContext2D, text: string, maxW: number, size: number, min: number, weight: number) {
  let s = size;
  for (; s > min; s -= 0.5) { ctx.font = `${weight} ${s}px ${FONT}`; if (ctx.measureText(text).width <= maxW) return s; }
  return min;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean); const lines: string[] = []; let cur = '';
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(t).width <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '…'); }
  return lines;
}

/** A transparent canvas, w x h in the units of the template (points or pixels), drawn at `scale`. */
export function renderStamp(d: KitDisplay, logo: HTMLImageElement | null, meta: KitMeta, w: number, h: number, scale: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = Math.round(w * scale); c.height = Math.round(h * scale);
  const ctx = c.getContext('2d')!;
  ctx.scale(scale, scale); ctx.textBaseline = 'alphabetic';

  const p = h * 0.1;
  const lw = w * 0.26, iw = w * 0.34;
  const x1 = p + lw, x2 = x1 + iw;                         // start of the identity and contact columns
  const label = `XionERP ${meta.partnerType === 'DISTRIBUTOR' ? 'Distributor' : 'Reseller'} · ${meta.country}`.toUpperCase();

  /* Logo, or the company name as a wordmark when there is none. */
  const boxW = lw - p, boxH = h - 2 * p;
  if (logo) {
    const k = Math.min(boxW / logo.width, boxH / logo.height);
    const lwid = logo.width * k, lhei = logo.height * k;
    ctx.drawImage(logo, p, (h - lhei) / 2, lwid, lhei);
  } else {
    const size = fit(ctx, d.companyName, boxW, h * 0.2, h * 0.09, 700);
    ctx.font = `700 ${size}px ${FONT}`; ctx.fillStyle = NAVY;
    const lines = wrap(ctx, d.companyName, boxW, 3);
    const lh = size * 1.18, top = (h - lines.length * lh) / 2 + size * 0.85;
    lines.forEach((t, i) => ctx.fillText(t, p, top + i * lh));
  }

  /* A thin divider between the logo and the words. */
  ctx.strokeStyle = LINE; ctx.lineWidth = Math.max(0.6, h * 0.008);
  ctx.beginPath(); ctx.moveTo(x1, p); ctx.lineTo(x1, h - p); ctx.stroke();

  /* Identity: who they are to XionERP, their company, and an address when there is room. */
  const ix = x1 + p, iwid = iw - 2 * p;
  const small = Math.min(h * 0.095, w * 0.016);
  ctx.font = `700 ${small}px ${FONT}`; ctx.fillStyle = '#2F63C9';
  const labelSize = fit(ctx, label, iwid, small, small * 0.6, 700);
  ctx.font = `700 ${labelSize}px ${FONT}`;
  let y = p + labelSize * 1.05;
  ctx.fillText(label, ix, y);
  if (logo) {
    const cs = fit(ctx, d.companyName, iwid, h * 0.16, h * 0.085, 700);
    ctx.font = `700 ${cs}px ${FONT}`; ctx.fillStyle = INK;
    const lines = wrap(ctx, d.companyName, iwid, 2); y += cs * 1.4;
    lines.forEach((t) => { ctx.fillText(t, ix, y); y += cs * 1.18; });
    y -= cs * 0.18;
  }
  if (d.address && h >= 100) {
    const as = Math.min(h * 0.085, w * 0.016); ctx.font = `400 ${as}px ${FONT}`; ctx.fillStyle = MUTED;
    y += as * 0.7;
    wrap(ctx, d.address, iwid, Math.max(1, Math.floor((h - p - y) / (as * 1.3)))).forEach((t) => { ctx.fillText(t, ix, y); y += as * 1.3; });
  }

  /* Contacts: up to four lines, shrunk to fit the column. */
  const cx = x2 + p / 2, cw = w - p - cx;
  const lines = [
    { t: d.contactName, bold: true }, { t: d.phone }, { t: d.email }, { t: d.website },
  ].filter((l) => l.t);
  if (lines.length) {
    const fs0 = Math.min(h * 0.15, w * 0.026);
    const lh = Math.min(fs0 * 1.3, (h - 2 * p) / lines.length);
    let yy = (h - lines.length * lh) / 2 + lh * 0.78;
    lines.forEach((l) => {
      const s = fit(ctx, l.t!, cw, fs0, fs0 * 0.55, l.bold ? 700 : 500);
      ctx.font = `${l.bold ? 700 : 500} ${s}px ${FONT}`; ctx.fillStyle = l.bold ? NAVY : INK;
      ctx.fillText(l.t!, cx, yy); yy += lh;
    });
  }
  return c;
}
