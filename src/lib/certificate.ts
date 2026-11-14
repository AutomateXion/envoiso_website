import { PDFDocument } from 'pdf-lib';
import { badgeFor, drawBadge } from './badge';

/* The certificate, drawn on a canvas at A4 landscape (150 dpi). It uses the real
   XionERP logo file, never a redrawn one. */
const W = 1754, H = 1240;
const NAVY = '#103080', INK = '#0F2A44', MUTED = '#5B7186', LINE = '#C9D6E6', BLUE = '#5090F1';

const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
  const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('image')); i.src = src;
});

export type CertificateData = { name: string; course: string; issuedAt: string; code: string };

export async function drawCertificate(d: CertificateData): Promise<HTMLCanvasElement> {
  try { await Promise.all([document.fonts.load('600 80px Fraunces'), document.fonts.load('500 30px Inter'), document.fonts.load('700 30px Inter')]); } catch { /* fall back to the system fonts */ }
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d')!;
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
  x.strokeStyle = NAVY; x.lineWidth = 6; x.strokeRect(46, 46, W - 92, H - 92);
  const badge = badgeFor(d.course); const accent = badge?.accent ?? BLUE;
  x.strokeStyle = accent; x.lineWidth = 2; x.strokeRect(66, 66, W - 132, H - 132);
  x.textAlign = 'center'; x.textBaseline = 'alphabetic';

  try {
    const logo = await loadImg('/logo-horizontal.png');
    const h = 96, w = logo.width * (h / logo.height);
    x.drawImage(logo, (W - w) / 2, 150, w, h);
  } catch { x.fillStyle = NAVY; x.font = '700 64px Inter, sans-serif'; x.fillText('XionERP', W / 2, 220); }

  x.fillStyle = accent; x.font = '600 26px Inter, sans-serif';
  (x as any).letterSpacing = '8px'; x.fillText('CERTIFICATE OF COMPLETION', W / 2, 360); (x as any).letterSpacing = '0px';
  x.fillStyle = MUTED; x.font = '500 30px Inter, sans-serif'; x.fillText('This certifies that', W / 2, 450);

  let size = 104; x.fillStyle = NAVY;
  do { x.font = `600 ${size}px Fraunces, Georgia, serif`; size -= 4; } while (x.measureText(d.name).width > W - 360 && size > 40);
  x.fillText(d.name, W / 2, 575);
  x.strokeStyle = LINE; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 360, 612); x.lineTo(W / 2 + 360, 612); x.stroke();

  x.fillStyle = MUTED; x.font = '500 30px Inter, sans-serif'; x.fillText('has completed the course', W / 2, 690);
  let cs = 62; x.fillStyle = INK;
  do { x.font = `600 ${cs}px Fraunces, Georgia, serif`; cs -= 2; } while (x.measureText(d.course).width > W - 360 && cs > 30);
  x.fillText(d.course, W / 2, 775);

  const date = new Date(d.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  x.fillStyle = INK; x.font = '600 28px Inter, sans-serif'; x.fillText(date, W / 2, 930);
  x.fillStyle = MUTED; x.font = '500 22px Inter, sans-serif'; x.fillText('Date issued', W / 2, 966);

  x.fillStyle = MUTED; x.font = '500 22px Inter, sans-serif';
  x.fillText(`Certificate code ${d.code}  ·  Verify at xionerp.com/academy/verify/${d.code}`, W / 2, 1090);
  x.fillText('XionERP Academy  ·  xionerp.com/academy', W / 2, 1126);
  if (badge) { try { const b = await drawBadge(badge); x.drawImage(b, W - 66 - 40 - 230, H - 66 - 36 - 230, 230, 230); } catch { /* the certificate stands without it */ } }
  return c;
}

export const certificatePng = (c: HTMLCanvasElement) => new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('png'))), 'image/png'));

export async function certificatePdf(c: HTMLCanvasElement): Promise<Blob> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([841.89, 595.28]);
  const img = await doc.embedPng(await (await certificatePng(c)).arrayBuffer());
  page.drawImage(img, { x: 0, y: 0, width: 841.89, height: 595.28 });
  const bytes = await doc.save();
  return new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
}

export function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
