# CORE EV — website & user portal

Website and researcher portal for **CORE Extracellular Vesicles**, the EV core facility at Ghent University.
Built from the Claude Design handoff in [`design/`](design/) (prototype, chat transcripts, design system).

- **Public site:** Home, About, Services, Equipment, Team, Resources (EV-TRACK, EVOKE, publications), Contact.
- **User portal (researchers):** project progress timelines, shared files (upload, download, delete own), messages to the facility linked to a project.
- **Admin area:** overview with instrument status, all projects with status filters, editable progress steps, file uploads (e.g. final reports), project creation, researcher invitations, and a messages inbox.

Stack: Next.js 16 (App Router, server actions), TypeScript, PostgreSQL + Drizzle ORM, bcrypt passwords with database-backed sessions, Nodemailer for email.

## Running locally

```bash
cp .env.example .env        # then edit: DATABASE_URL, ADMIN_PASSWORD, …
npm install
npm run dev                 # http://localhost:3000
```

On startup the app applies database migrations and creates the admin account from
`ADMIN_EMAIL` / `ADMIN_PASSWORD`, if that account doesn't exist yet (`src/lib/bootstrap.ts`).
Later changes to `ADMIN_PASSWORD` don't affect an existing account; use “Forgot password?” instead.

Without `SMTP_HOST`, emails are written to the server log instead of being sent. Invite links are also shown to the admin in the portal, so onboarding still works.

## Deploying on Plesk (Node.js)

In Plesk, open the domain → **Node.js**, and set:

| Setting | Value |
|---|---|
| Node.js Version | 24.x (LTS) |
| Application Root | `/httpdocs` (where the code from GitHub is deployed) |
| **Document Root** | **`/httpdocs/public`** — never the application root, or the `.env` file would be downloadable |
| Application Mode | production |
| Application Startup File | `app.js` |
| Custom environment variables | everything from `.env.example` (`APP_URL`, `DATABASE_URL`, `ADMIN_*`, `SMTP_*`, …) |

Then click **NPM install**, run the script **`build`**, and **Restart App**.
After every new deployment from GitHub, run NPM install → `build` → Restart App again.
Uploaded files go to `UPLOAD_DIR` (default `./uploads` in the application root, outside the document root).

## Deploying with Docker

```bash
cp .env.example .env    # set APP_URL to the public URL, ADMIN_*, SMTP_*, POSTGRES_PASSWORD
docker compose up -d --build
```

This runs the app and PostgreSQL. Uploaded files live in the `uploads` volume and the database in `pgdata`; back up both.
Put the app behind an HTTPS reverse proxy. Session cookies are `Secure` in production.

## How accounts work

1. The admin invites a researcher (**Users → Invite researcher**). An account is created as *pending* and an email with a set-password link (valid 7 days) is sent.
2. The researcher sets a password, which activates the account and signs them in.
3. The admin creates projects for the researcher (**Add project**), and the researcher gets an email.
4. **Forgot password?** emails a reset link (valid 1 hour). Resetting signs the user out on all other devices.

Tokens and session IDs are stored only as SHA-256 hashes. Passwords use bcrypt (cost 12). Sign-in is throttled after 8 failed attempts per email.
Researchers can only see their own projects. Downloads and uploads are checked on the server (`src/app/api`).
Uploads are limited to 50 MB per file and to document, data and image types (`src/lib/projects.ts`).

## Scripts

| Command | |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` / `test` | ESLint, TypeScript, Vitest unit tests |
| `npm run db:generate` | Create a migration after editing `src/lib/db/schema.ts` |
| `npm run db:migrate` | Apply migrations + seed admin manually |

## Editing content

All public-site text (services, equipment, team, publications, contact details) is in `src/lib/content.ts`.
Images are in `public/images/`.
