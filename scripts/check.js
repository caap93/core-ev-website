// Setup check for the server: `npm run check` (works from Plesk's "Run Node.js commands").
// Prints what is wrong in plain language. Never prints passwords.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
process.chdir(root);
try { require('@next/env').loadEnvConfig(root); } catch {}

let problems = 0;
const ok = (msg) => console.log(`  OK    ${msg}`);
const bad = (msg, fix) => { problems++; console.log(`  ERROR ${msg}`); if (fix) console.log(`        → ${fix}`); };

async function main() {
  console.log('\nCORE EV setup check\n');

  const major = Number(process.versions.node.split('.')[0]);
  if (major >= 20) ok(`Node.js ${process.versions.node}`);
  else bad(`Node.js ${process.versions.node} is too old`, 'Choose Node.js 24 in Plesk.');

  if (fs.existsSync(path.join(root, '.next', 'BUILD_ID'))) ok('Website has been built');
  else bad('Website has not been built yet', 'Run the script "build", then Restart App.');

  for (const name of ['APP_URL', 'DATABASE_URL']) {
    if (process.env[name]) ok(`Setting ${name} is present`);
    else bad(`Setting ${name} is missing`, 'Add it under "Custom environment variables" on the Node.js page.');
  }
  if (process.env.APP_URL && !/^https?:\/\//.test(process.env.APP_URL)) bad('APP_URL must start with http:// or https://');

  const url = process.env.DATABASE_URL;
  if (url) {
    let parsed;
    try { parsed = new URL(url); } catch { parsed = null; }
    if (!parsed || !parsed.protocol.startsWith('postgres')) {
      bad('DATABASE_URL is not a valid address', 'Format: postgres://USER:PASSWORD@localhost:5432/DATABASE. A password with @ : / # ? % characters breaks it; use letters and numbers only.');
    } else {
      const { Client } = require('pg');
      const client = new Client({ connectionString: url, connectionTimeoutMillis: 8000 });
      try {
        await client.connect();
        ok(`Connected to database "${decodeURIComponent(parsed.pathname.slice(1))}" as "${decodeURIComponent(parsed.username)}"`);
        const { rows: [p] } = await client.query(`select
          has_schema_privilege('public', 'CREATE') as can_create_tables,
          to_regclass('public.users') is not null as has_tables,
          current_setting('server_version') as version`);
        ok(`PostgreSQL ${p.version}`);
        if (p.can_create_tables) ok('Database user may create tables');
        else bad('Database user may not create tables (schema "public")', 'Send this message to Claude — it can be fixed with one database command.');
        if (p.has_tables) {
          const { rows: [u] } = await client.query(`select count(*)::int as n, count(*) filter (where role = 'admin')::int as admins from users`);
          ok(`Database is set up (${u.n} account${u.n === 1 ? '' : 's'}, ${u.admins} admin)`);
          if (!u.admins) bad('No admin account exists yet', 'Set ADMIN_EMAIL and ADMIN_PASSWORD, then Restart App.');
        } else {
          console.log('  INFO  Database tables not created yet — this happens automatically when the app starts.');
        }
      } catch (err) {
        const hints = {
          ECONNREFUSED: 'The database server is not reachable at that address/port. Check host and port in DATABASE_URL (Plesk shows them under Databases → Connection info).',
          ENOTFOUND: 'The database host name in DATABASE_URL does not exist. Use localhost.',
          '28P01': 'Wrong database user name or password in DATABASE_URL. Check them under Databases → User Management.',
          '28000': 'This database user is not allowed to log in. Check the user under Databases → User Management.',
          '3D000': 'The database name in DATABASE_URL does not exist. Check the exact name (upper/lower case matters).',
        };
        bad(`Cannot use the database: ${err.message}`, hints[err.code] ?? 'Send this message to Claude.');
      } finally {
        await client.end().catch(() => {});
      }
    }
  }

  const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    const probe = path.join(uploadDir, '.write-test');
    fs.writeFileSync(probe, 'ok'); fs.unlinkSync(probe);
    ok(`Upload folder is writable (${uploadDir})`);
  } catch (err) {
    bad(`Upload folder ${uploadDir} is not writable: ${err.code ?? err.message}`, 'Set UPLOAD_DIR to a folder the site may write to.');
  }

  console.log(problems ? `\n${problems} problem(s) found.\n` : '\nEverything looks good. If the site still shows an error, click Restart App.\n');
}

main().catch((err) => { console.error('Check failed unexpectedly:', err); });
