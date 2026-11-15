import { createClient } from '@supabase/supabase-js';
import { BookingRequest, Enquiry, Room } from './types';
import { INITIAL_ROOMS } from './data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Server-side / In-memory storage fallback for demo and zero-config deployment
// Stored in global scope to persist across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __HOTEL_STORE__: {
    bookings: BookingRequest[];
    enquiries: Enquiry[];
    rooms: Room[];
  } | undefined;
}

if (!global.__HOTEL_STORE__) {
  global.__HOTEL_STORE__ = {
    bookings: [
      {
        id: 'bk-sample-01',
        confirmation_code: '247-LK-92B1',
        room_slug: 'executive-suite',
        room_name: 'Executive Suite',
        room_type: 'hotel',
        check_in: '2026-11-20',
        check_out: '2026-11-24',
        adults: 2,
        children: 0,
        guest_name: 'Emeka Nwosu',
        guest_email: 'emeka.nwosu@example.com',
        guest_phone: '0803 456 7890',
        special_requests: 'Late check-in around 8 PM. Please arrange airport pickup from Lagos terminal.',
        estimated_total: 320000,
        nights: 4,
        status: 'confirmed',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'bk-sample-02',
        confirmation_code: '247-LK-48M7',
        room_slug: 'two-bedroom-serviced-apartment',
        room_name: '2-Bedroom Luxury Serviced Apartment',
        room_type: 'apartment',
        check_in: '2026-12-05',
        check_out: '2026-12-12',
        adults: 3,
        children: 2,
        guest_name: 'Dr. Folake Adeleke',
        guest_email: 'folake.adeleke@example.com',
        guest_phone: '0908 123 4567',
        special_requests: 'Family vacation. Need high baby chair and daily breakfast arrangement.',
        estimated_total: 1050000,
        nights: 7,
        status: 'pending',
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    enquiries: [
      {
        id: 'enq-sample-01',
        guest_name: 'Babajide Alabi',
        guest_email: 'b.alabi@investmenthub.ng',
        guest_phone: '0802 987 6543',
        subject: 'Corporate Executive Long-Stay Rate for 3 Months',
        service_interest: 'apartment',
        message: 'Hello, our oil & gas consultancy is relocating 2 project directors to Lekki for 90 days. Can we discuss your monthly serviced apartment package and corporate billing invoicing?',
        status: 'new',
        created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    ],
    rooms: [...INITIAL_ROOMS],
  };
}

export const localStore = global.__HOTEL_STORE__;

/**
 * Persist or fetch bookings with automatic Supabase-or-Store routing
 */
export async function createBooking(booking: Omit<BookingRequest, 'id' | 'created_at'>): Promise<BookingRequest> {
  const newBooking: BookingRequest = {
    ...booking,
    id: `bk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()
        .single();

      if (!error && data) {
        return data as BookingRequest;
      }
      console.warn('Supabase insert failed, falling back to local store:', error?.message);
    } catch (err) {
      console.warn('Supabase connection error:', err);
    }
  }

  // Fallback to in-memory store
  localStore.bookings.unshift(newBooking);
  return newBooking;
}

export async function getBookings(): Promise<BookingRequest[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as BookingRequest[];
      }
    } catch (err) {
      console.warn('Supabase getBookings error:', err);
    }
  }

  return [...localStore.bookings];
}

export async function updateBookingStatus(id: string, status: BookingRequest['status']): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (!error) return true;
    } catch (err) {
      console.warn('Supabase updateBookingStatus error:', err);
    }
  }

  const found = localStore.bookings.find(b => b.id === id);
  if (found) {
    found.status = status;
    return true;
  }
  return false;
}

/**
 * Contact enquiries
 */
export async function createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([newEnquiry])
        .select()
        .single();

      if (!error && data) {
        return data as Enquiry;
      }
    } catch (err) {
      console.warn('Supabase createEnquiry error:', err);
    }
  }

  localStore.enquiries.unshift(newEnquiry);
  return newEnquiry;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Enquiry[];
      }
    } catch (err) {
      console.warn('Supabase getEnquiries error:', err);
    }
  }

  return [...localStore.enquiries];
}

export async function getRooms(): Promise<Room[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Room[];
      }
    } catch (err) {
      console.warn('Supabase getRooms error:', err);
    }
  }

  return [...localStore.rooms];
}

export async function toggleRoomAvailability(id: string, isAvailable: boolean): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ is_available: isAvailable })
        .eq('id', id);

      if (!error) return true;
    } catch (err) {
      console.warn('Supabase toggleRoomAvailability error:', err);
    }
  }

  const room = localStore.rooms.find(r => r.id === id);
  if (room) {
    room.isAvailable = isAvailable;
    return true;
  }
  return false;
}
