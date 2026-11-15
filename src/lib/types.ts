export type StayCategory = 'hotel' | 'apartment';

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: StayCategory;
  tagline: string;
  description: string;
  shortDescription: string;
  pricePerNight: number; // in NGN
  originalPrice?: number; // for showing premium value
  capacity: {
    adults: number;
    children: number;
  };
  bedConfiguration: string;
  size: string; // e.g. "38 m² / 409 sq ft"
  view: string; // e.g. "Ikate Skyline / Pool View"
  amenities: string[];
  features: string[];
  images: string[];
  featured: boolean;
  isAvailable: boolean;
  order: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'completed';

export interface BookingRequest {
  id: string;
  confirmation_code: string;
  room_slug: string;
  room_name: string;
  room_type: StayCategory;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  adults: number;
  children: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests?: string;
  estimated_total: number;
  nights: number;
  status: BookingStatus;
  created_at: string;
}

export interface Enquiry {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  subject: string;
  message: string;
  service_interest?: string;
  status: 'new' | 'reviewed' | 'responded';
  created_at: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: 'comfort' | 'wellness' | 'dining' | 'service' | 'security';
  description: string;
  iconName: string;
  featured: boolean;
}

export interface DiningItem {
  id: string;
  category: 'breakfast' | 'starters' | 'mains' | 'nigerian_classics' | 'grills' | 'cocktails' | 'wines';
  name: string;
  description: string;
  price: number; // NGN
  isChefSpecial?: boolean;
}

export interface SpaTreatment {
  id: string;
  category: 'massage' | 'body_treatment' | 'facial' | 'wellness_package';
  title: string;
  duration: string;
  price: number; // NGN
  description: string;
  benefits?: string[];
}
