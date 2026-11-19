import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | XionERP';
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex';
    document.head.appendChild(m);
    return () => { m.remove(); };
  }, []);
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="page-h">Page not found</h1>
        <p className="page-sub">This address does not exist. <Link to="/">Back to the XionERP home page</Link> or see <Link to="/pricing">pricing</Link>.</p>
      </div>
    </section>
  );
}
