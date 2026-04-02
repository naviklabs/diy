import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and code are required." }, { status: 400 });
    }

    const res = await verifyOtp(email, otp);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please try again." },
        { status: 401 }
      );
    }

    const data = await res.json();
    const token: string = data.token;

    if (!token) {
      return NextResponse.json({ error: "Authentication failed." }, { status: 401 });
    }

    // Set secure httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({
      ok: true,
      userId: data.record?.id,
      redirectTo: "/my-skills?first=true",
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
