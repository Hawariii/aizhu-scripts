import { headers } from "next/headers";

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

type AttemptRecord = {
  count: number;
  expiresAt: number;
  lockedUntil: number | null;
};

type LoginRateLimitStore = Map<string, AttemptRecord>;

function getAttemptStore() {
  const globalState = globalThis as typeof globalThis & {
    __aizhuAdminLoginAttemptStore?: LoginRateLimitStore;
  };

  if (!globalState.__aizhuAdminLoginAttemptStore) {
    globalState.__aizhuAdminLoginAttemptStore = new Map();
  }

  return globalState.__aizhuAdminLoginAttemptStore;
}

function normalizeIpAddress(value: string | null) {
  if (!value) {
    return "unknown";
  }

  const first = value.split(",")[0]?.trim();
  return first || "unknown";
}

async function getRequestIpAddress() {
  const requestHeaders = await headers();

  return normalizeIpAddress(
    requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("x-real-ip") ||
      requestHeaders.get("cf-connecting-ip"),
  );
}

async function getLoginKey(username: string) {
  const ipAddress = await getRequestIpAddress();
  return `${username.trim().toLowerCase()}::${ipAddress}`;
}

function getValidRecord(store: LoginRateLimitStore, key: string) {
  const record = store.get(key);

  if (!record) {
    return null;
  }

  if (record.lockedUntil && record.lockedUntil > Date.now()) {
    return record;
  }

  if (record.expiresAt <= Date.now() || (record.lockedUntil ?? 0) <= Date.now()) {
    store.delete(key);
    return null;
  }

  return record;
}

export async function getLoginRateLimitState(username: string) {
  const key = await getLoginKey(username);
  const store = getAttemptStore();
  const record = getValidRecord(store, key);

  if (!record?.lockedUntil || record.lockedUntil <= Date.now()) {
    return { locked: false, retryAfterSeconds: 0 };
  }

  return {
    locked: true,
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((record.lockedUntil - Date.now()) / 1000),
    ),
  };
}

export async function recordFailedLoginAttempt(username: string) {
  const key = await getLoginKey(username);
  const store = getAttemptStore();
  const record = getValidRecord(store, key);
  const nextCount = (record?.count ?? 0) + 1;
  const lockedUntil =
    nextCount >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_MS : null;

  store.set(key, {
    count: nextCount,
    expiresAt: Date.now() + ATTEMPT_WINDOW_MS,
    lockedUntil,
  });
}

export async function clearFailedLoginAttempts(username: string) {
  const key = await getLoginKey(username);
  getAttemptStore().delete(key);
}
