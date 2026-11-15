import { NextResponse } from "next/server";
import { getEnquiries } from "@/lib/supabase";

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("Admin enquiries GET error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries." }, { status: 500 });
  }
}
