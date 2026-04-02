import { NextRequest, NextResponse } from "next/server";
import { createSkillLead, requestOtp } from "@/lib/pocketbase";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, skillType, sourceInput, userPrompt } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!sourceInput && skillType !== "file") {
      return NextResponse.json({ error: "Source input is required." }, { status: 400 });
    }

    // Generate skill identity
    const skillId = crypto.randomUUID();
    const skillName = slugify(sourceInput ?? `skill-${Date.now()}`);
    const downloadUrl = `/my-skills`;

    // Save to PocketBase
    const pbRes = await createSkillLead({
      email,
      skill_type: skillType ?? "url",
      source_input: sourceInput ?? "",
      user_prompt: userPrompt ?? "",
      skill_id: skillId,
      skill_name: skillName,
      status: "pending",
    });

    if (!pbRes.ok) {
      const pbErr = await pbRes.text();
      console.error("PocketBase error:", pbErr);
      // Don't fail the user — still send OTP
    }

    // Request OTP (PocketBase creates user if not exists via OTP flow)
    const otpRes = await requestOtp(email);
    if (!otpRes.ok) {
      const otpErr = await otpRes.text();
      console.error("OTP request error:", otpErr);
      return NextResponse.json(
        { error: "Could not send login code. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, skillId, skillName, downloadUrl });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
