import { APP_SIGNUP_URL } from '../components/Nav';
import { Check } from '../components/Icons';

const VALUES = [
  { n: '01', title: 'Intelligence', body: 'Every module runs on the same data, so decisions are made on real numbers — not a spreadsheet that\u2019s three days stale.' },
  { n: '02', title: 'Flow', body: 'Work should move without friction between teams. A sale should update stock. An invoice should update the ledger. Nothing re-typed twice.' },
  { n: '03', title: 'Trust', body: 'Compliance isn\u2019t a feature you bolt on before a deadline. It\u2019s built into how the platform generates and stores every record.' },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />About Envoiso</span>
          <h1 className="page-h">Built by people who've run GCC operations, not just software</h1>
          <p className="page-sub">Envoiso exists because too many growing businesses in the region are still stitching together spreadsheets, WhatsApp and disconnected apps to run finance, sales and stock.</p>
        </div>
      </section>

      <section className="about-story">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <h2>Our story</h2>
            <p>Envoiso was founded by a team with more than 20 years of combined experience delivering digital transformation and enterprise consulting across the Middle East, South Asia and Asia-Pacific — work that repeatedly surfaced the same problem: growing companies outgrow spreadsheets long before they can justify an enterprise ERP price tag or a six-month implementation.</p>
            <p>We built Envoiso to close that gap — a single cloud platform covering accounting, sales, CRM, inventory, purchase, projects and assets, with GCC compliance (including Oman's Fawtara e-invoicing mandate) built in from day one rather than added later as a costly integration.</p>
            <p>The name reflects the mission: Intelligence to see your business clearly, Flow so work moves without friction between teams, and Trust so compliance and financial reporting are never a scramble.</p>
          </div>
          <div className="about-stats">
            <div className="about-stat"><span className="big">2026</span><span className="lbl">Founded, Muscat, Oman</span></div>
            <div className="about-stat"><span className="big">10+</span><span className="lbl">Core business modules in one platform</span></div>
            <div className="about-stat"><span className="big">20+ yrs</span><span className="lbl">Combined regional operating experience</span></div>
            <div className="about-stat"><span className="big">2</span><span className="lbl">Countries: Oman &amp; Sri Lanka</span></div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-eyebrow">What we believe</div>
            <h2 className="sec-h">Three ideas behind every decision we make</h2>
          </div>
          <div className="value-grid">
            {VALUES.map(v => (
              <div className="value-card" key={v.n}>
                <div className="vnum">{v.n}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="regions">
        <div className="wrap">
          <div className="sec-head" style={{ maxWidth: 640 }}>
            <div className="sec-eyebrow" style={{ color: 'var(--blue-lt)' }}>Where we operate</div>
            <h2 className="sec-h" style={{ color: '#fff' }}>Built in the region, for the region</h2>
            <p className="sec-sub" style={{ color: '#bccbdb' }}>Envoiso is headquartered in Muscat, Oman, with an engineering base in Sri Lanka — close enough to the compliance requirements we build for, and to the talent that builds the platform.</p>
          </div>
          <div className="region-grid">
            <div className="region-card">
              <h3>Muscat, Oman</h3>
              <p>Headquarters, product strategy and GCC compliance — including our Fawtara e-invoicing work aligned with Oman Tax Authority requirements.</p>
            </div>
            <div className="region-card">
              <h3>Sri Lanka</h3>
              <p>Engineering and platform development, building the accounting, ERP and e-invoicing core that powers every Envoiso workspace.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <div className="final-card">
            <h2>Come see the platform for yourself</h2>
            <p>Start a free trial and run your own numbers through Envoiso — no credit card, no sales call required to get started.</p>
            <a className="btn btn-white btn-lg" href={APP_SIGNUP_URL}>Start your free trial</a>
            <div className="hero-note"><Check />14-day free trial &middot; Cancel anytime</div>
          </div>
        </div>
      </section>
    </>
  );
}
