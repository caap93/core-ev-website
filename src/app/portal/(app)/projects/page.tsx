import type { Metadata } from 'next';
import { ProjectCard } from '@/components/portal/ProjectBits';
import { listProjectsForUser } from '@/lib/queries';
import { requireResearcher } from '../guard';

export const metadata: Metadata = { title: 'My projects' };

export default async function MyProjectsPage() {
  const user = await requireResearcher();
  const projects = await listProjectsForUser(user.id);
  return (
    <div>
      <h1 className="p-title">My projects</h1>
      <p className="p-sub">Click a project to view detailed progress and files.</p>
      {projects.length === 0 ? (
        <p className="empty">You don&apos;t have any projects yet.</p>
      ) : (
        <div className="stack" style={{ gap: 14 }}>
          {projects.map((p) => <ProjectCard key={p.id} p={p} href={`/portal/projects/${p.code}`} />)}
        </div>
      )}
    </div>
  );
}
