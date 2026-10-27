import { eq } from 'drizzle-orm';
import { db, schema } from './db';
import { runMigrations } from './migrate';
import { hashPassword } from './password';
import { INSTRUMENTS } from './content';

/**
 * Applies pending migrations, creates the admin account from ADMIN_* env vars if it
 * doesn't exist yet, and seeds the instrument list. Safe to run on every start.
 */
export async function bootstrap() {
  await runMigrations();

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await db.query.users.findFirst({ where: eq(schema.users.email, email) });
    if (!existing) {
      await db.insert(schema.users).values({
        email,
        name: process.env.ADMIN_NAME?.trim() || 'CORE EV Admin',
        institution: 'CORE EV — Ghent University',
        role: 'admin',
        status: 'active',
        passwordHash: await hashPassword(password),
        activatedAt: new Date(),
      });
      console.log(`[bootstrap] Created admin account ${email}`);
    }
  } else {
    console.warn('[bootstrap] ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin account created.');
  }

  await db
    .insert(schema.instruments)
    .values(INSTRUMENTS.map((name, position) => ({ name, position })))
    .onConflictDoNothing();
}
