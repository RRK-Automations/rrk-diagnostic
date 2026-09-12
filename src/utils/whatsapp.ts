import { centreInfo } from '@/config/centreInfo';

/**
 * Cleanly formats any phone number and text into a universal WhatsApp API URL
 * Guarantees zero spaces, zero invalid characters, and prevents Next.js 404 routing.
 */
export function getWhatsAppUrl(phone?: string, text?: string): string {
  const rawPhone = phone || centreInfo?.whatsapp?.number || '919440009788';
  let cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  // If 10 digits (Indian mobile without country code), prepend 91
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }

  const defaultText = centreInfo?.whatsapp?.prefilledText?.enquiry || 'Hi Asha Jyothi Diagnostics, I would like to book a diagnostic test / home visit.';
  const messageText = text !== undefined ? text : defaultText;
  const encodedText = encodeURIComponent(messageText);

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
