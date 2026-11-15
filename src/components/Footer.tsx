import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { HOTEL_INFO } from "@/lib/data";

const quickLinks = [
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "Serviced Apartments", href: "/apartments" },
  { name: "Amenities", href: "/amenities" },
  { name: "Restaurant & Bar", href: "/restaurant" },
  { name: "Spa & Wellness", href: "/spa" },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-hotel-900 border-t border-hotel-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-hotel-50">
                24<span className="text-gold-500">|</span>7
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-gold-500/80 -mt-1">
                Luxury Hotel
              </span>
            </Link>
            <p className="text-sm text-hotel-400 leading-relaxed mb-6">
              Experience refined hospitality in the heart of Lekki. Premium boutique hotel rooms, serviced apartments, and 24/7 uninterrupted power & security.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={HOTEL_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-hotel-800 text-hotel-400 hover:bg-gold-500/20 hover:text-gold-400 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={HOTEL_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-hotel-800 text-hotel-400 hover:bg-gold-500/20 hover:text-gold-400 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={HOTEL_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-hotel-800 text-hotel-400 hover:bg-gold-500/20 hover:text-gold-400 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-500 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-hotel-400 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-500 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={HOTEL_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-hotel-400 hover:text-gold-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60" />
                  <span>{HOTEL_INFO.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${HOTEL_INFO.contact.phonePrimaryRaw}`}
                  className="flex items-center gap-3 text-sm text-hotel-400 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-gold-500/60" />
                  <span>{HOTEL_INFO.contact.phonePrimary}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${HOTEL_INFO.contact.phoneSecondaryRaw}`}
                  className="flex items-center gap-3 text-sm text-hotel-400 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-gold-500/60" />
                  <span>{HOTEL_INFO.contact.phoneSecondary}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOTEL_INFO.contact.emailReservations}`}
                  className="flex items-center gap-3 text-sm text-hotel-400 hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-gold-500/60" />
                  <span>{HOTEL_INFO.contact.emailReservations}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-500 mb-6">
              Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60" />
                <div>
                  <p className="text-sm font-medium text-hotel-200">Front Desk</p>
                  <p className="text-sm text-hotel-400">{HOTEL_INFO.hours.frontDesk}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60" />
                <div>
                  <p className="text-sm font-medium text-hotel-200">Check-in</p>
                  <p className="text-sm text-hotel-400">{HOTEL_INFO.hours.checkIn}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60" />
                <div>
                  <p className="text-sm font-medium text-hotel-200">Check-out</p>
                  <p className="text-sm text-hotel-400">{HOTEL_INFO.hours.checkOut}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/60" />
                <div>
                  <p className="text-sm font-medium text-hotel-200">Pool</p>
                  <p className="text-sm text-hotel-400">{HOTEL_INFO.hours.pool}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-hotel-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-hotel-500">
            © {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-hotel-500 hover:text-gold-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-xs text-hotel-500 hover:text-gold-400 transition-colors">
              Contact
            </Link>
            <Link href="/rooms" className="text-xs text-hotel-500 hover:text-gold-400 transition-colors">
              Reservations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
