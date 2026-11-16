import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://247luxuryhotel.com';

export const viewport: Viewport = {
  themeColor: '#090D10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

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
    'hotel with 24 hours electricity Lagos',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
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
    description: 'Premium boutique hotel and serviced apartments in the heart of Lekki. Pool, spa, restaurant, 24/7 power.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Hotel',
        '@id': `${siteUrl}/#hotel`,
        name: '24/7 Luxury Hotel & Apartment',
        legalName: '24|7 Luxury Hotel & Apartment Lekki',
        url: siteUrl,
        telephone: '+2349060000578',
        email: 'reservations@247luxuryhotel.com',
        priceRange: '₦50,000 - ₦150,000',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '39 Kusenla Road, Ikate Elegushi',
          addressLocality: 'Lekki Peninsula II',
          addressRegion: 'Lagos State',
          postalCode: '105102',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 6.4311,
          longitude: 3.4732,
        },
        hasMap: 'https://maps.google.com/?q=39+Kusenla+Road+Ikate+Elegushi+Lekki+Lagos',
        checkinTime: '14:00',
        checkoutTime: '12:00',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: '24/7 Uninterrupted Electricity', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'High-Speed Fibre Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Outdoor Swimming Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Wellness Spa & Sauna', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24-Hour Bistro & Bar', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Fitness Centre', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24-Hour Front Desk', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Secure Valet Parking', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Airport Transfer Service', value: true },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+2349060000578',
          contactType: 'reservations',
          availableLanguage: ['English'],
          areaServed: 'NG',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: '24/7 Luxury Hotel & Apartment',
        description: 'Boutique hotel rooms and luxury serviced apartments in Lekki, Lagos.',
        publisher: { '@id': `${siteUrl}/#hotel` },
      },
    ],
  };

  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-hotel-950 text-hotel-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
