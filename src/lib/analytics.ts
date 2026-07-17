// Lightweight analytics: GA4 (if configured) + our own backend event log.
// Both are fire-and-forget — tracking must never block or break the UI.

const TRACK_ENDPOINT = 'https://erp.envoiso.com/api/v1/public/track';
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('evx_sid');
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      sessionStorage.setItem('evx_sid', id);
    }
    return id;
  } catch {
    return 'no-session-storage';
  }
}

function getUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utmSource: p.get('utm_source') || undefined,
      utmMedium: p.get('utm_medium') || undefined,
      utmCampaign: p.get('utm_campaign') || undefined,
    };
  } catch {
    return {};
  }
}

// Loads the GA4 script tag once, only if a Measurement ID is configured.
export function initGA() {
  if (!GA_ID || typeof window === 'undefined') return;
  if (window.gtag) return; // already loaded

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false }); // we send page_view manually on route change
}

function sendToBackend(body: Record<string, unknown>) {
  try {
    fetch(TRACK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true, // lets the request finish even if the page is navigating away
    }).catch(() => { /* tracking must never surface an error to the user */ });
  } catch {
    /* no-op */
  }
}

export function trackPageview(path: string) {
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', { page_path: path });
  }
  sendToBackend({
    eventType: 'pageview',
    pagePath: path,
    sessionId: getSessionId(),
    referrer: document.referrer || undefined,
    ...getUtm(),
  });
}

// elementId: short stable key, e.g. 'nav_start_trial', 'pricing_tier_business'
// label: human-readable text, e.g. 'Start free trial', 'Business — Start free trial'
export function trackClick(elementId: string, label?: string) {
  if (GA_ID && window.gtag) {
    window.gtag('event', 'cta_click', { element_id: elementId, element_label: label });
  }
  sendToBackend({
    eventType: 'click',
    pagePath: window.location.pathname,
    elementId,
    elementLabel: label,
    sessionId: getSessionId(),
    ...getUtm(),
  });
}
