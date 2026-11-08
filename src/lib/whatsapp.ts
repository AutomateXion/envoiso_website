/** Single place for the WhatsApp number used across the site. */
export const WHATSAPP_NUMBER = '94760612066'; // +94 76 061 2066, digits only for wa.me
export const WHATSAPP_DISPLAY = '+94 76 061 2066';

/**
 * "Hi" and "XionERP" are start words of the WhatsApp flow "Software enquiry:
 * demo or free trial", so the flow begins as soon as the visitor presses Send.
 */
const DEFAULT_MESSAGE = 'Hi XionERP';

/** wa.me link that opens a chat with an optional pre-filled message. */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp with "Hi XionERP" pre-filled, which starts the enquiry flow. */
export function openWhatsAppChat() {
  window.open(whatsappUrl(), '_blank', 'noopener');
}
