import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import RoomCard from '@/components/RoomCard';
import { INITIAL_ROOMS, HOTEL_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: `Serviced Apartments | ${HOTEL_INFO.name}`,
  description: `Discover our luxury serviced apartments at ${HOTEL_INFO.name}. Spacious, fully furnished apartments perfect for extended stays with all the comforts of home.`,
  openGraph: {
    title: `Serviced Apartments | ${HOTEL_INFO.name}`,
    description: `Experience luxury apartment living at ${HOTEL_INFO.name}. Fully furnished and serviced for your comfort.`,
  },
};

export default function ApartmentsPage() {
  const apartments = INITIAL_ROOMS.filter((r) => r.type === 'apartment');

  return (
    <PageLayout>
      <PageHero
        title="Serviced Apartments"
        subtitle="Spacious, fully furnished apartments for extended stays and ultimate comfort."
        image="/images/apartments-hero.jpg"
      />

      <Section>
        <SectionHeading
          eyebrow="Extended Stays"
          title="Our Apartments"
          subtitle="Enjoy the space and freedom of home with the luxury and services of a five-star hotel. Perfect for families, business travelers, and long-term guests."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {apartments.map((apt) => (
            <RoomCard key={apt.id} room={apt} />
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
