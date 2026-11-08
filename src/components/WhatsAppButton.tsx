import { whatsappUrl } from '../lib/whatsapp';
import { trackClick } from '../lib/analytics';

/** Opens WhatsApp with "Hi XionERP" pre-filled, which starts the enquiry flow. */
export function openWhatsAppChat() {
  window.open(whatsappUrl(), '_blank', 'noopener');
}

/** Floating "Chat on WhatsApp" button, shown on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackClick('whatsapp_button', 'Chat on WhatsApp')}
      style={{
        position: 'fixed', right: 20, bottom: 20, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8,
        background: '#25D366', color: '#fff', font: '600 15px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
        padding: '12px 18px', borderRadius: 999, boxShadow: '0 4px 14px rgba(0,0,0,.25)', textDecoration: 'none',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" fill="#fff">
        <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.6C28.7 8.6 23 3 16 3zm0 23.1c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4c-1-1.6-1.5-3.5-1.5-5.4C5.4 9.8 10.1 5.2 16 5.2s10.6 4.6 10.6 10.4S21.9 26.1 16 26.1zm5.8-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3.1 1.3 3.3c.2.2 2.3 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
      </svg>
      Chat on WhatsApp
    </a>
  );
}
