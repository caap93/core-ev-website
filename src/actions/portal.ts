'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { db, schema } from '@/lib/db';
import { env } from '@/lib/env';
import { facilityMessageMail, sendMail } from '@/lib/mail';
import { getAccessibleProjectById } from '@/lib/queries';
import { deleteStoredFile } from '@/lib/storage';

export type MessageState = { ok?: boolean; error?: string; values?: Record<string, string> };

const MessageSchema = z.object({
  projectId: z.string(),
  subject: z.string().trim().min(1, 'Please choose a subject.').max(200),
  message: z.string().trim().min(1, 'Please enter a message.').max(10_000),
});

/** Researcher → facility message, optionally about one of their projects. */
export async function sendPortalMessage(_prev: MessageState, formData: FormData): Promise<MessageState> {
  const user = await requireUser();
  const values = { projectId: String(formData.get('projectId') ?? ''), subject: String(formData.get('subject') ?? ''), message: String(formData.get('message') ?? '') };
  const parsed = MessageSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message, values };

  let project: { id: number; code: string; title: string } | null = null;
  if (parsed.data.projectId) {
    project = await getAccessibleProjectById(user, Number(parsed.data.projectId));
    if (!project) return { error: 'That project could not be found.', values };
  }

  await db.insert(schema.messages).values({
    source: 'portal', userId: user.id, projectId: project?.id ?? null,
    name: user.name, email: user.email, institution: user.institution,
    subject: parsed.data.subject, body: parsed.data.message,
  });
  await sendMail(facilityMessageMail({
    name: user.name, email: user.email, institution: user.institution,
    subject: parsed.data.subject, body: parsed.data.message,
    project: project ? `${project.code} — ${project.title}` : undefined, source: 'portal',
  }, env.facilityInbox));
  revalidatePath('/portal/admin', 'layout');
  return { ok: true };
}

/** Admins may delete any file; researchers only files they uploaded to their own projects. */
export async function deleteFile(fileId: string): Promise<{ error?: string }> {
  const user = await requireUser();
  const file = await db.query.projectFiles.findFirst({ where: eq(schema.projectFiles.id, fileId) });
  if (!file) return {};
  const project = await getAccessibleProjectById(user, file.projectId);
  const allowed = user.role === 'admin' || (project && file.uploadedById === user.id);
  if (!allowed) return { error: 'You can only delete files you uploaded.' };
  await db.delete(schema.projectFiles).where(eq(schema.projectFiles.id, fileId));
  await deleteStoredFile(file.storedName);
  revalidatePath('/portal', 'layout');
  return {};
}
