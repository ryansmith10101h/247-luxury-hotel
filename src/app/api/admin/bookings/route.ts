import { NextResponse } from "next/server";
import { getBookings, updateBookingStatus } from "@/lib/supabase";
import type { BookingRequest } from "@/lib/types";

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Admin bookings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body as { id: string; status: BookingRequest["status"] };

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status." }, { status: 400 });
    }

    const valid: BookingRequest["status"][] = ["pending", "confirmed", "cancelled", "checked_in", "completed"];
    if (!valid.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const success = await updateBookingStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking status updated." });
  } catch (error) {
    console.error("Admin bookings PUT error:", error);
    return NextResponse.json({ error: "Failed to update booking." }, { status: 500 });
  }
}
