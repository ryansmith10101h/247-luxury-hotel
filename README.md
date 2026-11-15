# 24/7 LUXURY HOTEL & APARTMENT (LEKKI, LAGOS)

A production-grade web application for **24/7 Luxury Hotel & Apartment**, situated at 39 Kusenla Road, Ikate Elegushi, Lekki Peninsula II, Lagos, Nigeria.

Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## 🌟 Property & Business Information

- **Property Name:** 24/7 LUXURY HOTEL & APARTMENT
- **Address:** 39 Kusenla Road, Ikate Elegushi, Lekki Peninsula II, Lagos, Nigeria
- **Landmarks:** Minutes from Nike Art Gallery, Elegushi Royal Beach, Circle Mall, and Lekki Phase 1
- **Primary Phone:** 0906 000 0578
- **Secondary Phone:** 0909 973 0000
- **WhatsApp:** +234 906 000 0578
- **Reception:** 24 Hours / 7 Days a week
- **Check-in:** 14:00 (2:00 PM West Africa Time)
- **Check-out:** 12:00 (12:00 PM West Africa Time)

---

## 🚀 Key Features

### 1. Dual Hospitality Positioning ("Choose Your Stay")
- **Hotel Suites:** Standard Suite (₦50,000), Deluxe Suite (₦65,000), Executive Suite (₦80,000), and Presidential Suite (₦120,000).
- **Serviced Apartments:** 1-Bedroom Luxury Apartment (₦95,000) and 2-Bedroom Luxury Serviced Apartment (₦150,000) with fully fitted chef kitchens, separate living rooms, dining nooks, and in-unit washer/dryers.

### 2. Nigerian Business UX Optimization
- Real **₦ (Naira)** currency formatting across all pricing and calculations.
- Direct **WhatsApp** instant chat and booking confirmation with pre-filled guest and dates messages.
- Immediate **One-Tap Phone Call** and **Google Maps Directions** CTAs.
- Sticky mobile navigation action bar for swift guest conversions on Android and iPhone devices.
- Africa/Lagos timezone alignment.

### 3. Comprehensive Reservation & Enquiry Engine
- Live date picker with stay night calculation.
- Automated human-readable booking reference generator (e.g. `247-LK-7LMJ`).
- Zero-downtime dual-layer database: seamlessly writes to Supabase PostgreSQL or active fallback store when credentials are pending.
- Contact and corporate long-stay enquiry routing.

### 4. Owner & Management Admin Dashboard (`/admin`)
- PIN-secured authentication (default: `2470`, configurable via `ADMIN_SECRET_PIN`).
- Real-time management of booking requests (approve, confirm, cancel, check-in, complete).
- Room and apartment inventory toggle (instantly switch suites between Available and Unavailable).
- Contact and long-stay enquiry inbox.

### 5. Technical SEO & Rich Structured Data
- Open Graph, Twitter cards, and semantic HTML5 throughout.
- Schema.org JSON-LD structured data for `Hotel`, `LodgingBusiness`, and `PostalAddress`.
- Dynamic auto-generating `sitemap.xml` and `robots.txt`.
- High Core Web Vitals optimization with responsive Next.js image components.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS with custom editorial luxury theme
- **Icons:** Lucide React
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS)
- **Deployment:** Vercel-ready with zero-config standalone capabilities

---

## 💻 Getting Started Locally

### 1. Clone & Install
```bash
git clone <repo-url>
cd "247 LUXURY HOTEL"
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup

1. Create a free project on [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
4. Copy your project URL and Anon Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. All bookings, rooms, and enquiries will now persist in your PostgreSQL database.

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/247-luxury-hotel.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Set environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com`
   - `ADMIN_SECRET_PIN`: Your chosen 4-digit admin PIN
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Deploy!
