import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <div className="relative h-[45vh] min-h-[320px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-hotel-950 via-hotel-950/60 to-hotel-950/30" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-hotel-50 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-hotel-300 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
