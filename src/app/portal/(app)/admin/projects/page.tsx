import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/portal/ProjectBits';
import { requireAdmin } from '@/lib/auth';
import { PROJECT_STATUSES, statusColor } from '@/lib/projects';
import { listAllProjects } from '@/lib/queries';

export const metadata: Metadata = { title: 'All projects' };

export default async function AdminProjectsPage({ searchParams }: PageProps<'/portal/admin/projects'>) {
  await requireAdmin();
  const { status } = await searchParams;
  const filter = typeof status === 'string' && (PROJECT_STATUSES as readonly string[]).includes(status) ? status : 'All';
  const projects = await listAllProjects();
  const shown = projects.filter((p) => filter === 'All' || p.status === filter);

  return (
    <div>
      <h1 className="p-title admin">All projects</h1>
      <p className="p-sub admin" style={{ marginBottom: 20 }}>Click a project to view details and manage progress.</p>
      <nav className="filters" aria-label="Filter by status">
        {['All', ...PROJECT_STATUSES].map((s) => {
          const active = filter === s;
          const color = s === 'All' ? '#1d1d1f' : statusColor(s);
          const n = s === 'All' ? projects.length : projects.filter((p) => p.status === s).length;
          return (
            <Link key={s} href={s === 'All' ? '/portal/admin/projects' : `/portal/admin/projects?status=${encodeURIComponent(s)}`}
              className="filter" aria-current={active ? 'true' : undefined}
              style={{ color: active ? '#fff' : color, background: active ? color : `${color}18` }}>
              {s} · {n}
            </Link>
          );
        })}
      </nav>
      {shown.length === 0 ? (
        <p className="empty">{projects.length === 0 ? <>No projects yet. <Link href="/portal/admin/new-project" className="link-btn">Add the first one →</Link></> : 'No projects with this status.'}</p>
      ) : (
        <div className="stack tight">
          {shown.map((p) => <ProjectCard key={p.id} p={p} href={`/portal/admin/projects/${p.code}`} />)}
        </div>
      )}
    </div>
  );
}
