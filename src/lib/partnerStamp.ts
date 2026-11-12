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

/* Logos arrive with their own white or transparent margins. Cut those away (the mark itself is
   untouched) so the logo fills its box instead of floating small inside it. */
const trimCache = new WeakMap<HTMLImageElement, CanvasImageSource & { width: number; height: number }>();
function trimmed(img: HTMLImageElement): CanvasImageSource & { width: number; height: number } {
  const hit = trimCache.get(img); if (hit) return hit;
  let out: CanvasImageSource & { width: number; height: number } = img;
  try {
    const W = img.naturalWidth || img.width, H = img.naturalHeight || img.height;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d', { willReadFrequently: true })!; x.drawImage(img, 0, 0);
    const px = x.getImageData(0, 0, W, H).data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < W; xx++) {
      const i = (yy * W + xx) * 4;
      if (px[i + 3] > 24 && (px[i] < 238 || px[i + 1] < 238 || px[i + 2] < 238)) {
        if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy;
      }
    }
    if (x1 > x0 && y1 > y0) {
      const pad = Math.round(Math.max(W, H) * 0.01);
      x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
      const t = document.createElement('canvas'); t.width = x1 - x0 + 1; t.height = y1 - y0 + 1;
      t.getContext('2d')!.drawImage(c, x0, y0, t.width, t.height, 0, 0, t.width, t.height);
      out = t;
    }
  } catch { /* a logo we cannot read is used as it is */ }
  trimCache.set(img, out); return out;
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
    const lg = trimmed(logo);
    const k = Math.min(boxW / lg.width, boxH / lg.height);
    const lwid = lg.width * k, lhei = lg.height * k;
    ctx.drawImage(lg, p, (h - lhei) / 2, lwid, lhei);
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

  /* Identity: who they are to XionERP, their company when a logo stands on the left, and an address. */
  const ix = x1 + p, iwid = iw - 2 * p;
  const identity = (dy: number): number => {
  const small = Math.min(h * 0.085, w * 0.014);
  ctx.font = `700 ${small}px ${FONT}`; ctx.fillStyle = '#2F63C9';
  const labelSize = fit(ctx, label, iwid, small, small * 0.6, 700);
  ctx.font = `700 ${labelSize}px ${FONT}`;
  let y = p + labelSize;
  ctx.fillText(label, ix, y + dy);
  y += labelSize * 0.9;                                   // clear space under the label
  if (logo) {
    const cs = fit(ctx, d.companyName, iwid, h * 0.14, h * 0.08, 700);
    ctx.font = `700 ${cs}px ${FONT}`; ctx.fillStyle = INK;
    const lines = wrap(ctx, d.companyName, iwid, 2); y += cs;
    lines.forEach((t) => { ctx.fillText(t, ix, y + dy); y += cs * 1.2; });
    y -= cs * 0.2;
  }
  if (d.address) {
    const as = Math.min(h * 0.08, w * 0.0135); ctx.font = `400 ${as}px ${FONT}`; ctx.fillStyle = MUTED;
    y += as * 0.5 + (logo ? as * 0.3 : as * 0.6);
    const room = Math.floor((h - p - y) / (as * 1.3)) + 1;
    if (room >= 1) wrap(ctx, d.address, iwid, Math.min(room, 3)).forEach((t) => { ctx.fillText(t, ix, y + dy); y += as * 1.3; });
  }
  return y;
  };
  /* Measure the block first, then centre it between the top and bottom margins. */
  const endY = (() => { ctx.save(); ctx.globalAlpha = 0; const e = identity(0); ctx.restore(); return e; })();
  const lastBottom = endY - (d.address ? Math.min(h * 0.08, w * 0.0135) * 0.3 : 0);
  identity(Math.max(0, (h - p - lastBottom - p) / 2));

  /* Contacts: up to four lines at one size, so the column reads as a block. */
  const cx = x2 + p / 2, cw = w - p - cx;
  const lines = [
    { t: d.contactName, bold: true }, { t: d.phone }, { t: d.email }, { t: d.website },
  ].filter((l) => l.t);
  if (lines.length) {
    const fs0 = Math.min(h * 0.105, w * 0.019);
    let fs = fs0;
    lines.forEach((l) => { fs = Math.min(fs, fit(ctx, l.t!, cw, fs0, fs0 * 0.55, l.bold ? 700 : 500)); });
    const lh = Math.min(fs * 1.55, (h - 2 * p) / lines.length);
    let yy = (h - (lines.length - 1) * lh) / 2 + fs * 0.35;
    lines.forEach((l) => {
      ctx.font = `${l.bold ? 700 : 500} ${fs}px ${FONT}`; ctx.fillStyle = l.bold ? NAVY : INK;
      ctx.fillText(l.t!, cx, yy); yy += lh;
    });
  }
  return c;
}
