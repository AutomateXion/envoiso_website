import { useEffect, useRef, useState } from 'react';
import { whatsappUrl, WHATSAPP_DISPLAY } from '../lib/whatsapp';
import { trackClick } from '../lib/analytics';

/** Any part of the site can open the chat panel by dispatching this event. */
export const OPEN_WHATSAPP_CHAT = 'xion:open-whatsapp-chat';
export function openWhatsAppChat() {
  window.dispatchEvent(new CustomEvent(OPEN_WHATSAPP_CHAT));
}

const GREETING = 'Hi there 👋 How can we help? Tell us a little about your business and what you’re looking for — we’ll reply on WhatsApp.';

/**
 * Floating WhatsApp chat: a small on-page chat panel where the visitor writes
 * their message, then "Send" hands the conversation to WhatsApp with the
 * message pre-filled. Replies happen in WhatsApp.
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const msgRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener(OPEN_WHATSAPP_CHAT, onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener(OPEN_WHATSAPP_CHAT, onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => { if (open) setTimeout(() => msgRef.current?.focus(), 150); }, [open]);

  const text = msg.trim();
  const composed = `${name.trim() ? `Hi, I’m ${name.trim()}. ` : 'Hi Xion ERP. '}${text}`;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) { msgRef.current?.focus(); return; }
    trackClick('whatsapp_chat_send', 'WhatsApp chat: send');
    window.open(whatsappUrl(composed), '_blank', 'noopener,noreferrer');
    setMsg('');
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`wa-fab${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls="wa-panel"
        aria-label={open ? 'Close chat' : 'Chat with us on WhatsApp'}
        onClick={() => { setOpen(o => !o); if (!open) trackClick('whatsapp_fab', 'WhatsApp chat: open'); }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5Z" />
            <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" strokeWidth={2.6} />
          </svg>
        )}
        {!open && <span className="wa-fab-label">Chat with us</span>}
      </button>

      <div id="wa-panel" className={`wa-panel${open ? ' is-open' : ''}`} role="dialog" aria-label="Chat with Xion ERP on WhatsApp" aria-hidden={!open}>
        <div className="wa-head">
          <div className="wa-avatar"><img src="/mark-reversed.jpg" alt="" /></div>
          <div>
            <div className="wa-title">Xion ERP</div>
            <div className="wa-status"><span className="wa-dot" />Replies on WhatsApp · {WHATSAPP_DISPLAY}</div>
          </div>
        </div>
        <div className="wa-body">
          <div className="wa-bubble">{GREETING}</div>
        </div>
        <form className="wa-form" onSubmit={send}>
          <input
            className="wa-input"
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            tabIndex={open ? 0 : -1}
          />
          <textarea
            ref={msgRef}
            className="wa-input wa-textarea"
            placeholder="Type your message…"
            rows={3}
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement)?.requestSubmit(); } }}
            tabIndex={open ? 0 : -1}
          />
          <button type="submit" className="wa-send" disabled={!text} tabIndex={open ? 0 : -1}>
            Send on WhatsApp
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
          <div className="wa-hint">Opens WhatsApp with your message — we reply there.</div>
        </form>
      </div>
    </>
  );
}
