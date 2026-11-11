// After `vite build`: write dist/<route>/index.html for every route with that route's own
// title, description, canonical and social tags, plus a <noscript> summary, so crawlers and
// link-preview bots that don't run JavaScript still get correct, unique metadata per page.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const seo = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const dist = 'dist';
const base = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const nav = Object.entries(seo.routes).map(([p, r]) => `<a href="${p}">${esc(r.h1)}</a>`).join(' ');

function page(path, r) {
  const url = seo.origin + (path === '/' ? '/' : path);
  let h = base;
  const rep = (re, to) => { if (!re.test(h)) throw new Error('missing ' + re + ' for ' + path); h = h.replace(re, to); };
  rep(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`);
  rep(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(r.description)}" />`);
  rep(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(r.title)}" />`);
  rep(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(r.description)}" />`);
  rep(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  rep(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  rep(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(r.title)}" />`);
  rep(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(r.description)}" />`);
  rep(/<div id="root"><\/div>/, `<div id="root"></div>\n    <noscript><h1>${esc(r.h1)}</h1><p>${esc(r.summary)}</p><nav>${nav}</nav></noscript>`);
  return h;
}

for (const [path, r] of Object.entries(seo.routes)) {
  const html = page(path, r);
  if (path === '/') writeFileSync(join(dist, 'index.html'), html);
  else { mkdirSync(join(dist, path), { recursive: true }); writeFileSync(join(dist, path, 'index.html'), html); }
}
console.log('prerendered meta for', Object.keys(seo.routes).length, 'routes');
