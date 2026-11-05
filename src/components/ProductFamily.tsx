/* ProductFamily — Xion product suite section for xionerp.com
   Shows all three Xion products with correct mark geometry.
   Mark: two fat pills + one thin bar, same rotation, pill offset up/down.
   Only accent colors change per product.
*/

const Mark = ({
  pill,
  bar,
  size = 48,
}: {
  pill: string;
  bar: string;
  size?: number;
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ flexShrink: 0 }}
  >
    <rect x="22" y="10" width="40" height="22" rx="11" transform="rotate(40 50 50)" fill={pill} />
    <rect x="38" y="68" width="40" height="22" rx="11" transform="rotate(40 50 50)" fill={pill} />
    <rect x="10" y="45" width="80" height="10" rx="5" transform="rotate(40 50 50)" fill={bar} />
  </svg>
);

const PRODUCTS = [
  {
    name: 'XionERP',
    xion: 'Xion',
    suffix: 'ERP',
    pill: '#6b9fe4',
    bar: '#1a2f6e',
    accentColor: '#5B7186',
    badge: 'LIVE · SAAS ERP',
    badgeStyle: { background: 'rgba(16,48,128,0.1)', color: '#103080' },
    desc: 'A Fawtara-accredited, multi-tenant cloud ERP built for mid-market businesses across the GCC and South Asia. Finance, inventory, procurement, sales and HR — all in one platform.',
    tags: ['Fawtara Accredited', 'Multi-tenant SaaS', 'GCC & Sri Lanka', 'Finance & Inventory'],
    cta: 'You\'re here →',
    ctaHref: 'https://www.xionerp.com',
    ctaStyle: { color: '#5090F1' },
  },
  {
    name: 'XionConnect',
    xion: 'Xion',
    suffix: 'Connect',
    pill: '#34d399',
    bar: '#065f46',
    accentColor: '#10b981',
    badge: 'NEW · OMNICHANNEL',
    badgeStyle: { background: 'rgba(6,95,70,0.1)', color: '#065f46' },
    desc: 'A unified omnichannel social platform connecting WhatsApp, Instagram, Facebook, and beyond into a single intelligent inbox — with automation, analytics, and AI-driven engagement built in.',
    tags: ['WhatsApp Business', 'Instagram DMs', 'Facebook Messenger', 'AI Automation'],
    cta: 'Learn more →',
    ctaHref: 'https://www.automatexion.com/#xionconnect',
    ctaStyle: { color: '#10b981' },
  },
  {
    name: 'XionTransform',
    xion: 'Xion',
    suffix: 'Transform',
    pill: '#a78bfa',
    bar: '#3b0764',
    accentColor: '#7c3aed',
    badge: 'PLATFORM · CDO TOOL',
    badgeStyle: { background: 'rgba(59,7,100,0.1)', color: '#3b0764' },
    desc: 'A structured digital transformation platform that guides organisations from assessment through roadmap to measurable benefits — purpose-built for CDOs and transformation consultancies.',
    tags: ['Maturity Assessment', 'Transformation Roadmap', 'Benefits Tracking', 'CDO Dashboard'],
    cta: 'Explore platform →',
    ctaHref: 'https://www.automatexion.com/#products',
    ctaStyle: { color: '#7c3aed' },
  },
];

export default function ProductFamily() {
  return (
    <section id="products" style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-eyebrow">The Xion Family</div>
          <h2 className="sec-h">Three products. One mission.</h2>
          <p className="sec-sub">
            AutomateXion builds purpose-built software for the challenges modern businesses face —
            each product solving a distinct problem, all sharing the same commitment to automation and intelligence.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            marginTop: 48,
          }}
        >
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: 16,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Logo row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Mark pill={p.pill} bar={p.bar} size={48} />
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: '#103080' }}>{p.xion}</span>
                  <span style={{ color: p.accentColor }}>{p.suffix}</span>
                </div>
              </div>

              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  alignSelf: 'flex-start',
                  ...p.badgeStyle,
                }}
              >
                {p.badge}
              </div>

              {/* Description */}
              <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>
                {p.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: 'var(--paper-2)',
                      color: 'var(--muted)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={p.ctaHref}
                style={{
                  marginTop: 'auto',
                  fontSize: 13.5,
                  fontWeight: 600,
                  textDecoration: 'none',
                  ...p.ctaStyle,
                }}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
