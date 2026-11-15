import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, UtensilsCrossed } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { DINING_HIGHLIGHTS, HOTEL_INFO } from '@/lib/data';
import { formatNaira, getWhatsAppBookingLink } from '@/lib/utils';
import type { DiningItem } from '@/lib/types';

export const metadata: Metadata = {
  title: `Restaurant & Dining | ${HOTEL_INFO.name}`,
  description: `Experience exquisite dining at ${HOTEL_INFO.name}. From authentic Nigerian classics to international cuisine, our restaurant offers a world of flavors.`,
};

const CATEGORY_LABELS: Record<string, { title: string; description: string }> = {
  nigerian_classics: {
    title: 'Nigerian Classics',
    description: 'Authentic Nigerian dishes prepared with the finest local ingredients.',
  },
  grills: {
    title: 'Grills & BBQ',
    description: 'Premium cuts and grilled specialties cooked to perfection.',
  },
  mains: {
    title: 'Main Courses',
    description: 'International and fusion dishes crafted by our expert chefs.',
  },
  breakfast: {
    title: 'Breakfast',
    description: 'Start your day right with our selection of breakfast favorites.',
  },
  cocktails: {
    title: 'Cocktails & Beverages',
    description: 'Signature cocktails, fine wines, and refreshing beverages.',
  },
};

export default function RestaurantPage() {
  // Group by category
  const categories = DINING_HIGHLIGHTS.reduce<Record<string, DiningItem[]>>((acc, item) => {
    const cat = item.category || 'mains';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <PageLayout>
      <PageHero
        title="Restaurant & Dining"
        subtitle="A culinary journey through exquisite flavors and world-class hospitality."
        image="/images/restaurant-hero.jpg"
      />

      {Object.entries(categories).map(([category, items]) => {
        const info = CATEGORY_LABELS[category] || {
          title: category,
          description: '',
        };

        return (
          <Section key={category} id={category}>
            <SectionHeading
              eyebrow="Menu"
              title={info.title}
              subtitle={info.description}
            />

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {items.map((item: DiningItem) => (
                <div
                  key={item.id}
                  className="bg-hotel-800/50 rounded-xl p-6 border border-hotel-700/50 hover:border-gold-500/30 transition-colors relative group"
                >
                  {item.isChefSpecial && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-hotel-950 text-xs font-bold rounded-full uppercase tracking-wider">
                      Chef&apos;s Special
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <UtensilsCrossed className="w-5 h-5 text-gold-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <span className="text-gold-500 font-bold ml-4 whitespace-nowrap">
                          {formatNaira(item.price)}
                        </span>
                      </div>
                      <p className="text-hotel-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      {/* CTA Section */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gold-500 uppercase tracking-widest text-sm mb-4">Reserve a Table</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Dine With Us?
          </h2>
          <p className="text-hotel-300 text-lg mb-8">
            Make a reservation for an unforgettable dining experience. Walk-ins are welcome, but we
            recommend booking ahead for the best experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
            >
              Make a Reservation
            </Link>
            <a
              href={getWhatsAppBookingLink('Restaurant Reservation')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
