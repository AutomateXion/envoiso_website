import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from '../components/Icons';
import { trackClick } from '../lib/analytics';
import HeroVideo from '../components/HeroVideo';
import seo from '../data/seo.json';

const API = 'https://cloud.xionerp.com/api/v1';
const COUNTRIES = [
  'Oman', 'Qatar', 'United Arab Emirates', 'Saudi Arabia', 'Kuwait', 'Bahrain',
  'Sri Lanka', 'India', 'Pakistan', 'Bangladesh', 'Maldives', 'Nepal',
];

const TYPES = [
  {
    key: 'RESELLER', name: 'Reseller',
    blurb: 'You sell XionERP to your own customers, set them up and look after them day to day.',
    points: ['Sell and implement XionERP for businesses in your country', 'First-line support for the customers you bring', 'Our team supports you on anything deeper'],
  },
  {
    key: 'DISTRIBUTOR', name: 'Distributor',
    blurb: 'You cover a whole country: you appoint and support resellers and are the local face of XionERP.',
    points: ['Cover a country, not a city', 'Build and support a network of resellers', 'Work with our team on onboarding, training and local compliance'],
  },
];

const STEPS = [
  { h: 'Apply', p: 'Tell us about your company, the country you would cover and your experience. It takes about five minutes.' },
  { h: 'We review', p: 'Our team reads every application and may ask you for more detail. You hear from us within a few business days.' },
  { h: 'Onboarding call', p: 'If it looks like a fit, we talk through the product, how you would sell it and how we would work together.' },
  { h: 'Agreement', p: 'Terms are agreed with you directly and put in a partner agreement before you start selling.' },
];

const WHO = [
  'A registered company in the country you want to cover',
  'Experience selling or implementing business software, or serving small and mid-size businesses',
  'A team that can give customers first-line support in their own language',
  'Customer references are welcome, but not required to apply',
];

const FAQS = [
  { q: 'What is the difference between a reseller and a distributor?', a: 'A reseller sells XionERP to its own customers. A distributor covers a whole country and also appoints and supports resellers there. If you are unsure which fits you, apply as a reseller and tell us about your plans in the note. We will talk it through.' },
  { q: 'Does it cost anything to apply?', a: 'No. Applying is free and does not commit either side. If we go ahead, the terms are agreed with you directly and put in a partner agreement.' },
  { q: 'How long does the review take?', a: 'We reply within a few business days. We may ask for more detail before deciding.' },
  { q: 'Can I cover more than one country?', a: 'Yes. Choose every country you would cover on the form. Cover is by whole country, and we discuss it with you during onboarding.' },
  { q: 'What happens if my application is approved?', a: 'You receive a partner reference and an email from us, then an onboarding call and the partner agreement. Being approved does not create a XionERP company or login for you.' },
  { q: 'Which countries do you work in?', a: 'XionERP serves the GCC and South Asia and is operated from Muscat, Oman. The form lists the countries we are opening first. If yours is not listed, choose Other and tell us in the note.' },
];

type Form = {
  partnerType: string; companyName: string; country: string; website: string; contactName: string;
  contactRole: string; email: string; phone: string; yearsInBusiness: string; teamSize: string;
  industries: string; territories: string[]; erpExperience: string; referencesNote: string;
  message: string; consent: boolean; fax: string;
};
const EMPTY: Form = {
  partnerType: 'RESELLER', companyName: '', country: '', website: '', contactName: '', contactRole: '',
  email: '', phone: '', yearsInBusiness: '', teamSize: '', industries: '', territories: [],
  erpExperience: '', referencesNote: '', message: '', consent: false, fax: '',
};

export default function Partners() {
  const [f, setF] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const set = (k: keyof Form, v: any) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (c: string) => set('territories', f.territories.includes(c) ? f.territories.filter((x) => x !== c) : [...f.territories, c]);

  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
  };
  const crumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'XionERP', item: seo.origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'Partners', item: seo.origin + '/partners' },
    ],
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!f.territories.length) { setErr('Choose at least one country you would cover.'); return; }
    if (!f.consent) { setErr('Please tick the box to say we may contact you about this application.'); return; }
    setBusy(true);
    try {
      const r = await fetch(`${API}/public/partner-applications`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(f),
      });
      if (!r.ok) {
        let msg = 'We could not send your application. Please try again, or email info@automatexion.com.';
        try {
          const b = await r.json();
          if (r.status === 429) msg = 'Too many attempts from this connection. Please try again in a few minutes.';
          else if (b?.message) msg = Array.isArray(b.message) ? b.message.join(' · ') : String(b.message);
        } catch { /* keep the default message */ }
        throw new Error(msg);
      }
      trackClick('partner_application_submit', f.partnerType);
      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (x: any) {
      setErr(x?.message || 'We could not send your application. Please try again.');
    } finally { setBusy(false); }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <section className="page-hero page-hero--video">
        <HeroVideo name="partners-hero" />
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Partners</span>
          <h1 className="page-h">Partner with XionERP</h1>
          <p className="page-sub">Bring a complete cloud ERP, with e-invoicing for the GCC, to the businesses you already serve. Apply as a reseller for your customers, or as a distributor to cover a whole country.</p>
          <div className="hero-cta" style={{ marginTop: 24 }}>
            <a className="btn btn-primary btn-lg" href="#apply" onClick={() => trackClick('partner_apply_cta', 'hero')}>Apply to partner</a>
            <Link className="btn btn-ghost btn-lg" to="/contact">Talk to us first</Link>
            <Link className="btn btn-ghost btn-lg" to="/partners/directory">Find a partner</Link>
          </div>
        </div>
      </section>

      <section className="sol-sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">Two ways to partner</div>
            <h2 className="sec-h">Choose the one that fits how you work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TYPES.map((t) => (
              <div className="fw-card" key={t.key}>
                <h3>{t.name}</h3>
                <p>{t.blurb}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'grid', gap: 8 }}>
                  {t.points.map((i) => (<li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ flex: '0 0 auto', marginTop: 3 }}><Check /></span><span>{i}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">How it works</div>
            <h2 className="sec-h">From application to first customer</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
            {STEPS.map((s, i) => (
              <div className="fw-card" key={s.h}>
                <div className="sec-eyebrow">Step {i + 1}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">Who we are looking for</div>
            <h2 className="sec-h">What a good partner looks like</h2>
          </div>
          <div className="fw-card">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {WHO.map((i) => (<li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ flex: '0 0 auto', marginTop: 3 }}><Check /></span><span>{i}</span></li>))}
            </ul>
            <p style={{ marginTop: 16 }}>Commercial terms are agreed with each partner directly. They are not listed on this page.</p>
          </div>
        </div>
      </section>

      <section className="sol-sec" id="apply">
        <div className="wrap" style={{ maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">Apply</div>
            <h2 className="sec-h">Tell us about your company</h2>
          </div>
          <div className="form-card">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E8F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: '#1E7D4F' }}><Check /></div>
                <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: 'var(--navy)', marginBottom: 8 }}>Application received</h3>
                <p style={{ fontSize: 14.5, color: 'var(--muted)' }}>Thank you. We have emailed you a confirmation and will reply within a few business days.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="field full">
                    <label>I want to apply as a</label>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 6 }}>
                      {TYPES.map((t) => (
                        <label key={t.key} style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                          <input type="radio" name="partnerType" checked={f.partnerType === t.key} onChange={() => set('partnerType', t.key)} />
                          {t.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="companyName">Company name</label>
                    <input id="companyName" required maxLength={200} value={f.companyName} onChange={(e) => set('companyName', e.target.value)} /></div>
                  <div className="field"><label htmlFor="country">Country of registration</label>
                    <select id="country" required value={f.country} onChange={(e) => set('country', e.target.value)}>
                      <option value="" disabled>Select a country</option>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      <option>Other</option>
                    </select></div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="website">Website</label>
                    <input id="website" maxLength={200} placeholder="www.example.com" value={f.website} onChange={(e) => set('website', e.target.value)} /></div>
                  <div className="field"><label htmlFor="yearsInBusiness">Years in business</label>
                    <select id="yearsInBusiness" value={f.yearsInBusiness} onChange={(e) => set('yearsInBusiness', e.target.value)}>
                      <option value="">Select</option><option>Under 1 year</option><option>1&ndash;3 years</option><option>4&ndash;10 years</option><option>Over 10 years</option>
                    </select></div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="contactName">Your name</label>
                    <input id="contactName" required maxLength={200} value={f.contactName} onChange={(e) => set('contactName', e.target.value)} /></div>
                  <div className="field"><label htmlFor="contactRole">Your role</label>
                    <input id="contactRole" maxLength={120} value={f.contactRole} onChange={(e) => set('contactRole', e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="email">Work email</label>
                    <input id="email" type="email" required maxLength={200} value={f.email} onChange={(e) => set('email', e.target.value)} /></div>
                  <div className="field"><label htmlFor="phone">Phone or WhatsApp</label>
                    <input id="phone" maxLength={40} value={f.phone} onChange={(e) => set('phone', e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="teamSize">Team size</label>
                    <select id="teamSize" value={f.teamSize} onChange={(e) => set('teamSize', e.target.value)}>
                      <option value="">Select</option><option>1&ndash;5</option><option>6&ndash;20</option><option>21&ndash;50</option><option>Over 50</option>
                    </select></div>
                  <div className="field"><label htmlFor="industries">Industries you serve</label>
                    <input id="industries" maxLength={1000} placeholder="For example retail, distribution, services" value={f.industries} onChange={(e) => set('industries', e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="field full"><label>Countries you would cover</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 8, marginTop: 6 }}>
                      {COUNTRIES.map((c) => (
                        <label key={c} style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                          <input type="checkbox" checked={f.territories.includes(c)} onChange={() => toggle(c)} /> {c}
                        </label>
                      ))}
                      <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" checked={f.territories.includes('Other')} onChange={() => toggle('Other')} /> Other (tell us below)
                      </label>
                    </div></div>
                </div>
                <div className="form-row">
                  <div className="field full"><label htmlFor="erpExperience">Your experience with ERP or business software</label>
                    <textarea id="erpExperience" maxLength={2000} value={f.erpExperience} onChange={(e) => set('erpExperience', e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="field full"><label htmlFor="referencesNote">Customers or references we could speak to (optional)</label>
                    <textarea id="referencesNote" maxLength={2000} value={f.referencesNote} onChange={(e) => set('referencesNote', e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="field full"><label htmlFor="message">Anything else we should know</label>
                    <textarea id="message" maxLength={2000} value={f.message} onChange={(e) => set('message', e.target.value)} /></div>
                </div>
                {/* A trap for bots: hidden from people, so only a script fills it. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label htmlFor="fax">Fax</label>
                  <input id="fax" tabIndex={-1} autoComplete="off" value={f.fax} onChange={(e) => set('fax', e.target.value)} />
                </div>
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', margin: '6px 0 14px', fontSize: 14 }}>
                  <input type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} style={{ marginTop: 3 }} />
                  <span>I agree that XionERP may contact me about this application.</span>
                </label>
                {err && <p role="alert" style={{ color: '#B3261E', fontSize: 14, margin: '0 0 12px' }}>{err}</p>}
                <button type="submit" className="btn btn-primary form-submit" disabled={busy}>{busy ? 'Sending…' : 'Send application'}</button>
                <p className="form-note">Applying is free and commits neither side. We use these details only to review your application.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">FAQ</div>
            <h2 className="sec-h">Questions, answered</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((x, i) => (
              <div className={'faq-item' + (open === i ? ' open' : '')} key={x.q}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{x.q}<Plus /></button>
                {open === i && <div className="faq-a">{x.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
