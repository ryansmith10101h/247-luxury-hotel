import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://247luxuryhotel.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '24/7 Luxury Hotel & Apartment | Premium Boutique Hotel in Lekki, Lagos',
    template: '%s | 24/7 Luxury Hotel Lekki',
  },
  description:
    'Experience refined luxury hospitality at 24/7 Luxury Hotel & Apartment, 39 Kusenla Road, Ikate Elegushi, Lekki, Lagos. Premium suites, serviced apartments, pool, spa, restaurant & 24/7 power.',
  keywords: [
    'luxury hotel Lekki Lagos',
    'serviced apartments Lekki',
    'boutique hotel Lagos Nigeria',
    'hotel Ikate Elegushi',
    'short let apartment Lekki',
    '24/7 Luxury Hotel',
    'hotel near Elegushi Beach',
    'Kusenla Road hotel',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: '24/7 Luxury Hotel & Apartment',
    title: '24/7 Luxury Hotel & Apartment | Lekki, Lagos',
    description: 'Premium boutique hotel and serviced apartments in the heart of Lekki. Rooms from ₦50,000/night. Pool, spa, restaurant, 24/7 power.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: '24/7 Luxury Hotel & Apartment Lekki Lagos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '24/7 Luxury Hotel & Apartment | Lekki, Lagos',
    description: 'Premium boutique hotel and serviced apartments in the heart of Lekki.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Hotel',
            name: '24/7 Luxury Hotel & Apartment',
            description: 'Premium boutique hotel and serviced apartments in Lekki, Lagos Nigeria.',
            url: siteUrl, telephone: '+2349060000578',
            address: { '@type': 'PostalAddress', streetAddress: '39 Kusenla Road, Ikate Elegushi', addressLocality: 'Lekki', addressRegion: 'Lagos', addressCountry: 'NG' },
            geo: { '@type': 'GeoCoordinates', latitude: 6.4311, longitude: 3.4732 },
            starRating: { '@type': 'Rating', ratingValue: '4' },
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Spa', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Fitness Centre', value: true },
              { '@type': 'LocationFeatureSpecification', name: '24-Hour Front Desk', value: true },
            ],
            checkinTime: '14:00', checkoutTime: '12:00', priceRange: '₦50,000 - ₦175,000',
          })
        }} />
      </head>
      <body className="bg-hotel-950 text-hotel-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
