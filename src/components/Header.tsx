"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOTEL_INFO } from "@/lib/data";

const navigation = [
  { name: "Rooms", href: "/rooms" },
  { name: "Apartments", href: "/apartments" },
  { name: "Amenities", href: "/amenities" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Spa", href: "/spa" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-hotel-950/90 backdrop-blur-xl border-b border-gold-500/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex flex-col items-start">
              <span className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-hotel-50 group-hover:text-gold-400 transition-colors">
                24<span className="text-gold-500">|</span>7
              </span>
              <span className="text-[10px] lg:text-xs uppercase tracking-[0.3em] text-gold-500/80 -mt-1">
                Luxury Hotel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-hotel-300 hover:text-hotel-50 transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${HOTEL_INFO.contact.phonePrimaryRaw}`}
              className="flex items-center gap-2 text-sm text-hotel-300 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{HOTEL_INFO.contact.phonePrimary}</span>
            </a>
            <Link
              href="/rooms"
              className="px-6 py-2.5 bg-gold-500 text-hotel-950 text-sm font-semibold rounded hover:bg-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
            >
              Book Your Stay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-hotel-200 hover:text-gold-400 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-20 bg-hotel-950/98 backdrop-blur-2xl lg:hidden transition-all duration-500 z-40",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-lg font-medium text-hotel-200 hover:text-gold-400 border-b border-hotel-800/50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/rooms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3.5 bg-gold-500 text-hotel-950 text-center font-semibold rounded hover:bg-gold-400 transition-colors"
            >
              Book Your Stay
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-sm text-hotel-300">
            <a
              href={`tel:${HOTEL_INFO.contact.phonePrimaryRaw}`}
              className="flex items-center gap-3 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-5 h-5 text-gold-500" />
              {HOTEL_INFO.contact.phonePrimary}
            </a>
            <a
              href={HOTEL_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-gold-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              WhatsApp Us
            </a>
            <a
              href={HOTEL_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-gold-400 transition-colors"
            >
              <MapPin className="w-5 h-5 text-gold-500" />
              {HOTEL_INFO.address.street}, {HOTEL_INFO.address.neighborhood}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
