import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Maximize, Eye, BedDouble, Check, Phone, MessageCircle, Clock } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import Section from '@/components/Section';
import { INITIAL_ROOMS, HOTEL_INFO } from '@/lib/data';
import { formatNaira, getWhatsAppBookingLink } from '@/lib/utils';
import type { Room } from '@/lib/types';

export function generateStaticParams() {
  return INITIAL_ROOMS.filter((r) => r.type === 'apartment').map((apt) => ({
    slug: apt.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const apt = INITIAL_ROOMS.find((r) => r.slug === params.slug && r.type === 'apartment');
  if (!apt) return { title: 'Apartment Not Found' };
  return {
    title: `${apt.name} | ${HOTEL_INFO.name}`,
    description: apt.description,
  };
}

export default function ApartmentDetailPage({ params }: { params: { slug: string } }) {
  const apartment: Room | undefined = INITIAL_ROOMS.find(
    (r) => r.slug === params.slug && r.type === 'apartment'
  );

  if (!apartment) notFound();

  const specs = [
    {
      icon: Users,
      label: 'Capacity',
      value: `${apartment.capacity.adults} Adults${apartment.capacity.children > 0 ? `, ${apartment.capacity.children} Child` : ''}`,
    },
    { icon: Maximize, label: 'Size', value: apartment.size },
    { icon: Eye, label: 'View', value: apartment.view },
    { icon: BedDouble, label: 'Bed', value: apartment.bedConfiguration },
  ];

  return (
    <PageLayout>
      {/* Image Gallery */}
      <section className="pt-24 pb-8 bg-hotel-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={apartment.images[0]}
                alt={apartment.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {apartment.images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative h-[190px] md:h-[242px] rounded-xl overflow-hidden">
                  <Image src={img} alt={`${apartment.name} view ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="text-gold-500 uppercase tracking-widest text-sm mb-2">Serviced Apartment</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{apartment.name}</h1>
              <p className="text-hotel-300 text-lg leading-relaxed">{apartment.description}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-hotel-800/50 rounded-xl p-4 text-center border border-hotel-700/50"
                >
                  <spec.icon className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                  <p className="text-hotel-400 text-xs uppercase tracking-wider mb-1">{spec.label}</p>
                  <p className="text-white font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Amenities Checklist */}
            {apartment.amenities && apartment.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Apartment Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {apartment.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 text-hotel-200">
                      <Check className="w-5 h-5 text-gold-500 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Tags */}
            {apartment.features && apartment.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
                <div className="flex flex-wrap gap-3">
                  {apartment.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gold-500/10 text-gold-500 rounded-full text-sm font-medium border border-gold-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-hotel-800/50 rounded-2xl p-8 border border-hotel-700/50 space-y-6">
              <div>
                <p className="text-hotel-400 text-sm mb-1">Starting from</p>
                <p className="text-3xl font-bold text-gold-500">
                  {formatNaira(apartment.pricePerNight)}
                  <span className="text-hotel-400 text-base font-normal">/night</span>
                </p>
              </div>

              <Link
                href={`/book?room=${apartment.slug}`}
                className="block w-full text-center px-6 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
              >
                Book This Apartment
              </Link>

              <a
                href={getWhatsAppBookingLink(apartment.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Enquiry
              </a>

              <div className="pt-4 border-t border-hotel-700/50 space-y-3">
                <div className="flex items-center gap-3 text-hotel-300">
                  <Phone className="w-5 h-5 text-gold-500" />
                  <span>{HOTEL_INFO.contact.phonePrimary}</span>
                </div>
                <div className="flex items-center gap-3 text-hotel-300">
                  <Clock className="w-5 h-5 text-gold-500" />
                  <span>24/7 Front Desk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
