import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { and, eq, gt, lt } from 'drizzle-orm';
import { db, schema } from './db';
import type { TokenKind, User } from './db/schema';
import { env } from './env';

const SESSION_COOKIE = 'core_ev_session';
const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000;
export const TOKEN_TTL_MS: Record<TokenKind, number> = {
  invite: 7 * 24 * 60 * 60 * 1000,
  reset: 60 * 60 * 1000,
};

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function newToken() {
  return randomBytes(32).toString('base64url');
}

export type SessionUser = Pick<User, 'id' | 'email' | 'name' | 'institution' | 'role'>;

/* ── Sessions ─────────────────────────────────────────────────────────── */

export async function createSession(userId: string) {
  const token = newToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(schema.sessions).values({ id: sha256(token), userId, expiresAt });
  // Opportunistic cleanup of this user's expired sessions.
  await db.delete(schema.sessions).where(and(eq(schema.sessions.userId, userId), lt(schema.sessions.expiresAt, new Date())));
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    // Secure cookies are only sent over HTTPS, so follow the site's public address.
    secure: env.appUrl.startsWith('https://'),
    path: '/',
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await db.delete(schema.sessions).where(eq(schema.sessions.id, sha256(token)));
  jar.delete(SESSION_COOKIE);
}

export async function destroyAllSessions(userId: string) {
  await db.delete(schema.sessions).where(eq(schema.sessions.userId, userId));
}

/** The signed-in user for this request, or null. Cached per request. */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [row] = await db
    .select({
      id: schema.users.id,
      email: schema.users.email,
      name: schema.users.name,
      institution: schema.users.institution,
      role: schema.users.role,
      status: schema.users.status,
    })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
    .where(and(eq(schema.sessions.id, sha256(token)), gt(schema.sessions.expiresAt, new Date())))
    .limit(1);
  if (!row || row.status !== 'active') return null;
  return { id: row.id, email: row.email, name: row.name, institution: row.institution, role: row.role };
});

/** For pages and actions that need a signed-in user. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/portal');
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'admin') redirect('/portal/dashboard');
  return user;
}

/* ── One-time tokens (invite / password reset) ────────────────────────── */

/** Issues a new token of this kind, invalidating any earlier one. Returns the raw token. */
export async function issueToken(userId: string, kind: TokenKind) {
  await db.delete(schema.authTokens).where(and(eq(schema.authTokens.userId, userId), eq(schema.authTokens.kind, kind)));
  const token = newToken();
  await db.insert(schema.authTokens).values({
    userId,
    kind,
    tokenHash: sha256(token),
    expiresAt: new Date(Date.now() + TOKEN_TTL_MS[kind]),
  });
  return token;
}

/** Looks up the user a valid (unexpired) token belongs to, without consuming it. */
export async function findTokenUser(token: string, kind: TokenKind) {
  const [row] = await db
    .select({ user: schema.users })
    .from(schema.authTokens)
    .innerJoin(schema.users, eq(schema.authTokens.userId, schema.users.id))
    .where(and(
      eq(schema.authTokens.tokenHash, sha256(token)),
      eq(schema.authTokens.kind, kind),
      gt(schema.authTokens.expiresAt, new Date()),
    ))
    .limit(1);
  if (!row) return null;
  const expected = kind === 'invite' ? 'pending' : 'active';
  return row.user.status === expected ? row.user : null;
}

export async function consumeToken(token: string) {
  await db.delete(schema.authTokens).where(eq(schema.authTokens.tokenHash, sha256(token)));
}

/* ── Login throttling (per email, in-memory) ──────────────────────────── */

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

export function isLoginThrottled(email: string) {
  const a = attempts.get(email);
  return !!a && a.resetAt > Date.now() && a.count >= MAX_ATTEMPTS;
}

export function recordLoginFailure(email: string) {
  const now = Date.now();
  const a = attempts.get(email);
  if (!a || a.resetAt < now) attempts.set(email, { count: 1, resetAt: now + WINDOW_MS });
  else a.count += 1;
}

export function clearLoginFailures(email: string) {
  attempts.delete(email);
}
