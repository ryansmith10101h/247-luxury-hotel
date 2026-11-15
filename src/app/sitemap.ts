import { MetadataRoute } from 'next';
import { INITIAL_ROOMS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://247luxuryhotel.com';
  const now = new Date();

  const staticRoutes = [
    '',
    '/rooms',
    '/apartments',
    '/amenities',
    '/restaurant',
    '/spa',
    '/gallery',
    '/about',
    '/contact',
    '/book',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const dynamicRooms = INITIAL_ROOMS.map((room) => ({
    url: `${baseUrl}/${room.type === 'hotel' ? 'rooms' : 'apartments'}/${room.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRooms];
}
