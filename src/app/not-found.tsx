import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="text-8xl sm:text-9xl font-serif font-bold text-gold-500/30">
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-hotel-50">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-hotel-400 max-w-md">
          The page you are looking for might have been moved or doesn't exist.
          Let us help you find your way back.
        </p>
        <Link
          href="/"
          className="mt-8 px-8 py-3 bg-gold-500 text-hotel-950 font-semibold rounded hover:bg-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
        >
          Return Home
        </Link>
      </div>
    </PageLayout>
  );
}
