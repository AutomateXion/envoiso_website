import { whatsappUrl } from '../lib/whatsapp';
import { trackClick } from '../lib/analytics';

/** Floating "chat on WhatsApp" button shown on every page. */
export default function WhatsAppButton() {
  return (
    <a
      className="wa-fab"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackClick('whatsapp_fab', 'WhatsApp floating button')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5Z" />
        <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" strokeWidth={2.6} />
      </svg>
      <span className="wa-fab-label">Chat on WhatsApp</span>
    </a>
  );
}
