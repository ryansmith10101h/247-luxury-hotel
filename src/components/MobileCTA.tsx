"use client";

import Link from "next/link";
import { Phone, MessageCircle, MapPin, CalendarCheck } from "lucide-react";
import { HOTEL_INFO } from "@/lib/data";

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-hotel-900/95 backdrop-blur-xl border-t border-hotel-800/60">
      <div className="grid grid-cols-4">
        <a
          href={`tel:${HOTEL_INFO.contact.phonePrimaryRaw}`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-hotel-300 hover:text-gold-400 active:bg-hotel-800/50 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a
          href={HOTEL_INFO.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-hotel-300 hover:text-green-400 active:bg-hotel-800/50 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <a
          href={HOTEL_INFO.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-hotel-300 hover:text-gold-400 active:bg-hotel-800/50 transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-medium">Directions</span>
        </a>
        <Link
          href="/rooms"
          className="flex flex-col items-center justify-center gap-1 py-2.5 bg-gold-500 text-hotel-950 active:bg-gold-600 transition-colors"
        >
          <CalendarCheck className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Book</span>
        </Link>
      </div>
    </div>
  );
}
