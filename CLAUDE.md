# CLAUDE.md: context for working on this project

## Who you're working with
Cláudio Pinheiro, head of CORE EV (the extracellular vesicle core facility at Ghent University), is the site admin. He is **new to coding**, so:
- Explain things in plain language. Don't assume he knows git, npm, terminals or databases.
- Give step-by-step instructions that click through the **Plesk** panel (he has no terminal).
- Every change ends with the deploy steps below.
- Never ask him to paste passwords into the chat.

## The project
Next.js 16 (App Router, server actions) + TypeScript + PostgreSQL (Drizzle ORM).
- **Public site:** `src/app/(site)/`. All text content (services, equipment, team, publications, contact details) lives in `src/lib/content.ts`.
- **User portal:** `src/app/portal/`. Researchers see their own projects, files and messages; the admin (role `admin`) manages projects, steps, files, users (invite by email), messages and instrument status.
- **Server logic:** `src/actions/*` (server actions), `src/app/api/*` (file upload and download), `src/lib/*` (auth, db, mail, storage, queries).
- **Database:** schema in `src/lib/db/schema.ts`; migrations in `drizzle/`. After a schema change, run `npm run db:generate` and commit the new migration. Migrations apply automatically on app start.
- **Design reference:** `design/` holds the original Claude Design prototype and chat transcripts. Match its look (tokens and classes in `src/app/globals.css`).

## Hosting: Plesk (Combell server), Node.js 24.21.0
- Test domain for now: `determined-mirzakhani.136-144-240-124.plesk.page` (plain http). A real domain is coming.
- Plesk deploys from GitHub **`main`** (repo `caap93/core-ev-website`). Push finished work to `main`.
- Application root `/httpdocs`, **document root `/httpdocs/public`** (must stay that way, or `.env` becomes downloadable), startup file `app.js`, production mode.
- Settings live in **`/httpdocs/.env` on the server** (not in git). Plesk's "Custom environment variables" are *not* passed to "Run Node.js commands", which is why the file is used instead.
- PostgreSQL 14, database `coreEV`, user `coreEV_admin`.

### Deploy steps (tell him these after every change)
1. Plesk → **Git** → **Pull updates**
2. **Node.js → Run Node.js commands** → `run build` (run `install` first only if `package.json` dependencies changed)
3. **Dashboard** → **Restart App**

`run check` (in that same command box) diagnoses setup problems in plain language (`scripts/check.js`).

## Gotchas already solved (don't undo them)
- The Plesk database user can't `CREATE SCHEMA`, so `src/lib/migrate.ts` replaces Drizzle's migrator and tracks migrations in the `__core_ev_migrations` table.
- The build must not need internet access, so the Inter font is bundled (`src/app/fonts`, `next/font/local`). Don't use `next/font/google`.
- In production mode Plesk's `npm install` skips devDependencies, so anything `next build` needs (typescript, @types/*) must be in `dependencies`.
- `tests/`, `scripts/` and `drizzle.config.ts` are excluded from the build's type check and checked via `tsconfig.tools.json`.
- The session cookie's `Secure` flag follows `APP_URL` (https → secure), so sign-in works on the http test domain.
- A failed database bootstrap is logged without taking the public site down (`src/instrumentation.ts`).
- `output: 'standalone'` is only used for Docker builds (`NEXT_STANDALONE=true`).

## Checks before pushing
`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. For portal changes, also try the flow in a browser against a local PostgreSQL.

## Open items
- **Email:** no SMTP yet, so nothing is sent (mails are logged; invite links are shown to the admin). Plan: a mailbox on the server's domain, SMTP settings in `.env` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`); facility mail already goes to `FACILITY_INBOX=evcore@ugent.be`.
- **Real domain + SSL:** when ready, enable Let's Encrypt in Plesk, set `APP_URL=https://…`, restart.
- `ADMIN_PASSWORD` in `.env` is only used to create the first admin; it can be removed from `.env` now.
- **Privacy notice** (`src/app/(site)/privacy/page.tsx`) is a standard template; its retention periods await his review.
- `npm install` reports 5 moderate advisories in build-time tooling. Don't run `npm audit fix --force`.
