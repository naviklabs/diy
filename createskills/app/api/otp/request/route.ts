import { NextRequest, NextResponse } from "next/server";
import { requestOtp } from "@/lib/pocketbase";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const res = await requestOtp(email);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not send login code. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("OTP request error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
