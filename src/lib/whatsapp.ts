/** Single place for the sales WhatsApp number used across the site. */
export const WHATSAPP_NUMBER = '94761949294'; // +94 761 949294, digits only for wa.me
export const WHATSAPP_DISPLAY = '+94 76 194 9294';

const DEFAULT_MESSAGE = 'Hi Xion ERP, I’d like to know more about the platform.';

/** wa.me link that opens a chat with an optional pre-filled message. */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
