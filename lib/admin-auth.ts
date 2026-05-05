import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "aizhu_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getAdminEnv() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!username || !password || !secret) {
    throw new Error(
      "Missing ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_SESSION_SECRET.",
    );
  }

  return { username, password, secret };
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function hasAdminAuthEnv() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET,
  );
}

export async function createAdminSession(username: string) {
  const { secret } = getAdminEnv();
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const payload = `${username}:${expiresAt}`;
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

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function verifyAdminCredentials(formUsername: string, formPassword: string) {
  const { username, password } = getAdminEnv();
  return formUsername === username && formPassword === password;
}

export async function isAdminAuthenticated() {
  if (!hasAdminAuthEnv()) {
    return false;
  }

  const { username, secret } = getAdminEnv();
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return false;
  }

  const [sessionUsername, expiresAt, signature] = cookieValue.split(":");

  if (!sessionUsername || !expiresAt || !signature) {
    return false;
  }

  if (sessionUsername !== username || Number(expiresAt) < Date.now()) {
    return false;
  }

  const expected = signValue(`${sessionUsername}:${expiresAt}`, secret);

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
