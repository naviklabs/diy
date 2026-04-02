import { cookies } from "next/headers";

export const COOKIE_NAME = "pb_auth";

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function getAuthUserId(): Promise<string | null> {
  const token = await getAuthToken();
  if (!token) return null;
  try {
    // PocketBase JWTs are base64url encoded — decode the payload
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8")
    );
    return payload.id ?? null;
  } catch {
    return null;
  }
}
