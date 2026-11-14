import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { certificatePdf, certificatePng, drawCertificate, saveBlob } from '../lib/certificate';
import { badgeFor, drawBadge } from '../lib/badge';
import { linkedInLinks } from '../lib/linkedin';
import AcademyBadge from '../components/AcademyBadge';

const API = 'https://cloud.xionerp.com/api/v1/public/academy';
type V = { valid: boolean; code: string; name?: string; course?: string; issuedAt?: string };

export default function AcademyVerify() {
  const { code = '' } = useParams();
  const nav = useNavigate();
  const fresh = !!(useLocation().state as any)?.fresh;
  const [v, setV] = useState<V | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'missing' | 'error'>(code ? 'loading' : 'idle');
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState('');
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow'; document.head.appendChild(m);
    return () => { m.remove(); };
  }, []);

  useEffect(() => {
    if (!code) return;
    let off = false; setState('loading'); setV(null);
    fetch(`${API}/verify/${encodeURIComponent(code)}`).then(async (r) => {
      if (off) return; if (r.status === 404) { setState('missing'); return; } if (!r.ok) { setState('error'); return; }
      const j: V = await r.json(); setV(j); setState('idle');
    }).catch(() => { if (!off) setState('error'); });
    return () => { off = true; };
  }, [code]);

  useEffect(() => {
    if (!v?.valid || !v.name || !v.course || !v.issuedAt) return;
    let off = false;
    drawCertificate({ name: v.name, course: v.course, issuedAt: v.issuedAt, code: v.code }).then((c) => {
      if (off || !host.current) return; canvas.current = c; c.style.cssText = 'width:100%;height:auto;display:block;border:1px solid var(--line);border-radius:8px';
      host.current.replaceChildren(c);
    });
    return () => { off = true; };
  }, [v]);

  const badgeHost = useRef<HTMLDivElement>(null);
  const badgeCanvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const b = v?.valid && v.course ? badgeFor(v.course) : undefined; if (!b) return; let off = false;
    drawBadge(b).then((c) => { if (off || !badgeHost.current) return; badgeCanvas.current = c; c.style.cssText = 'width:100%;height:auto;display:block;border-radius:6px'; badgeHost.current.replaceChildren(c); });
    return () => { off = true; };
  }, [v]);
  const dlBadge = async () => { if (badgeCanvas.current) saveBlob(await certificatePng(badgeCanvas.current), `XionERP-badge-${v?.code || code}.png`); };

  const file = `XionERP-certificate-${v?.code || code}`;
  const dl = async (kind: 'pdf' | 'png') => {
    if (!canvas.current) return; setBusy(kind);
    try { saveBlob(kind === 'pdf' ? await certificatePdf(canvas.current) : await certificatePng(canvas.current), `${file}.${kind}`); } finally { setBusy(''); }
  };
  const look = (e: React.FormEvent) => { e.preventDefault(); const c = typed.trim().toUpperCase(); if (c) nav(`/academy/verify/${encodeURIComponent(c)}`); };

  return (
    <section className="sol-sec"><div className="wrap" style={{ maxWidth: 980 }}>
      <AcademyBadge />
      {state === 'loading' && <p>Checking the certificate…</p>}
      {state === 'error' && <><h1 className="page-h">We could not check that just now</h1><p>Please try again in a moment.</p></>}
      {state === 'missing' && <><h1 className="page-h">We could not find that certificate</h1><p>Check the code and try again. A code looks like XC-ABCDE12345.</p></>}
      {v && !v.valid && <><h1 className="page-h">This certificate is no longer valid</h1><p>The certificate with code {v.code} has been withdrawn.</p></>}
      {v?.valid && (
        <>
          <h1 className="page-h" style={{ fontSize: 'clamp(28px, 5vw, 42px)', textAlign: 'left', margin: '14px 0 8px', maxWidth: 'none' }}>{fresh ? 'Congratulations, ' + v.name : 'Valid certificate'}</h1>
          <p style={{ lineHeight: 1.7 }}>{fresh ? 'Your certificate is below. We have also emailed you a link to it.' : <>This certificate was issued to <strong>{v.name}</strong> for <strong>{v.course}</strong> on {new Date(v.issuedAt!).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.</>}</p>
          <div ref={host} style={{ margin: '18px 0', minHeight: 120 }} aria-label="Certificate" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => dl('pdf')} disabled={!!busy}>{busy === 'pdf' ? 'Preparing…' : 'Download PDF'}</button>
            <button type="button" className="btn btn-ghost" onClick={() => dl('png')} disabled={!!busy}>{busy === 'png' ? 'Preparing…' : 'Download image'}</button>
          </div>
          {v.course && badgeFor(v.course) && (
            <div style={{ marginTop: 22, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', padding: '18px 20px', border: '1px solid var(--line)', borderRadius: 10 }}>
              <div ref={badgeHost} style={{ width: 150, flex: 'none' }} aria-label="Badge" />
              <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                <h2 style={{ fontSize: 18, margin: '0 0 6px' }}>Your badge</h2>
                <p style={{ margin: '0 0 12px', lineHeight: 1.6, fontSize: 15 }}>A square image for your LinkedIn post, your profile or your email signature.</p>
                <button type="button" className="btn btn-ghost" onClick={dlBadge}>Download badge</button>
              </div>
            </div>
          )}
          {(() => {
            const li = linkedInLinks({ code: v.code, course: v.course!, issuedAt: v.issuedAt! });
            return (
              <div style={{ marginTop: 22, padding: '18px 20px', border: '1px solid var(--line)', borderRadius: 10 }}>
                <h2 style={{ fontSize: 18, margin: '0 0 6px' }}>{fresh ? 'Show it on LinkedIn' : 'Is this your certificate? Show it on LinkedIn'}</h2>
                <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>
                  Add it to your profile under Licenses &amp; certifications: the name, issuer, date, code and link are filled in for you.
                  Then post it on your feed; download the image above if you want the certificate itself in the post.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a className="btn" href={li.addToProfile} target="_blank" rel="noopener noreferrer" style={{ background: '#0A66C2', color: '#fff', borderColor: '#0A66C2' }}>Add to LinkedIn profile</a>
                  <a className="btn btn-ghost" href={li.shareOnFeed} target="_blank" rel="noopener noreferrer">Post on my LinkedIn feed</a>
                </div>
              </div>
            );
          })()}
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 14 }}>Share this page so anyone can check the certificate: xionerp.com/academy/verify/{v.code}</p>
        </>
      )}
      <form onSubmit={look} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
        <input aria-label="Certificate code" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Check another code: XC-XXXXXXXXXX"
          style={{ flex: '1 1 260px', padding: '11px 12px', border: '1px solid var(--line)', borderRadius: 8, font: 'inherit' }} />
        <button className="btn btn-ghost" type="submit">Check</button>
      </form>
      <p style={{ marginTop: 18 }}><Link to="/academy">Back to the Academy</Link></p>
    </div></section>
  );
}
