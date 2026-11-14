import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import seo from '../data/seo.json';
import sol from '../data/solutions.json';

type Entry = { title: string; description: string };
const routes: Record<string, Entry> = { ...(seo.routes as Record<string, Entry>) };
for (const s of sol.solutions) routes['/solutions/' + s.slug] = { title: s.title, description: s.description };

function setMeta(sel: string, attr: string, val: string, create: () => HTMLElement) {
  let el = document.head.querySelector(sel) as HTMLElement | null;
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, val);
}

// Keeps title, description, canonical and social tags in step with the route (client-side navigation).
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
    const e = routes[path] || routes['/'];
    const url = seo.origin + (path === '/' ? '/' : path + '/');
    document.title = e.title;
    const mk = (tag: string, k: string, v: string) => () => { const n = document.createElement(tag); n.setAttribute(k, v); return n; };
    setMeta('meta[name="description"]', 'content', e.description, mk('meta', 'name', 'description'));
    setMeta('link[rel="canonical"]', 'href', url, mk('link', 'rel', 'canonical'));
    setMeta('meta[property="og:title"]', 'content', e.title, mk('meta', 'property', 'og:title'));
    setMeta('meta[property="og:description"]', 'content', e.description, mk('meta', 'property', 'og:description'));
    setMeta('meta[property="og:url"]', 'content', url, mk('meta', 'property', 'og:url'));
    setMeta('meta[name="twitter:title"]', 'content', e.title, mk('meta', 'name', 'twitter:title'));
    setMeta('meta[name="twitter:description"]', 'content', e.description, mk('meta', 'name', 'twitter:description'));
  }, [pathname]);
  return null;
}
