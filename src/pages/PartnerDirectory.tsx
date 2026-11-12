import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroVideo from '../components/HeroVideo';

const API = 'https://cloud.xionerp.com/api/v1';

type P = {
  code: string; partnerType: 'RESELLER' | 'DISTRIBUTOR'; companyName: string; groupName: string | null;
  country: string; city: string | null; address: string | null; website: string | null;
  email: string | null; phone: string | null; distributorName: string | null; distributorCode: string | null;
};

const crumbLd = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xionerp.com/' },
    { '@type': 'ListItem', position: 2, name: 'Partners', item: 'https://xionerp.com/partners' },
    { '@type': 'ListItem', position: 3, name: 'Find a partner', item: 'https://xionerp.com/partners/directory' },
  ],
};

function Card({ p }: { p: P }) {
  const host = p.website ? p.website.replace(/^https?:\/\//i, '').replace(/\/$/, '') : '';
  return (
    <div className="fw-card">
      <h3 style={{ marginBottom: 2 }}>{p.companyName}</h3>
      <div className="sec-eyebrow" style={{ marginBottom: 8 }}>
        {p.partnerType === 'DISTRIBUTOR' ? 'Distributor' : 'Reseller'}{p.groupName ? ` · ${p.groupName} group` : ''}
      </div>
      {(p.address || p.city) && <p style={{ margin: '0 0 6px' }}>{p.address || p.city}</p>}
      <p style={{ margin: 0, display: 'grid', gap: 3 }}>
        {p.phone && <span>{p.phone}</span>}
        {p.email && <span>{p.email}</span>}
        {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer">{host}</a>}
      </p>
    </div>
  );
}

export default function PartnerDirectory() {
  const [items, setItems] = useState<P[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [country, setCountry] = useState('');
  const [type, setType] = useState<'ALL' | 'DISTRIBUTOR' | 'RESELLER'>('ALL');
  const [q, setQ] = useState('');

  useEffect(() => {
    const ctl = new AbortController();
    fetch(`${API}/public/partners-directory`, { headers: { Accept: 'application/json' }, signal: ctl.signal })
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((d) => { setItems(d.items || []); setCountries(d.countries || []); setState('ok'); })
      .catch((e) => { if (e?.name !== 'AbortError') setState('error'); });
    return () => ctl.abort();
  }, []);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((p) => (!country || p.country === country)
      && (type === 'ALL' || p.partnerType === type)
      && (!s || [p.companyName, p.groupName, p.city, p.country].some((v) => String(v || '').toLowerCase().includes(s))));
  }, [items, country, type, q]);

  /* Country → distributor → its resellers; resellers served directly sit last. */
  const byCountry = useMemo(() => {
    const m = new Map<string, P[]>();
    shown.forEach((p) => m.set(p.country, [...(m.get(p.country) || []), p]));
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [shown]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <section className="page-hero page-hero--video">
        <HeroVideo name="partners-hero" />
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Partners</span>
          <h1 className="page-h">Find a XionERP partner</h1>
          <p className="page-sub">Our distributors cover a country; resellers work with businesses locally, under the distributor of their country. Search by country, company or city.</p>
        </div>
      </section>

      <section className="sol-sec">
        <div className="wrap">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            <select aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)}
              style={{ padding: '10px 12px', minWidth: 190 }}>
              <option value="">All countries</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select aria-label="Partner type" value={type} onChange={(e) => setType(e.target.value as any)}
              style={{ padding: '10px 12px' }}>
              <option value="ALL">Distributors and resellers</option>
              <option value="DISTRIBUTOR">Distributors</option>
              <option value="RESELLER">Resellers</option>
            </select>
            <input type="search" aria-label="Search" placeholder="Search company or city" value={q}
              onChange={(e) => setQ(e.target.value)} style={{ padding: '10px 12px', flex: '1 1 220px', minWidth: 0 }} />
          </div>

          {state === 'loading' && <p>Loading partners…</p>}
          {state === 'error' && <p>The partner list could not be loaded just now. Please try again in a moment, or <Link to="/contact">contact us</Link>.</p>}
          {state === 'ok' && !byCountry.length && (
            <p>No partners match that search yet. <Link to="/contact">Contact us</Link> and we will put you in touch with the right team.</p>)}

          {byCountry.map(([c, list]) => {
            const dists = list.filter((p) => p.partnerType === 'DISTRIBUTOR');
            const direct = list.filter((p) => p.partnerType === 'RESELLER' && !p.distributorCode);
            return (
              <div key={c} style={{ marginBottom: 36 }}>
                <h2 className="sec-h" style={{ fontSize: 24, marginBottom: 16 }}>{c}</h2>
                {dists.map((d) => {
                  const kids = list.filter((p) => p.partnerType === 'RESELLER' && p.distributorCode === d.code);
                  return (
                    <div key={d.code} style={{ marginBottom: 20 }}>
                      <Card p={d} />
                      {kids.length > 0 && (
                        <div style={{ marginLeft: 18, paddingLeft: 18, borderLeft: '2px solid rgba(127,127,127,.35)', marginTop: 12 }}>
                          <div className="sec-eyebrow" style={{ marginBottom: 10 }}>Resellers working with {d.companyName}</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                            {kids.map((r) => <Card key={r.code} p={r} />)}
                          </div>
                        </div>)}
                    </div>);
                })}
                {direct.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                    {direct.map((r) => <Card key={r.code} p={r} />)}
                  </div>)}
              </div>);
          })}

          <p style={{ marginTop: 8 }}>Want to be on this list? <Link to="/partners#apply">Apply to become a partner</Link>. Already a partner? <Link to="/partners/kit">Sign in to your partner kit</Link>.</p>
        </div>
      </section>
    </>
  );
}
