import { Check, Shield, FileCheck, Globe, Clock } from '../components/Icons';
import { APP_SIGNUP_URL } from '../components/Nav';
import { trackClick } from '../lib/analytics';

const TIMELINE = [
  { mark: <Check />, done: true,  tag: 'Complete', title: 'OTA becomes a Peppol Authority', body: 'The Oman Tax Authority was approved as an official Peppol Authority, adopting the Peppol five-corner model as the backbone of Fawtara — supplier, supplier\u2019s service provider, buyer\u2019s service provider, buyer, with reporting to the OTA.' },
  { mark: <Check />, done: true,  tag: 'Complete', title: 'Sandbox & technical specification', body: 'A developer sandbox opened for testing, and the OTA published its PINT-OM technical specification and a draft data dictionary defining the fields, formats and validation rules for a compliant e-invoice.' },
  { mark: <Check />, done: true,  tag: 'In progress', title: 'Service provider accreditation', body: 'Accredited Service Providers (ASPs) — the certified intermediaries that transmit e-invoices to the Fawtara platform — are being registered and tested ahead of go-live.' },
  { mark: '1', done: false, tag: 'August 2026', title: 'Phase 1 goes live', body: 'Mandatory e-invoicing begins for roughly the 100 largest VAT-registered taxpayers already notified by the OTA. These businesses must issue and receive e-invoices through Fawtara from day one.' },
  { mark: '2', done: false, tag: 'February 2027 (expected)', title: 'Phase 2 — remaining large taxpayers', body: 'The mandate is expected to extend to all remaining large VAT-registered businesses not covered in Phase 1.' },
  { mark: '3', done: false, tag: 'August 2027 (expected)', title: 'Phase 3 — all VAT-registered businesses', body: 'Full B2B coverage is expected to extend to every remaining VAT-registered business, including SMEs. No permanent size-based exemptions have been announced.' },
  { mark: '4', done: false, tag: '2028 (expected)', title: 'Phase 4 — government transactions (B2G)', body: 'Government entities are expected to come into scope, extending Fawtara-compliant e-invoicing to business-to-government transactions.' },
];

const CARDS = [
  { icon: <Shield />, title: 'Peppol five-corner model', body: 'Invoices move from your ERP to your Accredited Service Provider, to your counterparty\u2019s provider, to them — with tax data reported to the OTA in parallel. Envoiso is built to plug into this model as an ASP integration becomes available.' },
  { icon: <FileCheck />, title: 'UBL 2.1 & PINT-OM ready', body: 'Envoiso generates structured invoices aligned with the international UBL 2.1 standard and the Omani PINT-OM specification, so your data is in the shape Fawtara expects from day one.' },
  { icon: <Globe />, title: 'Built for GCC finance', body: 'Three-decimal OMR, multi-currency, Arabic-ready invoicing and IFRS-standard reporting are native to the platform — not bolt-ons added for one regulation.' },
  { icon: <Clock />, title: '10-year digital archiving', body: 'Every e-invoice is stored securely and retrievable for the audit and retention periods regulators expect, without you having to manage a separate archive.' },
];

export default function Compliance() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Compliance</span>
          <h1 className="page-h">Fawtara, explained &mdash; and ready when you are</h1>
          <p className="page-sub">Oman's national e-invoicing mandate rolls out in phases from 2026 to 2028. Here's what's confirmed, what's still provisional, and how Envoiso fits in.</p>
        </div>
      </section>

      <section className="fw-intro">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">What is Fawtara</div>
            <h2 className="sec-h">Oman's B2B e-invoicing mandate</h2>
            <p className="sec-sub">Fawtara is the Oman Tax Authority's programme requiring VAT-registered businesses to issue structured, machine-readable e-invoices instead of paper or PDF documents — validated in real time and reported through a Peppol-based network.</p>
          </div>
        </div>
      </section>

      <section className="fw-timeline">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">Rollout timeline</div>
            <h2 className="sec-h">Where the OTA rollout stands today</h2>
            <p className="sec-sub">Phase 1 dates are confirmed by the OTA. Later phases are the currently communicated plan and should be treated as indicative until the OTA confirms them formally.</p>
          </div>
          <div className="fw-steps">
            {TIMELINE.map((s, i) => (
              <div className={'fw-step' + (s.done ? ' done' : '')} key={i}>
                <div className="fw-step-num">{s.mark}</div>
                <div className="fw-step-body">
                  <span className="fw-step-tag">{s.tag}</span>
                  <h3 style={{ marginTop: 10 }}>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fw-grid">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {CARDS.map(c => (
            <div className="fw-card" key={c.title}>
              <h3>{c.icon}{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="comp">
        <div className="wrap comp-grid">
          <div>
            <div className="sec-eyebrow" style={{ color: 'var(--blue-lt)' }}>Get ahead of your phase</div>
            <h2>Don't wait for a deadline to find out you're not ready</h2>
            <p>Whichever phase your business falls into, the groundwork is the same: clean VAT data, an ERP that can produce structured invoices, and a service provider relationship in place before go-live.</p>
            <div className="badge-row">
              <div className="cbadge"><Check />UBL 2.1 / PINT-OM formats</div>
              <div className="cbadge"><Check />IFRS-standard reporting</div>
              <div className="cbadge"><Check />Multi-currency &amp; OMR to 3 decimals</div>
              <div className="cbadge"><Check />10-year e-invoice archiving</div>
            </div>
          </div>
          <div className="comp-stat">
            <div className="row"><span className="lbl">Phase 1 goes live</span><span className="big">Aug 2026</span></div>
            <div className="row"><span className="lbl">Full rollout expected by</span><span className="big">2028</span></div>
            <div className="row"><span className="lbl">Invoice retention</span><span className="big">10 yrs</span></div>
            <div className="row"><span className="lbl">Setup to first invoice</span><span className="big">1 day</span></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <div className="final-card">
            <h2>Get your Fawtara readiness sorted early</h2>
            <p>Start a free trial and see how Envoiso structures your invoicing for Oman's e-invoicing mandate &mdash; well before your phase arrives.</p>
            <a className="btn btn-white btn-lg" href={APP_SIGNUP_URL} onClick={() => trackClick('compliance_final_cta', 'Start your free trial (final CTA)')}>Start your free trial</a>
            <div className="hero-note"><Check />No credit card &middot; Cancel anytime</div>
          </div>
        </div>
      </section>
    </>
  );
}
