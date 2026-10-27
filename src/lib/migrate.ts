import path from 'node:path';
import { sql } from 'drizzle-orm';
import { readMigrationFiles } from 'drizzle-orm/migrator';
import { db } from './db';

/**
 * Applies pending SQL migrations from ./drizzle.
 *
 * Drizzle's built-in migrator keeps its bookkeeping in a separate "drizzle" schema and
 * runs CREATE SCHEMA, which hosting panels such as Plesk often don't allow. This keeps the
 * same bookkeeping (same hashes and timestamps) in an ordinary table instead.
 */
export async function runMigrations() {
  const migrations = readMigrationFiles({ migrationsFolder: path.join(process.cwd(), 'drizzle') });

  await db.execute(sql`CREATE TABLE IF NOT EXISTS "__core_ev_migrations" (
    id serial PRIMARY KEY, hash text NOT NULL, created_at bigint NOT NULL)`);

  // Installs made before this migrator recorded their migrations in drizzle.__drizzle_migrations.
  const { rows: legacy } = await db.execute<{ exists: boolean }>(
    sql`select to_regclass('drizzle.__drizzle_migrations') is not null as exists`);
  if (legacy[0]?.exists) {
    await db.execute(sql`INSERT INTO "__core_ev_migrations" (hash, created_at)
      SELECT hash, created_at FROM drizzle.__drizzle_migrations
      WHERE NOT EXISTS (SELECT 1 FROM "__core_ev_migrations")`);
  }

  const { rows } = await db.execute<{ created_at: string }>(
    sql`select created_at from "__core_ev_migrations" order by created_at desc limit 1`);
  const last = rows[0] ? Number(rows[0].created_at) : 0;

  const pending = migrations.filter((m) => m.folderMillis > last);
  if (pending.length === 0) return;
  await db.transaction(async (tx) => {
    for (const m of pending) {
      for (const statement of m.sql) {
        if (statement.trim()) await tx.execute(sql.raw(statement));
      }
      await tx.execute(sql`INSERT INTO "__core_ev_migrations" (hash, created_at) VALUES (${m.hash}, ${m.folderMillis})`);
    }
  });
  console.log(`[bootstrap] Applied ${pending.length} database migration(s).`);
}
