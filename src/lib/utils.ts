import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format amount as Nigerian Naira (₦)
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

/**
 * Calculate number of nights between check-in and check-out
 */
export function calculateNights(checkInDate: string, checkOutDate: string): number {
  if (!checkInDate || !checkOutDate) return 1;
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

/**
 * Generate human-readable booking confirmation code
 * Example: 247-LKK-8924
 */
export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `247-LK-${random}`;
}

/**
 * Build a prefilled WhatsApp link for direct instant booking/inquiry
 */
export function getWhatsAppBookingLink(
  details: string | {
    roomName: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    name?: string;
    code?: string;
  }
): string {
  if (typeof details === 'string') {
    const text = `Hello 24/7 Luxury Hotel Lekki, I would like to make an enquiry about ${details}.`;
    return `https://wa.me/2349060000578?text=${encodeURIComponent(text)}`;
  }

  const text = `Hello 24/7 Luxury Hotel Lekki,
I want to book: ${details.roomName}${details.checkIn ? `\nCheck-in: ${details.checkIn}` : ''}${details.checkOut ? `\nCheck-out: ${details.checkOut}` : ''}${details.guests ? `\nGuests: ${details.guests}` : ''}${details.name ? `\nGuest Name: ${details.name}` : ''}${details.code ? `\nReference Code: ${details.code}` : ''}
Please confirm availability.`;

  return `https://wa.me/2349060000578?text=${encodeURIComponent(text)}`;
}

/**
 * Format Nigerian phone number cleanly
 */
export function formatNigerianPhone(phone: string): string {
  const clean = phone.replace(/[^0-9+]/g, '');
  return clean;
}
