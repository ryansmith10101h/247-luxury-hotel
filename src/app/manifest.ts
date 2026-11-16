import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '24/7 Luxury Hotel & Apartment Lekki',
    short_name: '24/7 Luxury Hotel',
    description: 'Boutique luxury hotel rooms and serviced apartments in Lekki, Lagos Nigeria.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090D10',
    theme_color: '#090D10',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
