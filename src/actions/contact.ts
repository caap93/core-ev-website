'use server';

import { z } from 'zod';
import { db, schema } from '@/lib/db';
import { env } from '@/lib/env';
import { facilityMessageMail, sendMail } from '@/lib/mail';

export type FormState = { ok?: boolean; error?: string; values?: Record<string, string> };

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(200),
  email: z.email('Please enter a valid email address.').max(320),
  institution: z.string().trim().max(300),
  subject: z.string().trim().max(200),
  message: z.string().trim().min(1, 'Please enter a message.').max(10_000),
});

/** Public contact form: stores the message (visible in the admin inbox) and emails the facility. */
export async function sendContactMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: real visitors never fill the hidden "website" field.
  if (formData.get('website')) return { ok: true };

  const parsed = ContactSchema.safeParse({
    name: formData.get('name'),
    email: String(formData.get('email') ?? '').trim(),
    institution: formData.get('institution') ?? '',
    subject: formData.get('subject') ?? '',
    message: formData.get('message'),
  });
  if (!parsed.success) {
    const values = Object.fromEntries([...formData.entries()].filter(([, v]) => typeof v === 'string')) as Record<string, string>;
    return { error: parsed.error.issues[0].message, values };
  }

  const m = { ...parsed.data, subject: parsed.data.subject || 'General Inquiry' };
  await db.insert(schema.messages).values({ source: 'public', ...m, body: m.message });
  await sendMail(facilityMessageMail({ ...m, body: m.message, source: 'public' }, env.facilityInbox));
  return { ok: true };
}
