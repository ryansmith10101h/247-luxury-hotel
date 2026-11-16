import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import RoomCard from '@/components/RoomCard';
import { INITIAL_ROOMS, HOTEL_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: `Rooms & Suites | ${HOTEL_INFO.name}`,
  description: `Explore our collection of luxury hotel rooms and suites at ${HOTEL_INFO.name}. Each room is designed for comfort and elegance with premium amenities and 24/7 service.`,
  openGraph: {
    title: `Rooms & Suites | ${HOTEL_INFO.name}`,
    description: `Discover luxury accommodation at ${HOTEL_INFO.name}. Elegantly appointed rooms with world-class amenities.`,
  },
};

export default function RoomsPage() {
  const hotelRooms = INITIAL_ROOMS.filter((r) => r.type === 'hotel');

  return (
    <PageLayout>
      <PageHero
        title="Rooms & Suites"
        subtitle="Elegantly appointed rooms designed for your ultimate comfort and relaxation."
        image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80"
      />

      <Section>
        <SectionHeading
          eyebrow="Accommodation"
          title="Our Hotel Rooms"
          subtitle="Each room is a sanctuary of luxury, featuring premium furnishings, modern amenities, and exceptional 24/7 service."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {hotelRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
