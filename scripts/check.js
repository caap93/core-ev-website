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

// Email (SMTP): shows what the site sees (never the password) and tries to log in.
async function checkEmail() {
  const host = process.env.SMTP_HOST;
  if (!host) {
    bad('Email is not set up: SMTP_HOST is missing, so no emails are sent', 'Add the SMTP_… lines to the .env file, save it, then Restart App.');
    return;
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER || '';
  console.log(`  INFO  Email settings: server ${host}, port ${port}, ${secure ? 'SSL/TLS' : 'STARTTLS'}, user "${user || '(none)'}", password ${process.env.SMTP_PASSWORD ? 'set' : 'MISSING'}`);
  if (!user || !process.env.SMTP_PASSWORD) bad('SMTP_USER or SMTP_PASSWORD is missing', 'Use the full mailbox address as SMTP_USER and its password as SMTP_PASSWORD.');
  if (port === 465 && !secure) bad('Port 465 needs SMTP_SECURE=true');
  if (port === 587 && secure) bad('Port 587 needs SMTP_SECURE=false');
  const from = process.env.MAIL_FROM || '';
  if (user && from && !from.toLowerCase().includes(user.toLowerCase())) {
    bad(`MAIL_FROM (${from}) is not the same address as SMTP_USER`, 'Mail servers often reject that. Use: MAIL_FROM="CORE EV <' + user + '>"');
  }

  const nodemailer = require('nodemailer');
  const t = nodemailer.createTransport({
    host, port, secure,
    auth: user ? { user, pass: process.env.SMTP_PASSWORD } : undefined,
    tls: process.env.SMTP_IGNORE_TLS_ERRORS === 'true' ? { rejectUnauthorized: false } : undefined,
    connectionTimeout: 10000, greetingTimeout: 10000,
  });
  try {
    await t.verify();
    ok('Logged in to the mail server — emails can be sent');
  } catch (err) {
    const msg = String(err.message || err);
    let fix = 'Send this message to Claude.';
    if (err.code === 'EAUTH') fix = 'Wrong mailbox address or password. Check them in Plesk → Mail, and that "Mailbox" is ticked for this address.';
    else if (['ECONNREFUSED', 'ETIMEDOUT', 'ECONNECTION'].includes(err.code) || /ECONNREFUSED|ETIMEDOUT|timeout/i.test(msg)) fix = 'The mail server is not reachable on this port. Check SMTP_HOST and SMTP_PORT (try 587 with SMTP_SECURE=false, or 465 with SMTP_SECURE=true).';
    else if (err.code === 'EDNS' || /ENOTFOUND/.test(msg)) fix = 'That mail server name does not exist. Check SMTP_HOST (Plesk → Mail → mail client setup).';
    else if (/certificate|altnames|self.signed/i.test(msg)) fix = 'The mail server\'s certificate does not match its name. Use the server name the certificate is for, or — only if the mail server runs on this same Plesk server — add SMTP_IGNORE_TLS_ERRORS=true.';
    else if (/wrong version number|ssl3_get_record|EPROTO/i.test(msg)) fix = 'Encryption setting does not match the port: use 587 with SMTP_SECURE=false, or 465 with SMTP_SECURE=true.';
    bad(`Cannot log in to the mail server: ${msg}`, fix);
  }
}

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

  await checkEmail();

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
