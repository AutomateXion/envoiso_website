import { Check } from '../components/Icons';
import ModuleConstellation from '../components/ModuleConstellation';
import HeroMockup from '../components/HeroMockup';
import { APP_SIGNUP_URL } from '../components/Nav';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Intelligence &middot; Flow &middot; Trust</span>
          <h1 className="hero-h">Your whole business, in <em>one</em> flow.</h1>
          <p className="hero-sub">Envoiso brings accounting, sales, inventory, CRM, projects and compliance into a single platform &mdash; so your numbers, stock and customers finally speak to each other. Built for growing GCC businesses, ready for e-invoicing.</p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href={APP_SIGNUP_URL}>Start free trial</a>
            <Link className="btn btn-ghost btn-lg" to="/pricing">See pricing</Link>
          </div>
          <div className="hero-note"><Check />14-day free trial &middot; No credit card required</div>
          <div className="hero-fawtara">
            <span className="ff-badge"><Check />Fawtara-ready</span>
            <span className="promo-badge">50% off first 6 months, annual plans</span>
            Built for Oman e-invoicing (UBL 2.1) ahead of the OTA rollout
          </div>
          <div className="hero-shot">
            <HeroMockup />
          </div>
        </div>
        <div className="trust">
          <div className="wrap trust-in">
            <span className="trust-label">Trusted by teams across the GCC</span>
            <div className="logo-slot">Your logo</div>
            <div className="logo-slot">Your logo</div>
            <div className="logo-slot">Your logo</div>
            <div className="logo-slot">Your logo</div>
          </div>
        </div>
      </header>

      <section className="prob">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">Why Envoiso</div>
            <h2 className="sec-h">Stop running your business across six disconnected tools</h2>
            <p className="sec-sub">Spreadsheets for accounts, one app for invoices, another for stock, WhatsApp for the sales team. The data never lines up &mdash; and month-end becomes a guessing game.</p>
          </div>
          <div className="prob-grid">
            <div className="prob-before prob-col">
              <h3>Business as usual</h3>
              <ul className="prob-list">
                <li><svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path d="M18 6L6 18M6 6l12 12" /></svg>Accounting in one system, sales in another</li>
                <li><svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path d="M18 6L6 18M6 6l12 12" /></svg>Stock counts that never match the books</li>
                <li><svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path d="M18 6L6 18M6 6l12 12" /></svg>Manual e-invoicing, compliance anxiety</li>
                <li><svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path d="M18 6L6 18M6 6l12 12" /></svg>No single view of cash, receivables or profit</li>
              </ul>
            </div>
            <div className="prob-after prob-col">
              <h3>Business on Envoiso</h3>
              <ul className="prob-list">
                <li><span className="c"><Check /></span>One platform from quote to cash to ledger</li>
                <li><span className="c"><Check /></span>Sales reduce stock and post cost automatically</li>
                <li><span className="c"><Check /></span>GCC e-invoicing built in, compliant by default</li>
                <li><span className="c"><Check /></span>Live dashboards for cash, profit and aging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mods" id="features">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">One platform, every function</div>
            <h2 className="sec-h">Everything connected, by design</h2>
            <p className="sec-sub">Not a pile of separate apps &mdash; one platform where every module shares the same data, so your numbers, stock and customers always agree.</p>
          </div>
          <ModuleConstellation />
        </div>
      </section>

      <section className="comp" id="compliance">
        <div className="wrap comp-grid">
          <div>
            <div className="sec-eyebrow" style={{ color: 'var(--blue-lt)' }}>Built for the region</div>
            <h2>Compliant in the GCC, by default</h2>
            <p>Envoiso speaks the language of regional finance &mdash; Arabic e-invoicing, OMR to three decimals, multi-currency, and IFRS-standard reporting out of the box. No bolt-ons, no scramble before a deadline.</p>
            <div className="badge-row">
              <div className="cbadge"><Check />E-invoicing ready (Fawtara / UBL 2.1)</div>
              <div className="cbadge"><Check />IFRS financials</div>
              <div className="cbadge"><Check />Multi-currency</div>
              <div className="cbadge"><Check />VAT &amp; tax reporting</div>
            </div>
            <div style={{ marginTop: 28 }}>
              <Link className="btn btn-white" to="/compliance">See the Fawtara timeline &rarr;</Link>
            </div>
          </div>
          <div className="comp-stat">
            <div className="row"><span className="lbl">Decimal precision (OMR)</span><span className="big">3</span></div>
            <div className="row"><span className="lbl">Core business modules</span><span className="big">10+</span></div>
            <div className="row"><span className="lbl">Setup to first invoice</span><span className="big">1 day</span></div>
            <div className="row"><span className="lbl">Free trial</span><span className="big">14 days</span></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <div className="final-card">
            <h2>Bring your business into one flow</h2>
            <p>Join growing teams running finance, sales, stock and projects on a single platform. Set up in a day, free for two weeks &mdash; and take 50% off your first 6 months on any annual plan.</p>
            <a className="btn btn-white btn-lg" href={APP_SIGNUP_URL}>Start your free trial</a>
            <div className="hero-note"><Check />No credit card &middot; Cancel anytime</div>
          </div>
        </div>
      </section>
    </>
  );
}
