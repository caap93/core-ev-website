'use server';

import { count, eq, max, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { issueToken, requireAdmin } from '@/lib/auth';
import { db, schema } from '@/lib/db';
import { env } from '@/lib/env';
import { inviteMail, projectCreatedMail, sendMail } from '@/lib/mail';
import { DEFAULT_STEPS, INSTRUMENT_STATUSES, isProjectStatus, nextProjectCode, SERVICE_TYPES } from '@/lib/projects';
import { deleteStoredFile } from '@/lib/storage';

export type InviteResult = { error?: string; ok?: boolean; name?: string; email?: string; link?: string; emailed?: boolean };
export type ActionResult = { error?: string; ok?: boolean };

const inviteLink = (token: string) => `${env.appUrl}/portal/invite/${token}`;

/* ── Users ────────────────────────────────────────────────────────────── */

const InviteSchema = z.object({
  name: z.string().trim().min(1, 'Please enter a name.').max(200),
  email: z.email('Please enter a valid email address.'),
  institution: z.string().trim().min(1, 'Please enter an institution.').max(300),
});

export async function inviteUser(_prev: InviteResult, formData: FormData): Promise<InviteResult> {
  await requireAdmin();
  const parsed = InviteSchema.safeParse({
    name: formData.get('name'),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    institution: formData.get('institution'),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const existing = await db.query.users.findFirst({ where: eq(schema.users.email, parsed.data.email) });
  if (existing) return { error: 'An account with this email already exists.' };

  const [user] = await db.insert(schema.users).values({ ...parsed.data, role: 'researcher', status: 'pending' }).returning();
  const link = inviteLink(await issueToken(user.id, 'invite'));
  const emailed = await sendMail(inviteMail(user, link));
  revalidatePath('/portal/admin/users');
  return { ok: true, name: user.name, email: user.email, link, emailed };
}

async function getPendingUser(userId: string) {
  const user = await db.query.users.findFirst({ where: eq(schema.users.id, userId) });
  return user?.status === 'pending' ? user : null;
}

/** Issues a fresh invite link (earlier links stop working) and optionally emails it. */
export async function reissueInvite(userId: string, sendEmail: boolean): Promise<InviteResult> {
  await requireAdmin();
  const user = await getPendingUser(userId);
  if (!user) return { error: 'This invitation no longer exists.' };
  const link = inviteLink(await issueToken(user.id, 'invite'));
  const emailed = sendEmail ? await sendMail(inviteMail(user, link)) : false;
  return { ok: true, name: user.name, email: user.email, link, emailed };
}

async function projectCount(userId: string) {
  const [row] = await db.select({ n: count() }).from(schema.projects).where(eq(schema.projects.ownerId, userId));
  return Number(row?.n ?? 0);
}

/** Revokes a pending invite or removes an active account. */
export async function removeUser(userId: string): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (userId === admin.id) return { error: "You can't remove your own account." };
  const n = await projectCount(userId);
  if (n > 0) return { error: `This user still owns ${n} project${n > 1 ? 's' : ''}. Delete or complete those projects first.` };
  await db.delete(schema.users).where(eq(schema.users.id, userId));
  revalidatePath('/portal/admin/users');
  return { ok: true };
}

/* ── Projects ─────────────────────────────────────────────────────────── */

const ProjectSchema = z.object({
  ownerId: z.uuid('Please choose a researcher.'),
  title: z.string().trim().min(1, 'Please enter a project title.').max(300),
  serviceType: z.string().refine((s) => SERVICE_TYPES.includes(s), 'Please choose a service type.'),
});

export type CreateProjectResult = { error?: string; ok?: boolean; code?: string };

export async function createProject(_prev: CreateProjectResult, formData: FormData): Promise<CreateProjectResult> {
  await requireAdmin();
  const parsed = ProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const owner = await db.query.users.findFirst({ where: eq(schema.users.id, parsed.data.ownerId) });
  if (!owner) return { error: 'That researcher no longer exists.' };

  const year = new Date().getFullYear();
  const project = await db.transaction(async (tx) => {
    // Serialise code generation so two admins can't create the same code.
    await tx.execute(sql`LOCK TABLE projects IN SHARE ROW EXCLUSIVE MODE`);
    const codes = await tx.select({ code: schema.projects.code }).from(schema.projects);
    const code = nextProjectCode(year, codes.map((c) => c.code));
    const [p] = await tx.insert(schema.projects).values({ ...parsed.data, code }).returning();
    await tx.insert(schema.projectSteps).values(DEFAULT_STEPS.map((label, position) => ({ projectId: p.id, label, position })));
    return p;
  });

  if (owner.status === 'active') {
    await sendMail(projectCreatedMail(owner, project, `${env.appUrl}/portal/projects/${project.code}`));
  }
  revalidatePath('/portal', 'layout');
  return { ok: true, code: project.code };
}

async function touchProject(projectId: number) {
  const [p] = await db.update(schema.projects).set({ updatedAt: new Date() }).where(eq(schema.projects.id, projectId)).returning({ code: schema.projects.code });
  revalidatePath('/portal', 'layout');
  return p;
}

export async function updateProjectStatus(projectId: number, status: string) {
  await requireAdmin();
  if (!isProjectStatus(status)) return;
  await db.update(schema.projects).set({ status }).where(eq(schema.projects.id, projectId));
  await touchProject(projectId);
}

export async function toggleStep(stepId: number) {
  await requireAdmin();
  const step = await db.query.projectSteps.findFirst({ where: eq(schema.projectSteps.id, stepId) });
  if (!step) return;
  await db.update(schema.projectSteps).set({ doneAt: step.doneAt ? null : new Date() }).where(eq(schema.projectSteps.id, stepId));
  await touchProject(step.projectId);
}

export async function addStep(projectId: number, label: string) {
  await requireAdmin();
  const clean = label.trim().slice(0, 200);
  if (!clean) return;
  const [row] = await db.select({ pos: max(schema.projectSteps.position) }).from(schema.projectSteps).where(eq(schema.projectSteps.projectId, projectId));
  await db.insert(schema.projectSteps).values({ projectId, label: clean, position: (row?.pos ?? -1) + 1 });
  await touchProject(projectId);
}

export async function removeStep(stepId: number) {
  await requireAdmin();
  const [step] = await db.delete(schema.projectSteps).where(eq(schema.projectSteps.id, stepId)).returning();
  if (step) await touchProject(step.projectId);
}

export async function deleteProject(projectId: number) {
  await requireAdmin();
  const files = await db.query.projectFiles.findMany({ where: eq(schema.projectFiles.projectId, projectId) });
  await db.delete(schema.projects).where(eq(schema.projects.id, projectId));
  await Promise.all(files.map((f) => deleteStoredFile(f.storedName)));
  revalidatePath('/portal', 'layout');
  redirect('/portal/admin/projects');
}

/* ── Instruments & inbox ──────────────────────────────────────────────── */

export async function setInstrumentStatus(instrumentId: number, status: string) {
  await requireAdmin();
  if (!(INSTRUMENT_STATUSES as readonly string[]).includes(status)) return;
  await db.update(schema.instruments).set({ status }).where(eq(schema.instruments.id, instrumentId));
  revalidatePath('/portal/admin');
}

export async function setMessageRead(messageId: number, read: boolean) {
  await requireAdmin();
  await db.update(schema.messages).set({ readAt: read ? new Date() : null }).where(eq(schema.messages.id, messageId));
  revalidatePath('/portal', 'layout');
}
