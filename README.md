# Envoiso.com — marketing site

Static React + Vite site for **envoiso.com**, built on the Envoiso brand system
(navy/blue palette, Fraunces + Inter type) carried over from the existing
CRM/ERP `WelcomePage_v5.tsx`.

## Pages

| Route         | Purpose |
|---------------|---------|
| `/`           | Home — hero, problem/solution, module constellation, compliance teaser, final CTA |
| `/pricing`    | Seat-based pricing, seasonal 50%-off promo, feature comparison, FAQ |
| `/compliance` | Fawtara / OTA e-invoicing explainer with rollout timeline |
| `/about`      | Company story, values, regions (Oman + Sri Lanka) |
| `/contact`    | Contact info + lead form (front-end only — see note below) |

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to ./dist
npm run preview   # serve the production build locally
```

## Seasonal promo (50% off first 6 months, annual plans)

Controlled from one place: `src/data/pricing.ts` → the `PROMO` object.

```ts
export const PROMO = {
  active: true,        // flip to false to turn the offer off everywhere
  label: '50% off your first 6 months',
  detail: '...',
  discount: 0.5,
};
```

Turning `active` to `false` removes the promo strip, the "was / now" pricing,
and the promo badge in the hero and announcement bar automatically — the
banner copy in `AnnouncementBar.tsx` and the hero badge in `Home.tsx` are
static text, so update/remove those two spots by hand when the offer ends.

## Things to plug in before launch

These are placeholders — search for them and update:

- **`src/components/Nav.tsx`** — `APP_LOGIN_URL` / `APP_SIGNUP_URL` currently
  point to `https://app.envoiso.com/...`. Point these at your real app/auth
  subdomain once it exists (or to a Calendly/waitlist link if the app isn't
  live yet).
- **`src/pages/Contact.tsx`** — the form calls `setSent(true)` locally and
  doesn't send anywhere yet. Wire `handleSubmit` to a real endpoint (a
  serverless function, Formspree, or a lead-capture endpoint on your CRM).
  Also update the placeholder phone number.
- **Footer / Contact emails** — `hello@envoiso.com`, `partners@envoiso.com`
  are placeholders; point them at real inboxes.
- **Hero visual** — `src/components/HeroMockup.tsx` is an inline SVG dashboard
  mockup (no external screenshot dependency). Swap it for a real product
  screenshot once the app UI is ready — drop an image in `public/` and
  replace `<HeroMockup />` in `Home.tsx` with an `<img>` tag.
- **Fawtara timeline** (`src/pages/Compliance.tsx`) — Phase 1 (Aug 2026) is
  OTA-confirmed; Phases 2–4 are the currently communicated plan and are
  labelled "(expected)". Update this page as the OTA finalizes later phases.
- **Favicon / OG image** — `public/favicon.svg` is a simple placeholder mark;
  `public/og-image.png` is referenced in `index.html` but not included —
  add a 1200×630 social preview image there.

## Deploying to Render (same pattern as automatexion.com)

### Option A — Blueprint (`render.yaml`, included in this repo)

1. Push this project to a GitHub/GitLab repo.
2. In Render: **New → Blueprint**, point it at the repo. Render will read
   `render.yaml` and create the static site with the build command, publish
   path, and SPA rewrite rule already configured.
3. Once created, go to **Settings → Custom Domains** and add `envoiso.com`
   (and `www.envoiso.com`), then point your DNS at Render per its instructions.

### Option B — Manual static site

1. In Render: **New → Static Site**, connect the repo.
2. Build command: `npm install && npm run build`
3. Publish directory: `dist`
4. Go to the **Redirects/Rewrites** tab and add:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: **Rewrite**

   This is required — without it, direct links to `/pricing`, `/compliance`,
   etc. will 404 on refresh, since React Router handles those routes
   client-side.
5. Add the custom domain under **Settings → Custom Domains**.

## Design notes

- All shared styling lives in `src/styles/global.css`, scoped under a single
  `.evx` wrapper class (same approach as the original WelcomePage build) so
  it can't leak into anything else on the domain later.
- Colors: Navy `#0C2446`, Blue `#2E6DA4`, Light blue `#4A9BD2`, Teal
  `#00C9A7` (compliance/trust accents), on a near-white paper background.
- Type: Fraunces (serif, headings) + Inter (body/UI), loaded from Google
  Fonts in `App.tsx`.
