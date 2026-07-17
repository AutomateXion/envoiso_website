import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, XIcon } from './Icons';

export const APP_LOGIN_URL = 'https://erp.envoiso.com/login';
export const APP_SIGNUP_URL = 'https://erp.envoiso.com/signup';

const LINKS = [
  { to: '/#features', label: 'Product', match: '/' },
  { to: '/pricing', label: 'Pricing', match: '/pricing' },
  { to: '/compliance', label: 'Compliance', match: '/compliance' },
  { to: '/about', label: 'About', match: '/about' },
  { to: '/contact', label: 'Contact', match: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav>
      <div className="wrap nav-in">
        <Link to="/" className="brand"><span className="mark">E</span>Envoiso</Link>
        <div className="nav-links">
          {LINKS.map(l => (
            <Link key={l.label} to={l.to} className={pathname === l.match ? 'active' : ''}>{l.label}</Link>
          ))}
          <a href={APP_LOGIN_URL} style={{ color: 'var(--navy)', fontWeight: 600 }}>Sign in</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a className="btn btn-primary" href={APP_SIGNUP_URL}>Start free trial</a>
          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
            {open ? <XIcon /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={'mobile-panel' + (open ? ' open' : '')}>
        {LINKS.map(l => (
          <Link key={l.label} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <a href={APP_LOGIN_URL}>Sign in</a>
      </div>
    </nav>
  );
}
