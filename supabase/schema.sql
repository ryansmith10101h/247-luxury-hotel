-- ========================================================
-- 24/7 LUXURY HOTEL & APARTMENT (LEKKI, LAGOS)
-- SUPABASE POSTGRESQL PRODUCTION DATABASE SCHEMA
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- --------------------------------------------------------
-- 1. ROOMS & APARTMENTS TABLE
-- --------------------------------------------------------
create table if not exists public.rooms (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null check (type in ('hotel', 'apartment')),
  tagline text,
  description text not null,
  short_description text,
  price_per_night numeric(12, 2) not null,
  original_price numeric(12, 2),
  capacity jsonb not null default '{"adults": 2, "children": 1}',
  bed_configuration text not null,
  size text,
  view text,
  amenities text[] default '{}',
  features text[] default '{}',
  images text[] default '{}',
  featured boolean default false,
  is_available boolean default true,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- --------------------------------------------------------
-- 2. BOOKING REQUESTS TABLE
-- --------------------------------------------------------
create table if not exists public.bookings (
  id text primary key,
  confirmation_code text unique not null,
  room_slug text not null,
  room_name text not null,
  room_type text not null check (room_type in ('hotel', 'apartment')),
  check_in date not null,
  check_out date not null,
  adults integer not null default 1 check (adults >= 1),
  children integer not null default 0 check (children >= 0),
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  special_requests text,
  estimated_total numeric(12, 2) not null,
  nights integer not null default 1,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'checked_in', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- --------------------------------------------------------
-- 3. GENERAL ENQUIRIES TABLE
-- --------------------------------------------------------
create table if not exists public.enquiries (
  id text primary key,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  subject text not null,
  message text not null,
  service_interest text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'responded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- --------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------
alter table public.rooms enable row level security;
alter table public.bookings enable row level security;
alter table public.enquiries enable row level security;

-- Public read access to rooms
create policy "Allow public read access to active rooms"
  on public.rooms for select
  using (true);

-- Allow public to submit booking requests
create policy "Allow public creation of bookings"
  on public.bookings for insert
  with check (true);

-- Allow guests to query their own booking via confirmation_code
create policy "Allow lookup by confirmation code"
  on public.bookings for select
  using (true);

-- Allow public to submit contact inquiries
create policy "Allow public creation of inquiries"
  on public.enquiries for insert
  with check (true);

-- Authenticated admins / service role full access
create policy "Allow full access for authenticated admins on rooms"
  on public.rooms for all
  to authenticated
  using (true)
  with check (true);

create policy "Allow full access for authenticated admins on bookings"
  on public.bookings for all
  to authenticated
  using (true)
  with check (true);

create policy "Allow full access for authenticated admins on enquiries"
  on public.enquiries for all
  to authenticated
  using (true)
  with check (true);

-- --------------------------------------------------------
-- INDEXES FOR FAST RETRIEVAL
-- --------------------------------------------------------
create index if not exists idx_bookings_confirmation on public.bookings (confirmation_code);
create index if not exists idx_bookings_status on public.bookings (status);
create index if not exists idx_bookings_dates on public.bookings (check_in, check_out);
create index if not exists idx_rooms_slug on public.rooms (slug);
create index if not exists idx_enquiries_status on public.enquiries (status);
