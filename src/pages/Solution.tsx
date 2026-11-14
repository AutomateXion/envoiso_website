import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Plus } from '../components/Icons';
import { APP_SIGNUP_URL } from '../components/Nav';
import { trackClick } from '../lib/analytics';
import data from '../data/solutions.json';
import seo from '../data/seo.json';

type Sol = (typeof data.solutions)[number] & { external?: { label: string; href: string } };
const sols = data.solutions as Sol[];

const INCLUDED_HEADING: Record<string, string> = {
  module: 'Everything in this area, on one platform',
  country: 'Everything in this area, on one platform',
  industry: 'What your business gets, on one platform',
  compare: 'What you get with XionERP',
};

export default function Solution() {
  const { slug } = useParams();
  const s = sols.find((x) => x.slug === slug);
  const [open, setOpen] = useState<number | null>(0);
  if (!s) return (<section className="page-hero"><div className="wrap"><h1 className="page-h">Page not found</h1><p className="page-sub"><Link to="/">Back to the XionERP home page</Link></p></div></section>);
  const url = `${seo.origin}/solutions/${s.slug}/`;
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const crumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'XionERP', item: seo.origin + '/' },
      { '@type': 'ListItem', position: 2, name: s.eyebrow, item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />{s.eyebrow}</span>
          <h1 className="page-h">{s.h1}</h1>
          <p className="page-sub">{s.intro}</p>
          <div className="hero-cta" style={{ marginTop: 24 }}>
            <a className="btn btn-primary btn-lg" href={APP_SIGNUP_URL} onClick={() => trackClick('solution_start_trial', s.slug)}>Start free trial</a>
            <Link className="btn btn-ghost btn-lg" to="/contact">Talk to us</Link>
          </div>
        </div>
      </section>

      <section className="sol-sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">What is included</div>
            <h2 className="sec-h">{INCLUDED_HEADING[s.kind] ?? INCLUDED_HEADING.module}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {s.groups.map((g) => (
              <div className="fw-card" key={g.heading}>
                <h3>{g.heading}</h3>
                <p>{g.blurb}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'grid', gap: 8 }}>
                  {g.items.map((i) => (<li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ flex: '0 0 auto', marginTop: 3 }}><Check /></span><span>{i}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>Every XionERP plan includes every module. Plans differ only by the number of user seats. <Link to="/pricing">See pricing</Link>.{s.external && <> <a href={s.external.href}>{s.external.label}</a>.</>}</p>
        </div>
      </section>

      <section className="faq">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">FAQ</div>
            <h2 className="sec-h">Questions, answered</h2>
          </div>
          <div className="faq-list">
            {s.faqs.map((f, i) => (
              <div className={'faq-item' + (open === i ? ' open' : '')} key={f.q}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{f.q}<Plus /></button>
                {open === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-sec">
        <div className="wrap">
          <div className="sec-head"><h2 className="sec-h">Related on XionERP</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {s.related.map((r) => { const o = sols.find((x) => x.slug === r)!; return (
              <Link className="fw-card" key={r} to={`/solutions/${r}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{o.eyebrow}</h3><p>{o.h1}</p>
              </Link>); })}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <div className="final-card">
            <h2>See it on your own numbers</h2>
            <p>Start a 30-day free trial and run your own data through XionERP.</p>
            <a className="btn btn-white btn-lg" href={APP_SIGNUP_URL} onClick={() => trackClick('solution_final_cta', s.slug)}>Start your free trial</a>
            <div className="hero-note"><Check />No credit card &middot; Cancel anytime</div>
          </div>
        </div>
      </section>
    </>
  );
}
