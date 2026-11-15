import { NextResponse } from "next/server";
import { INITIAL_ROOMS } from "@/lib/data";
import { createBooking } from "@/lib/supabase";
import { calculateNights, generateConfirmationCode } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      check_in,
      check_out,
      adults,
      children = 0,
      room_slug,
      guest_name,
      guest_email,
      guest_phone,
      special_requests,
    } = body;

    // Validate required fields
    if (!check_in || !check_out || !room_slug || !guest_name || !guest_email || !guest_phone) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guest_email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate dates
    if (new Date(check_out) <= new Date(check_in)) {
      return NextResponse.json(
        { error: "Check-out date must be after check-in date." },
        { status: 400 }
      );
    }

    // Find room
    const room = INITIAL_ROOMS.find((r) => r.slug === room_slug);
    if (!room) {
      return NextResponse.json(
        { error: "Selected room or apartment not found." },
        { status: 400 }
      );
    }

    // Calculate
    const nights = calculateNights(check_in, check_out);
    const estimated_total = room.pricePerNight * nights;
    const confirmation_code = generateConfirmationCode();

    // Create booking
    const booking = await createBooking({
      confirmation_code,
      room_slug,
      room_name: room.name,
      room_type: room.type,
      check_in,
      check_out,
      adults: parseInt(adults) || 1,
      children: parseInt(children) || 0,
      guest_name: guest_name.trim(),
      guest_email: guest_email.trim().toLowerCase(),
      guest_phone: guest_phone.trim(),
      special_requests: special_requests?.trim() || undefined,
      estimated_total,
      nights,
      status: "pending",
    });

    return NextResponse.json({
      message: "Booking request submitted successfully.",
      confirmation_code: booking.confirmation_code,
      booking,
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
