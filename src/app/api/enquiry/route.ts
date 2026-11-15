import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, service_interest, message } = body;

    // Map form field names
    const guest_name = name || body.guest_name;
    const guest_email = email || body.guest_email;
    const guest_phone = phone || body.guest_phone;

    // Validate required fields
    if (!guest_name || !guest_email || !guest_phone || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (name, email, phone, message)." },
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

    // Create enquiry
    await createEnquiry({
      guest_name: guest_name.trim(),
      guest_email: guest_email.trim().toLowerCase(),
      guest_phone: guest_phone.trim(),
      subject: (subject || "General Enquiry").trim(),
      message: message.trim(),
      service_interest: service_interest || undefined,
    });

    return NextResponse.json({
      message: "Your enquiry has been submitted successfully. We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try WhatsApp or call us directly." },
      { status: 500 }
    );
  }
}
