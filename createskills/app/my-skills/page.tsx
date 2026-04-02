import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MySkillsClient } from "./client";
import { getUserSkills } from "@/lib/pocketbase";
import { COOKIE_NAME } from "@/lib/auth";

async function getAuthData() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return { token, userId: payload.id as string, email: payload.email as string };
  } catch {
    return null;
  }
}

export default async function MySkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ first?: string }>;
}) {
  const auth = await getAuthData();
  if (!auth) redirect("/login");

  const skills = await getUserSkills(auth.userId, auth.token);
  const params = await searchParams;
  const isFirstLogin = params.first === "true";

  return <MySkillsClient skills={skills} isFirstLogin={isFirstLogin} userEmail={auth.email} />;
}
