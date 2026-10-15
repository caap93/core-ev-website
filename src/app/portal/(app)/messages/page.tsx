import type { Metadata } from 'next';
import { listProjectsForUser } from '@/lib/queries';
import { requireResearcher } from '../guard';
import { MessageForm } from './MessageForm';

export const metadata: Metadata = { title: 'Contact facility' };

export default async function MessagesPage({ searchParams }: PageProps<'/portal/messages'>) {
  const user = await requireResearcher();
  const { project } = await searchParams;
  const projects = await listProjectsForUser(user.id);
  const preselect = projects.some((p) => String(p.id) === project) ? String(project) : '';
  return (
    <div>
      <h1 className="p-title">Contact the facility</h1>
      <p className="p-sub">Send a message directly to our team. We typically respond within one business day.</p>
      <MessageForm email={user.email} projects={projects.map((p) => ({ id: p.id, code: p.code, title: p.title }))} preselect={preselect} />
    </div>
  );
}
