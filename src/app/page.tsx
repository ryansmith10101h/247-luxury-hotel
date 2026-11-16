import Link from 'next/link';
import Image from 'next/image';
import { Wifi, Zap, Waves, ShieldCheck, Utensils, Sparkles, Dumbbell, Clock, MapPin, Star, ArrowRight, Phone } from 'lucide-react';
import { HOTEL_INFO, INITIAL_ROOMS, AMENITIES, FAQS, DINING_HIGHLIGHTS, SPA_TREATMENTS } from '@/lib/data';
import { formatNaira } from '@/lib/utils';
import type { AmenityItem } from '@/lib/types';
import PageLayout from '@/components/PageLayout';

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
  const hotelRooms = INITIAL_ROOMS.filter((r) => r.type === 'hotel');
  const apartments = INITIAL_ROOMS.filter((r) => r.type === 'apartment');
  const featuredAmenities = AMENITIES.slice(0, 8);
  const chefSpecials = DINING_HIGHLIGHTS.filter((d) => d.isChefSpecial).slice(0, 3);
  const signatureSpa = SPA_TREATMENTS[0];

  return (
    <PageLayout>
      {/* ═══════════════════════════════════════════════════════════════
          HERO — Full-viewport cinematic
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden -mt-20">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          alt={HOTEL_INFO.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hotel-950/80 via-hotel-950/40 to-hotel-950/90" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="text-hotel-200 text-sm tracking-wide">Lekki, Lagos — Nigeria</span>
          </div>

          <p className="text-gold-500 uppercase tracking-[0.3em] text-xs sm:text-sm mb-6 font-medium">
            {HOTEL_INFO.shortName}
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-8">
            An Elevated Expression
            <br />
            <span className="italic text-gold-500">of Comfort &amp; Luxury</span>
          </h1>

          <p className="text-hotel-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Premium suites, fully serviced apartments, gourmet dining, and 24/7 uninterrupted hospitality —
            in the heart of Lekki.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-10 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-300 text-lg tracking-wide hover:shadow-lg hover:shadow-gold-500/20"
            >
              Book Your Stay
            </Link>
            <Link
              href="/rooms"
              className="px-10 py-4 border border-hotel-300/50 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-lg tracking-wide"
            >
              Explore Rooms
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-hotel-300/50 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-gold-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHOOSE YOUR STAY — Editorial split
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">Accommodation</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">Choose Your Stay</h2>
            <p className="text-hotel-400 mt-4 max-w-xl mx-auto text-lg">
              From boutique hotel suites to fully serviced apartments — find your perfect sanctuary.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hotel Rooms card */}
            <Link href="/rooms" className="group relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden block">
              <Image
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
                alt="Hotel Rooms"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/90 via-hotel-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <p className="text-gold-500 uppercase tracking-widest text-xs mb-3 font-medium">Boutique Suites</p>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">Hotel Rooms</h3>
                <p className="text-hotel-200 mb-6 max-w-sm">
                  Luxuriously appointed suites with premium amenities and around-the-clock dedicated service.
                </p>
                <span className="inline-flex items-center gap-2 text-gold-500 font-semibold group-hover:gap-3 transition-all duration-300">
                  View Rooms <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Apartments card */}
            <Link href="/apartments" className="group relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden block">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
                alt="Serviced Apartments"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/90 via-hotel-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <p className="text-gold-500 uppercase tracking-widest text-xs mb-3 font-medium">Extended Living</p>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">Serviced Apartments</h3>
                <p className="text-hotel-200 mb-6 max-w-sm">
                  Spacious, fully furnished apartments for extended stays and ultimate residential comfort.
                </p>
                <span className="inline-flex items-center gap-2 text-gold-500 font-semibold group-hover:gap-3 transition-all duration-300">
                  View Apartments <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED ROOMS — ALL 4 hotel rooms
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">Our Finest</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">Featured Rooms</h2>
            <p className="text-hotel-400 mt-4 max-w-xl mx-auto text-lg">
              Each suite is designed to deliver an unforgettable experience of refined luxury.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelRooms.map((room) => (
              <Link
                key={room.id}
                href={`/rooms/${room.slug}`}
                className="group bg-hotel-800/50 rounded-2xl overflow-hidden border border-hotel-700/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5"
              >
                <div className="relative h-56 sm:h-52 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 right-4 bg-hotel-950/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-hotel-200 text-xs">{room.size.split('/')[0].trim()}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-hotel-400 text-sm mb-4 line-clamp-2">{room.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-500 font-bold text-lg">
                      {formatNaira(room.pricePerNight)}
                      <span className="text-hotel-400 text-xs font-normal ml-1">/night</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-gold-500 font-semibold text-lg hover:gap-3 transition-all duration-300"
            >
              View All Rooms <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED APARTMENTS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">Extended Stays</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">Featured Apartments</h2>
            <p className="text-hotel-400 mt-4 max-w-xl mx-auto text-lg">
              Live luxuriously with full residential comfort and premium hotel services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {apartments.map((apt) => (
              <Link
                key={apt.id}
                href={`/apartments/${apt.slug}`}
                className="group bg-hotel-800/50 rounded-2xl overflow-hidden border border-hotel-700/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={apt.images[0]}
                    alt={apt.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 right-4 bg-hotel-950/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-hotel-200 text-xs">{apt.size.split('/')[0].trim()}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {apt.name}
                  </h3>
                  <p className="text-hotel-400 text-sm mb-4 line-clamp-2">{apt.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {apt.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-hotel-700/40 text-hotel-300 rounded-full px-3 py-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-500 font-bold text-lg">
                      {formatNaira(apt.pricePerNight)}
                      <span className="text-hotel-400 text-xs font-normal ml-1">/night</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                      Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          AMENITIES PREVIEW — 8 featured
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">What We Offer</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">Premium Amenities</h2>
            <p className="text-hotel-400 mt-4 max-w-xl mx-auto text-lg">
              Every detail curated for an exceptional stay — from 24/7 power to spa &amp; wellness.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredAmenities.map((amenity: AmenityItem) => {
              const IconComponent = ICON_MAP[amenity.iconName] || Sparkles;
              return (
                <div
                  key={amenity.id}
                  className="bg-hotel-800/50 rounded-xl p-6 text-center border border-hotel-700/50 hover:border-gold-500/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">{amenity.name}</h3>
                  <p className="text-hotel-400 text-xs sm:text-sm leading-relaxed">{amenity.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 text-gold-500 font-semibold text-lg hover:gap-3 transition-all duration-300"
            >
              View All Amenities <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          POOL / LIFESTYLE — Cinematic parallax strip
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[550px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80"
          alt="Pool Experience at 24/7 Luxury Hotel"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hotel-950/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-5 font-medium">Relax &amp; Unwind</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Dive Into Luxury
          </h2>
          <p className="text-hotel-200 text-base sm:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Our sun-drenched courtyard pool and lounge deck offer the perfect escape — poolside
            cocktails, comfortable cabanas, and serenity in the heart of Lagos.
          </p>
          <Link
            href="/amenities"
            className="px-10 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-300 inline-block text-lg tracking-wide hover:shadow-lg hover:shadow-gold-500/20"
          >
            Discover More
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RESTAURANT & DINING PREVIEW
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <div>
              <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">
                Culinary Excellence
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
                24/7 Bistro &amp;<br />Cocktail Bar
              </h2>
              <p className="text-hotel-300 text-lg leading-relaxed mb-10">
                From flame-kissed Nigerian classics to continental fine dining and handcrafted cocktails —
                our kitchen never sleeps. Every dish is prepared with locally sourced ingredients and
                served with impeccable attention to detail.
              </p>

              {/* Chef specials */}
              <div className="space-y-6 mb-10">
                {chefSpecials.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex items-start gap-4 p-4 bg-hotel-800/30 rounded-xl border border-hotel-700/30"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center mt-0.5">
                      <Star className="w-5 h-5 text-gold-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-white font-semibold text-sm sm:text-base">{dish.name}</h3>
                        <span className="text-gold-500 font-bold text-sm whitespace-nowrap">
                          {formatNaira(dish.price)}
                        </span>
                      </div>
                      <p className="text-hotel-400 text-sm leading-relaxed">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/restaurant"
                className="inline-flex items-center gap-2 text-gold-500 font-semibold text-lg hover:gap-3 transition-all duration-300"
              >
                View Full Menu <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Image column */}
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="The 24/7 Bistro Dining Room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SPA PREVIEW
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image column — reversed order on desktop */}
            <div className="relative h-[450px] lg:h-[550px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
                alt="Lotus Wellness Spa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/30 to-transparent" />
            </div>

            {/* Text column */}
            <div className="order-1 lg:order-2">
              <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">
                Wellness &amp; Rejuvenation
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
                The Lotus Spa
              </h2>
              <p className="text-hotel-300 text-lg leading-relaxed mb-10">
                Surrender to a world of serenity. Our holistic spa treatments blend therapeutic expertise
                with premium organic products for complete mind and body restoration.
              </p>

              {/* Signature Treatment */}
              <div className="bg-hotel-800/50 rounded-2xl p-6 sm:p-8 border border-hotel-700/50 mb-10">
                <p className="text-gold-500 uppercase tracking-widest text-xs mb-3 font-medium">Signature Treatment</p>
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">{signatureSpa.title}</h3>
                <p className="text-hotel-400 mb-4 leading-relaxed">{signatureSpa.description}</p>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-gold-500 font-bold text-xl">{formatNaira(signatureSpa.price)}</span>
                  <span className="text-hotel-400 text-sm">•</span>
                  <span className="text-hotel-300 text-sm">{signatureSpa.duration}</span>
                </div>
                {signatureSpa.benefits && (
                  <div className="flex flex-wrap gap-2">
                    {signatureSpa.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs bg-gold-500/10 text-gold-500 rounded-full px-3 py-1"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/spa"
                className="inline-flex items-center gap-2 text-gold-500 font-semibold text-lg hover:gap-3 transition-all duration-300"
              >
                Explore Spa Treatments <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ ACCORDION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-hotel-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-medium">Got Questions?</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-hotel-800/50 rounded-xl border border-hotel-700/50 overflow-hidden hover:border-hotel-700 transition-colors"
              >
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between text-white font-semibold hover:text-gold-500 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-gold-500 transition-transform group-open:rotate-45 text-2xl leading-none flex-shrink-0">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-hotel-300 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-hotel-900 to-hotel-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm mb-5 font-medium">Ready?</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Your Perfect Stay Awaits
          </h2>
          <p className="text-hotel-200 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether it&apos;s a night of luxury or an extended stay in our serviced apartments,
            {' '}{HOTEL_INFO.name} is ready to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-10 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-300 text-lg tracking-wide hover:shadow-lg hover:shadow-gold-500/20"
            >
              Book Your Stay
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border border-hotel-300/50 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-lg tracking-wide"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LOCATION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-hotel-950 border-t border-hotel-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-gold-500" />
            <span className="text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-medium">Our Location</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white mb-4">
            {HOTEL_INFO.address.street}
          </h3>
          <p className="text-hotel-300 text-lg mb-2">
            {HOTEL_INFO.address.neighborhood}, {HOTEL_INFO.address.district}
          </p>
          <p className="text-hotel-400 mb-3">
            {HOTEL_INFO.address.city}, {HOTEL_INFO.address.country}
          </p>
          <p className="text-hotel-400 text-sm mb-8 italic">
            {HOTEL_INFO.address.landmark}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={HOTEL_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:gap-3 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" /> Get Directions <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-hotel-700 hidden sm:inline">|</span>
            <a
              href={`tel:${HOTEL_INFO.contact.phonePrimaryRaw}`}
              className="inline-flex items-center gap-2 text-hotel-300 font-medium hover:text-gold-500 transition-colors"
            >
              <Phone className="w-4 h-4" /> {HOTEL_INFO.contact.phonePrimary}
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
