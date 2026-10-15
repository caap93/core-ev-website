import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { listUsersWithProjectCounts } from '@/lib/queries';
import { UsersManager } from './UsersManager';

export const metadata: Metadata = { title: 'Users' };

export default async function UsersPage() {
  const admin = await requireAdmin();
  const users = await listUsersWithProjectCounts();
  return (
    <UsersManager
      currentUserId={admin.id}
      users={users.map((u) => ({ id: u.id, name: u.name, email: u.email, institution: u.institution, role: u.role, status: u.status, projectCount: u.projectCount }))}
    />
  );
}
