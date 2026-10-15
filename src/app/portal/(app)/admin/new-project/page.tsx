import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { listResearchers } from '@/lib/queries';
import { NewProjectForm } from './NewProjectForm';

export const metadata: Metadata = { title: 'Add project' };

export default async function NewProjectPage() {
  await requireAdmin();
  const researchers = await listResearchers();
  return (
    <div>
      <h1 className="p-title admin">Add project</h1>
      <p className="p-sub admin">Create a new project and assign it to a researcher.</p>
      {researchers.length === 0 ? (
        <p className="empty">No researchers yet. <Link href="/portal/admin/users" className="link-btn">Invite a researcher first →</Link></p>
      ) : (
        <NewProjectForm researchers={researchers} />
      )}
    </div>
  );
}
