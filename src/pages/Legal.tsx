import { Link } from 'react-router-dom';
import { COMPANY, CONTACT, UPDATED, PRIVACY, TERMS } from '../data/legal';

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const sections = isPrivacy ? PRIVACY : TERMS;
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot" />Legal</span>
          <h1 className="page-h">{title}</h1>
          <p className="page-sub">{COMPANY} · Last updated {UPDATED}</p>
        </div>
      </section>
      <section style={{ padding: '24px 0 72px' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          {sections.map((s) => (
            <section key={s.h} id={s.id} style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, margin: '0 0 8px' }}>{s.h}</h2>
              {s.p.map((b, i) => Array.isArray(b)
                ? <ul key={i} style={{ margin: '0 0 10px', paddingLeft: 20 }}>{b.map((li) => <li key={li}>{li}</li>)}</ul>
                : <p key={i} style={{ margin: '0 0 10px', lineHeight: 1.65 }}>{b}</p>)}
            </section>
          ))}
          <p style={{ borderTop: '1px solid var(--line, #e5e7eb)', paddingTop: 16 }}>
            <Link to={isPrivacy ? '/terms' : '/privacy'}>{isPrivacy ? 'Terms of Service' : 'Privacy Policy'}</Link>
            {' · '}<a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </p>
        </div>
      </section>
    </>
  );
}
