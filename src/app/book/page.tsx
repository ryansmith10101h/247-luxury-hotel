"use client";

import { useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { INITIAL_ROOMS, HOTEL_INFO } from "@/lib/data";
import {
  formatNaira,
  calculateNights,
  getWhatsAppBookingLink,
} from "@/lib/utils";

interface BookingForm {
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  roomSlug: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function BookPage() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  // Check for pre-selected room from URL
  const [form, setForm] = useState<BookingForm>(() => {
    let roomSlug = "";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      roomSlug = params.get("room") || "";
    }
    return {
      checkIn: today,
      checkOut: tomorrow,
      adults: "2",
      children: "0",
      roomSlug,
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    };
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedRoom = useMemo(
    () => INITIAL_ROOMS.find((r) => r.slug === form.roomSlug),
    [form.roomSlug]
  );

  const nights = useMemo(
    () => calculateNights(form.checkIn, form.checkOut),
    [form.checkIn, form.checkOut]
  );

  const estimatedTotal = useMemo(
    () => (selectedRoom ? selectedRoom.pricePerNight * nights : 0),
    [selectedRoom, nights]
  );

  const minCheckOut = useMemo(() => {
    if (!form.checkIn) return tomorrow;
    const d = new Date(form.checkIn);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, [form.checkIn, tomorrow]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (
      !form.checkIn ||
      !form.checkOut ||
      !form.roomSlug ||
      !form.name ||
      !form.email ||
      !form.phone
    ) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          check_in: form.checkIn,
          check_out: form.checkOut,
          adults: parseInt(form.adults),
          children: parseInt(form.children),
          room_slug: form.roomSlug,
          guest_name: form.name,
          guest_email: form.email,
          guest_phone: form.phone,
          special_requests: form.specialRequests,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setConfirmationCode(data.confirmation_code || "");
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network error. Please try WhatsApp or call us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <PageLayout>
      <PageHero
        title="Book Your Stay"
        subtitle="Reserve your room or apartment at 24/7 Luxury Hotel, Lekki."
        image="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1920&q=80"
      />

      <Section>
        {status === "success" ? (
          /* ── Success State ── */
          <div className="max-w-xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-white mb-2">
              Booking Request Submitted!
            </h2>
            <p className="text-hotel-400 mb-4">
              Your booking request has been received. Our reservations team will
              confirm availability and contact you shortly.
            </p>

            {confirmationCode && (
              <div className="bg-hotel-900 border border-gold-500/30 p-6 mb-6">
                <span className="text-sm text-hotel-500">
                  Your Reference Code
                </span>
                <p className="text-3xl font-mono font-bold text-gold-400 mt-1">
                  {confirmationCode}
                </p>
              </div>
            )}

            {selectedRoom && (
              <div className="bg-hotel-900/60 border border-white/5 p-5 mb-6 text-left space-y-2 text-sm">
                <div className="flex justify-between text-hotel-300">
                  <span>Room/Apartment</span>
                  <span className="text-white font-medium">
                    {selectedRoom.name}
                  </span>
                </div>
                <div className="flex justify-between text-hotel-300">
                  <span>Check-in</span>
                  <span className="text-white">{form.checkIn}</span>
                </div>
                <div className="flex justify-between text-hotel-300">
                  <span>Check-out</span>
                  <span className="text-white">{form.checkOut}</span>
                </div>
                <div className="flex justify-between text-hotel-300">
                  <span>
                    {nights} Night{nights > 1 ? "s" : ""}
                  </span>
                  <span className="text-gold-400 font-semibold">
                    {formatNaira(estimatedTotal)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsAppBookingLink({
                  roomName: selectedRoom?.name || "",
                  checkIn: form.checkIn,
                  checkOut: form.checkOut,
                  guests: `${form.adults} Adults, ${form.children} Children`,
                  name: form.name,
                  code: confirmationCode,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-green-700/50 text-green-400 hover:bg-green-900/20 font-medium px-6 py-3 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Confirm via WhatsApp
              </a>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-hotel-950 font-semibold px-6 py-3 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          /* ── Booking Form ── */
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dates & Guests */}
              <div className="bg-hotel-900/60 border border-white/5 p-6 sm:p-8">
                <h3 className="text-lg font-serif text-white mb-5 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  Stay Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="checkIn"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Check-in Date *
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      min={today}
                      value={form.checkIn}
                      onChange={(e) => update("checkIn", e.target.value)}
                      required
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkOut"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Check-out Date *
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      min={minCheckOut}
                      value={form.checkOut}
                      onChange={(e) => update("checkOut", e.target.value)}
                      required
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="adults"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Adults *
                    </label>
                    <select
                      id="adults"
                      value={form.adults}
                      onChange={(e) => update("adults", e.target.value)}
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="children"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Children
                    </label>
                    <select
                      id="children"
                      value={form.children}
                      onChange={(e) => update("children", e.target.value)}
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n}>
                          {n} Child{n !== 1 ? "ren" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Room Selection */}
              <div className="bg-hotel-900/60 border border-white/5 p-6 sm:p-8">
                <h3 className="text-lg font-serif text-white mb-5 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gold-500" />
                  Select Room / Apartment
                </h3>
                <select
                  value={form.roomSlug}
                  onChange={(e) => update("roomSlug", e.target.value)}
                  required
                  className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors mb-4"
                >
                  <option value="">-- Select a room or apartment --</option>
                  <optgroup label="Hotel Suites">
                    {INITIAL_ROOMS.filter((r) => r.type === "hotel").map(
                      (r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.name} — {formatNaira(r.pricePerNight)}/night
                        </option>
                      )
                    )}
                  </optgroup>
                  <optgroup label="Serviced Apartments">
                    {INITIAL_ROOMS.filter((r) => r.type === "apartment").map(
                      (r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.name} — {formatNaira(r.pricePerNight)}/night
                        </option>
                      )
                    )}
                  </optgroup>
                </select>

                {/* Price Summary */}
                {selectedRoom && nights > 0 && (
                  <div className="bg-hotel-800/50 border border-white/5 p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-hotel-400">
                      <span>{selectedRoom.name}</span>
                      <span>{formatNaira(selectedRoom.pricePerNight)}/night</span>
                    </div>
                    <div className="flex justify-between text-hotel-400">
                      <span>
                        {nights} Night{nights > 1 ? "s" : ""}
                      </span>
                      <span>
                        {nights} × {formatNaira(selectedRoom.pricePerNight)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/5">
                      <span>Estimated Total</span>
                      <span className="text-gold-400">
                        {formatNaira(estimatedTotal)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Guest Information */}
              <div className="bg-hotel-900/60 border border-white/5 p-6 sm:p-8">
                <h3 className="text-lg font-serif text-white mb-5">
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-hotel-300 mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                      className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                      placeholder="0801 234 5678"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm text-hotel-300 mb-1.5"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    value={form.specialRequests}
                    onChange={(e) => update("specialRequests", e.target.value)}
                    rows={3}
                    className="w-full bg-hotel-800 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors resize-none"
                    placeholder="Airport pickup, early check-in, extra bed, dietary needs..."
                  />
                </div>
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="flex items-start gap-3 bg-red-950/30 border border-red-800/30 p-4 text-sm text-red-300">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p>{errorMsg}</p>
                    <a
                      href={HOTEL_INFO.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 mt-2 inline-flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Book via WhatsApp instead
                    </a>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-hotel-950 font-bold py-4 text-lg transition-colors flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Booking Request"
                )}
              </button>

              <p className="text-xs text-hotel-600 text-center">
                This submits a booking request. Our team will confirm
                availability and contact you with payment details. For instant
                confirmation, please{" "}
                <a
                  href={HOTEL_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400"
                >
                  WhatsApp us
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${HOTEL_INFO.contact.phonePrimaryRaw}`}
                  className="text-gold-500 hover:text-gold-400"
                >
                  {HOTEL_INFO.contact.phonePrimary}
                </a>
                .
              </p>
            </form>
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
