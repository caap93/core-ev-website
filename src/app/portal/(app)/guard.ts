import 'server-only';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth';

/** Researcher-only pages: admins are sent to their own dashboard. */
export async function requireResearcher() {
  const user = await requireUser();
  if (user.role === 'admin') redirect('/portal/admin');
  return user;
}
