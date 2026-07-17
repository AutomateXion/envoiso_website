import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from '../components/Icons';
import { APP_SIGNUP_URL } from '../components/Nav';
import { SEAT_TIERS, PRICES, PROMO, formatAmount, promoAmount, Currency } from '../data/pricing';

const COMPARE_ROWS = [
  'Accounting & general ledger',
  'Sales, CRM & quotations',
  'Purchase & supplier invoices',
  'Multi-location inventory',
  'Fixed assets & depreciation',
  'Projects & job costing',
  'Fawtara / GCC e-invoicing',
  'IFRS-standard financial reports',
  'Multi-currency',
  'Email support',
];

const FAQS = [
  { q: 'How does the 50% off first 6 months offer work?', a: 'Choose any annual plan at checkout and your first 6 months are billed at half the standard annual rate. From month 7 onward, billing continues at the regular annual rate for the remainder of your term. The offer applies to new subscriptions only and can\u2019t be combined with other discounts.' },
  { q: 'Do all plans include every module?', a: 'Yes. Every Envoiso plan — Solo through Enterprise — includes the full platform: accounting, sales, CRM, inventory, purchase, projects, assets, reporting and GCC e-invoicing. Plans differ only by the number of user seats.' },
  { q: 'Is Envoiso really Fawtara-ready?', a: 'Envoiso generates e-invoices in UBL 2.1 / Peppol BIS 3.0 format, aligned with Oman\u2019s Fawtara e-invoicing requirements ahead of the OTA phased rollout. See our Compliance page for the full timeline.' },
  { q: 'Can I switch between monthly and annual billing?', a: 'Yes, you can switch billing frequency at any time from your account settings. Moving to annual billing at any point qualifies you for the then-current seasonal offer, if one is active.' },
  { q: 'What happens after my 14-day trial?', a: 'You can pick any plan and continue seamlessly, or your workspace pauses (your data is kept safely) until you\u2019re ready to subscribe. No credit card is required to start the trial.' },
  { q: 'Do you support multiple currencies?', a: 'Yes. Envoiso supports OMR (to 3 decimal places), USD, LKR and other regional currencies, with real-time conversion for multi-entity and cross-border businesses.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [cur, setCur] = useState<Currency>('usd');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const p = PRICES[cur];
  const priceList = annual ? p.annual : p.monthly;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Pricing</span>
          <h1 className="page-h">Simple plans that grow with you</h1>
          <p className="page-sub">Start free for 14 days. Every plan includes the full platform &mdash; you only choose your team size. No hidden fees, cancel anytime.</p>
        </div>
      </section>

      <section className="pricing">
        <div className="wrap">
          {PROMO.active && (
            <div className="promo-strip">
              <div className="promo-ico"><Plus /></div>
              <div>
                <p><strong>{PROMO.label}</strong> &mdash; {PROMO.detail}</p>
              </div>
            </div>
          )}

          <div className="bill-toggle">
            <span className={'bill-opt' + (!annual ? ' on' : '')}>Monthly</span>
            <button className={'toggle' + (annual ? ' annual' : '')} onClick={() => setAnnual(!annual)} aria-label="Toggle billing period"><span className="knob" /></button>
            <span className={'bill-opt' + (annual ? ' on' : '')}>Annual</span>
            <span className="save-pill">{annual ? '50% off first 6 months' : '14 months for 12 on annual'}</span>
          </div>
          <div className="cur-toggle">
            <button className={'cur-btn' + (cur === 'usd' ? ' on' : '')} onClick={() => setCur('usd')}>USD $</button>
            <button className={'cur-btn' + (cur === 'omr' ? ' on' : '')} onClick={() => setCur('omr')}>OMR &#xFDFC;</button>
            <button className={'cur-btn' + (cur === 'lkr' ? ' on' : '')} onClick={() => setCur('lkr')}>LKR Rs</button>
          </div>
          <div className="seat-note">Every plan includes <strong>all modules</strong> &mdash; accounting, sales, CRM, inventory, purchase, projects, assets and GCC e-invoicing. You only choose your team size.</div>

          <div className="seat-grid">
            {SEAT_TIERS.map((t, idx) => {
              const base = priceList[idx];
              const showPromo = annual && PROMO.active;
              const promo = promoAmount(base);
              return (
                <div className={'seat-tier' + (t.popular ? ' feat' : '')} key={t.name}>
                  {t.popular && <span className="tier-badge">Most popular</span>}
                  <div className="tier-name">{t.name}</div>
                  <div className="seat-users">{t.users}</div>
                  <div className="tier-price">
                    {showPromo && <span className="was">{p.symbol}{formatAmount(base, cur)}</span>}
                    <span className="amt">{p.symbol}{formatAmount(showPromo ? promo : base, cur)}</span>
                    <span className="per">/ mo</span>
                  </div>
                  <div className="tier-bill">{annual ? 'billed annually' : 'billed monthly'}</div>
                  {showPromo && <div className="tier-promo-note">for your first 6 months, then {p.symbol}{formatAmount(base, cur)}/mo</div>}
                  <a className={'btn ' + (t.popular ? 'btn-primary' : 'btn-ghost')} href={`${APP_SIGNUP_URL}?plan=${t.name.toLowerCase()}&billing=${annual ? 'annual' : 'monthly'}`}>Start free trial</a>
                  <div className="seat-tier-for">{t.sub}</div>
                </div>
              );
            })}
            <div className="seat-tier seat-custom">
              <div className="tier-name">Custom</div>
              <div className="seat-users">15+ users</div>
              <div className="tier-price"><span className="amt" style={{ fontSize: 28 }}>Let&rsquo;s talk</span></div>
              <div className="tier-bill">tailored to your team</div>
              <Link className="btn btn-ghost" to="/contact">Contact sales</Link>
              <div className="seat-tier-for">For larger teams &amp; multi-entity groups needing custom onboarding.</div>
            </div>
          </div>
          <p className="pricing-foot">All plans include <strong>every module</strong>, <strong>GCC e-invoicing compliance</strong>, IFRS-standard financials, and a <strong>14-day free trial</strong> &mdash; no credit card. {cur === 'lkr' && <strong>Sri Lanka pricing includes a regional rate.</strong>}</p>
        </div>
      </section>

      <section className="compare">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">What's included</div>
            <h2 className="sec-h">Every plan, the full platform</h2>
            <p className="sec-sub">There's no feature paywall at Envoiso &mdash; plans scale by team size, not by what you're allowed to use.</p>
          </div>
          <table className="compare-table">
            <thead>
              <tr><th>Capability</th><th>Included in every plan</th></tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(row => (
                <tr key={row}><td>{row}</td><td><Check /></td></tr>
              ))}
            </tbody>
          </table>
          <p className="pricing-foot" style={{ marginTop: 24 }}>
            This is a snapshot &mdash; Envoiso includes a full HRMS, recruitment/ATS, field sales app, and enterprise-grade approvals &amp; governance too. <Link to="/#features" style={{ color: 'var(--blue)', fontWeight: 600 }}>See the complete feature list &rarr;</Link>
          </p>
        </div>
      </section>

      <section className="faq">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">FAQ</div>
            <h2 className="sec-h">Pricing questions, answered</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={'faq-item' + (openFaq === i ? ' open' : '')} key={f.q}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}<Plus />
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <div className="final-card">
            <h2>Lock in 50% off before it ends</h2>
            <p>Start your 14-day free trial today, then choose any annual plan to secure half price for your first 6 months.</p>
            <a className="btn btn-white btn-lg" href={APP_SIGNUP_URL}>Start your free trial</a>
            <div className="hero-note"><Check />No credit card &middot; Cancel anytime</div>
          </div>
        </div>
      </section>
    </>
  );
}
