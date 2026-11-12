import { MODULE_ICONS } from './moduleIcons';

/**
 * Home-page announcement carousel.
 *
 * To change what rotates on the homepage, edit this list only.
 *  - eyebrow  : small label above the title (e.g. "New module", "Offer")
 *  - title    : headline (keep to ~8 words)
 *  - text     : one or two short sentences
 *  - cta      : button label + destination. Use `to` for a page on this site
 *               (e.g. '/pricing'), `href` for an external link, or
 *               `action: 'whatsapp-chat'` to open the on-site WhatsApp chat box.
 *  - icon     : optional key from MODULE_ICONS, drawn large on the right
 *  - image    : optional background image (put the file in /public and
 *               reference it as '/banner-name.jpg'). ~1600×520 works well.
 *               When set, the icon is hidden and the text sits on a dark overlay.
 *  - theme    : 'navy' (default) | 'blue' | 'orange' — gradient colour when no image
 */
export interface Banner {
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; to?: string; href?: string; action?: 'whatsapp-chat' | 'web-chat' };
  /** optional product logo shown above the eyebrow, linking to `logo.href` */
  logo?: { src: string; alt: string; href: string };
  icon?: string;
  image?: string;
  theme?: 'navy' | 'blue' | 'orange';
}

export const BANNERS: Banner[] = [
  {
    eyebrow: 'New module',
    title: 'Manufacturing is here.',
    text: 'Bill of materials, work orders, routing and WIP costing — from raw material to finished goods, on the same stock and ledger. Included in every plan.',
    cta: { label: 'See what’s included', to: '/#all-features' },
    icon: MODULE_ICONS['Manufacturing'],
    image: '/banner-1.jpg',
    theme: 'navy',
  },
  {
    eyebrow: 'New prices',
    title: 'Lower prices on every plan.',
    text: 'Every module included — you only pick your team size. Start with a 14-day free trial.',
    cta: { label: 'See pricing', to: '/pricing' },
    icon: MODULE_ICONS['Invoicing'],
    image: '/banner-2.jpg',
    theme: 'orange',
  },
  {
    eyebrow: 'New integration',
    title: 'WhatsApp API is live.',
    text: 'Invoices, payment reminders and order updates sent to customers on WhatsApp — straight from Xion ERP.',
    cta: { label: 'Chat with us', action: 'web-chat' },
    logo: { src: '/logo-connect-horizontal.png', alt: 'XionConnect', href: 'https://automatexion.com/xionconnect.html' },
    icon: MODULE_ICONS['CRM'],
    image: '/banner-3.jpg',
    theme: 'blue',
  },
  {
    eyebrow: 'New module',
    title: 'Your online shop, run from XionERP.',
    text: 'Xion Webstore shows the items, prices and stock already in XionERP, and web orders land as sales documents.',
    cta: { label: 'See Xion Webstore', href: 'https://automatexion.com/xionwebstore.html' },
    logo: { src: '/logo-webstore-horizontal.png', alt: 'Xion Webstore', href: 'https://automatexion.com/xionwebstore.html' },
    icon: MODULE_ICONS['CRM'],
    image: '/banner-6.jpg',
    theme: 'blue',
  },
  {
    eyebrow: 'Included, no extra cost',
    title: 'HRMS and field sales, built in.',
    text: 'Payroll, attendance and leave, plus a mobile app for reps on the road — modules most ERPs sell separately.',
    cta: { label: 'Explore modules', to: '/#features' },
    icon: MODULE_ICONS['Human Resources'],
    image: '/banner-4.jpg',
    theme: 'navy',
  },
  {
    eyebrow: 'Oman e-invoicing',
    title: 'Fawtara-ready, ahead of the rollout.',
    text: 'UBL 2.1 e-invoices generated and stored the way the Oman Tax Authority expects — built into every record.',
    cta: { label: 'See compliance', to: '/compliance' },
    icon: MODULE_ICONS['Compliance'],
    image: '/banner-5.jpg',
    theme: 'blue',
  },
];
