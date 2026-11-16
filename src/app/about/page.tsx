import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Heart, Gem, MapPin } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { HOTEL_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: `About Us | ${HOTEL_INFO.name}`,
  description: `Learn about ${HOTEL_INFO.name} — our story, our values, and our commitment to providing exceptional luxury hospitality 24 hours a day, 7 days a week.`,
};

const VALUES = [
  {
    icon: Shield,
    title: 'Reliability',
    description:
      'We are available around the clock, delivering consistent quality and dependable service every moment of every day.',
  },
  {
    icon: Heart,
    title: 'Genuine Care',
    description:
      'Every guest is family. We go beyond expectations to ensure your comfort, happiness, and well-being throughout your stay.',
  },
  {
    icon: Gem,
    title: 'Modern Luxury',
    description:
      'We blend contemporary elegance with warm hospitality, creating spaces that are both sophisticated and inviting.',
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        title="About Us"
        subtitle="Discover the story behind our commitment to luxury and exceptional hospitality."
        image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
      />

      {/* About Section - Two Column */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              alt={`About ${HOTEL_INFO.name}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/40 to-transparent" />
          </div>

          <div>
            <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Where Luxury Meets Home
            </h2>
            <div className="space-y-4 text-hotel-300 leading-relaxed text-lg">
              <p>
                {HOTEL_INFO.name} was born from a simple vision: to create a haven where every guest
                feels the warmth of home wrapped in the elegance of world-class hospitality.
              </p>
              <p>
                Located in the heart of the city, our hotel combines modern luxury with traditional
                warmth. From our meticulously designed rooms and suites to our state-of-the-art
                amenities, every detail has been crafted with your comfort in mind.
              </p>
              <p>
                Whether you&apos;re here for a night or an extended stay in our serviced apartments,
                our dedicated team is available 24/7 to ensure your experience exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Grid */}
      <Section dark>
        <SectionHeading
          eyebrow="What Drives Us"
          title="Our Core Values"
          subtitle="The principles that guide everything we do and every experience we create."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="bg-hotel-800/50 rounded-2xl p-8 border border-hotel-700/50 hover:border-gold-500/30 transition-all duration-300 group text-center hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                <value.icon className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-hotel-300 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Location Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gold-500" />
          </div>
          <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Find Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Location</h2>
          <p className="text-hotel-300 text-lg leading-relaxed mb-4">{HOTEL_INFO.address.full}</p>
          <p className="text-hotel-400 leading-relaxed mb-8">
            Conveniently located with easy access to major landmarks, business districts, and
            entertainment venues. Whether traveling for business or leisure, our central location
            puts everything within reach.
          </p>
          <a
            href={HOTEL_INFO.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>
        </div>
      </Section>
    </PageLayout>
  );
}
