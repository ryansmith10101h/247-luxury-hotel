import Link from 'next/link';
import Image from 'next/image';
import { Wifi, Zap, Waves, ShieldCheck, Utensils, Sparkles, Dumbbell, Clock } from 'lucide-react';
import { HOTEL_INFO, INITIAL_ROOMS, AMENITIES, FAQS } from '@/lib/data';
import { formatNaira } from '@/lib/utils';
import type { AmenityItem } from '@/lib/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Zap,
  Waves,
  ShieldCheck,
  Utensils,
  Sparkles,
  Dumbbell,
  Clock,
};

export default function HomePage() {
  const hotelRooms = INITIAL_ROOMS.filter((r) => r.type === 'hotel').slice(0, 3);
  const apartments = INITIAL_ROOMS.filter((r) => r.type === 'apartment').slice(0, 2);
  const featuredAmenities = AMENITIES.slice(0, 8);

  return (
    <main>
      {/* ───────── HERO ───────── */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hotel-exterior.jpg"
          alt={HOTEL_INFO.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hotel-950/70 via-hotel-950/50 to-hotel-950/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold-500 uppercase tracking-[0.25em] text-sm mb-6 font-medium">
            Welcome to {HOTEL_INFO.name}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Comfort. Luxury.{' '}
            <span className="italic text-gold-500">Your&nbsp;Home Away From&nbsp;Home.</span>
          </h1>
          <p className="text-hotel-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Experience world-class hospitality in the heart of the city. Elegantly appointed rooms,
            exceptional dining, and unparalleled service — available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors text-lg"
            >
              Book Your Stay
            </Link>
            <Link
              href="/rooms"
              className="px-8 py-4 border-2 border-hotel-300 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Explore Rooms
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-hotel-300 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-gold-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* ───────── CHOOSE YOUR STAY ───────── */}
      <section className="py-24 bg-hotel-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Accommodation</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Choose Your Stay</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hotel Card */}
            <Link href="/rooms" className="group relative h-[420px] rounded-2xl overflow-hidden block">
              <Image
                src="/images/hotel-room.jpg"
                alt="Hotel Rooms"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/90 via-hotel-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Hotel Rooms</h3>
                <p className="text-hotel-200 mb-4">
                  Luxuriously appointed suites with premium amenities and 24/7 service.
                </p>
                <span className="text-gold-500 font-semibold group-hover:underline">
                  View Rooms →
                </span>
              </div>
            </Link>

            {/* Apartments Card */}
            <Link href="/apartments" className="group relative h-[420px] rounded-2xl overflow-hidden block">
              <Image
                src="/images/apartment.jpg"
                alt="Serviced Apartments"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/90 via-hotel-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Serviced Apartments</h3>
                <p className="text-hotel-200 mb-4">
                  Spacious, fully furnished apartments for extended stays and ultimate comfort.
                </p>
                <span className="text-gold-500 font-semibold group-hover:underline">
                  View Apartments →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── FEATURED ROOMS ───────── */}
      <section className="py-24 bg-hotel-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Our Finest</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Featured Rooms</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {hotelRooms.map((room) => (
              <Link
                key={room.id}
                href={`/rooms/${room.slug}`}
                className="group bg-hotel-800/50 rounded-2xl overflow-hidden border border-hotel-700/50 hover:border-gold-500/30 transition-colors"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{room.name}</h3>
                  <p className="text-hotel-300 text-sm mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-500 font-bold text-lg">
                      {formatNaira(room.pricePerNight)}
                      <span className="text-hotel-400 text-sm font-normal">/night</span>
                    </span>
                    <span className="text-gold-500 text-sm font-semibold group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FEATURED APARTMENTS ───────── */}
      <section className="py-24 bg-hotel-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Extended Stays</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Featured Apartments</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {apartments.map((apt) => (
              <Link
                key={apt.id}
                href={`/apartments/${apt.slug}`}
                className="group bg-hotel-800/50 rounded-2xl overflow-hidden border border-hotel-700/50 hover:border-gold-500/30 transition-colors"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={apt.images[0]}
                    alt={apt.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{apt.name}</h3>
                  <p className="text-hotel-300 text-sm mb-4 line-clamp-2">{apt.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-500 font-bold text-lg">
                      {formatNaira(apt.pricePerNight)}
                      <span className="text-hotel-400 text-sm font-normal">/night</span>
                    </span>
                    <span className="text-gold-500 text-sm font-semibold group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── AMENITIES GRID ───────── */}
      <section className="py-24 bg-hotel-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Premium Amenities</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredAmenities.map((amenity: AmenityItem) => {
              const IconComponent = ICON_MAP[amenity.iconName] || Sparkles;
              return (
                <div
                  key={amenity.id}
                  className="bg-hotel-800/50 rounded-xl p-6 text-center border border-hotel-700/50 hover:border-gold-500/30 transition-colors group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{amenity.name}</h3>
                  <p className="text-hotel-400 text-sm">{amenity.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/amenities"
              className="text-gold-500 font-semibold hover:underline text-lg"
            >
              View All Amenities →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── EXPERIENCE STRIP ───────── */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/pool.jpg"
          alt="Pool Experience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-hotel-950/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-gold-500 uppercase tracking-widest text-sm mb-4">Relax &amp; Unwind</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Dive Into Luxury
          </h2>
          <p className="text-hotel-200 text-lg mb-8">
            Our stunning pool area offers the perfect escape. Whether you want to swim laps or lounge
            by the water, serenity awaits.
          </p>
          <Link
            href="/amenities"
            className="px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors inline-block text-lg"
          >
            Discover More
          </Link>
        </div>
      </section>

      {/* ───────── FAQ ACCORDION ───────── */}
      <section className="py-24 bg-hotel-950">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Got Questions?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-hotel-800/50 rounded-xl border border-hotel-700/50 overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between text-white font-semibold hover:text-gold-500 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-gold-500 transition-transform group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-hotel-300 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="py-24 bg-gradient-to-b from-hotel-900 to-hotel-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold-500 uppercase tracking-widest text-sm mb-4">Ready?</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Your Perfect Stay Awaits
          </h2>
          <p className="text-hotel-200 text-lg max-w-2xl mx-auto mb-10">
            Whether it&apos;s a night of luxury or an extended stay in our serviced apartments,
            {HOTEL_INFO.name} is ready to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors text-lg"
            >
              Book Your Stay
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-hotel-300 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
