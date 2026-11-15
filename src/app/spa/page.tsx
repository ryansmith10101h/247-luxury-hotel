import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Clock, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { SPA_TREATMENTS, HOTEL_INFO } from '@/lib/data';
import { formatNaira, getWhatsAppBookingLink } from '@/lib/utils';
import type { SpaTreatment } from '@/lib/types';

export const metadata: Metadata = {
  title: `Spa & Wellness | ${HOTEL_INFO.name}`,
  description: `Relax and rejuvenate at the ${HOTEL_INFO.name} spa. Indulge in our premium massage therapies, body treatments, and wellness packages.`,
};

const CATEGORY_LABELS: Record<string, { title: string; description: string }> = {
  massage: {
    title: 'Massage Therapies',
    description: 'Expert hands and ancient techniques to melt away tension and restore balance.',
  },
  body_treatment: {
    title: 'Body Treatments',
    description: 'Luxurious body treatments that nourish, exfoliate, and rejuvenate your skin.',
  },
  wellness_package: {
    title: 'Wellness Packages',
    description: 'Complete wellness experiences combining multiple treatments for total relaxation.',
  },
};

export default function SpaPage() {
  const categories = SPA_TREATMENTS.reduce<Record<string, SpaTreatment[]>>((acc, treatment) => {
    const cat = treatment.category || 'massage';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(treatment);
    return acc;
  }, {});

  return (
    <PageLayout>
      <PageHero
        title="Spa & Wellness"
        subtitle="Surrender to serenity. Restore your body, calm your mind, and rejuvenate your spirit."
        image="/images/spa-hero.jpg"
      />

      {Object.entries(categories).map(([category, treatments]) => {
        const info = CATEGORY_LABELS[category] || {
          title: category,
          description: '',
        };

        return (
          <Section key={category} id={category}>
            <SectionHeading
              eyebrow="Treatments"
              title={info.title}
              subtitle={info.description}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {treatments.map((treatment: SpaTreatment) => (
                <div
                  key={treatment.id}
                  className="bg-hotel-800/50 rounded-2xl p-8 border border-hotel-700/50 hover:border-gold-500/30 transition-all duration-300 group hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{treatment.title}</h3>
                      <div className="flex items-center gap-2 text-hotel-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{treatment.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-hotel-300 text-sm leading-relaxed mb-4 flex-1">
                    {treatment.description}
                  </p>

                  {treatment.benefits && treatment.benefits.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {treatment.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gold-500/10 text-gold-400 rounded-full text-xs font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-hotel-700/50">
                    <p className="text-gold-500 font-bold text-xl">{formatNaira(treatment.price)}</p>
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
          <p className="text-gold-500 uppercase tracking-widest text-sm mb-4">Book a Treatment</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Begin Your Wellness Journey
          </h2>
          <p className="text-hotel-300 text-lg mb-8">
            Our skilled therapists are ready to guide you through a personalized wellness experience.
            Book your treatment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
            >
              Book a Treatment
            </Link>
            <a
              href={getWhatsAppBookingLink('Spa Treatment')}
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
