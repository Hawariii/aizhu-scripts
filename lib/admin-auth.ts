import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

const ADMIN_COOKIE_NAME = "aizhu_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

type AdminUserRow = {
  role: string;
  username: string;
};

type ParsedAdminSession = AdminUserRow & {
  expiresAt: number;
};

function getAdminSessionEnv() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET.");
  }

  return { secret };
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function verifyPasswordHash(password: string, encodedHash: string) {
  const [algorithm, salt, storedHash] = encodedHash.split(":");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const derivedHash = scryptSync(password, salt, 64).toString("hex");

  return timingSafeEqual(Buffer.from(derivedHash), Buffer.from(storedHash));
}

async function getAdminUserByUsername(username: string) {
  if (!hasSupabaseAdminEnv()) {
    return null;
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("username,password_hash,role")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as
    | {
        password_hash: string;
        role: string;
        username: string;
      }
    | null;
}

export function hasAdminSessionEnv() {
  return Boolean(process.env.ADMIN_SESSION_SECRET);
}

export async function createAdminSession(user: AdminUserRow) {
  const { secret } = getAdminSessionEnv();
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const payload = `${user.username}:${user.role}:${expiresAt}`;
  const signature = signValue(payload, secret);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, `${payload}:${signature}`, {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function parseAdminSession(cookieValue: string, secret: string) {
  const [sessionUsername, role, expiresAt, signature] = cookieValue.split(":");

  if (!sessionUsername || !role || !expiresAt || !signature) {
    return null;
  }

  if (Number(expiresAt) < Date.now()) {
    return null;
  }

  const expected = signValue(`${sessionUsername}:${role}:${expiresAt}`, secret);
  const isValid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!isValid) {
    return null;
  }

  return {
    username: sessionUsername,
    role,
    expiresAt: Number(expiresAt),
  } satisfies ParsedAdminSession;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function verifyAdminCredentials(
  formUsername: string,
  formPassword: string,
) {
  const adminUser = await getAdminUserByUsername(formUsername);

  if (!adminUser) {
    return null;
  }

  const isValid = verifyPasswordHash(formPassword, adminUser.password_hash);

  if (!isValid) {
    return null;
  }

  return {
    role: adminUser.role,
    username: adminUser.username,
  } satisfies AdminUserRow;
}

export async function isAdminAuthenticated() {
  if (!hasAdminSessionEnv()) {
    return false;
  }

  const { secret } = getAdminSessionEnv();
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return false;
  }

  return Boolean(parseAdminSession(cookieValue, secret));
}

export async function requireAdmin() {
  if (!hasAdminSessionEnv()) {
    redirect("/admin/login");
  }

  const { secret } = getAdminSessionEnv();
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!cookieValue) {
    redirect("/admin/login");
  }

  const session = parseAdminSession(cookieValue, secret);

  if (!session) {
    redirect("/admin/login");
  }
}
