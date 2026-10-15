import type { Metadata } from 'next';
import { Kpi, ProjectCard } from '@/components/portal/ProjectBits';
import { surname } from '@/lib/projects';
import { listProjectsForUser } from '@/lib/queries';
import { requireResearcher } from '../guard';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const user = await requireResearcher();
  const projects = await listProjectsForUser(user.id);
  return (
    <div>
      <h1 className="p-title">Welcome back, {surname(user.name)}.</h1>
      <p className="p-sub" style={{ marginBottom: 36 }}>Here&apos;s a summary of your active work at CORE EV.</p>
      <div className="kpis">
        <Kpi label="Active projects" value={projects.filter((p) => p.status === 'In Progress').length} icon="folder" color="var(--blue)" />
        <Kpi label="Completed" value={projects.filter((p) => p.status === 'Completed').length} icon="check" color="var(--green)" />
        <Kpi label="Files available" value={projects.reduce((a, p) => a + p.files.length, 0)} icon="file" color="var(--ink48)" />
      </div>
      <h2 className="p-h2">Your projects</h2>
      {projects.length === 0 ? (
        <p className="empty">No projects yet. Once the facility sets up a project for you, you&apos;ll be able to follow its progress here.</p>
      ) : (
        <div className="stack">
          {projects.map((p) => <ProjectCard key={p.id} p={p} href={`/portal/projects/${p.code}`} />)}
        </div>
      )}
    </div>
  );
}
