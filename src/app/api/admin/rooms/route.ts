import { NextResponse } from "next/server";
import { getRooms, toggleRoomAvailability } from "@/lib/supabase";

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rooms = await getRooms();
    return NextResponse.json({ rooms });
  } catch (error) {
    console.error("Admin rooms GET error:", error);
    return NextResponse.json({ error: "Failed to fetch rooms." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, isAvailable } = body as { id: string; isAvailable: boolean };

    if (!id || typeof isAvailable !== "boolean") {
      return NextResponse.json({ error: "Missing id or isAvailable." }, { status: 400 });
    }

    const success = await toggleRoomAvailability(id, isAvailable);
    if (!success) {
      return NextResponse.json({ error: "Room not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Room availability updated." });
  } catch (error) {
    console.error("Admin rooms PUT error:", error);
    return NextResponse.json({ error: "Failed to update room." }, { status: 500 });
  }
}
