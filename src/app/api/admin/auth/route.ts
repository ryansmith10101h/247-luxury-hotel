import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    const correctPin = process.env.ADMIN_SECRET_PIN || "2470";

    if (!pin || pin !== correctPin) {
      return NextResponse.json(
        { error: "Invalid PIN." },
        { status: 401 }
      );
    }

    const token = `admin-session-${Date.now()}`;

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 500 }
    );
  }
}
