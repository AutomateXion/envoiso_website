import { Link } from 'react-router-dom';
import sol from '../data/solutions.json';

const byKind = (kind: string) => sol.solutions.filter((s) => s.kind === kind)
  .map((s) => (<Link key={s.slug} to={`/solutions/${s.slug}/`}>{s.eyebrow}</Link>));

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link to="/" className="foot-brand"><img src="/logo-horizontal-reversed.png" alt="Xion ERP" className="brand-logo" /></Link>
            <p className="foot-tag">The all-in-one business platform for growing GCC companies. Intelligence &middot; Flow &middot; Trust.</p>
          </div>
          <div className="foot-col">
            <h4>Product</h4>
            <Link to="/#features">Modules</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/compliance">Compliance</Link>
          </div>
          <div className="foot-col">
            <h4>Solutions</h4>
            {byKind('module')}
          </div>
          <div className="foot-col">
            <h4>Industries</h4>
            {byKind('industry')}
            <h4 style={{ marginTop: 20 }}>Compare</h4>
            {byKind('compare')}
          </div>
          <div className="foot-col">
            <h4>Countries</h4>
            {byKind('country')}
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/academy">Academy</Link>
          </div>
          <div className="foot-col">
            <h4>Resources</h4>
            <Link to="/compliance">Fawtara guide</Link>
            <a href="mailto:info@automatexion.com">Help centre</a>
            <a href="mailto:info@automatexion.com">API docs</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Xion ERP. All rights reserved.</span>
          <span><Link to="/privacy">Privacy</Link> &middot; <Link to="/terms">Terms</Link></span>
        </div>
      </div>
    </footer>
  );
}
