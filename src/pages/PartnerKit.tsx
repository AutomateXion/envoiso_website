import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderStamp, loadImage, type KitDisplay, type KitMeta } from '../lib/partnerStamp';

const API = 'https://cloud.xionerp.com/api/v1/public/partner-kit';
type Stamp = { page?: number; x: number; y: number; w: number; h: number; layout: string };
type KitFile = { id: string; group: string; title: string; desc: string; file: string; kind: 'pdf' | 'png'; stamps?: (Stamp & { page: number })[]; stamp?: Stamp };
type View = { partnerCode: string; partnerType: 'RESELLER' | 'DISTRIBUTOR'; country: string; distributorName: string | null; hasLogo: boolean; display: KitDisplay };

const LOGOS = [
  { name: 'XionERP', src: '/logo-horizontal.png', dark: false }, { name: 'XionERP, for dark backgrounds', src: '/logo-horizontal-reversed.png', dark: true },
  { name: 'XionConnect', src: '/logo-connect-horizontal.png', dark: false }, { name: 'Xion Webstore', src: '/logo-webstore-horizontal.png', dark: false },
  { name: 'XionERP mark', src: '/mark-colour.png', dark: false }, { name: 'XionTransform mark', src: '/mark-transform.png', dark: false },
];
const safe = (s: string) => s.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60) || 'Partner';
const FIELDS: [keyof KitDisplay, string, string][] = [
  ['companyName', 'Company name', 'As you want it printed'], ['contactName', 'Contact name', 'Who customers should ask for'],
  ['phone', 'Phone', '+974 0000 0000'], ['email', 'Email', 'name@company.com'],
  ['website', 'Website', 'www.company.com'], ['address', 'Address', 'Street, city, country'],
];

function download(blob: Blob, name: string) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

/** The logo the partner uploaded, scaled down in the browser so the upload stays small. */
async function prepareLogo(file: File): Promise<string> {
  if (!/^image\/(png|jpeg)$/.test(file.type)) throw new Error('Choose a PNG or JPEG file.');
  const url = URL.createObjectURL(file);
  try {
    const im = await loadImage(url);
    const k = Math.min(1, 900 / im.width, 450 / im.height);
    const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
    const ctx = c.getContext('2d')!;
    if (file.type === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); }
    ctx.drawImage(im, 0, 0, c.width, c.height);
    let out = c.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.92);
    if (out.length > 2_000_000) out = c.toDataURL('image/jpeg', 0.88);
    return out;
  } finally { URL.revokeObjectURL(url); }
}

export default function PartnerKit() {
  const token = useMemo(() => (/[#&]t=([0-9a-f]{48})/.exec(window.location.hash) || [])[1] || '', []);
  const [view, setView] = useState<View | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'bad' | 'error'>('loading');
  const [form, setForm] = useState<KitDisplay | null>(null);
  const [files, setFiles] = useState<KitFile[]>([]);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [busy, setBusy] = useState<string>('');
  const prev = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = 'Your XionERP partner kit';
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow'; document.head.appendChild(m);
    return () => { m.remove(); };
  }, []);

  const loadLogo = async () => {
    try {
      const r = await fetch(`${API}/${token}/logo?ts=${Date.now()}`);
      if (!r.ok) { setLogoImg(null); return; }
      const url = URL.createObjectURL(await r.blob());
      setLogoImg(await loadImage(url));
    } catch { setLogoImg(null); }
  };

  useEffect(() => {
    if (!token) { setState('bad'); return; }
    fetch(`${API}/${token}`, { headers: { Accept: 'application/json' } })
      .then(async (r) => { if (r.status === 404) { setState('bad'); return; } if (!r.ok) throw new Error(); const v: View = await r.json(); setView(v); setForm(v.display); setState('ok'); if (v.hasLogo) loadLogo(); })
      .catch(() => setState('error'));
    fetch('/media-kit/manifest.json').then((r) => r.json()).then((m) => setFiles(m.files || [])).catch(() => setFiles([]));
  }, [token]);

  const meta: KitMeta | null = view ? { partnerType: view.partnerType, country: view.country } : null;

  /* A live look at the strip that will be printed on every piece. */
  useEffect(() => {
    if (!form || !meta || !prev.current) return;
    const s = renderStamp(form, logoImg, meta, 1080, 190, 1);
    const c = prev.current; c.width = s.width; c.height = s.height;
    const ctx = c.getContext('2d')!; ctx.fillStyle = '#F3F6FA'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(s, 0, 0);
  }, [form, logoImg, view]); // eslint-disable-line react-hooks/exhaustive-deps

  const post = async (path: string, body: unknown) => {
    const r = await fetch(`${API}/${token}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) {
      let m = 'Something went wrong. Please try again.';
      try { const b = await r.json(); if (r.status === 429) m = 'Too many attempts. Please wait a few minutes.'; else if (b?.message) m = Array.isArray(b.message) ? b.message.join(' · ') : String(b.message); } catch { /* keep default */ }
      throw new Error(m);
    }
    return r.json();
  };

  const save = async () => {
    if (!form) return; setBusy('save'); setMsg(null);
    try { await post('details', form); setMsg({ ok: true, t: 'Your details are saved.' }); }
    catch (e: any) { setMsg({ ok: false, t: e.message }); } finally { setBusy(''); }
  };

  const upload = async (f: File | undefined) => {
    if (!f) return; setBusy('logo'); setMsg(null);
    try { const dataUrl = await prepareLogo(f); await post('logo', { dataUrl }); await loadLogo(); setMsg({ ok: true, t: 'Your logo is saved.' }); }
    catch (e: any) { setMsg({ ok: false, t: e.message }); } finally { setBusy(''); }
  };

  const getFile = async (f: KitFile) => {
    if (!form || !meta) return; setBusy(f.id); setMsg(null);
    try {
      const name = `${safe(form.companyName)} - ${f.title}`;
      if (f.kind === 'png' && f.stamp) {
        const base = await loadImage(`/media-kit/${f.file}`);
        const c = document.createElement('canvas'); c.width = base.width; c.height = base.height;
        const ctx = c.getContext('2d')!; ctx.drawImage(base, 0, 0);
        ctx.drawImage(renderStamp(form, logoImg, meta, f.stamp.w, f.stamp.h, 1), f.stamp.x, f.stamp.y);
        const blob: Blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('Could not create the image'))), 'image/png'));
        download(blob, `${name}.png`);
      } else if (f.kind === 'pdf' && f.stamps) {
        const { PDFDocument } = await import('pdf-lib');
        const doc = await PDFDocument.load(await (await fetch(`/media-kit/${f.file}`)).arrayBuffer());
        const pages = doc.getPages();
        for (const s of f.stamps) {
          const cv = renderStamp(form, logoImg, meta, s.w, s.h, 4);
          const png = await doc.embedPng(await new Promise<ArrayBuffer>((res, rej) => cv.toBlob((b) => (b ? b.arrayBuffer().then(res) : rej(new Error('Could not create the file'))), 'image/png')));
          pages[s.page].drawImage(png, { x: s.x, y: s.y, width: s.w, height: s.h });
        }
        doc.setTitle(name); doc.setAuthor(form.companyName);
        const bytes = await doc.save();
        download(new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' }), `${name}.pdf`);
      }
    } catch (e: any) { setMsg({ ok: false, t: `That file could not be made: ${e.message}` }); } finally { setBusy(''); }
  };

  const groups = useMemo(() => { const g = new Map<string, KitFile[]>(); files.forEach((f) => g.set(f.group, [...(g.get(f.group) || []), f])); return [...g.entries()]; }, [files]);
  const inp: React.CSSProperties = { width: '100%', padding: '11px 12px', border: '1px solid var(--line)', borderRadius: 8, font: 'inherit', background: '#fff', color: 'var(--ink)' };

  if (state === 'loading') return <section className="sol-sec"><div className="wrap"><p>Opening your kit…</p></div></section>;
  if (state === 'error') return <section className="sol-sec"><div className="wrap"><h1 className="page-h">We could not open your kit just now</h1><p>Please try again in a moment.</p></div></section>;
  if (state === 'bad' || !view || !form) return (
    <section className="sol-sec"><div className="wrap" style={{ maxWidth: 680 }}>
      <h1 className="page-h">This link is not valid</h1>
      <p>Your partner media kit opens from the private link in your welcome email. Please copy the whole link, or reply to that email and we will send you a new one.</p>
      <p><Link to="/partners">Back to Partners</Link></p></div></section>);

  return (
    <>
      <section className="page-hero"><div className="wrap">
        <span className="eb-pill eyebrow"><span className="dot" />Partner kit · {view.partnerCode}</span>
        <h1 className="page-h">Welcome, {form.companyName}</h1>
        <p className="page-sub">Everything you need to introduce XionERP in {view.country}, with your own logo and contact details on it. Add them once, then download each piece ready to share.</p>
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ maxWidth: 960 }}>
        <div className="sec-head"><div className="sec-eyebrow">Step 1</div><h2 className="sec-h">Your logo and contact details</h2></div>
        <div className="fw-card" style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {FIELDS.map(([k, label, ph]) => (
              <label key={k} style={{ display: 'grid', gap: 6, fontSize: 14, fontWeight: 600 }}>{label}
                <input style={inp} value={form[k]} placeholder={ph} maxLength={k === 'address' ? 300 : 200}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })} /></label>))}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={save} disabled={busy === 'save'}>{busy === 'save' ? 'Saving…' : 'Save my details'}</button>
            <label className="btn btn-ghost" style={{ cursor: 'pointer' }}>{busy === 'logo' ? 'Uploading…' : logoImg ? 'Replace my logo' : 'Upload my logo'}
              <input type="file" accept="image/png,image/jpeg" style={{ display: 'none' }} onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} /></label>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>PNG or JPEG, up to 1.5 MB. A transparent PNG looks best.</span>
          </div>
          {msg && <div role="status" style={{ fontSize: 14, color: msg.ok ? '#0b7a4b' : '#b42318', fontWeight: 600 }}>{msg.t}</div>}
          <div>
            <div className="sec-eyebrow" style={{ marginBottom: 8 }}>How it will look on your materials</div>
            <canvas ref={prev} style={{ width: '100%', maxWidth: 900, height: 'auto', border: '1px solid var(--line)', borderRadius: 8, display: 'block' }} />
            {!logoImg && <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>Without a logo, your company name is printed instead.</div>}
          </div>
        </div>
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ maxWidth: 960 }}>
        <div className="sec-head"><div className="sec-eyebrow">Step 2</div><h2 className="sec-h">Download your branded materials</h2>
          <p className="sec-sub">Each file is made in your browser with the details above. Save your details first if you changed them.</p></div>
        {groups.map(([g, list]) => (
          <div key={g} style={{ marginBottom: 22 }}>
            <div className="sec-eyebrow" style={{ marginBottom: 10 }}>{g}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {list.map((f) => (
                <div className="fw-card" key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h3 style={{ margin: 0 }}>{f.title}</h3><div style={{ fontSize: 13, color: 'var(--muted)' }}>{f.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 10 }}>
                    <button className="btn btn-primary" onClick={() => getFile(f)} disabled={!!busy}>{busy === f.id ? 'Preparing…' : `Download ${f.kind === 'pdf' ? 'PDF' : 'PNG'}`}</button></div>
                </div>))}
            </div>
          </div>))}
      </div></section>

      <section className="sol-sec"><div className="wrap" style={{ maxWidth: 960 }}>
        <div className="sec-head"><div className="sec-eyebrow">Logos</div><h2 className="sec-h">XionERP and the Xion product logos</h2>
          <p className="sec-sub">Use them exactly as supplied. The pack includes colour and dark-background versions and a short usage guide.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
          {LOGOS.map((l) => (
            <div key={l.src} className="fw-card" style={{ background: l.dark ? '#0C2568' : '#fff', display: 'grid', gap: 10, justifyItems: 'start' }}>
              <img src={l.src} alt={l.name} style={{ height: 40, maxWidth: '100%', objectFit: 'contain', objectPosition: 'left' }} />
              <div style={{ fontSize: 12, color: l.dark ? '#D6E4FB' : 'var(--muted)' }}>{l.name}</div></div>))}
        </div>
        <a className="btn btn-primary" href="/media-kit/xion-logo-pack.zip" download>Download the logo pack (ZIP)</a>
        <p style={{ marginTop: 24, fontSize: 14, color: 'var(--muted)' }}>Questions about any of this? Reply to your welcome email and it reaches our team directly.</p>
      </div></section>
    </>
  );
}
