const PB = "https://pb.naviklabs.com";

export interface SkillLead {
  email: string;
  skill_type: string;
  source_input: string;
  user_prompt?: string;
  skill_id: string;
  skill_name: string;
  user_id?: string;
  status: string;
}

async function pbPost(path: string, body: unknown, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = token;

  const res = await fetch(`${PB}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return res;
}

async function pbGet(path: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = token;
  const res = await fetch(`${PB}${path}`, { headers, cache: "no-store" });
  return res;
}

export async function requestOtp(email: string) {
  return pbPost("/api/collections/users/auth-with-otp/request", { email });
}

export async function verifyOtp(email: string, otp: string) {
  return pbPost("/api/collections/users/auth-with-otp/confirm", {
    email,
    otp,
  });
}

export async function createSkillLead(data: SkillLead) {
  return pbPost("/api/collections/skill_leads/records", data);
}

export async function getUserSkills(userId: string, token: string) {
  const res = await pbGet(
    `/api/collections/skill_leads/records?filter=(user_id='${userId}')&sort=-created`,
    token
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.items ?? [];
}
