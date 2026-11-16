import type { Metadata } from 'next';
import { Wifi, Zap, Waves, ShieldCheck, Utensils, Sparkles, Dumbbell, Clock } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { AMENITIES, HOTEL_INFO } from '@/lib/data';
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

export const metadata: Metadata = {
  title: `Amenities | ${HOTEL_INFO.name}`,
  description: `Discover the premium amenities at ${HOTEL_INFO.name}. From our stunning pool to 24/7 room service, we offer everything for a perfect stay.`,
};

export default function AmenitiesPage() {
  return (
    <PageLayout>
      <PageHero
        title="Our Amenities"
        subtitle="World-class facilities and services designed for your comfort and enjoyment."
        image="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80"
      />

      <Section>
        <SectionHeading
          eyebrow="What We Offer"
          title="Premium Amenities"
          subtitle="Every detail has been thoughtfully curated to ensure your stay is nothing short of extraordinary."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {AMENITIES.map((amenity: AmenityItem) => {
            const IconComponent = ICON_MAP[amenity.iconName] || Sparkles;
            return (
              <div
                key={amenity.id}
                className="bg-hotel-800/50 rounded-2xl p-8 border border-hotel-700/50 hover:border-gold-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{amenity.name}</h3>
                <p className="text-hotel-300 leading-relaxed">{amenity.description}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </PageLayout>
  );
}
