import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Eye, ArrowRight } from "lucide-react";
import { cn, formatNaira } from "@/lib/utils";
import type { Room } from "@/lib/types";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const href = room.type === "apartment"
    ? `/apartments/${room.slug}`
    : `/rooms/${room.slug}`;

  return (
    <Link
      href={href}
      className="group block bg-hotel-900 rounded-lg overflow-hidden border border-hotel-800/50 hover:border-gold-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hotel-950/60 to-transparent" />
        {room.type === "apartment" && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500/90 text-hotel-950 text-xs font-semibold rounded uppercase tracking-wide">
            Apartment
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-serif font-semibold text-hotel-50 group-hover:text-gold-400 transition-colors">
          {room.name}
        </h3>
        <p className="mt-2 text-sm text-hotel-400 line-clamp-2 leading-relaxed">
          {room.shortDescription}
        </p>

        {/* Info Icons */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-hotel-500">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold-500/60" />
            {room.capacity.adults} Adults{room.capacity.children > 0 && `, ${room.capacity.children} Child`}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5 text-gold-500/60" />
            {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gold-500/60" />
            {room.view}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-gold-400">
              {formatNaira(room.pricePerNight)}
            </span>
            <span className="text-xs text-hotel-500 ml-1">/ night</span>
          </div>
          <span className={cn(
            "flex items-center gap-1 text-sm font-medium text-gold-500",
            "group-hover:gap-2 transition-all duration-300"
          )}>
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
