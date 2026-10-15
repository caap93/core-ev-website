'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import {
  clearLoginFailures, consumeToken, createSession, destroyAllSessions, destroySession,
  findTokenUser, isLoginThrottled, issueToken, recordLoginFailure,
} from '@/lib/auth';
import { db, schema } from '@/lib/db';
import { env } from '@/lib/env';
import { resetMail, sendMail } from '@/lib/mail';
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from '@/lib/password';

export type AuthState = { error?: string; ok?: boolean; email?: string };

function normEmail(v: FormDataEntryValue | null) {
  return String(v ?? '').trim().toLowerCase();
}

// A constant hash so unknown emails take as long to reject as wrong passwords.
const DUMMY_HASH = '$2b$12$PUvjTNNPf1PJMUrWRSTGMuY99.msSOkTmbWU3jglYO6jJkoYgPVZu';

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = normEmail(formData.get('email'));
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: 'Please enter your email and password.', email };
  if (isLoginThrottled(email)) return { error: 'Too many sign-in attempts. Please wait 15 minutes and try again.', email };

  const user = await db.query.users.findFirst({ where: eq(schema.users.email, email) });
  if (user?.status === 'pending') {
    return { error: 'This account is pending activation. Check your email for a link to set your password.', email };
  }
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) {
    recordLoginFailure(email);
    return { error: 'Incorrect email or password.', email };
  }
  clearLoginFailures(email);
  await createSession(user.id);
  redirect(user.role === 'admin' ? '/portal/admin' : '/portal/dashboard');
}

export async function logout() {
  await destroySession();
  redirect('/portal');
}

/** Always reports success so the form can't be used to discover which emails have accounts. */
export async function requestPasswordReset(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = normEmail(formData.get('email'));
  if (!email) return { error: 'Please enter your email address.' };
  const user = await db.query.users.findFirst({ where: eq(schema.users.email, email) });
  if (user && user.status === 'active') {
    const token = await issueToken(user.id, 'reset');
    await sendMail(resetMail(user, `${env.appUrl}/portal/reset/${token}`));
  }
  return { ok: true, email };
}

function checkNewPassword(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');
  if (password.length < MIN_PASSWORD_LENGTH) return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  if (password !== confirm) return { error: 'Passwords do not match.' };
  return { password };
}

export async function activateAccount(token: string, _prev: AuthState, formData: FormData): Promise<AuthState> {
  const check = checkNewPassword(formData);
  if ('error' in check) return check;
  const user = await findTokenUser(token, 'invite');
  if (!user) return { error: 'This invite link is invalid or expired. Ask the facility to send a new invitation.' };

  await db.update(schema.users)
    .set({ passwordHash: await hashPassword(check.password), status: 'active', activatedAt: new Date() })
    .where(eq(schema.users.id, user.id));
  await consumeToken(token);
  await createSession(user.id);
  redirect(user.role === 'admin' ? '/portal/admin' : '/portal/dashboard');
}

export async function resetPassword(token: string, _prev: AuthState, formData: FormData): Promise<AuthState> {
  const check = checkNewPassword(formData);
  if ('error' in check) return check;
  const user = await findTokenUser(token, 'reset');
  if (!user) return { error: 'This reset link is invalid or expired. Request a new one from the sign-in page.' };

  await db.update(schema.users).set({ passwordHash: await hashPassword(check.password) }).where(eq(schema.users.id, user.id));
  await consumeToken(token);
  // Sign out everywhere else, then sign in here.
  await destroyAllSessions(user.id);
  clearLoginFailures(user.email);
  await createSession(user.id);
  redirect(user.role === 'admin' ? '/portal/admin' : '/portal/dashboard');
}
