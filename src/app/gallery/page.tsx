'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { GALLERY_ITEMS } from '@/lib/data';

const FILTER_TABS = [
  'all',
  'rooms',
  'apartments',
  'pool',
  'dining',
  'spa',
  'amenities',
  'exterior',
] as const;

type FilterTab = (typeof FILTER_TABS)[number];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <PageLayout>
      <PageHero
        title="Gallery"
        subtitle="Take a visual tour of our luxurious spaces, amenities, and experiences."
        image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
      />

      <Section>
        <SectionHeading
          eyebrow="Visual Tour"
          title="Explore Our Spaces"
          subtitle="Browse through our collection of images showcasing the beauty and elegance of our hotel."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-colors ${
                activeFilter === tab
                  ? 'bg-gold-500 text-hotel-950'
                  : 'bg-hotel-800/50 text-hotel-300 border border-hotel-700/50 hover:border-gold-500/30 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-hotel-950/0 group-hover:bg-hotel-950/50 transition-colors flex items-end p-4">
                <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-hotel-400 text-lg">No images found for this category.</p>
          </div>
        )}
      </Section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-hotel-950/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 md:left-8 text-white hover:text-gold-500 transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              fill
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 md:right-8 text-white hover:text-gold-500 transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-semibold text-lg">
              {filteredItems[lightboxIndex].title}
            </p>
            <p className="text-hotel-400 text-sm mt-1">
              {lightboxIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
