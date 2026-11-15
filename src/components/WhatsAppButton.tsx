"use client";

import { MessageCircle } from "lucide-react";
import { HOTEL_INFO } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={HOTEL_INFO.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-8 md:right-6 z-40 group"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative flex items-center">
        {/* Tooltip - desktop only */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-1.5 bg-hotel-800 text-hotel-100 text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Chat with us
        </span>
        {/* Button */}
        <div className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      </div>
    </a>
  );
}
